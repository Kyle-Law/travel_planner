const button = document.querySelector('#submit');
const result_container = document.querySelector('.result_container')
const result = document.querySelector('.result');
const ul = document.querySelector('ul');
let dateStart;
let dateEnd;
const pixabay_key = '16881536-892cc3d25e58cc27da592cf97';
const aDay = 1000*60*60*24;
const notAvailableIconSrc = 'https://cdn0.iconfinder.com/data/icons/large-glossy-icons/128/No.png'
const availableCurrency = ['USD','JPY','BGN','CZK','DKK','GBP','HUF','PLN','RON','SEK','CHF','ISK','NOK','HRK','RUB','TRY','AUD','BRL','CAD','CNY','HKD','IDR','ILS','KRW','MXN','MYR','NZD','PHP','SGD','THB','ZAR']
const exchange_rate = document.querySelector('.exchange_rate')

button.addEventListener('click',(e)=>{
    e.preventDefault()
    const departure = document.querySelector('#departure').value
    const cleanedDeparture = cleanSpace1(departure) // For RestCountries API
    const destination = document.querySelector('#destination').value;
    const cleanedDestination = cleanSpace1(destination) // For Pixabay API and RestCountries API
    const dateStartString = document.querySelector('#dateStart').value;
    dateStart = new Date(dateStartString);
    const dateEndString = document.querySelector('#dateEnd').value;
    dateEnd = new Date(dateEndString);
    const weatherBitUrl = `https://api.weatherbit.io/v2.0/forecast/daily?&city=${cleanSpace2(destination)}&days=${betweenDates(dateStart,dateEnd)}&key=eb1955dad12148b9a6716786f15d6d0f`
    // if (isValidDates(dateStart,dateEnd)) {
        // console.log(content)
    
        const currency1 = getCurrency(cleanedDeparture)
        const currency2 = getCurrency(cleanedDestination)
        currency1.then((value1)=>{
            currency2.then((value2)=>{
                const er = getExchangeRate(value1,value2)
                er.then((data)=>{
                    exchange_rate.innerHTML = `${value2}/${value1}: ${data.toFixed(4)} <br> ${value1}/${value2}: ${(1/data).toFixed(4)}`
                    console.log(data)
                })
                // console.log(er)
                console.log(value1)
                console.log(value2)
            })
        })
        setBackgroundImage(cleanedDestination)
        getWeather(weatherBitUrl).then((obj)=>{
            updateUI(obj,dateStart,dateEnd)
        })
    // } else {
        // window.alert("Invalid Date")
    // }
    
})

// function getCurrency(country) {
//     fetch(`https://restcountries.eu/rest/v2/name/${country}`).then((res)=>res.json()).then((obj) => {
//         currency = obj[0]['currencies'][0]['code']
//         console.log(currency)
//         return currency
//     })
// }

const getCurrency = async country => await fetch(`https://restcountries.eu/rest/v2/name/${country}`).then((res)=>res.json()).then((obj)=>{
    let currency
    for (let c of obj[0]['currencies']) {
        // console.log(c['code'])
        if (availableCurrency.includes(c['code'])) {
            currency = c['code']
        }
        else {
            currency = 'USD'
        }
    }
    return currency
})

const getExchangeRate = async (baseCurrency,priceCurrency) => await fetch(`https://api.exchangeratesapi.io/latest?base=${baseCurrency}`).then((res)=>res.json()).then((obj)=> obj['rates'][priceCurrency])

const getWeather = async url => await fetch(url).then((res)=>res.json()).then((obj)=>obj)



function setBackgroundImage(destination) {
    fetch(`https://pixabay.com/api/?key=${pixabay_key}&q=${destination}&image_type=photo&pretty=true`).then((res)=>res.json())
    .then((obj) => {
        console.log(obj)
        imgLink = obj['total'] == 0 ? 'https://cdn.pixabay.com/photo/2017/10/23/05/56/holiday-2880261_960_720.jpg' : obj.hits[0]['webformatURL']
        result_container.style.backgroundImage = `linear-gradient(0deg, rgba(0,0,0,0.5) 0%, rgba(0,0,0,0.5) 100%),url('${imgLink}')`;
    })
}

