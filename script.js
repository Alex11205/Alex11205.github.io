
viewList();
// const add = document.querySelectorAll(".addtolist");
// add.forEach(add => {
//     add.addEventListener("click", addToList);
// });

// const removebtn = document.querySelectorAll(".removefromlist");
// removebtn.forEach(rem => {
//     rem.addEventListener("click", removeFromList);
// });

document.querySelectorAll(".addtolist").forEach(btn => {
  const id = btn.id;
  const name = btn.parentElement.querySelector("h3").textContent;

  // Load saved state from localStorage
  if (localStorage.getItem(name) === "saved") {
    // btn.classList.remove("addtolist");
    // btn.classList.add("removefromlist");
    btn.querySelector("i").classList.remove("bi-heart");
    btn.querySelector("i").classList.add("bi-heart-fill");
    btn.addEventListener("click", removeFromList);
  }

  else {
    btn.querySelector("i").classList.remove("bi-heart-fill");
    btn.querySelector("i").classList.add("bi-heart");
    
    btn.addEventListener("click", addToList);
  }


});



window.addEventListener("DOMContentLoaded", () => {
    
  
  const newLink = localStorage.getItem("accountPage");
  const newLink2 = localStorage.getItem("accountPage2");
  const newLink3 = localStorage.getItem("accountPage3");
  const newLink4 = localStorage.getItem("accountPage4");
  if (newLink) {
    console.log("page Changed");
    console.log(newLink);
    document.getElementById("accountpage").href = newLink;
    document.getElementById("accountpage2").href = newLink2;
    document.getElementById("accountpage3").href = newLink3;
    document.getElementById("accountpage4").href = newLink4;
    document.getElementById("accountpage4").textContent = 'Start Exploring';
    document.getElementById("uid").textContent = 'Username: ' + localStorage.getItem("name");
    document.getElementById("dropMenu").textContent = 'Hello, ' + localStorage.getItem("name") + '!';
  }
  else {
    console.log("Page not changed");
  }




});

document.getElementById('logout').addEventListener('click', ()=> {
    console.log('Logout!');
    localStorage.removeItem("accountPage");
    localStorage.removeItem("accountPage2");
    localStorage.removeItem("accountPage3");
    localStorage.removeItem("accountPage4");

    window.location.href = "./index.html";
});


async function removeFromList(event) {
    event.preventDefault();
    const name = this.parentElement.querySelector("h3").textContent;
    const icon = this.querySelector("i");
    
    // Toggle classes
    // this.classList.toggle("addtolist");
    // this.classList.toggle("removefromlist");
    icon.classList.toggle("bi-heart-fill");
    icon.classList.toggle("bi-heart");
    

    // Save state in localStorage
    
      localStorage.setItem(name, "unsaved");
      console.log(name + ' Do remove');


    console.log('This button is removefromlist.');
    
    fetch(`http://localhost:3000/stores/${name}`, {
    method: 'DELETE'
})
.then(res => res.json()
)
.then(data => {
    console.log(data);
     viewList(); // Refresh the displayed data
})
.catch(err => console.error(err));
}





async function addToList(event) {
    event.preventDefault();
    const icon = this.querySelector("i");
    const gname = this.parentElement.querySelector("h3").textContent;
    // Toggle classes
    // this.classList.toggle("addtolist");
    // this.classList.toggle("removefromlist");
    icon.classList.toggle("bi-heart");
    icon.classList.toggle("bi-heart-fill");

    // Save state in localStorage
    
      localStorage.setItem(gname, "saved");
      console.log(gname + ' Do add');
      
  

        const firstscore = this.parentElement.querySelector("ul").querySelector("li");
        const oscore = firstscore.textContent;
        console.log('1: ' + firstscore);
        const proscore = firstscore.nextElementSibling.textContent;
        console.log('2: ' + oscore);
        const dscore = firstscore.nextElementSibling.nextElementSibling.textContent;
        console.log('3: ' + proscore);
        const priscore = firstscore.nextElementSibling.nextElementSibling.nextElementSibling.textContent;
        console.log('4: ' + dscore);
        const glinkurl = this.parentElement.querySelector("a").href;
        console.log('5: ' + priscore);
        const glinktext = this.parentElement.querySelector("a").textContent;
         console.log('6: ' + glinkurl);
       
        console.log('7: ' + glinktext);
       
       
    //     const icon = this.querySelector("i");
    //     icon.classList.toggle("bi-heart");
    // icon.classList.toggle("bi-heart-fill");
    

    

         const savedStore = {
            
              
                    name: gname,
                    overallscore: oscore,
                    productscore: proscore,
                    distancescore: dscore,
                    pricescore: priscore,
                    url: glinkurl,
                    text: glinktext
        };

    
    // using fetch POST method to update the data in data.json file
    const response = await fetch('/update-data', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(savedStore),
    });
 
    if (response.ok) {
        
        viewList(); // Refresh the displayed data
    } else {
        console.error('Error updating data');
    }

//    const result = await response.json();
//    alert(result.message);
}



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
        const cell0 = document.createElement('td');
        cell0.textContent = item.overallscore;
        const cell2 = document.createElement('td');
        cell2.textContent = item.productscore;
        const cell3 = document.createElement('td');
        cell3.textContent = item.distancescore;
        const cell4 = document.createElement('td');
        cell4.textContent = item.pricescore;
        const cell5 = document.createElement('td');
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
        cell5.appendChild(aurl);
        row.appendChild(cell1);
        row.appendChild(cell0);
        row.appendChild(cell2);
        row.appendChild(cell3);
        row.appendChild(cell4);
        row.appendChild(cell5);
        row.appendChild(btn);
        tableBody.appendChild(row);
    
    });
}




