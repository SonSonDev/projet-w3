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
      "Casher",
      "Halal",
      "Sans gluten",
      "Vegan",
      "Végétarien",
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
      "Accessibilité": [
        "Handicap moteur",
        "Handicap auditif",
        "Handicap visuel",
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
    "Accessibilité": [
      "Handicap moteur",
      "Handicap auditif",
      "Handicap visuel",
    ],
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
      "Casher",
      "Halal",
      "Sans gluten",
      "Vegan",
      "Végétarien",
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
    "Accessibilité": [
      "Handicap moteur",
      "Handicap auditif",
      "Handicap visuel",
    ],
  },
}

const places = [
  [ "Given",                                  "89 rue de Bagnolet",         "75020", "Paris", "FOOD", [ 48.8588241, 2.4013073 ], "https://madu-staging.s3.eu-west-2.amazonaws.com/Given.jpg" ],
  [ "Le Mezze Du Chef",                       "80 rue de Ménilmontant",     "75020", "Paris", "FOOD", [ 48.8687917, 2.3906549 ], "https://madu-staging.s3.eu-west-2.amazonaws.com/Le%20Mezze%20Du%20Chef.jpg" ],
  [ "Love Me Cru",                            "44 rue de Tourtille",        "75020", "Paris", "FOOD", [ 48.8725932, 2.3801186 ], "https://madu-staging.s3.eu-west-2.amazonaws.com/Love%20Me%20Cru.jpg" ],
  [ "Primeur",                                "4 rue Lemon",                "75020", "Paris", "FOOD", [ 48.87152769999999, 2.3782775 ], "https://madu-staging.s3.eu-west-2.amazonaws.com/Primeur.jpg" ],
  [ "Cantine Vagabonde",                      "11 rue d'Aubervilliers",     "75019", "Paris", "FOOD", [ 48.8851319, 2.3652465 ], "https://madu-staging.s3.eu-west-2.amazonaws.com/Cantine%20Vagabonde.jpg" ],
  [ "Le Faitout",                             "23 avenue Simon Bolivar",    "75019", "Paris", "FOOD", [ 48.8747937, 2.3825384 ], "https://madu-staging.s3.eu-west-2.amazonaws.com/Le%20Faitout.jpg" ],
  [ "Abattoir Végétal",                       "61 rue Ramey",               "75018", "Paris", "FOOD", [ 48.8905137, 2.3452899 ], "https://madu-staging.s3.eu-west-2.amazonaws.com/Abattoir%20Ve%CC%81ge%CC%81tal.jpg" ],
  [ "Le Myrha",                               "70 rue Myrha",               "75018", "Paris", "FOOD", [ 48.88683899999999, 2.3511101 ], "https://madu-staging.s3.eu-west-2.amazonaws.com/Le%20Myrha.jpg" ],
  [ "Jo & Nana Cakes",                        "6 rue Rennequin",            "75017", "Paris", "FOOD", [ 48.880818, 2.2993121 ], "https://madu-staging.s3.eu-west-2.amazonaws.com/Jo%20%26%20Nana%20Cakes.jpeg" ],
  [ "Joy In Food",                            "2 rue Truffaut",             "75017", "Paris", "FOOD", [ 48.8843238, 2.3236026 ], "https://madu-staging.s3.eu-west-2.amazonaws.com/Joy%20In%20Food.jpg" ],
  [ "My Kitch'N",                             "82 rue Lemercier",           "75017", "Paris", "FOOD", [ 48.8886441, 2.3204164 ], "https://madu-staging.s3.eu-west-2.amazonaws.com/My%20Kitch%27N.jpg" ],
  [ "Super Vegan",                            "118 rue des Moines",         "75017", "Paris", "FOOD", [ 48.893261, 2.323312 ], "https://madu-staging.s3.eu-west-2.amazonaws.com/Super%20Vegan.jpg" ],
  [ "Happiz",                                 "23 rue des Sablons",         "75016", "Paris", "FOOD", [ 48.8650088, 2.2830765 ], "https://madu-staging.s3.eu-west-2.amazonaws.com/Happiz.jpg" ],
  [ "Vege",                                   "122 rue du théâtre",         "75015", "Paris", "FOOD", [ 48.8458584, 2.2953326 ], "https://madu-staging.s3.eu-west-2.amazonaws.com/Vege.jpg" ],
  [ "Optique Durable",                        "2 rue Amelot",               "75011", "Paris", "SHOP", [ 48.8552578, 2.369516 ], "https://madu-staging.s3.eu-west-2.amazonaws.com/Optique%20Durable.jpeg" ],
  [ "Vegan Food Tour",                        "Place de la République",     "75003", "Paris", "FOOD", [ 48.8673936, 2.3634144 ], "https://madu-staging.s3.eu-west-2.amazonaws.com/Vegan%20Food%20Tour.png" ],
  [ "Lush",                                   "17 Boulevard de Vaugirard",  "75015", "Paris", "SHOP", [ 48.8413563, 2.319298 ], "https://madu-staging.s3.eu-west-2.amazonaws.com/Lush.jpg" ],
  [ "Super Naturelle",                        "34 Rue Ramey",               "75018", "Paris", "FOOD", [ 48.8894497, 2.3463671 ], "https://madu-staging.s3.eu-west-2.amazonaws.com/Super%20Naturelle.jpg" ],
  [ "Nata",                                   "28 Rue Planchat",            "75020", "Paris", "ACTIVITY", [ 48.853849, 2.3983465 ], "https://madu-staging.s3.eu-west-2.amazonaws.com/Nata.png" ],
  [ "Paint In Green",                         "78 rue Compans ",            "75019", "Paris", "FOOD", [ 48.87930900000001, 2.3921176 ], "https://madu-staging.s3.eu-west-2.amazonaws.com/Paint%20In%20Green.jpg" ],
  [ "Les Petites Pâtisseries - Raw & Vegan",  "44 rue du chemin vert",      "75011", "Paris", "FOOD", [ 48.8590064, 2.3747393 ], "https://madu-staging.s3.eu-west-2.amazonaws.com/Les%20Petites%20Pa%CC%82tisseries%20-%20Raw%20%26%20Vegan.jpg" ],
  [ "La Vie Claire",                          "194 rue Lecourbe",           "75015", "Paris", "SHOP", [ 48.8406747, 2.2960318 ], "https://madu-staging.s3.eu-west-2.amazonaws.com/La%20Vie%20Claire.jpeg" ],
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
  ["Vider sa corbeille de mails",                   "Clique sur un bouton.",                                                                 1,       "ENERGY"],
  ["Utilise moins ta voiture",                      "Va au travail à pied, c'est bon pour la santé.",                                       10,       "ENERGY"],
  ["Mange ton déjeuner froid",                      "Ne fais pas chauffer ou cuire ton manger, ça consomme l'énergie Mako.",               100,       "ENERGY"],
  ["Parle avec 3 villageois",                       "Ne parle pas par internet, va les voir en vrai.",                                      50,       "ENERGY"],
  ["Porter le même slip toute la semaine",          "Fais moins de machine, tu économises de l'eau et de l'énergie.",                      500,        "WATER"],
  ["Arrose tes plantes avec de l'eau de pluie",     "Place des seaux des sur ton toit pour récolter de l'eau pour arroser tes plantes.",  1000,        "WATER"],
  ["Débranche tes appareils non utilisés",          "Débranche ta TV et tes consoles de jeux si tu ne les utilises pas.",                   50,       "ENERGY"],
  ["Ne prends pas l'ascenseur aujourd'hui",         "Si c'est possible, prends l'escalier.",                                                50,       "ENERGY"],
  ["Récolte de l'eau de pluie",                     "Récolte de l'eau de pluie.",                                                         1500,        "WATER"],
  ["Ne charge pas tes appareils pendant la nuit",   "Evite d'atteindre le 100% de batterie de tes appareils électroniques.",               400,       "ENERGY"],
  ["Acheter une gourde en inox",                    "Acheter une gourde en inox et arrêter les bouteilles d’eau en plastique.",            300,  "CONSUMPTION"],
  ["Speedrun douche",                               "Prendre une douche de 5 minutes top chrono.",                                         100,        "WATER"],
  ["Utiliser un sac réutilisable pour tes courses", "...",                                                                                 200,  "CONSUMPTION"],
  ["Mettre une plante sur le bureau",               "...",                                                                                1000, "ALIMENTATION"],
]

