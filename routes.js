var express = require("express");
// var mailer = require('nodemailer');

var router = express.Router();


// Home Page
router.get('/', function (req, res) {
  res.sendFile(__dirname + '/public/index.html');
});

// Single Property Page 
router.get('/property', function (req, res) {
  res.sendFile(__dirname + '/public/single-property.html');
});

// Properties Page 
router.get('/properties', function (req, res) {
  res.sendFile(__dirname + '/public/properties.html');
});

// Blog Page
router.get('/blog', function (req, res) {
  res.sendFile(__dirname + '/public/blog.html');
});

// Contact Page 
router.get('/contact', function (req, res) {
  res.sendFile(__dirname + '/public/contact.html');
});
// Contact Page 
router.get('/about', function (req, res) {
  res.sendFile(__dirname + '/public/about.html');
});

// Submit Property 
router.get('/form', function (req, res) {
  res.sendFile(__dirname + '/public/form.html');
});


// router.get('/send', function (req,res) {
//   var smtpTransport = mailer.createTransport({
//     service: "Gmail",
//     auth: {
//         user: "cfevents2018@gmail.com",
//         pass: "centralflorida"
//     }
//   });


// })


module.exports = router;
  