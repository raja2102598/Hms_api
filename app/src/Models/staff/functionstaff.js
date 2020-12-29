var dbconn = require("./dbstaff")

function getstaffdata(req, res) {
  dbconn.getStaffs((err, result) => {
    if (err) {
      console.log(err)
    } else {
      res.send(result)
    }
  })
}

function addstaffdata(req, res) {
  var staff = req.body
  dbconn.addStaff(staff, (err, result) => {
    if (err) {
      console.log(err)
    } else {
      console.log(result)
      res.send("Data Inserted")
    }
  })
}

function updatestaffdata(req, res) {
  var userInput = req.body

  dbconn.updateStaff(userInput, function (e, result) {
    if (e) {
      console.log(e)
    } else if (result) {
      res.send("1 Row Updated Successfully")
    }
  })
}

function deletestaffdata(req, res) {
  var s_id = req.body

  dbconn.deleteStaff(s_id, function (e, result) {
    if (e) {
      console.log(e)
    } else if (result) {
      res.send("Data Successfully Deleted")
    }
  })
}

//select particular staff

function getParticularstaff(req,res){
  var type=req.params.type
  dbconn.particularstaffdata(type,function(err,result){
    if(err){
      console,log(err);
    }
    else{
      res.send(result);
    }
  })
}

function getindividualstaff(req,res){
  var id=req.params.id
  dbconn.individualstaffdata(id,function(err,result){
    if(err){
      console,log(err);
    }
    else{
      res.send(result);
    }
  })
}

module.exports = {
  addstaffdata,
  updatestaffdata,
  deletestaffdata,
  getstaffdata,
  getParticularstaff,
  getindividualstaff,
}
