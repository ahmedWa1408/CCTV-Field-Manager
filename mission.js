// ==========================
// الساعة والتاريخ
// ==========================

const clock = document.getElementById("liveClock");
const today = document.getElementById("liveDate");

function updateClock() {

const now = new Date();

clock.textContent = now.toLocaleTimeString("ar-SA",{
hour:"2-digit",
minute:"2-digit",
second:"2-digit",
hour12:true
});

today.textContent = now.toLocaleDateString("ar-SA",{
weekday:"long",
year:"numeric",
month:"long",
day:"numeric"
});

}

setInterval(updateClock,1000);

updateClock();


// ==========================
// بداية المهمة
// ==========================

const missionStart =
document.getElementById("missionStart");

const startTime =
new Date();

missionStart.textContent =
startTime.toLocaleTimeString("ar-SA",{

hour:"2-digit",

minute:"2-digit",

hour12:true

});


// ==========================
// حالة الاتصال
// ==========================

const connectionStatus =
document.getElementById("connectionStatus");

function updateConnection(){

if(navigator.onLine){

connectionStatus.textContent="متصل";

}else{

connectionStatus.textContent="غير متصل";

}

}

window.addEventListener("online",updateConnection);

window.addEventListener("offline",updateConnection);

updateConnection();


// ==========================
// شريط الإنجاز
// ==========================

const progressFill =
document.getElementById("progressFill");

const progressPercent =
document.getElementById("progressPercent");

const totalSites =
document.getElementById("totalSites");

const finishedSites =
document.getElementById("finishedSites");

const remainingSites =
document.getElementById("remainingSites");

let total = 30;

let finished = 0;

function updateProgress(){

let percent =
Math.round((finished/total)*100);

progressFill.style.width =
percent+"%";

progressPercent.textContent =
percent+"%";

finishedSites.textContent =
finished;

remainingSites.textContent =
total-finished;

}

updateProgress();// ==========================
// تلوين الصف حسب حالة الموقع
// ==========================

document.querySelectorAll(".siteStatus").forEach(select=>{

select.addEventListener("change",function(){

const row=this.closest("tr");

row.classList.remove(
"site-work",
"site-stop",
"site-clean",
"site-problem",
"site-empty"
);

switch(this.value){

case "work":
row.classList.add("site-work");
break;

case "stop":
row.classList.add("site-stop");
break;

case "clean":
row.classList.add("site-clean");
break;

case "problem":
row.classList.add("site-problem");
break;

case "empty":
row.classList.add("site-empty");
break;

}

});

});


// ==========================
// حساب ساعات الرصد
// ==========================

document.querySelectorAll("#missionTable tbody tr").forEach(row=>{

const start=row.querySelector(".startFolder");

const end=row.querySelector(".endFolder");

const hours=row.querySelector(".watchHours");

function calculateHours(){

if(start.value && end.value){

const s=new Date(start.value);

const e=new Date(end.value);

const diff=(e-s)/1000/60/60;

if(diff>=0){

hours.value=diff.toFixed(2)+" ساعة";

}

}

}

start.addEventListener("change",calculateHours);

end.addEventListener("change",calculateHours);

});


// ==========================
// حفظ تلقائي
// ==========================

document.querySelectorAll("input,select,textarea").forEach(field=>{

field.addEventListener("change",()=>{

localStorage.setItem(

field.id || Math.random(),

field.value

);

});

});// ==========================
// استرجاع البيانات المحفوظة
// ==========================

document.querySelectorAll("input,select,textarea").forEach(field=>{

if(!field.id) return;

const saved=localStorage.getItem(field.id);

if(saved!==null){

field.value=saved;

}

field.addEventListener("input",()=>{

localStorage.setItem(field.id,field.value);

});

});


// ==========================
// السرعة (قيمة أولية)
// ==========================

const currentSpeed=document.getElementById("currentSpeed");
const maxSpeed=document.getElementById("maxSpeed");
const avgSpeed=document.getElementById("avgSpeed");

let max=0;
let totalSpeed=0;
let readings=0;

