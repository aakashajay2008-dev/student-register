import React, { useRef } from "react";
import { X, Printer, Download, CheckCircle2, ShieldCheck } from "lucide-react";
import { StudentFormData } from "./basic-details-step";

interface AdmissionSlipModalProps {
  isOpen: boolean;
  onClose: () => void;
  data: StudentFormData;
}

export function AdmissionSlipModal({ isOpen, onClose, data }: AdmissionSlipModalProps) {
  const slipRef = useRef<HTMLDivElement>(null);

  if (!isOpen) return null;

  const handlePrint = () => {
    window.print();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-6 bg-slate-950/80 backdrop-blur-sm overflow-y-auto animate-fadeUp">
      <div className="relative w-full max-w-2xl bg-white rounded-2xl shadow-2xl border border-slate-200 overflow-hidden my-auto">
        {/* Modal Controls Toolbar (Hidden when printing) */}
        <div className="no-print bg-slate-900 text-white px-6 py-3.5 flex items-center justify-between border-b border-slate-800">
          <div className="flex items-center gap-2">
            <span className="h-2 w-2 rounded-full bg-emerald-400 animate-pulse" />
            <span className="text-xs font-semibold tracking-wide uppercase">Official Enrollment Slip (Provisional)</span>
          </div>
          <div className="flex items-center gap-2">
            <button
              onClick={handlePrint}
              className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-blue-600 hover:bg-blue-500 text-xs font-semibold text-white transition cursor-pointer"
            >
              <Printer className="w-3.5 h-3.5" />
              <span>Print / Save PDF</span>
            </button>
            <button
              onClick={onClose}
              className="p-1 rounded-lg text-slate-400 hover:text-white hover:bg-slate-800 transition cursor-pointer"
            >
              <X className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* The Printable Slip Document */}
        <div ref={slipRef} className="p-8 sm:p-10 text-slate-800 bg-white relative">
          {/* Watermark */}
          <div className="absolute inset-0 flex items-center justify-center opacity-[0.03] pointer-events-none select-none">
            <span className="text-8xl font-black text-slate-900 rotate-[-25deg]">DSCET 2026</span>
          </div>

          {/* Letterhead */}
          <div className="text-center pb-6 border-b-2 border-slate-900/80">
            <div className="flex items-center justify-center gap-3 mb-2">
              <div className="h-12 w-12 rounded-xl bg-blue-800 flex items-center justify-center shadow-md">
                <svg viewBox="0 0 48 48" fill="none" className="w-7 h-7">
                  <path d="M24 10L37 18L24 26L11 18L24 10Z" fill="#FFFFFF" />
                  <path d="M16 21V30.5C16 33 19.5 35.5 24 35.5C28.5 35.5 32 33 32 30.5V21" stroke="#93C5FD" strokeWidth="2.5" strokeLinecap="round" />
                  <path d="M37 19V28.5" stroke="#FDE047" strokeWidth="2.5" strokeLinecap="round" />
                  <circle cx="37" cy="30" r="1.5" fill="#FDE047" />
                </svg>
              </div>
              <div className="text-left">
                <h2 className="text-xl sm:text-2xl font-black text-slate-900 tracking-tight leading-none">
                  DSCET COLLEGE OF ENGINEERING & TECHNOLOGY
                </h2>
                <p className="text-[11px] font-semibold text-slate-600 uppercase tracking-widest mt-1">
                  Accredited by NBA & NAAC 'A' Grade • Affiliated to Anna University
                </p>
                <p className="text-[10px] text-slate-500">
                  Tiruchendur Road, Tamil Nadu – 628215 • Web: www.dscet.ac.in
                </p>
              </div>
            </div>
            <div className="inline-block mt-3 px-4 py-1 rounded bg-slate-100 border border-slate-300 text-xs font-bold text-slate-800 uppercase tracking-wider">
              PROVISIONAL ADMISSION & ENROLLMENT ACKNOWLEDGMENT SLIP (2026–2027)
            </div>
          </div>

          {/* Verification Barcode & Reference */}
          <div className="flex flex-col sm:flex-row sm:items-center justify-between py-4 border-b border-dashed border-slate-300 text-xs text-slate-600 gap-2">
            <div>
              <span className="font-semibold text-slate-800">Enrollment Ref No:</span>{" "}
              <span className="font-mono font-bold text-blue-800">DSCET-ADM-2026-{data.studentId || "001"}</span>
            </div>
            <div className="flex items-center gap-2">
              <span className="text-[10px] text-slate-500">Authentication Barcode:</span>
              <div className="font-mono text-base tracking-widest bg-slate-100 px-2 py-0.5 rounded border border-slate-200">
                ||||||||| | ||||| |||| || |
              </div>
            </div>
          </div>

          {/* Details Grid */}
          <div className="py-6 space-y-4">
            <h4 className="text-xs font-bold uppercase tracking-wider text-slate-500">Student Profile Information</h4>
            <div className="grid grid-cols-2 gap-4 text-xs bg-slate-50/80 p-4 rounded-xl border border-slate-200">
              <div>
                <span className="text-slate-500 block text-[11px]">Candidate Full Name:</span>
                <span className="font-bold text-slate-900 text-sm">{data.fullName}</span>
              </div>
              <div>
                <span className="text-slate-500 block text-[11px]">University Registration No (Reg No):</span>
                <span className="font-bold font-mono text-blue-900 text-sm">{data.regNo}</span>
              </div>
              <div>
                <span className="text-slate-500 block text-[11px]">Institute Student ID:</span>
                <span className="font-bold font-mono text-slate-900">{data.studentId}</span>
              </div>
              <div>
                <span className="text-slate-500 block text-[11px]">Department / Degree Stream:</span>
                <span className="font-bold text-slate-900">{data.department}</span>
              </div>
              <div>
                <span className="text-slate-500 block text-[11px]">Registered Institutional Email:</span>
                <span className="font-mono text-slate-800">{data.email}</span>
              </div>
              <div>
                <span className="text-slate-500 block text-[11px]">Contact Mobile No:</span>
                <span className="font-mono text-slate-800">{data.phone || "Not Provided"}</span>
              </div>
              <div>
                <span className="text-slate-500 block text-[11px]">Admission Intake Batch:</span>
                <span className="font-semibold text-slate-800">B.E. / B.Tech (2026–2030 Batch)</span>
              </div>
              <div>
                <span className="text-slate-500 block text-[11px]">Quota / Admission Category:</span>
                <span className="font-semibold text-slate-800">{data.quota || "Government Quota (TNEA)"}</span>
              </div>
            </div>
          </div>

          {/* Verification Badge */}
          <div className="p-3.5 rounded-xl bg-emerald-50 border border-emerald-200 flex items-center justify-between text-xs text-emerald-900">
            <div className="flex items-center gap-2">
              <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" />
              <span><strong>Status:</strong> Digital Verification Completed & Uploaded to Anna University Portal.</span>
            </div>
            <span className="font-mono text-[10px] text-emerald-700 bg-white px-2 py-0.5 rounded border border-emerald-300">
              SEAL: VERIFIED
            </span>
          </div>

          {/* Signatures & Seal */}
          <div className="pt-10 flex items-end justify-between text-xs border-t border-slate-200 mt-6">
            <div className="text-left space-y-1">
              <div className="w-20 h-20 rounded-full border-2 border-dashed border-blue-900/30 flex items-center justify-center text-[10px] font-bold text-blue-900 rotate-[-15deg] p-1 text-center bg-blue-50/30">
                DSCET<br />REGISTRAR<br />OFFICE SEAL
              </div>
              <p className="text-[10px] text-slate-400 pt-1">System Generated on 29-Sep-2026</p>
            </div>

            <div className="text-right space-y-1">
              <div className="font-serif italic text-base font-bold text-blue-950 tracking-wider">
                Dr. M. S. Rathnam, Ph.D.
              </div>
              <div className="h-0.5 w-36 bg-slate-900 ml-auto" />
              <p className="font-bold text-slate-900">Registrar & Controller of Admissions</p>
              <p className="text-[10px] text-slate-500">DSCET College of Engineering</p>
            </div>
          </div>
        </div>

        {/* Bottom dismiss */}
        <div className="no-print bg-slate-50 px-6 py-4 border-t border-slate-200 flex items-center justify-between">
          <p className="text-xs text-slate-500">
            Present this slip along with original 10th & 12th Marksheets during orientation week.
          </p>
          <button
            onClick={onClose}
            className="px-4 py-2 bg-slate-800 hover:bg-slate-900 text-white rounded-xl text-xs font-semibold transition cursor-pointer"
          >
            Done
          </button>
        </div>
      </div>
    </div>
  );
}
