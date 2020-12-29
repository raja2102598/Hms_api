var conn = require("../../../../app/db/dbconn")

function addMedStock(input, callback) {
  var viewstocks = dbstockdata(input);
  conn.query("insert into m_stocks SET ?", viewstocks, (err, results) => {
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
        var medicalstocks = uistockdata(stock);
        stocks.push(medicalstocks)
      })
      callback(null, stocks)
    } else {
      conn.end()
    }
  })
}

function updateMedStock(inpData, callback) {
  var upmedistock = uistockdata(inpData); 
  var med_stock_id = {
    med_id: inpData.med_id,
  }
  conn.query(
    "update m_stock SET ? where ?",
    [upmedistock, med_stock_id],
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

function dbstockdata(uistock){
  var dbstock = {}
  dbstock.med_id = uistock.id
  dbstock.med_name = uistock.medicinename
  dbstock.med_description = uistock.description
  dbstock.med_quantity = uistock.quantity
  dbstock.category_id = uistock.category
  dbstock.priceofeach = uistock.price

  return dbstock
}

function uistockdata(stockdata){
  var stockui = {}
  stockui.medicine = stockdata.med_name
  stockui.description = stockdata.med_description
  stockui.quantity = stockdata.med_quantity
  stockui.price = stockdata.priceofeach

  return stockui
}

function particularmedicinedata(inpstock,callback){
  var stocks = [];
  conn.query("select * from m_stocks where category_id=?",inpstock,function(error,results){
    if(error){
      console.log(error);
    }
    else if(results){
      results.forEach((stock)=>{
        var stocksdata = uistockdata(stock);
        stocks.push(stocksdata)
      })
      callback(null,stocks);
    }
    else{
      conn.end();
    }
  })
}


module.exports = {
  addMedStock,
  updateMedStock,
  deleteMedStock,
  getMedStocks,
  particularmedicinedata,
}
