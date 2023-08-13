// run `node index.js` in the terminal

console.log(`Hello Node.js v${process.versions.node}!`);
const express = require('express');
const bcrypt = require('bcrypt');
const app = express();
const PORT = 3000;

// Sample user data (usually stored in a database)
const users = [
  {
    id: 1,
    username: 'user1',
    password: '$2b$10$3tKXuIW7AKGKJo5X1cq2QuG.AjJ32j3M9fwEpoj3MW4vbR1Ek4xCa',
  }, // hashed password: "password"
];

app.use(express.json());

app.post('/login', async (req, res) => {
  const { username, password } = req.body;
  const user = users.find((user) => user.username === username);

  if (!user) {
    return res.status(404).send('User not found');
  }

  try {
    if (await bcrypt.compare(password, user.password)) {
      return res.send('Login successful');
    } else {
      return res.status(401).send('Invalid password');
    }
  } catch (error) {
    return res.status(500).send('Internal server error');
  }
});

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
