var Shaketime = 0;
var SHAKE_THRESHOLD = 3000;    
var last_update = 0;    
var x=y=z=last_x=last_y=last_z=0;   
var  media; 

function init(){
last_update=new Date().getTime();
media= document.getElementById("musicBox");
	if (window.DeviceMotionEvent) { 
	window.addEventListener('devicemotion',deviceMotionHandler, false);  
	} else{
		
	alert('not support mobile event');
	}
}

function deviceMotionHandler(eventData) {    

var acceleration =eventData.accelerationIncludingGravity;  
 
var curTime = new Date().getTime(); 
if ((curTime - last_update)> 10) {  
	var diffTime = curTime -last_update;    
	last_update = curTime;        
	x = acceleration.x; 
	y = acceleration.y;   
	z = acceleration.z;   
	var speed = Math.abs(x +y + z - last_x - last_y - last_z) / diffTime * 10000;   
	
	if (speed > SHAKE_THRESHOLD) {    
		//alert("shaked");		
		if(!media.src){
			media.src="weixin_yaoyiyao.mp3"
		}
		media.play();
		Shaketime++;
		document.title = Shaketime;
	}    
	last_x = x;    
	last_y = y;    
	last_z = z;    
	}    
 
}