function getIconURL(icon){
    return `https://www.weatherbit.io/static/img/icons/${icon}.png`
}

function updateUI(obj,dateStart="", dateEnd="") {
    ul.innerHTML = ""
    result.innerHTML = `
    <h3>Weather forecast of <span class="city_name">${obj.city_name.toUpperCase()}</span> from ${dateStart.getDate()}/${dateStart.getMonth() + 1} to ${dateEnd.getDate()}/${dateEnd.getMonth()+1}</h3>
    `
    for (const i of dateList(dateStart,dateEnd)) {
        let iconSrc
        let temp
        if (i < 16) {
            iconSrc = getIconURL(obj.data[i]['weather']['icon']);
            temp = obj.data[i]['temp']
        } else {
            iconSrc = notAvailableIconSrc;
            temp = '-'
        }
        const li = document.createElement('li')
        li.innerHTML = `
            <p class="date">${dateStart.getDate()}/${dateStart.getMonth() + 1}</p>
            <img class="icon" src=${iconSrc}></img>
            <p class="temp">${temp}</p>
        `
        ul.appendChild(li)
        addDate(dateStart)
    }
}

function isRecentTrip(dateStart){
    const limit = 15 * aDay
    console.log(limit)
    console.log(dateStart - Date.now())
    return dateStart - Date.now() < limit
}

function isValidDates(dateStart,dateEnd) {
    console.log(dateEnd > dateStart)
    console.log(dateStart > Date.now()-aDay)
    return (dateEnd > dateStart) && (dateStart > Date.now()-aDay)
}



const getCoordinate = async city => await fetch(`https://api.weatherbit.io/v2.0/forecast/daily?&city=${cleanSpace2(city)}&key=eb1955dad12148b9a6716786f15d6d0f`).then((res)=>res.json()).then((obj)=>[obj['lon'],obj['lat']])



// For RestCountries API and Pixabay API
function cleanSpace1(string) {
    return string.split(' ').join('%20')
}

// For WeatherBit API
function cleanSpace2(string) {
    return string.split(' ').join('-')
}


function betweenDates(date1,date2){
    // Find the differences between dates
    return Math.ceil((date2-date1) / (1000 * 3600 * 24))+1
}

function dateList(date1,date2) {
    return Array.from({length: betweenDates(date1,date2)}, (v, i) => i);
}

function addDate(date,value=1) {
    date.setDate(date.getDate()+value)
    // return date
}


// 3 checks - dateend<datestart; datestart<datenow-1;both okay case.

// Random unnecessary codes :

// const getWeather = (destination) => {
//     const baseURL = `https://api.weatherbit.io/v2.0/forecast/daily?&city=${destination}&days=10&key=eb1955dad12148b9a6716786f15d6d0f`
//     const res = fetch(baseURL)
//     return res.json()
    // try {
    //     if (res) {
    //         const data = await res.json();
    //         return data;
    //     } else {
    //         window.alert('Please enter valid destination :)')
    //     }
    // } catch(error) {
    //     console.log("error", error);
    //     // appropriately handle the error
    // }
// }

// function getCoordinate(city) {
//     fetch(`https://api.weatherbit.io/v2.0/forecast/daily?&city=${city}&key=eb1955dad12148b9a6716786f15d6d0f`).then((res)=>res.json()).then(obj => obj)
// }

// For Pixabay API
// function cleanSpace1(string) {
//     return string.split(' ').join('+')
// }

// async function getExchangeRate(baseCurrency,priceCurrency) {
//     await fetch(`https://api.exchangeratesapi.io/latest?base=${baseCurrency}`).then((res)=>res.json().then((obj)=> obj['rates'][priceCurrency]
//     ))
// }