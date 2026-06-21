function searchPlan(){

const number=document.getElementById("planNumber").value.trim();

const error=document.getElementById("error");

error.innerHTML="";

if(number===""){

error.innerHTML="يرجى إدخال رقم الخطة";

return;

}

if(!plans[number]){

error.innerHTML="رقم الخطة غير موجود";

return;

}

localStorage.setItem("routeNumber",plans[number].number);

localStorage.setItem("routeName",plans[number].name);

window.location.href="route.html";

}
