const bcrypt = require("bcryptjs")
const { transporter, emailTemplate } = require('../utils')
const stripe = require("stripe")(process.env.STRIPE_SECRET_KEY)

module.exports = {
  queries: {
    getCompanies(_, args, context) {
      return context.prisma.companies()
    },
    
    getCompany(_, { id }, context) {
      return context.prisma.company({ id })
    }
  },
  mutations: {
    async createCompany(_, args, context) {
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
      console.log(transporter)
      transporter.sendMail(mailOptions, function (err, info) {
        if (err) console.log(err)
        else console.log(info)
      })
    },

    updateCompany(_, { companyId, name, type, street, zipCode, city, emailDomains }, context) {
      return context.prisma.updateCompany({
        where: { id: companyId },
        data: {
          name,
          type,
          address: {
            update: { street, zipCode, city },
          },
          emailDomains: { set: emailDomains },
        },
      })
    },

    deleteCompany(_, { id }, context) {
      return context.prisma.deleteCompany({ id })
    }
  },
  resolvers: {
    Company: {
      users (parent, args, context) {
        return context.prisma.company({ id: parent.id }).users()
      },

      userCount ({ id }, args, context) {
        return context.prisma.usersConnection({ where: { company: { id } } }).aggregate().count()
      },

      async stripeInvoices ({ stripeCustomerId }, args, context) {
        const { data } = await stripe.invoices.list({ customer: stripeCustomerId })
        return data
      },
    },
  },
}