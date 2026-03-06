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

students.forEach(student=>{

let div=document.createElement("div")

div.className="student"

div.innerHTML=`
<label>
<input type="checkbox" value="${student.roll}">
${student.roll} - ${student.name}
</label>
`

container.appendChild(div)

})

}

function submitAttendance(){

let date=document.getElementById("date").value

let checked=document.querySelectorAll("input[type=checkbox]:checked")

let presentStudents=[]

checked.forEach(cb=>{

let roll=cb.value
let student=students.find(s=>s.roll===roll)

presentStudents.push(student)

})

let presentCount=presentStudents.length
let absentCount=students.length-presentCount

attendance[date]={
present:presentCount,
absent:absentCount,
students:presentStudents
}

showHistory()

showAbsent()

alert("Attendance Recorded")

}

function showHistory(){

let table=document.getElementById("history")

table.innerHTML=""

for(let date in attendance){

table.innerHTML+=`
<tr>
<td>${date}</td>
<td>${attendance[date].present}</td>
<td>${attendance[date].absent}</td>
</tr>
`

}

}

function showAbsent(){

let box=document.getElementById("absentList")

box.innerHTML=""

let checked=document.querySelectorAll("input[type=checkbox]:checked")

let presentRolls=[]

checked.forEach(cb=>{
presentRolls.push(cb.value)
})

let absentStudents=students.filter(s=>!presentRolls.includes(s.roll))

absentStudents.forEach(s=>{
box.innerHTML+=`<div>${s.roll} - ${s.name}</div>`
})

}