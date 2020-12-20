var conn = require("../../../../app/db/dbconn")

function addFeedback(input, callback) {
  var viewfeeddata = dbfeeddata(input);
  conn.query("insert into feedback SET ?", viewfeeddata, (err, results) => {
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
        var feed= uifeeddata(feedback)
        feedbacks.push(feed)
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


function dbfeeddata (feedb){
  var feeui={}
  feeui.f_id = feedb.id
  feeui.username = feedb.name
  feeui.comment = feedb.comment
  feeui.created_on = feedb.created_date
  feeui.rating = feedb.ratings

  return feeui
}

function uifeeddata(uifeed){
  var dbfeed = {}
  dbfeed.name = uifeed.username
  dbfeed.comment = uifeed.comment
  dbfeed.ratings = uifeed.ratings

  return dbfeed
}

module.exports = {
  addFeedback,
  getFeedbacks,
  deleteFeedback,
}
