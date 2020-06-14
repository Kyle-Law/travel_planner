const { button, pixabay_key, exchange_rate, travel_quotes, travel_quote } = require('./variables');
const { cleanSpace1, cleanSpace2, betweenDates,  random_item, dateList } = require('./helpers');
const { updateUI } = require('./updateUI');
const { setBackgroundImage, getExchangeRate, getWeather, getCurrency, postData } = require('./api');

travel_quote.innerHTML = random_item(travel_quotes)

button.addEventListener('click',(e)=>{
    e.preventDefault()
    const departure = document.querySelector('#departure').value
    const cleanedDeparture = cleanSpace1(departure) // For RestCountries API
    const destination = document.querySelector('#destination').value;
    // console.log(destination)
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
            })
        })
        setBackgroundImage(pixabay_key,cleanedDestination)
        getWeather(weatherBitUrl).then((obj)=> {
            // console.log(obj)
            const iconArray = []
            const tempArray = []
            for (const i of dateList(dateStart,dateEnd)) {
                iconArray.push(obj.data[i]['weather']['icon'])
                tempArray.push(obj.data[i]['temp'])
            }
            postData('/addWeather',{destination: obj.city_name,icon:iconArray,temp: tempArray, dateStart:dateStart, dateEnd:dateEnd})
        })
        .then(()=>{
            updateUI()
        })
    // } else {
        // window.alert("Invalid Date")
    // }
});

