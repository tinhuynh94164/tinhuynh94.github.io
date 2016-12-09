/*add event handler to elements

*/
function form_event_assign() {
	document.getElementById("ajax_sub").onclick = submit_func;
	document.getElementById("ajax_ref").onclick = refresh_func;
}

/*check input values, then
send the username to server
using AJAX

*/
function submit_func() {
	if (check_value()) {
		var name = document.getElementById("user_name").value;

		var xhttp = new XMLHttpRequest(); //create XMLHttpRequest object

		xhttp.onreadystatechange = function() { //run when receive response from server
			if (xhttp.readyState == 4 && xhttp.status == 200) {
				if (xhttp.responseText == "true") {
					document.getElementById("name_notify").innerHTML = "This name's already existed!";
				} else {
					document.getElementById("name_notify").innerHTML = "Congrat! Your account was created";
				}
			}
		}

		xhttp.open("GET", "http://tinhuynh.freevnn.com/check_db/check.php?name=" + name, true);
		xhttp.send();
	}
}

/*check input value base on requirement

*/
function check_value() {
	var bool = false;

	bool = check_username();

	bool &= check_password();

	bool &= check_email();

	bool &= check_birthday();

	return bool;
}

function check_username() {
	var name = document.getElementById("user_name");

	if (name.value.length < 8) {
		document.getElementById("name_notify").innerHTML = "Username length min 8 letter";
		return false;
	} else {
		document.getElementById("name_notify").innerHTML = "";
		return true;
	}
}

function check_password() {
	var pass = document.getElementById("user_password");

	if (pass.value.length < 8) {
		document.getElementById("pass_notify").innerHTML = "Password length min 8 letter";
		return false;
	} else {
		document.getElementById("pass_notify").innerHTML = "";
		return true;
	}
}

function check_email() {
	var em = document.getElementById("user_email").value;
	var emailReg = /[-\w.]+@([A-z0-9][-A-z0-9]+\.)+[A-z]{2,4}/;

	if (em.search(emailReg) >= 0) {
		document.getElementById("email_notify").innerHTML = "";
		return true;
	} else {
		document.getElementById("email_notify").innerHTML = "Email wrong format";
		return false;
	}
}

function check_birthday() {
	var bir = document.getElementById("date");

	if (bir.value.length > 0) {
		document.getElementById("birth_notify").innerHTML = "";
		return true;
	} else {
		document.getElementById("birth_notify").innerHTML = "Please choose your birthday";
		return false;
	}
}

/*clear the inputs

*/
function refresh_func() {
	document.getElementById("user_name").value = "";
	document.getElementById("user_password").value = "";
	document.getElementById("user_email").value = "";
	document.getElementById("date").value = "";

	document.getElementById("name_notify").innerHTML = "";
	document.getElementById("pass_notify").innerHTML = "";
	document.getElementById("email_notify").innerHTML = "";
	document.getElementById("birth_notify").innerHTML = "";
}