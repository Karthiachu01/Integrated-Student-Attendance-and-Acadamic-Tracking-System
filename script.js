/****************************************************************
 * Final merged attendance app with futuristic UI + interactions
 ****************************************************************/

// --- Mock data (full set from original) ---
const studentsData = {
  CSE: {
    2: [
      { name: "Alice", regNo: "AHEC2021CSE001", dob: "2003-01-01", address: "City A", phone: "9876543210" },
      { name: "Bob", regNo: "AHEC2021CSE002", dob: "2003-02-02", address: "City B", phone: "9123456780" },
    ],
    3: [{ name: "Evan", regNo: "AHEC2020CSE003", dob: "2002-05-05", address: "City E", phone: "9898989898" }],
    4: [{ name: "George", regNo: "AHEC2019CSE004", dob: "2001-07-07", address: "City G", phone: "9555544443" }],
  },
  AIDS: {
    2: [{ name: "Kumar", regNo: "AHEC2021AIDS001", dob: "2003-01-01", address: "City X", phone: "9999999999" }],
    3: [{ name: "Latha", regNo: "AHEC2020AIDS002", dob: "2002-02-02", address: "City Y", phone: "8888888888" }],
    4: [{ name: "Mohan", regNo: "AHEC2019AIDS003", dob: "2001-03-03", address: "City Z", phone: "7777777777" }],
  },
  IT: {
    2: [{ name: "John", regNo: "AHEC2021IT001", dob: "2003-05-10", address: "City P", phone: "6666666666" }],
    3: [{ name: "Rita", regNo: "AHEC2020IT002", dob: "2002-06-15", address: "City Q", phone: "5555555555" }],
    4: [{ name: "Sam", regNo: "AHEC2019IT003", dob: "2001-07-20", address: "City R", phone: "4444444444" }],
  },
  ECE: {
    2: [{ name: "Nisha", regNo: "AHEC2021ECE001", dob: "2003-09-10", address: "City S", phone: "3333333333" }],
    3: [{ name: "Vikram", regNo: "AHEC2020ECE002", dob: "2002-10-11", address: "City T", phone: "2222222222" }],
    4: [{ name: "Priya", regNo: "AHEC2019ECE003", dob: "2001-12-12", address: "City U", phone: "1111111111" }],
  },
  EEE: {
    2: [{ name: "Deepa", regNo: "AHEC2021EEE001", dob: "2003-04-04", address: "City M", phone: "1010101010" }],
    3: [{ name: "Raj", regNo: "AHEC2020EEE002", dob: "2002-08-08", address: "City N", phone: "2020202020" }],
    4: [{ name: "Arun", regNo: "AHEC2019EEE003", dob: "2001-11-11", address: "City O", phone: "3030303030" }],
  },
};

// Mock marks data - Internal out of 60, Class Test out of 20
const studentMarks = {
  "AHEC2021CSE001": { internal1: 52, internal2: 48, classTest1: 18, classTest2: 16 },
  "AHEC2021CSE002": { internal1: 45, internal2: 50, classTest1: 17, classTest2: 19 },
  "AHEC2020CSE003": { internal1: 55, internal2: 53, classTest1: 19, classTest2: 18 },
  "AHEC2019CSE004": { internal1: 58, internal2: 56, classTest1: 20, classTest2: 19 },
  "AHEC2021AIDS001": { internal1: 48, internal2: 47, classTest1: 16, classTest2: 17 },
  "AHEC2020AIDS002": { internal1: 50, internal2: 52, classTest1: 18, classTest2: 17 },
  "AHEC2019AIDS003": { internal1: 53, internal2: 51, classTest1: 17, classTest2: 18 },
  "AHEC2021IT001": { internal1: 46, internal2: 49, classTest1: 18, classTest2: 16 },
  "AHEC2020IT002": { internal1: 54, internal2: 55, classTest1: 19, classTest2: 20 },
  "AHEC2019IT003": { internal1: 57, internal2: 54, classTest1: 20, classTest2: 18 },
  "AHEC2021ECE001": { internal1: 47, internal2: 48, classTest1: 17, classTest2: 18 },
  "AHEC2020ECE002": { internal1: 51, internal2: 49, classTest1: 18, classTest2: 17 },
  "AHEC2019ECE003": { internal1: 56, internal2: 57, classTest1: 19, classTest2: 20 },
  "AHEC2021EEE001": { internal1: 49, internal2: 46, classTest1: 16, classTest2: 17 },
  "AHEC2020EEE002": { internal1: 52, internal2: 54, classTest1: 18, classTest2: 19 },
  "AHEC2019EEE003": { internal1: 55, internal2: 58, classTest1: 19, classTest2: 20 },
};

// --- Subject / Marks configuration (for Mark Upload module) ---
const subjectsByDeptYear = {
  CSE: {
    2: ["Data Structures", "OOP", "Digital Logic"],
    3: ["DBMS", "Operating Systems", "Computer Networks"],
    4: ["Compiler Design", "Distributed Systems", "Machine Learning"],
  },
  AIDS: {
    2: ["Python Programming", "Linear Algebra"],
    3: ["Data Mining", "Statistics for AI"],
    4: ["Deep Learning", "Big Data Analytics"],
  },
  IT: {
    2: ["Web Technology", "Java Programming"],
    3: ["Computer Networks", "Software Engineering"],
    4: ["Cloud Computing", "Information Security"],
  },
  ECE: {
    2: ["Circuit Theory", "Signals & Systems"],
    3: ["Digital Communication", "Microprocessors"],
    4: ["VLSI Design", "Embedded Systems"],
  },
  EEE: {
    2: ["Electrical Machines", "Power Systems"],
    3: ["Control Systems", "Power Electronics"],
    4: ["High Voltage Engg.", "Smart Grid"],
  },
};

// Exam configuration
const examTypes = [
  { key: "internal1", label: "Internal 1", maxMarks: 60 },
  { key: "internal2", label: "Internal 2", maxMarks: 60 },
  { key: "classTest1", label: "Class Test 1", maxMarks: 20 },
  { key: "classTest2", label: "Class Test 2", maxMarks: 20 },
];

// In‑memory marks storage to simulate DB behaviour
// Structure: marksStore[dept][year][semester][subject][regNo][examKey] = { marks, status: 'draft' | 'final' }
const marksStore = {};

// --- Utilities ---
function makeCaptcha(len = 5) {
  const chars = "ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789";
  let s = "";
  for (let i = 0; i < len; i++) s += chars.charAt(Math.floor(Math.random() * chars.length));
  return s;
}
function todayDateString() {
  return new Date().toLocaleDateString();
}

// Central helper to send SMS to parent (replace alert with real SMS API in production)
function sendSmsToParent(phone, message) {
  if (!phone) return;
  // TODO: Call your backend SMS gateway API here.
  // Example (PHP endpoint):
  // fetch('send_sms.php', {
  //   method: 'POST',
  //   headers: { 'Content-Type': 'application/json' },
  //   body: JSON.stringify({ phone, message })
  // });
  // For now, simulate SMS sending with an alert so you can see it working:
  alert(`SMS sent to ${phone}: ${message}`);
}

// --- App state ---
let page = "login"; // 'login' | 'parentLogin' | 'dept' | 'student' | 'parentView' | 'marksUpload'
let instId = "";
let password = "";
let captcha = makeCaptcha();
let captchaInput = "";
let dept = "";
let year = "";
let students = [];
// history keyed by register number to avoid collisions when different students share a name
let history = {}; // { regNo: [{ name, date, status }, ...] }
let parentRegNo = "";
let parentDob = "";
let currentStudent = null; // For parent view

