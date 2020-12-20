var conn = require("../../../db/dbconn")

var assert = require("assert").strict
var crypto = require("crypto")

var algorithm = "aes-192-cbc" //algorithm to use
var password = "this the the password"
const key = crypto.scryptSync(password, "salt", 24) //create key
const iv = crypto.randomBytes(16) // generate different ciphertext everytime
    

function addLogin(input, callback) {
  const cipher = crypto.createCipheriv(algorithm, key, iv)
  var viewlog = dblogdata(input)
  var text = viewlog.pwd //text to be encrypted
  var encrypted = cipher.update(text, "utf8", "hex") + cipher.final("hex")
  viewlog.pwd = encrypted
  conn.query("insert into login SET ?", viewlog, (err, results) => {
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
  
const cipher = crypto.createCipheriv(algorithm, key, iv)
var viewlogin = dblogdata(inUserData)
  var user_id = {
    uid: inUserData.Userid,
  }
  if (viewlogin.pwd != "") {
    var text = viewlogin.pwd //text to be encrypted
    var encrypted = cipher.update(text, "utf8", "hex") + cipher.final("hex") // encrypted text
    viewlogin.pwd = encrypted
  }
  conn.query(
    "update login SET ? where ?",
    [viewlogin, user_id],
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

function dblogdata(dblog) {
  var uilog = {}
  uilog.uid = dblog.Userid
  uilog.email = dblog.Email
  uilog.pwd = dblog.Password

  return uilog
}

module.exports = {
  addLogin,
  deleteLogin,
  updateLogin,
}
