const { result_container, availableCurrency } = require('./variables');

// Pixabay API
export const setBackgroundImage = (key,destination) => {
  fetch(`https://pixabay.com/api/?key=${key}&q=${destination}&image_type=photo&pretty=true`).then((res)=>res.json())
  .then((obj) => {
      const imgLink = obj.total == 0 ? 'https://cdn.pixabay.com/photo/2017/10/23/05/56/holiday-2880261_960_720.jpg' : obj.hits[0]['webformatURL']
      result_container.style.backgroundImage = `linear-gradient(0deg, rgba(0,0,0,0.5) 0%, rgba(0,0,0,0.5) 100%),url('${imgLink}')`;
  })
}

// ExchangeRatesAPI
export const getExchangeRate = async (baseCurrency,priceCurrency) => await fetch(`https://api.exchangeratesapi.io/latest?base=${baseCurrency}`).then((res)=>res.json()).then((obj)=> obj['rates'][priceCurrency])

// WeatherBit API
export const getWeather = async url => await fetch(url).then((res)=>res.json()).then(obj=>obj)

// RestCountries API
export const getCurrency = async country => await fetch(`https://restcountries.eu/rest/v2/name/${country}`).then((res)=>res.json()).then((obj)=>{ 
    let currency
    if (obj['status'] != 404) {
        for (let c of obj[0]['currencies']) {
            if (availableCurrency.includes(c['code'])) {
                currency = c['code']
            }
            else {
                currency = 'USD'
            }
        }
    } else {
        currency = 'USD'
    }
    
    return currency
})
