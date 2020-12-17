var conn = require("../../../db/dbconn")

function addLogin(input, callback) {
  conn.query("insert into login SET ?", input, (err, results) => {
    if (err) {
      console.log(err)
    } else if (results) {
      callback(null, results)
    } else {
      conn.end()
    }
  })
}

function updateLogin(inUserData, callback) {
  var user_id = {
    u_id: inUserData.u_id,
  }
  conn.query(
    "update login SET ? where ?",
    [inUserData, user_id],
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

function deleteLogin(inpUser, callback) {
  var user_id = {
    u_id: inpUser.u_id,
  }
  conn.query("delete from login where ?", user_id, function (e, results) {
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
  addLogin,
  deleteLogin,
  updateLogin,
}