// Helper: collect marks for a given student from marksStore to show in parent view
function getStudentMarksForParent(student) {
  const result = {
    summary: { internal1: 0, internal2: 0, classTest1: 0, classTest2: 0 },
    detailed: [], // [{subject, semester, examKey, examLabel, marks, status, maxMarks}]
  };

  if (!student || !student.department || !student.year || !student.regNo) return result;

  const deptKey = student.department;
  const yearKey = Number(student.year);
  const regNo = student.regNo;

  const yearNode = marksStore[deptKey] && marksStore[deptKey][yearKey];
  if (!yearNode) return result;

  // Build detailed list and summary per exam type
  for (const [semKey, subjects] of Object.entries(yearNode)) {
    const semester = Number(semKey);
    for (const [subjectName, studentsByReg] of Object.entries(subjects)) {
      const examsForStudent = studentsByReg[regNo];
      if (!examsForStudent) continue;

      for (const examDef of examTypes) {
        const rec = examsForStudent[examDef.key];
        if (!rec || rec.marks === "" || rec.marks == null) continue;

        result.detailed.push({
          subject: subjectName,
          semester,
          examKey: examDef.key,
          examLabel: examDef.label,
          marks: rec.marks,
          status: rec.status,
          maxMarks: examDef.maxMarks,
        });

        // For summary, prefer FINAL over draft, overwrite with final when found
        const currentSummaryVal = result.summary[examDef.key];
        if (!currentSummaryVal || rec.status === "final") {
          result.summary[examDef.key] = rec.marks;
        }
      }
    }
  }

  // Ensure numeric defaults
  result.summary.internal1 = Number(result.summary.internal1) || 0;
  result.summary.internal2 = Number(result.summary.internal2) || 0;
  result.summary.classTest1 = Number(result.summary.classTest1) || 0;
  result.summary.classTest2 = Number(result.summary.classTest2) || 0;

  return result;
}

// root
const root = document.getElementById("appRoot");

// helper
function clearRoot() { root.innerHTML = ""; }

// header "Home" insertion is not required because we added explicit buttons on student page
// Render function
function render() {
  clearRoot();
  if (page === "login") renderLogin();
  else if (page === "parentLogin") renderParentLogin();
  else if (page === "dept") renderDept();
  else if (page === "student") renderStudent();
  else if (page === "parentView") renderParentView();
  else if (page === "marksUpload") renderMarksUpload();
}

/* -------------------- LOGIN (HOME) -------------------- */
function renderLogin() {
  const el = document.createElement("div");
  el.className = "w-full max-w-4xl fadeUp";
  el.innerHTML = `
    <div style="text-align:center;margin-bottom:2rem;">
      <h1 class="neon-text" style="font-size:32px;margin-bottom:12px;font-weight:700;">Welcome</h1>
      <p style="color:var(--text-secondary);font-size:1.05rem;">Arunachala Hi-Tech Engineering College</p>
    </div>
    
    <div class="login-grid" style="display:grid;grid-template-columns:1fr 1fr;gap:24px;">
      <!-- Institution Login Card -->
      <div class="glass-card" style="cursor:pointer;transition:all 0.3s ease;" onmouseover="this.style.transform='translateY(-6px)';this.style.boxShadow='0 20px 56px rgba(0,0,0,0.15)'" onmouseout="this.style.transform='translateY(0)';this.style.boxShadow='0 8px 32px rgba(0,0,0,0.08), 0 2px 8px rgba(0,0,0,0.04)'">
        <div style="text-align:center;">
          <div style="width:64px;height:64px;border-radius:16px;background:linear-gradient(135deg,var(--accent-primary),var(--accent-primary-2));display:flex;align-items:center;justify-content:center;margin:0 auto 16px;box-shadow:0 4px 16px rgba(37,99,235,0.3);">
            <svg xmlns="http://www.w3.org/2000/svg" style="width:32px;height:32px;color:white;" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4"/></svg>
          </div>
          <h2 class="neon-text" style="font-size:22px;margin-bottom:8px;font-weight:700;">Institution Login</h2>
          <p style="color:var(--text-secondary);margin-bottom:20px;font-size:0.95rem;">Secure portal for authorised staff</p>
          <button id="instLoginBtn" class="btn" style="width:100%;">Login as Staff</button>
        </div>
      </div>

      <!-- Parents Login Card -->
      <div class="glass-card" style="cursor:pointer;transition:all 0.3s ease;" onmouseover="this.style.transform='translateY(-6px)';this.style.boxShadow='0 20px 56px rgba(0,0,0,0.15)'" onmouseout="this.style.transform='translateY(0)';this.style.boxShadow='0 8px 32px rgba(0,0,0,0.08), 0 2px 8px rgba(0,0,0,0.04)'">
        <div style="text-align:center;">
          <div style="width:64px;height:64px;border-radius:16px;background:linear-gradient(135deg,#10b981,#34d399);display:flex;align-items:center;justify-content:center;margin:0 auto 16px;box-shadow:0 4px 16px rgba(16,185,129,0.3);">
            <svg xmlns="http://www.w3.org/2000/svg" style="width:32px;height:32px;color:white;" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z"/></svg>
          </div>
          <h2 class="neon-text" style="font-size:22px;margin-bottom:8px;font-weight:700;">Parents Login</h2>
          <p style="color:var(--text-secondary);margin-bottom:20px;font-size:0.95rem;">View your child's attendance & marks</p>
          <button id="parentLoginBtn" class="btn" style="width:100%;background:linear-gradient(135deg,#10b981,#34d399);box-shadow:0 4px 16px rgba(16,185,129,0.25);" onmouseover="this.style.background='linear-gradient(135deg,#34d399,#10b981)';this.style.boxShadow='0 6px 20px rgba(16,185,129,0.35)'" onmouseout="this.style.background='linear-gradient(135deg,#10b981,#34d399)';this.style.boxShadow='0 4px 16px rgba(16,185,129,0.25)'">Login as Parent</button>
        </div>
      </div>
    </div>
  `;
  root.appendChild(el);

  document.getElementById("instLoginBtn").addEventListener("click", () => {
    renderInstitutionLogin();
  });

  document.getElementById("parentLoginBtn").addEventListener("click", () => {
    page = "parentLogin";
    render();
  });
}

