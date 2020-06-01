const bcrypt = require("bcryptjs")
const faker = require("faker/locale/fr")
const { prisma } = require("./generated/prisma-client")

function shuffle(array) {
  return array.sort(() => Math.random() - 0.5)
}

function randomFromArray(array) {
  return array[Math.floor(Math.random() * array.length)]
}

function randomBetween(min, max) {
  return Math.random() * (max - min) + min
}

const users = [
  [ "Chrystal", "Le Liebard", "w3p2020g7@gmail.com"       , "admin", "SUPER_ADMIN" ],
  [ "Eric"    , "Priou"     , "eric.priou@hetic.net"      , "admin", "SUPER_ADMIN" ],
  [ "Antoine" , "Masselot"  , "antoine.masselot@hetic.net", "admin", "SUPER_ADMIN" ],
]


const defaultTags = {
  ACTIVITY: {
    "Type d'activité/loisir": [
      "Cuisine/dégustation",
      "Beauté/Bien-être",
      "DIY/Atelier créatif",
      "Sport",
      "Services quotidien/Utilitaires",
      "Balade/Visite",
    ],
    "Régime alimentaire": [
      "Sans gluten",
      "Vegan",
      "Veggie",
    ],
    "Prix": [
      "€",
      "€€",
      "€€€",
    ],
    "Engagements": {
      "Matériels/Equipement": {
        "Nature": [
          "Circuit court/Locaux",
          "Industrie biologique",
          "Industrie raisonnée",
          "Produits labelisés/éthiques",
          "Produits de saison",
          "Produits de seconde main/récup",
          "Enseignes écoresponsables",
        ],
        "Acheminement": [
          "Mutualisé",
          "Zéro déchet",
          "Biocarburant",
        ],
      },
      "Établissement": [
        "Fournisseur d'énergie verte",
        "Entretien vert",
        "Mobilier - Seconde main",
        "Mobilier - Enseigne écoresponsable",
        "Dématérialisation",
      ],
      "Social": [
        "Déplacements/transports des salarié - Transports en commun",
        "Déplacements/transports des salarié - Mobilité douces",
        "Déplacements/transports des salarié - Covoiturage",
        "Contrats aidés, équité, diversité",
        "Dons à des associations - Invendus",
        "Dons à des associations - % de la marge",
        "Dons à des associations - 1 acheté / 1 donné",
        "Dons à des associations - Partenariat Carillon",
      ],
    },
  },
  SHOP: {
    "Type de boutique": [
      "Alimentaire",
      "Hygiène/beauté",
      "Mode",
      "Maison",
    ],
    "Prix": [
      "€",
      "€€",
      "€€€",
    ],
    "Engagements": {
      "Marchandise": {
        "Provenance": [
          "Circuit court/Locaux",
          "Industrie biologique",
          "Industrie raisonnée",
          "Produits labelisés/éthiques",
          "Produits de saison",
        ],
        "Acheminement": [
          "Mutualisé",
          "Zéro déchet",
          "Biocarburant",
        ],
        "Emballages produits": [
          "Ramenés par le client/consigné/réutilisables",
          "Recyclables/à partir de produits recyclés",
        ],
        "Valorisation des invendus": [
          "Dons",
          "Partenariat",
          "Compostage",
        ],
      },
      "Établissement": [
        "Fournisseur d'énergie verte",
        "Entretien vert",
        "Mobilier - Seconde main",
        "Mobilier - Enseigne écoresponsable",
        "Dématérialisation",
      ],
      "Social": [
        "Déplacements/transports des salarié - Transports en commun",
        "Déplacements/transports des salarié - Mobilité douces",
        "Déplacements/transports des salarié - Covoiturage",
        "Contrats aidés, équité, diversité",
        "Dons à des associations - Invendus",
        "Dons à des associations - % de la marge",
        "Dons à des associations - 1 acheté / 1 donné",
        "Dons à des associations - Partenariat Carillon",
      ],
    },
  },
  FOOD: {
    "Type de restaurant": [
      "Classique",
      "Fast good/Healthy",
      "Fast food",
      "Conceptuel/gastro",
      "Salon de thé/Pâtisserie",
    ],
    "Type de cuisine": [
      "Junkfood",
      "Afro",
      "Asiatique",
      "Indienne",
      "Italienne",
      "Méxicaine",
      "Orientale",
      "Traditionnelle",
    ],
    "Régime alimentaire": [
      "Sans gluten",
      "Vegan",
      "Veggie",
      "Terrasse",
      "À emporter",
    ],
    "Prix": [
      "€",
      "€€",
      "€€€",
    ],
    "Engagements": {
      "Produits": {
        "Carte": [
          "Circuit court/Locaux",
          "Industrie biologique",
          "Industrie raisonnée",
          "Produits labelisés/éthiques",
          "Produits de saison",
          "Produits végétaux",
        ],
        "Acheminement": [
          "Mutualisé",
          "Zéro déchet",
          "Biocarburant",
        ],
        "Transformation": [
          "Cuisinés sur place",
          "Emballages à emporter - Ramenés par le client",
          "Emballages à emporter - Recyclables",
        ],
        "Valorisation des invendus": [
          "Dons",
          "Partenariat",
          "Compostage",
        ],
      },
      "Établissement": [
        "Fournisseur d'énergie verte",
        "Entretien vert",
        "Mobilier - Seconde main",
        "Mobilier - Enseigne écoresponsable",
        "Dématérialisation",
      ],
      "Social": [
        "Déplacements/transports des salarié - Transports en commun",
        "Déplacements/transports des salarié - Mobilité douces",
        "Déplacements/transports des salarié - Covoiturage",
        "Contrats aidés, équité, diversité",
        "Dons à des associations - Invendus",
        "Dons à des associations - % de la marge",
        "Dons à des associations - 1 acheté / 1 donné",
        "Dons à des associations - Partenariat Carillon",
      ],
    },
  },
}

