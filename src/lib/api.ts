export interface StudentRecord {
  id?: string;
  fullName: string;
  regNo: string;
  studentId: string;
  department: string;
  email: string;
  phone: string;
  academicYear?: string;
  batch?: string;
  quota?: string;
  enrolledCourses?: string[];
  status?: string;
  createdAt?: string;
  updatedAt?: string;
}

export const studentApi = {
  async getHealth() {
    try {
      const res = await fetch('/api/health');
      return await res.json();
    } catch (e) {
      console.warn("Backend health check failed:", e);
      return null;
    }
  },

  async getAllStudents(): Promise<{ total: number; students: StudentRecord[] }> {
    try {
      const res = await fetch('/api/students');
      if (!res.ok) throw new Error('Failed to fetch students');
      const data = await res.json();
      return data;
    } catch (e) {
      console.warn("Error fetching students:", e);
      return { total: 0, students: [] };
    }
  },

  async lookupStudent(identifier: { email?: string; regNo?: string }): Promise<StudentRecord | null> {
    try {
      const params = new URLSearchParams();
      if (identifier.email) params.append('email', identifier.email);
      if (identifier.regNo) params.append('regNo', identifier.regNo);

      const res = await fetch(`/api/students/lookup?${params.toString()}`);
      if (!res.ok) return null;
      const data = await res.json();
      return data.student || null;
    } catch (e) {
      console.warn("Lookup failed:", e);
      return null;
    }
  },

  async registerStudent(studentData: StudentRecord): Promise<{ success: boolean; student: StudentRecord; message?: string }> {
    try {
      const res = await fetch('/api/students/register', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(studentData),
      });
      const data = await res.json();
      if (!res.ok) throw new Error(data.message || 'Registration failed');
      return data;
    } catch (e) {
      console.error("Save to backend failed:", e);
      throw e;
    }
  },

  async updateCourses(studentIdentifier: string, enrolledCourses: string[]) {
    try {
      const res = await fetch(`/api/students/${encodeURIComponent(studentIdentifier)}/courses`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ enrolledCourses }),
      });
      return await res.json();
    } catch (e) {
      console.error("Course update failed:", e);
      throw e;
    }
  }
};
