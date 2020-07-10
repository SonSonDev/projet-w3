import React from "react";
import * as s from '../styles'

import IllustrationChallengeAlimentation from "../assets/img/illu-challenge_alimentation.svg"
import IllustrationChallengeConso from "../assets/img/illu-challenge_conso.svg"
import IllustrationChallengeEau from "../assets/img/illu-challenge_eau.svg"
import IllustrationChallengeEnergie from "../assets/img/illu-challenge_energie.svg"

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


export const challengeContent = {
  ALIMENTATION: {
    title: "Mangez sain",
    text: "Cette semaine, relevez le défis liés à l’alimentation et gagnez des points",
    illustation: (style) => <IllustrationChallengeAlimentation style={style} />,
  },
  CONSUMPTION: {
    title: "Consommez malin",
    text: "Cette semaine, relevez le défis liés à la consommation et gagnez des points",
    illustation: (style) => <IllustrationChallengeConso style={style} />,
  },
  WATER: {
    title: "Consommez moins",
    content: "Cette semaine, relevez le défis liés à l’eau et gagnez des points",
    illustation: (style) => <IllustrationChallengeEau style={style} />,
  },
  ENERGY: {
    title: "Consommez moins",
    text: "Cette semaine, relevez le défis liés à l’énergie et gagnez des points",
    illustation: (style) => <IllustrationChallengeEnergie style={style} />,
  },
}

export const contextualisation = () => {
  const currentHour = new Date().getHours()
  if (currentHour < 6)
    return { title: 'Au dodo', category: undefined, greeting: 'Vous voilà' }
  if (currentHour < 12)
    return { title: 'Pour bien commencer la journée', category: 'ACTIVITY' }
  if (currentHour < 15)
    return { title: 'C’est l’heure du déjeuner !', category: 'FOOD' }
  if (currentHour < 19)
    return { title: 'Après midi en douceur', category: 'SHOP' }
  if (currentHour < 21)
    return { title: 'L’heure de dîner', category: 'FOOD', greeting: 'Bonsoir' }
  else
    return { title: 'Bonne soirée', category: undefined, greeting: 'Vous voilà' }
}

export const markdownStyles = {
  heading2: [ s.heading4, s.mt3, s.mb1 ],
  text: [ s.body1, { lineHeight: 24 } ],
  listItemBullet: [ s.mx1, s.heading5, s.selfStart ],
  listItemNumber: [ s.ml1, s.heading5, s.selfStart ],
  listItemText: [ s.pr3 ],
}

export const toastStates = {
  'SUCCESS': { icon: 'check-line', color: '#0E562F', backgroundColor: '#DAEEE6' },
  'WARNING': { icon: 'emotion-happy-line', color: '#ECB081', backgroundColor: '#FCF4ED' },
  'FAIL': { icon: 'emotion-unhappy-line', color: '#B4543A', backgroundColor: '#FBEAE9' },
  'ERROR': { icon: 'emotion-unhappy-line', color: '#B4543A', backgroundColor: '#FBEAE9' },
}