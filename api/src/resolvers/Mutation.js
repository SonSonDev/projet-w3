const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const expiresIn = '1 day';
const { APP_SECRET, getUserId, emailTemplate } = require('../utils');
const nodemailer = require('nodemailer');
const transporter = nodemailer.createTransport({
  service: 'gmail',
  auth: {
    user: 'madu.group7@gmail.com',
    pass: 'azazazaz1'
  }
});

async function createPlace(parent, { name, number, street, zipCode, type, category }, context, info) {
  // const userId = getUserId(context)
  return context.prisma.createPlace({
    name,
    type,
    category,
    keywords: { set: ["1", "2", "3"] },
    address: {
      create: {
        number,
        street,
        zipCode,
      }
    },
    hours: {
      create: [
        {
          day: "MONDAY",
          start: null,
          end: null,
        },
        {
          day: "TUESDAY",
          start: null,
          end: null,
        },
        {
          day: "WEDNESDAY",
          start: null,
          end: null,
        },
        {
          day: "THURSDAY",
          start: null,
          end: null,
        },
        {
          day: "FRIDAY",
          start: null,
          end: null,
        },
        {
          day: "SATURDAY",
          start: null,
          end: null,
        },
        {
          day: "SUNDAY",
          start: null,
          end: null,
        },
      ]
    }
  })
}

async function createCompany(parent, args, context, info) {
  // const userId = getUserId(context)
  let randomPassword = Math.random().toString(36).substring(5)

  const mailOptions = {
    from: 'madu.group7@gmail.com',
    to: args.emailUser,
    subject: 'Votre mot de passe',
    html: emailTemplate(args.firstName, randomPassword)
  };

  transporter.sendMail(mailOptions, function (err, info) {
    if (err)
      console.log(err)
    else
      console.log(info);
  });

  const hashPassword = await bcrypt.hash(randomPassword, 10);

  return context.prisma.createCompany({
    name: args.companyName,
    type: args.companyType,
    address: {
      create: {
        street: args.streetCompany,
        zipCode: args.zipCodeCompany,
        city: args.cityCompany,
      },
    },
    users: {
      create: {
        firstName: args.firstNameUser,
        lastName: args.lastNameUser,
        email: args.emailUser,
        password: hashPassword,
        phone: args.phoneUser,
        role: args.roleUser,
        isRepresentative: args.isRepresentative,
      }
    }
  })
}

async function createUser(parent, { firstName, lastName, email, role }, context, info) {
  let randomPassword = Math.random().toString(36).substring(5)

  const mailOptions = {
    from: 'madu.group7@gmail.com',
    to: email,
    subject: 'Votre mot de passe',
    html: emailTemplate(firstName, randomPassword)
  };

  transporter.sendMail(mailOptions, function (err, info) {
    if (err)
      console.log(err)
    else
      console.log(info);
  });

  const hashPassword = await bcrypt.hash(randomPassword, 10);

  const user = await context.prisma.createUser({
    firstName: firstName,
    lastName: lastName,
    password: hashPassword,
    role: role,
    email: email
  })

  const token = jwt.sign({ userId: user.id }, APP_SECRET)

  return {
    token,
    user,
  }
}

async function login(parent, { email, password }, context, info) {
  const user = await context.prisma.user({ email: email })
  if (!user) {
    throw new Error('No such user found')
  }

  const valid = await bcrypt.compare(password, user.password)
  if (!valid) {
    throw new Error('Invalid password')
  }

  const token = jwt.sign({ userId: user.id }, APP_SECRET)

  return {
    token,
    user,
  }
}

async function updateRepresentative(parent, { userEmail, companyId, isRepresentative }, context, info) {
  console.log({ userEmail, companyId, isRepresentative })
  const update = await context.prisma.updateUser({
    where: { email: userEmail },
    data: {
      isRepresentative,
      company: { connect: { id: companyId } }
    }
  })
  console.log(update)
  return update
}

async function deletePlace(parent, { id }, context, info) {
  return await context.prisma.deletePlace({ id });
}

async function deleteCompany(parent, { id }, context, info) {
  return await context.prisma.deleteCompany({ id });
}

async function deleteUser(parent, { id }, context, info) {
  return await context.prisma.deleteUser({ id });
}

async function updateHour(parent, { id, day, start, end }, context, info) {
  return await context.prisma.updatePlace({
    where: {
      id: id
    },
    data: {
      hours: {
        updateMany:
        {
          where:
            { day: day },
          data:
            { start: start, end: end }
        }
      }
    }
  })
}

module.exports = {
  updateRepresentative,
  createPlace,
  createCompany,
  createUser,
  deletePlace,
  deleteCompany,
  deleteUser,
  login,
  updateHour
}