/* -------------------- INSTITUTION LOGIN -------------------- */
function renderInstitutionLogin() {
  const el = document.createElement("div");
  el.className = "glass-card w-full max-w-xl fadeUp";
  el.innerHTML = `
    <div style="text-align:center;">
      <h2 class="neon-text" style="font-size:24px;margin-bottom:8px;font-weight:700;">Institution Login</h2>
      <p style="color:var(--text-secondary);margin-bottom:16px;font-size:0.95rem;">Secure portal for authorised staff</p>
    </div>

    <form id="loginForm" style="display:grid;gap:14px;">
      <input id="instId" placeholder="Institution ID" required style="padding:14px;border-radius:12px;border:1px solid rgba(226,232,240,0.8);background:rgba(255,255,255,0.9);color:var(--text-primary);font-size:0.95rem;transition:border-color 0.2s ease,box-shadow 0.2s ease;" onfocus="this.style.borderColor='var(--accent-primary)';this.style.boxShadow='0 0 0 3px rgba(37,99,235,0.1)'" onblur="this.style.borderColor='rgba(226,232,240,0.8)';this.style.boxShadow='none'"/>
      <input id="password" type="password" placeholder="Password" required style="padding:14px;border-radius:12px;border:1px solid rgba(226,232,240,0.8);background:rgba(255,255,255,0.9);color:var(--text-primary);font-size:0.95rem;transition:border-color 0.2s ease,box-shadow 0.2s ease;" onfocus="this.style.borderColor='var(--accent-primary)';this.style.boxShadow='0 0 0 3px rgba(37,99,235,0.1)'" onblur="this.style.borderColor='rgba(226,232,240,0.8)';this.style.boxShadow='none'"/>
      <div style="display:flex;gap:10px;align-items:center;">
        <div style="flex:1;display:flex;align-items:center;justify-content:space-between;padding:12px;border-radius:12px;border:1px solid rgba(226,232,240,0.8);background:rgba(255,255,255,0.9);">
          <span id="captchaCode" class="mono-captcha"></span>
          <button id="refreshCaptcha" type="button" class="btn" style="padding:.4rem .7rem;font-weight:600;font-size:0.9rem;">↻</button>
        </div>
        <input id="captchaInput" placeholder="Enter Captcha" required style="flex:0.9;padding:14px;border-radius:12px;border:1px solid rgba(226,232,240,0.8);background:rgba(255,255,255,0.9);color:var(--text-primary);font-size:0.95rem;transition:border-color 0.2s ease,box-shadow 0.2s ease;" onfocus="this.style.borderColor='var(--accent-primary)';this.style.boxShadow='0 0 0 3px rgba(37,99,235,0.1)'" onblur="this.style.borderColor='rgba(226,232,240,0.8)';this.style.boxShadow='none'"/>
      </div>

      <button type="submit" class="btn" style="width:100%;">Login</button>
      <button type="button" id="backToHomeBtn" class="btn-ghost" style="width:100%;">Back to Home</button>
    </form>
  `;
  clearRoot();
  root.appendChild(el);

  document.getElementById("captchaCode").textContent = captcha;
  document.getElementById("refreshCaptcha").addEventListener("click", () => {
    captcha = makeCaptcha();
    document.getElementById("captchaCode").textContent = captcha;
  });

  document.getElementById("backToHomeBtn").addEventListener("click", () => {
    page = "login";
    render();
  });

  document.getElementById("loginForm").addEventListener("submit", (ev) => {
    ev.preventDefault();
    instId = document.getElementById("instId").value.trim();
    password = document.getElementById("password").value.trim();
    captchaInput = document.getElementById("captchaInput").value.trim();
    if (!instId || !password || captchaInput !== captcha) {
      alert("Invalid login or captcha!");
      captcha = makeCaptcha();
      document.getElementById("captchaCode").textContent = captcha;
      document.getElementById("captchaInput").value = "";
      return;
    }
    page = "dept";
    render();
  });
}

/* -------------------- PARENT LOGIN -------------------- */
function renderParentLogin() {
  const el = document.createElement("div");
  el.className = "glass-card w-full max-w-xl fadeUp";
  el.innerHTML = `
    <div style="text-align:center;">
      <h2 class="neon-text" style="font-size:24px;margin-bottom:8px;font-weight:700;">Parents Login</h2>
      <p style="color:var(--text-secondary);margin-bottom:16px;font-size:0.95rem;">Enter your child's details to view attendance and marks</p>
    </div>

    <form id="parentLoginForm" style="display:grid;gap:14px;">
      <input id="regNo" placeholder="Student Register Number" required style="padding:14px;border-radius:12px;border:1px solid rgba(226,232,240,0.8);background:rgba(255,255,255,0.9);color:var(--text-primary);font-size:0.95rem;transition:border-color 0.2s ease,box-shadow 0.2s ease;" onfocus="this.style.borderColor='#10b981';this.style.boxShadow='0 0 0 3px rgba(16,185,129,0.1)'" onblur="this.style.borderColor='rgba(226,232,240,0.8)';this.style.boxShadow='none'"/>
      <input id="dob" type="date" placeholder="Date of Birth" required style="padding:14px;border-radius:12px;border:1px solid rgba(226,232,240,0.8);background:rgba(255,255,255,0.9);color:var(--text-primary);font-size:0.95rem;transition:border-color 0.2s ease,box-shadow 0.2s ease;" onfocus="this.style.borderColor='#10b981';this.style.boxShadow='0 0 0 3px rgba(16,185,129,0.1)'" onblur="this.style.borderColor='rgba(226,232,240,0.8)';this.style.boxShadow='none'"/>

      <button type="submit" class="btn" style="width:100%;background:linear-gradient(135deg,#10b981,#34d399);box-shadow:0 4px 16px rgba(16,185,129,0.25);" onmouseover="this.style.background='linear-gradient(135deg,#34d399,#10b981)';this.style.boxShadow='0 6px 20px rgba(16,185,129,0.35)'" onmouseout="this.style.background='linear-gradient(135deg,#10b981,#34d399)';this.style.boxShadow='0 4px 16px rgba(16,185,129,0.25)'">Login</button>
      <button type="button" id="backToHomeFromParentBtn" class="btn-ghost" style="width:100%;">Back to Home</button>
    </form>
  `;
  root.appendChild(el);

  document.getElementById("backToHomeFromParentBtn").addEventListener("click", () => {
    page = "login";
    render();
  });

  document.getElementById("parentLoginForm").addEventListener("submit", (ev) => {
    ev.preventDefault();
    parentRegNo = document.getElementById("regNo").value.trim().toUpperCase();
    parentDob = document.getElementById("dob").value;
    
    if (!parentRegNo || !parentDob) {
      alert("Please enter both Register Number and Date of Birth!");
      return;
    }

    // Find student by register number and DOB
    let foundStudent = null;
    for (const deptKey of Object.keys(studentsData)) {
      for (const yearKey of Object.keys(studentsData[deptKey])) {
        const deptStudents = studentsData[deptKey][yearKey];
        foundStudent = deptStudents.find(s => 
          s.regNo.toUpperCase() === parentRegNo && s.dob === parentDob
        );
        if (foundStudent) {
          foundStudent.department = deptKey;
          foundStudent.year = yearKey;
          break;
        }
      }
      if (foundStudent) break;
    }

    if (!foundStudent) {
      alert("Student not found! Please check Register Number and Date of Birth.");
      document.getElementById("regNo").value = "";
      document.getElementById("dob").value = "";
      return;
    }

    currentStudent = foundStudent;
    page = "parentView";
    render();
  });
}

