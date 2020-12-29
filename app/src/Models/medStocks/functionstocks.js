var dbconn = require("./dbstocks")

function addStock(req, res) {
  var stock = req.body
  dbconn.addMedStock(stock, (err, result) => {
    if (err) {
      console.log(err)
    } else {
      console.log(result)
      res.send("Data Inserted")
    }
  })
}

function getStocks(req, res) {
  dbconn.getMedStocks((err, result) => {
    if (err) {
      console.log(err)
    } else {
      res.send(result)
    }
  })
}

function updateStock(req, res) {
  var userInput = req.body

  dbconn.updateMedStock(userInput, function (e, result) {
    if (e) {
      console.log(e)
    } else if (result) {
      res.send("1 Row Updated Successfully")
    }
  })
}

function deleteStock(req, res) {
  var med_id = req.body

  dbconn.deleteMedStock(med_id, function (e, result) {
    if (e) {
      console.log(e)
    } else if (result) {
      res.send("Data Successfully Deleted")
    }
  })
}

function getParticularmedicine(req,res){
  var category=req.params.category
  dbconn.particularmedicinedata(category,function(err,result){
    if(err){
      console,log(err);
    }
    else{
      res.send(result);
    }
  })
}

module.exports = {
  addStock,
  getStocks,
  updateStock,
  deleteStock,
  getParticularmedicine,
}
