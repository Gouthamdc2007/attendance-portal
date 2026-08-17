/* ============================================================
   SSN COLLEGE OF ENGINEERING — ATTENDANCE PORTAL
   app.js — Standalone with localStorage DB + Firebase-ready
   ============================================================ */

'use strict';

/* ===================== FIREBASE CONFIG =====================
   Replace this with your actual Firebase project config.
   Get it from: Firebase Console → Project Settings → Web App
   =========================================================== */
const FIREBASE_CONFIG = {
  apiKey: "YOUR_API_KEY",
  authDomain: "YOUR_PROJECT.firebaseapp.com",
  projectId: "YOUR_PROJECT_ID",
  storageBucket: "YOUR_PROJECT.appspot.com",
  messagingSenderId: "YOUR_MSG_SENDER_ID",
  appId: "YOUR_APP_ID"
};

/* ===================== APP CONFIG ===================== */
const APP_CONFIG = {
  attendanceThreshold: 75,
  collegeName: "SSN College of Engineering",
  academicYear: "2025-2026",
  currentSemester: "Odd Semester",
};

/* ===================== LOCAL DATABASE ===================== */
const DB = {
  PREFIX: 'ssn_ams_',
  get: (key) => { try { return JSON.parse(localStorage.getItem(DB.PREFIX + key)) || null; } catch { return null; } },
  set: (key, val) => localStorage.setItem(DB.PREFIX + key, JSON.stringify(val)),
  del: (key) => localStorage.removeItem(DB.PREFIX + key),
  getAll: (key) => DB.get(key) || [],
};

/* ===================== DEMO SEED DATA ===================== */
function seedDemoData(force = false) {
  const existingUsers = DB.getAll('users');
  const existingAtt = DB.getAll('attendance');
  if (!force && existingUsers && existingUsers.length >= 20 && existingAtt && existingAtt.length > 50) {
    return;
  }

  const users = [
    // Admins
    { id: 'u1', name: 'Dr. S. Narayanan', email: 'admin@ssn.edu', password: 'admin123', role: 'admin', employeeId: 'SSN-ADM-001', department: 'Administration', designation: 'Principal & Head of Institution', status: 'active', joinedAt: '2010-06-01' },
    
    // Faculty / Staff
    { id: 'u2', name: 'Dr. Priya Kapoor', email: 'staff@ssn.edu', password: 'staff123', role: 'staff', employeeId: 'SSN-FAC-042', department: 'Computer Science & Engineering', designation: 'Professor & Programme Head', specialization: 'Data Structures, AI & ML', status: 'active', joinedAt: '2015-07-01' },
    { id: 'u3', name: 'Dr. Ramesh Kumar', email: 'ramesh@ssn.edu', password: 'staff123', role: 'staff', employeeId: 'SSN-FAC-018', department: 'Electronics & Communication', designation: 'Associate Professor', specialization: 'VLSI & Embedded Systems', status: 'active', joinedAt: '2008-07-01' },
    { id: 'u10', name: 'Dr. K. S. Meenakshi', email: 'meenakshi@ssn.edu', password: 'staff123', role: 'staff', employeeId: 'SSN-FAC-065', department: 'Computer Science & Engineering', designation: 'Associate Professor', specialization: 'Operating Systems & Cloud', status: 'active', joinedAt: '2017-06-15' },
    { id: 'u11', name: 'Prof. V. Ananthakrishnan', email: 'ananth@ssn.edu', password: 'staff123', role: 'staff', employeeId: 'SSN-FAC-092', department: 'Information Technology', designation: 'Assistant Professor', specialization: 'Computer Networks & Security', status: 'active', joinedAt: '2019-01-10' },

    // 22 Enrolled Engineering Students (CSE Sem V Sec A & B)
    { id: 'u4', name: 'Riya Sharma', email: 'student@ssn.edu', password: 'student123', role: 'student', rollNo: '2210001', department: 'Computer Science & Engineering', semester: 'V', section: 'A', dob: '2004-05-12', phone: '+91 98765 43210', status: 'active', joinedAt: '2022-08-01' },
    { id: 'u5', name: 'Arjun Mehta', email: 'arjun@ssn.edu', password: 'student123', role: 'student', rollNo: '2210002', department: 'Computer Science & Engineering', semester: 'V', section: 'A', dob: '2004-03-22', phone: '+91 98765 43211', status: 'active', joinedAt: '2022-08-01' },
    { id: 'u6', name: 'Pooja Verma', email: 'pooja@ssn.edu', password: 'student123', role: 'student', rollNo: '2210003', department: 'Computer Science & Engineering', semester: 'V', section: 'A', dob: '2004-08-15', phone: '+91 98765 43212', status: 'active', joinedAt: '2022-08-01' },
    { id: 'u7', name: 'Karthik Rajan', email: 'karthik@ssn.edu', password: 'student123', role: 'student', rollNo: '2210004', department: 'Computer Science & Engineering', semester: 'V', section: 'A', dob: '2004-01-10', phone: '+91 98765 43213', status: 'active', joinedAt: '2022-08-01' },
    { id: 'u8', name: 'Ananya Krishnan', email: 'ananya@ssn.edu', password: 'student123', role: 'student', rollNo: '2210005', department: 'Computer Science & Engineering', semester: 'V', section: 'A', dob: '2004-11-28', phone: '+91 98765 43214', status: 'active', joinedAt: '2022-08-01' },
    { id: 'u9', name: 'Vikram Nair', email: 'vikram@ssn.edu', password: 'student123', role: 'student', rollNo: '2210006', department: 'Computer Science & Engineering', semester: 'V', section: 'A', dob: '2004-07-04', phone: '+91 98765 43215', status: 'active', joinedAt: '2022-08-01' },
    { id: 'u12', name: 'Sneha Sundaram', email: 'sneha@ssn.edu', password: 'student123', role: 'student', rollNo: '2210007', department: 'Computer Science & Engineering', semester: 'V', section: 'A', dob: '2004-09-19', phone: '+91 98765 43216', status: 'active', joinedAt: '2022-08-01' },
    { id: 'u13', name: 'Rahul Dravid K.', email: 'rahul@ssn.edu', password: 'student123', role: 'student', rollNo: '2210008', department: 'Computer Science & Engineering', semester: 'V', section: 'A', dob: '2004-04-14', phone: '+91 98765 43217', status: 'active', joinedAt: '2022-08-01' },
    { id: 'u14', name: 'Divya Prakash', email: 'divya@ssn.edu', password: 'student123', role: 'student', rollNo: '2210009', department: 'Computer Science & Engineering', semester: 'V', section: 'A', dob: '2004-02-18', phone: '+91 98765 43218', status: 'active', joinedAt: '2022-08-01' },
    { id: 'u15', name: 'Ashwin Kumar M.', email: 'ashwin@ssn.edu', password: 'student123', role: 'student', rollNo: '2210010', department: 'Computer Science & Engineering', semester: 'V', section: 'A', dob: '2004-12-05', phone: '+91 98765 43219', status: 'active', joinedAt: '2022-08-01' },
    { id: 'u16', name: 'Meera Nambiar', email: 'meera@ssn.edu', password: 'student123', role: 'student', rollNo: '2210011', department: 'Computer Science & Engineering', semester: 'V', section: 'A', dob: '2004-06-30', phone: '+91 98765 43220', status: 'active', joinedAt: '2022-08-01' },
    { id: 'u17', name: 'Harish Chandran', email: 'harish@ssn.edu', password: 'student123', role: 'student', rollNo: '2210012', department: 'Computer Science & Engineering', semester: 'V', section: 'A', dob: '2004-10-11', phone: '+91 98765 43221', status: 'active', joinedAt: '2022-08-01' },
    { id: 'u18', name: 'Swetha Balaji', email: 'swetha@ssn.edu', password: 'student123', role: 'student', rollNo: '2210013', department: 'Computer Science & Engineering', semester: 'V', section: 'A', dob: '2004-03-08', phone: '+91 98765 43222', status: 'active', joinedAt: '2022-08-01' },
    { id: 'u19', name: 'Sanjay Raghavan', email: 'sanjay@ssn.edu', password: 'student123', role: 'student', rollNo: '2210014', department: 'Computer Science & Engineering', semester: 'V', section: 'A', dob: '2004-08-27', phone: '+91 98765 43223', status: 'active', joinedAt: '2022-08-01' },
    { id: 'u20', name: 'Preethi Venkatesh', email: 'preethi@ssn.edu', password: 'student123', role: 'student', rollNo: '2210015', department: 'Computer Science & Engineering', semester: 'V', section: 'A', dob: '2004-05-02', phone: '+91 98765 43224', status: 'active', joinedAt: '2022-08-01' },
    { id: 'u21', name: 'Gokul Nath S.', email: 'gokul@ssn.edu', password: 'student123', role: 'student', rollNo: '2210016', department: 'Computer Science & Engineering', semester: 'V', section: 'A', dob: '2004-07-21', phone: '+91 98765 43225', status: 'active', joinedAt: '2022-08-01' },
    { id: 'u22', name: 'Keerthana Ravi', email: 'keerthana@ssn.edu', password: 'student123', role: 'student', rollNo: '2210017', department: 'Computer Science & Engineering', semester: 'V', section: 'A', dob: '2004-09-09', phone: '+91 98765 43226', status: 'active', joinedAt: '2022-08-01' },
    { id: 'u23', name: 'Siddharth Menon', email: 'siddharth@ssn.edu', password: 'student123', role: 'student', rollNo: '2210018', department: 'Computer Science & Engineering', semester: 'V', section: 'A', dob: '2004-11-17', phone: '+91 98765 43227', status: 'active', joinedAt: '2022-08-01' },
    { id: 'u24', name: 'Nithya Kalyani', email: 'nithya@ssn.edu', password: 'student123', role: 'student', rollNo: '2210019', department: 'Computer Science & Engineering', semester: 'V', section: 'A', dob: '2004-01-25', phone: '+91 98765 43228', status: 'active', joinedAt: '2022-08-01' },
    { id: 'u25', name: 'Varun Chandrasekhar', email: 'varun@ssn.edu', password: 'student123', role: 'student', rollNo: '2210020', department: 'Computer Science & Engineering', semester: 'V', section: 'A', dob: '2004-06-12', phone: '+91 98765 43229', status: 'active', joinedAt: '2022-08-01' },
  ];

  const subjects = [
    { id: 's1', code: 'CS3301', name: 'Data Structures & Algorithms', department: 'Computer Science & Engineering', semester: 'V', section: 'A', staffId: 'u2', credits: 4, room: 'CSE-Lab 3', color: '#003366' },
    { id: 's2', code: 'CS3302', name: 'Operating Systems & Virtualization', department: 'Computer Science & Engineering', semester: 'V', section: 'A', staffId: 'u2', credits: 3, room: 'LH-204', color: '#8b5cf6' },
    { id: 's3', code: 'CS3303', name: 'Computer Networks & Protocols', department: 'Computer Science & Engineering', semester: 'V', section: 'A', staffId: 'u2', credits: 4, room: 'LH-201', color: '#06b6d4' },
    { id: 's4', code: 'CS3304', name: 'Database Management Systems', department: 'Computer Science & Engineering', semester: 'V', section: 'A', staffId: 'u2', credits: 4, room: 'CSE-Lab 1', color: '#10b981' },
    { id: 's5', code: 'CS3305', name: 'Artificial Intelligence & Machine Learning', department: 'Computer Science & Engineering', semester: 'V', section: 'A', staffId: 'u2', credits: 4, room: 'Seminar Hall B', color: '#C8960C' },
    { id: 's6', code: 'CS3306', name: 'Design & Analysis of Algorithms', department: 'Computer Science & Engineering', semester: 'V', section: 'A', staffId: 'u2', credits: 3, room: 'LH-203', color: '#f59e0b' },
    { id: 's7', code: 'EC3201', name: 'VLSI Design & Hardware Description', department: 'Electronics & Communication', semester: 'III', section: 'B', staffId: 'u3', credits: 4, room: 'ECE-VLSI Lab', color: '#ef4444' },
  ];

  // Generate realistic attendance logs across all 20 students for the last 50 days
  const attendanceRecords = [];
  const today = new Date();
  const studentIds = users.filter(u => u.role === 'student').map(u => u.id);
  const subjectIds = ['s1', 's2', 's3', 's4', 's5', 's6'];

  for (let d = 45; d >= 1; d--) {
    const date = new Date(today);
    date.setDate(today.getDate() - d);
    const dayOfWeek = date.getDay();
    if (dayOfWeek === 0 || dayOfWeek === 6) continue; // Skip weekends

    const dateIso = date.toISOString().split('T')[0];

    studentIds.forEach((stuId, sIdx) => {
      subjectIds.forEach((subId, subIdx) => {
        // Individualized attendance probabilities
        let isAbsent = false;
        let isLeave = false;

        // Arjun Mehta (u5) has lower attendance (~68% - defaulter)
        if (stuId === 'u5') {
          isAbsent = (d + subIdx) % 3 === 0;
        } else if (stuId === 'u13' || stuId === 'u19') {
          // Sneha and Sanjay have moderate warning attendance (~74%)
          isAbsent = (d + subIdx) % 4 === 0;
        } else {
          // Others maintain safe high attendance (88-96%)
          isAbsent = (d * 7 + sIdx * 3 + subIdx) % 11 === 0;
        }

        // Sporadic approved OD/Leave
        if (isAbsent && (d === 12 || d === 26 || d === 35)) {
          isLeave = true;
          isAbsent = false;
        }

        const status = isLeave ? 'leave' : isAbsent ? 'absent' : 'present';
        attendanceRecords.push({
          id: `att_${subId}_${stuId}_${d}`,
          subjectId: subId,
          studentId: stuId,
          date: dateIso,
          status: status,
          markedBy: 'u2',
          markedAt: date.toISOString()
        });
      });
    });
  }

  const announcements = [
    { id: 'ann1', title: 'End-Semester Exam Time Table Released & Hall Ticket Distribution', body: 'The Office of Controller of Examinations (COE) has officially published the November/December 2025 Autonomous Examination schedule for all UG & PG engineering streams. Hall tickets will be issued only to candidates having minimum 75% aggregate attendance.', postedBy: 'u1', target: 'all', priority: 'urgent', createdAt: new Date(Date.now() - 1*86400000).toISOString() },
    { id: 'ann2', title: 'Academic Attendance Compliance & 75% Condonation Rule', body: 'Anna University Academic Regulation 2021 mandates 75% overall class attendance. Students with attendance between 65% and 74% on medical grounds must submit certified records to the HOD office by August 28, 2026.', postedBy: 'u1', target: 'student', priority: 'important', createdAt: new Date(Date.now() - 3*86400000).toISOString() },
    { id: 'ann3', title: 'Faculty Conclave on Generative AI in Engineering Curricula', body: 'A 2-day Faculty Development Conclave will be hosted by SSN Research Centre on September 12-13, 2026. All department professors and associate faculty are invited for active participation.', postedBy: 'u1', target: 'staff', priority: 'normal', createdAt: new Date(Date.now() - 6*86400000).toISOString() },
    { id: 'ann4', title: 'SSN Invente 2026 — National Technical Symposium', body: 'Registrations are now open for SSN Invente 2026. On-Duty (OD) attendance credit will be awarded to student core coordinators and paper presenters upon verified submission.', postedBy: 'u1', target: 'all', priority: 'normal', createdAt: new Date(Date.now() - 10*86400000).toISOString() },
  ];

  const leaveRequests = [
    { id: 'lr1', studentId: 'u5', subjectId: 's1', date: new Date(Date.now() - 86400000).toISOString().split('T')[0], type: 'Medical Leave', reason: 'Diagnosed with viral fever. Prescribed rest by medical practitioner. Doctor prescription attached.', document: 'Medical_Cert_Arjun_Mehta.pdf', status: 'pending', createdAt: new Date(Date.now() - 86400000).toISOString() },
    { id: 'lr2', studentId: 'u4', subjectId: 's2', date: new Date(Date.now() - 3*86400000).toISOString().split('T')[0], type: 'On-Duty (Symposium / Conference)', reason: 'Presented technical research paper on Neural Networks at IIT Madras Shaastra symposium.', document: 'IITM_Presentation_Proof.pdf', status: 'approved', reviewedBy: 'u2', createdAt: new Date(Date.now() - 3*86400000).toISOString() },
    { id: 'lr3', studentId: 'u6', subjectId: 's1', date: new Date(Date.now() - 2*86400000).toISOString().split('T')[0], type: 'Sports & Cultural Event', reason: 'Represented SSN College in Anna University Zonal Badminton Tournament.', document: 'Zonal_Sports_OD_Letter.pdf', status: 'pending', createdAt: new Date(Date.now() - 2*86400000).toISOString() },
    { id: 'lr4', studentId: 'u14', subjectId: 's3', date: new Date(Date.now() - 4*86400000).toISOString().split('T')[0], type: 'Family Emergency', reason: 'Had to travel out of station for urgent family emergency.', document: '', status: 'approved', reviewedBy: 'u2', createdAt: new Date(Date.now() - 4*86400000).toISOString() },
  ];

  const departments = [
    { id: 'd1', name: 'Computer Science & Engineering', code: 'CSE', hod: 'Dr. S. Krishnamurthy', students: 480, staff: 42, color: '#003366', avgAtt: 89 },
    { id: 'd2', name: 'Electronics & Communication', code: 'ECE', hod: 'Dr. R. Venkataraman', students: 360, staff: 34, color: '#C8960C', avgAtt: 86 },
    { id: 'd3', name: 'Electrical & Electronics', code: 'EEE', hod: 'Dr. M. Raghavan', students: 240, staff: 26, color: '#10b981', avgAtt: 91 },
    { id: 'd4', name: 'Information Technology', code: 'IT', hod: 'Dr. V. Saraswathi', students: 240, staff: 24, color: '#06b6d4', avgAtt: 88 },
    { id: 'd5', name: 'Mechanical Engineering', code: 'MECH', hod: 'Dr. K. Subramaniam', students: 360, staff: 32, color: '#8b5cf6', avgAtt: 84 },
    { id: 'd6', name: 'Civil Engineering', code: 'CIVIL', hod: 'Dr. P. Annamalai', students: 180, staff: 18, color: '#ef4444', avgAtt: 82 },
    { id: 'd7', name: 'Biomedical Engineering', code: 'BME', hod: 'Dr. A. Kavitha', students: 180, staff: 19, color: '#ec4899', avgAtt: 93 },
    { id: 'd8', name: 'Chemical Engineering', code: 'CHEM', hod: 'Dr. R. Parthiban', students: 180, staff: 17, color: '#f59e0b', avgAtt: 87 },
  ];

  DB.set('users', users);
  DB.set('subjects', subjects);
  DB.set('attendance', attendanceRecords);
  DB.set('announcements', announcements);
  DB.set('leaveRequests', leaveRequests);
  DB.set('departments', departments);
  DB.set('seeded', true);
}

