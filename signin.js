document.getElementById('signin').addEventListener('submit', logining);

async function logining(e) {
    e.preventDefault();
    console.log("Signin clicked!");
    const username = document.getElementById("userName").value;
    const password = document.getElementById("password").value;
    localStorage.setItem("name", username);
    console.log(`Username: ${username}, Password: ${password}`);

    const response = await fetch("/login", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ username, password }),
  });

  const result = await response.json();
  document.getElementById("mesToShow").textContent = result.message;
  if(result.message == 'Login successful!') {
    
   localStorage.setItem("accountPage", "./profile.html");
   localStorage.setItem("accountPage2", "./list.html");
   localStorage.setItem("accountPage3", "./explore.html");
   localStorage.setItem("accountPage4", "./explore.html");
   
    window.location.href = "./index.html";
    
   
  }
  
  
  
}



