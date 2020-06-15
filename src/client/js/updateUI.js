const { result, ul , notAvailableIconSrc} = require('./variables');
const { dateList, addDate, getIconURL } = require('./helpers');


// export const updateUI = (obj,dateStart="", dateEnd="") => {
//   ul.innerHTML = ""
//   result.innerHTML = `
//   <h3>Weather forecast of <span class="city_name">${obj.city_name.toUpperCase()}</span> from ${dateStart.getDate()}/${dateStart.getMonth() + 1} to ${dateEnd.getDate()}/${dateEnd.getMonth()+1}</h3>
//   `
//   for (const i of dateList(dateStart,dateEnd)) {
//       let iconSrc
//       let temp
//       if (i < 16) {
//           iconSrc = getIconURL(obj.data[i]['weather']['icon']);
//           temp = obj.data[i]['temp']
//       } else {
//           iconSrc = notAvailableIconSrc;
//           temp = '-'
//       }
//       const li = document.createElement('li')
//       li.innerHTML = `
//           <p class="date">${dateStart.getDate()}/${dateStart.getMonth() + 1}</p>
//           <img class="icon" src=${iconSrc}></img>
//           <p class="temp">${temp}°</p>
//       `
//       ul.appendChild(li)
//       addDate(dateStart)
//   }
// }

export const updateUI = async () => {
    const request = await fetch('/all');
    try{
      const allData = await request.json();
      addView(allData)
    }catch(error){
      console.log("error", error);
    }
}


function addView(ar){
    ar.forEach((data,index)=>{
        data.dateStart = new Date(data.dateStart)
        data.dateEnd = new Date(data.dateEnd)
        ul.innerHTML = ""
        result.innerHTML = `
        <h3>Weather forecast of <span class="city_name">${data.destination.toUpperCase()}</span> from ${data.dateStart.getDate()}/${data.dateStart.getMonth() + 1} to ${data.dateEnd.getDate()}/${data.dateEnd.getMonth()+1}</h3>
        `
        // console.log('hehe')
        for (const i of dateList(data.dateStart,data.dateEnd)) {
            let iconSrc
            let temp
            if (i < 16) {
                iconSrc = getIconURL(data.icon[i]);
                temp = data.temp[i]
            } else {
                iconSrc = notAvailableIconSrc;
                temp = '-'
            }
            const li = document.createElement('li')
            li.innerHTML = `
                <p class="date">${data.dateStart.getDate()}/${data.dateStart.getMonth() + 1}</p>
                <img class="icon" src=${iconSrc}></img>
                <p class="temp">${temp}°</p>
            `
            ul.appendChild(li)
            addDate(dateStart)
        }

    })
  }