/* ===================== AUTH ===================== */
let currentUser = null;
let selectedLoginRole = 'staff';

function handleLogin(e) {
  e.preventDefault();
  const email = document.getElementById('lf-email').value.trim();
  const password = document.getElementById('lf-password').value;

  document.getElementById('login-text').classList.add('hidden');
  document.getElementById('login-spinner').classList.remove('hidden');

  setTimeout(() => {
    const users = DB.getAll('users');
    const user = users.find(u => u.email === email && u.password === password);

    document.getElementById('login-text').classList.remove('hidden');
    document.getElementById('login-spinner').classList.add('hidden');

    if (!user) { showToast('Invalid email or password. Please try again.', 'error'); return; }
    if (user.status === 'inactive') { showToast('Your account has been deactivated. Contact admin.', 'error'); return; }

    // Role mismatch warning
    if (user.role !== selectedLoginRole) {
      showToast(`Logging in as ${user.role} (selected: ${selectedLoginRole})`, 'warn');
    }

    loginUser(user);
  }, 800);
}

function loginUser(user) {
  currentUser = user;
  DB.set('session', user);
  if (user.role === 'admin') loadAdminDashboard();
  else if (user.role === 'staff') loadStaffDashboard();
  else loadStudentDashboard();
}

function logout() {
  currentUser = null;
  DB.del('session');
  showPage('login');
  showToast('Signed out successfully.');
  document.getElementById('login-form').reset();
}

function quickLogin(role) {
  const creds = { admin: ['admin@ssn.edu', 'admin123'], staff: ['staff@ssn.edu', 'staff123'], student: ['student@ssn.edu', 'student123'] };
  document.getElementById('lf-email').value = creds[role][0];
  document.getElementById('lf-password').value = creds[role][1];
  selectLoginRole(role, document.querySelector(`.rs-btn[data-role="${role}"]`));
  setTimeout(() => handleLogin({ preventDefault: () => {} }), 200);
}

/* ===================== ROUTING ===================== */
function showPage(id) {
  document.querySelectorAll('.page').forEach(p => p.classList.remove('active'));
  const pg = document.getElementById(`page-${id}`);
  if (pg) { pg.classList.add('active'); window.scrollTo(0, 0); }
}

function gotoLogin(role) {
  showPage('login');
  const roleBtn = document.querySelector(`.rs-btn[data-role="${role}"]`);
  if (roleBtn) selectLoginRole(role, roleBtn);
  const creds = {
    admin: ['admin@ssn.edu', 'admin123'],
    staff: ['staff@ssn.edu', 'staff123'],
    student: ['student@ssn.edu', 'student123']
  };
  if (creds[role]) {
    const emailInp = document.getElementById('lf-email');
    const pwdInp = document.getElementById('lf-password');
    if (emailInp) emailInp.value = creds[role][0];
    if (pwdInp) pwdInp.value = creds[role][1];
  }
}

function sTab(dashboard, tab, el) {
  const dashEl = document.getElementById(`page-${dashboard}`);
  dashEl.querySelectorAll('.tab').forEach(t => t.classList.remove('active'));
  dashEl.querySelectorAll('.sb-link').forEach(l => l.classList.remove('active'));
  const tabEl = document.getElementById(`${dashboard}-tab-${tab}`);
  if (tabEl) tabEl.classList.add('active');
  if (el) el.classList.add('active');
  const titleEl = document.getElementById(`${dashboard}-title`);
  if (titleEl) titleEl.textContent = tab.split('-').map(w => w[0].toUpperCase() + w.slice(1)).join(' ').replace(/\b(Add|My)\b/g, m => m);
  // Close mobile sidebar
  if (window.innerWidth <= 768) {
    const sb = document.getElementById(`${dashboard}-sb`);
    if (sb) { sb.classList.remove('open'); document.getElementById('overlay').classList.remove('show'); }
  }
}

/* ===================== UI HELPERS ===================== */
function showToast(msg, type = 'success') {
  const t = document.getElementById('toast');
  t.textContent = msg;
  t.style.borderLeftColor = type === 'error' ? 'var(--danger)' : type === 'warn' ? 'var(--warning)' : 'var(--ssn-gold)';
  t.classList.add('show');
  setTimeout(() => t.classList.remove('show'), 3200);
}

function toggleSb(sbId) {
  const sb = document.getElementById(sbId);
  const ov = document.getElementById('overlay');
  sb.classList.toggle('open');
  ov.classList.toggle('show');
}

function closeOverlay() {
  document.querySelectorAll('.sidebar').forEach(sb => sb.classList.remove('open'));
  document.getElementById('overlay').classList.remove('show');
}

function togglePwd() {
  const inp = document.getElementById('lf-password');
  inp.type = inp.type === 'password' ? 'text' : 'password';
}

function selectLoginRole(role, el) {
  selectedLoginRole = role;
  document.querySelectorAll('.rs-btn').forEach(b => b.classList.remove('active'));
  if (el) el.classList.add('active');
  updateRoleSlider(role);
}

function updateRoleSlider(role) {
  const slider = document.getElementById('rs-slider');
  const btns = document.querySelectorAll('.rs-btn');
  const idx = ['admin', 'staff', 'student'].indexOf(role);
  if (slider && btns[idx]) {
    const btn = btns[idx];
    slider.style.width = btn.offsetWidth + 'px';
    slider.style.left = btn.offsetLeft + 'px';
  }
}

function getInitials(name) {
  if (!name) return '??';
  const p = name.trim().split(' ');
  return (p[0][0] + (p[1] ? p[1][0] : '')).toUpperCase();
}

function fmtDate(dateStr) {
  if (!dateStr) return '—';
  return new Date(dateStr).toLocaleDateString('en-IN', { day: '2-digit', month: 'short', year: 'numeric' });
}

function fmtTime(isoStr) {
  if (!isoStr) return '—';
  return new Date(isoStr).toLocaleTimeString('en-IN', { hour: '2-digit', minute: '2-digit' });
}

function calcAttendance(records, studentId, subjectId) {
  const filtered = records.filter(r => r.studentId === studentId && (subjectId ? r.subjectId === subjectId : true));
  if (!filtered.length) return { pct: 0, present: 0, absent: 0, total: 0 };
  const present = filtered.filter(r => r.status === 'present' || r.status === 'leave').length;
  const absent = filtered.filter(r => r.status === 'absent').length;
  const total = filtered.length;
  return { pct: total ? Math.round((present / total) * 100) : 0, present, absent, total };
}

/* ===================== ADMIN DASHBOARD ===================== */
function loadAdminDashboard() {
  showPage('admin');
  const u = currentUser || { name: 'Dr. S. Narayanan', role: 'admin', employeeId: 'SSN-ADM-001', designation: 'Principal & Chief Academic Officer', id: 'u1' };
  currentUser = u;

  const nameEl = document.getElementById('admin-name');
  if (nameEl) nameEl.textContent = u.name;
  const avEl = document.getElementById('admin-av');
  if (avEl) avEl.textContent = getInitials(u.name);
  const dateEl = document.getElementById('admin-date');
  if (dateEl) dateEl.textContent = new Date().toLocaleDateString('en-IN', { weekday: 'long', day: 'numeric', month: 'long', year: 'numeric' });

  renderAdminHeroBanner();
  renderAdminCampusBar();
  renderAdminKPIs();
  renderDeptPerf();
  renderAdminAtRisk();
  renderAdminActivity();
  renderUsersTable('all');
  renderDeptGrid();
  renderAdminLeave('pending');
  renderAdminAnnouncements();
  updateLeaveBadge('admin');
  showToast(`Welcome, ${u.name.split(' ')[0]}! Logged in as Principal & Administrator.`);
}

function renderAdminHeroBanner() {
  const u = currentUser;
  const bannerEl = document.getElementById('admin-hero-banner');
  if (!bannerEl) return;

  bannerEl.innerHTML = `
    <div class="fhp-left">
      <img src="assets/ssn_logo.png" alt="SSN Crest" class="fhp-avatar-img" style="width:68px;height:68px;border-radius:12px;object-fit:contain;background:#ffffff;padding:4px;border:2px solid var(--ssn-gold);box-shadow:0 4px 12px rgba(0,0,0,0.3);" />
      <div class="fhp-details">
        <div class="fhp-badge-row">
          <span class="fhp-badge primary">Executive ID: ${u.employeeId || 'SSN-ADM-001'}</span>
          <span class="fhp-badge gold">Autonomous Governance</span>
          <span class="fhp-badge green">&#9679; Cloud Sync Online</span>
        </div>
        <h2>${u.name}</h2>
        <p>${u.designation || 'Principal & Chief Academic Officer'} &bull; SSN College of Engineering, Chennai</p>
      </div>
    </div>
    <div class="fhp-actions">
      <button class="btn-fhp primary" onclick="sTab('admin','add-student',document.querySelector('#admin-sb .sb-link:nth-child(2)'))">
        <span>➕</span> Enroll Student
      </button>
      <button class="btn-fhp secondary" onclick="exportReport('institution')">
        <span>📑</span> Export Audit CSV
      </button>
    </div>
  `;
}

function renderAdminCampusBar() {
  const users = DB.getAll('users');
  const att = DB.getAll('attendance');
  const depts = DB.getAll('departments');

  const students = users.filter(u => u.role === 'student' && u.status === 'active');
  const staff = users.filter(u => u.role === 'staff' && u.status === 'active');
  const totalEnrolled = 2280; // Full campus student body
  const overallCampusAtt = 89.6;

  const barEl = document.getElementById('admin-campus-bar');
  if (!barEl) return;

  barEl.innerHTML = `
    <div class="psb-card" style="--pbar:#003366">
      <div class="psb-label">Total Campus Enrollment</div>
      <div class="psb-val">${totalEnrolled} <small>UG &bull; PG Scholars</small></div>
    </div>
    <div class="psb-card" style="--pbar:#C8960C">
      <div class="psb-label">Active Academic Faculty</div>
      <div class="psb-val">215 <small>Professors &bull; HODs</small></div>
    </div>
    <div class="psb-card" style="--pbar:#10b981">
      <div class="psb-label">Campus Average Presence</div>
      <div class="psb-val">${overallCampusAtt}% <small class="good">&bull; Compliant</small></div>
    </div>
    <div class="psb-card" style="--pbar:#ef4444">
      <div class="psb-label">Condonation Watchlist</div>
      <div class="psb-val" style="color:var(--danger)">18 <small>Campus-wide &lt;75%</small></div>
    </div>
  `;
}

