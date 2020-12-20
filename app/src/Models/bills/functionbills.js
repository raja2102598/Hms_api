var dbconn = require("./dbbills")

function addbill(req, res) {
  var bill = req.body
  dbconn.addPhBill(bill, (err, result) => {
    if (err) {
      console.log(err)
    } else {
      console.log(result)
      res.send("Data Inserted")
    }
  })
}

function getbills(req, res) {
  dbconn.getPhBills((err, result) => {
    if (err) {
      console.log(err)
    } else {
      res.send(result)
    }
  })
}

function updatebill(req, res) {
  var userInput = req.body

  dbconn.updatePhBill(userInput, function (e, result) {
    if (e) {
      console.log(e)
    } else if (result) {
      res.send("1 Row Updated Successfully")
    }
  })
}

function deletebill(req, res) {
  var b_id = req.body

  dbconn.deletePhBill(b_id, function (e, result) {
    if (e) {
      console.log(e)
    } else if (result) {
      res.send("Data Successfully Deleted")
    }
  })
}

module.exports = {
  addbill,
  deletebill,
  getbills,
  updatebill,
}