/* -------------------- DEPARTMENT -------------------- */
function renderDept() {
  const el = document.createElement("div");
  el.className = "glass-card w-full max-w-3xl fadeUp";
  const deptOptions = Object.keys(studentsData).map(d => `<option value="${d}">${d}</option>`).join("");
  el.innerHTML = `
    <div style="display:flex;align-items:center;gap:12px;">
      <div style="width:48px;height:48px;border-radius:12px;background:linear-gradient(135deg,var(--accent-primary),var(--accent-primary-2));display:flex;align-items:center;justify-content:center;box-shadow:0 4px 16px rgba(37,99,235,0.2);">
        <svg xmlns="http://www.w3.org/2000/svg" style="width:24px;height:24px;color:white;" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 8c-3.866 0-7 1.79-7 4v5h14v-5c0-2.21-3.134-4-7-4z"/></svg>
      </div>
      <h3 style="font-size:20px;font-weight:700;color:var(--text-primary);">Select Department & Year</h3>
    </div>

    <div style="display:grid;grid-template-columns:1fr 1fr;gap:14px;margin-top:16px;">
      <select id="selDept" style="padding:14px;border-radius:12px;background:rgba(255,255,255,0.9);color:var(--text-primary);border:1px solid rgba(226,232,240,0.8);font-size:0.95rem;cursor:pointer;transition:border-color 0.2s ease,box-shadow 0.2s ease;" onfocus="this.style.borderColor='var(--accent-primary)';this.style.boxShadow='0 0 0 3px rgba(37,99,235,0.1)'" onblur="this.style.borderColor='rgba(226,232,240,0.8)';this.style.boxShadow='none'">
        <option value=\"\">Select Department</option>
        ${deptOptions}
      </select>

      <select id="selYear" style="padding:14px;border-radius:12px;background:rgba(255,255,255,0.9);color:var(--text-primary);border:1px solid rgba(226,232,240,0.8);font-size:0.95rem;cursor:pointer;transition:border-color 0.2s ease,box-shadow 0.2s ease;" onfocus="this.style.borderColor='var(--accent-primary)';this.style.boxShadow='0 0 0 3px rgba(37,99,235,0.1)'" onblur="this.style.borderColor='rgba(226,232,240,0.8)';this.style.boxShadow='none'">
        <option value=\"\">Select Year</option>
        <option value=\"2\">2nd Year</option>
        <option value=\"3\">3rd Year</option>
        <option value=\"4\">4th Year</option>
      </select>
    </div>

    <div style="display:flex;gap:12px;justify-content:center;margin-top:14px;flex-wrap:wrap;">
      <button id="loadStudentsBtn" class="btn">Load Students</button>
      <button id="openMarkUploadFromDeptBtn" class="btn-ghost">Open Mark Upload</button>
      <button id="backHomeFromDeptBtn" class="btn-ghost">Back to Home</button>
    </div>
  `;
  root.appendChild(el);

  document.getElementById("loadStudentsBtn").addEventListener("click", () => {
    dept = document.getElementById("selDept").value;
    year = document.getElementById("selYear").value;
    if (!dept || !year) { alert("Select department and year"); return; }
    students = (studentsData[dept] && studentsData[dept][year]) ? studentsData[dept][year] : [];
    page = "student";
    render();
  });

  document.getElementById("openMarkUploadFromDeptBtn").addEventListener("click", () => {
    dept = document.getElementById("selDept").value;
    year = document.getElementById("selYear").value;
    if (!dept || !year) { alert("Select department and year"); return; }
    page = "marksUpload";
    render();
  });

  document.getElementById("backHomeFromDeptBtn").addEventListener("click", resetToHome);
}

/* -------------------- STUDENT PAGE -------------------- */
function renderStudent() {
  const container = document.createElement("div");
  container.className = "w-full max-w-6xl fadeUp flex flex-col gap-6";

  // Student list card
  const card1 = document.createElement("div");
  card1.className = "glass-card";
  card1.innerHTML = `
    <div style="display:flex;align-items:center;justify-content:space-between;flex-wrap:wrap;gap:12px;">
      <h3 style="font-size:20px;font-weight:700;color:var(--text-primary);">Student Attendance — ${dept} (${year})</h3>
      <div style="display:flex;gap:8px;flex-wrap:wrap;">
        <button id="backDeptBtn" class="btn-ghost">Back to Department</button>
        <button id="backHomeBtn" class="btn-ghost">Back to Home</button>
      </div>
    </div>

    <div style="margin-top:12px;overflow:auto;border-radius:10px;">
      <table class="min-w-full">
        <thead>
          <tr>
            <th>Name</th><th>Register No.</th><th>DOB</th><th>Address</th><th>Phone</th><th>Present</th><th>Absent</th>
          </tr>
        </thead>
        <tbody id="studentsTbody"></tbody>
      </table>
    </div>
  `;
  container.appendChild(card1);

  // History card
  const card2 = document.createElement("div");
  card2.className = "glass-card";
  card2.innerHTML = `
    <div style="text-align:center;">
      <h4 style="font-size:18px;font-weight:700;margin-bottom:12px;color:var(--text-primary);">Attendance History</h4>
    </div>
    <div style="overflow:auto;border-radius:10px;">
      <table>
        <thead>
          <tr><th>Name</th><th>Date</th><th>Status</th></tr>
        </thead>
        <tbody id="historyTbody"></tbody>
      </table>
    </div>
    <div style="display:flex;gap:12px;justify-content:center;margin-top:12px;">
      <button id="downloadCsvBtn" class="btn">Download Report (CSV)</button>
      <button id="clearHistoryBtn" class="btn-ghost">Clear History</button>
    </div>
  `;
  container.appendChild(card2);

  root.appendChild(container);

  // Fill students table
  const tbody = document.getElementById("studentsTbody");
  tbody.innerHTML = "";
  students.forEach((stu, idx) => {
    const tr = document.createElement("tr");
    tr.dataset.name = stu.name;
    tr.innerHTML = `
      <td>${stu.name}</td>
      <td>${stu.regNo || 'N/A'}</td>
      <td>${stu.dob}</td>
      <td>${stu.address}</td>
      <td>${stu.phone}</td>
      <td><input type="checkbox" data-name="${stu.name}" data-regno="${stu.regNo || ''}" data-phone="${stu.phone}" data-status="Present" class="att-checkbox" /></td>
      <td><input type="checkbox" data-name="${stu.name}" data-regno="${stu.regNo || ''}" data-phone="${stu.phone}" data-status="Absent" class="att-checkbox" /></td>
    `;
    tbody.appendChild(tr);
  });

  // Update history table
  updateHistoryTable();

  // Events
  document.querySelectorAll(".att-checkbox").forEach(cb => {
    cb.addEventListener("click", (ev) => {
      const nm = cb.getAttribute("data-name");
      const phone = cb.getAttribute("data-phone");
      const status = cb.getAttribute("data-status");
      const regNo = cb.getAttribute("data-regno");

      // uncheck the other checkbox for the same row
      const row = cb.closest("tr");
      if (row) {
        const inputs = row.querySelectorAll(".att-checkbox");
        inputs.forEach(i => { if (i !== cb) i.checked = false; });
      }

      markAttendance(nm, regNo, phone, status, row);
    });
  });

  document.getElementById("downloadCsvBtn").addEventListener("click", downloadCSV);
  document.getElementById("clearHistoryBtn").addEventListener("click", () => {
    if (confirm("Clear all attendance history?")) { history = {}; updateHistoryTable(); }
  });

  document.getElementById("backDeptBtn").addEventListener("click", () => { page = "dept"; render(); });
  document.getElementById("backHomeBtn").addEventListener("click", resetToHome);
}

/* -------------------- MARK UPLOAD (STAFF ONLY) -------------------- */
function ensureMarksStorePath(d, y, sem, subj, regNo, examKey) {
  if (!marksStore[d]) marksStore[d] = {};
  if (!marksStore[d][y]) marksStore[d][y] = {};
  if (!marksStore[d][y][sem]) marksStore[d][y][sem] = {};
  if (!marksStore[d][y][sem][subj]) marksStore[d][y][sem][subj] = {};
  if (!marksStore[d][y][sem][subj][regNo]) marksStore[d][y][sem][subj][regNo] = {};
  if (!marksStore[d][y][sem][subj][regNo][examKey]) {
    marksStore[d][y][sem][subj][regNo][examKey] = { marks: "", status: "draft" };
  }
  return marksStore[d][y][sem][subj][regNo][examKey];
}