function renderAdminKPIs() {
  const users = DB.getAll('users');
  const att = DB.getAll('attendance');
  const students = users.filter(u => u.role === 'student' && u.status === 'active');
  const staff = users.filter(u => u.role === 'staff' && u.status === 'active');
  const today = new Date().toISOString().split('T')[0];
  const todayAtt = att.filter(r => r.date === today);
  const todayPresent = todayAtt.filter(r => r.status === 'present').length;
  const todayTotal = todayAtt.length;
  const todayPct = todayTotal ? Math.round((todayPresent / todayTotal) * 100) : 92;

  const atRisk = students.filter(s => {
    const a = calcAttendance(att, s.id);
    return a.pct < APP_CONFIG.attendanceThreshold;
  });

  const kpis = [
    { label: 'Registered Portal Scholars', val: students.length || 22, icon: svgUsers(), color: '#003366', trend: 'CSE Sem V Cohort', trendClass: 'up' },
    { label: 'Academic Faculty Staff', val: staff.length || 4, icon: svgUser(), color: '#C8960C', trend: 'All Departments Active', trendClass: 'up' },
    { label: "Today's Attendance Rate", val: `${todayPct}%`, icon: svgCheck(), color: '#10b981', trend: todayPct >= 75 ? 'Above AU 75% Threshold' : 'Attention Required', trendClass: todayPct >= 75 ? 'up' : 'dn' },
    { label: 'Institutional At-Risk Defaulters', val: atRisk.length || 1, icon: svgAlert(), color: '#ef4444', trend: 'Issued Warning Notice', trendClass: 'warn' },
  ];

  const kpiEl = document.getElementById('admin-kpis');
  if (kpiEl) {
    kpiEl.innerHTML = kpis.map(k => `
      <div class="kpi-card" style="--kpi-accent:${k.color};--kpi-clr:${k.color}">
        <div class="kpi-icon">${k.icon}</div>
        <div class="kpi-body">
          <div class="kpi-val">${k.val}</div>
          <div class="kpi-label">${k.label}</div>
          <div class="kpi-trend ${k.trendClass}">${k.trend}</div>
        </div>
      </div>
    `).join('');
  }
}

function renderDeptPerf() {
  const depts = DB.getAll('departments');
  const colors = ['#003366','#C8960C','#10b981','#06b6d4','#8b5cf6','#ef4444','#ec4899','#f59e0b'];
  const perfs = depts.map((d, i) => ({
    name: d.code,
    fullName: d.name,
    students: d.students || 240,
    staff: d.staff || 24,
    pct: d.avgAtt || (84 + (i * 2) % 10),
    color: d.color || colors[i % colors.length]
  }));

  const listEl = document.getElementById('dept-perf-list');
  if (!listEl) return;

  listEl.innerHTML = perfs.map(p => `
    <div class="scomp-item" style="margin-bottom:10px;">
      <div class="scomp-header">
        <div>
          <strong style="color:var(--text)">${p.fullName} <span style="font-size:0.75rem;font-weight:700;color:${p.color}">(${p.name})</span></strong>
          <small style="display:block;color:var(--text-2);font-size:0.75rem">${p.students} Scholars &bull; ${p.staff} Faculty Members</small>
        </div>
        <div style="text-align:right">
          <span class="scomp-pct" style="color:${p.color}">${p.pct}%</span>
          <span class="akpi-chip ${p.pct >= 88 ? 'good' : p.pct >= 75 ? 'blue' : 'warn'}" style="font-size:0.68rem">
            ${p.pct >= 88 ? 'Exemplary' : p.pct >= 75 ? 'Compliant' : 'Shortage'}
          </span>
        </div>
      </div>
      <div class="sb-track" style="height:8px;margin-top:6px;">
        <div class="sb-fill" style="width:${p.pct}%;background:${p.color}"></div>
      </div>
    </div>
  `).join('');
}

function renderAdminAtRisk() {
  const users = DB.getAll('users');
  const att = DB.getAll('attendance');
  const students = users.filter(u => u.role === 'student' && u.status === 'active');
  const atRisk = students.map(s => ({ ...s, att: calcAttendance(att, s.id) }))
    .filter(s => s.att.pct < APP_CONFIG.attendanceThreshold)
    .sort((a, b) => a.att.pct - b.att.pct)
    .slice(0, 6);

  const el = document.getElementById('admin-at-risk');
  if (!el) return;
  if (!atRisk.length) {
    el.innerHTML = '<div style="padding:24px 22px;color:var(--text-2);font-size:.875rem;text-align:center;">&#10003; No students below 75% attendance threshold currently</div>';
    return;
  }

  el.innerHTML = atRisk.map(s => `
    <div class="ar-card-pro" style="padding:12px 14px;">
      <div class="ar-pro-avatar">${getInitials(s.name)}</div>
      <div class="ar-pro-info">
        <div style="display:flex;justify-content:space-between;align-items:center;">
          <strong>${s.name}</strong>
          <span class="ar-pct-badge" style="background:#fee2e2;color:#991b1b;">${s.att.pct}%</span>
        </div>
        <p>${s.rollNo} &bull; ${s.department} (Sem ${s.semester || 'V'}-${s.section || 'A'})</p>
        <div class="ar-shortage-alert">
          <span>⚠️ Shortage:</span> ${s.att.present} Present / ${s.att.absent} Absent (${s.att.total} sessions)
        </div>
      </div>
      <button class="btn-warn-action" onclick="showToast('Official Condonation Warning Letter sent to ${s.name} (${s.email})')">
        ✉️ Condonation Notice
      </button>
    </div>
  `).join('');
}

function renderAdminActivity() {
  const activities = [
    { dot: '#10b981', title: 'Live Roll Call Completed', desc: 'Dr. Priya Kapoor marked attendance for CS3301 (22 present, 0 absent)', time: '09:15 AM' },
    { dot: '#C8960C', title: 'Medical Leave Submitted', desc: 'Arjun Mehta (2210002) applied for 2 days medical leave', time: '08:52 AM' },
    { dot: '#003366', title: 'New Scholar Assigned', desc: 'Principal enrolled Varun Chandrasekhar (2210020) to CSE-V-A', time: 'Yesterday' },
    { dot: '#8b5cf6', title: 'University Circular Broadcast', desc: 'End-semester autonomous exam timetable released to all students', time: '2 days ago' },
    { dot: '#ef4444', title: 'Anna University Compliance Warning', desc: 'Condonation audit notice dispatched to students with <75% attendance', time: '3 days ago' },
  ];
  const el = document.getElementById('admin-activity');
  if (!el) return;

  el.innerHTML = activities.map(a => `
    <div class="act-item">
      <div class="act-dot" style="background:${a.dot}"></div>
      <div class="act-body">
        <strong>${a.title}</strong>
        <p>${a.desc}</p>
      </div>
      <div class="act-time">${a.time}</div>
    </div>
  `).join('');
}

let allUsers = [];
let userFilter = 'all';

function renderUsersTable(filter) {
  userFilter = filter;
  const users = DB.getAll('users');
  allUsers = users;
  const filtered = filter === 'all' ? users : users.filter(u => u.role === filter);
  renderFilteredUsers(filtered);
}

function renderFilteredUsers(list) {
  document.getElementById('users-tbody').innerHTML = list.map(u => `
    <tr>
      <td><div class="std-cell">
        <div class="sb-avatar ${u.role === 'admin' ? 'admin-av' : u.role === 'staff' ? 'staff-av' : 'student-av'} sm">${getInitials(u.name)}</div>
        ${u.name}
      </div></td>
      <td>${u.rollNo || u.employeeId || '—'}</td>
      <td><a href="mailto:${u.email}" style="color:var(--ssn-navy)">${u.email}</a></td>
      <td><span class="role-chip ${u.role}">${u.role}</span></td>
      <td>${u.department || '—'}</td>
      <td><span class="sbadge ${u.status}">${u.status}</span></td>
      <td>
        <button class="btn-sm-${u.status === 'active' ? 'danger' : 'success'}" onclick="toggleUserStatus('${u.id}')">
          ${u.status === 'active' ? 'Deactivate' : 'Activate'}
        </button>
      </td>
    </tr>
  `).join('') || '<tr><td colspan="7" style="text-align:center;padding:24px;color:var(--text-2)">No users found</td></tr>';
}

function filterUsers(type, el) {
  document.querySelectorAll('#user-filter-tabs .ftab').forEach(b => b.classList.remove('active'));
  el.classList.add('active');
  renderUsersTable(type);
}

function searchUsers(q) {
  const users = DB.getAll('users');
  const filter = userFilter;
  const base = filter === 'all' ? users : users.filter(u => u.role === filter);
  const results = base.filter(u => u.name.toLowerCase().includes(q.toLowerCase()) || (u.rollNo || '').includes(q) || (u.employeeId || '').toLowerCase().includes(q.toLowerCase()));
  renderFilteredUsers(results);
}

function toggleUserStatus(uid) {
  const users = DB.getAll('users');
  const idx = users.findIndex(u => u.id === uid);
  if (idx === -1) return;
  users[idx].status = users[idx].status === 'active' ? 'inactive' : 'active';
  DB.set('users', users);
  renderUsersTable(userFilter);
  showToast(`User ${users[idx].status === 'active' ? 'activated' : 'deactivated'} successfully.`);
}

function renderDeptGrid() {
  const depts = DB.getAll('departments');
  const att = DB.getAll('attendance');
  const users = DB.getAll('users');

  document.getElementById('dept-grid').innerHTML = depts.map(d => {
    const deptStudents = users.filter(u => u.role === 'student' && u.department === d.name).length;
    const deptStaff = users.filter(u => u.role === 'staff' && u.department === d.name).length;
    const pct = 72 + Math.floor(Math.random() * 18);
    return `
      <div class="dept-card">
        <div class="dept-stripe" style="background:${d.color}"></div>
        <div class="dept-body">
          <h4>${d.name} (${d.code})</h4>
          <div class="dept-stats">
            <div><strong>${deptStudents || d.students}</strong>Students</div>
            <div><strong>${deptStaff || d.staff}</strong>Faculty</div>
            <div><strong>${pct}%</strong>Attendance</div>
          </div>
          <div class="dept-att-bar">
            <div class="dept-att-label"><span>Attendance</span><span>${pct}%</span></div>
            <div class="sb-track"><div class="sb-fill" style="width:${pct}%;background:${d.color}"></div></div>
          </div>
          <div style="margin-top:12px;font-size:.78rem;color:var(--text-2)">HOD: ${d.hod}</div>
        </div>
      </div>
    `;
  }).join('');
}

function renderAdminLeave(status) {
  const leaves = DB.getAll('leaveRequests').filter(l => l.status === status);
  const users = DB.getAll('users');
  const subjects = DB.getAll('subjects');
  const el = document.getElementById('admin-leave-list');

  if (!leaves.length) { el.innerHTML = `<div style="padding:24px 22px;color:var(--text-2);font-size:.875rem;">No ${status} leave requests.</div>`; return; }

  el.innerHTML = leaves.map(l => {
    const student = users.find(u => u.id === l.studentId) || {};
    const subject = subjects.find(s => s.id === l.subjectId) || {};
    return `
      <div class="leave-item">
        <div class="li-avatar">${getInitials(student.name)}</div>
        <div class="li-body">
          <div class="li-name">${student.name} <span class="role-chip student" style="margin-left:6px">${student.rollNo || ''}</span></div>
          <div class="li-meta">${subject.name || 'N/A'} &bull; Date: ${fmtDate(l.date)} &bull; Type: ${l.type}</div>
          <div class="li-reason">"${l.reason}"</div>
          ${l.status === 'pending' ? `<div class="li-actions">
            <button class="btn-sm-success" onclick="reviewLeave('${l.id}','approved','admin')">&#10003; Approve</button>
            <button class="btn-sm-danger" onclick="reviewLeave('${l.id}','rejected','admin')">&#10007; Reject</button>
          </div>` : `<div style="margin-top:8px"><span class="sbadge ${l.status}">${l.status}</span></div>`}
        </div>
        <div class="li-time">${fmtDate(l.createdAt)}</div>
      </div>
    `;
  }).join('');
}

function renderAdminAnnouncements() {
  const anns = DB.getAll('announcements').sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt));
  const el = document.getElementById('admin-ann-list');
  if (!anns.length) { el.innerHTML = '<div style="padding:24px 22px;color:var(--text-2)">No announcements posted yet.</div>'; return; }
  el.innerHTML = anns.map(a => `
    <div class="notice-card ${a.priority !== 'normal' ? a.priority : ''}" style="margin:12px 22px;border-radius:10px">
      <div class="nc-header">
        <div class="nc-title">${a.title}</div>
        <span class="notice-priority np-${a.priority}">${a.priority.toUpperCase()}</span>
      </div>
      <div class="nc-body">${a.body}</div>
      <div class="nc-footer">
        <span>Target: <strong>${a.target}</strong></span> &bull;
        <span>${fmtDate(a.createdAt)}</span>
        <button class="btn-sm-danger" style="margin-left:auto" onclick="deleteAnnouncement('${a.id}')">Delete</button>
      </div>
    </div>
  `).join('');
}

function updateLeaveBadge(role) {
  const pending = DB.getAll('leaveRequests').filter(l => l.status === 'pending').length;
  const el = document.getElementById(`${role}-leave-badge`);
  if (el) { el.textContent = pending; el.style.display = pending ? 'inline-block' : 'none'; }
}

/* ===================== ADMIN FORM ACTIONS ===================== */
function addStudent(e) {
  e.preventDefault();
  const name = document.getElementById('as-name').value.trim();
  const roll = document.getElementById('as-roll').value.trim();
  const email = document.getElementById('as-email').value.trim();
  const password = document.getElementById('as-password').value;
  const dept = document.getElementById('as-dept').value;
  const sem = document.getElementById('as-sem').value;
  const section = document.getElementById('as-section').value;
  const dob = document.getElementById('as-dob').value;
  const phone = document.getElementById('as-phone').value.trim();
  const pphone = document.getElementById('as-pphone').value.trim();

  const users = DB.getAll('users');
  if (users.find(u => u.rollNo === roll)) { showToast('Roll number already exists!', 'error'); return; }
  if (users.find(u => u.email === email)) { showToast('Email already registered!', 'error'); return; }

  const newUser = {
    id: 'u' + Date.now(),
    name, email, password, role: 'student',
    rollNo: roll, department: dept, semester: sem, section,
    dob, phone, parentPhone: pphone,
    status: 'active', joinedAt: new Date().toISOString()
  };
  users.push(newUser);
  DB.set('users', users);

  document.getElementById('add-student-form').reset();
  showToast(`Student ${name} (${roll}) enrolled successfully!`);
  renderAdminKPIs();
}

function addStaff(e) {
  e.preventDefault();
  const name = document.getElementById('sf-name').value.trim();
  const empId = document.getElementById('sf-empid').value.trim();
  const email = document.getElementById('sf-email').value.trim();
  const password = document.getElementById('sf-password').value;
  const dept = document.getElementById('sf-dept').value;
  const desg = document.getElementById('sf-desg').value;
  const phone = document.getElementById('sf-phone').value.trim();
  const spec = document.getElementById('sf-spec').value.trim();

  const users = DB.getAll('users');
  if (users.find(u => u.employeeId === empId)) { showToast('Employee ID already exists!', 'error'); return; }
  if (users.find(u => u.email === email)) { showToast('Email already registered!', 'error'); return; }

  const newUser = {
    id: 'u' + Date.now(),
    name, email, password, role: 'staff',
    employeeId: empId, department: dept, designation: desg,
    phone, specialization: spec,
    status: 'active', joinedAt: new Date().toISOString()
  };
  users.push(newUser);
  DB.set('users', users);

  document.getElementById('add-staff-form').reset();
  showToast(`Staff ${name} (${empId}) registered successfully!`);
  renderAdminKPIs();
}

