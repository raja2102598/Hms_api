var conn = require("../../../../app/db/dbconn")

var moment = require("moment")

function addPhBill(input, callback) {
  input.date = moment(Date.now()).format("YYYY-MM-DD HH:mm:ss")
  conn.query("insert into ph_billing SET ?", input, (err, results) => {
    if (err) {
      console.log(err)
    } else if (results) {
      callback(null, results)
    } else {
      conn.end()
    }
  })
}

function getPhBills(callback) {
  var bills = []
  conn.query("select * from ph_billing", (err, results) => {
    if (err) {
      console.log(err)
    } else if (results) {
      results.forEach((bill) => {
        bills.push(bill)
      })
      callback(null, bills)
    } else {
      conn.end()
    }
  })
}

function updatePhBill(inUserData, callback) {
  var user = {
    b_id: inUserData.b_id,
  }
  inUserData.date = moment(Date.now()).format("YYYY-MM-DD HH:mm:ss")
  conn.query(
    "update ph_billing SET ? where ?",
    [inUserData, user],
    function (e, results) {
      if (e) {
        console.log(e)
      } else if (results) {
        callback(null, results)
      } else {
        conn.end()
      }
    }
  )
}

function deletePhBill(inpBill, callback) {
  var bill_id = {
    b_id: inpBill.b_id,
  }
  conn.query("delete from ph_billing where ?", bill_id, function (e, results) {
    if (e) {
      console.log(e)
    } else if (results) {
      callback(null, results)
    } else {
      conn.end()
    }
  })
}


function getPhBillById(id, callback) {
  var bills = []
  conn.query(
    "select * from ph_billing where patient_id=?",
    id,
    (err, results) => {
      if (err) {
        console.log(err)
      } else if (results) {
        results.forEach((bill) => {
          bills.push(bill)
        })
        callback(null, bills)
      } else {
        conn.end()
      }
    }
  )
}

module.exports = {
  addPhBill,
  updatePhBill,
  getPhBills,
  deletePhBill,
  getPhBillById,
}
