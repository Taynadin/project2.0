const express = require("express");
const properties = require("../models/properties.js");
// Email
const emailConfig = require('../config/email');
const sendmail = require('gmail-send');
const send = require('gmail-send')(emailConfig);

var router = express.Router();

// Get All Properties
router.get('/api/properties', function(req, res) { 
  let query = req.query ? req.query : {}; //if/else
  
  properties.all(query, function(data) {
    res.json(data);
  });
});

// Get One Property by ID
router.get('/api/properties/:id', function(req, res) {
  const property_id = req.params.id;

  properties.one(property_id, function(data) {
    res.json(data);
  });
});

// Insert Properties
router.post('/api/properties', function(req, res) {
  const cols = ['address','city','zipcode', 'bedroom', 'bathroom', 'guest', 'description', 'price', 'image']; // table cols names
  const vals = [
    req.body.address,
    req.body.city,
    req.body.zipcode,
    req.body.bedroom,
    req.body.bathroom,
    req.body.guest,
    req.body.description,
    req.body.price,
    req.body.image,
  ];
  
  properties.create(cols, vals, function(data) {
    res.json({ msg: 'Property added successfully!', id: data.insertId });
  });
});

// Contact 

router.post('/api/contact', function (req,res){
  var name = req.body.name;
  var email = req.body.email;
  var subject = req.body.name;
  var message = req.body.message;

  send({
    to: 'cfevents2018@gmail.com', 
    replyTo: email, // client email
    subject: subject, 
    html: message,
  });
  res.json({ msg: 'Email send successfully!'});
});

//  Request Inquiry 
router.post('/api/request', function (req,res){
      var name = req.body.name;
      var email = req.body.email;
      var totalPrice = req.body.totalPrice;
      var checkIn = req.body.checkIn;
      var checkOut = req.body.checkOut;
      var address = req.body.address;
      var city = req.body.city;
      var zipcode = req.body.zipcode;


  send({
    to: 'cfevents2018@gmail.com', 
    replyTo: email, // client email
    subject: `${name} send a request inquiry for Events Spaces` , 
    html: `<h1> Hi Events Spaces!</h1>
          <h3> My name is ${name}, and I would like to know if you have this days ${checkIn} - ${checkOut} available on the house with address ${address} ${city}, ${zipcode}?</h3></br>
          <h2>Customer Information: </h2></br>
          <h4> Name: ${name}, </h4>
          <h4> Email: ${email}, </h4>
          <h4> Check in: ${checkIn}, </h4>
          <h4> Check Out: ${checkOut}, </h4>
          <h4> Grand Total: ${totalPrice} </h4>
          `,
  });
  res.json({ msg: 'Email send successfully!'});
});





// router.put('/properties/:id', function(req, res) {
//   var condition = 'id = ' + req.params.id;
//   var eat = req.body.eat;
  
//   properties.update({
//       eat: eat
//   }, condition, function(data) {
//     res.redirect(303, '/');
//   });
// });


// Export routes for server.js to use.
module.exports = router;