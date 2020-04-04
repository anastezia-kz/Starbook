const mongoose = require('mongoose')

mongoose
  .connect('mongodb://localhost/starbook', {useNewUrlParser: true})
  .then(x => {
    console.log(`Connected to Mongo! Database name: "${x.connections[0].name}"`)
  })
  .catch(err => {
    console.error('Error connecting to mongo', err)
  });

const User = require('../models/user');

const users =[
  {
    username: "Chewbacca",
    
    homeworld:"https://swapi.co/api/planets/14/",
    language: "Shyriiwook",
    
  },{
    username: "Jubba Hutt",
    
    homeworld:"https://swapi.co/api/planets/24/",
    language:"Huttese",
    
},{
    username: "Luke Skywalker",
    
    homeworld:"https://swapi.co/api/planets/1/",
    language:"English",
}
]

User.create(users)
  .then(users => {
    console.log('created users', users)
    mongoose.connection.close()
  })

