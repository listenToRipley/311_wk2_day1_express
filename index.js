
const express = require('express')
const app = express()
const bodyParser = require('body-parser')
const port = process.env.PORT || 4000

const { users } = require('./state')

//should automatically increase when an ite, it posted to the state.js document. 
let count = users.length

//want all verbs to know the userId is actually the _id from the user object

//call in the express body parse in order to ex the execute the POST
  //allows us to pull in json raw documents
app.use(bodyParser.json())
  //allows use to pull in url encoded content 
app.use(bodyParser.urlencoded({ extended: false}))

/* BEGIN - create routes here */
//GET object list of people from the state.js file, as listed in the imported document under users. 
app.get(('/users'), (req, res, next) => {
  //returns that users file. 
  res.json(users)
  //include next so we know we want to continue to the next get 
  next()
})
//this ones will return the individual based on the provided input 
app.get(('/users/:userId'), (req, res) => {
  //we need to located the id first in the users profile
 const findId =  res.json(users.filter(user => user._id === parseInt(req.params.userId))) 
 console.log(findId)
 const userFound = findId[0]

 if(!userFound) {
   res.status(400).json({msg: `There is not user with the id of ${req.params.userId}`})
 } 
 res.json(userFound)
})

//create new person in my state.js
app.post(('/users'), (req, res) => {
  //we have to create a json acceptable format so we can enter that new information to match that of the state.js document. 
  //console.log(`here is the post element, ${req}`)
  const newEntry = { 
  
      _id: count+1, //since this is going on the send, that we should be able to just increase based increasing length of the document as it is created, assuming we are posting one at a time. 
    
      //we are requesting the content to be updated via json formatting. so we req. the content in the body with the name or occupation. 
        //~~do we need to edit the head for this? 
      name: req.body.name,
      occupation: req.body.occupation,
      //we need to conclude logic that states this is a link to an img. 
      avatar: req.body.avatar 
  }
  //console.log(`this is my new addition object ${newEntry}`)
  // need to require their name and occupation, but the picture is optional
  if(!newEntry.name || !newEntry.occupation) {
    //if you are missing the name or occupation, then is not a valid entry.
        //tried to use !200 here instead and it would not work, why not?
    return res.status(400).json({msg: 'Please include a name and occupation'})
  } 
    //add the new entry to the object where it will be stored
    users.push(newEntry)
    //return the whole new object with the new person included  
    return res.json(users)
})

//update the content within the 1st users
app.put(('/users/:userId'), (req, res) => {
  console.log('hello, you are inside the put request')
  //find the individual we are looking for 
  const findId =  users.filter(user => user._id === parseInt(req.params.userId))[0]
  console.log('find that id',findId)
  const updateEntry = req.body
  //located the matching person in your state object.
    if (findId) {
      findId.name = updateEntry.name ? updateEntry.name : user.name,
      findId.occupation = updateEntry.occupation ? updateEntry.occupation : user.occupation
      res.send(users)
    } else {
      res.status(400).json({msg: 'User not found'})
    }
})

//delete the first user
app.delete(('/users/:userId'), (req, res) => {
  // console.log('am I getting here')
  // console.log('req looks like', req)
  //find the id entry you are looking for 
  const findId =  users.filter(user => user._id === parseInt(req.params.userId))[0]
  console.log('the result of the find', findId)
  //the the header set it to false or checking if thats false 
   if (!findId) {
    res.status(400).send('no user found')
  } 
  //don't have the proper logic to remove this from the object. 
  findId.isActive = false
  res.send('deleted')
  
})
/* END - create routes here */


app.listen(port, () => 
  console.log(`Example app listening on port ${port}!`))