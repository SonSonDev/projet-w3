const bcrypt = require("bcryptjs")
const { prisma } = require("./generated/prisma-client")


const users = [
  [ "Chrystal", "Le Liebard", "w3p2020g7@gmail.com",  "admin",    "SUPER_ADMIN" ],
  [ "Eric",     "Priou",      "eric.priou@gmail.com", "admin",    "SUPER_ADMIN" ],
]

const places = [
  [ "GIVEN",                                  "89 rue de Bagnolet",         "75020" ],
  [ "LE MEZZE DU CHEF",                       "80 rue de Ménilmontant",     "75020" ],
  [ "LOVE ME CRU",                            "44 rue de Tourtille",        "75020" ],
  [ "PRIMEUR",                                "4 rue Lemon",                "75020" ],
  [ "CANTINE VAGABONDE",                      "11 rue d'Aubervilliers",     "75019" ],
  [ "LE FAITOUT",                             "23 avenue Simon Bolivar",    "75019" ],
  [ "ABATTOIR VEGETAL",                       "61 rue Ramey",               "75018" ],
  [ "LE MYRHA",                               "70 rue Myrha",               "75018" ],
  [ "JO & NANA CAKES",                        "6 rue Rennequin",            "75017" ],
  [ "JOY IN FOOD",                            "2 rue Truffaut",             "75017" ],
  [ "MY KITCH'N",                             "82 rue Lemercier",           "75017" ],
  [ "SUPER VEGAN",                            "118 rue des Moines",         "75017" ],
  [ "HAPPIZ",                                 "23 rue des Sablons",         "75016" ],
  [ "VEGE",                                   "122 rue du théâtre",         "75015" ],
  [ "OPTIQUE DURABLE",                        "2 rue Amelot",               "75011" ],
  [ "VEGAN FOOD TOUR",                        "Place de la République",     "75003" ],
  [ "LUSH",                                   "17 Boulevard de Vaugirard",  "75015" ],
  [ "SUPER NATURELLE",                        "34 Rue Ramey",               "75018" ],
  [ "NATA",                                   "28 Rue Planchat",            "75020" ],
  [ "PAINT IN GREEN",                         "78 rue Compans ",            "75019" ],
  [ "LES PETITES PATISSERIES - RAW & VEGAN",  "44 rue du chemin vert",      "75011" ],
  [ "LA VIE CLAIRE",                          "194 rue Lecourbe",           "75015" ],
]

const companies = [
  [ "company_1",      "130 rue de la pompe",  "75016",          [ "company_1.com" ], "company_1_admin", "last_name", "admin_1@mail.com", "admin","0123456789"],
  [ "company_2",      "130 rue de la pompe",  "75016",          [ "company_2.com" ], "company_2_admin", "last_name", "admin_2@mail.com", "admin","0123456789" ],
  [ "company_3",      "130 rue de la pompe",  "75016",          [ "company_3.com" ], "company_3_admin", "last_name", "admin_3@mail.com", "admin","0123456789" ],
]


const populateDb = async () => {

  for (const [ firstName, lastName, email, password, role ] of users) {
    await prisma.createUser({
      firstName,
      lastName,
      email,
      password: await bcrypt.hash(password, 10),
      role,
    })
  }

  for (const [ name, street, zipCode ] of places) {
    await prisma.createPlace({
      name,
      address: { create: { street, zipCode, city: "Paris" } },
      hours: { create: [
        { day: "MONDAY",    start: null, end: null },
        { day: "TUESDAY",   start: null, end: null },
        { day: "WEDNESDAY", start: null, end: null },
        { day: "THURSDAY",  start: null, end: null },
        { day: "FRIDAY",    start: null, end: null },
        { day: "SATURDAY",  start: null, end: null },
        { day: "SUNDAY",    start: null, end: null },
      ] },
      keywords: { set: [ "keyword_1", "keyword_2" ] },
      category: "FOOD",
    })
  }

  for (const [ name, street, zipCode, emailDomains, firstNameUser, lastNameUser, emailUser, password, phoneUser ] of companies) {
    const { id } = await prisma.createCompany({
      name,
      type: "COMPANY",
      address: { create: { street, zipCode, city: "Paris" } },
      emailDomains: { set: emailDomains },
      users: {
        create: {
          firstName: firstNameUser,
          lastName: lastNameUser,
          email: emailUser,
          password: await bcrypt.hash(password, 10),
          phone: phoneUser,
          role: "ADMIN",
          isRepresentative: true,
        },
      },
    })
    console.log(id)
    for (let i=0; i<3; i++) {
      await prisma.createUser({
        firstName: `${name}_userFirstname_${i}`,
        lastName: `${name}_userLastname_${i}`,
        password: await bcrypt.hash("user", 10),
        role: "USER",
        email: `${name}_user_${i}@mail.fr`,
        company: {
          connect: {id},
        },
      })
    }
  }

}

const clearDb = async () => {
  await prisma.deleteManyUsers()
  await prisma.deleteManyPlaces()
  await prisma.deleteManyCompanies()
}


module.exports = {
  populateDb,
  clearDb,
}

