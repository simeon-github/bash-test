var _btn = document.getElementsByClassName("btn")[0];
var _popup = document.getElementsByClassName("b-popup")[0];

_btn.addEventListener("mouseover",function(e) {
	_popup.classList.add('open');
},false);

_btn.addEventListener("mouseout", function(e) {
	_popup.classList.remove('open');
}, false);


/*Form Validation*/

var select = document.getElementById("select");
var country_pr = document.getElementById("country-pr");

var country_prefixes = {
	bg:"+359",
	en:"+44",
	de:"+49"
}

country_pr.value = country_prefixes[select.value];
select.onchange = function(){
	country_pr.value = country_prefixes[select.value];
}

document.getElementById("form").onsubmit = function(){

	var error = null;
	var is_checked = document.getElementById("checkbox").checked;
	var str_name = document.getElementById("full-name").value;
	str_name = str_name.trim();
	var arr_name = str_name.split(" ");
	var email = document.getElementById("email").value;
	var phone = document.getElementById("phone").value;
	var error_field = document.getElementById("error");
	
	var errors = {
		names_numbers: "Моля, въведете Име и Фамилия", 
		name_length:"Имената  трябва да са в диапазона от 3 до 20 символа",
		email:"Моля, въведете правилен имейл адрес",
		phone:"Моля, въведете правилен телефонен номер",
		checkbox:"Моля, съгласете се с условията на ползване"
	};
	
	if(arr_name.length != 2) {
		error = "names_numbers";
	}
	else if(namesChecker(arr_name)){
		error = "name_length";
	}
	else if(!checkEmail(email)){
		error = "email";
	}
	else if(!isValidMobile(phone)){
		error = "phone";
	}

	else if(!is_checked){
		error = "checkbox";
	}
	
	if(error != null){
		 error_field.innerHTML = errors[error];
		return false;
	}

	 error_field.innerHTML = "";			
}

function namesChecker(arr){
	var i;
	for(i=0; i<=arr.length-1; i++){
		if((arr[i].length < 3) || (arr[i].length >= 20)){
			return true;
		}
	}
	return false;
}

function checkEmail(string){
	var email_filter = /^[A-Za-z0-9!#$%&'*+\/=?^_`{|}~-]+(?:\.[A-Za-z0-9!#$%&'*+\/=?^_`{|}~-]+)*@(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?$/;
	return email_filter.test(string);
}

function fixMobile(string){
	string = string.trim();
	string = string.replace(/\s/g,'');
	return string;
}

function isValidMobile(string){
	string = fixMobile(string);
	var mobile_filter = /^[0][0-9]{4,10}$/;
	return mobile_filter.test(string);
};