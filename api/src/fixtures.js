const bcrypt = require("bcryptjs")
const faker = require("faker/locale/fr")
const { prisma } = require("./generated/prisma-client")
const { mutations: { setAllCompaniesChallenges }} = require("./resolvers/company.js")
const subDays = require("date-fns/subDays")

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
  [ "Chrystal", "Le Liegard", "w3p2020g7@gmail.com"       , "admin", "SUPER_ADMIN" ],
  [ "Eric"    , "Priou"     , "eric.priou@hetic.net"      , "admin", "SUPER_ADMIN" ],
  [ "Antoine" , "Masselot"  , "antoine.masselot@hetic.net", "admin", "SUPER_ADMIN" ],
]


const defaultTags = {
  ACTIVITY: {
    "Accessibilité": [
      "Handicap moteur",
      "Handicap auditif",
      "Handicap visuel",
    ],
    "Prix": [
      "€",
      "€€",
      "€€€",
    ],
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
    "Engagements": {
      "Matériels/Équipement": {
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
        "Déplacements/transports des salariés - Transports en commun",
        "Déplacements/transports des salariés - Mobilité douces",
        "Déplacements/transports des salariés - Covoiturage",
        "Contrats aidés, équité, diversité",
        "Dons à des associations - Invendus",
        "Dons à des associations - % de la marge",
        "Dons à des associations - 1 acheté / 1 donné",
        "Dons à des associations - Partenariat Carillon",
      ],
    },
  },
  SHOP: {
    "Accessibilité": [
      "Handicap moteur",
      "Handicap auditif",
      "Handicap visuel",
    ],
    "Prix": [
      "€",
      "€€",
      "€€€",
    ],
    "Type de boutique": [
      "Alimentaire",
      "Hygiène/beauté",
      "Mode",
      "Maison",
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
        "Déplacements/transports des salariés - Transports en commun",
        "Déplacements/transports des salariés - Mobilité douces",
        "Déplacements/transports des salariés - Covoiturage",
        "Contrats aidés, équité, diversité",
        "Dons à des associations - Invendus",
        "Dons à des associations - % de la marge",
        "Dons à des associations - 1 acheté / 1 donné",
        "Dons à des associations - Partenariat Carillon",
      ],
    },
  },
  FOOD: {
    "Accessibilité": [
      "Handicap moteur",
      "Handicap auditif",
      "Handicap visuel",
    ],
    "Prix": [
      "€",
      "€€",
      "€€€",
    ],
    "Type de restaurant": [
      "Classique",
      "Fast good/Healthy",
      "Fast food",
      "Conceptuel/gastro",
      "Salon de thé/Pâtisserie",
    ],
    "Type de cuisine": [
      "Junk food",
      "Afro",
      "Asiatique",
      "Indienne",
      "Italienne",
      "Mexicaine",
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
        "Déplacements/transports des salariés - Transports en commun",
        "Déplacements/transports des salariés - Mobilité douces",
        "Déplacements/transports des salariés - Covoiturage",
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
  [ "La Vie Claire 2",                        "71 rue Saint-Dominique",     "75007", "Paris", "SHOP", [ 48.8598655, 2.309814 ], "https://madu-staging.s3.eu-west-2.amazonaws.com/La%20Vie%20Claire.jpeg" ],
  [ "La Vie Claire 3",                        "5 rue Albert de mun",        "93700", "Drancy", "SHOP", [ 48.9133557, 2.4618855 ], "https://madu-staging.s3.eu-west-2.amazonaws.com/La%20Vie%20Claire.jpeg" ],
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
    [ 48.8719021, 2.3521909 ],
    "cus_GlQOvvGAtVXSxO",
  ],
  [
    "Hope's Peak Academy", "SCHOOL",
    [ "71 rue Saint-Dominique", "75007", "Paris" ],
    [ "Yip", "Theodore", "theodore.yip@mono.net", "0666831336", "admin" ],
    [ "mono.net", "despair.com" ],
    [ 48.8598655, 2.309814 ],
    "cus_GlQ5hFO0y1S5Zk",
  ],
  [
    "The World", "PLACE",
    [ "Shibuya City, Jingumae5-6-5", "〒150-0001", "Tokyo" ],
    [ "Sahbi", "Florian", "sahbi.s@otaku.com", "0610658929", "admin" ],
    [ "otaku.com", "otakupro.com" ],
    [ 35.6660256, 139.70867 ],
    "cus_GlRIXTv11FPCQZ",
  ],
  [
    "Craft Egg", "COWORKING",
    [ "5 rue Albert de mun", "93700", "Drancy" ],
    [ "Pham", "Vincent", "vpham@craftegg.fr", "0666066606", "admin" ],
    [ "craftegg.fr", "bushimo.fr" ],
    [ 48.9133557, 2.4618855 ],
    "cus_Gm6ppabZl2gCbh",
  ],
  [
    "Electronic Arts", "COMPANY",
    [ "10 Rue Jules Genovesi", "93200", "Saint-Denis" ],
    [ "Lenglin", "Quentin", "lenglin.quentin@electronicarts.fr", "0612345789", "admin" ],
    [ "electronicarts.com", "electronicarts.fr" ],
    [ 48.9263246, 2.3428107 ],
    "cus_Gm70xgevDCrt7L",
  ],
  [
    "Ubisoft", "COMPANY",
    [ "126 Rue de Lagny", "93100", "Montreuil" ],
    [ "Leroy", "Valentine", "valentine.leroy@ubisoft.fr", "0698754321", "admin" ],
    [ "ubisoft.fr", "ubisoft.com" ],
    [ 48.84973429999999, 2.4186524 ],
    "cus_Gm78XpecPzqsb9",
  ],
  [
    "Pompom", "PLACE",
    [ "276 Rue Saint-Honoré", "75001", "Paris" ],
    [ "Levieux", "Christella", "christella@pompom.fr", "0698754321", "admin" ],
    [ "pompom.fr" ],
    [ 48.8645749, 2.3332693 ],
    "cus_Gm8cGgT1cfWIwq",
  ],
]

const defaultChallenges = [
  ["Vider sa corbeille de mails",                   "Clique sur un bouton.",                                                                10,       "ENERGY"],
  ["Utilise moins ta voiture",                      "Va au travail à pied, c'est bon pour la santé.",                                       10,       "ENERGY"],
  ["Mange ton déjeuner froid",                      "Ne fais pas chauffer ou cuire ton manger, ça consomme l'énergie Mako.",                20,       "ENERGY"],
  ["Parle avec 3 villageois",                       "Ne parle pas par internet, va les voir en vrai.",                                      10,       "ENERGY"],
  ["Débranche tes appareils non utilisés",          "Débranche ta TV et tes consoles de jeux si tu ne les utilises pas.",                   20,       "ENERGY"],
  ["Ne prends pas l'ascenseur aujourd'hui",         "Si c'est possible, prends l'escalier.",                                                50,       "ENERGY"],
  ["Ne charge pas tes appareils pendant la nuit",   "Evite d'atteindre le 100% de batterie de tes appareils électroniques.",                10,       "ENERGY"],

  ["Prendre une douche plutôt qu’un bain", "Se doucher pendant 5 minutes nécessite de 30 à 80 litres d’eau. Prendre un bain consomme de 150 à 200 litres d'eau.", 20, "WATER"],
  ["Arrosez le jardin le soir", "Une fois le soleil couché, l'évaporation deviens moins forte.", 10, "WATER"],
  ["Arrêtez l'eau pendant que vous faites la vaisselle", "Et réduisez les doses de produit vaisselle.", 20, "WATER"],
  ["Equipez vous d’une chasse d'eau à deux débits", "Vous réduiserez ainsi d'environ 15% votre consommation d'eau.", 50, "WATER"],
  ["Récolte de l'eau de pluie", "Profite-en par exemple pour nettoyer la voiture.", 20, "WATER"],
  ["Vérifier qu'aucun robinet ne fuit", "C'est 10 litres par jour pour un robinet qui goutte, et jusqu'à 600 litres par jour dans le cas d'un simple filet d'eau dans la cuvette des WC !", 10, "WATER"],
  ["Faire pipi dans la douche", "Profitons de notre douche pour faire pipi ! Nous économisons ainsi une chasse d'eau.", 10, "WATER"],

  ["Acheter une gourde en inox", "Pour enfin arrêter avec les bouteilles d’eau en plastique.", 20, "CONSUMPTION"],
  ["Utiliser un sac réutilisable pour tes courses", "Comme ça, moins de gaspillage!", 10, "CONSUMPTION"],
  ["Privilégiez les produits naturels", "Comme le vinaigre blanc, le bicarbonate de soude, le savon noir… Ils libèrent moins de composés organiques volatiles et sont plus facilement biodégradables.", 20, "CONSUMPTION"],
  ["J’appose un stop pub", "Une boite aux lettres reçoit plus de 30 kg de publicités par an !", 10, "CONSUMPTION"],
  ["Réutiliser ce que l’on possède déjà", "Réparer les pièces et réutiliser ce que l’on a déjà dans son dressing avant de jeter et de racheter.", 10, "CONSUMPTION"],
  ["Réfléchir à ses futurs achats et penser utile", "Se poser les questions : en ai-je vraiment besoin ? Quelle sera la durée de cet achat ? Privilégier la qualité à la quantité.", 20, "CONSUMPTION"],
  ["Acheter en seconde main, acheter local", "Faire les vide-greniers, chiner dans les dépôt-vente, les boutiques de vêtements dégriffés.", 10, "CONSUMPTION"],

  ["Je fais mes courses en vrac", "Acheter des produits sans emballage, c'est bon pour la planète et c'est aussi moins cher !", 10, "ALIMENTATION"],
  ["Acheter bio", "L'agriculture biologique n'utilise pas de produits chimiques de synthèse (engrais, pesticides, herbicides) ni d'organismes génétiquement modifiés (OGM). En plus, les aliments bio sont souvent plus savoureux", 20, "ALIMENTATION"],
  ["Ne pas tout de suite jeter les produits en péremption", "Quand un produit arrive à expiration, je l’ouvre avant de le jeter, peut-être qu’il est encore bon à consommer !", 20, "ALIMENTATION"],
  ["Cuisiner les restes", "Cuisiner ses restes c'est se régaler sans en laisser une miette ! ", 10, "ALIMENTATION"],
  ["Ne pas abuser des surgelés et des conserves", "Ils ont demandé dix fois plus d’énergie (et donc de production de gaz à effet de serre) que les produits frais !", 10, "ALIMENTATION"],
  ["Réduire ma consommation de viande", "2 ou 3 fois par semaine, c'est suffisant. Vous pouvez aussi remplacez la viande par des oeufs et du poisson.", 20, "ALIMENTATION"],
  ["Acheter des produits de saison", "Acheter des produits locaux et de saison permet de privilégier les circuits courts qui rémunèrent moins les distributeurs et davantage les producteurs.", 10, "ALIMENTATION"],
]

