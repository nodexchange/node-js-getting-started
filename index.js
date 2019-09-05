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
    let sessionEmail = 'he@oup.com';
    let sessionRole = 'urn:lti:instrole:ims/lis/Administrator';
    let user_id = 'dcd72e7fade37949c0857b6e3e2393ca1534a003';
    if (req.session) {
      if (req.session.student_email) {
        sessionEmail = req.session.student_email;
        sessionRole = req.session.roles;
        user_id = req.session.user_id;
      }
    }
    console.log('___ SESSION session:student_email:: ___ ' + sessionEmail);
    res.render('pages/index', {'student_email':sessionEmail})
  })
  .post('/', (req, res) => {
    console.log(req.body);
    console.log('=============== | REQ ====================')
    // console.log(res);
    // console.log('=============== | RES ====================')
    const studentEmail = req.body.lis_person_contact_email_primary;
    const roles = req.body.roles;
    const studentUserId = req.body.user_id;
    req.session.valid = true;
    req.session.student_email = studentEmail;
    req.session.roles = roles;
    req.session.studentUserId = studentUserId;
    res.redirect(`/?email='${studentEmail}&role=${roles}&userId=${studentUserId}`);
    // res.redirect(200, '/survey.html?email='+studentEmail);
    // res.end();
  })
  .listen(PORT, () => console.log(`Listening on ${ PORT }`))
