/*-javascript-*/

var sliderIndex = 1;
showDivs (sliderIndex);

/*--- Create Function btnPress----*/
function btnPress(n) {
	showDivs (sliderIndex +=n); 
}


/*--- Create Function showDivs----*/
function showDivs(n) {
	var i;
	var x = document.getElementsByClassName("slideShow");
	if (n > x.length) {
		sliderIndex =1  //position Images display (Try replaced with : 2,3,4.... )
	}
	if (n < 1) {    
		sliderIndex = x.length;  //display position : 4 (last picture) 
	}
	for ( i = 0; i < x.length; i++) { 
		x[i].style.display = "none";
	}
	x[sliderIndex - 1].style.display = "block";
}

