var conn = require("../../../../app/db/dbconn")

function addPhBill(input, callback) {
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

module.exports = {
  addPhBill,
  updatePhBill,
  getPhBills,
  deletePhBill,
}