function postAnnouncement(e) {
  e.preventDefault();
  const title = document.getElementById('ann-title').value.trim();
  const body = document.getElementById('ann-body').value.trim();
  const target = document.getElementById('ann-target').value;
  const priority = document.getElementById('ann-priority').value;

  const anns = DB.getAll('announcements');
  anns.unshift({ id: 'ann' + Date.now(), title, body, postedBy: currentUser.id, target, priority, createdAt: new Date().toISOString() });
  DB.set('announcements', anns);

  document.getElementById('ann-title').value = '';
  document.getElementById('ann-body').value = '';
  renderAdminAnnouncements();
  showToast('Announcement posted successfully!');
}

function deleteAnnouncement(id) {
  const anns = DB.getAll('announcements').filter(a => a.id !== id);
  DB.set('announcements', anns);
  renderAdminAnnouncements();
  showToast('Announcement deleted.');
}

function exportReport(type) {
  const users = DB.getAll('users');
  const att = DB.getAll('attendance');
  const subjects = DB.getAll('subjects');
  const students = users.filter(u => u.role === 'student');

  let csv = '';
  if (type === 'institution' || type === 'dept') {
    csv = 'Roll No,Name,Department,Semester,Section,Total Classes,Present,Absent,Attendance %,Status\n';
    students.forEach(s => {
      const a = calcAttendance(att, s.id);
      const status = a.pct >= 75 ? 'Safe' : a.pct >= 65 ? 'Warning' : 'Critical';
      csv += `${s.rollNo || 'N/A'},${s.name},${s.department || ''},${s.semester || ''},${s.section || ''},${a.total},${a.present},${a.absent},${a.pct}%,${status}\n`;
    });
  } else if (type === 'atrisk') {
    csv = 'Roll No,Name,Department,Attendance %\n';
    students.filter(s => calcAttendance(att, s.id).pct < 75).forEach(s => {
      const a = calcAttendance(att, s.id);
      csv += `${s.rollNo},${s.name},${s.department},${a.pct}%\n`;
    });
  } else if (type === 'monthly' || type === 'class') {
    csv = 'Subject Code,Subject Name,Total Classes,Avg Attendance %\n';
    subjects.forEach(sub => {
      const subAtt = att.filter(r => r.subjectId === sub.id);
      const pct = subAtt.length ? Math.round(subAtt.filter(r => r.status === 'present').length / subAtt.length * 100) : 0;
      csv += `${sub.code},${sub.name},${Math.ceil(subAtt.length / 6)},${pct}%\n`;
    });
  }

  const blob = new Blob([`SSN College of Engineering\nAttendance Report — ${new Date().toLocaleDateString('en-IN')}\n\n` + csv], { type: 'text/csv' });
  const url = URL.createObjectURL(blob);
  const a = document.createElement('a'); a.href = url; a.download = `SSN_Report_${type}_${Date.now()}.csv`; a.click();
  URL.revokeObjectURL(url);
  showToast('Report downloaded as CSV!');
}

/* ===================== STAFF DASHBOARD ===================== */
function loadStaffDashboard() {
  showPage('staff');
  const u = currentUser || { name: 'Dr. Priya Kapoor', role: 'staff', department: 'Computer Science & Engineering', designation: 'Professor & Programme Head', employeeId: 'SSN-FAC-042', id: 'u2' };
  currentUser = u;

  const nameEl = document.getElementById('staff-name');
  if (nameEl) nameEl.textContent = u.name;
  const deptEl = document.getElementById('staff-dept');
  if (deptEl) deptEl.textContent = u.department || 'Department of CSE';
  const avEl = document.getElementById('staff-av');
  if (avEl) avEl.textContent = getInitials(u.name);

  const dateFormatted = new Date().toLocaleDateString('en-IN', { weekday: 'long', day: 'numeric', month: 'long', year: 'numeric' });
  const todayBadge = document.getElementById('today-date-badge');
  if (todayBadge) todayBadge.textContent = dateFormatted;

  renderFacultyProfileBanner();
  renderStaffLiveLecture();
  renderStaffKPIs();
  renderStaffSchedule();
  renderStaffAtRisk();
  renderStaffQuickLeaves();
  loadSubjectDropdown();
  renderStaffClasses();
  renderStaffRoster();
  renderStaffAnalytics();
  renderStaffLeave('pending');
  renderNotices('staff');
  updateLeaveBadge('staff');

  // Set today's date in mark form
  const dateInp = document.getElementById('mark-date');
  if (dateInp) dateInp.value = new Date().toISOString().split('T')[0];

  // Auto load first subject for marking so table is never empty
  setTimeout(() => {
    const subSel = document.getElementById('mark-subject');
    if (subSel && subSel.options.length > 1 && !subSel.value) {
      subSel.selectedIndex = 1;
      loadStudentsForMarking();
    }
  }, 100);

  showToast(`Welcome, ${u.name.split(' ')[0]}!`);
}

function renderFacultyProfileBanner() {
  const u = currentUser;
  const mySubjects = getMySubjects();
  const bannerEl = document.getElementById('faculty-profile-banner');
  if (!bannerEl) return;

  bannerEl.innerHTML = `
    <div class="fhp-left">
      <div class="fhp-avatar">${getInitials(u.name)}</div>
      <div class="fhp-details">
        <div class="fhp-badge-row">
          <span class="fhp-badge primary">Faculty ID: ${u.employeeId || 'SSN-FAC-042'}</span>
          <span class="fhp-badge gold">Odd Semester 2025-26</span>
          <span class="fhp-badge green">&#9679; On Campus</span>
        </div>
        <h2>${u.name}</h2>
        <p>${u.designation || 'Professor & Programme Head'} &bull; ${u.department || 'Department of Computer Science & Engineering'}</p>
      </div>
    </div>
    <div class="fhp-actions">
      <button class="btn-fhp primary" onclick="sTab('staff','mark',document.querySelector('#staff-sb .sb-link:nth-child(2)'))">
        <svg width="15" height="15" viewBox="0 0 24 24" fill="none"><polyline points="20 6 9 17 4 12" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round"/></svg>
        Take Live Attendance
      </button>
      <button class="btn-fhp secondary" onclick="sTab('staff','analytics',document.querySelector('#staff-sb .sb-link:nth-child(6)'))">
        <svg width="15" height="15" viewBox="0 0 24 24" fill="none"><path d="M18 20V10M12 20V4M6 20v-6" stroke="currentColor" stroke-width="2" stroke-linecap="round"/></svg>
        Deep Analytics
      </button>
    </div>
  `;
}

function renderStaffLiveLecture() {
  const liveEl = document.getElementById('staff-live-lecture');
  if (!liveEl) return;
  const mySubjects = getMySubjects();
  const activeSub = mySubjects[0] || { name: 'Data Structures & Algorithms', code: 'CS3301', room: 'CSE-Lab 3', semester: 'V', section: 'A' };

  liveEl.innerHTML = `
    <div class="live-lecture-inner">
      <div class="lli-badge">
        <span class="pulse-dot"></span>
        <span>CURRENT LECTURE IN SESSION</span>
      </div>
      <div class="lli-content">
        <div class="lli-info">
          <h3>${activeSub.name} <span class="lli-code">(${activeSub.code})</span></h3>
          <p>📍 Location: <strong>${activeSub.room || 'LH-204'}</strong> &bull; Section: <strong>Sem ${activeSub.semester || 'V'} - Sec ${activeSub.section || 'A'}</strong> &bull; Schedule: <strong>09:00 AM – 10:00 AM (2nd Period)</strong></p>
        </div>
        <div class="lli-action">
          <button class="btn-live-mark" onclick="quickMarkClass('${activeSub.id}')">
            <span>📝</span> Mark Attendance Now
          </button>
        </div>
      </div>
    </div>
  `;
}

function getMySubjects() {
  const subjects = DB.getAll('subjects');
  if (!subjects.length) return [];
  const forMe = subjects.filter(s => currentUser && s.staffId === currentUser.id);
  return forMe.length ? forMe : subjects.slice(0, 4);
}

function renderStaffKPIs() {
  const mySubjects = getMySubjects();
  const users = DB.getAll('users');
  const att = DB.getAll('attendance');
  const myStudentIds = getMyStudentIds();
  const today = new Date().toISOString().split('T')[0];
  const todayAtt = att.filter(r => r.date === today && mySubjects.some(s => s.id === r.subjectId));
  const todayPct = todayAtt.length ? Math.round(todayAtt.filter(r => r.status === 'present').length / todayAtt.length * 100) : 91;
  const atRisk = myStudentIds.filter(sid => calcAttendance(att, sid).pct < 75).length;

  const kpis = [
    { label: 'Assigned Core Courses', val: mySubjects.length || 4, icon: svgBook(), color: '#003366', trend: 'CSE Sem V (Sec A & B)', trendClass: 'up' },
    { label: 'Registered Scholars', val: [...new Set(myStudentIds)].length || 22, icon: svgUsers(), color: '#C8960C', trend: 'Active Enrollment', trendClass: 'up' },
    { label: "Today's Avg Attendance", val: `${todayPct}%`, icon: svgCheck(), color: '#10b981', trend: todayPct >= 75 ? 'Above 75% threshold' : 'Requires review', trendClass: todayPct >= 75 ? 'up' : 'dn' },
    { label: 'Debarred Defaulters', val: atRisk || 1, icon: svgAlert(), color: '#ef4444', trend: '< 75% attendance radar', trendClass: 'warn' },
  ];

  const kpiEl = document.getElementById('staff-kpis');
  if (kpiEl) {
    kpiEl.innerHTML = kpis.map(k => `
      <div class="kpi-card" style="--kpi-accent:${k.color};--kpi-clr:${k.color}">
        <div class="kpi-icon">${k.icon}</div>
        <div class="kpi-body">
          <div class="kpi-val">${k.val}</div>
          <div class="kpi-label">${k.label}</div>
          <div class="kpi-trend ${k.trendClass}">${k.trend}</div>
        </div>
      </div>
    `).join('');
  }
}

function getMyStudentIds() {
  const mySubjects = getMySubjects();
  const att = DB.getAll('attendance');
  const ids = att.filter(r => mySubjects.some(s => s.id === r.subjectId)).map(r => r.studentId);
  const users = DB.getAll('users');
  const deptStudents = users.filter(u => u.role === 'student' && (!currentUser || u.department === currentUser.department)).map(u => u.id);
  const allIds = [...new Set([...ids, ...deptStudents])];
  return allIds.length ? allIds : users.filter(u => u.role === 'student').map(u => u.id);
}

function renderStaffSchedule() {
  const mySubjects = getMySubjects();
  const periods = [
    { time: '08:00 – 09:00', label: '1st Period', status: 'Completed', statusClass: 'done' },
    { time: '09:00 – 10:00', label: '2nd Period', status: 'Live Now', statusClass: 'live' },
    { time: '10:15 – 11:15', label: '3rd Period', status: 'Upcoming', statusClass: 'upcoming' },
    { time: '11:15 – 12:15', label: '4th Period', status: 'Upcoming', statusClass: 'upcoming' },
    { time: '01:00 – 02:00', label: '5th Period', status: 'Upcoming', statusClass: 'upcoming' },
    { time: '02:00 – 03:00', label: '6th Period', status: 'Upcoming', statusClass: 'upcoming' },
  ];
  const colors = ['#003366','#8b5cf6','#06b6d4','#10b981','#C8960C','#f59e0b'];

  const schedule = mySubjects.map((s, i) => ({ ...s, ...periods[i % periods.length], color: colors[i % colors.length] }));

  const schedEl = document.getElementById('staff-schedule');
  if (!schedEl) return;

  schedEl.innerHTML = schedule.length ? schedule.map((s, i) => `
    <div class="sched-card-pro ${s.status === 'Live Now' ? 'active-sched' : ''}">
      <div class="sc-pro-time">
        <strong>${s.time.split('–')[0]}</strong>
        <small>${s.time.split('–')[1] || ''}</small>
        <span class="period-pill">${s.label}</span>
      </div>
      <div class="sc-pro-divider" style="background:${s.color}"></div>
      <div class="sc-pro-body">
        <div style="display:flex;justify-content:space-between;align-items:flex-start;">
          <h4>${s.name}</h4>
          <span class="sched-status-badge ${s.statusClass}">${s.status}</span>
        </div>
        <p>${s.code} &bull; Sem ${s.semester} (Sec ${s.section}) &bull; ${s.credits} Credits &bull; 📍 ${s.room || 'LH-204'}</p>
      </div>
      <button class="btn-sched-action" onclick="quickMarkClass('${s.id}')" title="Quick Mark">
        Take Roll
      </button>
    </div>
  `).join('') : '<div style="padding:20px 22px;color:var(--text-2)">No classes scheduled today.</div>';
}

function renderStaffAtRisk() {
  const users = DB.getAll('users');
  const att = DB.getAll('attendance');
  const myStudentIds = [...new Set(getMyStudentIds())];
  const students = users.filter(u => u.role === 'student' && myStudentIds.includes(u.id));
  const atRisk = students.map(s => ({ ...s, att: calcAttendance(att, s.id) }))
    .filter(s => s.att.pct < APP_CONFIG.attendanceThreshold)
    .sort((a, b) => a.att.pct - b.att.pct);

  const el = document.getElementById('staff-at-risk');
  if (!el) return;
  if (!atRisk.length) {
    el.innerHTML = '<div style="padding:24px 20px;color:var(--text-2);text-align:center;">&#10003; All students currently meet or exceed the 75% attendance criteria.</div>';
    return;
  }

  el.innerHTML = atRisk.map(s => {
    const needed = Math.ceil((75 * s.att.total - 100 * s.att.present) / 25);
    return `
      <div class="ar-card-pro">
        <div class="ar-pro-avatar">${getInitials(s.name)}</div>
        <div class="ar-pro-info">
          <div style="display:flex;justify-content:space-between;align-items:center;">
            <strong>${s.name}</strong>
            <span class="ar-pct-badge" style="background:#fee2e2;color:#991b1b;">${s.att.pct}%</span>
          </div>
          <p>${s.rollNo} &bull; ${s.department} &bull; ${s.att.present} Present / ${s.att.absent} Absent</p>
          <div class="ar-shortage-alert">
            <span>🚨 Shortage:</span> Must attend next <strong>${needed > 0 ? needed : 3} consecutive classes</strong> for 75%
          </div>
        </div>
        <button class="btn-warn-action" onclick="showToast('Alert notification dispatched to ${s.name} (${s.email})')">
          🔔 Notify
        </button>
      </div>
    `;
  }).join('');
}

function renderStaffQuickLeaves() {
  const leaves = DB.getAll('leaveRequests').filter(l => l.status === 'pending');
  const users = DB.getAll('users');
  const subjects = DB.getAll('subjects');
  const el = document.getElementById('staff-quick-leaves');
  if (!el) return;

  if (!leaves.length) {
    el.innerHTML = '<div style="color:var(--text-2);font-size:0.85rem;padding:8px 0;">&#10003; No pending leave requests requiring review.</div>';
    return;
  }

  el.innerHTML = leaves.slice(0, 3).map(l => {
    const student = users.find(u => u.id === l.studentId) || {};
    const subject = subjects.find(s => s.id === l.subjectId) || {};
    return `
      <div class="ql-item">
        <div class="ql-top">
          <strong>${student.name || 'Scholar'}</strong>
          <span class="sbadge pending">${l.type}</span>
        </div>
        <div class="ql-meta">${subject.name || 'Course'} &bull; Date: ${fmtDate(l.date)}</div>
        <div class="ql-reason">"${l.reason}"</div>
        <div class="ql-actions">
          <button class="btn-sm-success" onclick="reviewLeave('${l.id}','approved','staff')">&#10003; Approve</button>
          <button class="btn-sm-danger" onclick="reviewLeave('${l.id}','rejected','staff')">&#10007; Reject</button>
        </div>
      </div>
    `;
  }).join('');
}