function renderMarksUpload() {
  // Guard: only allow access from staff flow (very basic)
  if (!instId) {
    alert("Please login as staff to access Mark Upload.");
    page = "login";
    render();
    return;
  }

  const container = document.createElement("div");
  container.className = "w-full max-w-6xl fadeUp flex flex-col gap-6";

  const headerCard = document.createElement("div");
  headerCard.className = "glass-card";
  headerCard.innerHTML = `
    <div style="display:flex;align-items:center;justify-content:space-between;flex-wrap:wrap;gap:12px;">
      <div>
        <h3 style="font-size:20px;font-weight:700;color:var(--text-primary);">Mark Upload Module</h3>
        <p style="font-size:0.9rem;color:var(--text-secondary);margin-top:4px;">
          Enter and manage internal and class test marks for students.
        </p>
      </div>
      <div style="display:flex;gap:8px;flex-wrap:wrap;">
        <button id="backToDeptFromMarksBtn" class="btn-ghost">Back to Department</button>
        <button id="backHomeFromMarksBtn" class="btn-ghost">Logout to Home</button>
      </div>
    </div>
  `;

  const formCard = document.createElement("div");
  formCard.className = "glass-card";

  const deptOptions = Object.keys(studentsData)
    .map((d) => `<option value="${d}">${d}</option>`)
    .join("");

  const yearOptions = `
    <option value="">Select Year / Semester</option>
    <option value="2-3">2nd Year - Sem 3</option>
    <option value="2-4">2nd Year - Sem 4</option>
    <option value="3-5">3rd Year - Sem 5</option>
    <option value="3-6">3rd Year - Sem 6</option>
    <option value="4-7">4th Year - Sem 7</option>
    <option value="4-8">4th Year - Sem 8</option>
  `;

  const examOptions = examTypes
    .map((e) => `<option value="${e.key}">${e.label}</option>`)
    .join("");

  formCard.innerHTML = `
    <div style="display:grid;grid-template-columns:repeat(auto-fit,minmax(210px,1fr));gap:14px;margin-bottom:12px;">
      <div>
        <label style="font-size:0.85rem;color:var(--text-secondary);margin-bottom:4px;display:block;">Department</label>
        <select id="markDept" style="padding:12px;border-radius:12px;background:rgba(255,255,255,0.9);color:var(--text-primary);border:1px solid rgba(226,232,240,0.8);font-size:0.95rem;width:100%;">
          <option value="">Select Department</option>
          ${deptOptions}
        </select>
      </div>
      <div>
        <label style="font-size:0.85rem;color:var(--text-secondary);margin-bottom:4px;display:block;">Year / Semester</label>
        <select id="markYearSem" style="padding:12px;border-radius:12px;background:rgba(255,255,255,0.9);color:var(--text-primary);border:1px solid rgba(226,232,240,0.8);font-size:0.95rem;width:100%;">
          ${yearOptions}
        </select>
      </div>
      <div>
        <label style="font-size:0.85rem;color:var(--text-secondary);margin-bottom:4px;display:block;">Subject</label>
        <select id="markSubject" style="padding:12px;border-radius:12px;background:rgba(255,255,255,0.9);color:var(--text-primary);border:1px solid rgba(226,232,240,0.8);font-size:0.95rem;width:100%;">
          <option value="">Select Subject</option>
        </select>
      </div>
      <div>
        <label style="font-size:0.85rem;color:var(--text-secondary);margin-bottom:4px;display:block;">Exam Type</label>
        <select id="markExamType" style="padding:12px;border-radius:12px;background:rgba(255,255,255,0.9);color:var(--text-primary);border:1px solid rgba(226,232,240,0.8);font-size:0.95rem;width:100%;">
          <option value="">Select Exam Type</option>
          ${examOptions}
        </select>
      </div>
      <div style="display:flex;align-items:flex-end;gap:8px;">
        <label style="display:flex;align-items:center;gap:8px;font-size:0.9rem;color:var(--text-secondary);">
          <input id="allowOverwrite" type="checkbox" style="width:16px;height:16px;border-radius:4px;border:1px solid rgba(148,163,184,0.8);" />
          Allow overwrite of existing marks
        </label>
      </div>
    </div>

    <div style="display:flex;justify-content:flex-end;gap:10px;margin-bottom:10px;flex-wrap:wrap;">
      <button id="loadStudentsForMarksBtn" class="btn">Load Students</button>
    </div>

    <div id="markMessage" style="min-height:22px;font-size:0.9rem;"></div>

    <div style="margin-top:8px;overflow:auto;border-radius:10px;">
      <table>
        <thead>
          <tr>
            <th>Register No.</th>
            <th>Student Name</th>
            <th>Marks</th>
            <th>Status</th>
          </tr>
        </thead>
        <tbody id="marksTbody">
          <tr><td colspan="4" style="padding:18px;text-align:center;color:var(--text-secondary);">Select Department, Year / Semester, Subject and Exam Type to load students.</td></tr>
        </tbody>
      </table>
    </div>

    <div style="display:flex;justify-content:flex-end;gap:12px;margin-top:14px;flex-wrap:wrap;">
      <button id="saveMarksBtn" class="btn-ghost">Save as Draft</button>
      <button id="submitMarksBtn" class="btn">Submit Marks (Final)</button>
    </div>
  `;

  container.appendChild(headerCard);
  container.appendChild(formCard);
  root.appendChild(container);

  const deptSelect = document.getElementById("markDept");
  const yearSemSelect = document.getElementById("markYearSem");
  const subjectSelect = document.getElementById("markSubject");
  const examSelect = document.getElementById("markExamType");
  const marksTbody = document.getElementById("marksTbody");
  const markMessage = document.getElementById("markMessage");

  function setMessage(msg, type = "info") {
    let color = "var(--text-secondary)";
    if (type === "success") color = "#16a34a";
    if (type === "error") color = "#dc2626";
    if (type === "warning") color = "#d97706";
    markMessage.textContent = msg;
    markMessage.style.color = color;
  }

  function getSelectedExamConfig() {
    const key = examSelect.value;
    return examTypes.find((e) => e.key === key) || null;
  }

  function populateSubjects() {
    const d = deptSelect.value;
    const yearSemVal = yearSemSelect.value;
    subjectSelect.innerHTML = `<option value="">Select Subject</option>`;
    if (!d || !yearSemVal) return;
    const [yStr] = yearSemVal.split("-");
    const y = Number(yStr);
    const subs = (subjectsByDeptYear[d] && subjectsByDeptYear[d][y]) || [];
    subs.forEach((s) => {
      const opt = document.createElement("option");
      opt.value = s;
      opt.textContent = s;
      subjectSelect.appendChild(opt);
    });
  }

  deptSelect.addEventListener("change", () => {
    populateSubjects();
    marksTbody.innerHTML = `<tr><td colspan="4" style="padding:18px;text-align:center;color:var(--text-secondary);">Select Department, Year / Semester, Subject and Exam Type to load students.</td></tr>`;
    setMessage("");
  });

  yearSemSelect.addEventListener("change", () => {
    populateSubjects();
    marksTbody.innerHTML = `<tr><td colspan="4" style="padding:18px;text-align:center;color:var(--text-secondary);">Select Department, Year / Semester, Subject and Exam Type to load students.</td></tr>`;
    setMessage("");
  });

  examSelect.addEventListener("change", () => {
    setMessage("");
  });

  document.getElementById("loadStudentsForMarksBtn").addEventListener("click", () => {
    const d = deptSelect.value;
    const yearSemVal = yearSemSelect.value;
    const subj = subjectSelect.value;
    const examCfg = getSelectedExamConfig();

    if (!d || !yearSemVal || !subj || !examCfg) {
      setMessage("Please select Department, Year / Semester, Subject and Exam Type.", "warning");
      return;
    }

    const [yStr, semStr] = yearSemVal.split("-");
    const y = Number(yStr);
    const sem = Number(semStr);

    const list = (studentsData[d] && studentsData[d][y]) || [];
    if (!list.length) {
      marksTbody.innerHTML = `<tr><td colspan="4" style="padding:18px;text-align:center;color:var(--text-secondary);">No students found for the selected Department and Year.</td></tr>`;
      setMessage("No students found.", "warning");
      return;
    }

    marksTbody.innerHTML = "";
    list.forEach((stu) => {
      const regNo = stu.regNo || "";
      const existing = ensureMarksStorePath(d, y, sem, subj, regNo, examCfg.key);
      const tr = document.createElement("tr");
      tr.innerHTML = `
        <td>${regNo}</td>
        <td>${stu.name}</td>
        <td>
          <input 
            type="number" 
            min="0" 
            max="${examCfg.maxMarks}" 
            data-regno="${regNo}" 
            class="mark-input" 
            style="width:100%;max-width:110px;padding:8px;border-radius:10px;border:1px solid rgba(226,232,240,0.9);text-align:center;background:rgba(255,255,255,0.95);"
            value="${existing.marks !== "" ? existing.marks : ""}"
          />
        </td>
        <td>
          <span class="mark-status" data-regno="${regNo}" style="font-size:0.85rem;color:${existing.status === "final" ? "#16a34a" : "var(--text-secondary)"};">
            ${existing.marks === "" ? "Not entered" : existing.status === "final" ? "Final" : "Draft"}
          </span>
        </td>
      `;
      marksTbody.appendChild(tr);
    });

    setMessage(`Students loaded. Maximum marks for ${examCfg.label} is ${examCfg.maxMarks}.`, "info");
  });

  function handleSaveOrSubmit(isFinal) {
    const d = deptSelect.value;
    const yearSemVal = yearSemSelect.value;
    const subj = subjectSelect.value;
    const examCfg = getSelectedExamConfig();
    const allowOverwrite = document.getElementById("allowOverwrite").checked;

    if (!d || !yearSemVal || !subj || !examCfg) {
      setMessage("Please select Department, Year / Semester, Subject and Exam Type before saving marks.", "warning");
      return;
    }

    const [yStr, semStr] = yearSemVal.split("-");
    const y = Number(yStr);
    const sem = Number(semStr);

    const inputs = Array.from(document.querySelectorAll(".mark-input"));
    if (!inputs.length) {
      setMessage("No students loaded. Click \"Load Students\" first.", "warning");
      return;
    }

    let hasError = false;
    let hasMissing = false;

    inputs.forEach((inp) => {
      const regNo = inp.getAttribute("data-regno");
      const raw = inp.value.trim();

      const record = ensureMarksStorePath(d, y, sem, subj, regNo, examCfg.key);

      if (raw === "") {
        hasMissing = true;
        return;
      }

      const num = Number(raw);
      if (Number.isNaN(num) || num < 0) {
        hasError = true;
        inp.style.borderColor = "#dc2626";
        return;
      }

      if (num > examCfg.maxMarks) {
        hasError = true;
        inp.style.borderColor = "#dc2626";
        return;
      } else {
        inp.style.borderColor = "rgba(226,232,240,0.9)";
      }

      // Duplicate / overwrite rules
      if (record.status === "final" && isFinal && !allowOverwrite) {
        hasError = true;
        setMessage(`Marks for ${regNo} are already submitted as FINAL for this exam. Enable "Allow overwrite" to modify.`, "error");
        return;
      }

      record.marks = num;
      record.status = isFinal ? "final" : "draft";

      const statusSpan = document.querySelector(`.mark-status[data-regno="${regNo}"]`);
      if (statusSpan) {
        statusSpan.textContent = isFinal ? "Final" : "Draft";
        statusSpan.style.color = isFinal ? "#16a34a" : "var(--text-secondary)";
      }
    });

    if (hasError) {
      if (!markMessage.textContent) {
        setMessage("Please correct invalid or over‑limit marks before saving.", "error");
      }
      return;
    }

    if (hasMissing) {
      setMessage("Some marks are missing. Please verify before final submission.", "warning");
      if (isFinal) {
        return; // do not allow final submit with missing marks
      }
    }

    setMessage(isFinal ? "Marks submitted successfully as FINAL." : "Marks saved as draft.", "success");
  }

  document.getElementById("saveMarksBtn").addEventListener("click", () => {
    handleSaveOrSubmit(false);
  });

  document.getElementById("submitMarksBtn").addEventListener("click", () => {
    handleSaveOrSubmit(true);
  });

  document.getElementById("backToDeptFromMarksBtn").addEventListener("click", () => {
    page = "dept";
    render();
  });

  document.getElementById("backHomeFromMarksBtn").addEventListener("click", () => {
    resetToHome();
  });
}