const places = [
  [ "Given",                                  "89 rue de Bagnolet",         "75020", "Paris", "FOOD", [ 48.8588241, 2.4013073 ] ],
  [ "Le Mezze Du Chef",                       "80 rue de Ménilmontant",     "75020", "Paris", "FOOD", [ 48.8687917, 2.3906549 ] ],
  [ "Love Me Cru",                            "44 rue de Tourtille",        "75020", "Paris", "FOOD", [ 48.8725932, 2.3801186 ] ],
  [ "Primeur",                                "4 rue Lemon",                "75020", "Paris", "FOOD", [ 48.87152769999999, 2.3782775 ] ],
  [ "Cantine Vagabonde",                      "11 rue d'Aubervilliers",     "75019", "Paris", "FOOD", [ 48.8851319, 2.3652465 ] ],
  [ "Le Faitout",                             "23 avenue Simon Bolivar",    "75019", "Paris", "FOOD", [ 48.8747937, 2.3825384 ] ],
  [ "Abattoir Végétal",                       "61 rue Ramey",               "75018", "Paris", "FOOD", [ 48.8905137, 2.3452899 ] ],
  [ "Le Myrha",                               "70 rue Myrha",               "75018", "Paris", "FOOD", [ 48.88683899999999, 2.3511101 ] ],
  [ "Jo & Nana Cakes",                        "6 rue Rennequin",            "75017", "Paris", "FOOD", [ 48.880818, 2.2993121 ] ],
  [ "Joy In Food",                            "2 rue Truffaut",             "75017", "Paris", "FOOD", [ 48.8843238, 2.3236026 ] ],
  [ "My Kitch'N",                             "82 rue Lemercier",           "75017", "Paris", "FOOD", [ 48.8886441, 2.3204164 ] ],
  [ "Super Vegan",                            "118 rue des Moines",         "75017", "Paris", "FOOD", [ 48.893261, 2.323312 ] ],
  [ "Happiz",                                 "23 rue des Sablons",         "75016", "Paris", "FOOD", [ 48.8650088, 2.2830765 ] ],
  [ "Vege",                                   "122 rue du théâtre",         "75015", "Paris", "FOOD", [ 48.8458584, 2.2953326 ] ],
  [ "Optique Durable",                        "2 rue Amelot",               "75011", "Paris", "FOOD", [ 48.8552578, 2.369516 ] ],
  [ "Vegan Food Tour",                        "Place de la République",     "75003", "Paris", "FOOD", [ 48.8673936, 2.3634144 ] ],
  [ "Lush",                                   "17 Boulevard de Vaugirard",  "75015", "Paris", "FOOD", [ 48.8413563, 2.319298 ] ],
  [ "Super Naturelle",                        "34 Rue Ramey",               "75018", "Paris", "FOOD", [ 48.8894497, 2.3463671 ] ],
  [ "Nata",                                   "28 Rue Planchat",            "75020", "Paris", "FOOD", [ 48.853849, 2.3983465 ] ],
  [ "Paint In Green",                         "78 rue Compans ",            "75019", "Paris", "FOOD", [ 48.87930900000001, 2.3921176 ] ],
  [ "Les Petites Pâtisseries - Raw & Vegan",  "44 rue du chemin vert",      "75011", "Paris", "FOOD", [ 48.8590064, 2.3747393 ] ],
  [ "La Vie Claire",                          "194 rue Lecourbe",           "75015", "Paris", "FOOD", [ 48.8406747, 2.2960318 ] ],
]