const articles = [
  {
    "theme": "ENERGY",
    "title": "Dégivrer son congélateur régulièrement pour faire des économies",
    "content": "Si vous procédez à un dégivrage de votre congélateur et à son nettoyage régulièrement, vous n’aurez que peu de givre à l’intérieur et toute l’opération sera beaucoup plus rapide que si vous tardez à le faire. Dans ce cas-là, il vous suffira donc d’utiliser simplement une éponge avec de l’eau chaude ou tiède pour décoller la glace. Vous pouvez aussi vous munir d’un vaporisateur rempli d’eau bouillante pour en asperger les parois. Ensuite, frottez-les avec délicatesse, à l’aide d’un grattoir, pour être sûr d’éliminer toute la glace. Faites ceci jusqu’à ce que vous ayez enlevé tout le givre.\n\nPour de multiples raisons, vous pouvez vous retrouver avec énormément de givre. Ne tardez donc pas à procéder à un dégivrage de votre congélateur ! Dans ce cas, pour vous faciliter les choses, faites bouillir de l’eau dans une casserole puis déposez-la sur un repose-plat dans votre appareil. Ensuite, fermez la porte et laissez agir la chaleur pendant environ 15 minutes. La glace fondra sans que vous ayez à fournir le moindre effort ! Il existe aussi d’autres astuces, comme l’utilisation d’un sèche-cheveux ou encore d’un nettoyeur vapeur. Cependant, même si la glace vous résiste, n’utilisez jamais d’objets pointus ou aiguisés qui ne feraient qu’endommager votre équipement, ou pire, le rendre complètement inutilisable.\n\nPour terminer de dégivrer votre congélateur, il ne vous reste plus qu’une étape de nettoyage : celle de la carrosserie et des joints. Ce sont souvent des éléments oubliés qui peuvent pourtant être de véritables nids à bactéries ! Pour cela, vous pouvez comme précédemment utiliser une éponge imprégnée d’eau et de vinaigre blanc. Et c’est aussi un bon moment pour vérifier la bonne étanchéité des articulations : fermez alors la porte du congélateur sur une feuille de papier. Si vous réussissez trop facilement à l’enlever, c’est que les joints sont usés. Enfin, vous pouvez finir par rebrancher votre appareil. Pour y replacer les denrées alimentaires congelées.",
    "videoUrl": "",
    "photo": { "uri": "https://madu-staging.s3.eu-west-2.amazonaws.com/De%CC%81givrer%20son%20conge%CC%81lateur%20%20re%CC%81gulie%CC%80rement%20pour%20faire%20des%20e%CC%81conomies.jpg" },
    "quiz": {
      "question": "Quel pourcentage d’énergie en plus est consommée par un congélateur non dégivré ?",
      "choices": ["5%","15%","30%","60%"],
      "answer": "30%",
      "value": 100,
    },
  },
  {
    "theme":"ENERGY",
    "title":"Comment bien régler son thermostat pour faire des économies",
    "content":"Tout ce qu’il faut savoir pour bien régler le thermostat et les vannes thermostatiques de ses radiateurs, pour un chauffage optimal.\n\nLa façon dont on règle le thermostat et les vannes thermostatiques peut influencer sa consommation d’énergie pour le chauffage et donc le montant de la facture. Le chauffage consomme en moyenne 65 à 70 % de l’énergie dans un logement.\n\nDiminuer le chauffage pendant la nuit et lorsqu’on est absent permet d’économiser jusqu’à 25%. Et diminuer la température de 1°C réduit la consommation de 7%. Pour cela, il faut régler le thermostat et les vannes des radiateurs correctement.\n\nBien sûr, on a veillé en amont à isoler son habitation le mieux possible afin de diminuer les besoins en chauffage. Et à installer un bon thermostat si ce n’est fait, pour assurer confort et économies.\n\nLe thermostat commande la chaudière. On y règle température à laquelle on souhaite chauffer la pièce (= température de consigne) et il ordonne à la chaudière de fonctionner jusqu’à ce que cette température soit atteinte. Pour cela, il se base sur la température de la pièce dans laquelle il est installé (souvent le salon).\n\nOn chauffe plutôt :\n- à 19 ou 20 °C quand on est à la maison (régime de confort) ;\n- à 15 ou 16°C la nuit et quand on s’absente (régime d'économie). On peut aussi couper totalement le chauffage (la consommation est alors nulle). Il faut simplement relancer suffisamment tôt pour retrouver sa température de confort.\nEt on adapte les réglages en fonction du type de thermostat.\n\nDiminuer le chauffage la nuit et en cas d'absence entraîne une économie de 10 à 25% d'énergie. Sur une facture moyenne de 1000 €/an (1000 litres de mazout ou 1000 m³ de gaz), le gain est ainsi de 100 à 250€/an.\n\n",
    "videoUrl":"",
    "photo":{"uri":"https://madu-staging.s3.eu-west-2.amazonaws.com/will-malott-Xst4N6JnlvU-unsplash.jpg"},
    "quiz":{
      "question":"quizQuestion",
      "choices":["aaaaa","bbbb","ccccc","ddddd"],
      "answer":"aaaaa",
      "value":123321
    }
  },
  {"theme":"CONSUMPTION","title":"Parfumer son intérieur sans polluer","content":"Selon une étude du Crédoc (Centre de recherche pour l'étude et l'observation des conditions de vie) publiée en 2009, 9% des Français utilisent des \"parfums d'ambiance\" tous les jours et 15% au moins une fois par semaine.Une fréquence d'utilisation inquiétante, quand on sait que ces parfums et encens de synthèse sont considérés comme des polluants nuisant à la qualité de l'air d'intérieur. Une enquête de l'Inéris (Institut national de l'environnement industriel et des risques) rendue publique en 2013 pointait en effet du doigt la dangerosité des bâtons d'encens et des bougies parfumées qui, en se consumant, émettraient des particules toxiques comme le benzène ou le formaldéhyde, des produits dangereux considérés comme potentiellement cancérogènes par l'Union européenne.\n\nQuant aux parfums d'intérieurs, ils ont longtemps été soupçonnés de contenir des phtalates, des perturbateurs endocriniens qui bloquent l'effet de la testostérone, imitent les oestrogènes et modifient la production d'hormones thyroïdiennes.\n\nAutant de raison de miser sur les odeurs 100% naturelles (et testées et approuvées par nos grands-mères) pour parfumer nos intérieurs.\n\n1. Ouvrez la fenêtre\nVotre appartement sent le renfermé ou la chambre de votre ado la chaussette sale ? Le premier réflexe est d'ouvrir en grand la fenêtre (pensez à couper les radiateurs) pour rafraîchir votre intérieur. Selon l'Agence de Protection de l'Environnement (EPA) américaine, la pollution de l'air est 2 à 5 fois plus élevée à l'intérieur des domiciles qu'à l'extérieur. Une bonne raison d'aérer votre intérieur au moins une fois par semaine.\n\n2. Faites bouillir de la cannelle\nPour donner à votre maison une ambiance douce et hivernale, il vous suffit d'avoir quelques bâtons de cannelle (ou à défaut de la cannelle en poudre) à portée de main. Remplissez une casserole d'eau et portez à ébullition. Une fois que l'eau bout, ajoutez la cannelle et laissez mijoter pendant quelques minutes, le temps que l'odeur se disperse dans toute la maison.\n\n3. Misez sur le citron\nAnti-bactérien, le citron est idéal pour nettoyer votre intérieur et apporter une délicieuse odeur de frais. Utilisez-le sous forme de jus ou d'huile essentielle pour nettoyer votre salle de bain et enlever les résidus de savon et de calcaire, nettoyer vos toilettes (en complément du bicarbonate de soude) ou laver les sols.\n\n4. Fabriquez votre propre spray assainisseur d'air\nLaissez tomber les sprays aux parfums de synthèse et autres désodorisants d'intérieur. Pour parfumer votre demeure à moindre coût, préparez vous-même votre assainisseur d'air avec du jus de citron vert, de l'eau et du bicarbonate. Vaporisez-le pour neutraliser les odeurs et apporter de la fraîcheur.\n\n5. Cuisinez !\nIl n'y a pas de meilleure odeur au monde que celle de la cuisine maison. Faites cuire des cookies, une tarte aux pommes ou un gâteau au chocolat et promis, vous vous sentirez chez vous comme dans un cocon.\n\n6. Achetez des fleurs\nEn plus de décorer joliment votre intérieur, un bouquet de fleurs fraîches peut faire des merveilles en apportant d'agréables senteurs champêtres. Choisissez une variété à l'odeur enivrante, comme les roses, les pivoines ou les violettes et posez négligemment la composition dans un joli vase sur un comptoir ou votre table de salle à manger. Effet assuré.\n\n7. Optez pour le café moulu\nMême ceux qui ne sont pas fans du goût du café l'attestent : rien ne vaut l'odeur de grains de café fraîchement moulus le matin. Profitez de votre toute nouvelle Chemex pour vous offrir une machine à moudre et utilisez-la le dimanche matin pour réveiller la maisonnée avec une délicieuse odeur de café frais. Miam !\n\n8. Revenez aux pots-pourris\nAutre astuce testée et retestée par nos-grands-mères : celle du pot-pourri. Actualisez-la en dispersant dans les pièces principales de savants mélanges de fleurs et fruits séchées, épices et bois parfumés. Vous pouvez en remplir quelques petits sachets en coton ou en lin, que vous placerez ensuite dans vos tiroirs et armoires.\n\n9. Pensez aux huiles essentielles\nDernière astuce pour parfumer naturellement votre intérieur : les huiles essentielles. Utilisées avec un diffuseur acheté dans le commerce, et combinées entre elles, elles apportent à votre intérieur une odeur de frais et assainissent durablement l'air. Attention toutefois de ne pas en abuser. Sachez également que la diffusion d'huiles essentielles est vivement déconseillée auprès des femmes enceintes et des enfants en bas âge","videoUrl":"","photo":{"uri":"https://madu-staging.s3.eu-west-2.amazonaws.com/solid-toiletries.png"},"quiz":{"question":"quizQuestion","choices":["aaaaa","bbbb","ccccc","ddddd"],"answer":"bbbb","value":123321}},
  {"theme":"ALIMENTATION","title":"Réalisez vos propres conserves","content":"Préparez vos Bocaux et Terrines Le Parfait\nAssurez-vous que toutes les surfaces ne présentent pas d’ébréchures, de traces d’abrasion ou de résidus collés. Nettoyez bocaux, terrines et couvercles à l’eau chaude savonneuse. Evitez tout choc entre les bocaux ou les terrines. N’utilisez pas d’éponge métallique ou abrasive pour nettoyer vos bocaux et terrines.\n\nAprès le nettoyage, rincez abondamment vos bocaux et terrines à l’eau bien chaude, puis laissez sécher à l’air libre.\n\nChoisissez des aliments sains et frais\nLes produits et denrées alimentaires que vous avez choisis de conserver doivent être parfaitement frais, sains et adaptés à la mise en conserve. N’utilisez jamais de produits ou ingrédients congelés ou qui ont été décongelés.\n\nAu moment de la préparation de fruits ou de légumes, veillez à ne pas mettre en contact les aliments épluchés avec les déchets (épluchures, feuilles).\n\nCuisinez vos aliments\nLes légumes doivent être blanchis si besoin.\nLes volailles doivent être entièrement évidées et l’intérieur soigneusement lavé à l’eau courante.\nRespectez les indications de votre recette. Toutes les opérations\n\nRemplissez vos Bocaux ou Terrines Le Parfait\nChaque fois que le produit et son procédé de préparation le permettent, remplissez les bocaux ou terrines avec une préparation la plus chaude possible, même bouillante.\nRemplissez vos bocaux ou terrines jusqu’au niveau de remplissage gravé sur le corps ou jusqu’à 2 cm du rebord.\nEnsuite, attendez quelques minutes afin de vérifier que votre préparation soit répartie correctement dans la masse, de manière à supprimer les poches d’air.\nComplétez si nécessaire.\n\nAttention : Dans le cas de terrines Le Parfait Familia Wiss, n’utilisez pas de saumure, sauce ou jus de couverture trop acide (alcool pur, vinaigre, etc.). En contact avec les parties métalliques, l’acide favorise la corrosion des capsules et des couvercles.\n\nFermez vos Bocaux ou Terrines Le Parfait\nAvant de fermer vos bocaux et terrines, prenez soin d’utiliser une nouvelle rondelle en caoutchouc universelle Le Parfait Super adaptée au format de votre bocal ou terrine.\n\nEbouillantez les rondelles avant de les ajuster sur les couvercles. Vérifiez que le bord de votre bocal ou terrine est bien propre avant de fermer. En effet, une particule coincée entre la rondelle et le verre ferait échouer votre fabrication de conserves.\n\nPour finir, enclenchez à fond le système de fermeture et procédez immédiatement au traitement thermique quand la recette en nécessite un.\n\nLes procédés de conservation diffèrent selon les recettes. Certaines peuvent utiliser le vinaigre, l’huile ou le sel comme conservateurs, un traitement thermique n’étant alors pas forcément nécessaire.\n\nDans le cas des terrines Le Parfait Familia Wiss, utilisez toujours les capsules Le Parfait Familia Wiss neuves spécialement étudiées pour s’adapter à vos terrines. Assurez-vous que les capsules ne sont pas déformées, que le joint est en bon état, puis vissez le couvercle sans forcer avant de procéder au traitement thermique.\n\nTraitement thermique\nPour réaliser le traitement thermique de vos bocaux, plusieurs options s’offrent à vous :\n\n- Les stérilisateurs électriques savent tout faire tout seuls et vous permettront de profiter de plus de temps libre. Ils sont très simple d’utilisation, placez les bocaux à l’intérieur en prenant soin de bien les caler pour qu’ils ne s’entrechoquent pas et ne se retournent pas pendant le traitement thermique. Remplissez d’eau le stérilisateur, immergez complètement les bocaux, puis remettez le couvercle. Il suffit ensuite de régler la durée et la température et c’est tout !\n\n- Vous pouvez aussi utiliser un autocuiseur ou tout simplement une grande marmite ou une cocotte-minute. Dans ce cas, mettez un torchon au fond de votre récipient pour empêcher tout contact direct entre le verre et le métal, placez les bocaux à l’intérieur en prenant soin de bien les caler pour qu’ils ne s’entrechoquent pas et ne se retournent pas pendant le traitement thermique. Recouvrez les bocaux d'au moins 3cm d'eau si vous utilisez une grande marmite et couvrez. Dans le cas d'un autocuiseur, remplissez d’eau en respectant les instructions de remplissage de l’autocuiseur et portez à 100°C (température d’ébullition, ou quand la soupape de l’autocuiseur ou de la cocotte minute frémit). A partir de ce moment, vous pouvez activer votre minuteur (mais un réveil peut aussi faire l’affaire !).\n\nQuelle que soit l’option choisie, il faudra laisser l’eau refroidir naturellement avant de sortir ses bocaux. Une fois le refroidissement obtenu, vous pourrez récupérer vos bocaux et terrines, il faudra les disposer debout dans un endroit sec et frais, à l’abri de la lumière, mécanisme Le Parfait Super déverrouillé, couvercle Le Parfait Familia Wiss retiré.\n\nVérifiez et stockez vos conserves\nLorsque les bocaux ou terrines sont totalement refroidis, vérifiez que le vide à l’intérieur est correct en débloquant le système de fermeture. Le couvercle doit rester « collé » au bocal et résister à la traction.\n\nPour les bocaux ou terrines Le Parfait Super, si le couvercle ne reste pas collé une fois le système de fermeture débloqué, cela peut-être dû à :\n\n- Un remplissage incorrect : trop faible ou trop important.\n- Un traitement thermique incomplet : temps trop court et/ou température trop basse.\n- Un défaut d’étanchéité : ébréchure ou souillure sur le bord ou sur le couvercle.\n- L’utilisation d’une rondelle trop ancienne, usagée, détériorée ou d’un modèle inadapté au format.\n\nRemédiez à l’anomalie constatée et recommencez le traitement thermique en utilisant impérativement une autre rondelle.\nDans le cas des terrines Le Parfait Familia Wiss, procédez de même en dévissant le couvercle. La capsule doit être collée à la terrine et résister à la traction. Si la capsule n’est pas maintenue sur la terrine par le vide, recommencez le traitement thermique en utilisant impérativement une capsule neuve.\n\nPour conserver vos préparations pendant plusieurs mois, ne remettez pas les couvercles sur les terrines Le Parfait Familia Wiss ou ne rebloquez pas le mécanisme des bocaux ou terrines Le Parfait Super.\nStockez-les dans un endroit sec et frais, à l’abri de la lumière directe.\n\nOuvrez vos bocaux\nAvant d’ouvrir vos bocaux ou terrines, vérifiez qu’il y a toujours le vide en procédant comme à l’étape 7.\n\nNe consommez pas les aliments, même pour les goûter, dans les cas suivants :\n- Le couvercle des bocaux ou terrines Le Parfait Super ne reste pas collé une fois le système de fermeture débloqué\n- La capsule des terrines Le Parfait Familia Wiss ne reste pas collée à la terrine\n- Vous avez tout simplement un doute sur le bon état de conservation\n\nL’ouverture doit être effectuée par un adulte. Tirez sur la languette de la rondelle de manière à faire pénétrer l’air dans le bocal ou la terrine Le Parfait Super, le couvercle se décollera.\nPour une ouverture plus aisée, il est recommandé d’utiliser le tire-rondelle Le Parfait conçu spécialement pour cet usage. Dans le cas des terrines Le Parfait Familia Wiss, il suffit de percer la capsule.","videoUrl":"","photo":{"uri":"https://madu-staging.s3.eu-west-2.amazonaws.com/brooke-lark-uarQNKJUdJk-unsplash1.jpg"},"quiz":{"question":"quizQuestion","choices":["aaaaa","bbbb","ccccc","ddddd"],"answer":"ccccc","value":123321}},
]