/* -------------------- Attendance operations -------------------- */
function markAttendance(name, regNo, phone, status, rowEl = null) {
  const date = todayDateString();
  const key = regNo || name; // fall back to name if register number missing
  if (!history[key]) history[key] = [];
  history[key].push({ name, date, status });

  // Visual update: animate the row to glow
  if (rowEl) {
    // ensure previous animation class removed
    rowEl.classList.remove("row-updated");
    // trigger reflow to restart animation
    void rowEl.offsetWidth;
    rowEl.classList.add("row-updated");
  }

  // When student is marked Absent, send SMS to parent's phone number
  if (status === "Absent") {
    const msg = `This is from Arunachala Hi-Tech Engineering College. Your son/daughter ${name} is absent on ${date}.`;
    sendSmsToParent(phone, msg);
  } else {
    // Present confirmation (optional)
    const presentMsg = `${name} marked Present for ${date}.`;
    alert(presentMsg);
  }

  // update history UI
  updateHistoryTable();
}

// Update history table UI with reveal animation for new rows
function updateHistoryTable() {
  const histTbody = document.getElementById("historyTbody");
  if (!histTbody) return;
  histTbody.innerHTML = "";

  // Flatten history to rows with timestamp order
  const rows = [];
  for (const [regNo, recs] of Object.entries(history)) {
    recs.forEach(r => rows.push({ name: r.name, regNo, date: r.date, status: r.status }));
  }

  if (rows.length === 0) {
    const tr = document.createElement("tr");
    tr.innerHTML = `<td colspan="3" style="text-align:center;padding:24px;color:var(--text-secondary);font-size:0.95rem;">No records yet.</td>`;
    histTbody.appendChild(tr);
    return;
  }

  rows.forEach((r, i) => {
    const tr = document.createElement("tr");
    tr.className = "fadeUp";
    tr.style.animationDelay = `${i * 40}ms`;
    tr.innerHTML = `<td>${r.name}</td><td>${r.date}</td><td>${r.status}</td>`;
    histTbody.appendChild(tr);
  });

  // slightly scroll the history area into view (optional)
  // document.getElementById('historyTbody').closest('.glass-card')?.scrollIntoView({behavior:'smooth', block:'end'});
}

/* -------------------- CSV download -------------------- */
function downloadCSV() {
  const rows = [];
  for (const [regNo, recs] of Object.entries(history)) {
    recs.forEach(r => rows.push({ name: r.name, regNo, date: r.date, status: r.status }));
  }
  if (rows.length === 0) {
    alert("No attendance history available to download!");
    return;
  }
  let csv = "Name,Date,Status\n";
  rows.forEach(r => {
    const safeName = `"${String(r.name).replace(/"/g,'""')}"`;
    csv += `${safeName},${r.date},${r.status}\n`;
  });
  const blob = new Blob([csv], { type: "text/csv" });
  const url = URL.createObjectURL(blob);
  const a = document.createElement("a");
  a.href = url;
  a.download = `Attendance_Report_${new Date().toISOString().slice(0,10)}.csv`;
  document.body.appendChild(a);
  a.click();
  a.remove();
  URL.revokeObjectURL(url);
}

