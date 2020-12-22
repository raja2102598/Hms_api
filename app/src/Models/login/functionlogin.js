var dbconn = require("./dblogin")

function addLoginData(req, res) {
  var user = req.body
  dbconn.addLogin(user, (err, result) => {
    if (err) {
      console.log(err)
    } else {
      console.log(result)
      res.send("Data Inserted")
    }
  })
}

function updateLoginData(req, res) {
  var userInput = req.body

  dbconn.updateLogin(userInput, function (e, result) {
    if (e) {
      console.log(e)
    } else if (result) {
      res.send("1 Row Updated Successfully")
    }
  })
}

function deleteLoginData(req, res) {
  var u_id = req.body

  dbconn.deleteLogin(u_id, function (e, result) {
    if (e) {
      console.log(e)
    } else if (result) {
      res.send("Data Successfully Deleted")
    }
  })
}


function userLogin(req, res) {
  var user = req.body
  dbconn.userLoginDb(user, (err, result) => {
    if (err) {
      console.log(err)
    } else {
      console.log(result)
      res.send(result)
    }
  })
}

module.exports = {
  addLoginData,
  deleteLoginData,
  updateLoginData,
  userLogin,
}
