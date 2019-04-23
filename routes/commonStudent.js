const express = require('express');
const router = express.Router();

router.get('/', function(req, res, next) {
  let searchCommon;
  if(Array.isArray(req.query.teacher)) {
    searchCommon = `SELECT student FROM teachers where teacher IN (?) GROUP BY student HAVING COUNT(student)>1;`
  } else{
    searchCommon = `SELECT student FROM teachers where teacher IN (?) `
  }
  
  connection.query(searchCommon,[req.query.teacher],(err, result) => {
    if (err) {
      res.status(500).json({"error":err, "response":null })
      throw err;
    } else {
      result = JSON.parse(JSON.stringify(result))
      const array = result.map(res => res.student)
      res.json({"students":array})
    }

  })


});

module.exports = router;
