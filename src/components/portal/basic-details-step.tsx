import React, { useState, useEffect } from "react";
import {
  User,
  Hash,
  CreditCard,
  Mail,
  Phone,
  ArrowLeft,
  CheckCircle2,
  Info,
  HelpCircle,
  FileCheck,
  Building2,
  Calendar
} from "lucide-react";
import { DscetCrest } from "@/src/components/dscet-crest";
import { ButtonColorful } from "@/src/components/ui/button-colorful";

export interface StudentFormData {
  fullName: string;
  regNo: string;
  studentId: string;
  department: string;
  email: string;
  phone: string;
  academicYear?: string;
  batch?: string;
  bloodGroup?: string;
  quota?: string;
}

interface BasicDetailsStepProps {
  onBack: () => void;
  onSubmit: (data: StudentFormData) => void;
  onNavigateCourses?: () => void;
  initialEmail?: string;
  currentData?: StudentFormData;
}

export function BasicDetailsStep({
  onBack,
  onSubmit,
  onNavigateCourses,
  initialEmail = "kaakash58266@gmail.com",
  currentData,
}: BasicDetailsStepProps) {
  const [formData, setFormData] = useState<StudentFormData>(() => {
    if (currentData) return currentData;
    return {
      fullName: "Aakash K",
      regNo: "310525104001",
      studentId: "001",
      department: "Computer Science & Engineering",
      email: initialEmail,
      phone: "807XXXXX69",
      academicYear: "2026–2027",
      batch: "2026–2030",
      bloodGroup: "O+",
      quota: "Government Quota (TNEA Merit)",
    };
  });

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [showSupportModal, setShowSupportModal] = useState(false);

  // Sync if initialEmail changes and formData.email is empty or default
  useEffect(() => {
    if (initialEmail && initialEmail !== "student@dscet.ac.in") {
      setFormData((prev) => ({
        ...prev,
        email: initialEmail,
        fullName: initialEmail.includes("priya")
          ? "Priyadharshini M"
          : prev.fullName,
        regNo: initialEmail.includes("priya")
          ? "310525243015"
          : prev.regNo,
        department: initialEmail.includes("priya")
          ? "Artificial Intelligence & Data Science"
          : prev.department,
      }));
    }
  }, [initialEmail]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    setTimeout(() => {
      setIsSubmitting(false);
      onSubmit(formData);
    }, 450);
  };

  return (
    <div className="min-h-screen bg-[#faf8ff] text-slate-800 flex flex-col justify-between">
      {/* Top Navbar */}
      <header className="w-full bg-white border-b border-slate-200 shadow-sm sticky top-0 z-20">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 h-16 flex items-center justify-between">
          <DscetCrest />
          <nav className="flex items-center gap-4 sm:gap-6 text-xs sm:text-sm font-medium">
            <span className="font-semibold text-blue-700 flex items-center gap-1.5 border-b-2 border-blue-700 py-1">
              Step 1: Info
            </span>
            <button
              onClick={() => {
                if (onNavigateCourses) onNavigateCourses();
              }}
              className="text-slate-500 hover:text-blue-700 transition cursor-pointer"
            >
              Step 2: Courses
            </button>
            <button
              onClick={() => setShowSupportModal(true)}
              className="text-slate-500 hover:text-blue-700 transition cursor-pointer flex items-center gap-1"
            >
              <HelpCircle className="w-3.5 h-3.5" /> Support
            </button>
          </nav>
        </div>
      </header>

      {/* Main Form Container */}
      <main className="max-w-4xl mx-auto px-4 py-8 sm:py-10 w-full flex-1">
        {/* Stepper Status Badge */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between mb-8 pb-4 border-b border-slate-200 gap-3">
          <div className="flex items-center gap-3">
            <span className="h-8 w-8 rounded-full bg-blue-700 text-white font-bold text-sm flex items-center justify-center shadow-sm">
              1
            </span>
            <div>
              <p className="text-xs uppercase tracking-wider font-semibold text-blue-700">Step 01 of 03</p>
              <h2 className="text-sm font-semibold text-slate-900">Basic Student Profile</h2>
            </div>
          </div>
          <div className="flex items-center gap-2 text-xs font-medium text-emerald-700 bg-emerald-50 px-3 py-1 rounded-full border border-emerald-200 self-start sm:self-auto">
            <CheckCircle2 className="w-3.5 h-3.5" /> SSL Secured Session • Port 443
          </div>
        </div>

        {/* Card Form */}
        <div className="bg-white rounded-2xl border border-slate-200 shadow-xl p-6 sm:p-10 space-y-8 transition-all">
          <div>
            <div className="flex items-center gap-2 mb-3 flex-wrap">
              <span className="inline-block px-3 py-1 rounded-full text-xs font-semibold bg-blue-50 text-blue-700 border border-blue-200">
                Academic Intake 2026–2027
              </span>
              <span className="inline-flex items-center gap-1 px-3 py-1 rounded-full text-xs font-medium bg-slate-100 text-slate-600 border border-slate-200">
                <Building2 className="w-3 h-3 text-slate-500" /> Anna University Affiliated
              </span>
            </div>
            <h1 className="text-2xl sm:text-3xl font-bold text-slate-900 tracking-tight">
              Student Basic Details
            </h1>
            <p className="text-slate-500 text-sm mt-1">
              Please enter your academic registration information to complete enrollment.
            </p>
          </div>

          <form onSubmit={handleSubmit} className="space-y-6">
            {/* Full Name */}
            <div>
              <div className="flex justify-between items-center mb-1.5">
                <label className="text-sm font-semibold text-slate-700">Full Name *</label>
                <span className="text-xs text-slate-400">As on official identification</span>
              </div>
              <div className="relative">
                <User className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
                <input
                  type="text"
                  value={formData.fullName}
                  onChange={(e) => setFormData({ ...formData, fullName: e.target.value })}
                  className="w-full h-12 pl-10 pr-4 rounded-xl border border-slate-200 bg-slate-50/60 font-medium text-slate-900 focus:bg-white focus:outline-none focus:ring-2 focus:ring-blue-600 transition"
                  placeholder="Student Full Name"
                  required
                />
              </div>
            </div>

            {/* Reg No + Student ID */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
              <div>
                <div className="flex justify-between items-center mb-1.5">
                  <label className="text-sm font-semibold text-slate-700">Registration Number (Reg No) *</label>
                </div>
                <div className="relative">
                  <Hash className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
                  <input
                    type="text"
                    value={formData.regNo}
                    onChange={(e) => setFormData({ ...formData, regNo: e.target.value })}
                    className="w-full h-12 pl-10 pr-4 rounded-xl border border-slate-200 bg-slate-50/60 font-mono font-medium text-slate-900 focus:bg-white focus:outline-none focus:ring-2 focus:ring-blue-600 transition"
                    placeholder="310525104001"
                    required
                  />
                </div>
                <span className="text-[11px] text-slate-400 mt-1 block">Issued via Admissions Letter</span>
              </div>

              <div>
                <div className="flex justify-between items-center mb-1.5">
                  <label className="text-sm font-semibold text-slate-700">Student ID Number *</label>
                </div>
                <div className="relative">
                  <CreditCard className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
                  <input
                    type="text"
                    value={formData.studentId}
                    onChange={(e) => setFormData({ ...formData, studentId: e.target.value })}
                    className="w-full h-12 pl-10 pr-4 rounded-xl border border-slate-200 bg-slate-50/60 font-mono font-medium text-slate-900 focus:bg-white focus:outline-none focus:ring-2 focus:ring-blue-600 transition"
                    placeholder="001"
                    required
                  />
                </div>
                <span className="text-[11px] text-slate-400 mt-1 block">Campus card identifier</span>
              </div>
            </div>

            {/* Department + Email */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
              <div>
                <label className="text-sm font-semibold text-slate-700 block mb-1.5">Department & Stream *</label>
                <select
                  value={formData.department}
                  onChange={(e) => setFormData({ ...formData, department: e.target.value })}
                  className="w-full h-12 px-4 rounded-xl border border-slate-200 bg-slate-50/60 font-medium text-slate-900 focus:bg-white focus:outline-none focus:ring-2 focus:ring-blue-600 transition"
                  required
                >
                  <option>Computer Science & Engineering</option>
                  <option>Artificial Intelligence & Data Science</option>
                  <option>Electronics & Communication Engineering</option>
                  <option>Electrical & Electronics Engineering</option>
                  <option>Mechanical Engineering</option>
                  <option>Civil Engineering</option>
                  <option>Information Technology</option>
                </select>
              </div>

              <div>
                <div className="flex justify-between items-center mb-1.5">
                  <label className="text-sm font-semibold text-slate-700">Email Address *</label>
                  <span className="text-xs font-semibold text-emerald-600 flex items-center gap-1">
                    <CheckCircle2 className="w-3 h-3" /> Verified
                  </span>
                </div>
                <div className="relative">
                  <Mail className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
                  <input
                    type="email"
                    value={formData.email}
                    onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                    className="w-full h-12 pl-10 pr-4 rounded-xl border border-slate-200 bg-slate-50/60 font-medium text-slate-900 focus:bg-white focus:outline-none focus:ring-2 focus:ring-blue-600 transition"
                    placeholder="student@dscet.ac.in"
                    required
                  />
                </div>
              </div>
            </div>

            {/* Phone & Extra Profile Metadata */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
              <div>
                <div className="flex justify-between items-center mb-1.5">
                  <label className="text-sm font-semibold text-slate-700">Phone Number</label>
                  <span className="text-xs text-slate-400">Optional • For SMS alerts</span>
                </div>
                <div className="relative">
                  <Phone className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
                  <input
                    type="tel"
                    value={formData.phone}
                    onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                    className="w-full h-12 pl-10 pr-4 rounded-xl border border-slate-200 bg-slate-50/60 font-medium text-slate-900 focus:bg-white focus:outline-none focus:ring-2 focus:ring-blue-600 transition"
                    placeholder="807XXXXX69"
                  />
                </div>
              </div>

              <div>
                <div className="flex justify-between items-center mb-1.5">
                  <label className="text-sm font-semibold text-slate-700">Admission Quota Category</label>
                  <span className="text-xs text-slate-400">Verification Verified</span>
                </div>
                <select
                  value={formData.quota || "Government Quota (TNEA Merit)"}
                  onChange={(e) => setFormData({ ...formData, quota: e.target.value })}
                  className="w-full h-12 px-4 rounded-xl border border-slate-200 bg-slate-50/60 font-medium text-slate-900 focus:bg-white focus:outline-none focus:ring-2 focus:ring-blue-600 transition"
                >
                  <option>Government Quota (TNEA Merit)</option>
                  <option>Management Quota (Consortium)</option>
                  <option>Lateral Entry (Diploma Direct 2nd Year)</option>
                  <option>First Graduate Concession Quota</option>
                  <option>Sports Merit Scholarship Quota</option>
                </select>
              </div>
            </div>

            {/* Registrar Information Notice */}
            <div className="flex items-start gap-3 p-4 rounded-xl bg-blue-50/70 border border-blue-100 text-xs text-blue-900 leading-relaxed">
              <Info className="w-4 h-4 text-blue-600 shrink-0 mt-0.5" />
              <span>
                Your details will be synchronized directly with the DSCET Office of the Registrar. Changes to Registration numbers require College Department Dean authorization after submission.
              </span>
            </div>

            {/* Actions Bar */}
            <div className="pt-6 border-t border-slate-100 flex items-center justify-between">
              <button
                type="button"
                onClick={onBack}
                className="flex items-center gap-2 text-sm font-semibold text-slate-600 hover:text-slate-900 px-4 py-2 rounded-lg hover:bg-slate-100 transition cursor-pointer"
              >
                <ArrowLeft className="w-4 h-4" /> Back to Sign In
              </button>

              {/* 21st.dev Gradient Glow Button */}
              <ButtonColorful
                label="Submit & Verify"
                type="submit"
                loading={isSubmitting}
              />
            </div>
          </form>
        </div>
      </main>

      {/* Support Modal */}
      {showSupportModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/60 backdrop-blur-sm animate-fadeUp">
          <div className="bg-white rounded-2xl max-w-md w-full p-6 space-y-4 shadow-2xl border border-slate-200">
            <div className="flex items-center justify-between pb-2 border-b border-slate-100">
              <h3 className="font-bold text-slate-900 text-base flex items-center gap-2">
                <HelpCircle className="w-5 h-5 text-blue-600" />
                Student Support & Admissions Helpdesk
              </h3>
            </div>
            <div className="space-y-3 text-xs text-slate-600">
              <p>
                Having difficulties with your registration number, certificate upload, or course stream allocations?
              </p>
              <div className="bg-slate-50 p-3 rounded-xl border border-slate-200 space-y-1.5 font-mono text-[11px]">
                <p><strong className="text-slate-700">Admissions Cell:</strong> +91 4639 242482</p>
                <p><strong className="text-slate-700">Registrar Email:</strong> registrar@dscet.ac.in</p>
                <p><strong className="text-slate-700">Office Timings:</strong> Mon - Sat (9:00 AM - 4:45 PM)</p>
                <p><strong className="text-slate-700">Campus:</strong> DSCET Campus, Tiruchendur Highway, TN</p>
              </div>
            </div>
            <div className="flex justify-end pt-2">
              <button
                onClick={() => setShowSupportModal(false)}
                className="px-4 py-2 text-xs font-semibold bg-blue-700 text-white rounded-lg hover:bg-blue-800 transition cursor-pointer"
              >
                Understood
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Footer */}
      <footer className="w-full border-t border-slate-200 bg-white py-6">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 flex flex-col sm:flex-row items-center justify-between text-xs text-slate-500 gap-3">
          <p>© 2026 DSCET College of Engineering & Technology. All rights reserved.</p>
          <div className="flex items-center gap-4 flex-wrap">
            <button
              onClick={() => alert("DSCET Student Privacy Policy: Encrypted under college bylaws.")}
              className="hover:underline hover:text-slate-700"
            >
              Privacy Policy
            </button>
            <span>•</span>
            <button
              onClick={() => alert("Terms of Enrollment: Candidates must complete orientation within 14 days.")}
              className="hover:underline hover:text-slate-700"
            >
              Terms of Enrollment
            </button>
            <span>•</span>
            <button
              onClick={() => alert("Form Instructions: Keep original marksheets ready for college physical verification.")}
              className="hover:underline hover:text-slate-700 flex items-center gap-1"
            >
              <FileCheck className="w-3.5 h-3.5" /> Form Instructions (PDF)
            </button>
          </div>
        </div>
      </footer>
    </div>
  );
}
