
export const categories = {
  FOOD: "Restaurant",
  SHOP: "Boutique",
  ACTIVITY: "Service/Loisir",
}

export const categoryIcons = {
  FOOD: "restaurant-fill",
  SHOP: "store-2-fill",
  ACTIVITY: "lightbulb-fill",
}

export const days = {
  0: "SUNDAY",
  1: "MONDAY",
  2: "TUESDAY",
  3: "WEDNESDAY",
  4: "THURSDAY",
  5: "FRIDAY",
  6: "SATURDAY",
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