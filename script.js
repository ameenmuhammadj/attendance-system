let students=[]
let attendance={}

fetch("students.json")
.then(res=>res.json())
.then(data=>{
students=data
loadStudents()
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

let presentRolls=[]

checked.forEach(cb=>{
presentRolls.push(cb.value)
})

let presentCount=presentRolls.length
let absentCount=students.length-presentCount

let absentStudents=students.filter(s=>!presentRolls.includes(s.roll))

attendance[date]={
present:presentCount,
absent:absentCount
}

showHistory()

showAbsent(absentStudents)

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

function showAbsent(list){

let box=document.getElementById("absentList")

box.innerHTML=""

list.forEach(s=>{

box.innerHTML+=`
<div>${s.roll} - ${s.name}</div>
`

})

}