window.onload=function() {
	show();
}
var index=0;
function show() {	
	index++;	
	document.images['image'].src='images/banner_'+index+'.jpg';	
	setTimeout("show()", 3000);	
	if(index==2) {
		index=0;
	}
		
}

