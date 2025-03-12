// const express = require('express');
// const { PrismaClient } = require('@prisma/client');

// const prisma = new PrismaClient();
// const app = express();

// app.use(express.json());

// // API endpoint ตัวอย่าง
// app.get('/users', async (req, res) => {
//   const users = await prisma.user.findMany();
//   res.json(users);
// });

// app.post('/users', async (req, res) => {
//   const { email, name } = req.body;
//   const user = await prisma.user.create({
//     data: { email, name },
//   });
//   res.json(user);
// });

// const PORT = 3000;
// app.listen(PORT, () => {
//   console.log(`Server running on port ${PORT}`);
// });