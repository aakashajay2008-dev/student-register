import express, { Request, Response } from 'express';
import { createServer as createViteServer } from 'vite';
import path from 'path';
import fs from 'fs';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

export interface StudentRecord {
  id: string;
  fullName: string;
  regNo: string;
  studentId: string;
  department: string;
  email: string;
  phone: string;
  academicYear: string;
  batch: string;
  quota: string;
  enrolledCourses: string[];
  status: string;
  createdAt: string;
  updatedAt: string;
}

const app = express();
const PORT = process.env.PORT ? parseInt(process.env.PORT, 10) : 3000;

// Data directory & storage file
const DATA_DIR = path.resolve(__dirname, 'data');
const DB_FILE = path.join(DATA_DIR, 'students.json');

// Ensure data directory exists
if (!fs.existsSync(DATA_DIR)) {
  fs.mkdirSync(DATA_DIR, { recursive: true });
}

// Initial sample data if file doesn't exist
const INITIAL_STUDENTS: StudentRecord[] = [
  {
    id: "std_001",
    fullName: "Aakash K",
    regNo: "310525104001",
    studentId: "001",
    department: "Computer Science & Engineering",
    email: "kaakash58266@gmail.com",
    phone: "807XXXXX69",
    academicYear: "2026–2027",
    batch: "2026–2030",
    quota: "Government Quota (TNEA Merit)",
    enrolledCourses: ["MA3151", "PH3151", "CS3151", "GE3151", "CS3171", "BS3171", "GE3172", "AI3101"],
    status: "Verified & Enrolled",
    createdAt: new Date("2026-09-29T09:30:00Z").toISOString(),
    updatedAt: new Date().toISOString()
  },
  {
    id: "std_002",
    fullName: "Priyadharshini M",
    regNo: "310525243015",
    studentId: "015",
    department: "Artificial Intelligence & Data Science",
    email: "priyadharshini.m@dscet.ac.in",
    phone: "984XXXXX21",
    academicYear: "2026–2027",
    batch: "2026–2030",
    quota: "First Graduate Concession Quota",
    enrolledCourses: ["MA3151", "PH3151", "CS3151", "GE3151", "CS3171", "BS3171", "GE3172"],
    status: "Verified & Enrolled",
    createdAt: new Date("2026-09-29T09:40:00Z").toISOString(),
    updatedAt: new Date().toISOString()
  }
];

function getStoredStudents(): StudentRecord[] {
  try {
    if (!fs.existsSync(DB_FILE)) {
      fs.writeFileSync(DB_FILE, JSON.stringify(INITIAL_STUDENTS, null, 2), 'utf-8');
      return INITIAL_STUDENTS;
    }
    const raw = fs.readFileSync(DB_FILE, 'utf-8');
    return JSON.parse(raw) as StudentRecord[];
  } catch (err) {
    console.error("Error reading student database:", err);
    return INITIAL_STUDENTS;
  }
}

function saveStoredStudents(students: StudentRecord[]): void {
  try {
    fs.writeFileSync(DB_FILE, JSON.stringify(students, null, 2), 'utf-8');
  } catch (err) {
    console.error("Error writing student database:", err);
  }
}

// Middleware
app.use(express.json());

// API Endpoints

// 1. Health check & status
app.get('/api/health', (_req: Request, res: Response) => {
  res.json({
    status: 'ok',
    system: 'DSCET Admissions Registrar API v1.0',
    timestamp: new Date().toISOString(),
    recordsCount: getStoredStudents().length
  });
});

// 2. Get all student registrations (for registrar desk / statistics)
app.get('/api/students', (_req: Request, res: Response) => {
  const students = getStoredStudents();
  res.json({
    success: true,
    total: students.length,
    students
  });
});

