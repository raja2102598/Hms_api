var conn = require("../../../db/dbconn")

var assert = require("assert").strict
var crypto = require("crypto")
var auth = require("../../Helpers/crypto")

// var algorithm = "aes-192-cbc" //algorithm to use
// var password = "this the the password"
// const key = crypto.scryptSync(password, "salt", 24) //create key
// const iv = crypto.randomBytes(16) // generate different ciphertext everytime


function addLogin(input, callback) {
  // const cipher = crypto.createCipheriv(algorithm, key, iv)
  var viewlog = dblogdata(input)
  var text = viewlog.pwd //text to be encrypted
  // var encrypted = cipher.update(text, "utf8", "hex") + cipher.final("hex")
  var encrypted  =  auth.encrypt(text)
  viewlog.pwd=encrypted.content
  viewlog.iv=encrypted.iv
  console.log(encrypted);
  conn.query("insert into login SET ?",viewlog, (err, results) => {
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
  
// const cipher = crypto.createCipheriv(algorithm, key, iv)
var viewlogin = dblogdata(inUserData)
  var user_id = {
    uid: inUserData.Userid,
  }
  if (viewlogin.pwd != "") {
    var text = viewlogin.pwd //text to be encrypted
    // var encrypted = cipher.update(text, "utf8", "hex") + cipher.final("hex") // encrypted text
    var encrypted  =  auth.encrypt(text)
    viewlogin.pwd=encrypted.content
    viewlogin.iv=encrypted.iv
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

function userLoginDb(input, callback) {
  // const decipher = crypto.createDecipheriv(algorithm, key, iv)
  // decipher.setAutoPadding(false)
  console.log(input);
  conn.query(
    "Select pwd,iv from login where email=? ",
    input.email,
    function (err, res) {
      if (err) {
        console.log(err)
      } else if (res) {
        // var pwdEnc = {}
        // console.log(res);
        // console.log(res);
        var pwd={}
        pwd.iv=JSON.stringify(res[0].iv)
        pwd.iv=pwd.iv.replace(/^"(.*)"$/, "$1")
        pwd.content=JSON.stringify(res[0].pwd)
        pwd.content=pwd.content.replace(/^"(.*)"$/, "$1")
        // console.log(pwd);
        var decrypted=auth.decrypt(pwd)
        try{
          assert.strictEqual(input.pwd,decrypted)
          callback(null,"Login success")
        }
        catch{
          callback(null,"Username/Password is wrong")
        }
        // console.log(text);
        // console.log(text);
        // pwdEnc.pass = JSON.stringify(res[0].pwd)
        // console.log(pwdEnc.pass)
        //  str = pwdEnc.pass.replace(/^"(.*)"$/, "$1")
        // console.log(str)
        // if (pwdEnc.length > 0) {
        // pwdEnc = "test"
        // var decrypted =
        // decipher.update(str, "hex", "utf8") + decipher.final("utf8")
        // console.log(decrypted.toString())
        // }
      }
    }
  )
}

module.exports = {
  addLogin,
  deleteLogin,
  updateLogin,
  userLoginDb,
}
