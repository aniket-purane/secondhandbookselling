const express = require('express');
const cors = require('cors');
const fs = require('fs');
const path = require('path');
const app = express();
const PORT = process.env.PORT || 5000;

app.use(cors());
app.use(express.json());

const DATA_FILE = path.join(__dirname, 'db.json');

const starterBooks = [
  // --- COMPUTER ENGINEERING ---
  { id: 1, title: 'Operating System Concepts', author: 'Silberschatz', price: 30, subject: '💻 Computer Science', seller: 'Senior Mark', sellerEmail: 'mark@college.edu', image: 'https://images.unsplash.com/photo-1518770660439-4636190af475?q=80&w=800', condition: 'Like New', phone: '9922864133', description: 'Essential for OS course. 10th edition.' },
  { id: 2, title: 'Database System Concepts', author: 'Korth & Sudarshan', price: 25, subject: '💻 Computer Science', seller: 'Senior Lisa', sellerEmail: 'lisa@college.edu', image: 'https://images.unsplash.com/photo-1544383835-bda2bc66a55d?q=80&w=800', condition: 'Good', phone: '9922864133', description: 'Very helpful for DBMS labs.' },
  { id: 3, title: 'Computer Networks', author: 'Andrew S. Tanenbaum', price: 35, subject: '💻 Computer Science', seller: 'Alex Chen', sellerEmail: 'alex@college.edu', image: 'https://images.unsplash.com/photo-1558494949-ef010cbdcc4b?q=80&w=800', condition: 'Brand New', phone: '9922864133', description: 'Latest edition. Bought for 1000, selling cheap.' },
  { id: 4, title: 'Artificial Intelligence', author: 'Stuart Russell', price: 40, subject: '💻 Computer Science', seller: 'Sarah Jain', sellerEmail: 'sarah@college.edu', image: 'https://images.unsplash.com/photo-1677442136019-21780ecad995?q=80&w=800', condition: 'Like New', phone: '9922864133', description: 'Modern approach to AI. Great for finals.' },
  { id: 5, title: 'Cyber Security Essentials', author: 'James Graham', price: 20, subject: '💻 Computer Science', seller: 'CyberPro', sellerEmail: 'pro@college.edu', image: 'https://images.unsplash.com/photo-1550751827-4bd374c3f58b?q=80&w=800', condition: 'Good', phone: '9922864133', description: 'Learn the basics of ethical hacking.' },
  { id: 6, title: 'Clean Code', author: 'Robert C. Martin', price: 15, subject: '💻 Computer Science', seller: 'Dev John', sellerEmail: 'john@college.edu', image: 'https://images.unsplash.com/photo-1516116216624-53e697fedbea?q=80&w=800', condition: 'Used', phone: '9922864133', description: 'Bible for software engineers.' },
  
  // --- MATH & SCIENCE ---
  { id: 7, title: 'Engineering Mathematics', author: 'K.A. Stroud', price: 0, subject: '📐 Math', seller: 'Senior Sam', sellerEmail: 'sam@college.edu', image: 'https://images.unsplash.com/photo-1635070041078-e363dbe005cb?q=80&w=800', condition: 'Used', phone: '9922864133', description: 'Free for someone who loves calculus!' },
  { id: 8, title: 'Linear Algebra', author: 'Gilbert Strang', price: 28, subject: '📐 Math', seller: 'MathWiz', sellerEmail: 'math@college.edu', image: 'https://images.unsplash.com/photo-1509228468518-180dd482180c?q=80&w=800', condition: 'Brand New', phone: '9922864133', description: 'Best for ML fundamentals.' },
  { id: 9, title: 'Quantum Physics Vol 2', author: 'Dr. Robert Blake', price: 30, subject: '🧪 Science', seller: 'Senior Mark', sellerEmail: 'mark@college.edu', image: 'https://images.unsplash.com/photo-1532012197267-da84d127e765?q=80&w=800', condition: 'Like New', phone: '9922864133', description: 'Advanced physics. Clean pages.' },
  { id: 10, title: 'Organic Chemistry', author: 'Paula Bruice', price: 22, subject: '🧪 Science', seller: 'ChemKing', sellerEmail: 'king@college.edu', image: 'https://images.unsplash.com/photo-1576086213369-97a306d36557?q=80&w=800', condition: 'Good', phone: '9922864133', description: 'All mechanisms are explained clearly.' },

  // --- OTHER ENGINEERING DEPT ---
  { id: 11, title: 'Digital Logic Design', author: 'M. Morris Mano', price: 18, subject: '📚 Other', seller: 'Electro', sellerEmail: 'el@college.edu', image: 'https://images.unsplash.com/photo-1517077304055-6e89abbf09b0?q=80&w=800', condition: 'Used', phone: '9922864133', description: 'Electronics department classic.' },
  { id: 12, title: 'Thermodynamics', author: 'Cengel & Boles', price: 25, subject: '📚 Other', seller: 'MechEng', sellerEmail: 'mech@college.edu', image: 'https://images.unsplash.com/photo-1503676260728-1c00da094a0b?q=80&w=800', condition: 'Good', phone: '9922864133', description: 'Mechanical engineering must have.' },
  { id: 13, title: 'Structural Analysis', author: 'R.C. Hibbeler', price: 32, subject: '📚 Other', seller: 'Civilian', sellerEmail: 'civ@college.edu', image: 'https://images.unsplash.com/photo-1503387762-592dea58ef23?q=80&w=800', condition: 'Like New', phone: '9922864133', description: 'Perfect for 3rd year students.' },
  { id: 14, title: 'Theory of Machines', author: 'S.S. Rattan', price: 12, subject: '📚 Other', seller: 'MechEng', sellerEmail: 'mech@college.edu', image: 'https://images.unsplash.com/photo-1537462715879-360eeb61a0ad?q=80&w=800', condition: 'Fair', phone: '9922864133', description: 'Slightly old but very useful.' },
  
  // --- MANAGEMENT & ARTS ---
  { id: 15, title: 'Macroeconomics', author: 'N. Gregory Mankiw', price: 15, subject: '📊 Economics', seller: 'Sarah Jain', sellerEmail: 'sarah@college.edu', image: 'https://images.unsplash.com/photo-1553484771-047a44eee27b?q=80&w=800', condition: 'Good', phone: '9922864133', description: 'Economics 101.' },
  { id: 16, title: 'Graphic Design Theory', author: 'Helen Armstrong', price: 20, subject: '🎨 Art', seller: 'Artis', sellerEmail: 'art@college.edu', image: 'https://images.unsplash.com/photo-1541462608141-ad4d05ed08c3?q=80&w=800', condition: 'Like New', phone: '9922864133', description: 'Design concepts and history.' },
  { id: 17, title: 'Business Ethics', author: 'Andrew Crane', price: 10, subject: '📊 Economics', seller: 'Bizzy', sellerEmail: 'biz@college.edu', image: 'https://images.unsplash.com/photo-1454165833767-027ffea9e778?q=80&w=800', condition: 'Fair', phone: '9922864133', description: 'Ethics for managers.' },
  { id: 18, title: 'The Psychology of Money', author: 'Morgan Housel', price: 8, subject: '📚 Other', seller: 'Investor', sellerEmail: 'inv@college.edu', image: 'https://images.unsplash.com/photo-1579621970563-ebec7560ff3e?q=80&w=800', condition: 'Brand New', phone: '9922864133', description: 'A must-read for everyone.' },
  { id: 19, title: 'Introduction to Robotics', author: 'John Craig', price: 45, subject: '💻 Computer Science', seller: 'BotWiz', sellerEmail: 'bot@college.edu', image: 'https://images.unsplash.com/photo-1589254065878-42c9da997008?q=80&w=800', condition: 'Like New', phone: '9922864133', description: 'Robotics kinematics and control.' },
  { id: 20, title: 'Data Structures with Python', author: 'Kenneth Lambert', price: 12, subject: '💻 Computer Science', seller: 'Pythonista', sellerEmail: 'py@college.edu', image: 'https://images.unsplash.com/photo-1526374965328-7f61d4dc18c5?q=80&w=800', condition: 'Used', phone: '9922864133', description: 'Python for beginners.' }
];

