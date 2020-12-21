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


function getBillById(req, res) {
  var id = req.params.id
  dbconn.getPhBillById(id, (err, result) => {
    if (err) {
      console.log(err)
    } else {
      result.length > 0 ? res.send(result) : res.send("No Data Found")
    }
  })
}

function getPatDetail(req, res) {
  var id = req.params.id
  dbconn.getPatientDetails(id, (err, result) => {
    if (err) {
      console.log(err)
    } else {
      result.length > 0 ? res.send(result) : res.send("No Match Found")
    }
  })
}

module.exports = {
  addbill,
  deletebill,
  getbills,
  updatebill,
  getBillById,
  getPatDetail,
}