const defaultPhoto = "https://madu-dev.s3.eu-west-2.amazonaws.com/default.jpg"
const photos = [
  defaultPhoto,
  ...places.map(p => p[6]).filter(Boolean),
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

  for (const uri of photos) {
    await prisma.createPhoto({ uri })
  }

  for (const category in defaultTags) {
    await Promise.all(
      createTagInput(defaultTags[category], category, true)
        .map(tagInput => prisma.createTag(tagInput))
    )
  }
  const tags = await prisma.tags({ where: { leaf: true } })

  for (const [ name, street, zipCode, city, category, coordinates, uri ] of shuffle(places)) {
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
      photos: { connect: [ { uri: uri || defaultPhoto } ] },
      tags: { connect: tags.filter(t => t.category === category && Math.random() < 0.3 || t.label === "€€").map(({ id }) => ({ id })) },
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

  for (const [ name, description, value, theme ] of challenges) {
    await prisma.createChallenge({ name, description, value, theme })
  }

  for (const article of articles) {
    article.photo = { create: article.photo },
    article.quiz = { create: article.question },
    article.date = String(new Date().getTime())
    await prisma.createArticle(article)
  }
}

const clearDb = async () => {
  await prisma.deleteManyUsers()
  await prisma.deleteManyTags()
  await prisma.deleteManyPhotos()
  await prisma.deleteManyPlaces()
  await prisma.deleteManyCompanies()
  await prisma.deleteManyChallenges()
  await prisma.deleteManyArticles()
}

(async function () {
  await clearDb()
  await populateDb()
  console.log("db seeded!")
})()