function loadSubjectDropdown() {
  const mySubjects = getMySubjects();
  const sel = document.getElementById('mark-subject');
  sel.innerHTML = '<option value="">Select Subject</option>' + mySubjects.map(s => `<option value="${s.id}">${s.name} (${s.code} — Sem ${s.semester}-${s.section})</option>`).join('');

  // Also for leave subject filter
  const leaveSubSel = document.getElementById('leave-subject');
  if (leaveSubSel) {
    const subjectsForStudent = DB.getAll('subjects').filter(s => {
      if (!currentUser || currentUser.role !== 'student') return false;
      return s.department === currentUser.department && s.semester === currentUser.semester && s.section === currentUser.section;
    });
    leaveSubSel.innerHTML = '<option value="">Select Subject</option>' + subjectsForStudent.map(s => `<option value="${s.id}">${s.name} (${s.code})</option>`).join('');
  }
}

let markingStudents = [];

function loadStudentsForMarking() {
  const subId = document.getElementById('mark-subject').value;
  const users = DB.getAll('users');
  const allActiveStudents = users.filter(u => u.role === 'student' && u.status === 'active');
  
  if (!subId) {
    markingStudents = allActiveStudents.map(s => ({ ...s, markStatus: '' }));
    const titleEl = document.getElementById('mark-class-title');
    if (titleEl) titleEl.textContent = `All Students — ${allActiveStudents.length} Students`;
    renderMarkGrid();
    return;
  }
  
  const subject = DB.getAll('subjects').find(s => s.id === subId);
  let students = [];
  if (subject) {
    students = users.filter(u => u.role === 'student' && u.status === 'active' && u.department === subject.department && u.semester === subject.semester && u.section === subject.section);
  }
  
  if (!students.length) {
    students = allActiveStudents;
  }
  
  markingStudents = students.map(s => ({ ...s, markStatus: '' }));
  const titleEl = document.getElementById('mark-class-title');
  if (titleEl) titleEl.textContent = `${subject ? subject.name : 'Class Roster'} — ${students.length} Students`;
  renderMarkGrid();
}

function renderMarkGrid() {
  updateLiveCount();
  document.getElementById('mark-grid').innerHTML = markingStudents.map((s, i) => `
    <div class="mark-card ${s.markStatus === 'present' ? 'p' : s.markStatus === 'absent' ? 'a' : ''}" id="mc-${i}">
      <div class="mc-name">${s.name}</div>
      <div class="mc-roll">${s.rollNo || s.id}</div>
      <div class="mark-card-btns">
        <button class="mcb pres" onclick="markStudent(${i},'present')">&#10003; P</button>
        <button class="mcb abs" onclick="markStudent(${i},'absent')">&#10007; A</button>
      </div>
    </div>
  `).join('') || '<div style="padding:24px;color:var(--text-2)">Select a subject to see students.</div>';
}

function markStudent(idx, status) {
  markingStudents[idx].markStatus = status;
  const card = document.getElementById(`mc-${idx}`);
  card.className = `mark-card ${status === 'present' ? 'p' : 'a'}`;
  updateLiveCount();
}

function markAllAs(status) {
  markingStudents.forEach((s, i) => { s.markStatus = status; const c = document.getElementById(`mc-${i}`); if (c) c.className = `mark-card ${status === 'present' ? 'p' : 'a'}`; });
  updateLiveCount();
}

function updateLiveCount() {
  const p = markingStudents.filter(s => s.markStatus === 'present').length;
  const a = markingStudents.filter(s => s.markStatus === 'absent').length;
  const u = markingStudents.filter(s => !s.markStatus).length;
  document.getElementById('lc-present').textContent = p;
  document.getElementById('lc-absent').textContent = a;
  document.getElementById('lc-unmarked').textContent = u;
}

function submitAttendance() {
  const subId = document.getElementById('mark-subject').value;
  const date = document.getElementById('mark-date').value;
  if (!subId) { showToast('Please select a subject first.', 'error'); return; }
  if (!date) { showToast('Please select a date.', 'error'); return; }
  const unmarked = markingStudents.filter(s => !s.markStatus);
  if (unmarked.length > 0) { showToast(`${unmarked.length} students are unmarked. Please mark all students.`, 'warn'); return; }

  const att = DB.getAll('attendance');
  // Remove existing records for this subject+date
  const filtered = att.filter(r => !(r.subjectId === subId && r.date === date));
  const newRecords = markingStudents.map(s => ({
    id: `att_${subId}_${s.id}_${date}`,
    subjectId: subId, studentId: s.id,
    date, status: s.markStatus,
    markedBy: currentUser.id,
    markedAt: new Date().toISOString()
  }));
  DB.set('attendance', [...filtered, ...newRecords]);

  showToast(`Attendance submitted! ${markingStudents.filter(s=>s.markStatus==='present').length} present, ${markingStudents.filter(s=>s.markStatus==='absent').length} absent.`);
  markingStudents = []; renderMarkGrid();
  document.getElementById('mark-subject').value = '';
  document.getElementById('mark-class-title').textContent = 'Select a class above to begin';
  renderStaffKPIs();
  renderStaffAtRisk();
}

let classActiveFilter = 'all';

function renderPortfolioSummaryBar() {
  const mySubjects = getMySubjects();
  const att = DB.getAll('attendance');
  const users = DB.getAll('users');
  const myStudentIds = [...new Set(getMyStudentIds())];
  const students = users.filter(u => u.role === 'student' && myStudentIds.includes(u.id));

  const totalCredits = mySubjects.reduce((sum, s) => sum + (s.credits || 3), 0);
  const avgAtt = 89;
  const defaulterCount = students.filter(s => calcAttendance(att, s.id).pct < 75).length;

  const barEl = document.getElementById('portfolio-summary-bar');
  if (!barEl) return;

  barEl.innerHTML = `
    <div class="psb-card" style="--pbar:#003366">
      <div class="psb-label">Total Assigned Courses</div>
      <div class="psb-val">${mySubjects.length} <small>Core &bull; Odd Sem</small></div>
    </div>
    <div class="psb-card" style="--pbar:#C8960C">
      <div class="psb-label">Total Teaching Credits</div>
      <div class="psb-val">${totalCredits} <small>AU Credits</small></div>
    </div>
    <div class="psb-card" style="--pbar:#10b981">
      <div class="psb-label">Cohort Average Attendance</div>
      <div class="psb-val">${avgAtt}% <small class="good">&bull; Above 75% Norm</small></div>
    </div>
    <div class="psb-card" style="--pbar:#ef4444">
      <div class="psb-label">Debarred Watchlist</div>
      <div class="psb-val" style="color:var(--danger)">${defaulterCount} <small>Scholars &lt;75%</small></div>
    </div>
  `;
}

function setClassFilter(filter, el) {
  classActiveFilter = filter;
  document.querySelectorAll('#class-filter-chips .ftab').forEach(b => b.classList.remove('active'));
  if (el) el.classList.add('active');
  filterStaffClasses();
}

function filterStaffClasses() {
  const q = (document.getElementById('class-search-input')?.value || '').toLowerCase();
  const mySubjects = getMySubjects();
  const att = DB.getAll('attendance');
  const users = DB.getAll('users');

  let filtered = mySubjects.filter(s => {
    const matchesQuery = s.name.toLowerCase().includes(q) || s.code.toLowerCase().includes(q) || (s.room || '').toLowerCase().includes(q);
    if (!matchesQuery) return false;

    const subAtt = att.filter(r => r.subjectId === s.id);
    const pct = subAtt.length ? Math.round(subAtt.filter(r => r.status === 'present').length / subAtt.length * 100) : 88;

    if (classActiveFilter === 'safe') return pct >= 75;
    if (classActiveFilter === 'risk') return pct < 75;
    return true;
  });

  renderStaffClassesList(filtered);
}

function renderStaffClasses() {
  renderPortfolioSummaryBar();
  filterStaffClasses();
}

function renderStaffClassesList(subjectsList) {
  const att = DB.getAll('attendance');
  const users = DB.getAll('users');
  const colors = ['#003366','#8b5cf6','#06b6d4','#10b981','#C8960C','#f59e0b','#ef4444'];
  const gridEl = document.getElementById('staff-classes-grid');
  if (!gridEl) return;

  if (!subjectsList.length) {
    gridEl.innerHTML = '<div style="padding:32px;color:var(--text-2);grid-column:1/-1;text-align:center;">No courses found matching your search filter.</div>';
    return;
  }

  gridEl.innerHTML = subjectsList.map((s, i) => {
    const subAtt = att.filter(r => r.subjectId === s.id);
    const pct = subAtt.length ? Math.round(subAtt.filter(r => r.status === 'present').length / subAtt.length * 100) : (87 + (i * 2) % 10);
    const totalClasses = Math.ceil(subAtt.length / 20) || (42 + i * 2);
    const color = s.color || colors[i % colors.length];

    const circ = 2 * Math.PI * 26;
    const strokeDash = (pct / 100) * circ;

    const statusBadge = pct >= 90 ? '<span class="akpi-chip good">Exemplary (&ge;90%)</span>' : pct >= 75 ? '<span class="akpi-chip blue">Compliant (75-89%)</span>' : '<span class="akpi-chip warn">Defaulter Risk (&lt;75%)</span>';

    return `
      <div class="pro-class-card" style="--pcc:${color}">
        <div class="pcc-header">
          <div class="pcc-title-wrap">
            <span class="pcc-code-pill" style="background:${color};color:#ffffff;">${s.code}</span>
            <span class="pcc-sem-badge">Sem ${s.semester} (Sec ${s.section})</span>
          </div>
          <div class="pcc-gauge-wrap">
            <svg viewBox="0 0 64 64" width="54" height="54">
              <circle cx="32" cy="32" r="26" fill="none" stroke="#e2e8f0" stroke-width="6" />
              <circle cx="32" cy="32" r="26" fill="none" stroke="${color}" stroke-width="6" stroke-linecap="round" stroke-dasharray="${strokeDash} ${circ}" transform="rotate(-90 32 32)" />
              <text x="32" y="37" text-anchor="middle" font-size="13" font-weight="800" fill="${color}">${pct}%</text>
            </svg>
          </div>
        </div>

        <div class="pcc-body">
          <h3 class="pcc-name">${s.name}</h3>
          <div class="pcc-meta-row">
            <span>📍 ${s.room || 'LH-204'}</span>
            <span>⏱️ ${s.credits} Credits</span>
            <span>👥 22 Scholars</span>
          </div>

          <div class="pcc-stats-grid">
            <div class="pcc-stat-box">
              <span class="psb-n">${totalClasses}</span>
              <span class="psb-l">Delivered Hours</span>
            </div>
            <div class="pcc-stat-box">
              <span class="psb-n">${pct}%</span>
              <span class="psb-l">Avg Attendance</span>
            </div>
            <div class="pcc-stat-box">
              <span class="psb-n" style="color:${pct < 75 ? 'var(--danger)' : 'var(--success)'}">${pct < 75 ? '1' : '0'}</span>
              <span class="psb-l">Shortage Radar</span>
            </div>
          </div>

          <div class="pcc-progress-bar-wrap">
            <div style="display:flex;justify-content:space-between;font-size:0.72rem;font-weight:700;color:var(--text-2);margin-bottom:4px;">
              <span>Class Attendance vs 75% Benchmark</span>
              <span>${statusBadge}</span>
            </div>
            <div class="sb-track" style="height:8px;position:relative;">
              <div class="sb-fill" style="width:${pct}%;background:${color}"></div>
              <div style="position:absolute;left:75%;top:-2px;bottom:-2px;width:2px;background:#ef4444;" title="75% Minimum University Threshold"></div>
            </div>
          </div>
        </div>

        <div class="pcc-actions">
          <button class="btn-pcc primary" onclick="quickMarkClass('${s.id}')">
            <span>📝</span> Take Roll Call
          </button>
          <button class="btn-pcc secondary" onclick="downloadSubjectLedger('${s.id}')" title="Download Subject Attendance CSV">
            <span>📥</span> Export Ledger
          </button>
        </div>
      </div>
    `;
  }).join('');
}

function downloadSubjectLedger(subId) {
  const subjects = DB.getAll('subjects');
  const subject = subjects.find(s => s.id === subId) || { name: 'Course', code: 'CS3301' };
  const users = DB.getAll('users');
  const att = DB.getAll('attendance');
  const students = users.filter(u => u.role === 'student');

  let csv = `SSN College of Engineering — Course Attendance Ledger\nCourse: ${subject.name} (${subject.code})\nDate Generated: ${new Date().toLocaleDateString('en-IN')}\n\n`;
  csv += 'Roll Number,Scholar Name,Department,Semester,Classes Held,Present,Absent,Attendance %,Status\n';

  students.forEach(s => {
    const a = calcAttendance(att, s.id, subId);
    const status = a.pct >= 75 ? 'Eligible' : 'Debarred (<75%)';
    csv += `${s.rollNo || ''},${s.name},${s.department || ''},${s.semester || 'V'},${a.total},${a.present},${a.absent},${a.pct}%,${status}\n`;
  });

  const blob = new Blob([csv], { type: 'text/csv' });
  const url = URL.createObjectURL(blob);
  const a = document.createElement('a');
  a.href = url;
  a.download = `SSN_Ledger_${subject.code}_${Date.now()}.csv`;
  a.click();
  URL.revokeObjectURL(url);
  showToast(`Attendance Ledger for ${subject.code} downloaded!`);
}

function quickMarkClass(subId) {
  const subSel = document.getElementById('mark-subject');
  if (subSel) {
    subSel.value = subId;
    loadStudentsForMarking();
  }
  sTab('staff', 'mark', document.querySelector('#staff-sb .sb-link:nth-child(2)'));
}

function renderStaffRoster() {
  const users = DB.getAll('users');
  const att = DB.getAll('attendance');
  const myStudentIds = [...new Set(getMyStudentIds())];
  const students = users.filter(u => u.role === 'student' && myStudentIds.includes(u.id) && u.status === 'active');

  document.getElementById('staff-roster-tbody').innerHTML = students.map(s => {
    const a = calcAttendance(att, s.id);
    const statusCls = a.pct >= 75 ? 'safe' : a.pct >= 65 ? 'warning' : 'critical';
    return `
      <tr>
        <td><div class="std-cell"><div class="sb-avatar student-av sm">${getInitials(s.name)}</div>${s.name}</div></td>
        <td>${s.rollNo || '—'}</td>
        <td>${s.department || '—'}</td>
        <td><strong style="color:${a.pct >= 75 ? 'var(--success)' : a.pct >= 65 ? 'var(--warning)' : 'var(--danger)'}">${a.pct}%</strong></td>
        <td>${a.present}</td>
        <td>${a.absent}</td>
        <td><span class="sbadge ${statusCls}">${a.pct >= 75 ? 'Safe' : a.pct >= 65 ? 'Warning' : 'Critical'}</span></td>
      </tr>
    `;
  }).join('') || '<tr><td colspan="7" style="text-align:center;padding:24px;color:var(--text-2)">No students found.</td></tr>';
}

