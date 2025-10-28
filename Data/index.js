let username = document.getElementById("username");
let batch = document.getElementById("batch");
let city = document.getElementById("city");
let btn = document.getElementById("btn");
let table = document.getElementById("table");
let deleted=document.getElementById("delete");
let updated=document.getElementById("update");
let search=document.getElementById("search");
let delbtn=document.getElementById("delbtn");
let upbtn=document.getElementById("upbtn");
let savebtn=document.getElementById("savebtn");
let seachbtn=document.getElementById("searchbtn");
let srcby=document.getElementById("srcBy");
let undobtn=document.getElementById("undobtn");
let showbtn=document.getElementById("show");

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
details.forEach(i => createAndAppendRow(i.username, i.batch, i.city));




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
    createAndAppendRow(username.value, batch.value,city.value);
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
}

delbtn.onclick=function(){
    if(deleted.value===""){
        window.alert("No username given to delete");
        return;
    }
    let name=deleted.value;
    details=JSON.parse(localStorage.getItem("details"));
    for(let i=0;i<details.length;i++){
        if(details[i].username===name){
            details.splice(i,1);
        }
    }
    table.textContent="";
    tableheader();
    for(i of details){
        createAndAppendRow(i.username,i.batch,i.city);
    }
    localStorage.setItem("details",JSON.stringify(details));
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
        table.textContent="";
        tableheader();
        for(i of details){
            createAndAppendRow(i.username,i.batch,i.city);
        }
        localStorage.setItem("details",JSON.stringify(details));
        updated.value="";
        username.value="";
        batch.value="";
        city.value="";
    }
    
    
}

seachbtn.onclick=function(){
    let detail=[];
    let selected=srcby.value;
    let searchval=search.value;
    let found=false;
    localStorage.setItem("searched",JSON.stringify(detail));
    if(selected==="username"){
        for(let i=0;i<details.length;i++){
            if(details[i].username===searchval){
                found=true;
                detail.push(details[i]);
                localStorage.setItem("searched",JSON.stringify(detail));
            }
        }
    }
    if(selected==="batch"){
        for(let i=0;i<details.length;i++){
            if(details[i].batch===searchval){
                found=true;
                detail.push(details[i]);
                localStorage.setItem("searched",JSON.stringify(detail));
            }
        }
    }
    if(selected==="city"){
        for(let i=0;i<details.length;i++){
            if(details[i].city===searchval){
                found=true;
                detail.push(details[i]);
                localStorage.setItem("searched",JSON.stringify(detail));
            }
        }
    }
    table.textContent="";
    tableheader();
    let searcheddata=JSON.parse(localStorage.getItem("searched"))||[];
    console.log(typeof searcheddata)
    for(i of searcheddata){
        createAndAppendRow(i.username,i.batch,i.city);
    }
    search.value="";
    localStorage.removeItem("searched");
}
undobtn.onclick=function(){
    table.textContent="";
        tableheader();
        for(i of details){
            createAndAppendRow(i.username,i.batch,i.city);
        }
        localStorage.setItem("details",JSON.stringify(details));
        updated.value="";
        username.value="";
        batch.value="";
        city.value="";
        search.value="";
}

showbtn.onclick=function(){
    if (table.style.display === "none" || table.style.display === "") {
        table.style.display = "table";
        showbtn.textContent = "Hide Data";
    } else {
        table.style.display = "none";
        showbtn.textContent = "Show Data";
    }
}





