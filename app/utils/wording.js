
export const categories = {
  FOOD: "Restaurant",
  SHOP: "Boutique",
  ACTIVITY: "Service/Loisir",
}

export const categoryIcons = {
  FOOD: "restaurant-line",
  SHOP: "store-2-line",
  ACTIVITY: "flashlight-line",
}

export const categorySubtitles = {
  FOOD: { prefix: 'Cuisine ', tag: 'Type de cuisine'},
  SHOP: { prefix: '', tag: 'Type de boutique' },
  ACTIVITY: { prefix: '', tag: 'Type d\'activité/loisir'},
}

export const restrictionIcons = {
  'Vegan': { icon: 'leaf-fill', text: 'Option vegan', color: 'green' },
  'Végétarien': { icon: 'seedling-fill', text: 'Option végétarienne', color: 'green' },
  'Handicap moteur': { icon: 'wheelchair-fill', text: 'Accès handicap moteur', color: 'purple' },
  'Handicap auditif': { icon: 'voiceprint-fill', text: 'Accès handicap auditif', color: 'purple' },
  'Handicap visuel': { icon: 'eye-off-fill', text: 'Accès handicap visuel', color: 'purple' },
}

export const dayIndexes = {
  0: "SUNDAY",
  1: "MONDAY",
  2: "TUESDAY",
  3: "WEDNESDAY",
  4: "THURSDAY",
  5: "FRIDAY",
  6: "SATURDAY",
}

export const days = {
  MONDAY: "lundi",
  TUESDAY: "mardi",
  WEDNESDAY: "mercredi",
  THURSDAY: "jeudi",
  FRIDAY: "vendredi",
  SATURDAY: "samedi",
  SUNDAY: "dimanche",
}

export const prices = {
  '€': 'Prix bas',
  '€€': 'Prix moyen',
  '€€€': 'Prix élevé',
}

export const themes = {
  ALIMENTATION: "Alimentation",
  CONSUMPTION: "Consommation/Déchets",
  WATER: "Eau",
  ENERGY: "Énergie",
}

export const openOrClosed = (open, close) => {
  if (!open || !close) {
    return [false, 'Fermé']
  }
  const openHour = new Date().setHours(...open.split(':'))
  const closeHour = new Date().setHours(...close.split(':'))
  if (Date.now() < openHour && openHour-Date.now() <= 60*60*1000) {
    return [true, 'Bientôt ouvert']
  }
  if (Date.now() >= openHour && Date.now() < closeHour && closeHour-Date.now() <= 60*60*1000) {
    return [true, 'Bientôt fermé']
  }
  if (Date.now() >= openHour && Date.now() < closeHour) {
    return [true, 'Ouvert']
  }
  return [false, 'Fermé']
}