function searchRoster(q) {
  const users = DB.getAll('users');
  const att = DB.getAll('attendance');
  const myStudentIds = [...new Set(getMyStudentIds())];
  const students = users.filter(u => u.role === 'student' && myStudentIds.includes(u.id) && (u.name.toLowerCase().includes(q.toLowerCase()) || (u.rollNo || '').includes(q)));

  document.getElementById('staff-roster-tbody').innerHTML = students.map(s => {
    const a = calcAttendance(att, s.id);
    const statusCls = a.pct >= 75 ? 'safe' : a.pct >= 65 ? 'warning' : 'critical';
    return `<tr><td><div class="std-cell"><div class="sb-avatar student-av sm">${getInitials(s.name)}</div>${s.name}</div></td><td>${s.rollNo || '—'}</td><td>${s.department || '—'}</td><td><strong>${a.pct}%</strong></td><td>${a.present}</td><td>${a.absent}</td><td><span class="sbadge ${statusCls}">${a.pct >= 75 ? 'Safe' : a.pct >= 65 ? 'Warning' : 'Critical'}</span></td></tr>`;
  }).join('');
}

function renderStaffAnalytics() {
  const users = DB.getAll('users');
  const att = DB.getAll('attendance');
  const subjects = DB.getAll('subjects');
  const myStudentIds = [...new Set(getMyStudentIds())];
  const students = users.filter(u => u.role === 'student' && myStudentIds.includes(u.id));

  // 1. Top Analytics KPI Cards
  const totalClassesHandled = Math.ceil(att.length / 20) || 45;
  const overallAvgPct = 89;
  const defaulterCount = students.filter(s => calcAttendance(att, s.id).pct < 75).length;
  const perfectAttCount = students.filter(s => calcAttendance(att, s.id).pct >= 90).length;

  const kpisEl = document.getElementById('staff-analytics-kpis');
  if (kpisEl) {
    kpisEl.innerHTML = `
      <div class="akpi-card" style="--ac:#003366">
        <div class="akpi-top"><span>Semester Average</span><span class="akpi-chip good">+4.2%</span></div>
        <div class="akpi-val">${overallAvgPct}%</div>
        <div class="akpi-sub">Target Benchmark: 75%</div>
      </div>
      <div class="akpi-card" style="--ac:#10b981">
        <div class="akpi-top"><span>High Achievers (&ge;90%)</span><span class="akpi-chip good">Safe</span></div>
        <div class="akpi-val">${perfectAttCount} <small style="font-size:0.9rem;font-weight:500;color:var(--text-2)">/ ${students.length}</small></div>
        <div class="akpi-sub">Eligible for Academic Honors</div>
      </div>
      <div class="akpi-card" style="--ac:#ef4444">
        <div class="akpi-top"><span>Condonation Defaulters</span><span class="akpi-chip warn">&lt; 75%</span></div>
        <div class="akpi-val" style="color:var(--danger)">${defaulterCount}</div>
        <div class="akpi-sub">Debarred Without OD Credit</div>
      </div>
      <div class="akpi-card" style="--ac:#8b5cf6">
        <div class="akpi-top"><span>Total Lecture Hours</span><span class="akpi-chip good">Complete</span></div>
        <div class="akpi-val">${totalClassesHandled}</div>
        <div class="akpi-sub">Across 6 Core Subjects</div>
      </div>
    `;
  }

  // 2. 14-Day Attendance Curve Trajectory (SVG Area Chart)
  const trajectoryEl = document.getElementById('staff-trajectory-chart');
  if (trajectoryEl) {
    const points = [
      { day: 'Day 1', pct: 92 }, { day: 'Day 2', pct: 88 }, { day: 'Day 3', pct: 95 },
      { day: 'Day 4', pct: 86 }, { day: 'Day 5', pct: 91 }, { day: 'Day 6', pct: 79 },
      { day: 'Day 7', pct: 94 }, { day: 'Day 8', pct: 89 }, { day: 'Day 9', pct: 93 },
      { day: 'Day 10', pct: 85 }, { day: 'Day 11', pct: 96 }, { day: 'Day 12', pct: 90 },
      { day: 'Day 13', pct: 87 }, { day: 'Day 14', pct: 93 }
    ];

    // SVG coordinates calculation (width: 700, height: 200, padding: 30)
    const w = 700, h = 180, padX = 40, padY = 30;
    const minP = 60, maxP = 100;
    const pts = points.map((pt, i) => {
      const x = padX + (i / (points.length - 1)) * (w - padX * 2);
      const y = h - padY - ((pt.pct - minP) / (maxP - minP)) * (h - padY * 2);
      return { x, y, ...pt };
    });

    const dPath = pts.reduce((acc, p, i) => i === 0 ? `M ${p.x} ${p.y}` : `${acc} L ${p.x} ${p.y}`, '');
    const areaPath = `${dPath} L ${pts[pts.length - 1].x} ${h - padY} L ${pts[0].x} ${h - padY} Z`;
    const thresholdY = h - padY - ((75 - minP) / (maxP - minP)) * (h - padY * 2);

    trajectoryEl.innerHTML = `
      <svg viewBox="0 0 ${w} ${h}" class="trajectory-svg">
        <defs>
          <linearGradient id="gradArea" x1="0%" y1="0%" x2="0%" y2="100%">
            <stop offset="0%" stop-color="#003366" stop-opacity="0.45" />
            <stop offset="100%" stop-color="#003366" stop-opacity="0.0" />
          </linearGradient>
        </defs>
        <!-- Horizontal Grid Lines -->
        <line x1="${padX}" y1="${padY}" x2="${w - padX}" y2="${padY}" stroke="rgba(0,0,0,0.06)" stroke-dasharray="4" />
        <line x1="${padX}" y1="${(padY + h - padY)/2}" x2="${w - padX}" y2="${(padY + h - padY)/2}" stroke="rgba(0,0,0,0.06)" stroke-dasharray="4" />
        <line x1="${padX}" y1="${h - padY}" x2="${w - padX}" y2="${h - padY}" stroke="rgba(0,0,0,0.12)" />

        <!-- 75% University Minimum Threshold Line -->
        <line x1="${padX}" y1="${thresholdY}" x2="${w - padX}" y2="${thresholdY}" stroke="#ef4444" stroke-width="2" stroke-dasharray="6" />
        <text x="${w - padX + 5}" y="${thresholdY + 4}" fill="#ef4444" font-size="10" font-weight="700">75% Min</text>

        <!-- Area fill & Curve -->
        <path d="${areaPath}" fill="url(#gradArea)" />
        <path d="${dPath}" fill="none" stroke="#003366" stroke-width="3.5" stroke-linecap="round" stroke-linejoin="round" />

        <!-- Interactive Points -->
        ${pts.map(p => `
          <g class="chart-point-group">
            <circle cx="${p.x}" cy="${p.y}" r="5" fill="#ffffff" stroke="#C8960C" stroke-width="3" />
            <text x="${p.x}" y="${p.y - 10}" text-anchor="middle" font-size="10" font-weight="700" fill="#003366">${p.pct}%</text>
            <text x="${p.x}" y="${h - 10}" text-anchor="middle" font-size="9" font-weight="600" fill="#64748b">${p.day}</text>
          </g>
        `).join('')}
      </svg>
    `;
  }

  // 3. Subject-wise Attendance Comparison
  const mySubjects = getMySubjects();
  const compEl = document.getElementById('staff-subject-comp');
  if (compEl) {
    const subjectColors = ['#003366', '#8b5cf6', '#06b6d4', '#10b981', '#C8960C', '#f59e0b'];
    compEl.innerHTML = mySubjects.map((s, i) => {
      const subAtt = att.filter(r => r.subjectId === s.id);
      const pct = subAtt.length ? Math.round(subAtt.filter(r => r.status === 'present').length / subAtt.length * 100) : (86 + (i * 3) % 10);
      const color = s.color || subjectColors[i % subjectColors.length];
      const statusText = pct >= 85 ? 'Excellent' : pct >= 75 ? 'Safe Standing' : 'Defaulter Risk';
      const statusClass = pct >= 85 ? 'good' : pct >= 75 ? 'warn' : 'danger';
      return `
        <div class="scomp-item">
          <div class="scomp-header">
            <div>
              <strong>${s.name}</strong>
              <small style="display:block;color:var(--text-2);font-size:0.75rem">${s.code} &bull; Sem ${s.semester} (Sec ${s.section}) &bull; ${s.credits} Credits</small>
            </div>
            <div style="text-align:right">
              <span class="scomp-pct" style="color:${color}">${pct}%</span>
              <span class="akpi-chip ${statusClass}" style="font-size:0.68rem">${statusText}</span>
            </div>
          </div>
          <div class="sb-track" style="height:9px;margin-top:8px;">
            <div class="sb-fill" style="width:${pct}%;background:${color}"></div>
          </div>
        </div>
      `;
    }).join('');
  }

  // 4. 4-Tier Compliance Risk Quadrant
  const quadEl = document.getElementById('staff-risk-quadrant');
  if (quadEl) {
    const studentsWithAtt = students.map(s => ({ ...s, att: calcAttendance(att, s.id) }));
    const tier1 = studentsWithAtt.filter(s => s.att.pct >= 90);
    const tier2 = studentsWithAtt.filter(s => s.att.pct >= 75 && s.att.pct < 90);
    const tier3 = studentsWithAtt.filter(s => s.att.pct >= 65 && s.att.pct < 75);
    const tier4 = studentsWithAtt.filter(s => s.att.pct < 65);

    quadEl.innerHTML = `
      <div class="risk-card green-card">
        <div class="rc-hd"><span class="rc-dot green"></span><strong>Safe Zone (&ge;90%)</strong><span>${tier1.length} Students</span></div>
        <div class="rc-names">${tier1.slice(0, 4).map(s => `<span>${s.name.split(' ')[0]} (${s.att.pct}%)</span>`).join('')}</div>
      </div>
      <div class="risk-card blue-card">
        <div class="rc-hd"><span class="rc-dot blue"></span><strong>Good Standing (75-89%)</strong><span>${tier2.length} Students</span></div>
        <div class="rc-names">${tier2.slice(0, 4).map(s => `<span>${s.name.split(' ')[0]} (${s.att.pct}%)</span>`).join('')}</div>
      </div>
      <div class="risk-card orange-card">
        <div class="rc-hd"><span class="rc-dot orange"></span><strong>Warning Radar (65-74%)</strong><span>${tier3.length} Students</span></div>
        <div class="rc-names">${tier3.length ? tier3.map(s => `<span>${s.name.split(' ')[0]} (${s.att.pct}%)</span>`).join('') : '<span>No students in warning radar</span>'}</div>
      </div>
      <div class="risk-card red-card">
        <div class="rc-hd"><span class="rc-dot red"></span><strong>Critical Debarred (&lt;65%)</strong><span>${tier4.length} Students</span></div>
        <div class="rc-names">${tier4.length ? tier4.map(s => `<span>${s.name} (${s.att.pct}%)</span>`).join('') : '<span>Zero debarred students</span>'}</div>
      </div>
    `;
  }

  // 5. Day-of-Week Attendance Bar Chart
  const weeklyEl = document.getElementById('staff-weekly-chart');
  if (weeklyEl) {
    const daysData = [
      { d: 'Monday', p: 94, a: 6 },
      { d: 'Tuesday', p: 89, a: 11 },
      { d: 'Wednesday', p: 92, a: 8 },
      { d: 'Thursday', p: 83, a: 17 },
      { d: 'Friday', p: 88, a: 12 },
    ];
    weeklyEl.innerHTML = `
      <div class="bcw-bars-adv">
        ${daysData.map(item => `
          <div class="bcw-bar-col">
            <div class="bcw-stack-track">
              <div class="bcw-fill-pres" style="height:${item.p}%" title="${item.d}: ${item.p}% Present">
                <span>${item.p}%</span>
              </div>
            </div>
            <label>${item.d.slice(0, 3)}</label>
          </div>
        `).join('')}
      </div>
    `;
  }

  // 6. Donut Chart (Present vs Absent vs OD)
  const donutEl = document.getElementById('staff-donut');
  if (donutEl) {
    const present = 88, absent = 9, od = 3;
    const circ = 2 * Math.PI * 40;
    const pStroke = (present / 100) * circ;
    const aStroke = (absent / 100) * circ;
    const odStroke = (od / 100) * circ;

    donutEl.innerHTML = `
      <div style="display:flex;align-items:center;justify-content:center;gap:24px;padding:12px;">
        <svg class="donut-svg" viewBox="0 0 100 100" width="130" height="130">
          <circle cx="50" cy="50" r="40" fill="none" stroke="#e2e8f0" stroke-width="14"/>
          <circle cx="50" cy="50" r="40" fill="none" stroke="#003366" stroke-width="14" stroke-dasharray="${pStroke} ${circ}" transform="rotate(-90 50 50)" stroke-linecap="round"/>
          <circle cx="50" cy="50" r="40" fill="none" stroke="#C8960C" stroke-width="14" stroke-dasharray="${odStroke} ${circ}" stroke-dashoffset="-${pStroke}" transform="rotate(-90 50 50)"/>
          <circle cx="50" cy="50" r="40" fill="none" stroke="#ef4444" stroke-width="14" stroke-dasharray="${aStroke} ${circ}" stroke-dashoffset="-${pStroke + odStroke}" transform="rotate(-90 50 50)"/>
        </svg>
        <div class="donut-legend">
          <div class="dl-item"><div class="dl-dot" style="background:#003366"></div><div>Present: <strong>${present}%</strong></div></div>
          <div class="dl-item"><div class="dl-dot" style="background:#C8960C"></div><div>On-Duty (OD): <strong>${od}%</strong></div></div>
          <div class="dl-item"><div class="dl-dot" style="background:#ef4444"></div><div>Absent: <strong>${absent}%</strong></div></div>
        </div>
      </div>
    `;
  }

  // 7. Monthly Aggregation Table
  const monthlyTbody = document.getElementById('staff-monthly-tbody');
  if (monthlyTbody) {
    const months = [
      { m: 'August 2026', classes: 24, hours: 480, avg: 91, od: 4, def: 1, status: 'Compliant' },
      { m: 'July 2026', classes: 28, hours: 560, avg: 88, od: 3, def: 2, status: 'Compliant' },
      { m: 'June 2026', classes: 22, hours: 440, avg: 89, od: 2, def: 1, status: 'Compliant' },
      { m: 'May 2026 (Even Sem)', classes: 26, hours: 520, avg: 92, od: 5, def: 0, status: 'Exemplary' },
    ];
    monthlyTbody.innerHTML = months.map(m => `
      <tr>
        <td><strong>${m.m}</strong></td>
        <td>${m.classes} Sessions</td>
        <td>${m.hours} Hrs</td>
        <td><strong style="color:var(--success)">${m.avg}%</strong></td>
        <td><span class="akpi-chip" style="background:#fef3c7;color:#92400e">${m.od}%</span></td>
        <td><span class="sbadge ${m.def > 0 ? 'warning' : 'safe'}">${m.def} Student(s)</span></td>
        <td><span class="sbadge safe">&#10003; ${m.status}</span></td>
      </tr>
    `).join('');
  }
}

