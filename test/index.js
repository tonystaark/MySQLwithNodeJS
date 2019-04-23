const test = require('tape-async');
const sleep = require('sleep-promise');
let request = require('supertest');
let app = require('../app');

test('CREATE TABLE ', function (t) {
  connection.query("CREATE TABLE IF NOT EXISTS teachers (id int(11) AUTO_INCREMENT PRIMARY KEY, teacher VARCHAR(100), student VARCHAR(100), suspended BOOL NOT NULL DEFAULT 0);", function (err, result) {
    if (err) throw err;
  })
  t.end()
})

test('register students under teacher Ken!', async function (t) {
  let data = {
    "teacher": "teacherken@example.com",
    "student": ["studentjon@example.com","studenthon@example.com","studentbob@example.com","commonstudent1@gmail.com","commonstudent2@gmail.com"]
  }
  request(app)
    .post('/api/register')
    .send(data)
    .expect(204)
    .end((err, res) => {
      t.error(err, 'No error');
      t.end();
    });
});


test('register students under teacher Joe!', function (t) {
  let data = {
    "teacher": "teacherjoe@example.com",
    "student": ["studentmary@example.com","studentagnes@example.com","studentmiche@example.com","commonstudent1@gmail.com","commonstudent2@gmail.com"]
  }
  request(app)
    .post('/api/register')
    .send(data)
    .expect(204)
    .end((err, res) => {
      t.error(err, 'No error');
      t.end();
    });
});

test('Retrieve a list of common students to teacher Ken', function (t) {
  let data = {
    "students":[
      "commonstudent1@gmail.com","commonstudent2@gmail.com","studentbob@example.com","studenthon@example.com","studentjon@example.com"
    ]
  }
  request(app)
    .get('/api/commonstudents?teacher=teacherken%40example.com')
    .set('Accept', 'application/json')
    .expect('Content-Type', /json/)
    .expect(200)
    .end((err, res) => {
      t.error(err, 'No error');
      t.deepEqual(res.body.students.sort(),data.students.sort(), "same set of data retrieved")
      t.end();
    });
});

test('Retrieve a list of common students to a given list of teachers', function (t) {
  let data = {
    "students":[
      "commonstudent1@gmail.com","commonstudent2@gmail.com"
    ]
  }
  request(app)
    .get('/api/commonstudents?teacher=teacherken%40example.com&teacher=teacherjoe%40example.com')
    .set('Accept', 'application/json')
    .expect('Content-Type', /json/)
    .expect(200)
    .end((err, res) => {
      t.error(err, 'No error');
      t.deepEqual(res.body.students.sort(),data.students.sort(), "same set of data retrieved")
      t.end();
    });
});

test('Suspend a student', function (t) {
  let data = {"student":"studentmary@example.com"}
  request(app)
    .post('/api/suspend')
    .send(data)
    .expect(204)
    .end(function (err, res) { 
      t.error(err, 'No error');
      t.end();
    });
});

test('Retrieve a list of students who are given notifications', function (t) {
  const sent = {
      "teacher": "teacherken@example.com",
      "notification": "Hello students! @studentagnes@example.com @studentmiche@example.com  "
  }
  const received ={
    "recipients":[
      "studentjon@example.com",
      "studenthon@example.com",
      "studentbob@example.com",
      "commonstudent1@gmail.com",
      "commonstudent2@gmail.com",
      "studentagnes@example.com",
      "studentmiche@example.com"
    ]
  }
  request(app)
    .post('/api/retrievefornotifications')
    .send(sent)
    .expect(200)
    .end(function (err, res) { 
      t.error(err, 'No error');
      t.deepEqual(res.body.response.recipients.sort(),received.recipients.sort(), "same set of data retrieved")
      t.end();
    });
});

test('Retrieve a list of students who are given notifications', function (t) {
  const sent = {
      "teacher": "teacherken@example.com",
      "notification": "Hello students!"
  }
  const received ={
    "recipients":[
      "studentjon@example.com",
      "studenthon@example.com",
      "studentbob@example.com",
      "commonstudent1@gmail.com",
      "commonstudent2@gmail.com",
    ]
  }
  request(app)
    .post('/api/retrievefornotifications')
    .send(sent)
    .expect(200)
    .end(function (err, res) { 
      t.error(err, 'No error');
      t.deepEqual(res.body.response.recipients.sort(), received.recipients.sort(), "same set of data retrieved")
      t.end();
    });
});

test('DROP TABLE ', function (t) {
  connection.query('DROP TABLE teachers', function (err, result) {
    if (err) throw err;
  })
})