// for (let i = 0; i < Math.floor(Math.random() * 20 + 20); i++) {
//   places.push([
//     faker.random.words(Math.floor(Math.random()*3)+1).split(" ").map(el => el.charAt(0).toUpperCase() + el.slice(1)).join(" "),
//     `${Math.floor(Math.random()*300)+1} ${faker.address.streetName()}`,
//     faker.address.zipCode(),
//     faker.address.city(),
//     ["SHOP", "ACTIVITY"][Math.floor(Math.random()*2)],
//   ])
// }

const companies = [
  [
    "Bridge Audio", "COWORKING",
    [ "12 Rue d'Enghien", "75010", "Paris" ],
    [ "Zeroual", "Mahel", "mahel.zeroual@bridge.audio", "0689364340", "admin" ],
    [ "bridge.audio", "creaminal.com", "velvetcream.io", "velvetica.io" ],
    "cus_GlQOvvGAtVXSxO",
  ],
  [
    "Hope's Peak Academy", "SCHOOL",
    [ "1 Boulevard Saint-Martin", "75003", "Paris" ],
    [ "Yip", "Theodore", "theodore.yip@mono.net", "0666831336", "admin" ],
    [ "mono.net", "despair.com" ],
    "cus_GlQ5hFO0y1S5Zk",
  ],
  [
    "The World", "PLACE",
    [ "Shibuya City, Jingumae5-6-5", "〒150-0001", "Tokyo" ],
    [ "Sahbi", "Florian", "sahbi.s@otaku.com", "0610658929", "admin" ],
    [ "otaku.com", "otakupro.com" ],
    "cus_GlRIXTv11FPCQZ",
  ],
  [
    "Craft Egg", "COWORKING",
    [ "5 rue Albert de mun", "93700", "Drancy" ],
    [ "Pham", "Vincent", "vpham@craftegg.fr", "0666066606", "admin" ],
    [ "craftegg.fr", "bushimo.fr" ],
    "cus_Gm6ppabZl2gCbh",
  ],
  [
    "Electronic Arts", "COMPANY",
    [ "10 Rue Jules Genovesi", "93200", "Saint-Denis" ],
    [ "Lenglin", "Quentin", "lenglin.quentin@electronicarts.fr", "0612345789", "admin" ],
    [ "electronicarts.com", "electronicarts.fr" ],
    "cus_Gm70xgevDCrt7L",
  ],
  [
    "Ubisoft", "COMPANY",
    [ "126 Rue de Lagny", "93100", "Montreuil" ],
    [ "Leroy", "Valentine", "valentine.leroy@ubisoft.fr", "0698754321", "admin" ],
    [ "ubisoft.fr", "ubisoft.com" ],
    "cus_Gm78XpecPzqsb9",
  ],
  [
    "Pompom", "PLACE",
    [ "276 Rue Saint-Honoré", "75001", "Paris" ],
    [ "Levieux", "Christella", "christella@pompom.fr", "0698754321", "admin" ],
    [ "pompom.fr" ],
    "cus_Gm8cGgT1cfWIwq",
  ],
]

