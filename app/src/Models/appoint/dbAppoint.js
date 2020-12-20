var conn = require("../../../../app/db/dbconn")
var moment=require("moment")


function addAppoint(input, callback) {
  var viewdata=viewdbdata(input);
  viewdata.created_on = moment(Date.now()).format('YYYY-MM-DD HH:mm:ss');
   conn.query(
    "insert into appoint_list SET ?",
    viewdata,
    (err, results) => {
      if (err) {
        console.log(err)
      } else if (results) {
        callback(null, results)
      } else {
        conn.end()
      }
    }
  )
}

function getAppoints(callback) {
  var appointments = []
  conn.query("select * from appoint_list", (err, results) => {
    if (err) {
      console.log(err)
    } else if (results) {
      results.forEach((appoint) => {
        var appoints = viewuidata(appoint)
        appointments.push(appoints)
      })
      callback(null, appointments)
    } else {
      conn.end()
    }
  })
}

function updateAppoint(inUserData, callback) {
  var viewdata=viewuidata(inUserData);
  var a_id = {
    appoint_id: inUserData.appoint_id,
  }
  viewdata.modified_date=moment(Date.now()).format('YYYY-MM-DD HH:mm:ss');
  conn.query(
    "update appoint_list SET ? where ?",
    [viewdata, a_id],
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

function deleteAppointment(inpUser, callback) {
  var appoint = {
    appoint_id: inpUser.appoint_id,
  }
  conn.query(
    "delete from patient_list where ?",
    appoint,
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

function viewdbdata(dbresults){
  var uidata= {}

  uidata.appoint_id =dbresults.appointment_id 
  uidata.patient_id = dbresults.patient_id
  uidata.a_type = dbresults. appoint_type
  uidata.a_doctorid = dbresults.appoint_doctorid
  uidata.a_doctorname= dbresults.appoint_doctorname 
  uidata.a_date = dbresults.appoint_date
  uidata.a_status= dbresults.appoint_status
  uidata.created_on = dbresults.appoint_created_date
  uidata.modified_on= dbresults.appoint_modified_date

  return uidata
}

function viewuidata(uiresult){
  var dbdata = {}
 dbdata. appointment_id= uiresult. appoint_id
 dbdata.patient_id = uiresult.patient_id 
 dbdata.type= uiresult. a_type
 dbdata.doctor_id =  uiresult. a_doctorid
 dbdata.doctorname= uiresult. a_doctorname 
 dbdata.date = uiresult. a_date
 dbdata.status = uiresult. a_status 
 dbdata.created_date =  uiresult.created_on  
 dbdata.modified_date = uiresult. modified_on

 return dbdata
}


//select all appointments for a particular patient
function getAppointsForEach(inPatient,callback) {
  var appointments = []
  conn.query("select * from appoint_list where patient_id=?",inPatient, (err, results) => {
    if (err) {
      console.log(err)
    } else if (results) {
      results.forEach((appoint) => {
        var appoints = viewuidata(appoint)
        appointments.push(appoints)
      })
      callback(null, appointments)
    } else {
      conn.end()
    }
  })
}

//cancel a appointment for a particular patient with appoint id

function cancelAppoint(inUserData, callback) {
  modified_date=moment(Date.now()).format('YYYY-MM-DD HH:mm:ss');
  conn.query(
    "update appoint_list SET a_status=?,modified_on=? where appoint_id=?",
    [inUserData.status,modified_date,inUserData.id],
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
  addAppoint,
  getAppoints,
  deleteAppointment,
  updateAppoint,
  getAppointsForEach,
  cancelAppoint
}
