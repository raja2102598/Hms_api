var conn = require("../../../../app/db/dbconn")

function registerUser(input, callback) {
  conn.query("insert into register_user SET ?", input, (err, results) => {
    if (err) {
      console.log(err)
    } else if (results) {
      callback(null, results)
    } else {
      conn.end()
    }
  })
}

function getUsers(callback) {
  var users = []
  conn.query("select * from register_user", (err, results) => {
    if (err) {
      console.log(err)
    } else if (results) {
      results.forEach((user) => {
        users.push(user)
      })
      callback(null, users)
    } else {
      conn.end()
    }
  })
}

function updateUser(inUserData, callback) {
  var user = {
    p_id: inUserData.p_id,
  }
  conn.query(
    "update register_user SET ? where ?",
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

function deleteUser(inp, callback) {
  var user_id = {
    p_id: inp.p_id,
  }
  conn.query(
    "delete from register_user where ?",
    user_id,
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
  registerUser,
  getUsers,
  updateUser,
  deleteUser,
}
