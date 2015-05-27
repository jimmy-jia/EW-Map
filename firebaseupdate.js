var ref = new Firebase('https://uiuc-enterpriseworks.firebaseio.com/');
var companyref = ref.child('company');
var childref = ref.child('rooms');
function updateRoom(){
	var roomer= document.getElementById("roomdata");
	var strRoom = roomer.options[roomer.selectedIndex].text;
	var roomref= childref.child(strRoom);
	var num=strRoom;
	var company=document.getElementById('companydata').value;
	roomref.update({room: num, company: company});
	$('#done').html('Done! Thanks!');
	console.log(num + " "+ company);
	var compref=companyref.child(company);
	compref.update({Name: company, Room: num});
}
$(document).ready(function()
{
$("#roomdata").chosen({no_results_text: "Sorry! That room doesn't exist, please try again!"});
}
);