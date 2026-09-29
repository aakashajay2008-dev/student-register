import React, { useState, useEffect } from "react";
import { SignInStep } from "@/src/components/portal/sign-in-step";
import { BasicDetailsStep, StudentFormData } from "@/src/components/portal/basic-details-step";
import { SuccessModal } from "@/src/components/portal/success-modal";
import { AdmissionSlipModal } from "@/src/components/portal/admission-slip-modal";
import { StudentDashboard } from "@/src/components/portal/student-dashboard";

export default function DSCETRegistrationApp() {
  const [currentStep, setCurrentStep] = useState<"auth" | "form" | "dashboard">("auth");
  const [userEmail, setUserEmail] = useState<string>("kaakash58266@gmail.com");
  const [isSuccessOpen, setIsSuccessOpen] = useState<boolean>(false);
  const [isAdmissionSlipOpen, setIsAdmissionSlipOpen] = useState<boolean>(false);

  const [submittedData, setSubmittedData] = useState<StudentFormData>(() => {
    try {
      const saved = localStorage.getItem("dscet_student_data");
      if (saved) return JSON.parse(saved);
    } catch {
      // ignore
    }
    return {
      fullName: "Aakash K",
      regNo: "310525104001",
      studentId: "001",
      department: "Computer Science & Engineering",
      email: "kaakash58266@gmail.com",
      phone: "807XXXXX69",
      academicYear: "2026–2027",
      batch: "2026–2030",
      quota: "Government Quota (TNEA Merit)",
    };
  });

  // Save to localStorage whenever submittedData updates
  useEffect(() => {
    try {
      localStorage.setItem("dscet_student_data", JSON.stringify(submittedData));
    } catch {
      // ignore
    }
  }, [submittedData]);

  const handleAuthSuccess = (email: string) => {
    setUserEmail(email);
    // If student switched or entered a specific email, update form details
    setSubmittedData((prev) => ({
      ...prev,
      email: email,
      fullName: email.includes("priya")
        ? "Priyadharshini M"
        : email.includes("vignesh")
        ? "Vignesh R"
        : prev.fullName,
      regNo: email.includes("priya")
        ? "310525243015"
        : email.includes("vignesh")
        ? "310525106042"
        : prev.regNo,
      department: email.includes("priya")
        ? "Artificial Intelligence & Data Science"
        : email.includes("vignesh")
        ? "Electronics & Communication Engineering"
        : prev.department,
    }));
    setCurrentStep("form");
  };

  const handleFormSubmit = (data: StudentFormData) => {
    setSubmittedData(data);
    setIsSuccessOpen(true);
  };

  const handleGoToDashboard = () => {
    setIsSuccessOpen(false);
    setCurrentStep("dashboard");
  };

  const handleOpenAdmissionSlip = () => {
    setIsAdmissionSlipOpen(true);
  };

  return (
    <div className="min-h-screen bg-slate-950 font-sans antialiased text-slate-900">
      {currentStep === "auth" && (
        <SignInStep
          onSuccess={handleAuthSuccess}
          onOpenRegistrarDesk={() => {
            alert(
              "DSCET Registrar Desk: Admissions Office, Anna University Affiliated Code: 3105. Phone: +91 4639 242482, Email: registrar@dscet.ac.in"
            );
          }}
        />
      )}

      {currentStep === "form" && (
        <BasicDetailsStep
          initialEmail={userEmail}
          currentData={submittedData}
          onBack={() => setCurrentStep("auth")}
          onSubmit={handleFormSubmit}
          onNavigateCourses={() => setCurrentStep("dashboard")}
        />
      )}

      {currentStep === "dashboard" && (
        <StudentDashboard
          studentData={submittedData}
          onEditDetails={() => setCurrentStep("form")}
          onOpenAdmissionSlip={() => setIsAdmissionSlipOpen(true)}
          onSignOut={() => setCurrentStep("auth")}
        />
      )}

      {/* Step 3: Success Verified Celebration Modal */}
      <SuccessModal
        isOpen={isSuccessOpen}
        onClose={() => setIsSuccessOpen(false)}
        onOpenAdmissionSlip={handleOpenAdmissionSlip}
        onGoToDashboard={handleGoToDashboard}
        data={submittedData}
      />

      {/* Official Printable Admission Slip Modal */}
      <AdmissionSlipModal
        isOpen={isAdmissionSlipOpen}
        onClose={() => setIsAdmissionSlipOpen(false)}
        data={submittedData}
      />
    </div>
  );
}
