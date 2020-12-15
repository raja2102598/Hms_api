var mysql=require("mysql")


var conn=mysql.createConnection({
    host: "localhost",
    user:"root",
    password:"",
    database:"hospital_management"
})

conn.connect((err,dbconn)=>{
    if(err){
        console.log(err);
    }
    else if(dbconn){
        console.log("Database Connected Sucessfully");
    }
})


//patient

function addpatient(input,callback){

    conn.query("insert into patient_list SET ?",input,(err,results)=>{
        if(err){
            console.log(err);
        }
        else if(results){
            callback(null,results)
        }
        else{
            conn.end()
        }
    })
}

function getPatients(callback){
    var patients=[]
    conn.query("select * from patient_list",(err,results)=>{
        if (err) {
            console.log(err);
        }
        else if(results){
            results.forEach(patient => {
                patients.push(patient)
            });
            callback(null,patients)
        }
        else{
            conn.end()
        }
    })
}

function updatePatient(inUserData, callback) {
    var user={
      p_id : inUserData.p_id
    }
    conn.query("update patient_list SET ? where ?",[inUserData,user], function (e, results) {
      if (e) {
        console.log(e)
      } else if (results) {
        callback(null, results)
      } else {
        conn.end()
      }
    })
  }
  
function deletePatient(inpUser, callback) {
    var patient={
      p_id : inpUser.patient_id
    }
    conn.query("delete from patient_list where ?", patient, function (e, results) {
      if (e) {
        console.log(e)
      } else if (results) {
        callback(null, results)
      } else {
        conn.end()
      }
    })
  }

//phbilling

function addPhBill(input,callback){

  conn.query("insert into ph_billing SET ?",input,(err,results)=>{
      if(err){
          console.log(err);
      }
      else if(results){
          callback(null,results)
      }
      else{
          conn.end()
      }
  })
}

function getPhBills(callback){
  var bills=[]
  conn.query("select * from ph_billing",(err,results)=>{
      if (err) {
          console.log(err);
      }
      else if(results){
          results.forEach(bill => {
              bills.push(bill)
          });
          callback(null,bills)
      }
      else{
          conn.end()
      }
  })
}

function updatePhBill(inUserData, callback) {
  var user={
    b_id : inUserData.b_id
  }
  conn.query("update ph_billing SET ? where ?",[inUserData,user], function (e, results) {
    if (e) {
      console.log(e)
    } else if (results) {
      callback(null, results)
    } else {
      conn.end()
    }
  })
}

function deletePhBill(inpBill, callback) {
  var bill_id = {
    b_id: inpBill.b_id,
  }
  conn.query("delete from ph_billing where ?", bill_id, function (e, results) {
    if (e) {
      console.log(e)
    } else if (results) {
      callback(null, results)
    } else {
      conn.end()
    }
  })
}

//Register User

function registerUser(input, callback) {
  conn.query("insert into register_user SET ?", input, (err, results) => {
    if (err) {
      console.log(err)
    } else if (results) {
      callback(null, results)
    } else {
      conn.end()
    }
  })
}

function getUsers(callback) {
  var users = []
  conn.query("select * from register_user", (err, results) => {
    if (err) {
      console.log(err)
    } else if (results) {
      results.forEach((user) => {
        users.push(user)
      })
      callback(null, users)
    } else {
      conn.end()
    }
  })
}

function updateUser(inUserData, callback) {
  var user = {
    p_id: inUserData.p_id,
  }
  conn.query(
    "update register_user SET ? where ?",
    [inUserData, user],
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

function deleteUser(inp, callback) {
  var user_id = {
    p_id: inp.p_id,
  }
  conn.query(
    "delete from register_user where ?",
    user_id,
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

//Staffs

function addStaff(input, callback) {
  conn.query("insert into staffs SET ?", input, (err, results) => {
    if (err) {
      console.log(err)
    } else if (results) {
      callback(null, results)
    } else {
      conn.end()
    }
  })
}

function getStaffs(callback) {
  var staffs = []
  conn.query("select * from staffs", (err, results) => {
    if (err) {
      console.log(err)
    } else if (results) {
      results.forEach((staff) => {
        staffs.push(staff)
      })
      callback(null, staffs)
    } else {
      conn.end()
    }
  })
}

function updateStaff(inStaffData, callback) {
  var staff = {
    s_id: inStaffData.s_id,
  }
  conn.query(
    "update staffs SET ? where ?",
    [inStaffData, staff],
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

function deleteStaff(inp, callback) {
  var staff_id = {
    s_id: inp.s_id,
  }
  conn.query("delete from staffs where ?", staff_id, function (e, results) {
    if (e) {
      console.log(e)
    } else if (results) {
      callback(null, results)
    } else {
      conn.end()
    }
  })
}


module.exports = {
  addpatient: addpatient,
  getPatients: getPatients,
  updatePatient: updatePatient,
  deletePatient: deletePatient,
  addPhBill: addPhBill,
  getPhBills: getPhBills,
  updatePhBill: updatePhBill,
  deletePhBill: deletePhBill,
  registerUser: registerUser,
  getUsers: getUsers,
  updateUser: updateUser,
  deleteUser: deleteUser,
  addStaff: addStaff,
  getStaffs: getStaffs,
  updateStaff: updateStaff,
  deleteStaff: deleteStaff,
}