/* -------------------- PARENT VIEW -------------------- */
function renderParentView() {
  if (!currentStudent) {
    page = "parentLogin";
    render();
    return;
  }

  const container = document.createElement("div");
  container.className = "w-full max-w-5xl fadeUp flex flex-col gap-6";

  // Get student marks from staff-uploaded data (fallback to 0 if none)
  const marksData = getStudentMarksForParent(currentStudent);
  const marks = marksData.summary;

  // Get attendance for this student
  const studentAttendance = history[currentStudent.regNo] || [];

  // Student Info Card
  const infoCard = document.createElement("div");
  infoCard.className = "glass-card";
  infoCard.innerHTML = `
    <div style="display:flex;align-items:center;justify-content:space-between;flex-wrap:wrap;gap:12px;margin-bottom:16px;">
      <h3 style="font-size:22px;font-weight:700;color:var(--text-primary);">Student Information</h3>
      <button id="parentLogoutBtn" class="btn-ghost">Logout</button>
    </div>
    <div style="display:grid;grid-template-columns:repeat(auto-fit,minmax(200px,1fr));gap:16px;">
      <div>
        <div style="font-size:0.85rem;color:var(--text-secondary);margin-bottom:4px;">Name</div>
        <div style="font-size:1.1rem;font-weight:600;color:var(--text-primary);">${currentStudent.name}</div>
      </div>
      <div>
        <div style="font-size:0.85rem;color:var(--text-secondary);margin-bottom:4px;">Register Number</div>
        <div style="font-size:1.1rem;font-weight:600;color:var(--text-primary);">${currentStudent.regNo}</div>
      </div>
      <div>
        <div style="font-size:0.85rem;color:var(--text-secondary);margin-bottom:4px;">Department</div>
        <div style="font-size:1.1rem;font-weight:600;color:var(--text-primary);">${currentStudent.department}</div>
      </div>
      <div>
        <div style="font-size:0.85rem;color:var(--text-secondary);margin-bottom:4px;">Year</div>
        <div style="font-size:1.1rem;font-weight:600;color:var(--text-primary);">${currentStudent.year}</div>
      </div>
      <div>
        <div style="font-size:0.85rem;color:var(--text-secondary);margin-bottom:4px;">Date of Birth</div>
        <div style="font-size:1.1rem;font-weight:600;color:var(--text-primary);">${currentStudent.dob}</div>
      </div>
      <div>
        <div style="font-size:0.85rem;color:var(--text-secondary);margin-bottom:4px;">Address</div>
        <div style="font-size:1.1rem;font-weight:600;color:var(--text-primary);">${currentStudent.address}</div>
      </div>
    </div>
  `;
  container.appendChild(infoCard);

  // Attendance Card
  const attendanceCard = document.createElement("div");
  attendanceCard.className = "glass-card";
  const presentCount = studentAttendance.filter(a => a.status === "Present").length;
  const absentCount = studentAttendance.filter(a => a.status === "Absent").length;
  const totalDays = studentAttendance.length;
  const attendancePercent = totalDays > 0 ? ((presentCount / totalDays) * 100).toFixed(1) : 0;

  attendanceCard.innerHTML = `
    <div style="text-align:center;margin-bottom:16px;">
      <h4 style="font-size:20px;font-weight:700;color:var(--text-primary);">Attendance Records</h4>
    </div>
    <div style="display:grid;grid-template-columns:repeat(auto-fit,minmax(150px,1fr));gap:16px;margin-bottom:20px;">
      <div style="text-align:center;padding:16px;background:rgba(16,185,129,0.1);border-radius:12px;">
        <div style="font-size:2rem;font-weight:700;color:#10b981;">${presentCount}</div>
        <div style="font-size:0.9rem;color:var(--text-secondary);">Present</div>
      </div>
      <div style="text-align:center;padding:16px;background:rgba(239,68,68,0.1);border-radius:12px;">
        <div style="font-size:2rem;font-weight:700;color:#ef4444;">${absentCount}</div>
        <div style="font-size:0.9rem;color:var(--text-secondary);">Absent</div>
      </div>
      <div style="text-align:center;padding:16px;background:rgba(37,99,235,0.1);border-radius:12px;">
        <div style="font-size:2rem;font-weight:700;color:var(--accent-primary);">${totalDays}</div>
        <div style="font-size:0.9rem;color:var(--text-secondary);">Total Days</div>
      </div>
      <div style="text-align:center;padding:16px;background:rgba(245,158,11,0.1);border-radius:12px;">
        <div style="font-size:2rem;font-weight:700;color:#f59e0b;">${attendancePercent}%</div>
        <div style="font-size:0.9rem;color:var(--text-secondary);">Attendance</div>
      </div>
    </div>
    <div style="overflow:auto;border-radius:10px;max-height:300px;">
      <table>
        <thead>
          <tr><th>Date</th><th>Status</th></tr>
        </thead>
        <tbody id="parentAttendanceTbody"></tbody>
      </table>
    </div>
  `;
  container.appendChild(attendanceCard);

  // Marks Card
  const marksCard = document.createElement("div");
  marksCard.className = "glass-card";
  marksCard.innerHTML = `
    <div style="text-align:center;margin-bottom:20px;">
      <h4 style="font-size:20px;font-weight:700;color:var(--text-primary);">Academic Marks</h4>
    </div>
    <div style="display:grid;grid-template-columns:repeat(auto-fit,minmax(200px,1fr));gap:20px;">
      <div style="padding:20px;background:linear-gradient(135deg,rgba(37,99,235,0.1),rgba(59,130,246,0.05));border-radius:16px;border:2px solid rgba(37,99,235,0.2);">
        <div style="font-size:0.9rem;color:var(--text-secondary);margin-bottom:8px;">Internal Mark 1</div>
        <div style="font-size:2.5rem;font-weight:700;color:var(--accent-primary);">${marks.internal1}</div>
        <div style="font-size:0.85rem;color:var(--text-secondary);margin-top:4px;">out of 60</div>
        <div style="margin-top:12px;height:8px;background:rgba(226,232,240,0.5);border-radius:4px;overflow:hidden;">
          <div style="height:100%;background:var(--accent-primary);width:${(marks.internal1/60)*100}%;border-radius:4px;"></div>
        </div>
      </div>
      <div style="padding:20px;background:linear-gradient(135deg,rgba(37,99,235,0.1),rgba(59,130,246,0.05));border-radius:16px;border:2px solid rgba(37,99,235,0.2);">
        <div style="font-size:0.9rem;color:var(--text-secondary);margin-bottom:8px;">Internal Mark 2</div>
        <div style="font-size:2.5rem;font-weight:700;color:var(--accent-primary);">${marks.internal2}</div>
        <div style="font-size:0.85rem;color:var(--text-secondary);margin-top:4px;">out of 60</div>
        <div style="margin-top:12px;height:8px;background:rgba(226,232,240,0.5);border-radius:4px;overflow:hidden;">
          <div style="height:100%;background:var(--accent-primary);width:${(marks.internal2/60)*100}%;border-radius:4px;"></div>
        </div>
      </div>
      <div style="padding:20px;background:linear-gradient(135deg,rgba(16,185,129,0.1),rgba(52,211,153,0.05));border-radius:16px;border:2px solid rgba(16,185,129,0.2);">
        <div style="font-size:0.9rem;color:var(--text-secondary);margin-bottom:8px;">Class Test 1</div>
        <div style="font-size:2.5rem;font-weight:700;color:#10b981;">${marks.classTest1}</div>
        <div style="font-size:0.85rem;color:var(--text-secondary);margin-top:4px;">out of 20</div>
        <div style="margin-top:12px;height:8px;background:rgba(226,232,240,0.5);border-radius:4px;overflow:hidden;">
          <div style="height:100%;background:#10b981;width:${(marks.classTest1/20)*100}%;border-radius:4px;"></div>
        </div>
      </div>
      <div style="padding:20px;background:linear-gradient(135deg,rgba(16,185,129,0.1),rgba(52,211,153,0.05));border-radius:16px;border:2px solid rgba(16,185,129,0.2);">
        <div style="font-size:0.9rem;color:var(--text-secondary);margin-bottom:8px;">Class Test 2</div>
        <div style="font-size:2.5rem;font-weight:700;color:#10b981;">${marks.classTest2}</div>
        <div style="font-size:0.85rem;color:var(--text-secondary);margin-top:4px;">out of 20</div>
        <div style="margin-top:12px;height:8px;background:rgba(226,232,240,0.5);border-radius:4px;overflow:hidden;">
          <div style="height:100%;background:#10b981;width:${(marks.classTest2/20)*100}%;border-radius:4px;"></div>
        </div>
      </div>
    </div>
    <div style="margin-top:24px;padding:16px;background:rgba(241,245,249,0.8);border-radius:12px;text-align:center;">
      <div style="font-size:0.9rem;color:var(--text-secondary);margin-bottom:4px;">Total Marks</div>
      <div style="font-size:1.8rem;font-weight:700;color:var(--text-primary);">${marks.internal1 + marks.internal2 + marks.classTest1 + marks.classTest2} / 160</div>
      </div>

      <div style="margin-top:24px;">
        <h5 style="font-size:1rem;font-weight:600;color:var(--text-primary);margin-bottom:10px;">Subject-wise Details</h5>
        <div style="overflow:auto;border-radius:10px;max-height:320px;">
          <table>
            <thead>
              <tr>
                <th>Semester</th>
                <th>Subject</th>
                <th>Exam</th>
                <th>Marks</th>
                <th>Status</th>
              </tr>
            </thead>
            <tbody id="parentMarksTbody">
              <!-- Filled below -->
            </tbody>
          </table>
        </div>
      </div>
    `;
  container.appendChild(marksCard);

  root.appendChild(container);

  // Fill attendance table (after elements are attached to DOM)
  const parentAttendanceTbody = document.getElementById("parentAttendanceTbody");
  if (studentAttendance.length === 0) {
    parentAttendanceTbody.innerHTML = `<tr><td colspan="2" style="text-align:center;padding:24px;color:var(--text-secondary);">No attendance records yet.</td></tr>`;
  } else {
    parentAttendanceTbody.innerHTML = studentAttendance.map(a => 
      `<tr><td>${a.date}</td><td style="color:${a.status === 'Present' ? '#10b981' : '#ef4444'};font-weight:600;">${a.status}</td></tr>`
    ).join('');
  }

  // Fill subject-wise marks table
  const parentMarksTbody = document.getElementById("parentMarksTbody");
  if (!marksData.detailed.length) {
    parentMarksTbody.innerHTML = `<tr><td colspan="5" style="text-align:center;padding:18px;color:var(--text-secondary);font-size:0.9rem;">No marks uploaded yet by institution.</td></tr>`;
  } else {
    parentMarksTbody.innerHTML = marksData.detailed
      .map(m => {
        const statusColor = m.status === "final" ? "#16a34a" : "var(--text-secondary)";
        const statusLabel = m.status === "final" ? "Final" : "Draft";
        return `
          <tr>
            <td>Sem ${m.semester}</td>
            <td>${m.subject}</td>
            <td>${m.examLabel}</td>
            <td>${m.marks} / ${m.maxMarks}</td>
            <td style="color:${statusColor};font-weight:600;">${statusLabel}</td>
          </tr>
        `;
      })
      .join("");
  }

  document.getElementById("parentLogoutBtn").addEventListener("click", () => {
    currentStudent = null;
    parentRegNo = "";
    parentDob = "";
    page = "login";
    render();
  });
}