const defaultRewards = {
  "ENERGY": [
    {
      type: "DIY",
      value: 80,
      uri: "https://www.ecoconso.be/sites/default/files/styles/presset_320x233/public/publications/feu_cendres.jpg?itok=lk-HUeOv",
      title: "Recette : faire sa lessive à la cendre [DIY]",
      content: `
        Que faire avec les cendres de son poêle à bois ? De la lessive maison bien sûr ! La cendre de bois est naturellement riche en potasse, ce qui lui donne des propriétés lavantes. Cette recette de lessive à la cendre est simple, économique et zéro déchet !
        ## Ingrédients :
        - 300 g de cendre de bois
        - C’est une excellente façon d’utiliser la cendre de son poêle à bois (voir d’autres idées pour la réutiliser). On veille toutefois à n’avoir brûlé que du bois brut non traité, sans allume-feux chimique, briquettes de démarrage ou autre additif.
        - 2 litres d’eau (de pluie par exemple, si on la collecte et la filtre de façon simple)
        ## Matériel :
        - des gants de protection
        - un récipient pour la préparation (grande casserole, bassine…)
        - un tamis (ou une passoire)
        - un filtre (à café par exemple), chinois, étamine…
        - un bidon
        - une étiquette
        ## Préparation :
        1. Tamiser la cendre avec le tamis afin de ne conserver que la cendre fine, sans morceaux.
        2. Chauffer l’eau et, dès que les bulles apparaissent, la verser sur la cendre, dans le récipient de préparation. Mélanger.
        3. Laisser macérer à couvert pendant 24 à 48 heures.
        4. Enfiler les gants (le mélange peut être irritant) et filtrer la préparation à l’aide du filtre et la verser dans le bidon. Pour plus de facilité, on peut utiliser un entonnoir et placer le filtre dedans.
        5. Etiqueter le bidon.
        ## Utilisation :
        Utiliser 150 à 300 ml de lessive par machine (à ajuster et tester en fonction de la saleté du linge et de l’essence de bois utilisée pour fabriquer la lessive). On pense à se protéger avec des gants car la lessive à la cendre peut irriter la peau. Et on garde hors de portée des enfants.
        Cette lessive se conserve quelques mois, à l’abri de la chaleur et de la lumière.
        Pour le linge blanc, on peut ajouter 1 à 2 càs de percarbonate de soude dans le tambour au moment de lancer la machine, avec une température minimale de 40°C.
        On évite d’utiliser cette recette pour les tissus fragiles.
        La lessive à la cendre montre ses limites sur les taches minérales (boue, terre, rouille…). On détache toujours avant de mettre en machine.
      `,
    },
    {
      type: "BLOGPOST",
      value: 100,
      uri: "https://www.fournisseurs-electricite.com/sites/default/files/styles/article__global/public/2019-11/etre-eco-responsable.png?itok=0twTt3rE",
      title: "Comment être éco-responsable au quotidien ?",
      content: `
        Être écoresponsable révèle avant tout d'une prise de conscience des enjeux environnementaux auxquels notre planète doit actuellement faire face. L'écoresponsabilité est devenue un enjeu vital pour les prochaines générations et demande des efforts à chacun afin de limiter au maximum son empreinte écologique. Conseils et recommandations en tant que particulier pour devenir écoresponsable au quotidien dans l’ensemble de ses domaines de vie.
        ## Une consommation d’énergie éco-responsable
        La consommation d’énergie (électricité et/ou gaz, fioul, chauffage au bois, etc.) est un des gros postes de dépense d’un foyer. L'impact sur l'environnement est également non négligeable. Quelques recommandations afin de réduire son empreinte écologique tout en baissant également les factures d'énergie.
        ## Améliorer les performances énergétiques de son logement
        L’optimisation de la performance énergétique du logement est un levier majeur afin de limiter les pertes de chaleur et de réduire la consommation d’énergie. Il est possible de limiter l’utilisation d'énergie tout en maintenant le confort des occupants.
        Plusieurs axes pourront être développés dans ce sens :
        - Améliorer l'isolation du logement afin de limiter l’utilisation du chauffage en hiver et de la climatisation en été ;
        - Changer les équipements de chauffage et bénéficier de nouvelles technologies pour faire des économies d'énergie ;
        - Modifier ses habitudes de chauffage et diminuant la température en hiver et en limitant l’utilisation de la climatisation en été au profit de l’aération naturelle ;
        - Investir dans de nouveaux appareils électroménager moins énergivores ;
        - S'équiper de nouveaux outils de contrôle des consommations comme par exemple les thermostats connectés permettant de contrôler la température de chaque pièce. De plus, les foyers équipés d'un compteur Linky pourront facilement suivre leur consommation d’énergie via leur espace client.
        ## Adopter les bons gestes pour réaliser des économies d’énergie
        - Éteindre les appareils électroniques lorsqu'ils ne sont pas utilisés. En effet, le mode veille continue de faire consommer de l’énergie inutilement par les appareils électroniques ;
        - Éteindre toutes les lumières et les luminaires en quittant une pièce ;
        - Baisser le chauffage en hiver entre 18°C pour les chambres et 19°C pour les autres pièces à vivre. En diminuant la température de 1°C le particulier peut réaliser jusqu’à 7% d’économie sur sa facture d’énergie ;
        - Limiter l’utilisation de la climatisation en été. En-dessous de 26°C, la climatisation n’est pas nécessaire. Il est nécessaire de respecter un écart de 8°C maximum entre l’intérieur du logement et l’extérieur ;
        - Réfléchir à ses besoins réels avant d'investir dans un nouvel appareil électroménager énergivore (sèche-linge, congélateur et plus du réfrigérateur, chauffage de piscine, etc.).
        ## Une meilleure utilisation de l’eau potable
        Éviter le gaspillage de l’eau potable est également un moyen de devenir un meilleur citoyen écoresponsable :
        - La prise de douches rapides et la limitation des bains permettra de faire des économies d’eau ;
        - Une pomme de douche écologique diminue la quantité d’eau utilisée tout en conservant la même puissance avec de l’eau distribuée à haute pression. En effet, pour 10L d’eau consommée habituellement, ce type d’équipement permet d’en utiliser que 3L. De plus, les billes composées notamment d’argile permettent de purifier la qualité de l’eau et l’adoucisse ;
        - Les toilettes pourront être également équipés afin de limiter l’utilisation de l’eau à chaque chasse ;
        - Il est aussi possible de récupérer l'eau de pluie pour réduire sa consommation d'eau potable.
        ## Être éco responsable dans la gestion de ses déchets
        Réaliser régulièrement et soigneusement le tri sélectif permettra de s'assurer qu'un maximum de déchets soient recyclés correctement. Il est également nécessaire de reconsidérer la manière de diminuer en amont les déchets qui ne pourront pas être recyclés :
        - Éviter au possible d'acheter des objets jetables à usage unique en plastique comme les assiettes, couverts, gobelets, briquets, stylos, etc. Il est plus écoresponsable de privilégier si possible les objets qui vont perdurer dans le temps, de les laver ou de les recharger après utilisation ;
        - Les produits peu emballés ou sans aucun emballage sont également à privilégier. De plus en plus de magasins de vente en vrac se développent et donnent également une seconde vie aux bocaux en verre qui pourront être réutilisés de nombreuses fois ;
        - Un sac de courses permet également de limiter les déchets de sacs en plastique qui finiront à la poubelle après une utilisation unique.
        ## Acheter écoresponsable ou recycler
        Comme vu précédemment, au moment de l’achat la quantité d'emballages doit être prise en compte afin de limiter les déchets. Les usagers peuvent également consommer plus responsable en cherchant à privilégier les circuits courts.
        Dans l’idéal, le consommateur achète au producteur en limitant au maximum les intermédiaires et les trop longues distances. Le particulier bénéficie ainsi de produits frais, à prix juste pour le client et le producteur.
        ## Eco responsabilité et alimentation
        La réduction de la consommation de viande à une fois par semaine en remplaçant par exemple, les protéines animales par des légumineuses, est un acte d’éco responsabilité. De nombreuses recettes de repas végétariens sont facilement accessibles sur internet afin de découvrir un autres type d’alimentation permettant de limiter l’utilisation des produits carnés.
        ## Être écoresponsable dans ses achats du quotidien
        Il est possible aujourd’hui de se renseigner facilement sur la provenance des produits d’utilisation quotidien, de plus, de nombreux tutoriels permettent d’apprendre facilement à réutiliser ou confectionner soi-même les produits d’utilisation courante.
        Quelques exemples d’achats éco responsables :
        - Remplacer les savons liquides ou shampoing par des pains de savon ou shampoing durs afin de limiter les emballages et de bénéficier d’un produit plus longtemps ;
        - Recycler les capsules de café ;
        - Utiliser une carafe filtrante pour limiter les bouteilles d’eau plastique ;
        - Utiliser des cotons réutilisables/lavables ;
        - Fabriquer de la lessive maison ;
        - Privilégier en été un stick solaire biodégradable qui protégera contre les coups de soleil sans détruire les coraux ;
        - Fabriquer son propre démaquillant, etc.
        ## Se déplacer de manière éco-responsable
        Bien que très pratiques, les modes de déplacement actuels consomment de grosses quantités d’énergie provenant de ressources carbonées comme le pétrole. L'exploitation de ces ressources fossiles et le rejet massif de gaz à effet de serre dans l'atmosphère doit, aujourd’hui, être remis en compte afin de trouver de nouveaux moyens de déplacement plus propres.
        En privilégiant un mode de déplacement plus responsable, les usagers pourraient favoriser les transports suivants :
        - Les transports en commun plutôt que la voiture ;
        - Le train à l'avion sur les courtes distances ;
        - Le covoiturage à l'utilisation de la voiture individuelle ;
        - Le déplacement à pied, à vélo, en trottinette ou encore en rollers sur les tous petits trajets.
        ## Pourquoi devenir éco responsable est-il aujourd’hui une nécessité ?
        Cette démarche personnelle vise à protéger l'environnement, la biodiversité et les ressources vivantes de notre planète afin de limiter l’impact négatif des activités humaines. Cette volonté doit se traduire à l’échelle mondiale à travers les générations en de multiples petits gestes permettant à terme de faire la différence. De la même façon, les entreprises et les grands groupes se doivent de devenir écoresponsables à leur tour en adhérant réellement par des projets concrets à une posture plus respectueuse de l'environnement.
        En effet, la somme de toute ces actions individuelles et collectives peuvent peser dans l'avenir et les conditions de vie de l’humanité. Les mobilisations citoyennes pour le climat, les actions individuelles à l’échelle du particulier, les actions en entreprise, dans les grands groupes et industries ainsi que les décisions politiques doivent avoir pour objectif principal de limiter au plus vite la hausse des températures et le rétablissement des ressources vitales nécessaires au maintien de la biodiversité sur terre.
      `,
    },
  ],
  "WATER": [
    {
      type: "DIY",
      value: 80,
      uri: "https://www.ecoconso.be/sites/default/files/styles/presset_320x233/public/publications/creme-hydratante-fait-maison-diy-w.jpg?itok=r1Rszvnl",
      title: "Recette : faire sa crème hydratante pour le corps (DIY)",
      content: `
        On peut faire soi-même sa crème hydratante pour le corps. Rien de tel qu’une recette maison au lieu des crèmes du commerce. Il suffit de 10 minutes et de 4 ingrédients simples pour préparer sa crème hydratante naturelle, écologique et personnalisable. Et faire sa propre lotion, c’est aussi plus économique. Une crème maison coûte jusqu’à 60% moins cher qu’un produit acheté en magasin.
        Temps de préparation : 10 minutes
        Prix : à partir de 0,35 €/50 ml pour une recette à base d’huile bio pressée à froid de base (style huile d’olive)
        ## Ingrédients (pour 50 ml) :
        - 30 ml d’huile végétale
        On opte pour une huile végétale bio, vierge et de première pression à froid. Certaines huiles coûtent moins cher, comme l'huile d’olive (comme dans la vidéo), le sésame, le ricin, l’amande douce… On peut aussi choisir l’huile en fonction de son type de peau et de ses besoins. Par exemple :
        l’huile de cameline apaise et donne une sensation de toucher sec ;
        l’huile de germe de blé revitalise les peaux sèches ;
        l’huile de jojoba nourrit les peaux mixtes, sèches ou grasses…
        - 20 ml d’eau ou d’hydrolat végétal
        On peut simplement utiliser de l’eau de bonne qualité pour réaliser ses cosmétiques (on évite toute eau croupie ou contaminée), ce qui réduit le prix du produit. Mais on peut aussi profiter des bienfaits des hydrolats végétaux (des eaux contenant des composés de plantes aromatiques). Par exemple :
        l’hydrolat de géranium rosat adoucit et stimule les peaux ternes et fatiguées ;
        l’hydrolat de lavande est polyvalent : il tonifie, purifie et calme les peaux normales et grasses ;
        l’hydrolat de rose rafraichit, hydrate et raffermit toutes les peaux…
        - 5 ml de cire d’abeille
        On choisit une cire d’abeille de bonne qualité, pure et sans résidus chimiques. On la privilégie si possible de qualité cosmétique et biologique. On identifie un label sur l’emballage : Ecocert, Cosmebio, Ecogarantie…
        - 15 gouttes d’extrait de pépin de pamplemousse
        On privilégie l’extrait de pépin de pamplemousse (EPP) bio. Cet ingrédient sert de conservateur naturel.
        - De l’alcool à désinfecter
        On peut acheter tous ces ingrédients en magasin bio, en herboristerie, en pharmacie ou sur des sites spécialisés.
        ## Matériel :
        - 2 poêlons (pouvant être mis au bain-marie)
        - un fouet
        - une cuillère
        - des mesurettes ou un récipient gradué
        - un flacon ou un pot de récup’, de préférence en verre teinté
        - une étiquette
        ## Préparation :
        1. Bien se laver les mains au savon. Désinfecter TOUT le matériel à l’aide de l’alcool. Pour le matériel résistant à la chaleur, on peut aussi le plonger dans une eau en ébullition pendant 10 minutes avant de le sécher soigneusement. On pense bien à tout, y compris l’assiette ou le bol où l’on posera la cuillère et le fouet. Une bonne désinfection du matériel limite les bactéries et aide à conserver la crème.
        2. Mettre un poêlon à chauffer au bain-marie. Verser l’huile et la cire d’abeille (on appelle cela la phase huileuse).
        3. Faire fondre en remuant jusqu’à une température d’environ 60°C, c’est-à-dire jusqu’à ce que la cire soit totalement fondue.
        4. De la même façon, mettre le second poêlon au bain-marie et y faire chauffer l’eau ou l’ hydrolat (la phase aqueuse).
        5. Quand les deux mélanges sont chauds, retirer du feu.
        6. Verser l’eau par petites quantités dans la phase huileuse et fouetter sans arrêt.
        7. Continuer à fouetter jusqu’à ce que les ingrédients soient liés et le mélange tiédi. Pour aider l’émulsion à prendre, on peut plonger son récipient dans un bain-marie d’eau froide, sans cesser de fouetter.
        8. Ajouter l’extrait de pépin de pamplemousse.
        9. Mélanger une dernière fois et transvaser dans le flacon.
        10. Étiqueter sans oublier d’indiquer la date de fabrication.
        ## Utilisation :
        Comme pour tout nouveau cosmétique, on réalise d’abord un test allergique avant d’enduire tout son corps. C’est simple : on applique une petite quantité de produit dans le creux du bras. Si après 24 heures, aucun problème n’apparaît (rougeur, boutons, démangeaison, gonflement…), on peut utiliser le produit.
        Cette crème s’utilise comme une crème classique pour le corps, sur les zones à nourrir et à hydrater. En particulier sur les zones sèches comme les coudes, les genoux, les talons…
        Si on utilise un flacon airless, c’est très bien car on touche seulement le produit qu’on applique directement. Si on a mis la crème dans un pot classique, on la prélève plutôt avec une petite spatule ou une cuillère pour éviter de déposer des germes dans le reste du produit.
      `,
    },
    {
      type: "BLOGPOST",
      value: 100,
      uri: "https://pousse-pousse.com/img/cms/énergie%20écoresponsable.jpg",
      title: "Devenir éco-responsable : les bons réflexes à adopter !",
      content: `
        ## Pourquoi devenir éco-responsable ?
        Actuellement, l’écologie est devenue un sujet préoccupant nombreux consommateurs. On subit quotidiennement les effets de la dégradation de l’environnement. Sans savoir les gestes à adopter, il est difficile d’agir pour s’y remédier. Par contre, tout le monde peut agir pour faire la différence et apporter sa pierre à l’édifice d’une consommation raisonnée.
        On se bat pour plusieurs causes et si pour une fois on se bat pour notre planète. L’écologie est une évidence à laquelle on doit se rendre.
        ## Qu’est-ce qu’un consommateur éco-responsable ?
        Un consommateur éco-responsable est celui qui pratique les gestes dans le but de limiter son empreinte écologique et son impact sur l’environnement.
        Devenir éco-responsable est une démarche dont l’objectif est de préserver l’environnement. Une multitude de petits gestes quotidiens comme l’utilisation de box éco-responsable et une vraie conviction feront la différence surtout si on s’y met ensemble. L’environnement n’est pas le seul bénéficiaire de cette démarche, nous jouissons tous de ses bienfaits.
        ## Comment devenir un consommateur éco-responsable ?
        • Privilégier la mode de vie écologique dans la maison
        Buvez de l’eau filtrée ou bouillie au lieu des eaux en bouteille. Quand il vous est vital pour la planète de réduire notre consommation d’eau pour préserver la planète et faire de l’économie. C’est un geste simple, écologique et économique pour un premier pas vers un futur éco-responsable.
        La majorité des produits utilisés quotidiennement contiennent des composants chimiques néfastes pour notre santé et notre environnement. Pour éviter cette pollution, des box éco-responsables sont à votre disposition. Ce sont des produits conformes et respectueux de l’environnement.
        • Se déplacer de manière éco-responsable
        On sait tous que se déplacer à pied ou à bicyclette est bon pour notre santé, mais c'est également important pour préserver l’environnement. La majorité des moyens de transport fonctionnent avec les produits issus du pétrole. Ils sont obtenus à partir d’une exploitation de ressources fossiles et au rejet de gaz à effet de serre dans l’atmosphère.
        S’il est vraiment nécessaire de se déplacer :
        - Privilégier les transports en commun 
        - Opter pour les trains au lieu des avions sur les trajets le permettant 
        - Plutôt covoiturage quand l’utilisation de voiture est nécessaire 
        - Pourquoi ne pas choisir les réunions téléphoniques ou la visioconférence pour limiter les déplacements des associés ou des clients.
        • Acheter éco-responsable
        Prévilégier l'achat local auprès des producteurs, sans intermédiaire afin de consommer mieux et réduire la quantité des emballages plastiques utilisés. Si on n’a pas de producteur direct, on peut également opter pour l’achat en vrac. Ainsi, on n’achète que ce dont on a besoin et évite en même temps le gaspillage. Sinon l'achat de box éco-responsables peut aider.
        • Gestion des déchets 
        Un consommateur éco-responsable ne se limite pas à la surveillance de sa consommation. Il s’agit également de savoir gérer ses déchets. Désormais, la plupart des gens font le tri sélectif s’assurant que leurs déchets seront recyclés. Mais le meilleur moyen de diminuer la quantité des déchets non recyclés est de réduire la quantité des déchets produit.
        - Eviter l’utilisation des produits jetables tels que les assiettes, les verres, les rasoirs... Il vaut mieux utiliser les objets durables ou rechargeables.
        - Toujours avoir un sac de courses sur soi pour éviter d’acheter des sacs en plastique qui vont finir dans la poubelle. Nous avons aussi notre box éco-responsable pour que vous puissiez profiter des conseils et des astuces écologiques.
        • Des gestes écologiques à adopter grâce à nos box éco-responsables
        - Eteindre complètement tous les appareils électroniques quand ils ne sont pas utilisés.
        - Mettre le chauffage intérieur de manière raisonnable. Si on considère que 18°C est la température idéale pour les chambres et 19°C pour les autres pièces. Une diminution de 1°C dans un logement est déjà une grande économie d’énergie de 7%.
        - N’utiliser la climatisation que si la température est supérieure à 26°C et que s’il y a un écart de 8°C au maximum entre les températures extérieure et intérieure .
        - Eviter les équipements  énergivores qui ne sont pas indispensables à tous les foyers tels que : sèche-linge, congélateur secondaire, chauffage de piscine, etc.
        ## Devenir éco-responsable est une démarche qui se fait progressivement et facilement en adoptant la box éco-responsable.
        Un consommateur éco-responsable bénéficie de nombreux avantages. Le mode de vie écologique permet de faire des économies.
        Certains coûts sont diminués grâce à l’utilisation des énergies renouvelables et la gestion des ressources utilisées.
        L’environnement sera préservé pour les générations futures. Un avenir vert pour nos enfants et petits-enfants…
        Un petit pas pour l'homme mais un grand pas pour l'environnement, ce sont des habitudes faciles à adopter, mais en cas de manque d’astuces la box éco-responsable est là pour vous venir en aide. Il est temps de laisser progressivement les plastiques et les produits corrosifs derrière vous et de voir un avenir plus vert. Si on s’y met tous dès maintenant, nous serons les premiers qui bénéficieront des résultats. Devenons éco-responsable pour un avenir dans la bonne santé.
      `,
    },
  ],
  "CONSUMPTION": [
    {
      type: "DIY",
      value: 80,
      uri: "https://www.ecoconso.be/sites/default/files/styles/presset_320x233/public/publications/baume-levres-fait-maison-diy-w.jpg?itok=R0EjO0zt",
      title: "Recette facile pour faire son baume à lèvres maison (DIY)",
      content: `
        Le baume à lèvres, qu’on appelle aussi du beurre de cacao, permet d’hydrater, d’adoucir et de protéger la peau contre les agressions extérieures. La recette maison est très simple, naturelle, et permet en plus de faire des économies. Cette version DIY (Do It Yourself) revient 90% moins cher[1] que les classiques du commerce !
        Temps de préparation : 5 minutes
        Prix : à partir de 0,13 € le tube de 5,5 ml pour une recette de base
        ## Ingrédients (pour 45 ml) :
        - 35 ml d’huile végétale (= 7 càc)
        On choisit une huile végétale bio, vierge et de première pression à froid. De qualité écologique, l’huile d’amande douce, d’olive et de macadamia se prêtent bien à un baume à lèvres.
        - 10 ml de cire d’abeille (= 2 càc)
        On opte pour de la cire d’abeille de qualité cosmétique (renseigné sur l’emballage) et biologique qu’on reconnaît par exemple grâce au label sur l’emballage : Ecocert, Cosmebio, Ecogarantie…
        - De l’alcool à désinfecter
        On trouve ces ingrédients en magasin bio, en herboristerie, en pharmacie ou sur des sites spécialisés.
        ## Matériel :
        - un poêlon (pouvant être mis au bain-marie) + une casserole (pour le bain-marie)
        - une cuillère à café
        - un tube de baume ou rouge à lèvres (par exemple de récup’ bien lavé). On peut aussi utiliser un petit pot (type en verre) mais l’idéal sera alors de prélever du baume avec une petite cuillère, sans mettre le doigt dans le pot pour éviter des contaminations.
        - une étiquette
        ## Préparation :
        1. Bien se laver les mains au savon. Désinfecter la cuillère, le poêlon et le tube avec l’alcool. On en étale bien partout. Une alternative est aussi de plonger ces ustensiles dans de l’eau en ébullition pendant 10 minutes avant de les sécher soigneusement. Attention à ce que tout résiste à la chaleur (pas de tube avec du plastique par exemple).
        2. Mettre le poêlon à chauffer au bain-marie.
        3. Verser l’huile et la cire d’abeille et faire chauffer jusqu’à ce que la cire soit totalement fondue.
        4. Mélanger puis verser dans le flacon.
        5. Étiqueter sans oublier d’indiquer la date de fabrication.
        Utilisation :
        On réalise un test allergique avant d’utiliser le produit : on applique une petite quantité de produit dans le creux du bras. Si après 24 heures, aucun problème n’apparaît (rougeur, boutons, démangeaison, gonflement…), on peut s’en tartiner la bouche.
      `,
    },
    {
      type: "BLOGPOST",
      value: 100,
      uri: "https://www.fournisseur-energie.com/wp-content/uploads/2020/01/entreprise-eco-responsable.jpg",
      title: "Les 10 conseils pour une attitude éco-responsable en entreprise",
      content: `
        Résumé : A l’occasion de la semaine européenne du développement durable (30 mai au 5 juin 2017) et de la No Impact Week (Mieux vivre ensemble en entreprise), être éco-responsable est au cœur des préoccupations, notamment dans l’univers professionnel. En entreprise, être éco-responsable est la clé pour intégrer les préoccupations environnementales au cœur de l’activité et pour chaque salarié la meilleure manière d’intégrer des gestes simples pour prendre soin de l’environnement sur son lieu de travail. Faire attention chez soi est la première étape d’un comportement éco-responsable, l’être au sein de son entreprise est la suite logique pour considérer les problématiques environnementales tout au long de la journée et au quotidien.
        ## Être éco-responsable: une attitude positive pour aider à préserver l’environnement!
        Être éco-responsable en entreprise, c’est gérer ensemble les ressources nécessaires au  bon fonctionnement de l’entreprise tout en cherchant à réduire son impact environnemental au maximum à tous les instants. L’éco-attitude est une attention quotidienne pour limiter son impact écologique. Cela permet de faire des économies, de participer à la diffusion d’idées positives pour travailler au quotidien tout en préservant l’environnement. Pour une entreprise, devenir éco-responsable ne nécessite pas forcément d’installations supplémentaires ou de travaux spécifiques. Il suffit souvent de gestes simples, de nouvelles habitudes, de s’aider d’applications intelligentes pour intégrer la préservation de l’environnement au quotidien des salariés. Pour le salarié, être éco-responsable c’est être prescripteur et acteur d’un changement au sein de son entreprise pour limiter l’impact environnemental des activités. L’éco-responsabilité a pour objectif de mieux gérer les ressources utilisées pour le bon fonctionnement de l’entreprise. Grâce à quelques nouvelles habitudes faciles à intégrer, être éco-responsable est un comportement citoyen à adopter pour que salariés et entreprises évoluent avec la volonté de réduire leur impact environnemental.
        ## 1. 10 litres d’eau pour produire une feuille de papier: préservons cette ressource!
        Le papier est la ressource à rationaliser de manière prioritaire. Gourmand en eau pour sa production, le papier doit être utilisé intelligemment. Il représente 75% des déchets produits en entreprise et le taux de recyclage est de seulement 35% pour le papier utilisé en entreprise. Pour une utilisation éco-responsable, quelques gestes simples peuvent être mis en place pour réduire l’utilisation:
        - imprimer recto-verso
        - imprimer seulement lorsque cela est impératif et uniquement la partie nécessaire
        - utiliser le verso des documents usagés pour en faire des feuilles de brouillon
        - pour les réunions, privilégier les présentations numériques
        - privilégier l’impression sur papier recyclé pour l’usage interne
        ## 2. Besoin de 8 stylos et 3 cahiers au quotidien? Pas si sûr.
        Au quotidien, les fournitures nécessaires à une activité de bureau sont limitées. Il est important de connaître les besoins des salariés et d’évaluer les commandes en fonction de ceux-ci pour éviter la surconsommation. Pour une utilisation éco-responsable des fournitures, il est important de traquer le gaspillage et de mettre fin aux commandes inutiles (souvent livrées par véhicules motorisés,  donc polluants).
        ## 3. Chauffage, un degré en moins = 7% d’économie sur la facture énergétique
        Été comme hiver, la facture énergétique peut grimper rapidement et l’impact environnemental être alourdi. La climatisation et le chauffage, sont les champions de la consommation d’énergie. Pour diminuer la consommation liée à leur utilisation, des ventilateurs peuvent être suffisants dans des bâtiments où l’isolation le permet. Si la climatisation est utilisée, elle ne doit pas être activée avant une température extérieure de 26°. Pour le chauffage, privilégier une utilisation responsable et éviter à tout prix de surchauffer, l’hiver est la saison des pulls! Pour la régulation de la température, de nombreuses installations et applications permettent la gestion à distance, ce qui permet d’arrêter chauffage et climatisation en l’absence des employés et de redémarrer le système une heure avant l’arrivée des employés pour une température idéale pour travailler: une autre astuce pour diminuer l’impact sur l’environnement!
        Diminuer sa consommation c’est bien mais choisir un contrat adapté constitue aussi une décision logique et sensée.En effet, vos économies se feront en premier lieux par le choix de votre contrat lors de l’ouverture de votre compteur électrique par exemple. Ainsi il vous faut choisir le contrat le plus adapté à vos habitudes de consommation et cela vous permettra d’économiser au maximum sur votre budget énergie.
        Parfois la climatisation reste tout de même indispensable pour travailler dans de bonnes conditions, avec les grosses chaleurs d’été. Si vous avez un problème d’alimentation électrique, il est possible d’obtenir une intervention d’urgence auprès d’EDF Pro (numéro).
        ## 4. Les déchets en entreprise aussi peuvent être recyclés, et ce n’est pas compliqué!
        Pour être éco-responsable, limiter sa consommation en énergie et en fournitures est un premier pas. il est maintenant important de limiter les déchets liés à l’activité des salariés et des entreprises. Pour un impact moindre sur l’environnement, le tri et le recyclage sont les maîtres mots de l’activité. Pour que les gestes soient simples et deviennent automatiques, il est essentiel de mettre à disposition des salariés des bacs de tri et de travailler avec des services de recyclage pour le papier, le plastique, les consommables d’imprimante ou encore le verre. Pour la pause café et les déjeuners, privilégier la vaisselle réutilisable est important pour limiter les déchets liés à l’utilisation de gobelets et cuillères plastique plusieurs fois par jour.
        ## 5. Envoyer des mails, source de dépenses énergétiques?
        Certaines consommations d’énergie, et notamment d’électricité peuvent paraître anodines mais mises bout à bout, elles ont un fort impact environnemental et un coût non négligeable pour l’entreprise. Equiper les bureaux d’ordinateurs portables, bien moins gourmands en énergie, est une solution pour limiter la consommation d’électricité. La configuration pour une mise en veille rapide des ordinateurs permet aussi de réduire la facture environnementale. L’envoi de mails est un poids environnemental fort et croissant, notamment avec la hausse du nombre d’entreprises dans le secteur tertiaire. Avant l’envoi de chaque mail, quelques règles sont à respecter pour limiter leur incidence écologique, par exemple vérifier si tous les destinataires sont nécessaires, optimiser le poids des pièces jointes. L’utilisation de messageries instantanées est une alternative intéressante pour limiter les envois de mails.
        ## 6. Se déplacer malin!
        Chaque salarié parcourt en moyenne 15 km par jour pour se rendre sur son lieu de travail, soit environ 6600 km annuels. Pour limiter l’impact environnemental des déplacements professionnels, les transports en commun ou le covoiturage sont les mots-clés d’un voyage éco-responsable pour se rendre sur son lieu de travail. En plus d’une incidence limitée sur l’environnement, se déplacer en transports en commun ou en voiture à plusieurs permet de diminuer le coût pour chaque salarié. De manière formelle ou informelle, le covoiturage peut se mettre facilement en place pour éviter des voitures occupées par une seule personne sur le trajet domicile-bureau. Pour les trajets courts, le vélo ou la marche (modes de transports doux) sont idéaux pour une pollution moindre. Le télétravail peut également être une solution pour éviter aux salariés de se déplacer tous les jours.
        ## 7. Téléphones, ordinateurs, imprimantes… ils peuvent tous avoir une deuxième vie!
        Les entreprises sont souvent très consommatrices de matériel informatique: ordinateurs, imprimantes, téléphones fixes et mobiles… Si ces équipements sont indispensables pour le travail quotidien des salariés, une gestion éco-responsable est indispensable pour limiter les déchets et donner une deuxième vie aux équipements. A chaque fois qu’un équipement est obsolète pour l’entreprise ou lors du renouvellement du parc informatique,celui-ci doit être déposé à une association ou à une entreprise d’économie sociale et solidaire pour être réparé ou réutilisé et ne pas devenir un déchet toxique.
        ## 8. Oui aux labels éco-responsables! Pour consommer vert et économiser de l’énergie
        Être éco-responsable est une attitude au sein de l’entreprise mais c’est aussi la mise en place de relations avec des fournisseurs éco-responsables. Plusieurs labels existent pour repérer les fournisseurs éco-responsables. Le label Imprim’Vert garantit une volonté de l’imprimeur de limiter son impact environnemental grâce à une meilleure gestion des déchets et une non-utilisation de produits toxiques. Le label Energy Star permet de se fournir en équipement informatique, dont l’efficacité énergétique est garantie, avec des appareils à mise en veille rapide et donc moins consommateurs d’énergie.
        ## 9. L’éco-responsabilité, main dans la main avec les bons partenaires
        L’éco-responsabilité se fait pas à pas, du comportement de chacun au choix du fournisseur d’équipements, mais également en faisant des choix verts au quotidien. Pour limiter l’impact écologique des livraisons, chaque entreprise peut faire appel à des coursiers à vélo ou à pied. Disponibles facilement dans les grandes villes, les coursiers à vélo livrent très rapidement et ont un impact bien moins important sur l’environnement qu’un deux roues ou une voiture. Pour les commandes plus importantes, des sociétés proposent des courses en véhicule électrique avec un coût environnemental relatif.
        ## 10. L’éco-responsabilité, une préoccupation au quotidien!
        La mise en place sur le long terme de bonnes habitudes et la mise à disposition d’outils pour les salariés afin d’adopter un comportement éco-responsable est la clé d’un changement de paradigme dans la prise en compte des enjeux environnementaux. Être éco-responsable, seul chez soi, n’a plus assez de force étant donné l’avancée des problèmes liés à l’impact environnemental de l’activité humaine. La régularité est la clé d’un parcours commun où ensemble les salariés peuvent avoir un impact dans leur vie personnelle mais également professionnelle. Trier, recycler, donner une seconde vie aux appareils, consommer intelligemment sont autant de clés à saisir pour déverrouiller le passage vers des entreprises plus éco-responsables au quotidien.
        Grâce à des gestes simples, il est possible de devenir rapidement éco-responsable au bureau. Face aux enjeux climatiques et environnementaux auxquels chacun doit faire face, l’éco-citoyenneté est le comportement de l’avenir tant à la maison que sur son lieu de travail. Les règles appliquées chez soi doivent être les mêmes en entreprise, pour être éco-responsable 7 jours sur 7: éteindre la lumière en quittant une pièce, privilégier la lumière naturelle, débrancher les appareils une fois chargés, recycler ses déchets…
      `,
    },
  ],
  "ALIMENTATION": [
    {
      type: "DIY",
      value: 80,
      uri: "https://www.ecoconso.be/sites/default/files/styles/presset_320x233/public/publications/choco_maison_sans_huile_de_palme_0.jpg?itok=G-Zl-QT6",
      title: "Recette : pâte à tartiner maison, sans huile de palme (DIY)",
      content: `
        On peut facilement faire sa pâte à tartiner au chocolat maison. Il suffit de 4 ingrédients et de 10 minutes. Préparer son choco soi-même permet de maîtriser la composition : éviter l’huile de palme, mettre moins de sucre, utiliser des ingrédients bio et/ou équitables, lui donner un petit goût de noisette ou pas… Et ça peut même revenir moins cher qu’un produit du commerce.
        Temps de préparation : 10 minutes.
        Prix : à partir de 7€/kilo. Compter 11 à 13 €/kg pour une recette entièrement bio.
        ## Ingrédients (pour 500g de pâte à tartiner) :
        - 160 g de chocolat noir de qualité, de préférence bio et équitable.
        Si on préfère, on peut le remplacer par du chocolat au lait ou toute combinaison noir/lait/autre de son choix.
        - 100 g de beurre non salé (pas d’huile de palme dans notre recette !).
        On le choisit de préférence bio et local.
        - 200 ml de lait concentré sucré
        En version prêt-à-l’emploi (en tube ou en conserve) ou fait maison (voir recette ci-dessous).
        - Optionnel, en fonction des envies :
        Pour que ça ressemble plus au « nutella », 35g de purée de noisettes (aussi appelée « crème de noisettes », disponible en magasin bio ou faite maison (voir recette ci-dessous)).
        Ou bien un peu de cannelle en poudre, d'essence d'orange ou encore de gingembre pour varier…
        ## Matériel :
        - 2 poêlons / casseroles (pour le bain-marie)
        - 2 bocaux de récup en verre (d’une contenance d’environ 250ml).
        - Quelques couverts
        ## Recette :
        1. Faire fondre le chocolat avec le beurre. L’idéal c’est le bain-marie. On peut aussi faire fondre le chocolat directement dans un poêlon sur le feu ou au micro-ondes mais il faut être très attentif à ne pas le brûler.
        2. Bien mélanger jusqu’à avoir un résultat homogène.
        3. Couper le feu et ajouter le lait concentré sucré.
        4. Optionnel : ajouter la purée de noisettes (préalablement mélangée si elle est stockée depuis un moment dans l’armoire et s’est « déphasée ») ou les autres ingrédients pour personnaliser la pâte à tartiner (cannelle en poudre, écorces d’oranges confites…).
        5. Bien mélanger.
        6. Remplir les deux pots et étiqueter avec le nom et la date de préparation. Mettre un des deux pots au frigo.
        ## Utilisation :
        Comme toutes les pâtes à tartiner : sur du pain, des crêpes… ou pur, à la cuillère, pour les plus décadent·e·s.
        Si vous avez besoin d'idées pour finir un pot entamé, le choco à tartiner garnit délicieusement biscuits, macarons et même un gâteau.
        Attention, hautement addictif ! Dans tous les cas, cela reste un produit gras et sucré à consommer avec modération ;-)
      `,
    },
    {
      type: "BLOGPOST",
      value: 100,
      uri: "https://cache.magicmaman.com/data/photo/w600_c18/10f/femme_fille_courses_legumes.jpg",
      title: "12 façons d'acheter de manière éco-responsable",
      content: `
        Respecter l'environnement, ce n'est pas seulement consommer moins... c'est aussi acheter de manière éco-responsable. Voici 12 conseils qui vous aideront à faire le bon choix en magasin et à la maison.
        ## Eco-responsable : j'achète des produits alimentaires locaux et de saison
        Les fruits, les légumes et la viande qui proviennent de l'autre bout de la France et du monde, et/ou qui ont poussé sous serre, ont un impact carbone élevé.
        L'impact carbone mesure l'effet des gaz à effet de serre (tels l'ozone, le méthane, le dioxyde de carbone, les hydrocarbures) qui sont engendrés par la transformation des produits, leur emballage, leur conservation et leur transport. Ces gaz affectent l'équilibre de la planète et contribuent à son réchauffement.
        Mieux vaut donc privilégier les produits issus de producteurs locaux et de saison, qui sont beaucoup plus savoureux !
        Interrogez les commerçants de votre quartier ou de votre commune sur la région d'origine de leurs produits. Si vous habitez en ville, pensez aux Associations pour le maintien d'une agriculture paysanne (Amap) : elles livrent des paniers de fruits et légumes de saison produits près de chez vous à domicile. Et en bonus, vous aurez des recettes pour les cuisiner.
        ## Eco-responsable : je n'abuse pas des surgelés et des conserves
        Les produits surgelés ou en conserve ne sont pas mauvais pour la santé, bien au contraire !
        Mais, comme tous les produits industriels, ils ont demandé dix fois plus d’énergie (et donc de production de gaz à effet de serre) que les produits frais.
        Au lieu de manger un hachis parmentier surgelé, achetez plutôt trois steaks hachés et des pommes de terre et faites-le vous-même ! D'abord, vous serez fièr(e) de l'avoir fait ; ensuite, il sera meilleur ; enfin, il vous aura coûté bien moins cher !
        ## Eco-responsable : je réduis ma consommation de viande
        Les élevages de viande de bovins, agneaux et moutons, et dans une moindre mesure l'élevage de porc et de volailles, ont un impact carbone élevé. C'est qu'il en faut de l'énergie pour chauffer et éclairer les locaux où ils vivent... Et les céréales qui les nourrissent nécessitent la fabrication d'engrais et de pesticides.
        Alors de la viande 2 ou 3 fois par semaine, c'est suffisant. Votre santé et celle de votre famille n'en demandent pas plus. Remplacez la viande par des oeufs et du poisson : il en existe des peu chers (comme le carrelet, le merlan, les sardines et le thon en boîte) qui contiennent des protéines d'aussi bonne qualité.
        ## Eco-responsable : je choisis le bio quand cela est possible
        L'agriculture biologique n'utilise pas de produits chimiques de synthèse (engrais, pesticides, herbicides) ni d'organismes génétiquement modifiés (OGM).
        Consommer des aliments bio, souvent plus savoureux, c'est donc :
        - soutenir un mode de production agricole plus respectueux de l'environnement ;
        - réduire les émissions de gaz à effets de serre ;
        - préserver la qualité des ressources naturelles (eau, sol, air) ;
        - prendre soin de sa santé.
        Le seul bémol : les produits biologiques coûtent souvent plus cher que les produits classiques. Si vous n'avez pas vraiment les moyens de tout acheter en bio, commencez par deux ou trois produits (les légumes et les fruits par exemple). 
        ## Eco-responsable : je gère mieux mes provisions pour moins gâcher
        Mieux gérer vos provisions vous permettra ensuite de faire des économies. Pour cela :
        - regroupez vos achats en hyper et supermarché pour éviter d'emprunter votre voiture à tout bout de champ ;
        - pour les produits frais de dernière minute, j'y vais à pied (si possible) et je m'approvisionne au fur et à mesure de ma consommation ;
        - tenez-vous à votre liste de courses, méfiez-vous des promotions "3 pour le prix de 2" car la moitié risque d'être jetée ;
        - accommodez les restes, transformez votre pain dur en pain perdu et vos fruits abîmés en salade de fruits.
        ## Eco-responsable : je ne fais confiance qu'aux labels
        Les produits alimentaires et non-alimentaires qui respectent l'environnement et ont une plus-value sociale comme ceux du commerce équitable possèdent tous un pictogramme (label, logo ou autre signe de qualité) sur leur étiquette.
        AB (Agriculture Biologique), 1 % For The Planet, AOC (Appellation d'Origine Contrôlée), Bio Equitable, Cosmétique Bio charte Cosmebio, Ecocert, Label Rouge... Il en existe près de 60 ! Pour en savoir plus, visitez le site Internet Mes courses pour la planète. Vous pouvez y télécharger un mini-guide répertoriant tous les labels, que vous pourrez emmener dans les magasins.
        ## Eco-responsable : je boycotte les emballages
        Un tiers des déchets ménagers sont des emballages. Certes, les industriels font des efforts pour les réduire mais ils ont tendance à augmenter quand même !
        En cause : les produits prêts à consommer, les minidoses préemballées, les portions alimentaires individuelles.
        Si votre famille compte quatre personnes ou plus, achetez des formats familiaux, des éco-recharges et des produits à diluer.
        Enfin, préférez les emballages recyclés et recyclables. Bien sûr, respectez les consignes pour le tri sélectif. C'est simple et rapide : vous n'avez plus aucune excuse.
        ## Eco-responsable : je choisis le 100 % biodégradable
        Ethers de glycol, formaldéhyde, phtalates, triclosan... ces substances chimiques, utilisées dans les produits ménagers, sont néfastes pour l'environnement et pour la santé des tout-petits et des grands !
        Achetez donc des produits ménagers écolos, en grande surface ou dans les magasins bio (type Biocoop). Dans ces produits, le chlore et l'ammoniaque sont remplacés par des bases lavantes biodégradables.
        Attention ! Ne vous fiez pas à l'inscription "biodégradabilité supérieure à 90 %" : c'est le seuil pour tous les produits, qu'ils soient "verts" ou non. Visez donc la biodégradabilité à 100 %.
        Suivez aussi ces conseils :
        - côté lessive, préférez la forme solide, qui demande moins d'emballages et d'eau transportée sur les routes que la forme liquide ;
        - utilisez le vinaigre blanc (en vente au rayon huiles et vinaigres) pour détartrer les casseroles, la robinetterie et les baignoires, faire briller les vitres et supprimer les moisissures ;
        - choisir le bicarbonate de sodium pour nettoyer les surfaces de la cuisine et de la salle de bains.
        ## Eco-responsable : je passe du jetable au durable
        Au lieu de continuer à encombrer les poubelles, il est temps d'utiliser tous les produits durables dont vos placards regorgent, plutôt que des produits jetables :
        - remplacez les gobelets en plastique par une jolie tasse, à la maison comme au bureau ;
        - préférez les éponges aux lingettes ;
        - utilisez moins d'essuie-tout et revenez aux torchons, serpillières et chiffons à poussière ;
        - n'achetez que des piles rechargeables ;
        - choisissez une brosse à dents à tête interchangeable, électrique ou non.
        Au premier abord, les produits durables ont l'air plus coûteux, mais en définitive, ils vous reviendront bien moins cher à long terme.
        ## Eco-responsable : j'achète des appareils ménagers de classe A
        Les appareils ménagers (réfrigérateur, lave-linge, four...) portent tous une étiquette énergie qui symbolise par une lettre (de D à A+++) leur consommation d'énergie.
        Choisissez de préférence la classe A au minimum, la moins consommatrice d'énergie. Un appareil de classe A consomme jusqu'à 3 fois moins d'électricité qu'un C. Et un appareil de classe A+ consomme 20 % de moins qu'un A... Imaginez le A+++ !
        Certes, les appareils de classe A sont plus cher que ceux de classe D, mais à long terme, soyez-en sûr, votre investissement sera rentabilisé.
        ## Eco-responsable : opter pour l'eau du robinet
        Boire de l'eau du robinet fait du bien à l'environnement. En effet, transporter les bouteilles jusqu'aux lieux de vente utilise de l'énergie et rejette des gaz polluants, sans compter les déchets des emballages.
        L'eau du robinet est saine et contrôlée... et coûte 100 fois moins cher, en moyenne, que l'eau embouteillée. Si celle de votre ville a un goût qui ne vous plaît pas, achetez une carafe filtrante. Même en y ajoutant le prix des cartouches, vous serez gagnant.
        Pour bébé, par contre, préférez tout de même l'eau minérale en bouteilles.
      `,
    },
  ],
}

