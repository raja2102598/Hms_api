var conn = require("../../../../app/db/dbconn")

function addMedStock(input, callback) {
  conn.query("insert into m_stocks SET ?", input, (err, results) => {
    if (err) {
      console.log(err)
    } else if (results) {
      callback(null, results)
    } else {
      conn.end()
    }
  })
}

function getMedStocks(callback) {
  var stocks = []
  conn.query("select * from m_stocks", (err, results) => {
    if (err) {
      console.log(err)
    } else if (results) {
      results.forEach((stock) => {
        stocks.push(stock)
      })
      callback(null, stocks)
    } else {
      conn.end()
    }
  })
}

function updateMedStock(inpData, callback) {
  var med_stock_id = {
    med_id: inpData.med_id,
  }
  conn.query(
    "update m_stock SET ? where ?",
    [inpData, med_stock_id],
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

function deleteMedStock(inpData, callback) {
  var med_stock_id = {
    med_id: inpData.med_id,
  }
  conn.query(
    "delete from m_stocks where ?",
    med_stock_id,
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
  addMedStock,
  updateMedStock,
  deleteMedStock,
  getMedStocks,
}
