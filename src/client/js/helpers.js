export const isRecentTrip = (dateStart) => {
  const limit = 15 * aDay
  return dateStart - Date.now() < limit
}

export const isValidDates = (dateStart,dateEnd) => {
  return (dateEnd > dateStart) && (dateStart > Date.now()-aDay)
}

export const getCoordinate = async city => await fetch(`https://api.weatherbit.io/v2.0/forecast/daily?&city=${cleanSpace2(city)}&key=eb1955dad12148b9a6716786f15d6d0f`).then((res)=>res.json()).then((obj)=>[obj['lon'],obj['lat']])

// For RestCountries API and Pixabay API
export const cleanSpace1 = (string) => {
  return string.split(' ').join('%20')
}

// For WeatherBit API
export const cleanSpace2 = (string) => {
  return string.split(' ').join('-')
}


export const betweenDates = (date1,date2) => {
  // Find the differences between dates
  return Math.ceil((date2-date1) / (1000 * 3600 * 24))+1
}

export const dateList = (date1,date2) => {
  return Array.from({length: betweenDates(date1,date2)}, (v, i) => i);
}

export const addDate = (date,value=1) => {
  date.setDate(date.getDate()+value)
  // return date
}

export const changeQuote = () => {
  travel_quote.innerHTML = random_item(travel_quotes)
}

export const random_item = (list) => {
  return list[Math.floor(Math.random()*list.length)]
}

export const getIconURL = (icon) => {
  return `https://www.weatherbit.io/static/img/icons/${icon}.png`
}