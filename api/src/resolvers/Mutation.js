const bcrypt = require("bcryptjs")
const jwt = require("jsonwebtoken")
const stripe = require("stripe")(process.env.STRIPE_SECRET_KEY)
const { APP_SECRET, getUserId, getAuthenticatedUser, emailTemplate } = require("../utils")
const nodemailer = require("nodemailer")
const transporter = nodemailer.createTransport({
  service: "gmail",
  auth: {
    user: "madu.group7@gmail.com",
    pass: "azazazaz1",
  },
})


// TAGS
async function createTag(parent, { name, type, activity }, context) {
  return context.prisma.createTag({
    name,
    type,
    activity,
  })
}

async function deleteTag(parent, { id }, context) {
  return await context.prisma.deleteTag({ id })
}

async function updateTag(parent, { id, name, type, activity }, context) {
  return await context.prisma.updateTag({
    where: {
      id,
    },
    data: {
      name,
      type,
      activity,
    },
  })
}

// PLACES

async function createPlace(parent, { name, street, zipCode, city, type, category }, context) {
  // const userId = getUserId(context)
  return context.prisma.createPlace({
    name,
    type,
    category,
    keywords: { set: ["1", "2", "3"] },
    address: {
      create: {
        street,
        zipCode,
        city,
      },
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
      ],
    },
  })
}

async function deletePlace(parent, { id }, context) {
  return await context.prisma.deletePlace({ id })
}

async function updatePlace(parent, { placeId, name, street, zipCode, city, type, category }, context) {
  return await context.prisma.updatePlace({
    where: {
      id: placeId,
    },
    data: {
      name,
      address: { update: { street, zipCode, city } },
      type,
      category,
    },
  })
}

// COMPANIES

async function createCompany(parent, args, context) {
  // const userId = getUserId(context)
  let randomPassword = Math.random().toString(36).substring(5)

  const mailOptions = {
    from: "madu.group7@gmail.com",
    to: args.emailUser,
    subject: "Votre mot de passe",
    html: emailTemplate(`${args.firstNameUser} ${args.lastNameUser}`, randomPassword),
  }

  const hashPassword = await bcrypt.hash(randomPassword, 10)

  const stripeCustomer = await stripe.customers.create({
    name: args.companyName,
    email: args.emailUser,
  })

  await context.prisma.createCompany({
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
      },
    },
    emailDomains: {
      set: args.emailDomains,
    },
    stripeCustomerId: stripeCustomer.id,
  })

  transporter.sendMail(mailOptions, function (err, info) {
    if (err) console.log(err)
    else console.log(info)
  })
}

async function deleteCompany(parent, { id }, context) {
  return await context.prisma.deleteCompany({ id })
}

async function updateCompany(parent, { companyId, name, type, street, zipCode, city, emailDomains }, context) {
  return await context.prisma.updateCompany({
    where: {
      id: companyId,
    },
    data: {
      name,
      type,
      address: {
        update: {
          street,
          zipCode,
          city,
        },
      },
      emailDomains: {
        set: emailDomains,
      },
    },
  })
}

// USERS

async function createUser(parent, { firstName, lastName, email, role, companyId }, context) {
  let randomPassword = Math.random().toString(36).substring(5)

  const mailOptions = {
    from: "madu.group7@gmail.com",
    to: email,
    subject: "Votre mot de passe",
    html: emailTemplate(`${firstName} ${lastName}`, randomPassword),
  }

  const hashPassword = await bcrypt.hash(randomPassword, 10)

  const user = await context.prisma.createUser({
    firstName: firstName,
    lastName: lastName,
    password: hashPassword,
    role: role,
    email: email,
    company: {
      connect: { id: companyId },
    },
  })

  transporter.sendMail(mailOptions, function (err, info) {
    if (err) console.log(err)
    else console.log(info)
  })

  const token = jwt.sign({ userId: user.id }, APP_SECRET)

  return {
    token,
    user,
  }
}

async function deleteUser(parent, { id }, context) {
  return await context.prisma.deleteUser({ id })
}

async function updateUser(parent, { userId, firstName, lastName, email, role, phone }, context) {
  return await context.prisma.updateUser({
    where: {
      id: userId,
    },
    data: {
      firstName,
      lastName,
      email,
      role,
      phone,
    },
  })
}

// AUTHENTICATION

async function login(parent, { email, password }, context) {
  const user = await context.prisma.user({ email: email })
  if (!user) {
    throw new Error("No such user found")
  }

  const valid = await bcrypt.compare(password, user.password)
  if (!valid) {
    throw new Error("Invalid password")
  }

  const token = jwt.sign({ userId: user.id }, APP_SECRET)

  context.response.cookie("x-auth-token", token, {
    maxAge: 1000 * 60 * 60 * 24,
    httpOnly: true,
    sameSite: true,
  })

  return {
    token,
    user,
  }
}

async function logout(parent, args, context) {
  context.response.clearCookie("x-auth-token")
  return {
    response: "ok",
  }
}

// OTHERS

async function updateHour(parent, { id, day, start, end }, context) {
  return await context.prisma.updatePlace({
    where: {
      id: id,
    },
    data: {
      hours: {
        updateMany:
        {
          where:
            { day: day },
          data:
            { start: start, end: end },
        },
      },
    },
  })
}

async function updatePassword(parent, { email, newPassword }, context) {
  const hashPassword = await bcrypt.hash(newPassword, 10)
  return await context.prisma.updateUser({
    data: {
      password: hashPassword,
    },
    where: {
      email,
    },
  })
}

async function updateRepresentative(parent, { userEmail, companyId, isRepresentative }, context) {
  console.log({ userEmail, companyId, isRepresentative })
  const update = await context.prisma.updateUser({
    where: { email: userEmail },
    data: {
      isRepresentative,
      company: { connect: { id: companyId } },
    },
  })
  console.log(update)
  return update
}

async function createStripeInvoice (parent, { stripeCustomerId }, context) {

  const user = await getAuthenticatedUser(context)
  if (user.role !== "SUPER_ADMIN") throw new Error("Not authorized")

  const invoiceItem = await stripe.invoiceItems.create({
    customer: stripeCustomerId,
    amount: 2500,
    currency: 'eur',
    description: 'One-time setup fee',
  })
  const invoice = await stripe.invoices.create({
    customer: stripeCustomerId,
    auto_advance: true, // auto-finalize this draft after ~1 hour
  })
  // console.log(invoice)
  return invoice.id
}


module.exports = {
  updateUser,
  updateCompany,
  updatePlace,
  updateRepresentative,
  createPlace,
  createCompany,
  createUser,
  deletePlace,
  deleteCompany,
  deleteUser,
  login,
  logout,
  updateHour,
  updatePassword,
  createTag,
  deleteTag,
  updateTag,
  createStripeInvoice,
}
