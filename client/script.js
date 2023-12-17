function register() {
  var refToMyBody = document.getElementById("myBody");
  var refToName = document.getElementById("name");
  var refToAge = document.getElementById("age");
  var refToPhoneNumber = document.getElementById("pno");
  var refToEmail = document.getElementById("email");

  if (
    refToName.value === "" ||
    refToAge.value === "" ||
    refToPhoneNumber.value === "" ||
    refToEmail.value === ""
  ) {
    setMessage("All the fields are required !");
    return;
  }

  if (isNaN(refToAge.value) || parseFloat(refToAge.value) <= 0) {
    setMessage("Please enter a valid age !");
    return;
  }

  if (isNaN(refToPhoneNumber.value) || refToPhoneNumber.value.length != 10) {
    setMessage("Please enter a valid Phone Number !");
    return;
  }

  var emailPattern = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
  if (!emailPattern.test(refToEmail.value)) {
    setMessage("Please enter a valid Email address !");
    return;
  }

  var emp = {
    Name: refToName.value,
    Age: refToAge.value,
    Number: refToPhoneNumber.value,
    Email: refToEmail.value,
  };

  // refToMyBody.innerHTML =
  //   refToMyBody.innerHTML +
  //   `<tr>
  //   <td><input class="form-check-input" type="checkbox" ></td>
  //   <td>${refToName.value}</td>
  //   <td>${refToAge.value}</td>
  //   <td>${refToPhoneNumber.value}</td>
  //   <td>${refToEmail.value}</td>
  //   <td><button class="btn btn-outline-primary btn-sm" onclick="editRow(this)">Edit</button></td>
  //   </tr>`;

  var helper = new XMLHttpRequest();
  helper.onreadystatechange = () => {
    if (helper.readyState == 4 && helper.status == 200) {
      var response = JSON.parse(helper.responseText);
      if (response.affectedRows != undefined && response.affectedRows > 0) {
        setMessage("Data added successfully!");
        getData();
      } else {
        setMessage("Something went wrong!");
      }
    }
  };
  helper.open("POST", url);

  helper.setRequestHeader("Content-Type", "application/json");
  helper.send(JSON.stringify(emp));

  // document.getElementById("alert").innerText = "Data added successfully!";
  refToName.value = "";
  refToAge.value = "";
  refToPhoneNumber.value = "";
  refToEmail.value = "";
}

function del() {
  // debugger;
  var myBody = document.getElementById("myBody");
  var rows = myBody.rows.length;
  // console.log(rows);
  // console.log(myBody.rows[0].cells[0].children[0].checked)
  // debugger;
  // var refToEmail = document.getElementById("email").value;

  if (rows > 0) {
    for (var i = rows - 1; i >= 0; i--) {
      var isChecked = myBody.rows[i].cells[0].children[0].checked;
      if (isChecked) {
        // var refToEmail = myBody.rows[i].cells[4].textContent;
        var refToId = employeeIds[i];
        var helper = new XMLHttpRequest();
        helper.onreadystatechange = () => {
          if (helper.readyState == 4 && helper.status == 200) {
            var response = JSON.parse(helper.responseText);
            if (
              response.affectedRows != undefined &&
              response.affectedRows > 0
            ) {
              setMessage("Data deleted successfully!");
              getData();
            } else {
              setMessage("Something Went Wrong!");
            }
          }
        };
        helper.open("DELETE", url + "/" + refToId);
        helper.send();
        // myBody.deleteRow(i);
        setMessage("Data deleted successfully!");
        return;
      } else {
        setMessage("select atleast one row to delete !");
      }
    }
  } else {
    setMessage("No rows to delete !");
  }
}

let editedRow = null;

function editRow(button) {
  editedRow = button.closest("tr");
  // editedRow = myBody.rows[index];

  const cells = editedRow.cells;
  // console.log(cells[1].innerText);
  // console.log(cells[1].textContent);
  document.getElementById("name").value = cells[1].textContent;
  document.getElementById("age").value = cells[2].textContent;
  document.getElementById("pno").value = cells[3].textContent;
  document.getElementById("email").value = cells[4].textContent;

  document.getElementById("register").disabled = true;
  document.getElementById("delete").disabled = true;
}

