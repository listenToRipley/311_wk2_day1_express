
const express = require('express')
const app = express()
const port = process.env.PORT || 4000

const { users } = require('./state')

/* BEGIN - create routes here */
app.get(('/users'), (req, res, next) => {
  //returns the files located in the users from the variable imported above 
  res.json(users)
  next()
})
//this ones will return the individual based on the provided input 
app.get(('/users/:_id'), (req, res, next) => {
  //we need to located the id first in the users profile 
 const findId =  res.json(users.filter(user => user._id == parseInt(req.params._id))) 
 
 if(findId === true) {
   return findId
 } else {
   return res.status(!200).json({msg: `There is not user with the id of ${req.params._id}`})
 }
 next()
})

app.post(('/users'), (req, res) => {
  const newPerson = {
    //since this does seem to go with their location in the object, why not hard code it in. 
      _id: users.length+1,
      name: req.body.name,
      occupation: req.body.occupation,
      //need to make sure this is an image
      avatar: req.body.avatar 
  }
  // need to require their name and occupation, but the picture is optional
  if(!newPerson.name || !newPerson.occupation) {
    return res.status(!200).json({msg: 'Please include a name and occupation'})
  } else {
    //add the new entry to the object where it will be stored
    user.push(newPerson)
    //return the whole new object with the new person included  
    return res.json(users)
  }

})

/* END - create routes here */

app.listen(port, () => 
  console.log(`Example app listening on port ${port}!`))