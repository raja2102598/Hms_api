var dbconn = require("./dbpatient")

function addPatientData(req, res) {
  var user = req.body
  dbconn.addpatient(user, (err, result) => {
    if (err) {
      console.log(err)
    } else {
      console.log(result)
      res.send("Data Inserted")
    }
  })
}

function getPatientsData(req, res) {
  dbconn.getPatients((err, result) => {
    if (err) {
      console.log(err)
    } else {
      res.send(result)
    }
  })
}

function updatePatientData(req, res) {
  var userInput = req.body

  dbconn.updatePatient(userInput, function (e, result) {
    if (e) {
      console.log(e)
    } else if (result) {
      res.send("1 Row Updated Successfully")
    }
  })
}

function deletePatientData(req, res) {
  var patient_id = req.body

  dbconn.deletePatient(patient_id, function (e, result) {
    if (e) {
      console.log(e)
    } else if (result) {
      res.send("Data Successfully Deleted")
    }
  })
}

module.exports = {
  addPatientData,
  deletePatientData,
  updatePatientData,
  getPatientsData,
}