function blockNumbers(event) {
  var keyPressed = event.key;

  if (!/^[a-zA-Z\s-,'.]+$/.test(keyPressed)) {
    event.preventDefault();
    setMessage("Numbers are not allowed !  ");
  } else {
    document.getElementById("alert").innerText = "";
  }
}

function update() {
  if (editedRow === null) {
    setMessage("Select atleast one row to update !");
    return;
  }

  var refToName = document.getElementById("name");
  var refToAge = document.getElementById("age");
  var refToPhoneNumber = document.getElementById("pno");
  var refToEmail = document.getElementById("email");
  
  var refToId = employeeIds[editedRow.rowIndex - 1]; // Adjust index since rowIndex is 1-based


  if (
    refToName.value === "" ||
    refToAge.value === "" ||
    refToPhoneNumber.value === "" ||
    refToEmail.value === ""
  ) {
    setMessage("All fields are required!");
    return;
  }

  if (isNaN(refToAge.value) || parseFloat(refToAge.value) <= 0) {
    setMessage("Please enter a valid age!");
    return;
  }

  if (isNaN(refToPhoneNumber.value) || refToPhoneNumber.value.length != 10) {
    setMessage("Please enter a valid Phone Number!");
    return;
  }

  var emailPattern = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
  if (!emailPattern.test(refToEmail.value)) {
    setMessage("Please enter a valid Email address!");
    return;
  }

  var emp = {
    Name: refToName.value,
    Age: refToAge.value,
    Number: refToPhoneNumber.value,
    Email: refToEmail.value,
  };

  // console.log(editedRow.cells[1].innerText);
  // console.log(editedRow.cells[1].textContent);

  var helper = new XMLHttpRequest();
  helper.onreadystatechange = () => {
    if (helper.readyState == 4 && helper.status == 200) {
      var response = JSON.parse(helper.responseText);
      if (response.affectedRows != undefined && response.affectedRows > 0) {
        setMessage("Data updated successfully!");
        getData();
      } else {
        setMessage("Something went wrong!");
      }
    }
  };
  helper.open("PUT", url + "/" + refToId);

  helper.setRequestHeader("Content-Type", "application/json");
  helper.send(JSON.stringify(emp));

  // editedRow.cells[1].textContent = refToName.value;
  // editedRow.cells[2].textContent = refToAge.value;
  // editedRow.cells[3].textContent = refToPhoneNumber.value;
  // editedRow.cells[4].textContent = refToEmail.value;

  setMessage("Data updated successfully!");
  refToName.value = "";
  refToAge.value = "";
  refToPhoneNumber.value = "";
  refToEmail.value = "";
  editedRow = null;

  document.getElementById("register").disabled = false;
  document.getElementById("delete").disabled = false;
}

// ----------------------------------database integration-----------------

var latestEmpsData = [];
var employeeIds = []; 
var url = "http://127.0.0.1:3000/emps";

function getData() {
  // debugger;
  var helper = new XMLHttpRequest();
  helper.onreadystatechange = () => {
    if ((helper.readyState == 4) & (helper.status == 200)) {
      var emps = JSON.parse(helper.responseText);

      latestEmpsData = emps;
      employeeIds = []; 


      var refToTBody = document.getElementById("myBody");
      refToTBody.innerHTML = "";

      for (i = 0; i < emps.length; i++) {
        employeeIds.push(emps[i].id); // Store the employee ID
        var row = `<tr>
                          <td><input class="form-check-input" type="checkbox" ></td>
                          <td>${emps[i].name}</td>
                          <td>${emps[i].age}</td>
                          <td>${emps[i].no}</td>
                          <td>${emps[i].email}</td>
                          <td><button class="btn btn-outline-primary btn-sm" onclick="editRow(this)">Edit</button></td>
                        </tr>`;
        refToTBody.innerHTML = refToTBody.innerHTML + row;
      }
    }
  };
  helper.open("GET", url);
  helper.send();
}

function setMessage(message) {
  var refTodivMessage = document.getElementById("alert");
  refTodivMessage.innerHTML = `    
        <div class="text-success text-center mt-3 p-1 alert alert-success">${message}</div>`;
  // refTodivMessage.innerText = message;
  setTimeout(() => {
    refTodivMessage.innerText = "";
  }, 3000);
}
