var conn = require("../../../../app/db/dbconn")

function addAppoint(input, callback) {
  conn.query("insert into appoint_list SET ?", input, (err, results) => {
    if (err) {
      console.log(err)
    } else if (results) {
      callback(null, results)
    } else {
      conn.end()
    }
  })
}

function getAppoints(callback) {
  var appointments = []
  conn.query("select * from appoint_list", (err, results) => {
    if (err) {
      console.log(err)
    } else if (results) {
      results.forEach((appoint) => {
        appointments.push(appoint)
      })
      callback(null, appointments)
    } else {
      conn.end()
    }
  })
}

function updateAppoint(inUserData, callback) {
  var a_id = {
    appoint_id: inUserData.appoint_id,
  }
  conn.query(
    "update appoint_list SET ? where ?",
    [inUserData, a_id],
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

function deleteAppointment(inpUser, callback) {
  var appoint = {
    appoint_id: inpUser.appoint_id,
  }
  conn.query(
    "delete from patient_list where ?",
    appoint,
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

module.exports = {
  addAppoint,
  getAppoints,
  deleteAppointment,
  updateAppoint,
}
