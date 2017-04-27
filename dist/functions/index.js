'use strict';

const express = require("express");
const functions = require('firebase-functions');
const app = express();
const bodyParser = require("body-parser");
const methodOverride = require("body-parser");
const cors = require('cors')({
  origin: true
});

// const api_key = 'key-2578ee979a39213d2cd35f7f57cf29f9';
// const domain = 'sandbox4f20eb3dbcd9490d8c68ce559f20e6a4.mailgun.org'
// const mailgun = require('mailgun-js')({
//   apiKey: api_key,
//   domain: domain
// });

const nodemailer = require('nodemailer');
const gmailEmail = encodeURIComponent(functions.config().gmail.email);
const gmailPassword = encodeURIComponent(functions.config().gmail.password);
const mailTransport = nodemailer.createTransport(`smtps://${gmailEmail}:${gmailPassword}@smtp.gmail.com`);



//function 
function sendHelloWord(req, res) {
  res.send("Hello World!");
}

function sendEmail(req, res) {
  var arrayParamsNeeded = ["name", "email", "subject"];
  var allNeeded = true;
  for (var a in arrayParamsNeeded) {
    if (!req.body[arrayParamsNeeded[a]]) {
      allNeeded = false;
    }
  }
  if (allNeeded) {
    var from = req.body.name + ' <' + req.body.email + '>';
    var subject = req.body.subject;
    var text = req.body.msg ? req.body.msg : '';
    var data = {
      from: from,
      to: 'carlosechanm@gmail.com',
      subject: subject,
      html: text
    };

    mailTransport.sendMail(data).then((error, info) => {
      res.json({
        status: 1,
        error: error,
        info: info,
        msg: "Email enviado"
      });
    });


    // mailgun.messages().send(data, function (error, body) {
    //   if (error) {
    //     res.status(403).json({
    //       status: 0,
    //       error: error,
    //       msg: "No se pudo enviar el correo"
    //     });
    //   } else {
    //     res.json({
    //       status: 1,
    //       msg: "Email enviado"
    //     });
    //   }
    // });



  } else {
    res.status(403).json({
      status: 0,
      error: 'No se enviaron todos los datos',
      msg: 'No se enviaron todos los datos'
    });
  }
}




app.use(cors);
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({
  extended: true
}));
app.use(methodOverride());

var router = express.Router();

router.post('/sendEmail', sendEmail);




app.use(router);

// app.listen(3000, function () {
//   console.log("Node server running on http://localhost:3000");
// });
// This HTTPS endpoint can only be accessed by your Firebase Users.
// Requests need to be authorized by providing an `Authorization` HTTP header
// with value `Bearer <Firebase ID Token>`.
exports.properties = functions.https.onRequest(app);
