const express = require('express');
const router = express.Router();

router.post('/', async function(req, res, next) {

  let request,test;
  test ? request = test : request = req.body //for unit test
  if (isEmptyObject(request)){
    res.json({"status": 500, "error":"no input", "response":null }).end()
  }
  let studentNotRegistered = request.notification.split(" ").filter(e => e[0] === '@').map(e=>e.substring(1));
  if (studentNotRegistered.length < 1)studentNotRegistered = [""];
  const notification = 
  `
    SELECT DISTINCT student FROM teachers WHERE suspended = 0 AND (teacher = ? OR student IN (?))
  `

  connection.query(notification,[request.teacher, studentNotRegistered], (err, result) => {
    if (err) {
      res.status(500).json({"error":err, "response":null })
      throw err;
    } else {
      result = JSON.parse(JSON.stringify(result))
      const array = result.map(res => res.student)
      res.json({"status": 200, "error":null, "response":{"recipients":array}})
    }
  })


});

module.exports = router;
