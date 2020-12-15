var express =require("express")

var body_parser=require("body-parser")

var app= express()

var dbconn= require("./db")

app.use(body_parser.json())

//Patient
app.post("/patient",(req,res)=>{
    var user=req.body
    dbconn.addpatient(user,(err,result)=>{
        if(err){
            console.log(err)
        }
        else{
            console.log(result);
            res.send("Data Inserted")
        }        
    })
})

app.get("/patient",(req,res)=>{
    dbconn.getPatients((err,result)=>{
        if(err){
            console.log(err)
        }
        else{
            res.send(result)
        }
    })
})

app.put("/patient",(req,res)=>{
    var userInput = req.body

    dbconn.updatePatient(userInput, function (e, result) {
    if (e) {
      console.log(e)
    } else if (result) {
      res.send("1 Row Updated Successfully")
    }
  })
})

app.delete("/patient", (req, res) => {
    var patient_id = req.body
  
    dbconn.deletePatient(patient_id, function (e, result) {
      if (e) {
        console.log(e)
      } else if (result) {
        res.send("Data Successfully Deleted")
      }
    })
})

//Pharmacy billing
app.post("/phbill",(req,res)=>{
    var bill=req.body
    dbconn.addPhBill(bill,(err,result)=>{
        if(err){
            console.log(err)
        }
        else{
            console.log(result);
            res.send("Data Inserted")
        }        
    })
})

app.get("/phbill", (req, res) => {
  dbconn.getPhBills((err, result) => {
    if (err) {
      console.log(err)
    } else {
      res.send(result)
    }
  })
})

app.put("/phbill", (req, res) => {
  var userInput = req.body

  dbconn.updatePhBill(userInput, function (e, result) {
      if (e) {
        console.log(e)
      } else if (result) {
        res.send("1 Row Updated Successfully")
      }
    })
})

app.delete("/phbill", (req, res) => {
  var b_id = req.body

  dbconn.deletePhBill(b_id, function (e, result) {
    if (e) {
      console.log(e)
    } else if (result) {
      res.send("Data Successfully Deleted")
    }
  })
})


//register user
app.post("/register",(req,res)=>{
  var user=req.body
  dbconn.registerUser(user,(err,result)=>{
      if(err){
          console.log(err)
      }
      else{
          console.log(result);
          res.send("Data Inserted")
      }        
  })
})

app.get("/register", (req, res) => {
dbconn.getUsers((err, result) => {
  if (err) {
    console.log(err)
  } else {
    res.send(result)
  }
})
})

app.put("/register", (req, res) => {
var userInput = req.body

dbconn.updateUser(userInput, function (e, result) {
    if (e) {
      console.log(e)
    } else if (result) {
      res.send("1 Row Updated Successfully")
    }
  })
})

app.delete("/register", (req, res) => {
var p_id = req.body

dbconn.deleteUser(p_id, function (e, result) {
  if (e) {
    console.log(e)
  } else if (result) {
    res.send("Data Successfully Deleted")
  }
})
})

//Staffs
app.post("/staff",(req,res)=>{
  var staff=req.body
  dbconn.addStaff(staff,(err,result)=>{
      if(err){
          console.log(err)
      }
      else{
          console.log(result);
          res.send("Data Inserted")
      }        
  })
})

app.get("/staff", (req, res) => {
dbconn.getStaffs((err, result) => {
  if (err) {
    console.log(err)
  } else {
    res.send(result)
  }
})
})

app.put("/staff", (req, res) => {
var userInput = req.body

dbconn.updateStaff(userInput, function (e, result) {
    if (e) {
      console.log(e)
    } else if (result) {
      res.send("1 Row Updated Successfully")
    }
  })
})

app.delete("/staff", (req, res) => {
var s_id = req.body

dbconn.deleteStaff(s_id, function (e, result) {
  if (e) {
    console.log(e)
  } else if (result) {
    res.send("Data Successfully Deleted")
  }
})
})


app.listen(5000,()=>{
    console.log("Server Started");
})