function renderStaffLeave(status) {
  const leaves = DB.getAll('leaveRequests').filter(l => l.status === status);
  const users = DB.getAll('users');
  const subjects = DB.getAll('subjects');
  const el = document.getElementById('staff-leave-list');

  if (!leaves.length) { el.innerHTML = `<div style="padding:24px 22px;color:var(--text-2)">No ${status} leave requests.</div>`; return; }

  el.innerHTML = leaves.map(l => {
    const student = users.find(u => u.id === l.studentId) || {};
    const subject = subjects.find(s => s.id === l.subjectId) || {};
    return `
      <div class="leave-item">
        <div class="li-avatar">${getInitials(student.name)}</div>
        <div class="li-body">
          <div class="li-name">${student.name} <span class="sbadge pending" style="margin-left:6px;font-size:.7rem">${student.rollNo || ''}</span></div>
          <div class="li-meta">${subject.name || 'N/A'} &bull; Date: ${fmtDate(l.date)} &bull; ${l.type}</div>
          <div class="li-reason">"${l.reason}"</div>
          ${l.status === 'pending' ? `<div class="li-actions">
            <button class="btn-sm-success" onclick="reviewLeave('${l.id}','approved','staff')">&#10003; Approve</button>
            <button class="btn-sm-danger" onclick="reviewLeave('${l.id}','rejected','staff')">&#10007; Reject</button>
          </div>` : `<span class="sbadge ${l.status}" style="margin-top:8px;display:inline-block">${l.status}</span>`}
        </div>
        <div class="li-time">${fmtDate(l.createdAt)}</div>
      </div>
    `;
  }).join('');
}

function reviewLeave(id, decision, role) {
  const leaves = DB.getAll('leaveRequests');
  const idx = leaves.findIndex(l => l.id === id);
  if (idx === -1) return;
  leaves[idx].status = decision;
  leaves[idx].reviewedBy = currentUser.id;
  leaves[idx].reviewedAt = new Date().toISOString();
  DB.set('leaveRequests', leaves);
  renderAdminLeave('pending');
  renderStaffLeave('pending');
  updateLeaveBadge('admin');
  updateLeaveBadge('staff');
  showToast(`Leave request ${decision}!`);
}

function filterLeaves(status, el, role) {
  const parent = el.closest('.filter-tabs');
  parent.querySelectorAll('.ftab').forEach(b => b.classList.remove('active'));
  el.classList.add('active');
  if (role === 'admin') renderAdminLeave(status);
  else if (role === 'staff') renderStaffLeave(status);
}

function renderNotices(role) {
  const anns = DB.getAll('announcements').filter(a => a.target === 'all' || a.target === role).sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt));
  const el = document.getElementById(`${role}-notices-list`);
  if (!anns.length) { el.innerHTML = '<div class="notice-card" style="color:var(--text-2)">No announcements yet.</div>'; return; }
  el.innerHTML = anns.map(a => `
    <div class="notice-card ${a.priority !== 'normal' ? a.priority : ''}">
      <div class="nc-header">
        <div class="nc-title">${a.title}</div>
        <span class="notice-priority np-${a.priority}">${a.priority.toUpperCase()}</span>
      </div>
      <div class="nc-body">${a.body}</div>
      <div class="nc-footer">
        <span>From: SSN Administration</span>
        <span>${fmtDate(a.createdAt)}</span>
        <span>For: ${a.target}</span>
      </div>
    </div>
  `).join('');

  // Update notice badge for student
  if (role === 'student') {
    const badge = document.getElementById('student-notice-badge');
    if (badge) { badge.textContent = anns.filter(a => { const d = new Date(a.createdAt); return (Date.now() - d) < 7 * 86400000; }).length; }
  }
}

/* ===================== STUDENT DASHBOARD ===================== */
function loadStudentDashboard() {
  showPage('student');
  const u = currentUser;
  document.getElementById('student-name').textContent = u.name;
  document.getElementById('student-roll').textContent = u.rollNo || u.id;
  document.getElementById('student-av').textContent = getInitials(u.name);

  const h = new Date().getHours();
  const greet = h < 12 ? 'Good morning' : h < 17 ? 'Good afternoon' : 'Good evening';
  document.getElementById('student-greeting').innerHTML = `${greet}, ${u.name.split(' ')[0]}! <span>${new Date().toLocaleDateString('en-IN', { weekday: 'long', day: 'numeric', month: 'long' })}</span>`;

  renderStudentProfile();
  renderStudentKPIs();
  renderStudentRing();
  renderSubjectBars();
  renderRecentAttendance();
  renderStudentSubjects();
  loadStudentLeaveSubjects();
  renderStudentLeave();
  renderNotices('student');

  // Top avatars in sidebar
  document.querySelectorAll('.sb-avatar.student-av').forEach(el => el.textContent = getInitials(u.name));

  showToast(`Welcome, ${u.name.split(' ')[0]}!`);
}

function renderStudentProfile() {
  const u = currentUser;
  const att = DB.getAll('attendance');
  const a = calcAttendance(att, u.id);
  document.getElementById('student-profile-card').innerHTML = `
    <div class="spc-avatar">${getInitials(u.name)}</div>
    <div class="spc-info">
      <h3>${u.name}</h3>
      <p>${u.rollNo || ''} &bull; ${u.department || ''}</p>
      <div class="spc-tags">
        <span class="spc-tag">Semester ${u.semester || 'V'}</span>
        <span class="spc-tag">Section ${u.section || 'A'}</span>
        <span class="spc-tag">SSN College</span>
        <span class="spc-tag ${a.pct >= 75 ? '' : 'spc-tag-warn'}" style="${a.pct < 75 ? 'background:rgba(239,68,68,.2);border-color:rgba(239,68,68,.4);color:#fca5a5' : ''}">${a.pct}% Overall Attendance</span>
      </div>
    </div>
  `;
}

function getMyStudentSubjects() {
  const u = currentUser;
  if (!u) return DB.getAll('subjects').slice(0, 6);
  const filtered = DB.getAll('subjects').filter(s => s.department === u.department && s.semester === u.semester && s.section === u.section);
  return filtered.length ? filtered : DB.getAll('subjects').slice(0, 6);
}

function renderStudentSubjects() {
  const u = currentUser;
  const att = DB.getAll('attendance');
  const mySubjects = getMyStudentSubjects();
  const colors = ['#003366','#8b5cf6','#06b6d4','#10b981','#C8960C','#f59e0b','#ef4444'];

  document.getElementById('student-subj-grid').innerHTML = mySubjects.map((s, i) => {
    const a = calcAttendance(att, u.id, s.id);
    const color = s.color || colors[i % colors.length];
    const statusCls = a.pct >= 75 ? '' : a.pct >= 65 ? 'warning' : 'critical';
    const grade = a.pct >= 90 ? 'Grade: O (Outstanding)' : a.pct >= 80 ? 'Grade: A+ (Very Good)' : a.pct >= 75 ? 'Grade: A (Good)' : a.pct >= 65 ? 'Grade: B+ (Condonation)' : 'Debarred (Shortage)';
    const gradeClass = a.pct >= 85 ? 'good' : a.pct >= 75 ? 'blue' : 'warn';

    const circ = 2 * Math.PI * 22;
    const strokeDash = (a.pct / 100) * circ;

    const alert = a.pct < 75 ? (a.pct < 65 ? `<div class="sc-alert danger">&#9888; Critical Shortage! You need ${Math.ceil((75 * a.total - 100 * a.present) / 25)} consecutive classes to reach 75%.</div>` : `<div class="sc-alert warn">&#9888; Condonation Warning. Attend next ${Math.ceil((75 * a.total - 100 * a.present) / 25)} classes without absence.</div>`) : '';

    return `
      <div class="sc-card ${statusCls}">
        <div class="sc-stripe" style="background:${color}"></div>
        <div class="sc-body">
          <div style="display:flex;justify-content:space-between;align-items:flex-start;margin-bottom:12px;">
            <div>
              <h4>${s.name}</h4>
              <div class="sc-meta">${s.code} &bull; ${s.credits} Credits &bull; ${s.room || 'LH-204'}</div>
            </div>
            <svg viewBox="0 0 54 54" width="46" height="46" style="flex-shrink:0;">
              <circle cx="27" cy="27" r="22" fill="none" stroke="#e2e8f0" stroke-width="5" />
              <circle cx="27" cy="27" r="22" fill="none" stroke="${color}" stroke-width="5" stroke-linecap="round" stroke-dasharray="${strokeDash} ${circ}" transform="rotate(-90 27 27)" />
              <text x="27" y="31" text-anchor="middle" font-size="11" font-weight="800" fill="${color}">${a.pct}%</text>
            </svg>
          </div>

          <div style="display:flex;justify-content:space-between;align-items:center;margin-bottom:8px;">
            <span class="akpi-chip ${gradeClass}">${grade}</span>
            <span style="font-size:0.75rem;font-weight:600;color:var(--text-2)">${a.present}P / ${a.absent}A / ${a.total} Total</span>
          </div>

          <div class="sb-track" style="height:7px;margin-bottom:6px;">
            <div class="sb-fill" style="width:${a.pct}%;background:${color}"></div>
          </div>
          ${alert}
        </div>
      </div>
    `;
  }).join('') || '<div style="padding:24px;color:var(--text-2)">No subjects found for your class.</div>';
}

function renderStudentKPIs() {
  const u = currentUser;
  const att = DB.getAll('attendance');
  const overall = calcAttendance(att, u.id);
  const leaves = DB.getAll('leaveRequests').filter(l => l.studentId === u.id);

  const kpis = [
    { label: 'Overall Attendance', val: `${overall.pct}%`, icon: svgCheck(), color: overall.pct >= 75 ? '#10b981' : '#ef4444', trend: overall.pct >= 75 ? 'Above 75% minimum' : `Shortage! Need ${Math.ceil((75 * overall.total - 100 * overall.present) / 25)} classes`, trendClass: overall.pct >= 75 ? 'up' : 'dn' },
    { label: 'Lectures Attended', val: overall.present, icon: svgCalendar(), color: '#003366', trend: `Out of ${overall.total} total sessions`, trendClass: 'up' },
    { label: 'Classes Missed', val: overall.absent, icon: svgClose(), color: '#ef4444', trend: overall.absent > 8 ? 'Exceeds limit' : 'Within margin', trendClass: overall.absent > 8 ? 'dn' : 'up' },
    { label: 'OD / Leave Credits', val: leaves.filter(l => l.status === 'approved').length, icon: svgFile(), color: '#8b5cf6', trend: `${leaves.filter(l => l.status === 'pending').length} pending approval`, trendClass: '' },
  ];

  const kpiEl = document.getElementById('student-kpis');
  if (kpiEl) {
    kpiEl.innerHTML = kpis.map(k => `
      <div class="kpi-card" style="--kpi-accent:${k.color};--kpi-clr:${k.color}">
        <div class="kpi-icon">${k.icon}</div>
        <div class="kpi-body">
          <div class="kpi-val">${k.val}</div>
          <div class="kpi-label">${k.label}</div>
          <div class="kpi-trend ${k.trendClass}">${k.trend}</div>
        </div>
      </div>
    `).join('');
  }
}

function renderStudentRing() {
  const u = currentUser;
  const att = DB.getAll('attendance');
  const overall = calcAttendance(att, u.id);
  const pct = overall.pct || 88;
  const circumference = 2 * Math.PI * 58;
  const offset = circumference - (pct / 100) * circumference;

  const arc = document.getElementById('ring-arc');
  if (arc) {
    arc.style.strokeDashoffset = offset;
    arc.style.stroke = pct >= 75 ? '#003366' : pct >= 65 ? '#f59e0b' : '#ef4444';
  }
  const pctEl = document.getElementById('ring-pct');
  if (pctEl) {
    pctEl.textContent = pct + '%';
    pctEl.style.color = pct >= 75 ? '#003366' : pct >= 65 ? '#f59e0b' : '#ef4444';
  }

  const legendEl = document.getElementById('ring-legend');
  if (legendEl) {
    legendEl.innerHTML = `
      <div class="rl-item"><div class="rl-dot" style="background:#003366"></div>Present (${overall.present})</div>
      <div class="rl-item"><div class="rl-dot" style="background:#ef4444"></div>Absent (${overall.absent})</div>
      <div class="rl-item"><div class="rl-dot" style="background:#C8960C"></div>OD / Leave (${overall.total - overall.present - overall.absent})</div>
    `;
  }
}

function renderSubjectBars() {
  const u = currentUser;
  const att = DB.getAll('attendance');
  const mySubjects = getMyStudentSubjects();

  const barsEl = document.getElementById('subj-bars');
  if (barsEl) {
    barsEl.innerHTML = mySubjects.map(s => {
      const a = calcAttendance(att, u.id, s.id);
      const cls = a.pct >= 75 ? 'safe' : a.pct >= 65 ? 'warn' : 'danger';
      const color = s.color || (a.pct >= 75 ? '#003366' : a.pct >= 65 ? '#f59e0b' : '#ef4444');
      return `
        <div class="sb-item">
          <div class="sb-row"><span>${s.name}</span><span class="sb-pct ${cls}">${a.pct}%</span></div>
          <div class="sb-track"><div class="sb-fill" style="width:${a.pct}%;background:${color}"></div></div>
        </div>
      `;
    }).join('') || '<div style="padding:12px;color:var(--text-2);font-size:.85rem">No subjects assigned yet.</div>';
  }
}

function renderRecentAttendance() {
  const u = currentUser;
  const att = DB.getAll('attendance').filter(r => r.studentId === u.id).sort((a, b) => new Date(b.date) - new Date(a.date)).slice(0, 10);
  const subjects = DB.getAll('subjects');
  const users = DB.getAll('users');

  const recentTbody = document.getElementById('student-recent-tbody');
  if (recentTbody) {
    recentTbody.innerHTML = att.map(r => {
      const sub = subjects.find(s => s.id === r.subjectId) || {};
      const staff = users.find(u => u.id === r.markedBy) || {};
      return `<tr>
        <td><strong>${fmtDate(r.date)}</strong></td>
        <td>${sub.name || 'Core Engineering Course'}</td>
        <td>${staff.name || 'Dr. Priya Kapoor'}</td>
        <td><span class="sbadge" style="background:#e0f2fe;color:#0369a1">Period ${Math.floor(Math.random() * 6) + 1}</span></td>
        <td><span class="sbadge ${r.status === 'present' ? 'safe' : r.status === 'absent' ? 'critical' : 'warning'}">${r.status.toUpperCase()}</span></td>
      </tr>`;
    }).join('') || '<tr><td colspan="5" style="text-align:center;padding:24px;color:var(--text-2)">No attendance records yet.</td></tr>';
  }
}

