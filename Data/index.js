let username = document.getElementById("username");
let batch = document.getElementById("batch");
let city = document.getElementById("city");
let btn = document.getElementById("btn");
let table = document.getElementById("table");
let deleted = document.getElementById("delete");
let updated = document.getElementById("update");
let search = document.getElementById("search");
let delbtn = document.getElementById("delbtn");
let upbtn = document.getElementById("upbtn");
let savebtn = document.getElementById("savebtn");
let seachbtn = document.getElementById("searchbtn");
let srcby = document.getElementById("srcBy");
let undobtn = document.getElementById("undobtn");
let showbtn = document.getElementById("show");
let pageContainer = document.getElementById("pageContainer");
let ent=document.getElementById("ent");
let currentPage = 1;
let rowsPerPage = 5;
function getDetails(){
    let data = localStorage.getItem("details");
    if(data==null){
        return []
    }else{
        return JSON.parse(data);
    }
}
tableheader();
function tableheader(){
    let tr = document.createElement("tr");
    table.appendChild(tr);
    let th1 = document.createElement("th");
    th1.textContent = "Name";
    tr.appendChild(th1);
    let th2 = document.createElement("th");
    th2.textContent = "Batch";
    tr.appendChild(th2);
    let th3 = document.createElement("th");
    th3.textContent = "City";
    tr.appendChild(th3);
}
let details = getDetails();
function displayRows(data){
    
    pageContainer.textContent="";
    table.textContent="";
    tableheader();
    start = (currentPage-1)*rowsPerPage;
    end=start+rowsPerPage;
    let filteredData = data.slice(start,end);
    for(let i of filteredData){
        createAndAppendRow(i.username,i.batch,i.city)
    }
    let leftbutton=document.createElement("button");
    leftbutton.textContent="<";
    leftbutton.disabled = currentPage === 1;
    leftbutton.onclick = function () {
        if (currentPage > 1) {
            currentPage--;
            displayRows(data);
        }
    };
    pageContainer.appendChild(leftbutton);
    for(let i=1;i<=(Math.ceil(details.length/rowsPerPage));i++){
        let button = document.createElement("button");
        button.textContent=i;
        pageContainer.appendChild(button);

        button.onclick=function(){
            pageContainer.textContent="";
            currentPage=i;
            table.textContent="";
            tableheader();
            displayRows(data);
        }
    }
    let rightbutton=document.createElement("button");
    rightbutton.textContent=">";
    rightbutton.disabled = currentPage === (Math.ceil(details.length/rowsPerPage)); 
    rightbutton.onclick = function () {
        if (currentPage < (Math.ceil(details.length/rowsPerPage))) {
            currentPage++;
            displayRows(data);
        }
    };
    pageContainer.appendChild(rightbutton);
   
}
displayRows(details)
function createAndAppendRow(username,batch,city){
    let tr = document.createElement("tr");
    table.appendChild(tr)

    let td1 = document.createElement("td");
    td1.textContent = username;
    tr.appendChild(td1);

    let td2 = document.createElement("td");
    td2.textContent = batch;
    tr.appendChild(td2);

    let td3 = document.createElement("td");
    td3.textContent = city;
    tr.appendChild(td3);
}
btn.onclick=function(){
    if(username.value=="" || batch.value=="" || city.value==""){
        alert("Please enter valid inputs");
        return
    }
    for(let i of details){
        if(i.username===username.value){
            window.alert("User Already Exists");
            username.value="";
            batch.value="";
            city.value="";
            return;
        }
    }
    let new_data={
        username:username.value,
        batch:batch.value,
        city:city.value
    }
    details.push(new_data);
    localStorage.setItem("details",JSON.stringify(details))
    username.value="";
    batch.value="";
    city.value="";
    displayRows(details);
}
delbtn.onclick=function(){
    if(deleted.value===""){
        window.alert("No username given to delete");
        return;
    }
    let name=deleted.value;
    let found=false;
    details=JSON.parse(localStorage.getItem("details"));
    for(let i=0;i<details.length;i++){
        if(details[i].username===name){
            found=true;
            details.splice(i,1);
        }
    }
    localStorage.setItem("details",JSON.stringify(details));
    if(!found){
        alert("No user Found to delete");
    }
    displayRows(details);
    deleted.value="";   
}
upbtn.onclick=function(){
    btn.disabled=true;
    console.log("clicked");
     if(updated.value===""){
        window.alert("No username given to Update");
        return;
    }
    upbtn.style.display="none";
    savebtn.style.display="block";
    let name=updated.value;
    let found=false;
    for(let i=0;i<details.length;i++){
        if(details[i].username===name){
            found=true;
            username.value=details[i].username;
            batch.value=details[i].batch;
            city.value=details[i].city;  
        }
    }
    if(!found){
        window.alert("No User Found");
        updated.value="";
        return;
    }
    details=JSON.parse(localStorage.getItem("details"));
    savebtn.onclick=function(){
        upbtn.style.display="block";
        savebtn.style.display="none";
        btn.disabled=false;
        for(let i=0;i<details.length;i++){
            if(details[i].username===name){
                details[i].username=username.value;
                details[i].batch=batch.value;
                details[i].city=city.value;
            }
        }
        localStorage.setItem("details",JSON.stringify(details));
        displayRows(details);
        updated.value="";
        username.value="";
        batch.value="";
        city.value="";
    }   
}
search.onkeyup=(event)=>{
        let filtereddata=[];
        for(let i of details){
            if(i.username.startsWith(event.target.value)||i.batch.startsWith(event.target.value)||i.city.startsWith(event.target.value)){
                filtereddata.push(i);
            }
        }
        table.textContent="";
        tableheader();
        for(i of filtereddata){
            createAndAppendRow(i.username,i.batch,i.city);
        }
        displayRows(filtereddata);
        if(event.target.value==""){
            displayRows(details);
        }
}







