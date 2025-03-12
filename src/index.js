const express = require('express');
const { PrismaClient } = require('@prisma/client');
const multer = require('multer');
const path = require('path');

const prisma = new PrismaClient();
const app = express();

// ตั้งค่า multer
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, 'uploads/');
  },
  filename: (req, file, cb) => {
    const ext = path.extname(file.originalname);
    cb(null, `${Date.now()}${ext}`);
  },
});
const upload = multer({ storage });

app.use(express.json());

// Upload endpoint
app.post('/upload', upload.single('image'), async (req, res) => {
  const file = req.file;
  if (!file) {
    return res.status(400).json({ error: 'No file uploaded' });
  }
  const imageRecord = await prisma.image.create({
    data: {
      filename: file.filename,
      path: file.path,
    },
  });
  res.json({ message: 'Image uploaded', file: imageRecord });
});

// API เดิม
app.get('/users', async (req, res) => {
  const users = await prisma.user.findMany();
  res.json(users);
});

app.post('/users', async (req, res) => {
  const { email, name } = req.body;
  const user = await prisma.user.create({
    data: { email, name },
  });
  res.json(user);
});

const PORT = 3000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});