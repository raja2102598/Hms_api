var dbconn = require("./dbAppoint")

function addApp(req, res) {
  var user = req.body
  dbconn.addAppoint(user, (err, result) => {
    if (err) {
      console.log(err)
    } else {
      console.log(result)
      res.send("Data Inserted")
    }
  })
}
function getApp(req, res) {
  dbconn.getAppoints((err, result) => {
    if (err) {
      console.log(err)
    } else {
      res.send(result)
    }
  })
}
function updateApp(req, res) {
  var userInput = req.body

  dbconn.updateAppoint(userInput, function (e, result) {
    if (e) {
      console.log(e)
    } else if (result) {
      res.send("1 Row Updated Successfully")
    }
  })
}

function deleteApp(req, res) {
  var appointment_id = req.body

  dbconn.deleteAppointment(appointment_id, function (e, result) {
    if (e) {
      console.log(e)
    } else if (result) {
      res.send("Data Successfully Deleted")
    }
  })
}

module.exports = {
  addApp,
  getApp,
  updateApp,
  deleteApp,
}
