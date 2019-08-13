const express = require('express')
const path = require('path')
const bodyParser = require('body-parser')
const session = require('express-session')
const PORT = process.env.PORT || 5000


express()
  .use(express.static(path.join(__dirname, 'public')))
  .set('views', path.join(__dirname, 'views'))
  .set('view engine', 'ejs')
  .use(session({ secret: 'keyboard cat', cookie: { maxAge: 60000 }}))
  .use(bodyParser.urlencoded({ extended: false }))
  .use(bodyParser.json())
  .get('/', (req, res) => {
    const passedVariable = req.session.valid;
    console.log('___ SESSION session:valid:: ___ ' + passedVariable);
    res.render('pages/index', {'student_email':req.session.student_email})
  })
  .post('/', (req, res) => {
    console.log(req);
    // console.log('=============== | REQ ====================')
    // console.log(res);
    // console.log('=============== | RES ====================')
    const studentEmail = req.lis_person_contact_email_primary;
    req.session.valid = true;
    req.session.student_email = studentEmail;
    res.redirect('/survey.html?email='+studentEmail);
    // res.redirect(200, '/survey.html?email='+studentEmail);
    // res.end();
  })
  .listen(PORT, () => console.log(`Listening on ${ PORT }`))
