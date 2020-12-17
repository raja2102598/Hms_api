var conn = require("../../../../app/db/dbconn")

//patient

function addpatient(input, callback) {
  conn.query("insert into patient_list SET ?", input, (err, results) => {
    if (err) {
      console.log(err)
    } else if (results) {
      callback(null, results)
    } else {
      conn.end()
    }
  })
}

function getPatients(callback) {
  var patients = []
  conn.query("select * from patient_list", (err, results) => {
    if (err) {
      console.log(err)
    } else if (results) {
      results.forEach((patient) => {
        patients.push(patient)
      })
      callback(null, patients)
    } else {
      conn.end()
    }
  })
}

function updatePatient(inUserData, callback) {
  var user = {
    p_id: inUserData.p_id,
  }
  conn.query(
    "update patient_list SET ? where ?",
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

function deletePatient(inpUser, callback) {
  var patient = {
    p_id: inpUser.patient_id,
  }
  conn.query(
    "delete from patient_list where ?",
    patient,
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
  addpatient,
  updatePatient,
  getPatients,
  deletePatient,
}
