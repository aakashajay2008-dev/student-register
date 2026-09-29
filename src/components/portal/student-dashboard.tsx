import React, { useState } from "react";
import {
  BookOpen,
  Calendar,
  CheckCircle2,
  Clock,
  Download,
  GraduationCap,
  Layers,
  MapPin,
  Printer,
  Sparkles,
  User,
  LogOut,
  ShieldCheck,
  ChevronRight,
  CreditCard,
  Building,
  Bell
} from "lucide-react";
import { DscetCrest } from "@/src/components/dscet-crest";
import { StudentFormData } from "./basic-details-step";

interface StudentDashboardProps {
  studentData: StudentFormData;
  onEditDetails: () => void;
  onOpenAdmissionSlip: () => void;
  onSignOut: () => void;
}

interface CourseItem {
  code: string;
  title: string;
  credits: number;
  type: "Core Theory" | "Practical Lab" | "Foundational" | "Elective";
  faculty: string;
  enrolled: boolean;
}

export function StudentDashboard({
  studentData,
  onEditDetails,
  onOpenAdmissionSlip,
  onSignOut,
}: StudentDashboardProps) {
  const [activeTab, setActiveTab] = useState<"courses" | "idcard" | "schedule">("courses");
  const [courses, setCourses] = useState<CourseItem[]>([
    {
      code: "MA3151",
      title: "Matrices and Calculus",
      credits: 4,
      type: "Core Theory",
      faculty: "Dr. K. Sundararajan (Maths)",
      enrolled: true,
    },
    {
      code: "PH3151",
      title: "Engineering Physics",
      credits: 3,
      type: "Core Theory",
      faculty: "Dr. V. Meenakshi (Physics)",
      enrolled: true,
    },
    {
      code: "CS3151",
      title: "Problem Solving and Python Programming",
      credits: 3,
      type: "Core Theory",
      faculty: "Prof. S. Karthikeyan (CSE)",
      enrolled: true,
    },
    {
      code: "GE3151",
      title: "Heritage of Tamils & Engineering Ethics",
      credits: 2,
      type: "Foundational",
      faculty: "Dr. T. Murugan (Humanities)",
      enrolled: true,
    },
    {
      code: "CS3171",
      title: "Python Programming Laboratory",
      credits: 2,
      type: "Practical Lab",
      faculty: "Prof. S. Karthikeyan & Team",
      enrolled: true,
    },
    {
      code: "BS3171",
      title: "Physics & Chemistry Integrated Lab",
      credits: 2,
      type: "Practical Lab",
      faculty: "Dr. V. Meenakshi & Dr. P. Bala",
      enrolled: true,
    },
    {
      code: "GE3172",
      title: "English for Technical Communication",
      credits: 2,
      type: "Core Theory",
      faculty: "Dr. R. Shalini (English)",
      enrolled: true,
    },
    {
      code: "AI3101",
      title: "Elective: Introduction to Generative AI & Python",
      credits: 3,
      type: "Elective",
      faculty: "Prof. N. Arunachalam (AI&DS)",
      enrolled: true,
    },
  ]);

  const totalCredits = courses
    .filter((c) => c.enrolled)
    .reduce((sum, c) => sum + c.credits, 0);

  const toggleCourseEnrollment = (code: string) => {
    setCourses((prev) =>
      prev.map((c) => (c.code === code ? { ...c, enrolled: !c.enrolled } : c))
    );
  };

  return (
    <div className="min-h-screen bg-[#faf8ff] text-slate-800 flex flex-col justify-between">
      {/* Top Navigation */}
      <header className="w-full bg-white border-b border-slate-200 shadow-sm sticky top-0 z-20">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 h-16 flex items-center justify-between">
          <DscetCrest />
          <nav className="flex items-center gap-3 sm:gap-6 text-xs sm:text-sm font-medium">
            <button
              onClick={onEditDetails}
              className="text-slate-500 hover:text-blue-700 transition cursor-pointer"
            >
              Step 1: Info
            </button>
            <span className="font-semibold text-blue-700 flex items-center gap-1.5 border-b-2 border-blue-700 py-1">
              Step 2: Courses & Portal
            </span>
            <div className="h-4 w-[1px] bg-slate-200 hidden sm:block" />
            <div className="flex items-center gap-2">
              <div className="h-8 w-8 rounded-full bg-blue-100 border border-blue-300 text-blue-800 font-bold flex items-center justify-center text-xs">
                {studentData.fullName.charAt(0)}
              </div>
              <span className="hidden md:inline-block font-semibold text-slate-900 text-xs">
                {studentData.fullName}
              </span>
              <button
                onClick={onSignOut}
                title="Sign Out"
                className="p-1.5 text-slate-400 hover:text-red-600 rounded-lg hover:bg-slate-100 transition cursor-pointer ml-1"
              >
                <LogOut className="w-4 h-4" />
              </button>
            </div>
          </nav>
        </div>
      </header>

      {/* Main Student Portal Content */}
      <main className="max-w-6xl mx-auto px-4 py-8 w-full flex-1 space-y-6">
        {/* Welcome Banner */}
        <div className="bg-gradient-to-r from-blue-900 via-blue-800 to-indigo-900 text-white rounded-3xl p-6 sm:p-8 shadow-xl relative overflow-hidden">
          <div className="absolute right-0 top-0 bottom-0 w-1/3 opacity-10 bg-[radial-gradient(ellipse_at_center,white,transparent)] pointer-events-none" />
          <div className="relative z-10 flex flex-col md:flex-row md:items-center justify-between gap-6">
            <div className="space-y-2">
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full text-xs font-semibold bg-blue-700/60 border border-blue-500/40 text-blue-200">
                <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
                Officially Registered Student • 2026–2027
              </div>
              <h1 className="text-2xl sm:text-3xl font-bold tracking-tight">
                Welcome, {studentData.fullName}
              </h1>
              <p className="text-blue-100/90 text-sm max-w-xl">
                Department of {studentData.department} • Reg No: <span className="font-mono font-bold text-white">{studentData.regNo}</span> • Student ID: <span className="font-mono font-bold text-white">{studentData.studentId}</span>
              </p>
            </div>

            <div className="flex flex-wrap items-center gap-3">
              <button
                onClick={onOpenAdmissionSlip}
                className="px-4 py-2.5 rounded-xl bg-white text-blue-900 font-semibold text-xs sm:text-sm shadow-md hover:bg-blue-50 flex items-center gap-2 transition cursor-pointer"
              >
                <Download className="w-4 h-4" />
                <span>Admission Slip (PDF)</span>
              </button>
              <button
                onClick={onEditDetails}
                className="px-4 py-2.5 rounded-xl bg-blue-700/80 hover:bg-blue-700 text-white font-semibold text-xs sm:text-sm border border-blue-500/50 flex items-center gap-2 transition cursor-pointer"
              >
                <User className="w-4 h-4" />
                <span>Edit Profile</span>
              </button>
            </div>
          </div>

          {/* Quick Metrics Bar */}
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 mt-6 pt-6 border-t border-blue-700/50">
            <div>
              <span className="text-[11px] text-blue-200 uppercase tracking-wider block">Semester</span>
              <span className="font-bold text-lg text-white">Semester 01</span>
            </div>
            <div>
              <span className="text-[11px] text-blue-200 uppercase tracking-wider block">Registered Credits</span>
              <span className="font-bold text-lg text-white">{totalCredits} / 24 Max</span>
            </div>
            <div>
              <span className="text-[11px] text-blue-200 uppercase tracking-wider block">Anna Univ Affiliation</span>
              <span className="font-bold text-lg text-emerald-300 flex items-center gap-1">
                <CheckCircle2 className="w-4 h-4" /> Verified
              </span>
            </div>
            <div>
              <span className="text-[11px] text-blue-200 uppercase tracking-wider block">Campus Transport</span>
              <span className="font-bold text-lg text-white">Route 14 (Tuticorin)</span>
            </div>
          </div>
        </div>

        {/* Navigation Tabs */}
        <div className="flex items-center gap-2 border-b border-slate-200 pb-2">
          <button
            onClick={() => setActiveTab("courses")}
            className={`px-4 py-2 rounded-xl text-xs sm:text-sm font-semibold transition cursor-pointer ${
              activeTab === "courses"
                ? "bg-blue-700 text-white shadow-sm"
                : "text-slate-600 hover:bg-slate-100"
            }`}
          >
            Registered Courses ({courses.filter((c) => c.enrolled).length})
          </button>
          <button
            onClick={() => setActiveTab("idcard")}
            className={`px-4 py-2 rounded-xl text-xs sm:text-sm font-semibold transition cursor-pointer ${
              activeTab === "idcard"
                ? "bg-blue-700 text-white shadow-sm"
                : "text-slate-600 hover:bg-slate-100"
            }`}
          >
            Digital Student ID
          </button>
          <button
            onClick={() => setActiveTab("schedule")}
            className={`px-4 py-2 rounded-xl text-xs sm:text-sm font-semibold transition cursor-pointer ${
              activeTab === "schedule"
                ? "bg-blue-700 text-white shadow-sm"
                : "text-slate-600 hover:bg-slate-100"
            }`}
          >
            Orientation & Class Schedule
          </button>
        </div>

        {/* Tab 1: Courses */}
        {activeTab === "courses" && (
          <div className="bg-white rounded-2xl border border-slate-200 shadow-sm p-6 space-y-6">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2">
              <div>
                <h2 className="text-lg font-bold text-slate-900">
                  Semester 1 Course Registrations & Electives
                </h2>
                <p className="text-xs text-slate-500">
                  Anna University Choice Based Credit System (CBCS) Curriculum 2026.
                </p>
              </div>
              <div className="text-right">
                <span className="text-xs font-semibold px-3 py-1 rounded-full bg-blue-50 text-blue-700 border border-blue-200">
                  Total Enrolled: {totalCredits} Credits
                </span>
              </div>
            </div>

            <div className="divide-y divide-slate-100 border border-slate-100 rounded-xl overflow-hidden">
              {courses.map((course) => (
                <div
                  key={course.code}
                  className="p-4 sm:p-5 flex flex-col sm:flex-row sm:items-center justify-between gap-4 hover:bg-slate-50/70 transition"
                >
                  <div className="space-y-1">
                    <div className="flex items-center gap-2">
                      <span className="font-mono text-xs font-bold px-2 py-0.5 rounded bg-slate-100 text-slate-700">
                        {course.code}
                      </span>
                      <span
                        className={`text-[10px] font-semibold px-2 py-0.5 rounded ${
                          course.type === "Practical Lab"
                            ? "bg-purple-50 text-purple-700 border border-purple-200"
                            : course.type === "Elective"
                            ? "bg-amber-50 text-amber-700 border border-amber-200"
                            : "bg-blue-50 text-blue-700 border border-blue-200"
                        }`}
                      >
                        {course.type}
                      </span>
                      <span className="text-xs text-slate-400 font-medium">
                        • {course.credits} Credits
                      </span>
                    </div>
                    <h3 className="font-bold text-slate-900 text-sm">{course.title}</h3>
                    <p className="text-xs text-slate-500">Faculty: {course.faculty}</p>
                  </div>

                  <div className="flex items-center gap-3 self-end sm:self-center">
                    {course.type === "Elective" ? (
                      <button
                        onClick={() => toggleCourseEnrollment(course.code)}
                        className={`px-3 py-1.5 rounded-lg text-xs font-semibold transition cursor-pointer ${
                          course.enrolled
                            ? "bg-emerald-50 text-emerald-700 border border-emerald-300 hover:bg-emerald-100"
                            : "bg-slate-100 text-slate-600 hover:bg-slate-200"
                        }`}
                      >
                        {course.enrolled ? "Enrolled (Click to Drop)" : "Add Elective"}
                      </button>
                    ) : (
                      <span className="inline-flex items-center gap-1 text-xs font-semibold text-emerald-700 bg-emerald-50 px-2.5 py-1 rounded-lg border border-emerald-200">
                        <CheckCircle2 className="w-3.5 h-3.5" /> Compulsory Core
                      </span>
                    )}
                  </div>
                </div>
              ))}
            </div>

            <div className="p-4 rounded-xl bg-blue-50/60 border border-blue-100 text-xs text-blue-800 flex items-start gap-3">
              <Sparkles className="w-4 h-4 text-blue-600 shrink-0 mt-0.5" />
              <span>
                Add/Drop period for Semester 1 courses is open until October 15, 2026. For lab batch changes, consult your faculty advisor Dr. S. Karthikeyan.
              </span>
            </div>
          </div>
        )}

        {/* Tab 2: Digital ID Card */}
        {activeTab === "idcard" && (
          <div className="flex flex-col items-center justify-center p-6 space-y-6">
            <div className="w-full max-w-sm bg-gradient-to-br from-blue-900 via-blue-800 to-indigo-950 text-white rounded-3xl p-6 shadow-2xl border border-blue-600/30 relative overflow-hidden">
              {/* Card Hologram shimmer */}
              <div className="absolute top-0 right-0 left-0 h-1 bg-gradient-to-r from-blue-400 via-amber-300 to-purple-400" />
              <div className="flex items-center justify-between pb-4 border-b border-blue-700/60">
                <div className="flex items-center gap-2">
                  <div className="h-8 w-8 rounded-lg bg-white/10 flex items-center justify-center">
                    <GraduationCap className="w-5 h-5 text-amber-300" />
                  </div>
                  <div>
                    <span className="font-bold text-sm block leading-none">DSCET</span>
                    <span className="text-[8px] text-blue-200 uppercase tracking-widest">
                      Student Identity Card
                    </span>
                  </div>
                </div>
                <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-blue-700/60 text-blue-200">
                  2026–2030
                </span>
              </div>

              {/* Photo & Information */}
              <div className="py-6 flex items-center gap-4">
                <div className="h-20 w-20 rounded-2xl bg-gradient-to-br from-blue-500 to-indigo-600 border-2 border-white/40 flex items-center justify-center shadow-lg text-white font-bold text-2xl">
                  {studentData.fullName.charAt(0)}
                </div>
                <div className="space-y-1 text-left">
                  <h3 className="font-bold text-white text-base leading-tight">
                    {studentData.fullName}
                  </h3>
                  <p className="text-xs text-amber-300 font-semibold">{studentData.department}</p>
                  <p className="text-[11px] font-mono text-blue-200">
                    REG: <strong className="text-white">{studentData.regNo}</strong>
                  </p>
                  <p className="text-[11px] font-mono text-blue-200">
                    ID: <strong className="text-white">{studentData.studentId}</strong>
                  </p>
                </div>
              </div>

              {/* Barcode & Chip */}
              <div className="pt-4 border-t border-blue-700/60 flex items-center justify-between">
                <div className="font-mono text-sm tracking-widest text-blue-200">
                  ||| |||| || |||||| |
                </div>
                <div className="text-right text-[9px] text-blue-300 uppercase">
                  <span>Authorized Registrar</span>
                </div>
              </div>
            </div>

            <div className="flex items-center gap-3">
              <button
                onClick={() => window.print()}
                className="px-4 py-2 bg-slate-900 text-white rounded-xl text-xs font-semibold flex items-center gap-1.5 hover:bg-slate-800 transition cursor-pointer"
              >
                <Printer className="w-3.5 h-3.5" /> Print Physical Badge
              </button>
              <button
                onClick={onOpenAdmissionSlip}
                className="px-4 py-2 bg-blue-700 text-white rounded-xl text-xs font-semibold flex items-center gap-1.5 hover:bg-blue-800 transition cursor-pointer"
              >
                <Download className="w-3.5 h-3.5" /> Download Full Admission Slip
              </button>
            </div>
          </div>
        )}

        {/* Tab 3: Orientation Schedule */}
        {activeTab === "schedule" && (
          <div className="bg-white rounded-2xl border border-slate-200 shadow-sm p-6 space-y-6">
            <div>
              <h2 className="text-lg font-bold text-slate-900">
                First Year Induction & Orientation Calendar
              </h2>
              <p className="text-xs text-slate-500">
                Mandatory AICTE 3-week Student Induction Program (SIP) 2026.
              </p>
            </div>

            <div className="space-y-4">
              <div className="p-4 rounded-xl border border-slate-200 bg-slate-50 flex items-start gap-4">
                <div className="h-10 w-10 rounded-xl bg-blue-700 text-white font-bold flex flex-col items-center justify-center shrink-0">
                  <span className="text-[10px] uppercase leading-none">OCT</span>
                  <span className="text-sm leading-none font-bold">01</span>
                </div>
                <div>
                  <h4 className="font-bold text-slate-900 text-sm">
                    Inauguration Ceremony & Presidential Address
                  </h4>
                  <p className="text-xs text-slate-600 mt-0.5">
                    DSCET Main Auditorium • 09:30 AM – 12:30 PM (Parents welcome).
                  </p>
                  <span className="inline-block mt-2 text-[10px] font-semibold text-blue-700 bg-blue-100/60 px-2 py-0.5 rounded">
                    Dress Code: Formal
                  </span>
                </div>
              </div>

              <div className="p-4 rounded-xl border border-slate-200 bg-slate-50 flex items-start gap-4">
                <div className="h-10 w-10 rounded-xl bg-indigo-700 text-white font-bold flex flex-col items-center justify-center shrink-0">
                  <span className="text-[10px] uppercase leading-none">OCT</span>
                  <span className="text-sm leading-none font-bold">03</span>
                </div>
                <div>
                  <h4 className="font-bold text-slate-900 text-sm">
                    Department Labs Tour & Faculty Mentor Meeting
                  </h4>
                  <p className="text-xs text-slate-600 mt-0.5">
                    {studentData.department} Seminar Hall • 10:00 AM – 03:00 PM.
                  </p>
                  <span className="inline-block mt-2 text-[10px] font-semibold text-indigo-700 bg-indigo-100/60 px-2 py-0.5 rounded">
                    Mentor Allotment
                  </span>
                </div>
              </div>

              <div className="p-4 rounded-xl border border-slate-200 bg-slate-50 flex items-start gap-4">
                <div className="h-10 w-10 rounded-xl bg-emerald-700 text-white font-bold flex flex-col items-center justify-center shrink-0">
                  <span className="text-[10px] uppercase leading-none">OCT</span>
                  <span className="text-sm leading-none font-bold">06</span>
                </div>
                <div>
                  <h4 className="font-bold text-slate-900 text-sm">
                    Commencement of Regular Lecture Classes
                  </h4>
                  <p className="text-xs text-slate-600 mt-0.5">
                    As per Semester 1 Academic Timetable • 08:45 AM onward.
                  </p>
                  <span className="inline-block mt-2 text-[10px] font-semibold text-emerald-700 bg-emerald-100/60 px-2 py-0.5 rounded">
                    Timetable Distributed
                  </span>
                </div>
              </div>
            </div>
          </div>
        )}
      </main>

      {/* Footer */}
      <footer className="w-full border-t border-slate-200 bg-white py-6">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 flex flex-col sm:flex-row items-center justify-between text-xs text-slate-500 gap-3">
          <p>© 2026 DSCET College of Engineering & Technology. All rights reserved.</p>
          <div className="flex items-center gap-4">
            <button
              onClick={onOpenAdmissionSlip}
              className="hover:underline text-blue-700 font-semibold"
            >
              Print Admission Slip
            </button>
            <span>•</span>
            <button onClick={onEditDetails} className="hover:underline">
              Edit Basic Profile
            </button>
            <span>•</span>
            <button onClick={onSignOut} className="hover:underline text-red-600">
              Sign Out
            </button>
          </div>
        </div>
      </footer>
    </div>
  );
}
