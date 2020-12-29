var conn = require("../../../../app/db/dbconn")

function addStaff(input, callback) {
  var viewstaffdata = dbstaffdata(input);
  conn.query("insert into staffs SET ?", viewstaffdata, (err, results) => {
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
        var staffdata = uistaffdata(staff);
        staffs.push(staffdata)
      })
      callback(null, staffs)
    } else {
      conn.end()
    }
  })
}

function updateStaff(inStaffData, callback) {
  var viewupstaff = uistaffdata(inStaffData);
  var staff = {
    s_id: inStaffData.s_id,
  }
  conn.query(
    "update staffs SET ? where ?",
    [viewupstaff, staff],
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
function dbstaffdata(uistaff){
  var dbstaff = {}
  dbstaff.s_id = uistaff.staff_id
  dbstaff.firstname = uistaff.Firstname
  dbstaff.lastname = uistaff.Lastname
  dbstaff.name = uistaff.Name 
  dbstaff.gender = uistaff.Gender
  dbstaff.dob = uistaff.Dob
  dbstaff.age = uistaff.Age
  dbstaff.email = uistaff.Email
  dbstaff.phone = uistaff.Phone
  dbstaff.w_location = uistaff.Location 
  dbstaff.hire_date = uistaff.Date 
  dbstaff.staff_type = uistaff.Type_of_staff
  dbstaff.s_address = uistaff.Addresss

  return dbstaff
}

function uistaffdata (staffdb){
  var staffui = {}
 staffui.Firstname=staffdb.firstname 
 staffui.Lastname= staffdb.lastname 
 staffui.Name= staffdb.name 
 staffui.Gender= staffdb.gender
 staffui.Age=staffdb.age 
 staffui.staff_type=staffdb.staff_type 
 staffui.Address= staffdb.s_address 

 return staffui 
}

function particularstaffdata(inpstaff, callback) {
  var staffs = []
  conn.query(
    "select * from staffs where staff_type=?",
    inpstaff,
    function (error, result) {
      if (error) {
        console.log(error)
      } else if (result) {
        result.forEach((staff) => {
          var staffdata = uistaffdata(staff)
          staffs.push(staffdata)
        })
        callback(null, staffs)
      } else {
        conn.end()
      }
    }
  )
}

function individualstaffdata(inpstaff, callback) {
  var staffs = []
  conn.query(
    "select * from staffs where s_id=?",
    inpstaff,
    function (error, result) {
      if (error) {
        console.log(error)
      } else if (result) {
        result.forEach((staff) => {
          var staffdata = uistaffdata(staff)
          staffs.push(staffdata)
        })
        callback(null, staffs)
      } else {
        conn.end()
      }
    }
  )
}

module.exports = {
  addStaff,
  updateStaff,
  getStaffs,
  deleteStaff,
  particularstaffdata,
  individualstaffdata,
}
