var express = require("express")
var body_parser = require("body-parser")
var app = express()



var appoint = require("./app/src/Models/appoint/functionAppoint")
var feed = require("./app/src/Models/feedback/functionFeedback")
var login = require("./app/src/Models/login/functionlogin")
var stock = require("./app/src/Models/medStocks/functionstocks")
var patient = require("./app/src/Models/patient/functionpatient")
var bills = require("./app/src/Models/bills/functionbills")
var reg = require("./app/src/Models/register/functionregister")
var staff = require("./app/src/Models/staff/functionstaff")


app.use(body_parser.json())
app.use(body_parser.urlencoded({ extended: true }))

//Appointment
app.post("/appointment", appoint.addApp)

app.get("/appointment", appoint.getApp)

app.put("/appointment", appoint.updateApp)

app.delete("/appointment", appoint.deleteApp)



app.get("/appointment/p/:id/all", appoint.getParticularApp)   //get all appoints for a particular patient

app.get("/appointment/d/:id/all", appoint.getParticularAppDoc)   //get all appoints for a particular doctor

app.put("/appointment/status/:status/:a_id", appoint.cancelParticularApp)   //localhost:5000/appointment/status/(true)/(14)


//Pharmacy billing
app.post("/phbill", bills.addbill)

app.get("/phbill", bills.getbills)

app.put("/phbill", bills.updatebill)

app.delete("/phbill", bills.deletebill)



app.get("/phbill/:id", bills.getBillById)

app.get("/phbill/patient/:id", bills.getPatDetail)  //localhost:5000/phbill/patient/4

app.get("/phbill/total/:date",bills.getTotalAmount)  //localhost:5000/phbill/total/2020-12-20

app.get("/phbill/status/:type", bills.getBillsByStatus)  //localhost:5000/phbill/status/pending


//Feedback
app.post("/feedback", feed.addFeed)

app.get("/feedback", feed.getFeed)

app.delete("/feedback", feed.deleteFeed)



app.get("/feedback/positive", feed.getPositive)

app.get("/feedback/negative", feed.getNegative)


//login
app.post("/login", login.addLoginData)

app.put("/login", login.updateLoginData)

app.delete("/login", login.deleteLoginData)


app.post("/user/login", login.userLogin)


//medical stocks
app.post("/stock", stock.addStock)

app.get("/stock", stock.getStocks)

app.put("/stock", stock.updateStock)

app.delete("/stock", stock.deleteStock)

//Patient
app.post("/patient", patient.addPatientData)

app.get("/patient", patient.getPatientsData)

app.put("/patient", patient.updatePatientData)

app.delete("/patient", patient.deletePatientData)


// app.get("/phbill/patient/City/:cityName")\



//register user
app.post("/register", reg.reguser)

app.get("/register", reg.getusersdata)

app.put("/register", reg.updateuserdata)

app.delete("/register", reg.deleteuserdata)

//Staffs
app.post("/staff", staff.addstaffdata)

app.get("/staff", staff.getstaffdata)

app.put("/staff", staff.updatestaffdata)

app.delete("/staff", staff.deletestaffdata)


app.listen(5000,()=>{
  console.log("Server Started")
})