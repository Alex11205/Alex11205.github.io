const express = require('express');
const fs = require('fs');
const path = require('path');
 
const app = express();
const PORT = 3000;
 
// Middleware to serve static files (HTML, CSS, JS)
app.use(express.static(path.join(__dirname)));
 
// Middleware to parse JSON bodies
app.use(express.json());
 
// Endpoint to get JSON data
app.get('/data', (req, res) => {
    fs.readFile('./data.json', 'utf8', (err, data) => {
        if (err) {
            res.status(500).send('Error reading data file');
            return;
        }
        res.json(JSON.parse(data));
    });
});
 
// Endpoint to update JSON data
app.post('/update-data', (req, res) => {
    const newData = req.body;
    const { name, link, score } = req.body;
 
    // Read the existing data
    fs.readFile('./data.json', 'utf8', (err, data) => {
        if (err) {
            res.status(500).send('Error reading data file');
            return;
        }
 
        // Update the data and write back to the file
        const jsonData = JSON.parse(data);
        const found = jsonData.find(u => u.name === name);

  if (found) {
    console.log('Same grocery found');
    // res.json({ message: "Already in your list!" });
    
  } else {
    console.log('Not Same grocery found');
    jsonData.push(newData);
  }
        
 
        fs.writeFile('./data.json', JSON.stringify(jsonData, null, 2), (err) => {
            if (err) {
                res.status(500).send('Error writing to data file');
                return;
            }
            res.status(200).send('Data successfully updated!');
        });
    });
    
});

app.delete("/stores/:name", (req, res) => {
    const name = req.params.name;

    let data = JSON.parse(fs.readFileSync("./data.json"));

    const newData = data.filter(store => store.name !== name);

    fs.writeFileSync("./data.json", JSON.stringify(newData, null, 2));

    res.json({ message: "Grocery Store deleted!", name: name });
});
 
// Start the server
app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});


app.post("/login", (req, res) => {
  const { username, password } = req.body;

  const users = JSON.parse(fs.readFileSync("profile.json", "utf8"));

  const found = users.find(u => u.username === username && u.password === password);

  if (found) {
    res.json({ message: "Login successful!" });
  } else {
    res.json({ message: "Invalid username or password!" });
  }
});


app.post("/signup", (req, res) => {
    
    const { username, password } = req.body;
 
    const users = JSON.parse(fs.readFileSync("profile.json", "utf8"));

    if (users.some(u => u.username === username)) {
    return res.json({ success: false, message: "Username already exists" });
  }

   users.push({ username, password });

   fs.writeFileSync("profile.json", JSON.stringify(users, null, 2));

     res.json({ success: true, message: "Signup successful" });
});