// 3. Lookup student by email or registration number
app.get('/api/students/lookup', (req: Request, res: Response) => {
  const { email, regNo, studentId } = req.query;
  const students = getStoredStudents();

  const found = students.find((s: StudentRecord) => {
    if (email && s.email && s.email.toLowerCase() === String(email).toLowerCase()) return true;
    if (regNo && s.regNo === String(regNo)) return true;
    if (studentId && s.studentId === String(studentId)) return true;
    return false;
  });

  if (!found) {
    return res.status(404).json({
      success: false,
      message: 'Student record not found in DSCET admissions registry.'
    });
  }

  res.json({
    success: true,
    student: found
  });
});

// 4. Register or Update Student Details
app.post('/api/students/register', (req: Request, res: Response) => {
  const {
    fullName,
    regNo,
    studentId,
    department,
    email,
    phone,
    academicYear = "2026–2027",
    batch = "2026–2030",
    quota = "Government Quota (TNEA Merit)",
    enrolledCourses = ["MA3151", "PH3151", "CS3151", "GE3151", "CS3171", "BS3171", "GE3172", "AI3101"]
  } = req.body;

  if (!fullName || !regNo || !email) {
    return res.status(400).json({
      success: false,
      message: 'fullName, regNo, and email are mandatory fields.'
    });
  }

  const students = getStoredStudents();

  // Find if already exists by email or regNo
  const existingIndex = students.findIndex((s: StudentRecord) =>
    (s.email && s.email.toLowerCase() === email.toLowerCase()) ||
    (s.regNo && s.regNo === regNo)
  );

  const updatedRecord: StudentRecord = {
    id: existingIndex >= 0 ? students[existingIndex].id : `std_${Date.now()}`,
    fullName,
    regNo,
    studentId: studentId || (existingIndex >= 0 ? students[existingIndex].studentId : "001"),
    department: department || "Computer Science & Engineering",
    email,
    phone: phone || "",
    academicYear,
    batch,
    quota,
    enrolledCourses,
    status: "Verified & Enrolled",
    createdAt: existingIndex >= 0 ? students[existingIndex].createdAt : new Date().toISOString(),
    updatedAt: new Date().toISOString()
  };

  if (existingIndex >= 0) {
    students[existingIndex] = updatedRecord;
  } else {
    students.push(updatedRecord);
  }

  saveStoredStudents(students);

  res.json({
    success: true,
    message: existingIndex >= 0 ? 'Student record updated in DSCET database.' : 'Student successfully registered and saved to DSCET database.',
    student: updatedRecord
  });
});

// 5. Update course enrollments
app.post('/api/students/:id/courses', (req: Request, res: Response) => {
  const { id } = req.params;
  const { enrolledCourses } = req.body;

  if (!Array.isArray(enrolledCourses)) {
    return res.status(400).json({ success: false, message: 'enrolledCourses must be an array of course codes.' });
  }

  const students = getStoredStudents();
  const index = students.findIndex((s: StudentRecord) => s.id === id || s.regNo === id || s.email === id);

  if (index === -1) {
    return res.status(404).json({ success: false, message: 'Student record not found.' });
  }

  students[index].enrolledCourses = enrolledCourses;
  students[index].updatedAt = new Date().toISOString();

  saveStoredStudents(students);

  res.json({
    success: true,
    message: 'Course registration successfully updated in registry.',
    student: students[index]
  });
});

// Start server with Vite middleware for dev or serve dist in production
async function startServer() {
  if (process.env.NODE_ENV === 'production') {
    const distPath = path.resolve(__dirname, 'dist');
    app.use(express.static(distPath));
    app.get('*', (_req: Request, res: Response) => {
      res.sendFile(path.resolve(distPath, 'index.html'));
    });
  } else {
    const vite = await createViteServer({
      server: { middlewareMode: true },
      appType: 'spa',
    });
    app.use(vite.middlewares);
  }

  app.listen(PORT, '0.0.0.0', () => {
    console.log(`[DSCET Backend Server] Running on http://0.0.0.0:${PORT}`);
  });
}

startServer();
