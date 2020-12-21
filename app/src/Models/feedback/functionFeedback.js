var dbconn = require("./dbFeedback")

function addFeed(req, res) {
  var user = req.body
  dbconn.addFeedback(user, (err, result) => {
    if (err) {
      console.log(err)
    } else {
      console.log(result)
      res.send("Data Inserted")
    }
  })
}

function getFeed(req, res) {
  dbconn.getFeedbacks((err, result) => {
    if (err) {
      console.log(err)
    } else {
      res.send(result)
    }
  })
}

function deleteFeed(req, res) {
  var f_id = req.body

  dbconn.deleteFeedback(f_id, function (e, result) {
    if (e) {
      console.log(e)
    } else if (result) {
      res.send("Data Successfully Deleted")
    }
  })
}


function getPositive(req, res) {
  dbconn.getPosFeed((err, result) => {
    if (err) {
      console.log(err)
    } else {
      res.send(result)
    }
  })
}

function getNegative(req, res) {
  dbconn.getNegFeed((err, result) => {
    if (err) {
      console.log(err)
    } else {
      res.send(result)
    }
  })
}

module.exports = {
  addFeed,
  deleteFeed,
  getFeed,
  getPositive,
  getNegative,
}
