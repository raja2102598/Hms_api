var conn = require("../../../../app/db/dbconn")

function addStaff(input, callback) {
  conn.query("insert into staffs SET ?", input, (err, results) => {
    if (err) {
      console.log(err)
    } else if (results) {
      callback(null, results)
    } else {
      conn.end()
    }
  })
}

function getStaffs(callback) {
  var staffs = []
  conn.query("select * from staffs", (err, results) => {
    if (err) {
      console.log(err)
    } else if (results) {
      results.forEach((staff) => {
        staffs.push(staff)
      })
      callback(null, staffs)
    } else {
      conn.end()
    }
  })
}

function updateStaff(inStaffData, callback) {
  var staff = {
    s_id: inStaffData.s_id,
  }
  conn.query(
    "update staffs SET ? where ?",
    [inStaffData, staff],
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

function deleteStaff(inp, callback) {
  var staff_id = {
    s_id: inp.s_id,
  }
  conn.query("delete from staffs where ?", staff_id, function (e, results) {
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
  addStaff,
  updateStaff,
  getStaffs,
  deleteStaff,
}
