let express = require('express');
let router = express.Router();

router.post('/', function(req, res, next) {
  let suspend = 
  `
    UPDATE teachers SET Suspended = 1 WHERE student = ?
  `

  connection.query(suspend, [req.body.student], (err, result) => {
    result = JSON.parse(JSON.stringify(result))
    let changed = result.changedRows
    let warning = result.warningCount

    if (err) {
      res.status(500).json({"error":err, "response":null })
    } else if(changed === 0 && warning === 0){
      res.status(400).send({"error":"Either no such record or the student has been suspended ", "response":null })
    } else {
      res.status(204).end()
    }
  })


});

module.exports = router;