function updateSpeed(speed){

const s=Math.max(0,Math.round(speed));

currentSpeed.textContent=s;

if(s>max){

max=s;

maxSpeed.textContent=max;

}

totalSpeed+=s;

readings++;

avgSpeed.textContent=Math.round(totalSpeed/readings);

}


// ==========================
// GPS
// ==========================

if("geolocation" in navigator){

navigator.geolocation.watchPosition(

(position)=>{

if(position.coords.speed!=null){

updateSpeed(position.coords.speed*3.6);

}

},

(error)=>{

console.log(error);

},

{

enableHighAccuracy:true,

maximumAge:1000,

timeout:10000

}

);

}// ==========================
// إنهاء المهمة
// ==========================

const missionEnd =
document.getElementById("missionEnd");

const approveButton =
document.getElementById("approveButton");

approveButton.addEventListener("click",()=>{

const now=new Date();

missionEnd.textContent=
now.toLocaleTimeString("ar-SA",{

hour:"2-digit",

minute:"2-digit",

hour12:true

});

document.getElementById("approveTime").value=
now.toLocaleTimeString("ar-SA",{

hour:"2-digit",

minute:"2-digit",

second:"2-digit",

hour12:true

});

document.getElementById("approveDate").value=
now.toLocaleDateString("ar-SA");

alert("تم اعتماد المهمة بنجاح");

});


// ==========================
// تحديث الإنجاز
// ==========================

const table=
document.getElementById("missionTable");

table.addEventListener("change",()=>{

let done=0;

document.querySelectorAll(".siteStatus").forEach(item=>{

if(item.value!=""){

done++;

}

});

finished=done;

updateProgress();

});


// ==========================
// حالة الوصول
// ==========================

document.querySelectorAll(".arrivalStatus").forEach(select=>{

select.addEventListener("change",function(){

if(this.value==="داخل النطاق 5 كم"){

this.classList.remove("arrival-fail");

this.classList.add("arrival-ok");

}else if(this.value==="خارج النطاق 5 كم"){

this.classList.remove("arrival-ok");

this.classList.add("arrival-fail");

}else{

this.classList.remove("arrival-ok");

this.classList.remove("arrival-fail");

}

});

});// ==========================
// إنشاء الصفوف تلقائياً
// ==========================

const tableBody =
document.querySelector("#missionTable tbody");

const demoSites=[

{
code:"QSMSM101",
storage:"فلاش"
},

{
code:"QSMSM102",
storage:"فلاش"
},

{
code:"QSMSM103",
storage:"هارديسك"
},

{
code:"QSMSM104",
storage:"فلاش"
},

{
code:"QSMSM105",
storage:"هارديسك"
}

];

tableBody.innerHTML="";

demoSites.forEach(site=>{

tableBody.innerHTML+=`

<tr>

<td>${site.code}</td>

<td>

<select class="storageType">

<option ${site.storage==="فلاش"?"selected":""}>فلاش</option>

<option ${site.storage==="هارديسك"?"selected":""}>هارديسك</option>

</select>

</td>

<td>

<button class="mapBtn">

📍 فتح

</button>

</td>

<td>

<select class="arrivalStatus">

<option>بانتظار الوصول</option>

<option>داخل النطاق 5 كم</option>

<option>خارج النطاق 5 كم</option>

</select>

</td>

<td>

<select class="siteStatus">

<option value="">اختر</option>

<option value="work">🟢 يعمل</option>

<option value="stop">🔴 لا يعمل</option>

<option value="clean">🟠 يعمل ولا يوجد مخالفات</option>

<option value="problem">🟤 لا يعمل ويوجد مخالفات</option>

<option value="empty">⚫ لا يعمل ولا يوجد مخالفات</option>

</select>

</td>

<td>

<input type="datetime-local" class="startFolder">

</td>

<td>

<input type="datetime-local" class="endFolder">

</td>

<td>

<input
type="text"
class="watchHours"
readonly>

</td>

<td>

<select>

<option>يوجد</option>

<option>لا يوجد</option>

</select>

</td>

<td>

<input type="file">

</td>

<td>

<textarea rows="2"></textarea>

</td>

</tr>

`;

});

total=demoSites.length;

updateProgress();