const challenges = [
  ["Vider sa corbeille de mails",                   "Clique sur un bouton.",                                                                 1],
  ["Utilise moins ta voiture",                      "Va au travail à pied, c'est bon pour la santé.",                                       10],
  ["Mange ton déjeuner froid",                      "Ne fais pas chauffer ou cuire ton manger, ça consomme l'énergie Mako.",               100],
  ["Parle avec 3 villageois",                       "Ne parle pas par internet, va les voir en vrai.",                                      50],
  ["Porter le même slip toute la semaine",          "Fais moins de machine, tu économises de l'eau et de l'énergie.",                      500],
  ["Arrose tes plantes avec de l'eau de pluie",     "Place des seaux des sur ton toit pour récolter de l'eau pour arroser tes plantes.",  1000],
  ["Débranche tes appareils non utilisés",          "Débranche ta TV et tes consoles de jeux si tu ne les utilises pas.",                   50],
  ["Ne prends pas l'ascenseur aujourd'hui",         "Si c'est possible, prends l'escalier.",                                                50],
  ["Écris avec un stylo écoresponsable",            "...",                                                                                  10],
  ["Récolte de l'eau de pluie",                     "Récolte de l'eau de pluie.",                                                         1500],
  ["Ne charge pas tes appareils pendant la nuit",   "Evite d'atteindre le 100% de batterie de tes appareils électroniques.",               400],
  ["Acheter une gourde en inox",                    "Acheter une gourde en inox et arrêter les bouteilles d’eau en plastique.",            300],
  ["Speedrun douche",                               "Prendre une douche de 5 minutes top chrono.",                                         100],
  ["Utiliser un sac réutilisable pour tes courses", "...",                                                                                 200],
  ["Mettre une plante sur le bureau",               "...",                                                                                1000],
]

const photos = [
  "https://madu-dev.s3.eu-west-2.amazonaws.com/default.jpg",
]

const createTagInput = (tagObject, category, root) =>
  Object.entries(tagObject).map(([ key, value ]) => ({
    label: key,
    children: {
      create: Array.isArray(value)
        ? value.map(label => ({ label, category, leaf: true }))
        : createTagInput(value, category),
    },
    category,
    root,
  }))


async function populateDb () {

  for (const [ firstName, lastName, email, password, role ] of users) {
    await prisma.createUser({
      firstName,
      lastName,
      email,
      password: await bcrypt.hash(password, 10),
      role,
    })
  }

  for (const url of photos) {
    await prisma.createPhoto({ url })
  }

  for (const category in defaultTags) {
    await Promise.all(
      createTagInput(defaultTags[category], category, true)
        .map(tagInput => prisma.createTag(tagInput))
    )
  }
  const tags = await prisma.tags({ where: { leaf: true } })

  for (const [ name, street, zipCode, city, category, coordinates ] of shuffle(places)) {
    await prisma.createPlace({
      name,
      category,
      address: { create: {
        street,
        zipCode,
        city,
        location: { create: {
          type: "Point",
          coordinates: { set: coordinates || [ randomBetween(48.84, 48.86), randomBetween(2.41, 2.43) ] },
        } },
      } },
      user: { create: {
        email: faker.internet.email(),
        phone: faker.phone.phoneNumber(),
        role: "PLACE",
      } },
      social: { create: {
        website: faker.internet.url(),
        facebook: faker.internet.url(),
        instagram: faker.internet.url(),
      } },
      headline: faker.lorem.sentence(),
      description: faker.lorem.paragraph(),
      hours: { create: [
        { day: "MONDAY",    start: "09:00", end: "19:00" },
        { day: "TUESDAY",   start: "09:00", end: "19:00" },
        { day: "WEDNESDAY", start: "09:00", end: "19:00" },
        { day: "THURSDAY",  start: "09:00", end: "19:00" },
        { day: "FRIDAY",    start: "09:00", end: "19:00" },
        { day: "SATURDAY",  start: null, end: null },
        { day: "SUNDAY",    start: null, end: null },
      ] },
      photos: { connect: photos.map(url => ({ url })) },
      tags: { connect: tags.filter(t => t.category === category && Math.random() < 0.15).map(({ id }) => ({ id })) },
    })
  }
  const companiesId = []
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
    companiesId.push(id)
  }

  for (let i = 0; i < 100; i++) {
    await prisma.createUser({
      firstName: faker.name.firstName(),
      lastName: faker.name.lastName(),
      email: faker.internet.email().toLowerCase(),
      password: await bcrypt.hash("user", 10),
      role: "USER",
      company: { connect: { id: randomFromArray(companiesId) } },
    })
  }

  for (const [ name, description, value ] of challenges) {
    await prisma.createChallenge({ name, description, value })
  }
}

const clearDb = async () => {
  await prisma.deleteManyUsers()
  await prisma.deleteManyTags()
  await prisma.deleteManyPlaces()
  await prisma.deleteManyCompanies()
  await prisma.deleteManyChallenges()
}

(async function () {
  await clearDb()
  await populateDb()
  console.log("db seeded!")
})()