/* -------------------- Navigation helpers -------------------- */
function resetToHome() {
  page = "login";
  instId = password = captchaInput = "";
  captcha = makeCaptcha();
  dept = year = "";
  students = [];
  history = {};
  currentStudent = null;
  parentRegNo = "";
  parentDob = "";
  render();
}

/* -------------------- Init -------------------- */
render();

// Mobile nav toggle (runs once after DOM ready)
document.addEventListener("DOMContentLoaded", () => {
  const navEl = document.querySelector("nav");
  const toggleBtn = document.getElementById("mobileNavToggle");
  const linksEl = document.getElementById("navLinks");
  if (!navEl || !toggleBtn || !linksEl) return;

  const closeMenu = () => {
    linksEl.classList.remove("open");
    toggleBtn.setAttribute("aria-expanded", "false");
  };

  toggleBtn.addEventListener("click", (e) => {
    e.stopPropagation();
    const isOpen = linksEl.classList.toggle("open");
    toggleBtn.setAttribute("aria-expanded", String(isOpen));
  });

  document.addEventListener("click", (e) => {
    if (!linksEl.classList.contains("open")) return;
    if (!navEl.contains(e.target)) closeMenu();
  });
});

/* -------------------- Three.js animated background -------------------- */
(function initThree() {
  const canvas = document.getElementById("bgCanvas");
  const scene = new THREE.Scene();
  const camera = new THREE.PerspectiveCamera(40, window.innerWidth / window.innerHeight, 0.1, 1000);
  const renderer = new THREE.WebGLRenderer({ canvas, alpha: true, antialias: true });
  renderer.setSize(window.innerWidth, window.innerHeight);
  renderer.setPixelRatio(Math.min(window.devicePixelRatio || 1, 2));

  // Torus Knot
  const geometry = new THREE.TorusKnotGeometry(10, 2.6, 160, 24);
  const material = new THREE.MeshStandardMaterial({
    color: 0xff2b57,
    emissive: 0x2b0000,
    metalness: 0.9,
    roughness: 0.25,
    transparent: true,
    opacity: 0.95
  });
  const knot = new THREE.Mesh(geometry, material);
  knot.rotation.x = 0.6;
  knot.rotation.y = 0.3;
  scene.add(knot);

  // Soft red lights
  const p1 = new THREE.PointLight(0xff2b57, 1.6, 120);
  p1.position.set(20, 20, 30);
  scene.add(p1);
  const p2 = new THREE.PointLight(0xff6b88, .9, 90);
  p2.position.set(-20, -12, 20);
  scene.add(p2);

  camera.position.z = 40;

  // subtle camera bobbing
  let t = 0;
  function animate() {
    requestAnimationFrame(animate);
    t += 0.006;
    knot.rotation.x += 0.008;
    knot.rotation.y += 0.006;
    knot.rotation.z += 0.003;
    camera.position.x = Math.sin(t) * 6;
    camera.position.y = Math.cos(t * 0.6) * 2;
    camera.lookAt(0, 0, 0);
    renderer.render(scene, camera);
  }
  animate();

  window.addEventListener("resize", () => {
    camera.aspect = window.innerWidth / window.innerHeight;
    camera.updateProjectionMatrix();
    renderer.setSize(window.innerWidth, window.innerHeight);
  });
})();
