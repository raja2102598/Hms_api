var dbconn = require("./dbregister")

function reguser(req, res) {
  var user = req.body
  dbconn.registerUser(user, (err, result) => {
    if (err) {
      console.log(err)
    } else {
      console.log(result)
      res.send("Data Inserted")
    }
  })
}

function getusersdata(req, res) {
  dbconn.getUsers((err, result) => {
    if (err) {
      console.log(err)
    } else {
      res.send(result)
    }
  })
}

function updateuserdata(req, res) {
  var userInput = req.body

  dbconn.updateUser(userInput, function (e, result) {
    if (e) {
      console.log(e)
    } else if (result) {
      res.send("1 Row Updated Successfully")
    }
  })
}

function deleteuserdata(req, res) {
  var p_id = req.body

  dbconn.deleteUser(p_id, function (e, result) {
    if (e) {
      console.log(e)
    } else if (result) {
      res.send("Data Successfully Deleted")
    }
  })
}

module.exports = {
  reguser,
  updateuserdata,
  deleteuserdata,
  getusersdata,
}
