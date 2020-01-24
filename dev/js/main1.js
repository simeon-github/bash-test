
function init(){
	
	var _btn = document.getElementById("btn")
	var _wheel = document.getElementById("wheel");
	var _inputSector = document.getElementById("input");
	var _sectors = [2,7,4,1,8,5,10,3,6,9];
	var _prevSector = 0;
	var _rotate = 0;

	_btn.addEventListener("click",function(e) {
		var num = _sectors.indexOf(parseInt(_inputSector.value));
		if(num==-1) return;
		var sector = num - _prevSector;		
		_prevSector += sector;		
		var random = (360 / 10) * ((Math.random() / 3) * (Math.floor(Math.random() * 2) == 0 ? 1 : -1));		
		_rotate += (360 * 5) - ((360 / 10) * sector);
		_wheel.style.transform = "rotate(" + (_rotate + random) + "deg)";
	});
	
}

if((document.readyState === "complete") ||
(document.readyState !== "loading") && 
(!document.documentElement.doScroll)) {
	init();
} 
else {
	document.addEventListener("DOMContentLoaded", init);
}
