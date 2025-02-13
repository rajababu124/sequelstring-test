const express = require('express')
const mongoose = require('mongoose')
const multer = require('multer')
const path = require('path')

const connectDB = require('./config/db')
const authRoutes = require('./routes/authRoutes')
const app = express()
const cores = require('cors')
const port = 3000
connectDB()
app.route('/').get((req, res) => {
    res.send('API is running perfectly ....')
})

app.use(cores())

app.use(express.json()) 
app.use('/api/auth', authRoutes)


// jab time milega to folder structure banayenge


// Define the Document schema
const documentSchema = new mongoose.Schema({
    name: String,
    fileType: String,
    status: { type: String, default: 'pending' },
    filePath: String,
  });
  
  const Document = mongoose.model('Document', documentSchema);
  
  // Set up Multer for file uploads
  const storage = multer.diskStorage({
    destination: (req, file, cb) => {
      cb(null, './uploads'); // Store uploaded files in the "uploads" folder
    },
    filename: (req, file, cb) => {
      cb(null, Date.now() + path.extname(file.originalname)); // Save with unique filenames
    },
  });
  
  const upload = multer({ storage: storage });
  
  // POST route for uploading a document
  app.post('/upload', upload.single('file'), async (req, res) => {
    try {
      const { file } = req;
      const newDocument = new Document({
        name: file.originalname,
        fileType: file.mimetype,
        filePath: file.path,
      });
      await newDocument.save();
      res.status(200).json({ message: 'Document uploaded successfully', document: newDocument });
    } catch (error) {
      res.status(500).json({ message: 'Error uploading document', error });
    }
  });
  
  // GET route for fetching documents
  app.get('/documents', async (req, res) => {
    try {
      const documents = await Document.find();
      res.status(200).json(documents);
    } catch (error) {
      res.status(500).json({ message: 'Error fetching documents', error });
    }
  });
  
  // Serve static files (e.g., document downloads)
  app.use('/uploads', express.static(path.join(__dirname, 'uploads')));

  


app.listen(port, () => {
    console.log(`Server is running on port ${port}`)
})