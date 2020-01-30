const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const { APP_SECRET, getUserId } = require('../utils');
const nodemailer = require('nodemailer');

var transporter = nodemailer.createTransport({
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

async function createCompany(parent, { name, email }, context, info) {
  return context.prisma.createCompany({
    name: name,
    email: email
  })
}

async function createUser(parent, { password, name, email, role }, context, info) {
  const mailOptions = {
    from: 'madu.group7@gmail.com', 
    to: email,
    subject: 'Votre mot de passe',
    html: '<p>passpass</p>'
  };

  transporter.sendMail(mailOptions, function (err, info) {
    if(err)
      console.log(err)
    else
      console.log(info);
 });


  const hashPassword = await bcrypt.hash("passpass", 10)
  return await context.prisma.createUser({
    name: name,
    password: hashPassword,
    role: role,
    email: email
  })
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

async function login(parent, args, context, info) {
  const user = await context.prisma.user({ email: args.email })
  if (!user) {
    throw new Error('No such user found')
  }

  const valid = await bcrypt.compare(args.password, user.password)
  if (!valid) {
    throw new Error('Invalid password')
  }

  const token = jwt.sign({ userId: user.id }, APP_SECRET)

  return {
    token,
    user,
  }
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
  createPlace,
  createCompany,
  createUser,
  deletePlace,
  deleteCompany,
  deleteUser,
  login,
  updateHour
}
