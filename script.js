let students=[]
let attendance={}

fetch("students.json")
.then(res=>res.json())
.then(data=>{
students=data
loadStudents()
})

fetch("attendance.json")
.then(res=>res.json())
.then(data=>{
attendance=data
showHistory()
})

function loadStudents(){

let container=document.getElementById("studentList")

students.forEach(name=>{
let div=document.createElement("div")

div.innerHTML=`<label>
<input type="checkbox" value="${name}">
${name}
</label>`

container.appendChild(div)
})

}

function submitAttendance(){

let date=document.getElementById("date").value

let checked=document.querySelectorAll("input[type=checkbox]:checked")

let present=[]

checked.forEach(cb=>{
present.push(cb.value)
})

attendance[date]={
present:present.length,
absent:students.length-present.length,
names:present
}

alert("Attendance Recorded")

showHistory()

}

function showHistory(){

let table=document.getElementById("history")

table.innerHTML=""

for(let date in attendance){

let row=`<tr>
<td>${date}</td>
<td>${attendance[date].present}</td>
<td>${attendance[date].absent}</td>
</tr>`

table.innerHTML+=row

}

}
