const button = document.querySelector('#submit');
const result_container = document.querySelector('.result_container')
const result = document.querySelector('.result');
const ul = document.querySelector('ul');
let dateStart;
let dateEnd;
const pixabay_key = '16881536-892cc3d25e58cc27da592cf97';
const aDay = 1000*60*60*24;
const notAvailableIconSrc = 'https://cdn0.iconfinder.com/data/icons/large-glossy-icons/128/No.png'
const availableCurrency = ['USD','JPY','BGN','CZK','DKK','GBP','HUF','PLN','RON','SEK','CHF','ISK','NOK','HRK','RUB','TRY','AUD','BRL','CAD','CNY','HKD','IDR','INR','ILS','KRW','MXN','MYR','NZD','PHP','SGD','THB','ZAR']
const exchange_rate = document.querySelector('.exchange_rate')
const travel_quotes = ["“We travel, some of us forever, to seek other places, other lives, other souls.” – Anais Nin","“Traveling – it leaves you speechless, then turns you into a storyteller.” – Ibn Battuta","“Adventure is worthwhile.” – Aesop","“A journey is best measured in friends, rather than miles.” – Tim Cahill","“The gladdest moment in human life, methinks, is a departure into unknown lands.” – Sir Richard Burton","“No place is ever as bad as they tell you it’s going to be.” – Chuck Thompson","“I am not the same, having seen the moon shine on the other side of the world.” – Mary Anne Radmacher","“Travel makes one modest. You see what a tiny place you occupy in the world.” – Gustave Flaubert","“He who would travel happily must travel light.” – Antoine de St. Exupery","“To awaken alone in a strange town is one of the pleasantest sensations in the world.” – Freya Stark","“The life you have led doesn’t need to be the only life you have.” – Anna Quindlen","“Man cannot discover new oceans unless he has the courage to lose sight of the shore.” – Andre Gide","“The world is a book, and those who do not travel read only one page.” – Saint Augustine","“Travel and change of place impart new vigor to the mind.” – Seneca","“With age, comes wisdom. With travel, comes understanding.” – Sandra Lake","“Once a year, go someplace you’ve never been before.” – Anonymous","“Travel is the only thing you buy that makes you richer.” – Anonymous","“Better to see something once than hear about it a thousand times.” – Asian Proverb","“Work, travel, save, repeat.” – Anonymous","“We travel not to escape life, but for life not to escape us.” – Anonymous","“Traveling tends to magnify all human emotions.” — Peter Hoeg","“You don’t have to be rich to travel well.” – Eugene Fodor","“People don’t take trips, trips take people.” – John Steinbeck","“When overseas you learn more about your own country, than you do the place you’re visiting.” – Clint Borgen","“Life is either a daring adventure or nothing.” – Helen Keller","“Travel is never a matter of money, but of courage.” — Paulo Coelho","“Life begins at the end of your comfort zone.” – Neale Donald Walsch"," “The more I traveled the more I realized that fear makes strangers of people who should be friends.” – Shirley MacLaine","“A mind that is stretched by a new experience can never go back to its old dimensions.” – Oliver Wendell Holmes","“Remember that happiness is a way of travel – not a destination.” – Roy M. Goodman","“Stop worrying about the potholes in the road and enjoy the trip.” – Babs Hoffman","“Once in a while it really hits people that they don’t have to experience the world in the way they have been told to.” – Alan Keightley","“One’s destination is never a place, but a new way of seeing things.” – Henry Miller","“I haven’t been everywhere, but it’s on my list.” – Susan Sontag","“Take only memories, leave only footprints.” – Chief Seattle","“Investment in travel is an investment in yourself.” – Matthew Karsten","“Our happiest moments as tourists always seem to come when we stumble upon one thing while in pursuit of something else.” — Lawrence Block","“Live your life by a compass, not a clock.” – Stephen Covey","“Travel far enough, you meet yourself.” – David Mitchell","“Wherever you go becomes a part of you somehow.” – Anita Desai","“We travel for romance, we travel for architecture, and we travel to be lost.” – Ray Bradbury","“Wherever you go, go with all your heart!” – Confucius"]
const travel_quote = document.querySelector('.travel_quote')
travel_quote.innerHTML = random_item(travel_quotes)

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
    
        const currency1 = getCurrency(cleanedDeparture)
        const currency2 = getCurrency(cleanedDestination)
        currency1.then((value1)=>{
            currency2.then((value2)=>{
                const er = getExchangeRate(value1,value2)
                er.then((data)=>{
                    exchange_rate.innerHTML = `${value2}/${value1}: ${data.toFixed(4)} <br> ${value1}/${value2}: ${(1/data).toFixed(4)}`
                })
                // console.log(er)
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


const getCurrency = async country => await fetch(`https://restcountries.eu/rest/v2/name/${country}`).then((res)=>res.json()).then((obj)=>{ 
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

const getExchangeRate = async (baseCurrency,priceCurrency) => await fetch(`https://api.exchangeratesapi.io/latest?base=${baseCurrency}`).then((res)=>res.json()).then((obj)=> obj['rates'][priceCurrency])

const getWeather = async url => await fetch(url).then((res)=>res.json()).then(obj=>obj)

function setBackgroundImage(destination) {
    fetch(`https://pixabay.com/api/?key=${pixabay_key}&q=${destination}&image_type=photo&pretty=true`).then((res)=>res.json())
    .then((obj) => {
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
    return dateStart - Date.now() < limit
}

function isValidDates(dateStart,dateEnd) {
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

function changeQuote() {
    travel_quote.innerHTML = random_item(travel_quotes)
}

function random_item(list){
    return list[Math.floor(Math.random()*list.length)]
}

export { random_item, addDate, dateList, betweenDates, cleanSpace1, cleanSpace2 }
// export { cleanSpace1 }
// export { cleanSpace2 }
// module.exports = cleanSpace1;
// module.exports = cleanSpace2;