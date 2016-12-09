window.onload = init;

function init() {
	event_assign();

	createYearList();
}

/*add event handler to elements

*/
function event_assign() {
	document.getElementById("calendar_img").onclick = function() { show_calendar(); };

	document.getElementById("pre_year").onclick = toPreYear;
	document.getElementById("pre_month").onclick = toPreMonth;
	document.getElementById("next_year").onclick = toNextYear;
	document.getElementById("next_month").onclick = toNextMonth;

	document.getElementById("month_select").onchange = change_calendar;
	document.getElementById("year_select").onchange = change_calendar;
}

/*change display to 'block'

*/
function show_calendar() {
	var cal = document.getElementById("calendar");

    	if (cal.style.display != "block") {
		var today = new Date();
		var month = document.getElementById("month_select");
		var year = document.getElementById("year_select");

		month.selectedIndex = today.getMonth();
		year.selectedIndex = today.getFullYear() - 1990;

		change_calendar();

		cal.style.display = "block";
    	}
}

/*change display to 'none'

*/
function hide_calendar() {
	var cal = document.getElementById("calendar");

	cal.style.display = "none";
}

/*change calendar's content based on new month, year

*/
function change_calendar() {
	var x     = document.getElementById("month_select");
	var y     = document.getElementById("year_select");
	var month = x.selectedIndex;
	var year  = y.selectedIndex + 1990;

	var date = new Date(year, month);
	var tmp =  new Date(year, month + 1, 0);
	var d = new Date();

	var x = tmp.getDate() - (7 - date.getDay());
	x = x/7;
	var row = Math.ceil(x) + 1; // the row of the calendar

	clear_table();
	create_table(row, 7);

	var r = 3;
	var c = date.getDay() + 1;
	for (var g = 0; g < tmp.getDate(); g++) {
		//refer to <td> which is created in create_table
		var tb_cell_tmp = 
		document.querySelectorAll("#calendar_tb > tbody > tr:nth-of-type(" + r + ") > td:nth-of-type(" + c + ")");
		tb_cell_tmp[0].childNodes[0].nodeValue = g + 1;

		if (c < 7) {
			c++;
		} else {
			r++;
			c = 1;
		}
	}

	if ((month == d.getMonth()) && (year == d.getFullYear())) {
		date_highlight();
	}
}

/*create <tr>, <td> in <table>, base on the inputs: row, col

*/
function create_table(row, col) {
	for (var r = 0; r < row; r++) {
		var tb_row = document.createElement("tr");

		for (var c = 0; c < col; c++) {
			var tb_cell = document.createElement("td");
			var textnode = document.createTextNode("");
			tb_cell.appendChild(textnode);

			var func_string = "";
			func_string = "show_date(" + (r + 3) + ", " + (c + 1) + ")";
			tb_cell.setAttribute("onclick", func_string); 

			tb_row.appendChild(tb_cell);
		}

		var tb = document.getElementById("calendar_tb");
		var tb_body = tb.childNodes[1];
		tb_body.appendChild(tb_row);
	}	
}

/*clear <tr> (from the third) before create new one

*/
function clear_table() {
	var tb_row_tmp = document.querySelectorAll("#calendar_tb > tbody > tr:nth-of-type(3)");
	var tb = document.getElementById("calendar_tb");
	var tb_body = tb.childNodes[1];

	while (tb_row_tmp[0]) {
		tb_body.removeChild(tb_row_tmp[0]);
		tb_row_tmp = document.querySelectorAll("#calendar_tb > tbody > tr:nth-of-type(3)");
	}
}

/*show the date in input field when user click on the table

*/

function show_date(row, col) {
	var date_box = document.getElementById("date");
	var tb_cell_tmp = 
	document.querySelectorAll("#calendar_tb > tbody > tr:nth-of-type(" + row + ") > td:nth-of-type(" + col + ")");

	var month = document.getElementById("month_select");
	var year = document.getElementById("year_select");

 	if (tb_cell_tmp[0].childNodes[0].nodeValue != "") {
		var date_string = 
		tb_cell_tmp[0].childNodes[0].nodeValue + "/" + 
		(month.selectedIndex + 1) + "/" + (year.selectedIndex + 1990);
		date_box.value = date_string;

		hide_calendar();
	}
}

/*Functions handle the event when user click on 
the pre_year, pre_month, next_year, next_month images

*/
function toPreYear() {
	var month = document.getElementById("month_select");
	var year = document.getElementById("year_select");

	if (year.selectedIndex > 0) {
		year.selectedIndex--;
	} else {
		year.selectedIndex = year.length - 1 ;
	}

	change_calendar();
}

function toPreMonth() {
	var month = document.getElementById("month_select");
	var year = document.getElementById("year_select");

	if (month.selectedIndex > 0) {
		month.selectedIndex--;
	} else {
		month.selectedIndex = 11;

		if (year.selectedIndex > 0) {
			year.selectedIndex--;
		} else {
			year.selectedIndex = year.length - 1 ;
		}
	}

	change_calendar();
}

function toNextYear() {
	var month = document.getElementById("month_select");
	var year = document.getElementById("year_select");

	if (year.selectedIndex < year.length - 1) {
		year.selectedIndex++;
	} else {
		year.selectedIndex = 0;
	}

	change_calendar();
}

function toNextMonth() {
	var month = document.getElementById("month_select");
	var year = document.getElementById("year_select");

	if (month.selectedIndex < 11) {
		month.selectedIndex++;
	} else {
		month.selectedIndex = 0;

		if (year.selectedIndex < year.length - 1) {
			year.selectedIndex++;
		} else {
			year.selectedIndex = year.length - 1;
		}
	}

	change_calendar();
}

/*highlight the current date

*/

function date_highlight() {
	var today = new Date();
	var first_date = new Date(today.getFullYear(), today.getMonth());

	var x = today.getDate() - (7 - first_date.getDay());

	if (x > 0) {
		x = Math.ceil(x/7) + 3;
	} else {
		x = 3;
	}

	var row = x;
	var col = today.getDay() + 1;

	var tb_cell_tmp = 
	document.querySelectorAll("#calendar_tb > tbody > tr:nth-of-type(" + row + ") > td:nth-of-type(" + col + ")");
	tb_cell_tmp[0].style.border = "solid 2px";
	tb_cell_tmp[0].style.boxSizing = "border-box";
}

function createYearList() {

	var year = document.getElementById("year_select");

	for (var g = 0; g < 50; g++) {
		var opt = document.createElement("option");
		opt.text = 1990 + g;
		opt.value = 1990 + g;
		year.options.add(opt);
	}
}