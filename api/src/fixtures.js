const bcrypt = require("bcryptjs")
const faker = require("faker/locale/fr")
const { prisma } = require("./generated/prisma-client")

const users = [
  [ "Chrystal", "Le Liebard", "w3p2020g7@gmail.com"       , "admin", "SUPER_ADMIN" ],
  [ "Eric"    , "Priou"     , "eric.priou@hetic.net"      , "admin", "SUPER_ADMIN" ],
  [ "Antoine" , "Masselot"  , "antoine.masselot@hetic.net", "admin", "SUPER_ADMIN" ],
]

const defaultTags = [
  [ "Asiatique",    "Type de cuisine",      "FOOD" ],
  [ "Africain",     "Type de cuisine",      "FOOD" ],
  [ "Américain",    "Type de cuisine",      "FOOD" ],
  [ "Européen",     "Type de cuisine",      "FOOD" ],
  [ "Latino",       "Type de cuisine",      "FOOD" ],
  [ "€",            "Budget",               "FOOD" ],
  [ "€€",           "Budget",               "FOOD" ],
  [ "€€€",          "Budget",               "FOOD" ],
  [ "Vegan",        "Régime alimentaire",   "FOOD" ],
  [ "Végétarien",   "Régime alimentaire",   "FOOD" ],
  [ "Sans gluten",  "Régime alimentaire",   "FOOD" ],
  [ "Bio",          "Régime alimentaire",   "FOOD" ],
  [ "Hallal",       "Régime alimentaire",   "FOOD" ],
  [ "Casher",       "Régime alimentaire",   "FOOD" ],
  [ "Rampe d’accès extérieur",  "Accessibilité",   "FOOD" ],
  [ "Ascenseur / Élévateur",    "Accessibilité",   "FOOD" ],
  [ "Trottoirs adaptés",        "Accessibilité",   "FOOD" ],
  [ "Présence d’étages",        "Accessibilité",   "FOOD" ],
  [ "Parkings PMR à proximité", "Accessibilité",   "FOOD" ],
]

const places = [
  [ "Given",                                  "89 rue de Bagnolet",         "75020" ],
  [ "Le Mezze Du Chef",                       "80 rue de Ménilmontant",     "75020" ],
  [ "Love Me Cru",                            "44 rue de Tourtille",        "75020" ],
  [ "Primeur",                                "4 rue Lemon",                "75020" ],
  [ "Cantine Vagabonde",                      "11 rue d'Aubervilliers",     "75019" ],
  [ "Le Faitout",                             "23 avenue Simon Bolivar",    "75019" ],
  [ "Abattoir Végétal",                       "61 rue Ramey",               "75018" ],
  [ "Le Myrha",                               "70 rue Myrha",               "75018" ],
  [ "Jo & Nana Cakes",                        "6 rue Rennequin",            "75017" ],
  [ "Joy In Food",                            "2 rue Truffaut",             "75017" ],
  [ "My Kitch'N",                             "82 rue Lemercier",           "75017" ],
  [ "Super Vegan",                            "118 rue des Moines",         "75017" ],
  [ "Happiz",                                 "23 rue des Sablons",         "75016" ],
  [ "Vege",                                   "122 rue du théâtre",         "75015" ],
  [ "Optique Durable",                        "2 rue Amelot",               "75011" ],
  [ "Vegan Food Tour",                        "Place de la République",     "75003" ],
  [ "Lush",                                   "17 Boulevard de Vaugirard",  "75015" ],
  [ "Super Naturelle",                        "34 Rue Ramey",               "75018" ],
  [ "Nata",                                   "28 Rue Planchat",            "75020" ],
  [ "Paint In Green",                         "78 rue Compans ",            "75019" ],
  [ "Les Petites Pâtisseries - Raw & Vegan",  "44 rue du chemin vert",      "75011" ],
  [ "La Vie Claire",                          "194 rue Lecourbe",           "75015" ],
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
      tags: { connect: tags.filter(() => Math.random() < 0.2).map(({ id }) => ({ id })) },
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
        email: faker.internet.email().toLowerCase(),
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


