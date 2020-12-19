import express from 'express';
import { createRequire } from 'module';
const require = createRequire(import.meta.url);

const app = express();
//const people = jsonfile.readFile('./people.json')
const people = require('./people.json');
const restateList = require('./data/realestate.json');
let ts = Date.now();
let date_ob = new Date(ts);
let datetime=date_ob.getDate()+"/"+(date_ob.getMonth() + 1)+"/"+date_ob.getFullYear()+" "+date_ob.getHours()+":"+date_ob.getMinutes()+":"+date_ob.getSeconds();; 

app.set('view engine', 'pug');

app.use(express.static('./public'));

/*
app.get('/', (req, res) => {
  console.log(datetime+" : Received request from "+req.hostname);
  res.render('index', {
    title: 'Homepage',
    people: people.profiles
  });
});
*/
app.get('/', (req, res) => {
  res.redirect('/realestate')
});
app.get("/realestate", (req, res) => {
  console.log(datetime+" : Received request from "+req.hostname);
  res.render('realestate', {
    title: 'Homepage',
    restateList: restateList.listings
  });
});

app.get("/listing", (req, res) => {
  const listing = restateList.listings.find(p => p.id === req.query.id);
  res.render('listing', {
    title: `${listing.type} : ${listing.title}`,
    listing
  });
});

app.get("/profile", (req, res) => {
  const person = people.profiles.find(p => p.id === req.query.id);
  res.render("profile", {
    title: `About ${person.firstname} ${person.lastname}`,
    person
  });
});

const server = app.listen(7000, () => {
  console.log(`Server running → PORT ${server.address().port}`);
});