const defaultArticles = [
  {
    "theme": "ENERGY",
    "title": "Dégivrer son congélateur régulièrement pour faire des économies",
    "content": `
Dégivrer son congélateur n'a rien de bien compliqué. Et cela vous permettra à la fois de stocker vos aliments dans un environnement sain, mais aussi de contribuer au bon état de votre appareil.
## Quand dégivrer son congélateur ?
Avoir du givre dans le congélateur peut être embêtant pour plusieurs raisons :
- Cela restreint la place disponible
- Votre appareil consommera plus d’énergie pour fonctionner
En effet, la glace présente va obliger votre machine à fonctionner beaucoup plus, ce qui vous contraint à dépenser plus d’électricité, mais réduit aussi sa durée de vie. De plus, le givre qui se dépose n’est pas toujours propre et peut dégager de mauvaises odeurs. Cela est le signe qu’il faut dégivrer votre congélateur. On recommande généralement d’effectuer cette opération 2 fois par an, que votre équipement soit du type armoire, coffre ou combiné à un réfrigérateur.
## Les premiers gestes à effectuer
Pour commencer à dégivrer votre congélateur, utilisez l’interrupteur de l’appareil pour le mettre sur veille, puis débranchez-le. Il est important de toujours travailler hors tension pour éviter tout risque ménager. Si vous avez des denrées dans votre congélateur, il est essentiel que vous les gardiez congelées jusqu’à ce que vous puissiez les remettre dans votre appareil. Pour cela, vous pouvez utiliser plusieurs astuces :
- Des sacs isothermes
- Des glacières
- Les mettre à l’extérieur, si vous êtes en hiver et que les températures sont assez basses
Pour finir, n’oubliez pas de positionner une serpillière en dessous pour absorber l’eau qui risque de couler !
## Présence de peu de givre
Si vous procédez à un dégivrage de votre congélateur et à son nettoyage régulièrement, vous n’aurez que peu de givre à l’intérieur et toute l’opération sera beaucoup plus rapide que si vous tardez à le faire. Dans ce cas-là, il vous suffira donc d’utiliser simplement une éponge avec de l’eau chaude ou tiède pour décoller la glace. Vous pouvez aussi vous munir d’un vaporisateur rempli d’eau bouillante pour en asperger les parois. Ensuite, frottez-les avec délicatesse, à l’aide d’un grattoir, pour être sûr d’éliminer toute la glace. Faites ceci jusqu’à ce que vous ayez enlevé tout le givre.
## S’il y a beaucoup de glace
Pour de multiples raisons, vous pouvez vous retrouver avec énormément de givre. Ne tardez donc pas à procéder à un dégivrage de votre congélateur ! Dans ce cas, pour vous faciliter les choses, faites bouillir de l’eau dans une casserole puis déposez-la sur un repose-plat dans votre appareil. Ensuite, fermez la porte et laissez agir la chaleur pendant environ 15 minutes. La glace fondra sans que vous ayez à fournir le moindre effort ! Il existe aussi d’autres astuces, comme l’utilisation d’un sèche-cheveux ou encore d’un nettoyeur vapeur. Cependant, même si la glace vous résiste, n’utilisez jamais d’objets pointus ou aiguisés qui ne feraient qu’endommager votre équipement, ou pire, le rendre complètement inutilisable.
## Nettoyer l’intérieur du congélateur
Une fois que vous avez dégivré votre congélateur, vous avez besoin de le nettoyer. Pour cette étape, sachez qu’il est important de ne jamais utiliser de produits chimiques ou abrasifs au risque d’abîmer les parois. Au contraire, préférez employer de l’eau claire additionnée de vinaigre blanc. Cela permettra ainsi de venir facilement à bout des différentes bactéries présentes dans l’appareil. N’oubliez pas de nettoyer aussi tous les accessoires comme les tablettes ou les différents compartiments de votre congélateur. Si vous remarquez que de mauvaises odeurs persistent, vous pouvez rincer le tout avec de l’eau et un peu de jus de citron.
## Et pour finir…
Pour terminer de dégivrer votre congélateur, il ne vous reste plus qu’une étape de nettoyage : celle de la carrosserie et des joints. Ce sont souvent des éléments oubliés qui peuvent pourtant être de véritables nids à bactéries ! Pour cela, vous pouvez comme précédemment utiliser une éponge imprégnée d’eau et de vinaigre blanc. Et c’est aussi un bon moment pour vérifier la bonne étanchéité des articulations : fermez alors la porte du congélateur sur une feuille de papier. Si vous réussissez trop facilement à l’enlever, c’est que les joints sont usés. Enfin, vous pouvez finir par rebrancher votre appareil. Pour y replacer les denrées alimentaires congelées, attendez néanmoins que la température adéquate soit atteinte. Et le tour est joué !
## Entretien sur le long terme
Nettoyer son congélateur de façon régulière vous permet d’en garantir la performance sur du long terme. Cet entretien suppose entre autres de dégivrer le congélateur en moyenne une fois tous les 3 mois. Dégivrer le frigo n’est pas tout. Il vous faut également nettoyer les parois internes et les joints pour éviter la prolifération des bactéries. Utilisez du vinaigre blanc pur pour cette étape. Cette technique nettoie et désinfecte à la fois. Quoi qu’il en soit, le dégivrage constitue l’essentiel de l’entretien d’un congélateur. Les techniques sur comment dégivrer un congélateur ou comment décongeler un congélateur ont déjà été exposées, mais une question se pose tout de même : est-il possible de dégivrer le congélateur sans l’éteindre ? La réponse est oui, en vaporisant la glace d’eau bouillante. La glace fondra petit à petit et il faudra racler au fur et à mesure avec une spatule. Après avoir fini de dégivrer un congélateur, prenez toujours soin de vérifier les joints. Assurez-vous qu’il n’y ait pas de déperdition thermique. Le cas échéant, remplacez-les.
    `,
    "videoUrl": "",
    "photo": { "uri": "https://madu-staging.s3.eu-west-2.amazonaws.com/De%CC%81givrer%20son%20conge%CC%81lateur%20%20re%CC%81gulie%CC%80rement%20pour%20faire%20des%20e%CC%81conomies.jpg" },
    "quiz": {
      "question": "Quel pourcentage d’énergie en plus est consommée par un congélateur non dégivré ?",
      "choices": ["5%","15%","30%","60%"],
      "answer": "30%",
      "value": 10,
    },
  },
  {
    "theme":"ENERGY",
    "title":"Comment bien régler son thermostat pour faire des économies",
    "content": `
Tout ce qu’il faut savoir pour bien régler le thermostat et les vannes thermostatiques de ses radiateurs, pour un chauffage optimal.
La façon dont on règle le thermostat et les vannes thermostatiques peut influencer sa consommation d’énergie pour le chauffage et donc le montant de la facture. Le chauffage consomme en moyenne 65 à 70 % de l’énergie dans un logement.
Diminuer le chauffage pendant la nuit et lorsqu’on est absent permet d’économiser jusqu’à 25%. Et diminuer la température de 1°C réduit la consommation de 7%. Pour cela, il faut régler le thermostat et les vannes des radiateurs correctement.
Bien sûr, on a veillé en amont à isoler son habitation le mieux possible afin de diminuer les besoins en chauffage. Et à installer un bon thermostat si ce n’est fait, pour assurer confort et économies.
Le thermostat commande la chaudière. On y règle température à laquelle on souhaite chauffer la pièce (= température de consigne) et il ordonne à la chaudière de fonctionner jusqu’à ce que cette température soit atteinte. Pour cela, il se base sur la température de la pièce dans laquelle il est installé (souvent le salon).
On chauffe plutôt :
- à 19 ou 20 °C quand on est à la maison (régime de confort) ;
- à 15 ou 16°C la nuit et quand on s’absente (régime d'économie). On peut aussi couper totalement le chauffage (la consommation est alors nulle). Il faut simplement relancer suffisamment tôt pour retrouver sa température de confort.
Et on adapte les réglages en fonction du type de thermostat.
Diminuer le chauffage la nuit et en cas d'absence entraîne une économie de 10 à 25% d'énergie. Sur une facture moyenne de 1000 €/an (1000 litres de mazout ou 1000 m³ de gaz), le gain est ainsi de 100 à 250€/an.
    `,
    "videoUrl":"",
    "photo":{"uri":"https://madu-staging.s3.eu-west-2.amazonaws.com/will-malott-Xst4N6JnlvU-unsplash.jpg"},
    "quiz":{
      "question":"quizQuestion",
      "choices":["aaaaa","bbbb","ccccc","ddddd"],
      "answer":"aaaaa",
      "value": 10
    }
  },
  {"theme":"CONSUMPTION","title":"Parfumer son intérieur sans polluer",
    "content": `
Selon une étude du Crédoc (Centre de recherche pour l'étude et l'observation des conditions de vie) publiée en 2009, 9% des Français utilisent des \"parfums d'ambiance\" tous les jours et 15% au moins une fois par semaine.Une fréquence d'utilisation inquiétante, quand on sait que ces parfums et encens de synthèse sont considérés comme des polluants nuisant à la qualité de l'air d'intérieur. Une enquête de l'Inéris (Institut national de l'environnement industriel et des risques) rendue publique en 2013 pointait en effet du doigt la dangerosité des bâtons d'encens et des bougies parfumées qui, en se consumant, émettraient des particules toxiques comme le benzène ou le formaldéhyde, des produits dangereux considérés comme potentiellement cancérogènes par l'Union européenne.
Quant aux parfums d'intérieurs, ils ont longtemps été soupçonnés de contenir des phtalates, des perturbateurs endocriniens qui bloquent l'effet de la testostérone, imitent les oestrogènes et modifient la production d'hormones thyroïdiennes.
Autant de raison de miser sur les odeurs 100% naturelles (et testées et approuvées par nos grands-mères) pour parfumer nos intérieurs.
## 1. Ouvrez la fenêtre
Votre appartement sent le renfermé ou la chambre de votre ado la chaussette sale ? Le premier réflexe est d'ouvrir en grand la fenêtre (pensez à couper les radiateurs) pour rafraîchir votre intérieur. Selon l'Agence de Protection de l'Environnement (EPA) américaine, la pollution de l'air est 2 à 5 fois plus élevée à l'intérieur des domiciles qu'à l'extérieur. Une bonne raison d'aérer votre intérieur au moins une fois par semaine.
## 2. Faites bouillir de la cannelle
Pour donner à votre maison une ambiance douce et hivernale, il vous suffit d'avoir quelques bâtons de cannelle (ou à défaut de la cannelle en poudre) à portée de main. Remplissez une casserole d'eau et portez à ébullition. Une fois que l'eau bout, ajoutez la cannelle et laissez mijoter pendant quelques minutes, le temps que l'odeur se disperse dans toute la maison.
## 3. Misez sur le citron
Anti-bactérien, le citron est idéal pour nettoyer votre intérieur et apporter une délicieuse odeur de frais. Utilisez-le sous forme de jus ou d'huile essentielle pour nettoyer votre salle de bain et enlever les résidus de savon et de calcaire, nettoyer vos toilettes (en complément du bicarbonate de soude) ou laver les sols.
## 4. Fabriquez votre propre spray assainisseur d'air
Laissez tomber les sprays aux parfums de synthèse et autres désodorisants d'intérieur. Pour parfumer votre demeure à moindre coût, préparez vous-même votre assainisseur d'air avec du jus de citron vert, de l'eau et du bicarbonate. Vaporisez-le pour neutraliser les odeurs et apporter de la fraîcheur.
## 5. Cuisinez !
Il n'y a pas de meilleure odeur au monde que celle de la cuisine maison. Faites cuire des cookies, une tarte aux pommes ou un gâteau au chocolat et promis, vous vous sentirez chez vous comme dans un cocon.
## 6. Achetez des fleurs
En plus de décorer joliment votre intérieur, un bouquet de fleurs fraîches peut faire des merveilles en apportant d'agréables senteurs champêtres. Choisissez une variété à l'odeur enivrante, comme les roses, les pivoines ou les violettes et posez négligemment la composition dans un joli vase sur un comptoir ou votre table de salle à manger. Effet assuré.
## 7. Optez pour le café moulu
Même ceux qui ne sont pas fans du goût du café l'attestent : rien ne vaut l'odeur de grains de café fraîchement moulus le matin. Profitez de votre toute nouvelle Chemex pour vous offrir une machine à moudre et utilisez-la le dimanche matin pour réveiller la maisonnée avec une délicieuse odeur de café frais. Miam !
## 8. Revenez aux pots-pourris
Autre astuce testée et retestée par nos-grands-mères : celle du pot-pourri. Actualisez-la en dispersant dans les pièces principales de savants mélanges de fleurs et fruits séchées, épices et bois parfumés. Vous pouvez en remplir quelques petits sachets en coton ou en lin, que vous placerez ensuite dans vos tiroirs et armoires.
## 9. Pensez aux huiles essentielles
Dernière astuce pour parfumer naturellement votre intérieur : les huiles essentielles. Utilisées avec un diffuseur acheté dans le commerce, et combinées entre elles, elles apportent à votre intérieur une odeur de frais et assainissent durablement l'air. Attention toutefois de ne pas en abuser. Sachez également que la diffusion d'huiles essentielles est vivement déconseillée auprès des femmes enceintes et des enfants en bas âge
    `,"videoUrl":"","photo":{"uri":"https://madu-staging.s3.eu-west-2.amazonaws.com/solid-toiletries.png"},"quiz":{"question":"quizQuestion","choices":["aaaaa","bbbb","ccccc","ddddd"],"answer":"bbbb","value":10}},
  {"theme":"ALIMENTATION","title":"Réalisez vos propres conserves",
    "content": `
## Préparez vos Bocaux et Terrines Le Parfait
Assurez-vous que toutes les surfaces ne présentent pas d’ébréchures, de traces d’abrasion ou de résidus collés. Nettoyez bocaux, terrines et couvercles à l’eau chaude savonneuse. Evitez tout choc entre les bocaux ou les terrines. N’utilisez pas d’éponge métallique ou abrasive pour nettoyer vos bocaux et terrines.
Après le nettoyage, rincez abondamment vos bocaux et terrines à l’eau bien chaude, puis laissez sécher à l’air libre.
## Choisissez des aliments sains et frais
Les produits et denrées alimentaires que vous avez choisis de conserver doivent être parfaitement frais, sains et adaptés à la mise en conserve. N’utilisez jamais de produits ou ingrédients congelés ou qui ont été décongelés.
Au moment de la préparation de fruits ou de légumes, veillez à ne pas mettre en contact les aliments épluchés avec les déchets (épluchures, feuilles).
## Cuisinez vos aliments
Les légumes doivent être blanchis si besoin.
Les volailles doivent être entièrement évidées et l’intérieur soigneusement lavé à l’eau courante.
Respectez les indications de votre recette. Toutes les opérations
## Remplissez vos Bocaux ou Terrines Le Parfait
Chaque fois que le produit et son procédé de préparation le permettent, remplissez les bocaux ou terrines avec une préparation la plus chaude possible, même bouillante.
## Remplissez vos bocaux ou terrines jusqu’au niveau de remplissage gravé sur le corps ou jusqu’à 2 cm du rebord.
Ensuite, attendez quelques minutes afin de vérifier que votre préparation soit répartie correctement dans la masse, de manière à supprimer les poches d’air.
Complétez si nécessaire.
Attention : Dans le cas de terrines Le Parfait Familia Wiss, n’utilisez pas de saumure, sauce ou jus de couverture trop acide (alcool pur, vinaigre, etc.). En contact avec les parties métalliques, l’acide favorise la corrosion des capsules et des couvercles.
## Fermez vos Bocaux ou Terrines Le Parfait
Avant de fermer vos bocaux et terrines, prenez soin d’utiliser une nouvelle rondelle en caoutchouc universelle Le Parfait Super adaptée au format de votre bocal ou terrine.
Ebouillantez les rondelles avant de les ajuster sur les couvercles. Vérifiez que le bord de votre bocal ou terrine est bien propre avant de fermer. En effet, une particule coincée entre la rondelle et le verre ferait échouer votre fabrication de conserves.
Pour finir, enclenchez à fond le système de fermeture et procédez immédiatement au traitement thermique quand la recette en nécessite un.
Les procédés de conservation diffèrent selon les recettes. Certaines peuvent utiliser le vinaigre, l’huile ou le sel comme conservateurs, un traitement thermique n’étant alors pas forcément nécessaire.
Dans le cas des terrines Le Parfait Familia Wiss, utilisez toujours les capsules Le Parfait Familia Wiss neuves spécialement étudiées pour s’adapter à vos terrines. Assurez-vous que les capsules ne sont pas déformées, que le joint est en bon état, puis vissez le couvercle sans forcer avant de procéder au traitement thermique.
Traitement thermique
## Pour réaliser le traitement thermique de vos bocaux, plusieurs options s’offrent à vous :
- Les stérilisateurs électriques savent tout faire tout seuls et vous permettront de profiter de plus de temps libre. Ils sont très simple d’utilisation, placez les bocaux à l’intérieur en prenant soin de bien les caler pour qu’ils ne s’entrechoquent pas et ne se retournent pas pendant le traitement thermique. Remplissez d’eau le stérilisateur, immergez complètement les bocaux, puis remettez le couvercle. Il suffit ensuite de régler la durée et la température et c’est tout !
- Vous pouvez aussi utiliser un autocuiseur ou tout simplement une grande marmite ou une cocotte-minute. Dans ce cas, mettez un torchon au fond de votre récipient pour empêcher tout contact direct entre le verre et le métal, placez les bocaux à l’intérieur en prenant soin de bien les caler pour qu’ils ne s’entrechoquent pas et ne se retournent pas pendant le traitement thermique. Recouvrez les bocaux d'au moins 3cm d'eau si vous utilisez une grande marmite et couvrez. Dans le cas d'un autocuiseur, remplissez d’eau en respectant les instructions de remplissage de l’autocuiseur et portez à 100°C (température d’ébullition, ou quand la soupape de l’autocuiseur ou de la cocotte minute frémit). A partir de ce moment, vous pouvez activer votre minuteur (mais un réveil peut aussi faire l’affaire !).
Quelle que soit l’option choisie, il faudra laisser l’eau refroidir naturellement avant de sortir ses bocaux. Une fois le refroidissement obtenu, vous pourrez récupérer vos bocaux et terrines, il faudra les disposer debout dans un endroit sec et frais, à l’abri de la lumière, mécanisme Le Parfait Super déverrouillé, couvercle Le Parfait Familia Wiss retiré.
Vérifiez et stockez vos conserves
Lorsque les bocaux ou terrines sont totalement refroidis, vérifiez que le vide à l’intérieur est correct en débloquant le système de fermeture. Le couvercle doit rester « collé » au bocal et résister à la traction.
Pour les bocaux ou terrines Le Parfait Super, si le couvercle ne reste pas collé une fois le système de fermeture débloqué, cela peut-être dû à :
- Un remplissage incorrect : trop faible ou trop important.
- Un traitement thermique incomplet : temps trop court et/ou température trop basse.
- Un défaut d’étanchéité : ébréchure ou souillure sur le bord ou sur le couvercle.
- L’utilisation d’une rondelle trop ancienne, usagée, détériorée ou d’un modèle inadapté au format.
Remédiez à l’anomalie constatée et recommencez le traitement thermique en utilisant impérativement une autre rondelle.
Dans le cas des terrines Le Parfait Familia Wiss, procédez de même en dévissant le couvercle. La capsule doit être collée à la terrine et résister à la traction. Si la capsule n’est pas maintenue sur la terrine par le vide, recommencez le traitement thermique en utilisant impérativement une capsule neuve.
Pour conserver vos préparations pendant plusieurs mois, ne remettez pas les couvercles sur les terrines Le Parfait Familia Wiss ou ne rebloquez pas le mécanisme des bocaux ou terrines Le Parfait Super.
Stockez-les dans un endroit sec et frais, à l’abri de la lumière directe.
Ouvrez vos bocaux
Avant d’ouvrir vos bocaux ou terrines, vérifiez qu’il y a toujours le vide en procédant comme à l’étape 7.
Ne consommez pas les aliments, même pour les goûter, dans les cas suivants :
- Le couvercle des bocaux ou terrines Le Parfait Super ne reste pas collé une fois le système de fermeture débloqué
- La capsule des terrines Le Parfait Familia Wiss ne reste pas collée à la terrine
- Vous avez tout simplement un doute sur le bon état de conservation
L’ouverture doit être effectuée par un adulte. Tirez sur la languette de la rondelle de manière à faire pénétrer l’air dans le bocal ou la terrine Le Parfait Super, le couvercle se décollera.
Pour une ouverture plus aisée, il est recommandé d’utiliser le tire-rondelle Le Parfait conçu spécialement pour cet usage. Dans le cas des terrines Le Parfait Familia Wiss, il suffit de percer la capsule.
    `,"videoUrl":"","photo":{"uri":"https://madu-staging.s3.eu-west-2.amazonaws.com/brooke-lark-uarQNKJUdJk-unsplash1.jpg"},"quiz":{"question":"quizQuestion","choices":["aaaaa","bbbb","ccccc","ddddd"],"answer":"ccccc","value":10}},
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

  for (const uri of photos.filter((p, i, a) => a.indexOf(p) === i)) {
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
      tags: { connect: tags.filter(t => t.category === category && Math.random() < 0.2 || t.label === "€€").map(({ id }) => ({ id })) },
    })
  }

  const challenges = await Promise.all(
    defaultChallenges.map(([ name, description, value, theme ]) => (
      prisma.createChallenge({ name, description, value, theme })
    )),
  )

  const companiesId = []
  for (const [ name, type, [ street, zipCode, city ], [ lastName, firstName, email, phone, password ], emailDomains, coordinates, stripeCustomerId ] of companies) {
    const { id } = await prisma.createCompany({
      name,
      type,
      address: { create: {
        street, zipCode, city,
        location: { create: {
          type: "Point",
          coordinates: { set: coordinates },
        } },
      } },
      users: { create: {
        firstName, lastName, email, phone,
        password: await bcrypt.hash(password, 10),
        role: "ADMIN",
        isRepresentative: true,
        history: {
          create: challenges.map(({ id, value }) => Math.random() < 0.5 && ({
            bounty: value,
            originType: "CHALLENGE",
            originId: id,
            date: String(subDays(new Date(), 1+randomBetween(0, 7)).getTime()),
          })).filter(Boolean),
        },
      } },
      emailDomains: { set: emailDomains },
      stripeCustomerId,
    })
    companiesId.push(id)
  }

  await setAllCompaniesChallenges(null, null, { prisma })

  const articles = await Promise.all(defaultArticles.map(article => {
    article.photo = { create: article.photo },
    article.quiz.choices = { set: article.quiz.choices }
    article.quiz = { create: article.quiz },
    article.date = String(new Date().getTime())
    return prisma.createArticle(article)
  }))

  for (let i = 0; i < 100; i++) {
    try {
      await prisma.createUser({
        firstName: faker.name.firstName(),
        lastName: faker.name.lastName(),
        email: faker.internet.email().toLowerCase(),
        password: await bcrypt.hash("user", 10),
        role: "USER",
        company: { connect: { id: randomFromArray(companiesId) } },
        history: {
          create: articles.map(({ id }) => Math.random() < 0.2 && ({
            bounty: 50,
            originType: "ARTICLE",
            originId: id,
            date: String(Date.now()),
          })).filter(Boolean),
        },
      })
    } catch (error) { console.log(error) }
  }
  await Promise.all(
    Object.entries(defaultRewards).map(([ theme, rewards ]) =>
      rewards.map(({ type, value, uri, title, content }) =>
        prisma.createReward({
          type,
          value,
          article: { create: {
            theme,
            title,
            content,
            videoUrl: "",
            photo: { create: { uri } },
            date: String(Date.now()),
          } },
        }),
      ),
    ).flat(),
  )
}

const clearDb = async () => {
  await prisma.deleteManyUsers()
  await prisma.deleteManyTags()
  await prisma.deleteManyPhotos()
  await prisma.deleteManyPlaces()
  await prisma.deleteManyCompanies()
  await prisma.deleteManyChallenges()
  await prisma.deleteManyArticles()
  await prisma.deleteManyRewards()
}

(async function () {
  await clearDb()
  await populateDb()
  console.log("db seeded!")
})()


