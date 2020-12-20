var conn = require("../../../../app/db/dbconn")

function addAppoint(input, callback) {
  var viewdata=viewdbdata(input);
  conn.query("insert into appoint_list SET ?", viewdata, (err, results) => {
    if (err) {
      console.log(err)
    } else if (results) {
      callback(null, results)
    } else {
      conn.end()
    }
  })
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

module.exports = {
  addAppoint,
  getAppoints,
  deleteAppointment,
  updateAppoint,
}
