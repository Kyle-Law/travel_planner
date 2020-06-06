// const validateContent = require('./validator')

// function handleSubmit(event) {
//     event.preventDefault()

//     // check what text was put into the form field
//     const formText = document.getElementById('name').value
//     if (Client.validateContent(formText)) {
//       postData('http://localhost:3000/input',{content:formText}).then((data)=>{
//         // console.log(data);
//         document.getElementById('result_input').innerHTML = `Input: ${data.text.slice(0,500)}...`;
//         document.getElementById('result_polarity').innerHTML = `Polarity: <span class="highlight">${data.polarity}</span > with confidence of ${(data.polarity_confidence*100).toFixed(2)}%`;
//         document.getElementById('result_subjectivity').innerHTML = `Subjectivity: <span class="highlight">${data.subjectivity}</span > with confidence of ${(data.subjectivity_confidence*100).toFixed(2)}%`;
//       })
//     } else {
//       alert('Invalid url link')
//     }
// }

// // Async POST
// const postData = async ( url = '', data = {})=>{

//     const response = await fetch(url, {
//     method: 'POST', 
//     credentials: 'same-origin', 
//     headers: {
//         'Content-Type': 'application/json',
//     },
//     body: JSON.stringify(data), // body data type must match "Content-Type" header        
//   });

//     try {
//       const newData = await response.json();
//       return newData
//     }catch(error) {
//       console.log("error", error);
//     }
// }

// export { handleSubmit }
// export {postData}