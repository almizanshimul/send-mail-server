const express = require('express');
const cors = require('cors');
const app = express();
require('dotenv').config();
const nodemailer = require('nodemailer');
const mg = require('nodemailer-mailgun-transport');
const port = process.env.PORT || 3000

// middleware
app.use(cors())
app.use(express.json())

// This is your API key that you retrieve from www.mailgun.com/cp (free up to 10K monthly emails)
const auth = {
  auth: {
    api_key: process.env.MAILGUN_API_KEY,
    domain: process.env.MAILGUN_DOMAIN
  }
}

const nodemailerMailgun = nodemailer.createTransport(mg(auth));

app.post('/', (req, res) => {
  formSubmit(req)
})

function formSubmit(req) {
  const email = req.body.email;
  const sub = req.body.sub;
  const message = req.body.mess;

  nodemailerMailgun.sendMail({
  from: 'work.shimul@gmail.com',
  to: email, 
  subject: sub,
  'replyTo': 'work.shimul@gmail.com',
  //You can use "html:" to send HTML email content. It's magic!
  html: `<b>${message}</b>`,
}, (err, info) => {
  if (err) {
    console.log(`Error: ${err}`);
  }
  else {
    console.log(`Response: ${info.response}`);
  }
});
}


app.get('/', (req, res) => {
  res.send('Hello World!')
})

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})