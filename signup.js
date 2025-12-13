document.getElementById('signup').addEventListener('submit', signup);

async function signup(e) {
    e.preventDefault();
    console.log("Signup clicked!");
    const username = document.getElementById('userName').value;
    const password = document.getElementById('password').value;
    console.log(`Username: ${username}, Password: ${password}`);

    const response = await fetch("/signup", {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({ username, password }),
    });
 
    const result = await response.json();
  document.getElementById("mesToShow").textContent = result.message;
   window.location.href = "./signup_success.html";
   

}



