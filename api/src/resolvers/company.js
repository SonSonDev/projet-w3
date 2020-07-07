const bcrypt = require("bcryptjs")
const { transporter, emailTemplate } = require("../utils")
const stripe = require("stripe")(process.env.STRIPE_SECRET_KEY)
const GoogleMaps = require("../services/googleMaps")


const getNextTheme = (theme) => {
  const themes = [
    "ALIMENTATION",
    "CONSUMPTION",
    "WATER",
    "ENERGY",
  ]
  const n = themes.length
  const x = theme ? themes.findIndex(t => t === theme) : 0
  return themes[((x + 1) % n + n) % n]
}

const createCompany = async (_, args, context) => {
  // if (await context.prisma.user({ email: args.emailUser })) throw new Error("User already exists")

  let randomPassword = Math.random().toString(36).substring(5)

  const mailOptions = {
    from: "madu.group7@gmail.com",
    to: args.emailUser,
    subject: "Votre mot de passe",
    html: emailTemplate(`${args.firstNameUser} ${args.lastNameUser}`, randomPassword),
  }

  const hashPassword = await bcrypt.hash(randomPassword, 10)

  const representativeUser = (
    await context.prisma.user({ email: args.emailUser })
  ) || (
    await context.prisma.createUser({
      firstName: args.firstNameUser,
      lastName: args.lastNameUser,
      email: args.emailUser,
      password: hashPassword,
      phone: args.phoneUser,
      role: args.roleUser,
      isRepresentative: args.isRepresentative,
    })
  )

  const stripeCustomer = await stripe.customers.create({
    name: args.companyName,
    email: args.emailUser,
  })

  const company = await context.prisma.createCompany({
    name: args.companyName,
    type: args.companyType,
    address: {
      create: {
        street: args.streetCompany,
        zipCode: args.zipCodeCompany,
        city: args.cityCompany,
      },
    },
    users: { connect: [ { id: representativeUser.id } ] },
    emailDomains: {
      set: args.emailDomains,
    },
    stripeCustomerId: stripeCustomer.id,
  })
  // console.log(transporter)
  transporter.sendMail(mailOptions, function (err, info) {
    if (err) console.log(err)
    else console.log(info)
  })

  return {
    ...company,
    userCount: 1,
    representativeUser,
    stripeInvoices: [],
  }
}

const setCompanyChallenges = async (_, { id }, context) => {
  const company = await context.prisma.company({ id })
  const curChallenges = (await context.prisma.company({ id }).challenges())
    .map(el => ({id: el.id }))

  const newTheme = getNextTheme(company.currentTheme)
  const newChallenges = (await context.prisma.challenges())
    .sort(() => Math.random() - 0.5)
    .reduce((acc, cur) => {
      if(acc.length < 5 && !curChallenges.find(c => c.id === cur.id) && cur.theme === newTheme) {
        acc.push({ id: cur.id })
      }
      return acc
    }, [])

  return await context.prisma.updateCompany({
    where: { id },
    data: {
      currentTheme: newTheme,
      challenges: {
        disconnect: curChallenges,
        connect: newChallenges,
      },
    },
  })
}

module.exports = {
  queries: {
    getCompanies(_, args, context) {
      return context.prisma.companies()
    },
    getCompany(_, { id }, context) {
      return context.prisma.company({ id })
    },
  },
  mutations: {

    async createCompany (_, args, { prisma }) {
      const [ data, representativeUser ] = await makeCompanyInput({ ...args, name: args.companyName, type: args.companyType, street: args.streetCompany, zipCode: args.zipCodeCompany, city: args.cityCompany }, prisma)
      const created = await prisma.createCompany(data)

      transporter.sendMail({
        from: "madu.group7@gmail.com",
        to: args.emailUser,
        subject: "Votre mot de passe",
        html: emailTemplate(`${args.firstNameUser} ${args.lastNameUser}`, args.randomPassword),
      }, console.log)

      return {
        ...created,
        userCount: 1,
        representativeUser,
        stripeInvoices: [],
      }
    },

    createCompanies (_, { companies }, context) {
      return Promise.all(companies.map(company => createCompany(_, company, context)))
    },

    async updateCompany (_, { companyId, name, type, street, zipCode, city, emailDomains }, { prisma }) {
      const [ data ] = await makeCompanyInput({ name, type, street, zipCode, city, emailDomains }, prisma, true)

      return prisma.updateCompany({
        where: { id: companyId },
        data,
      })
    },

    deleteCompany(_, { id }, context) {
      return context.prisma.deleteCompany({ id })
    },

    setCompanyChallenges,

    async setAllCompaniesChallenges(parent, args, context) {
      const ids = (await context.prisma.companies()).map(c => c.id)
      return await Promise.all(ids.map(async id => await setCompanyChallenges(parent, { id }, context)))
    },
  },
  resolvers: {
    Company: {
      users (parent, args, context) {
        return context.prisma.company({ id: parent.id }).users()
      },

      userCount ({ id }, args, context) {
        return context.prisma.usersConnection({ where: { company: { id } } }).aggregate().count()
      },

      async representativeUser ({ id }, _, { prisma }) {
        const [ user ] = await prisma.company({ id }).users({ where: { isRepresentative: true } })
        return user
      },

      async stripeInvoices ({ stripeCustomerId }, args, context) {
        const { data } = await stripe.invoices.list({ customer: stripeCustomerId })
        return data
      },

      challenges (parent, args, context) {
        return context.prisma.company({ id: parent.id }).challenges()
      },
    },
  },
}

async function makeCompanyInput ({ name, type, street, zipCode, city, emailDomains, firstNameUser, lastNameUser, emailUser, phoneUser, roleUser, isRepresentative }, prisma, update) {

  const { data: { results } } = await GoogleMaps.client.geocode({ params: {
    address: `${street}, ${zipCode} ${city}`, key: process.env.GOOGLE_MAPS_API_KEY,
  } })
  const { geometry: { location: { lat, lng } } } = results[0]

  let randomPassword = Math.random().toString(36).substring(5)

  const hashPassword = await bcrypt.hash(randomPassword, 10)

  const representativeUser = !update && (
    await prisma.user({ email: emailUser })
  ) || (
    await prisma.createUser({
      firstName: firstNameUser,
      lastName: lastNameUser,
      email: emailUser,
      password: hashPassword,
      phone: phoneUser,
      role: roleUser,
      isRepresentative: isRepresentative,
    })
  )

  const stripeCustomer = await stripe.customers.create({
    name: name,
    email: emailUser,
  })

  return [
    {
      name: name,
      type: type,
      address: {
        create: {
          street: street,
          zipCode: zipCode,
          city: city,
          location: { create: {
            type: "Point",
            coordinates: { set: [ lat, lng ] },
          } },
        },
      },
      ...!update && { users: { connect: [ { id: representativeUser.id } ] } },
      emailDomains: {
        set: emailDomains,
      },
      stripeCustomerId: stripeCustomer.id,
    },
    representativeUser,
  ]
}