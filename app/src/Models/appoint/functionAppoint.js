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
//select all appointments for a particular patient

function getParticularApp(req, res) {
  var id = req.params.id
  dbconn.getAppointsForEach(id, (err, result) => {
    if (err) {
      console.log(err)
    } else {
      if (result.length > 0) {
        console.log(result)
        res.send(result)
      } else {
        res.send("No Data Found")
      }
    }
  })
}
//cancel a appointment for a particular patient with appoint id

function cancelParticularApp(req, res) {
  var id = req.params.a_id
  var status = req.params.status
  dbconn.cancelAppoint([id, status], (err, result) => {
    if (err) {
      console.log(err)
    } else {
      if (result.affectedRows > 0) {
        // console.log(result)
        res.send("Success")
      } else {
        console.log(result);
        res.send("No Data Found")
      }
    }
  })
}



module.exports = {
  addApp,
  getApp,
  updateApp,
  deleteApp,
  getParticularApp,
  cancelParticularApp,
}