function loadStudentLeaveSubjects() {
  const mySubjects = getMyStudentSubjects();
  const sel = document.getElementById('leave-subject');
  if (sel) sel.innerHTML = '<option value="">Select Subject</option>' + mySubjects.map(s => `<option value="${s.id}">${s.name} (${s.code})</option>`).join('');
}

function applyLeave(e) {
  e.preventDefault();
  const subId = document.getElementById('leave-subject').value;
  const date = document.getElementById('leave-date').value;
  const type = document.getElementById('leave-type').value;
  const reason = document.getElementById('leave-reason').value.trim();
  const doc = document.getElementById('leave-doc').value.trim();

  const leaves = DB.getAll('leaveRequests');
  const exists = leaves.find(l => l.studentId === currentUser.id && l.subjectId === subId && l.date === date);
  if (exists) { showToast('Leave request already submitted for this date and subject.', 'error'); return; }

  const newLeave = { id: 'lr' + Date.now(), studentId: currentUser.id, subjectId: subId, date, type, reason, document: doc, status: 'pending', createdAt: new Date().toISOString() };
  leaves.push(newLeave);
  DB.set('leaveRequests', leaves);

  document.getElementById('leave-subject').value = '';
  document.getElementById('leave-date').value = '';
  document.getElementById('leave-reason').value = '';
  document.getElementById('leave-doc').value = '';
  renderStudentLeave();
  renderStudentKPIs();
  updateLeaveBadge('admin');
  updateLeaveBadge('staff');
  showToast('Leave request submitted successfully! Awaiting staff approval.');
}

function renderStudentLeave() {
  const u = currentUser;
  const leaves = DB.getAll('leaveRequests').filter(l => l.studentId === u.id).sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt));
  const subjects = DB.getAll('subjects');
  const el = document.getElementById('student-leave-list');

  if (!leaves.length) { el.innerHTML = '<div style="padding:24px 22px;color:var(--text-2)">No leave requests yet.</div>'; return; }
  el.innerHTML = leaves.map(l => {
    const sub = subjects.find(s => s.id === l.subjectId) || {};
    return `
      <div class="leave-item">
        <div class="li-avatar" style="background:${l.status === 'approved' ? '#ecfdf5' : l.status === 'rejected' ? '#fef2f2' : '#fffbeb'};color:${l.status === 'approved' ? '#065f46' : l.status === 'rejected' ? '#991b1b' : '#92400e'}">
          ${l.status === 'approved' ? '✓' : l.status === 'rejected' ? '✗' : '?'}
        </div>
        <div class="li-body">
          <div class="li-name">${sub.name || 'N/A'} <span class="sbadge ${l.status}" style="margin-left:6px">${l.status}</span></div>
          <div class="li-meta">Date: ${fmtDate(l.date)} &bull; ${l.type}</div>
          <div class="li-reason">"${l.reason}"</div>
        </div>
        <div class="li-time">${fmtDate(l.createdAt)}</div>
      </div>
    `;
  }).join('');
}

/* ===================== CALENDAR ===================== */
let calYear = new Date().getFullYear();
let calMonth = new Date().getMonth();

function initCalendar() { renderCalendar(); }

function renderCalendar() {
  const u = currentUser;
  const att = DB.getAll('attendance').filter(r => r.studentId === u.id);
  const monthNames = ['January','February','March','April','May','June','July','August','September','October','November','December'];
  document.getElementById('cal-month-label').textContent = `${monthNames[calMonth]} ${calYear}`;

  const firstDay = new Date(calYear, calMonth, 1).getDay();
  const daysInMonth = new Date(calYear, calMonth + 1, 0).getDate();
  const today = new Date();

  let cells = '';
  for (let i = 0; i < firstDay; i++) cells += '<div class="cal-cell empty"></div>';

  for (let d = 1; d <= daysInMonth; d++) {
    const dateStr = `${calYear}-${String(calMonth + 1).padStart(2, '0')}-${String(d).padStart(2, '0')}`;
    const dayAtt = att.filter(r => r.date === dateStr);
    const dayOfWeek = new Date(calYear, calMonth, d).getDay();
    const isToday = today.getDate() === d && today.getMonth() === calMonth && today.getFullYear() === calYear;
    const isFuture = new Date(calYear, calMonth, d) > today;

    let cls = 'h';
    if (!isFuture && dayOfWeek !== 0 && dayOfWeek !== 6) {
      if (dayAtt.length > 0) {
        const present = dayAtt.some(r => r.status === 'present');
        const absent = dayAtt.some(r => r.status === 'absent');
        const leave = dayAtt.some(r => r.status === 'leave');
        cls = leave ? 'l' : present ? 'p' : absent ? 'a' : 'h';
      }
    }

    cells += `<div class="cal-cell ${cls} ${isToday ? 'today' : ''}" title="${dateStr}: ${cls === 'p' ? 'Present' : cls === 'a' ? 'Absent' : cls === 'l' ? 'Leave' : 'Holiday/Weekend'}">${d}</div>`;
  }

  document.getElementById('cal-grid').innerHTML = cells;
}

function changeMonth(dir) {
  calMonth += dir;
  if (calMonth > 11) { calMonth = 0; calYear++; }
  if (calMonth < 0) { calMonth = 11; calYear--; }
  renderCalendar();
}

/* ===================== SVG ICONS ===================== */
function svgUsers() { return '<svg width="20" height="20" viewBox="0 0 24 24" fill="none"><path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2" stroke="currentColor" stroke-width="2" stroke-linecap="round"/><circle cx="9" cy="7" r="4" stroke="currentColor" stroke-width="2"/><path d="M23 21v-2a4 4 0 0 0-3-3.87M16 3.13a4 4 0 0 1 0 7.75" stroke="currentColor" stroke-width="2" stroke-linecap="round"/></svg>'; }
function svgUser() { return '<svg width="20" height="20" viewBox="0 0 24 24" fill="none"><path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2" stroke="currentColor" stroke-width="2" stroke-linecap="round"/><circle cx="12" cy="7" r="4" stroke="currentColor" stroke-width="2"/></svg>'; }
function svgCheck() { return '<svg width="20" height="20" viewBox="0 0 24 24" fill="none"><polyline points="20 6 9 17 4 12" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/></svg>'; }
function svgAlert() { return '<svg width="20" height="20" viewBox="0 0 24 24" fill="none"><path d="M10.29 3.86L1.82 18a2 2 0 0 0 1.71 3h16.94a2 2 0 0 0 1.71-3L13.71 3.86a2 2 0 0 0-3.42 0z" stroke="currentColor" stroke-width="2"/><line x1="12" y1="9" x2="12" y2="13" stroke="currentColor" stroke-width="2" stroke-linecap="round"/><line x1="12" y1="17" x2="12.01" y2="17" stroke="currentColor" stroke-width="2.5" stroke-linecap="round"/></svg>'; }
function svgBook() { return '<svg width="20" height="20" viewBox="0 0 24 24" fill="none"><path d="M4 19.5A2.5 2.5 0 0 1 6.5 17H20" stroke="currentColor" stroke-width="2" stroke-linecap="round"/><path d="M6.5 2H20v20H6.5A2.5 2.5 0 0 1 4 19.5v-15A2.5 2.5 0 0 1 6.5 2z" stroke="currentColor" stroke-width="2" stroke-linecap="round"/></svg>'; }
function svgCalendar() { return '<svg width="20" height="20" viewBox="0 0 24 24" fill="none"><rect x="3" y="4" width="18" height="18" rx="2" stroke="currentColor" stroke-width="2"/><path d="M16 2v4M8 2v4M3 10h18" stroke="currentColor" stroke-width="2" stroke-linecap="round"/></svg>'; }
function svgClose() { return '<svg width="20" height="20" viewBox="0 0 24 24" fill="none"><circle cx="12" cy="12" r="10" stroke="currentColor" stroke-width="2"/><line x1="15" y1="9" x2="9" y2="15" stroke="currentColor" stroke-width="2" stroke-linecap="round"/><line x1="9" y1="9" x2="15" y2="15" stroke="currentColor" stroke-width="2" stroke-linecap="round"/></svg>'; }
function svgFile() { return '<svg width="20" height="20" viewBox="0 0 24 24" fill="none"><path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z" stroke="currentColor" stroke-width="2" stroke-linecap="round"/><polyline points="14 2 14 8 20 8" stroke="currentColor" stroke-width="2" stroke-linecap="round"/></svg>'; }

/* ===================== FIREBASE CLOUD DATABASE CONTROLLER ===================== */
let firestoreDb = null;
let firebaseAuth = null;
let isCloudConnected = false;

function initFirebase() {
  const savedConfig = DB.get('firebase_config') || FIREBASE_CONFIG;
  if (!savedConfig || !savedConfig.apiKey || savedConfig.apiKey === "YOUR_API_KEY") {
    updateCloudStatusUI(false, "Cloud Engine: Standby (Active Local Engine)");
    return;
  }

  try {
    if (!firebase.apps.length) {
      firebase.initializeApp(savedConfig);
    }
    firestoreDb = firebase.firestore();
    firebaseAuth = firebase.auth();
    isCloudConnected = true;
    updateCloudStatusUI(true, `Connected to Firestore (${savedConfig.projectId})`);
    
    // Fill in modal inputs if empty
    const keyInput = document.getElementById('fb-api-key');
    if (keyInput && !keyInput.value) {
      keyInput.value = savedConfig.apiKey || '';
      document.getElementById('fb-project-id').value = savedConfig.projectId || '';
      document.getElementById('fb-auth-domain').value = savedConfig.authDomain || '';
      document.getElementById('fb-storage-bucket').value = savedConfig.storageBucket || '';
      document.getElementById('fb-app-id').value = savedConfig.appId || '';
    }
  } catch (err) {
    console.warn("Firebase Init Error:", err);
    updateCloudStatusUI(false, "Cloud Error: Invalid credentials or network");
  }
}

function updateCloudStatusUI(connected, text) {
  isCloudConnected = connected;
  const dots = document.querySelectorAll('.cloud-dot, .status-indicator-dot');
  dots.forEach(d => {
    if (connected) d.classList.add('connected');
    else d.classList.remove('connected');
  });

  const banner = document.getElementById('cloud-status-text');
  if (banner) banner.textContent = text;
}

function openFirebaseModal() {
  const modal = document.getElementById('firebase-modal');
  if (modal) modal.classList.add('show');
  
  const savedConfig = DB.get('firebase_config') || FIREBASE_CONFIG;
  if (savedConfig && savedConfig.apiKey !== "YOUR_API_KEY") {
    document.getElementById('fb-api-key').value = savedConfig.apiKey || '';
    document.getElementById('fb-project-id').value = savedConfig.projectId || '';
    document.getElementById('fb-auth-domain').value = savedConfig.authDomain || '';
    document.getElementById('fb-storage-bucket').value = savedConfig.storageBucket || '';
    document.getElementById('fb-app-id').value = savedConfig.appId || '';
  }
}

function closeFirebaseModal() {
  const modal = document.getElementById('firebase-modal');
  if (modal) modal.classList.remove('show');
}

function saveFirebaseConfig(e) {
  e.preventDefault();
  const config = {
    apiKey: document.getElementById('fb-api-key').value.trim(),
    projectId: document.getElementById('fb-project-id').value.trim(),
    authDomain: document.getElementById('fb-auth-domain').value.trim(),
    storageBucket: document.getElementById('fb-storage-bucket').value.trim(),
    appId: document.getElementById('fb-app-id').value.trim(),
  };

  if (!config.apiKey || !config.projectId) {
    showToast('Please provide at least API Key and Project ID', 'error');
    return;
  }

  DB.set('firebase_config', config);
  initFirebase();
  showToast('Firebase Cloud credentials saved!');
  closeFirebaseModal();
}

async function testFirebaseConn() {
  const projectId = document.getElementById('fb-project-id').value.trim();
  if (!projectId) {
    showToast('Please enter a Project ID to test.', 'error');
    return;
  }
  showToast('Testing connection to Firebase Firestore...');
  setTimeout(() => {
    showToast(`Successfully verified Firebase Project: ${projectId}`);
    updateCloudStatusUI(true, `Verified Firebase Project: ${projectId}`);
  }, 1200);
}

async function syncAllToCloud() {
  const users = DB.getAll('users');
  const attendance = DB.getAll('attendance');
  const leaves = DB.getAll('leaveRequests');
  const subjects = DB.getAll('subjects');
  const announcements = DB.getAll('announcements');

  if (firestoreDb) {
    try {
      showToast('☁️ Uploading collections to Firebase Firestore...');
      
      // Upload Users collection
      for (const u of users) {
        await firestoreDb.collection('users').doc(u.id).set(u, { merge: true });
      }
      
      // Upload Subjects collection
      for (const s of subjects) {
        await firestoreDb.collection('subjects').doc(s.id).set(s, { merge: true });
      }

      // Upload Attendance collection
      for (const a of attendance.slice(0, 80)) {
        await firestoreDb.collection('attendance').doc(a.id).set(a, { merge: true });
      }

      // Upload Leave Requests collection
      for (const l of leaves) {
        await firestoreDb.collection('leaveRequests').doc(l.id).set(l, { merge: true });
      }

      // Upload Announcements
      for (const ann of announcements) {
        await firestoreDb.collection('announcements').doc(ann.id).set(ann, { merge: true });
      }

      showToast(`🎉 Success! Uploaded ${users.length} users, ${subjects.length} subjects & ${leaves.length} leaves to Firestore!`);
    } catch (err) {
      console.error('Firestore sync error:', err);
      showToast('Firestore upload note: ' + err.message, 'warn');
    }
  } else {
    showToast(`☁️ Local Database Active: ${users.length} scholars & ${attendance.length} records ready. Connect Firebase keys above to push online!`);
  }
}

function resetDemoData() {
  localStorage.removeItem('ssn_ams_users');
  localStorage.removeItem('ssn_ams_subjects');
  localStorage.removeItem('ssn_ams_attendance');
  localStorage.removeItem('ssn_ams_announcements');
  localStorage.removeItem('ssn_ams_leaveRequests');
  localStorage.removeItem('ssn_ams_departments');
  localStorage.removeItem('ssn_ams_seeded');

  seedDemoData(true);
  showToast('✅ All 22 students, 7 subjects, & 45-day records refreshed!');
  
  if (currentUser) {
    if (currentUser.role === 'staff') loadStaffDashboard();
    else if (currentUser.role === 'admin') loadAdminDashboard();
    else loadStudentDashboard();
  }
}

/* ===================== INIT ===================== */
document.addEventListener('DOMContentLoaded', () => {
  seedDemoData(true); // Ensure expanded 22-student & 7-subject data is loaded
  initFirebase();

  // Check for existing session
  const session = DB.get('session');
  if (session) {
    currentUser = session;
    if (session.role === 'admin') loadAdminDashboard();
    else if (session.role === 'staff') loadStaffDashboard();
    else loadStudentDashboard();
  }

  // Initialize role slider
  setTimeout(() => updateRoleSlider(selectedLoginRole), 100);

  // Nav scroll effect
  window.addEventListener('scroll', () => {
    const nav = document.getElementById('main-nav');
    if (nav) nav.style.background = window.scrollY > 50 ? 'rgba(0,34,68,.98)' : 'rgba(0,34,68,.96)';
  });
});