const readDB = () => {
  if (!fs.existsSync(DATA_FILE)) {
    return { books: starterBooks, users: [] };
  }
  return JSON.parse(fs.readFileSync(DATA_FILE));
};

const writeDB = (data) => fs.writeFileSync(DATA_FILE, JSON.stringify(data, null, 2));

app.get('/api/books', (req, res) => {
  const { search, subject, email } = req.query;
  const db = readDB();
  let filteredBooks = db.books;

  if (email) filteredBooks = filteredBooks.filter(b => b.sellerEmail === email);
  if (search) {
    filteredBooks = filteredBooks.filter(b => 
      b.title.toLowerCase().includes(search.toLowerCase()) || 
      b.author.toLowerCase().includes(search.toLowerCase())
    );
  }
  if (subject && !subject.includes('All')) {
    filteredBooks = filteredBooks.filter(b => b.subject === subject);
  }

  res.json(filteredBooks);
});

app.get('/api/books/:id', (req, res) => {
  const db = readDB();
  const book = db.books.find(b => b.id === parseInt(req.params.id));
  if (book) res.json(book);
  else res.status(404).json({ message: 'Book not found' });
});

app.post('/api/books', (req, res) => {
  const db = readDB();
  const newBook = { id: Date.now(), ...req.body };
  db.books.push(newBook);
  writeDB(db);
  res.status(201).json(newBook);
});

app.delete('/api/books/:id', (req, res) => {
  const db = readDB();
  const id = parseInt(req.params.id);
  db.books = db.books.filter(b => b.id !== id);
  writeDB(db);
  res.json({ success: true });
});

app.post('/api/login', (req, res) => res.json({ success: true, user: { email: req.body.email } }));

app.listen(PORT, () => console.log(`Server running on http://localhost:${PORT}`));
