const express = require('express');
const router = express.Router();

const register = router.post('/', function(req, res, next) {

  const createData = 
  `
    INSERT INTO teachers(teacher, student) VALUES ?;
    ALTER TABLE teachers ADD UNIQUE INDEX (teacher, student);
  `

  let insert;
  const student = req.body.student;
  const teacher = req.body.teacher;
  if(Array.isArray(student)){
    insert = student.map(i => [teacher, i])
  } else if (Array.isArray(teacher)){
    insert = teacher.map(i => [i, student])
  } else if (!Array.isArray(teacher) & !Array.isArray(student)) {
    insert = [teacher, student]
  } else {
    res.status(400).json({"error":"Not expecting both to be arrays", "response":null })
  }

  connection.query(createData, [insert], (err, result) => {
    if (err) {
      res.status(500).json({"error":err, "response":null })
      throw err;
    } else {
      res.status(204).end()
    }
  })


});

module.exports = register;
