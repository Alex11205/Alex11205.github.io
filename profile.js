

// const add = document.querySelectorAll(".addtolist");
// add.forEach(add => {
//     add.addEventListener("click", addToList);
// });

// const removebtn = document.querySelectorAll(".removefromlist");
// removebtn.forEach(rem => {
//     rem.addEventListener("click", removeFromList);
// });





window.addEventListener("DOMContentLoaded", () => {
    
  
  const newLink = localStorage.getItem("accountPage");
  const newLink2 = localStorage.getItem("accountPage2");
  const newLink3 = localStorage.getItem("accountPage3");
  const newLink4 = localStorage.getItem("accountPage4");
  
    console.log("page Changed");
    console.log(newLink);
    document.getElementById("accountpage").href = newLink;
    document.getElementById("accountpage2").href = newLink2;
    document.getElementById("accountpage3").href = newLink3;
    
    
    console.log('the value is: ' + localStorage.getItem("name"));
    document.getElementById("usid").textContent = 'Username: ' + localStorage.getItem("name");
    document.getElementById("dropMenu").textContent = 'Hello, ' + localStorage.getItem("name") + '!';
  
 




});

document.getElementById('logout').addEventListener('click', ()=> {
    console.log('Logout!');
    localStorage.removeItem("accountPage");
    localStorage.removeItem("accountPage2");
    localStorage.removeItem("accountPage3");
    localStorage.removeItem("accountPage4");
    window.location.href = "./index.html";
});

document.getElementById('logout2').addEventListener('click', ()=> {
    console.log('Logout!');
    localStorage.removeItem("accountPage");
    localStorage.removeItem("accountPage2");
    localStorage.removeItem("accountPage3");
    localStorage.removeItem("accountPage4");
    window.location.href = "./index.html";
});








async function viewList() {
    //reading data.json file
    const response = await fetch('/data');
    const data = await response.json();
   

    // creating a table to store the list
    const tableBody = document.getElementById('ListTable').getElementsByTagName('tbody')[0];
    tableBody.innerHTML = ''; // Clear previous data
    data.forEach(item => {
        // for every entry in the json file, create a row and store information according to the key in json file
        const row = document.createElement('tr');
        const cell1 = document.createElement('td');
        cell1.textContent = item.name;
        const cell2 = document.createElement('td');
        cell2.textContent = item.score;
        const cell3 = document.createElement('td');
        const aurl = document.createElement('a');
        aurl.textContent = item.text;
        aurl.href = item.url;
        
        
        // create a button 
        const btn = document.createElement('button');
        btn.textContent = 'Delete';

        // when user click the button, only this row will be deleted searching by name
        btn.addEventListener("click", () => {
      fetch(`http://localhost:3000/stores/${item.name}`, {
    method: 'DELETE'
})
.then(res => res.json()
)
.then(data => {
    localStorage.setItem(item.name, "unsaved");
    console.log(data);
     viewList(); // Refresh the displayed data
})
.catch(err => console.error(err));
});

        // forming the row and table
        cell3.appendChild(aurl);
        row.appendChild(cell1);
        row.appendChild(cell2);
        row.appendChild(cell3);
        row.appendChild(btn);
        tableBody.appendChild(row);
    
    });
}




