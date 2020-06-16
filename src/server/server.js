const express = require('express')
const app = express();
const port = process.env.PORT || 3000
const projectData = [];
const bodyParser = require ('body-parser');

app.use(express.static('dist'));

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
// app.get('/', function (req, res) {
//   res.sendFile('/dist/index.html');
// })

app.listen(port, async () => {
    console.log(`The server is runing on http://localhost:${port}`);
})

app.post('/addWeather',addWeather);
function addWeather(req,res) {
    // console.log(req.body)
    newEntry = {
        destination: req.body.destination,
        icon: req.body.icon,
        temp: req.body.temp,
        dateStart: req.body.dateStart,
        dateEnd: req.body.dateEnd
    }
    projectData.unshift(newEntry)
    res.send(projectData);
    console.log(projectData);
};

app.get('/all', getData)
function getData(req, res) {
    res.send(projectData);
};

export { app }