
function init(){
	console.log('This is the Main.js file. It should be the 3rd and final file');
}

if((document.readyState === "complete") ||
(document.readyState !== "loading") && 
(!document.documentElement.doScroll)) {
	init();
} 
else {
	document.addEventListener("DOMContentLoaded", init);
}
