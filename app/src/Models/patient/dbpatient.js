var conn = require("../../../../app/db/dbconn")

//patient

function addpatient(input, callback) {
  var viewpatient = dbpatientdata(input);
  conn.query("insert into patient_list SET ?", viewpatient, (err, results) => {
    if (err) {
      console.log(err)
    } else if (results) {
      callback(null, results)
    } else {
      conn.end()
    }
  })
}

function getPatients(callback) {
  var patients = []
  conn.query("select * from patient_list", (err, results) => {
    if (err) {
      console.log(err)
    } else if (results) {
      results.forEach((patient) => {
        var patientdata = uipatientdata(patient);
        patients.push(patientdata)
      })
      callback(null, patients)
    } else {
      conn.end()
    }
  })
}

function updatePatient(inUserData, callback) {
  var patientupdate = uipatientdata(inUserData);
  var user = {
    p_id: inUserData.p_id,
  }
  conn.query(
    "update patient_list SET ? where ?",
    [patientupdate, user],
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

function deletePatient(inpUser, callback) {
  var patient = {
    p_id: inpUser.patient_id,
  }
  conn.query(
    "delete from patient_list where ?",
    patient,
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

function dbpatientdata(uipatient){
  var dbpatient = {}
  dbpatient.p_id = uipatient.patient_id
  dbpatient.p_name = uipatient.patient_name
  dbpatient.p_age = uipatient.patient_age
  dbpatient.p_height = uipatient.height
  dbpatient.p_weight = uipatient.weight
  dbpatient.p_gender = uipatient.gender
  dbpatient.bloodgroup = uipatient.bloodgroup
  dbpatient.p_address = uipatient.address
  dbpatient.p_phone = uipatient.phone
  dbpatient.created_on = uipatient.created_date
  dbpatient.modifed_on = uipatient.modified_date

  return dbpatient
}

function uipatientdata(patientdb){
  var patientui = {}
  patientui.name = patientdb.p_name
  patientui.age = patientdb.p_age
  patientui.height = patientdb.p_height
  patientui.weight = patientdb.p_weight
  patientui.gender = patientdb.p_gender
  patientui.bloodgroup = patientdb.bloodgroup
  patientui.address = patientdb.address
  patientui.phone = patientdb.p_phone

  return patientui
}

function particularpatientdata(inppatient,callback){
  var patients = [];
  conn.query("select * from patient_list where p_id=?",inppatient,function(error,result){
    if(error){
      console.log(error);
    }
    else if(result){
      result.forEach((patient)=>{
        var patientdata = uipatientdata(patient);
        patients.push(patientdata)
      })
      callback(null,patients);
    }
    else{
      conn.end();
    }
  })
}

module.exports = {
  addpatient,
  updatePatient,
  getPatients,
  deletePatient,
  particularpatientdata,
}
