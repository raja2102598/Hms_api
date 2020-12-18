var conn = require("../../../db/dbconn")

var assert = require("assert").strict
var crypto = require("crypto")

var algorithm = "aes-192-cbc" //algorithm to use
var password = "this the the password"
const key = crypto.scryptSync(password, "salt", 24) //create key
const iv = crypto.randomBytes(16) // generate different ciphertext everytime
const cipher = crypto.createCipheriv(algorithm, key, iv)
    


function addLogin(input, callback) {
  var text = input.pwd //text to be encrypted
  var encrypted = cipher.update(text, "utf8", "hex") + cipher.final("hex") // encrypted text
  // console.log(encrypted)

  // const decipher = crypto.createDecipheriv(algorithm, key, iv)
  // var decrypted =
  //   decipher.update(encrypted, "hex", "utf8") + decipher.final("utf8") //deciphered text
  // console.log(decrypted)
  // // try {
  //   assert.strictEqual(decrypted, text)
  // } catch (err) {
  //   console.log(err)
  // }
  input.pwd = encrypted
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
    uid: inUserData.uid,
  }
  if (inUserData.pwd != "") {
    var text = inUserData.pwd //text to be encrypted
    var encrypted = cipher.update(text, "utf8", "hex") + cipher.final("hex") // encrypted text
    inUserData.pwd = encrypted
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
    uid: inpUser.uid,
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
