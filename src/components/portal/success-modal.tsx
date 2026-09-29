import React, { useEffect } from "react";
import { Check, Download, ArrowRight, X, FileText } from "lucide-react";
import confetti from "canvas-confetti";
import { StudentFormData } from "./basic-details-step";

interface SuccessModalProps {
  isOpen: boolean;
  onClose: () => void;
  onOpenAdmissionSlip: () => void;
  onGoToDashboard: () => void;
  data: StudentFormData;
}

export function SuccessModal({
  isOpen,
  onClose,
  onOpenAdmissionSlip,
  onGoToDashboard,
  data,
}: SuccessModalProps) {
  useEffect(() => {
    if (isOpen) {
      // Trigger subtle celebration confetti
      try {
        confetti({
          particleCount: 90,
          spread: 75,
          origin: { y: 0.6 },
          colors: ["#1e40af", "#3b82f6", "#10b981", "#8b5cf6"],
        });
      } catch (err) {
        console.warn("Confetti error:", err);
      }
    }
  }, [isOpen]);

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/70 backdrop-blur-md animate-fadeUp">
      <div className="relative w-full max-w-lg bg-white rounded-3xl p-6 sm:p-10 shadow-2xl border border-slate-100 text-center space-y-6">
        {/* Dismiss Button */}
        <button
          onClick={onClose}
          className="absolute top-5 right-5 text-slate-400 hover:text-slate-600 p-1 rounded-full hover:bg-slate-100 transition cursor-pointer"
        >
          <X className="w-5 h-5" />
        </button>

        {/* Pulse Checkmark Badge */}
        <div className="mx-auto w-20 h-20 rounded-full bg-emerald-50 border border-emerald-100 flex items-center justify-center relative">
          <div className="absolute inset-0 rounded-full bg-emerald-400/20 animate-ping" />
          <div className="w-12 h-12 rounded-full bg-emerald-500 text-white flex items-center justify-center shadow-lg shadow-emerald-500/30">
            <Check className="w-6 h-6 stroke-[3]" />
          </div>
        </div>

        <div>
          <span className="inline-block px-3 py-1 rounded-full text-xs font-semibold bg-emerald-50 text-emerald-700 border border-emerald-200 mb-2">
            Academic Year 2026–2027
          </span>
          <h2 className="text-2xl sm:text-3xl font-bold text-slate-900 tracking-tight">
            Registration Successful!
          </h2>
          <p className="text-sm text-slate-500 mt-2">
            Your registration with DSCET has been successfully submitted and verified with the Office of the Registrar.
          </p>
        </div>

        {/* Summary Card */}
        <div className="bg-slate-50 border border-slate-200/80 rounded-2xl p-5 text-left text-sm space-y-3">
          <div className="flex justify-between items-center pb-2 border-b border-slate-200">
            <span className="text-slate-500">Enrollment Status</span>
            <span className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full text-xs font-semibold bg-emerald-100 text-emerald-800">
              <span className="w-1.5 h-1.5 rounded-full bg-emerald-500" /> Verified & Enrolled
            </span>
          </div>
          <div className="flex justify-between items-center">
            <span className="text-slate-500">Student Name</span>
            <span className="font-semibold text-slate-900">{data.fullName}</span>
          </div>
          <div className="flex justify-between items-center">
            <span className="text-slate-500">Registration No.</span>
            <span className="font-semibold text-slate-900 font-mono">{data.regNo}</span>
          </div>
          <div className="flex justify-between items-center">
            <span className="text-slate-500">Student ID</span>
            <span className="font-semibold text-slate-900 font-mono">{data.studentId}</span>
          </div>
          <div className="flex justify-between items-center">
            <span className="text-slate-500">Department</span>
            <span className="font-semibold text-slate-900 text-right">{data.department}</span>
          </div>
        </div>

        {/* Action Controls */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-2">
          <button
            onClick={onOpenAdmissionSlip}
            className="h-11 rounded-xl border border-slate-300 text-slate-700 font-semibold hover:bg-slate-50 flex items-center justify-center gap-2 transition cursor-pointer"
          >
            <Download className="w-4 h-4" /> Admission Slip
          </button>
          <button
            onClick={onGoToDashboard}
            className="h-11 rounded-xl bg-blue-700 hover:bg-blue-800 text-white font-semibold flex items-center justify-center gap-2 shadow-lg shadow-blue-700/20 transition cursor-pointer"
          >
            <span>Go to Dashboard</span>
            <ArrowRight className="w-4 h-4" />
          </button>
        </div>
      </div>
    </div>
  );
}
