//No conflict for jQuery and Salesforce. All jQuery is prefixed with $j instead of $
$j = jQuery.noConflict();

//Create Firebase References
var ref = new Firebase('https://uiuc-enterpriseworks.firebaseio.com/');
var childref = ref.child('rooms');

//Run on Document load
$j(document).ready(function()
{
	$j("#roomdata").chosen({no_results_text: "Sorry! Not found!"});
	/*Using the Mapster extention for jQuery, create a mapster based off of a HTML area map + image */

	var maptags=document.getElementsByTagName('area');
	size=maptags.length;
	for(var i=0; i<maptags.length; i++)
	{
		maptags[i].onclick=new Function("updateInfo('"+maptags[i].title+"')");	//Sets the update info onclick for all maptags
	}

	/* Sets the settings for the map area selection */

	$j('#mapimg').mapster({
		singleSelect:true,
		strokeColor: 'ffaa33',
	    fillOpacity: 0.5,
	    render_highlight: {
	        fillColor: 'ffff00',
	        stroke: true,
	    },
	    render_select: {
	        fillColor: '0000ff',
	        stroke: false,
	    },
	    fadeInterval: 50,
	    mapKey: 'title'
	});
	$j('#mapimg2').mapster({
		singleSelect:true,
		strokeColor: 'ffaa33',
	    fillOpacity: 0.5,
	    render_highlight: {
	        fillColor: 'ffff00',
	        stroke: true,
	    },
	    render_select: {
	        fillColor: '0000ff',
	        stroke: false,
	    },
	    fadeInterval: 50,
	    mapKey: 'title'
	});

});

/* Function to update the info of the current room, uses data pulled from APEX*/
function updateInfo(num){
	croom=num;
	var textarea = document.getElementById('textarea');
	if(specroom.hasOwnProperty(num.toString())){
		textarea.innerHTML="Room " + num+", "+ specroom[num.toString()];
		getInfo(num.toString());
	}
	else{
		childref.once("value", function(snapshot){
			try{
				var idx=snapshot.val();
				var object=Object.getOwnPropertyNames(idx).sort();
				var it=object.indexOf(num);
				var company=idx[num].company;
				textarea.innerHTML="Room " + num+", "+ company;
			}
			catch(err){
				textarea.innerHTML="Room " + num +", Empty"; 
			}
		})
	}
}
var specroom = {
	"98": "EnterpriseWorks",
	"99": "EnterpriseWorks",
	"100": "EnterpriseWorks",
	"101": "EnterpriseWorks",
	"102": "EnterpriseWorks",
	"132": "Men's Room",
	"136": "Women's Room",
	"201": "EnterpriseWorks",
	"232": "Men's Room",
	"236": "Women's Room",
	"130": "Conference Room",
	"112": "EnterpriseWorks",
	"114": "EnterpriseWorks Intern Area",
	"114A": "EnterpriseWorks",
	"116": "EnterpriseWorks",
	"118": "EnterpriseWorks",
	"120": "EnterpriseWorks",
	"115": "Conference Room",
	"220": "Conference Room",
	"215": "Conference Room",
	"138": "EnterpriseWorks",
	"140": "EnterpriseWorks",
	"140A": "EnterpriseWorks",
	"142": "EnterpriseWorks",
	"243": "EnterpriseWorks",
};
function changeroom(){
	var roomer= document.getElementById("roomdata");
	var strRoom = roomer.options[roomer.selectedIndex].text;
	if(strRoom<200){
		mapchange(1);
	}
	else{
		mapchange(2);
	}
	$j("#"+strRoom).mapster('select');
	updateInfo(strRoom);
}
var croom=0;
function mapchange(display){
	switch(display){
		case 1:
			$j("#second").fadeOut(0);
			$j("#first").fadeIn(400);
			$j("#b2").css("background-color", "#2c3e50");
			$j("#b1").css("background-color", "#00cccc");
			if(croom>199){
				$j("#"+croom).mapster('deselect');
				$j('#textarea').html("");			
			}
			break;
		case 2:
			
			$j("#first").fadeOut(0);
			$j("#second").fadeIn(400);
			$j("#b1").css("background-color", "#2c3e50");
			$j("#b2").css("background-color", "#00cccc");
			if(croom<200){
				$j("#"+croom).mapster('deselect');
				$j('#textarea').html("");
			}
			break;
	}
}
var directoryvis = 0;
function showdirectory(){
    if(!directoryvis){
        var content=document.createElement("div");
        content.innerHTML="EnterpriseWorks Directory" + "<br>";
        document.body.appendChild(content);
        var list = document.getElementById('roomdata');
        var nodes = document.getElementById('roomdata').length-1;
       		childref.once("value", function(snapshot){
				try{
					var idx=snapshot.val();
					var object=Object.getOwnPropertyNames(idx).sort();
					for(var i=0; i<object.length; i++){
						if(idx[object[i]]){
						var roomname=idx[object[i]].room;
						var company=idx[object[i]].company;
						content.innerHTML+="Room " + roomname+", "+ company + "<br>";}
					}
				}
				catch(err){}
			});
                

        content.className="directory";
        directoryvis=1;
    }
    else
    {
        $j('.directory').toggle();
    }
}