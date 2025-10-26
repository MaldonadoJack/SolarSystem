import express from 'express';
import fetch from 'node-fetch';

const solarSystem = (await import('npm-solarsystem')).default;

const app = express();
app.set("view engine", "ejs");
app.use(express.static("public"));

// root route
app.get('/', async (req, res) => {
    let randomImageResponse = await fetch("https://pixabay.com/api/?key=20426927-497d14db9c234faf7d0df8317&per_page=50&orientation=horizontal&q=solar%20system");
    let randomImageData = await randomImageResponse.json();

    let randomNumber = Math.floor(Math.random() * randomImageData.hits.length);

    let randomImageURL = randomImageData.hits[randomNumber].webformatURL;

    // console.log(randomImageURL);

    res.render('home.ejs' , {randomImageURL});
});

// Planet route
app.get('/planet', (req, res) => {
    let planet_name = req.query.planetName;

    let planetInfo = solarSystem[`get${planet_name}`]();

    // console.log(planetInfo);
    res.render('planetInfo.ejs' , {planetInfo , planet_name});
});

app.get('/nasaPod.ejs' , (req, res) => {
    res.render('nasaPod.ejs');
});

app.get('/asteroids' , (req, res) => {
    let planetInfo = solarSystem[`getAsteroids`]();
    res.render('asteroids.ejs' , {planetInfo})
})

app.get('/comets' , (req, res) => {
    let planetInfo = solarSystem[`getComets`]();
    res.render('comet.ejs' , {planetInfo})
})

// Mercury route
// app.get('/mercury', (req, res) => {
//     let planetInfo = solarSystem.getMercury();
//     console.log(planetInfo);
//     res.render('mercury.ejs' , {planetInfo});
// });

app.listen(3000, () => {
    console.log('server started');
});