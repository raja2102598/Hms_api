var conn = require("../../../../app/db/dbconn")

function registerUser(input, callback) {
  var viewregister = dbregdata(input);
  conn.query("insert into register_user SET ?", viewregister, (err, results) => {
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
        var viewuireg= uiregdata(user)
        users.push(viewuireg)
      })
      callback(null, users)
    } else {
      conn.end()
    }
  })
}

function updateUser(inUserData, callback) {
  var upregister = uiregdata(inUserData)
  var user = {
    p_id: inUserData.p_id,
  }
  conn.query(
    "update register_user SET ? where ?",
    [upregister, user],
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
function dbregdata(uireg){
  var dbreg = {}

  dbreg.p_id = uireg.Patient_id
  dbreg.name = uireg.Name
  dbreg.age = uireg.Age
  dbreg.gender = uireg.Gender
  dbreg.address = uireg.Address
  dbreg.phone = uireg.Phone
  dbreg.email = uireg.Email
  dbreg.bloodgroup= uireg.Bloodgroup
  dbreg.created_on = uireg.created_date
  dbreg.modified_on = uireg.modified_date

  return dbreg
}

function uiregdata (regdb){
  var regui = {}
  regui.Name = regdb.name
  regui.age = regdb.age
  regui.Gender = regdb.gender
  regui.Bloodgroup = regdb.bloodgroup
  regui.Address = regdb.address
  regui.Phone = regdb.phone

  return regui
}


module.exports = {
  registerUser,
  getUsers,
  updateUser,
  deleteUser,
}
