const bcrypt = require("bcryptjs")
const faker = require("faker/locale/fr")
const { prisma } = require("./generated/prisma-client")

const users = [
  [ "Chrystal", "Le Liebard", "w3p2020g7@gmail.com",        "admin", "SUPER_ADMIN" ],
  [ "Eric",     "Priou",      "eric.priou@gmail.com",       "admin", "SUPER_ADMIN" ],
  [ "Antoine",  "Masselot",   "antoine.masselot@hetic.net", "admin", "SUPER_ADMIN" ],
]

const defaultTags = [
  [ "Asiatique",  "Type de cuisine",    "FOOD" ],
  [ "Africain",   "Type de cuisine",    "FOOD" ],
  [ "Américain",  "Type de cuisine",    "FOOD" ],
  [ "Européen",   "Type de cuisine",    "FOOD" ],
  [ "Latino",     "Type de cuisine",    "FOOD" ],
  [ "€",          "Budget",             "FOOD" ],
  [ "€€",         "Budget",             "FOOD" ],
  [ "€€€",        "Budget",             "FOOD" ],
  [ "Vegan",      "Régime alimentaire", "FOOD" ],
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
  [
    "Madame Je Vous Aime SARL", "COMPANY",
    [ "12 Rue d'Enghien", "75010", "Paris" ],
    [ "Zeroual", "Mahel", "mahel.zeroual@hetic.net", "0689364340", "admin" ],
    [ "bridge.audio", "creaminal.com", "velvetcream.io", "velvetica.io" ],
    "cus_GlQOvvGAtVXSxO",
  ],
  [
    "HETIC", "SCHOOL",
    [ "27 Bis Rue du Progrès", "93100", "Montreuil" ],
    [ "Yip", "Theodore", "theodore.yip@hetic.net", "0666831336", "admin" ],
    [ "hetic.net" ],
    "cus_GlQ5hFO0y1S5Zk",
  ],
  [
    "Otaku no sekai", "COMPANY",
    [ "Shibuya City, Jingumae5-6-5", "〒150-0001", "Tokyo" ],
    [ "Sahbi", "Florian", "sahbi.s@gmail.com", "0610658929", "admin" ],
    [ "otaku.com", "otakupro.com"],
    "cus_GlRIXTv11FPCQZ",
  ],
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

  const tags = await Promise.all(
    defaultTags.map(([ name, type, activity ]) => (
      prisma.createTag({
        name,
        type,
        activity,
      })
    )),
  )
  // console.log(tags, tags[0].id, tags.map(({ id }) => ({ id })))
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
      tags: { connect: tags.map(({ id }) => ({ id })) },
    })
  }

  for (let i = 0; i < Math.floor(Math.random() * 20 + 20); i++) {
    await prisma.createPlace({
      name: faker.random.words(Math.floor(Math.random()*3)+1).split(" ").map(el => el.charAt(0).toUpperCase() + el.slice(1)).join(" "),
      address: { create: { street: `${Math.floor(Math.random()*300)+1} ${faker.address.streetName()}`, zipCode: faker.address.zipCode(), city: faker.address.city() } },
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
      category: ["SHOP", "ACTIVITY"][Math.floor(Math.random()*2)],
    })
  }

  for (const [ name, type, [ street, zipCode, city ], [ firstName, lastName, email, phone, password ], emailDomains, stripeCustomerId ] of companies) {
    const { id } = await prisma.createCompany({
      name,
      type,
      address: { create: { street, zipCode, city } },
      users: { create: {
        firstName, lastName, email, phone,
        password: await bcrypt.hash(password, 10),
        role: "ADMIN",
        isRepresentative: true,
      } },
      emailDomains: { set: emailDomains },
      stripeCustomerId,
    })

    for (let i = 0; i < Math.floor(Math.random() * 20 + 15); i++) {
      await prisma.createUser({
        firstName: faker.name.firstName(),
        lastName: faker.name.lastName(),
        email: faker.internet.email(),
        password: await bcrypt.hash("user", 10),
        role: "USER",
        company: { connect: { id } },
      })
    }
  }

}

const clearDb = async () => {
  await prisma.deleteManyUsers()
  await prisma.deleteManyTags()
  await prisma.deleteManyPlaces()
  await prisma.deleteManyCompanies()
}

(async function () {
  await clearDb()
  await populateDb()
  console.log("fixtures ok")
})()


