var conn = require("../../../../app/db/dbconn")

function addFeedback(input, callback) {
  conn.query("insert into feedback SET ?", input, (err, results) => {
    if (err) {
      console.log(err)
    } else if (results) {
      callback(null, results)
    } else {
      conn.end()
    }
  })
}

function getFeedbacks(callback) {
  var feedbacks = []
  conn.query("select * from feedback", (err, results) => {
    if (err) {
      console.log(err)
    } else if (results) {
      results.forEach((feedback) => {
        feedbacks.push(feedback)
      })
      callback(null, feedbacks)
    } else {
      conn.end()
    }
  })
}

function deleteFeedback(inpUser, callback) {
  var feedback_id = {
    f_id: inpUser.f_id,
  }
  conn.query(
    "delete from feedback where ?",
    feedback_id,
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
  addFeedback,
  getFeedbacks,
  deleteFeedback,
}
