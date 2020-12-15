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
    var user=req.body
    dbconn.addphbill(user,(err,result)=>{
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


app.listen(5000,()=>{
    console.log("Server Started");
})