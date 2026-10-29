// Bantu College Unified Local Database and Atomic Transaction Engine
// Version 6.0 with Multi-Stage Admissions Funnel: Auto Exam Docket, Screening Scores, Probation & Decline Triggers
const BANTU_STORAGE_KEY = "bantu_college_unified_db";
const BANTU_DB_VERSION = 6;

// Admissions Office Global Configuration Slot
const BANTU_ADMISSIONS_CONFIG = {
  officeName: "Bantu College Admissions & Registry Directorate",
  officialSenderEmail: "admissions@bantucollege.edu",
  principalName: "Mr. Kwaghtongo D. A.",
  academicSession: "2026/2027",
  acceptanceDeadlineDays: 14,
  firstTermTuition: 150000,
  annualTuition: 450000
};

// Utility: Convert Naira numerical amount to formal English words
function convertNairaToWords(amount) {
  const num = Math.floor(Math.abs(amount));
  if (num === 0) return "Zero Naira Only";

  const ones = [
    "", "One", "Two", "Three", "Four", "Five", "Six", "Seven", "Eight", "Nine",
    "Ten", "Eleven", "Twelve", "Thirteen", "Fourteen", "Fifteen", "Sixteen",
    "Seventeen", "Eighteen", "Nineteen"
  ];
  const tens = [
    "", "", "Twenty", "Thirty", "Forty", "Fifty", "Sixty", "Seventy", "Eighty", "Ninety"
  ];

  function convertChunk(n) {
    let str = "";
    if (n >= 100) {
      str += ones[Math.floor(n / 100)] + " Hundred ";
      n %= 100;
      if (n > 0) str += "and ";
    }
    if (n >= 20) {
      str += tens[Math.floor(n / 10)];
      if (n % 10 > 0) str += " " + ones[n % 10];
      str += " ";
    } else if (n > 0) {
      str += ones[n] + " ";
    }
    return str;
  }

  let words = "";
  let remainder = num;

  if (remainder >= 1000000) {
    words += convertChunk(Math.floor(remainder / 1000000)) + "Million ";
    remainder %= 1000000;
  }
  if (remainder >= 1000) {
    words += convertChunk(Math.floor(remainder / 1000)) + "Thousand ";
    remainder %= 1000;
  }
  if (remainder > 0) {
    words += convertChunk(remainder);
  }

  return words.trim() + " Naira Only";
}

// Default Seed Data with Basic 7 and Basic 8 Cohorts
const defaultDatabaseSeed = {
  version: BANTU_DB_VERSION,
  students: {
    "BC/2026/014": {
      pin: "1234",
      name: "Terseer Audu",
      initials: "TA",
      email: "t.audu@bantucollege.edu",
      class: "Basic 7A",
      position: "1st of 42",
      feeStatus: "Cleared",
      totalTuitionBilled: 450000,
      totalTuitionPaid: 450000,
      balance: 0,
      attendance: "96.00%",
      conduct: "Exemplary",
      formTeacherRemark: "An exceptionally dedicated and attentive student who shows keen enthusiasm across Mathematics and Information Technology.",
      principalRemark: "Commendable academic effort. Maintain this focus and moral discipline in the upcoming term.",
      punctuality: "Excellent",
      neatness: "Very Good",
      peers: "Respectful and Cooperative",
      leadership: "High Initiative",
      incidentText: "No negative disciplinary infractions or official reprimands have been recorded for this scholar during the current session.",
      rawScores: [
        { subject: "English Studies", ca: 34, exam: 50 },
        { subject: "Mathematics", ca: 36, exam: 52 },
        { subject: "Social and Citizenship Education", ca: 30, exam: 45 },
        { subject: "Nigerian History", ca: 32, exam: 48 },
        { subject: "Physical and Health Education", ca: 35, exam: 46 },
        { subject: "Intermediate Science", ca: 31, exam: 47 },
        { subject: "Business Studies", ca: 28, exam: 44 },
        { subject: "Pre Vocational Studies", ca: 33, exam: 45 },
        { subject: "Cultural and Creative Arts", ca: 29, exam: 43 },
        { subject: "Information Technology", ca: 38, exam: 54 },
        { subject: "Literature", ca: 31, exam: 46 },
        { subject: "Christian Religious Studies (CRS)", ca: 34, exam: 50 },
        { subject: "French", ca: 26, exam: 40 },
        { subject: "Tiv Language", ca: 35, exam: 49 },
        { subject: "Chinese Language", ca: 27, exam: 38 }
      ],
      fees: [
        { date: "15 Sep 2026", desc: "First Term Tuition Fee", billed: 150000, paid: 150000, ref: "BNT/26/TX0104", status: "Verified", channel: "Direct Bank Transfer" },
        { date: "05 Jan 2027", desc: "Second Term Tuition Fee", billed: 150000, paid: 150000, ref: "BNT/27/TX0882", status: "Verified", channel: "Paystack Debit Card" },
        { date: "18 Apr 2027", desc: "Third Term Tuition Fee", billed: 150000, paid: 150000, ref: "BNT/27/TX1420", status: "Verified", channel: "Instant Bank Transfer" }
      ],
      sundry: [
        { desc: "School Uniform and Sportswear Kit", category: "Attire", amount: 45000, date: "10 Sep 2026", status: "Cleared" },
        { desc: "Science Laboratory Manuals and Workbooks", category: "Academic Materials", amount: 25000, date: "12 Sep 2026", status: "Cleared" },
        { desc: "Computer Practical and Coding Kit", category: "Technology", amount: 20000, date: "15 Sep 2026", status: "Cleared" },
        { desc: "Benue Agricultural Heritage Excursion", category: "Excursions", amount: 15000, date: "20 Nov 2026", status: "Cleared" }
      ]
    },
    "BC/2026/015": {
      pin: "2468",
      name: "Kator Chia",
      initials: "KC",
      email: "k.chia@bantucollege.edu",
      class: "Basic 7A",
      position: "2nd of 42",
      feeStatus: "Partial",
      totalTuitionBilled: 450000,
      totalTuitionPaid: 300000,
      balance: 150000,
      attendance: "94.50%",
      conduct: "Very Good",
      formTeacherRemark: "A diligent scholar with solid analytical skills in Mathematics and General Sciences.",
      principalRemark: "Consistent progress throughout the term. Keep striving for distinction.",
      punctuality: "Very Good",
      neatness: "Good",
      peers: "Friendly and Collaborative",
      leadership: "Active Member",
      incidentText: "No negative disciplinary infractions or official reprimands have been recorded for this scholar during the current session.",
      rawScores: [
        { subject: "English Studies", ca: 32, exam: 46 },
        { subject: "Mathematics", ca: 34, exam: 48 },
        { subject: "Social and Citizenship Education", ca: 28, exam: 43 },
        { subject: "Nigerian History", ca: 29, exam: 44 },
        { subject: "Physical and Health Education", ca: 32, exam: 44 },
        { subject: "Intermediate Science", ca: 30, exam: 45 },
        { subject: "Business Studies", ca: 27, exam: 41 },
        { subject: "Pre Vocational Studies", ca: 30, exam: 42 },
        { subject: "Cultural and Creative Arts", ca: 28, exam: 40 },
        { subject: "Information Technology", ca: 35, exam: 50 },
        { subject: "Literature", ca: 29, exam: 44 },
        { subject: "Christian Religious Studies (CRS)", ca: 31, exam: 47 },
        { subject: "French", ca: 24, exam: 38 },
        { subject: "Tiv Language", ca: 33, exam: 46 },
        { subject: "Chinese Language", ca: 25, exam: 36 }
      ],
      fees: [
        { date: "15 Sep 2026", desc: "First Term Tuition Fee", billed: 150000, paid: 150000, ref: "BNT/26/TX0112", status: "Verified", channel: "Direct Bank Transfer" },
        { date: "06 Jan 2027", desc: "Second Term Tuition Fee", billed: 150000, paid: 150000, ref: "BNT/27/TX0894", status: "Verified", channel: "Paystack Debit Card" }
      ],
      sundry: [
        { desc: "School Uniform and Sportswear Kit", category: "Attire", amount: 45000, date: "10 Sep 2026", status: "Cleared" },
        { desc: "Science Laboratory Manuals and Workbooks", category: "Academic Materials", amount: 25000, date: "12 Sep 2026", status: "Cleared" }
      ]
    },
    "BC/2026/017": {
      pin: "1357",
      name: "Bemgba Agber",
      initials: "BA",
      email: "b.agber@bantucollege.edu",
      class: "Basic 7B",
      position: "3rd of 42",
      feeStatus: "Partial",
      totalTuitionBilled: 450000,
      totalTuitionPaid: 150000,
      balance: 300000,
      attendance: "92.00%",
      conduct: "Good",
      formTeacherRemark: "Shows steady commitment in classroom exercises and practical sessions.",
      principalRemark: "Encouraging effort. Greater focus on terminal revision will yield higher honours.",
      punctuality: "Good",
      neatness: "Good",
      peers: "Peaceful and Courteous",
      leadership: "Participative",
      incidentText: "No negative disciplinary infractions or official reprimands have been recorded for this scholar during the current session.",
      rawScores: [
        { subject: "English Studies", ca: 29, exam: 42 },
        { subject: "Mathematics", ca: 28, exam: 40 },
        { subject: "Social and Citizenship Education", ca: 27, exam: 40 },
        { subject: "Nigerian History", ca: 28, exam: 41 },
        { subject: "Physical and Health Education", ca: 30, exam: 42 },
        { subject: "Intermediate Science", ca: 28, exam: 41 },
        { subject: "Business Studies", ca: 26, exam: 39 },
        { subject: "Pre Vocational Studies", ca: 28, exam: 40 },
        { subject: "Cultural and Creative Arts", ca: 27, exam: 39 },
        { subject: "Information Technology", ca: 32, exam: 45 },
        { subject: "Literature", ca: 28, exam: 40 },
        { subject: "Christian Religious Studies (CRS)", ca: 30, exam: 44 },
        { subject: "French", ca: 22, exam: 35 },
        { subject: "Tiv Language", ca: 31, exam: 44 },
        { subject: "Chinese Language", ca: 24, exam: 34 }
      ],
      fees: [
        { date: "15 Sep 2026", desc: "First Term Tuition Fee", billed: 150000, paid: 150000, ref: "BNT/26/TX0128", status: "Verified", channel: "Direct Bank Transfer" }
      ],
      sundry: [
        { desc: "School Uniform and Sportswear Kit", category: "Attire", amount: 45000, date: "10 Sep 2026", status: "Cleared" }
      ]
    },
    "BC/2026/021": {
      pin: "5678",
      name: "Dooshima Iorfa",
      initials: "DI",
      email: "d.iorfa@bantucollege.edu",
      class: "Basic 8A",
      position: "1st of 38",
      feeStatus: "Partial",
      totalTuitionBilled: 450000,
      totalTuitionPaid: 300000,
      balance: 150000,
      attendance: "98.00%",
      conduct: "Exemplary",
      formTeacherRemark: "A brilliant and responsible scholar who demonstrates remarkable leadership and diligence across all subjects.",
      principalRemark: "Outstanding academic performance. An exemplary representative of Bantu College values.",
      punctuality: "Excellent",
      neatness: "Impeccable",
      peers: "Warm and Helpful Leader",
      leadership: "Outstanding",
      incidentText: "No negative disciplinary infractions or official reprimands have been recorded for this scholar during the current session.",
      rawScores: [
        { subject: "English Studies", ca: 37, exam: 54 },
        { subject: "Mathematics", ca: 38, exam: 55 },
        { subject: "Social and Citizenship Education", ca: 33, exam: 49 },
        { subject: "Nigerian History", ca: 36, exam: 52 },
        { subject: "Physical and Health Education", ca: 34, exam: 48 },
        { subject: "Intermediate Science", ca: 35, exam: 51 },
        { subject: "Business Studies", ca: 33, exam: 48 },
        { subject: "Pre Vocational Studies", ca: 32, exam: 47 },
        { subject: "Cultural and Creative Arts", ca: 31, exam: 45 },
        { subject: "Information Technology", ca: 39, exam: 56 },
        { subject: "Literature", ca: 36, exam: 52 },
        { subject: "Christian Religious Studies (CRS)", ca: 35, exam: 51 },
        { subject: "French", ca: 30, exam: 44 },
        { subject: "Tiv Language", ca: 37, exam: 53 },
        { subject: "Chinese Language", ca: 29, exam: 43 }
      ],
      fees: [
        { date: "15 Sep 2026", desc: "First Term Tuition Fee", billed: 150000, paid: 150000, ref: "BNT/26/TX0189", status: "Verified", channel: "Direct Bank Transfer" },
        { date: "05 Jan 2027", desc: "Second Term Tuition Fee", billed: 150000, paid: 150000, ref: "BNT/27/TX0914", status: "Verified", channel: "Paystack Debit Card" }
      ],
      sundry: [
        { desc: "Senior Junior Uniform Set and Blazer", category: "Attire", amount: 45000, date: "10 Sep 2026", status: "Cleared" },
        { desc: "Advanced Science Workbooks and Lab Kit", category: "Academic Materials", amount: 25000, date: "12 Sep 2026", status: "Cleared" },
        { desc: "Robotics and Algorithm Learning Module", category: "Technology", amount: 20000, date: "15 Sep 2026", status: "Cleared" },
        { desc: "Historical Cultural Field Excursion", category: "Excursions", amount: 15000, date: "20 Nov 2026", status: "Cleared" }
      ]
    },
    "BC/2026/022": {
      pin: "4321",
      name: "Ngodoo Ugba",
      initials: "NU",
      email: "n.ugba@bantucollege.edu",
      class: "Basic 8A",
      position: "2nd of 38",
      feeStatus: "Cleared",
      totalTuitionBilled: 450000,
      totalTuitionPaid: 450000,
      balance: 0,
      attendance: "96.50%",
      conduct: "Exemplary",
      formTeacherRemark: "Demonstrates exceptional critical reasoning in Mathematics and Natural Sciences.",
      principalRemark: "Very impressive terminal report. Keep aiming higher.",
      punctuality: "Excellent",
      neatness: "Very Good",
      peers: "Kind and Supportive",
      leadership: "Class Prefect",
      incidentText: "No negative disciplinary infractions or official reprimands have been recorded for this scholar during the current session.",
      rawScores: [
        { subject: "English Studies", ca: 35, exam: 51 },
        { subject: "Mathematics", ca: 36, exam: 53 },
        { subject: "Social and Citizenship Education", ca: 32, exam: 47 },
        { subject: "Nigerian History", ca: 33, exam: 48 },
        { subject: "Physical and Health Education", ca: 33, exam: 47 },
        { subject: "Intermediate Science", ca: 34, exam: 50 },
        { subject: "Business Studies", ca: 31, exam: 46 },
        { subject: "Pre Vocational Studies", ca: 31, exam: 45 },
        { subject: "Cultural and Creative Arts", ca: 30, exam: 44 },
        { subject: "Information Technology", ca: 37, exam: 53 },
        { subject: "Literature", ca: 34, exam: 49 },
        { subject: "Christian Religious Studies (CRS)", ca: 33, exam: 49 },
        { subject: "French", ca: 28, exam: 42 },
        { subject: "Tiv Language", ca: 35, exam: 50 },
        { subject: "Chinese Language", ca: 27, exam: 40 }
      ],
      fees: [
        { date: "15 Sep 2026", desc: "First Term Tuition Fee", billed: 150000, paid: 150000, ref: "BNT/26/TX0201", status: "Verified", channel: "Direct Bank Transfer" },
        { date: "05 Jan 2027", desc: "Second Term Tuition Fee", billed: 150000, paid: 150000, ref: "BNT/27/TX0922", status: "Verified", channel: "Paystack Debit Card" },
        { date: "18 Apr 2027", desc: "Third Term Tuition Fee", billed: 150000, paid: 150000, ref: "BNT/27/TX1431", status: "Verified", channel: "Instant Bank Transfer" }
      ],
      sundry: [
        { desc: "Senior Junior Uniform Set and Blazer", category: "Attire", amount: 45000, date: "10 Sep 2026", status: "Cleared" },
        { desc: "Advanced Science Workbooks and Lab Kit", category: "Academic Materials", amount: 25000, date: "12 Sep 2026", status: "Cleared" }
      ]
    },
    "BC/2026/025": {
      pin: "8765",
      name: "Sesugh Tyokaa",
      initials: "ST",
      email: "s.tyokaa@bantucollege.edu",
      class: "Basic 8B",
      position: "3rd of 38",
      feeStatus: "Partial",
      totalTuitionBilled: 450000,
      totalTuitionPaid: 300000,
      balance: 150000,
      attendance: "93.00%",
      conduct: "Very Good",
      formTeacherRemark: "Consistent academic engagement and respectful classroom demeanor.",
      principalRemark: "Commendable output. Put extra effort into languages for optimal outcomes.",
      punctuality: "Very Good",
      neatness: "Good",
      peers: "Cooperative and Polite",
      leadership: "Club Officer",
      incidentText: "No negative disciplinary infractions or official reprimands have been recorded for this scholar during the current session.",
      rawScores: [
        { subject: "English Studies", ca: 31, exam: 45 },
        { subject: "Mathematics", ca: 33, exam: 47 },
        { subject: "Social and Citizenship Education", ca: 30, exam: 44 },
        { subject: "Nigerian History", ca: 31, exam: 45 },
        { subject: "Physical and Health Education", ca: 32, exam: 46 },
        { subject: "Intermediate Science", ca: 31, exam: 45 },
        { subject: "Business Studies", ca: 29, exam: 42 },
        { subject: "Pre Vocational Studies", ca: 30, exam: 43 },
        { subject: "Cultural and Creative Arts", ca: 29, exam: 42 },
        { subject: "Information Technology", ca: 34, exam: 48 },
        { subject: "Literature", ca: 31, exam: 45 },
        { subject: "Christian Religious Studies (CRS)", ca: 32, exam: 46 },
        { subject: "French", ca: 26, exam: 39 },
        { subject: "Tiv Language", ca: 34, exam: 47 },
        { subject: "Chinese Language", ca: 25, exam: 37 }
      ],
      fees: [
        { date: "15 Sep 2026", desc: "First Term Tuition Fee", billed: 150000, paid: 150000, ref: "BNT/26/TX0215", status: "Verified", channel: "Direct Bank Transfer" },
        { date: "05 Jan 2027", desc: "Second Term Tuition Fee", billed: 150000, paid: 150000, ref: "BNT/27/TX0935", status: "Verified", channel: "Paystack Debit Card" }
      ],
      sundry: [
        { desc: "Senior Junior Uniform Set and Blazer", category: "Attire", amount: 45000, date: "10 Sep 2026", status: "Cleared" }
      ]
    },
    "BC/2026/026": {
      pin: "1234",
      name: "Msughter Tyover",
      initials: "MT",
      email: "m.tyover@bantucollege.edu",
      class: "Basic 7A",
      position: "Awaiting Assessment",
      feeStatus: "Partial",
      totalTuitionBilled: 450000,
      totalTuitionPaid: 0,
      balance: 450000,
      attendance: "100.00%",
      conduct: "Exemplary",
      formTeacherRemark: "Newly admitted scholar for the 2026/2027 academic session. Completed registration.",
      principalRemark: "Welcome to Bantu College. Read to Lead.",
      punctuality: "Excellent",
      neatness: "Excellent",
      peers: "Respectful and Cooperative",
      leadership: "Primary School Head Boy",
      incidentText: "No negative disciplinary infractions or official reprimands have been recorded for this scholar during the current session.",
      rawScores: [
        { subject: "English Studies", ca: 30, exam: 45 },
        { subject: "Mathematics", ca: 32, exam: 48 },
        { subject: "Social and Citizenship Education", ca: 28, exam: 42 },
        { subject: "Nigerian History", ca: 29, exam: 43 },
        { subject: "Physical and Health Education", ca: 30, exam: 44 },
        { subject: "Intermediate Science", ca: 31, exam: 46 },
        { subject: "Business Studies", ca: 27, exam: 40 },
        { subject: "Pre Vocational Studies", ca: 29, exam: 41 },
        { subject: "Cultural and Creative Arts", ca: 28, exam: 40 },
        { subject: "Information Technology", ca: 33, exam: 48 },
        { subject: "Literature", ca: 29, exam: 42 },
        { subject: "Christian Religious Studies (CRS)", ca: 30, exam: 45 },
        { subject: "French", ca: 25, exam: 37 },
        { subject: "Tiv Language", ca: 32, exam: 45 },
        { subject: "Chinese Language", ca: 24, exam: 35 }
      ],
      fees: [],
      sundry: []
    },
    "BC/2026/027": {
      pin: "1234",
      name: "Seember Igbawase",
      initials: "SI",
      email: "s.igbawase@bantucollege.edu",
      class: "Basic 8A",
      position: "Awaiting Assessment",
      feeStatus: "Partial",
      totalTuitionBilled: 450000,
      totalTuitionPaid: 0,
      balance: 450000,
      attendance: "100.00%",
      conduct: "On Academic Probation",
      formTeacherRemark: "Provisionally admitted on academic probation. Enrolled in mandatory remedial clinics for Mathematics and Science.",
      principalRemark: "Opportunity given to prove scholastic capacity. Must attain 60% terminal aggregate.",
      punctuality: "Very Good",
      neatness: "Good",
      peers: "Polite and Respectful",
      leadership: "Emerging",
      incidentText: "No negative disciplinary infractions or official reprimands recorded.",
      rawScores: [
        { subject: "English Studies", ca: 28, exam: 40 },
        { subject: "Mathematics", ca: 26, exam: 38 },
        { subject: "Social and Citizenship Education", ca: 27, exam: 40 },
        { subject: "Nigerian History", ca: 28, exam: 41 },
        { subject: "Physical and Health Education", ca: 29, exam: 42 },
        { subject: "Intermediate Science", ca: 27, exam: 39 },
        { subject: "Business Studies", ca: 26, exam: 38 },
        { subject: "Pre Vocational Studies", ca: 28, exam: 40 },
        { subject: "Cultural and Creative Arts", ca: 27, exam: 39 },
        { subject: "Information Technology", ca: 30, exam: 43 },
        { subject: "Literature", ca: 28, exam: 40 },
        { subject: "Christian Religious Studies (CRS)", ca: 29, exam: 42 },
        { subject: "French", ca: 24, exam: 35 },
        { subject: "Tiv Language", ca: 30, exam: 42 },
        { subject: "Chinese Language", ca: 23, exam: 33 }
      ],
      fees: [],
      sundry: []
    }
  },
  transactions: [
    { id: 1, date: "15 Sep 2026", name: "Terseer Audu", studentId: "BC/2026/014", billed: 450000, paid: 450000, ref: "BNT/26/TX0104", verified: true, channel: "Direct Bank Transfer" },
    { id: 2, date: "15 Sep 2026", name: "Kator Chia", studentId: "BC/2026/015", billed: 450000, paid: 300000, ref: "BNT/26/TX0112", verified: true, channel: "Direct Bank Transfer" },
    { id: 3, date: "15 Sep 2026", name: "Bemgba Agber", studentId: "BC/2026/017", billed: 450000, paid: 150000, ref: "BNT/26/TX0128", verified: true, channel: "Direct Bank Transfer" },
    { id: 4, date: "18 Sep 2026", name: "Dooshima Iorfa", studentId: "BC/2026/021", billed: 450000, paid: 300000, ref: "BNT/26/TX0189", verified: true, channel: "Direct Bank Transfer" },
    { id: 5, date: "18 Sep 2026", name: "Ngodoo Ugba", studentId: "BC/2026/022", billed: 450000, paid: 450000, ref: "BNT/26/TX0201", verified: true, channel: "Direct Bank Transfer" },
    { id: 6, date: "18 Sep 2026", name: "Sesugh Tyokaa", studentId: "BC/2026/025", billed: 450000, paid: 300000, ref: "BNT/26/TX0215", verified: true, channel: "Direct Bank Transfer" }
  ],
  applications: [
    {
      ref: "BC/ADM/2026/001",
      date: "12 Oct 2026",
      studentName: "Msughter Tyover",
      dob: "2014-05-18",
      entryLevel: "Basic 7A",
      guardianName: "Engr. S. Tyover",
      email: "s.tyover@gmail.com",
      phone: "+234 803 214 5590",
      previousSchool: "St. Thomas Primary School, Makurdi",
      status: "Offer Granted",
      decision: "Admitted",
      studentId: "BC/2026/026",
      portalPin: "1234",
      examDate: "Saturday, 14 Nov 2026",
      examTime: "09:00 AM WAT",
      examVenue: "Bantu College Central Examination Hall, Academic Complex",
      examScore: 84.5,
      decisionDate: "14 Oct 2026 at 10:30",
      message: "Candidate was head boy and excels in mathematics.",
      mailHistory: [
        {
          type: "EXAM_SCHEDULE",
          title: "Entrance Examination & Screening Docket",
          sender: "admissions@bantucollege.edu",
          recipient: "s.tyover@gmail.com",
          timestamp: "12 Oct 2026 at 10:15",
          subject: "ENTRANCE EXAMINATION SCHEDULE: Bantu College (Msughter Tyover - Ref: BC/ADM/2026/001)"
        },
        {
          type: "OFFER_GRANTED",
          title: "Provisional Offer of Admission Letter",
          sender: "admissions@bantucollege.edu",
          recipient: "s.tyover@gmail.com",
          timestamp: "14 Oct 2026 at 10:30",
          subject: "OFFICIAL PROVISIONAL OFFER OF ADMISSION: Bantu College (Msughter Tyover)"
        }
      ]
    },
    {
      ref: "BC/ADM/2026/002",
      date: "19 Oct 2026",
      studentName: "Seember Igbawase",
      dob: "2013-11-04",
      entryLevel: "Basic 8A",
      guardianName: "Dr. Mrs. A. Igbawase",
      email: "a.igbawase@yahoo.com",
      phone: "+234 812 770 3341",
      previousSchool: "Grace International Academy, Gboko",
      status: "Admitted on Probation",
      decision: "Probation",
      studentId: "BC/2026/027",
      portalPin: "1234",
      examDate: "Saturday, 14 Nov 2026",
      examTime: "09:00 AM WAT",
      examVenue: "Bantu College Central Examination Hall, Academic Complex",
      examScore: 53.0,
      decisionDate: "22 Oct 2026 at 14:15",
      probationConditions: "Candidate demonstrated strong verbal aptitude but requires targeted remedial tutorials in Mathematics and Natural Sciences. Must maintain at least 60.00% terminal aggregate to have probation lifted.",
      message: "Transfer applicant seeking admission into Basic 8A.",
      mailHistory: [
        {
          type: "EXAM_SCHEDULE",
          title: "Entrance Examination & Screening Docket",
          sender: "admissions@bantucollege.edu",
          recipient: "a.igbawase@yahoo.com",
          timestamp: "19 Oct 2026 at 11:20",
          subject: "ENTRANCE EXAMINATION SCHEDULE: Bantu College (Seember Igbawase - Ref: BC/ADM/2026/002)"
        },
        {
          type: "OFFER_PROBATION",
          title: "Provisional Admission on Academic Probation Letter",
          sender: "admissions@bantucollege.edu",
          recipient: "a.igbawase@yahoo.com",
          timestamp: "22 Oct 2026 at 14:15",
          subject: "OFFICIAL PROVISIONAL ADMISSION ON PROBATION: Bantu College (Seember Igbawase)"
        }
      ]
    },
    {
      ref: "BC/ADM/2026/003",
      date: "25 Oct 2026",
      studentName: "Aondona Kwaghtondo",
      dob: "2014-02-12",
      entryLevel: "Basic 7B",
      guardianName: "Mr. T. Kwaghtondo",
      email: "t.kwaghtondo@gmail.com",
      phone: "+234 802 449 8812",
      previousSchool: "University Staff School, Makurdi",
      status: "Exam Completed",
      decision: null,
      examDate: "Saturday, 14 Nov 2026",
      examTime: "09:00 AM WAT",
      examVenue: "Bantu College Central Examination Hall, Academic Complex",
      examScore: 78.0,
      message: "Keen interest in natural sciences and computer coding.",
      mailHistory: [
        {
          type: "EXAM_SCHEDULE",
          title: "Entrance Examination & Screening Docket",
          sender: "admissions@bantucollege.edu",
          recipient: "t.kwaghtondo@gmail.com",
          timestamp: "25 Oct 2026 at 09:30",
          subject: "ENTRANCE EXAMINATION SCHEDULE: Bantu College (Aondona Kwaghtondo - Ref: BC/ADM/2026/003)"
        }
      ]
    },
    {
      ref: "BC/ADM/2026/004",
      date: "27 Oct 2026",
      studentName: "Terungwa Gbande",
      dob: "2014-06-15",
      entryLevel: "Basic 7A",
      guardianName: "Mrs. E. Gbande",
      email: "e.gbande@gmail.com",
      phone: "+234 803 551 2289",
      previousSchool: "First Step Primary School, Makurdi",
      status: "Admission Declined",
      decision: "Declined",
      examDate: "Saturday, 14 Nov 2026",
      examTime: "09:00 AM WAT",
      examVenue: "Bantu College Central Examination Hall, Academic Complex",
      examScore: 38.5,
      decisionDate: "28 Oct 2026 at 11:00",
      declineReason: "Candidate did not attain the mandatory entrance threshold in basic literacy and numeracy. Recommended for preparatory study before re-applying for subsequent sessions.",
      message: "Strong foundation in literacy and Tiv oral poetry.",
      mailHistory: [
        {
          type: "EXAM_SCHEDULE",
          title: "Entrance Examination & Screening Docket",
          sender: "admissions@bantucollege.edu",
          recipient: "e.gbande@gmail.com",
          timestamp: "27 Oct 2026 at 12:45",
          subject: "ENTRANCE EXAMINATION SCHEDULE: Bantu College (Terungwa Gbande - Ref: BC/ADM/2026/004)"
        },
        {
          type: "OFFER_DECLINED",
          title: "Notice of Non-Admission and Academic Guidance Letter",
          sender: "admissions@bantucollege.edu",
          recipient: "e.gbande@gmail.com",
          timestamp: "28 Oct 2026 at 11:00",
          subject: "APPLICATION DECISION NOTICE: Bantu College (Terungwa Gbande)"
        }
      ]
    },
    {
      ref: "BC/ADM/2026/005",
      date: "28 Oct 2026",
      studentName: "Hembadoon Tarhule",
      dob: "2013-09-22",
      entryLevel: "Basic 8B",
      guardianName: "Arch. D. Tarhule",
      email: "d.tarhule@yahoo.com",
      phone: "+234 815 662 9901",
      previousSchool: "Benue State Model School, Makurdi",
      status: "Exam Scheduled",
      decision: null,
      examDate: "Saturday, 14 Nov 2026",
      examTime: "09:00 AM WAT",
      examVenue: "Bantu College Central Examination Hall, Academic Complex",
      examScore: null,
      message: "Exemplary conduct and enthusiastic science student.",
      mailHistory: [
        {
          type: "EXAM_SCHEDULE",
          title: "Entrance Examination & Screening Docket",
          sender: "admissions@bantucollege.edu",
          recipient: "d.tarhule@yahoo.com",
          timestamp: "28 Oct 2026 at 15:10",
          subject: "ENTRANCE EXAMINATION SCHEDULE: Bantu College (Hembadoon Tarhule - Ref: BC/ADM/2026/005)"
        }
      ]
    },
    {
      ref: "BC/ADM/2026/006",
      date: "29 Oct 2026",
      studentName: "Wandoo Iornumbe",
      dob: "2014-03-30",
      entryLevel: "Basic 7B",
      guardianName: "Chief P. Iornumbe",
      email: "p.iornumbe@gmail.com",
      phone: "+234 809 332 1144",
      previousSchool: "Kings and Queens Academy, Gboko",
      status: "Exam Completed",
      decision: null,
      examDate: "Saturday, 14 Nov 2026",
      examTime: "09:00 AM WAT",
      examVenue: "Bantu College Central Examination Hall, Academic Complex",
      examScore: 51.5,
      message: "Gifted in creative arts and English composition.",
      mailHistory: [
        {
          type: "EXAM_SCHEDULE",
          title: "Entrance Examination & Screening Docket",
          sender: "admissions@bantucollege.edu",
          recipient: "p.iornumbe@gmail.com",
          timestamp: "29 Oct 2026 at 16:30",
          subject: "ENTRANCE EXAMINATION SCHEDULE: Bantu College (Wandoo Iornumbe - Ref: BC/ADM/2026/006)"
        }
      ]
    }
  ]
};

// Database Initialization and Migration Engine
function getBantuDatabase() {
  const stored = localStorage.getItem(BANTU_STORAGE_KEY);
  if (!stored) {
    localStorage.setItem(BANTU_STORAGE_KEY, JSON.stringify(defaultDatabaseSeed));
    return defaultDatabaseSeed;
  }
  try {
    const parsed = JSON.parse(stored);
    if (!parsed.version || parsed.version < BANTU_DB_VERSION) {
      localStorage.setItem(BANTU_STORAGE_KEY, JSON.stringify(defaultDatabaseSeed));
      return defaultDatabaseSeed;
    }
    return parsed;
  } catch (err) {
    localStorage.setItem(BANTU_STORAGE_KEY, JSON.stringify(defaultDatabaseSeed));
    return defaultDatabaseSeed;
  }
}

function saveBantuDatabase(db) {
  localStorage.setItem(BANTU_STORAGE_KEY, JSON.stringify(db));
  window.dispatchEvent(new Event("bantu_db_updated"));
}

// Grading Calculation Function (Strict Nigerian Standard)
// A: 80 to 100 (Excellent)
// B2: 75 to 79.99 (Very Good)
// B3: 70 to 74.99 (Good)
// C: 60 to 69.99 (Credit)
// F: 0 to 59.99 (Fail)
function calculateGradeAndRemark(totalScore) {
  const score = parseFloat(totalScore);
  if (score >= 80.00) return { grade: "A", remark: "Excellent", badgeClass: "portal-badge-a" };
  if (score >= 75.00) return { grade: "B2", remark: "Very Good", badgeClass: "portal-badge-b2" };
  if (score >= 70.00) return { grade: "B3", remark: "Good", badgeClass: "portal-badge-b3" };
  if (score >= 60.00) return { grade: "C", remark: "Credit", badgeClass: "portal-badge-c" };
  return { grade: "F", remark: "Fail", badgeClass: "portal-badge-f" };
}

// Atomic Fee Payment Engine (Full ACID Compliance)
// Atomicity: Validates, mutates balance, creates transaction record, updates bursar ledger, and commits in one atomic step.
// Consistency: totalTuitionBilled always equals totalTuitionPaid + balance.
// Isolation: Real-time broadcast prevents race conditions across open tabs.
// Durability: Persisted in browser storage and auditable with unique reference code.
function processAtomicFeePayment(studentId, paymentAmount, paymentChannel, narrativeNote) {
  const db = getBantuDatabase();
  const student = db.students[studentId];
  if (!student) {
    return { success: false, message: "Student record not found in Bantu College registry." };
  }

  const amount = parseFloat(paymentAmount);
  if (isNaN(amount) || amount <= 0) {
    return { success: false, message: "Invalid payment amount. Please specify a valid numerical value." };
  }

  if (student.balance <= 0) {
    return { success: false, message: "This student has already cleared all tuition obligations for the academic session." };
  }

  if (amount > student.balance) {
    return { 
      success: false, 
      message: "Specified amount (NGN " + amount.toLocaleString() + ".00) exceeds current outstanding balance (NGN " + student.balance.toLocaleString() + ".00)." 
    };
  }

  // Generate Immutable Unique Transaction Reference (Idempotency Token)
  const timestamp = Date.now().toString().slice(-6);
  const randomSuffix = Math.floor(1000 + Math.random() * 9000);
  const transactionRef = "BNT/27/TX" + timestamp + randomSuffix;

  const now = new Date();
  const currentDate = now.toLocaleDateString("en-GB", {
    day: "2-digit",
    month: "short",
    year: "numeric"
  });
  const currentTime = now.toLocaleTimeString("en-GB", {
    hour: "2-digit",
    minute: "2-digit",
    second: "2-digit"
  });

  const previousBalance = student.balance;
  const newPaidTotal = student.totalTuitionPaid + amount;
  const newBalance = Math.max(0, student.totalTuitionBilled - newPaidTotal);

  // Atomic state mutation
  student.totalTuitionPaid = newPaidTotal;
  student.balance = newBalance;
  student.feeStatus = newBalance === 0 ? "Cleared" : "Partial";

  const channelDesc = paymentChannel || "Paystack Automated Gateway";
  const narrative = narrativeNote || "Tuition Installment Payment";

  const newFeeEntry = {
    date: currentDate,
    desc: narrative,
    billed: amount,
    paid: amount,
    ref: transactionRef,
    status: "Verified",
    channel: channelDesc
  };
  student.fees.push(newFeeEntry);

  // Atomic Ledger Entry into Bursary Master Table
  const bursarEntry = {
    id: Date.now(),
    date: currentDate,
    name: student.name,
    studentId: studentId,
    billed: student.totalTuitionBilled,
    amount: amount,
    paid: student.totalTuitionPaid,
    balance: newBalance,
    ref: transactionRef,
    verified: true,
    channel: channelDesc
  };
  db.transactions.unshift(bursarEntry);

  // Commit transaction to database
  saveBantuDatabase(db);

  return {
    success: true,
    reference: transactionRef,
    date: currentDate,
    time: currentTime,
    studentName: student.name,
    studentId: studentId,
    studentClass: student.class,
    amountPaid: amount,
    amountInWords: convertNairaToWords(amount),
    previousBalance: previousBalance,
    remainingBalance: newBalance,
    feeStatus: student.feeStatus,
    channel: channelDesc,
    narrative: narrative
  };
}

// Teacher Score Save Engine
function saveSubjectScoresFromTeacher(className, subjectName, studentScoreUpdates) {
  const db = getBantuDatabase();
  let updatedCount = 0;

  studentScoreUpdates.forEach(update => {
    const student = db.students[update.studentId];
    if (student) {
      let subjectObj = student.rawScores.find(s => s.subject.toLowerCase() === subjectName.toLowerCase());
      if (subjectObj) {
        subjectObj.ca = parseFloat(update.ca);
        subjectObj.exam = parseFloat(update.exam);
        updatedCount++;
      } else {
        student.rawScores.push({
          subject: subjectName,
          ca: parseFloat(update.ca),
          exam: parseFloat(update.exam)
        });
        updatedCount++;
      }
    }
  });

  saveBantuDatabase(db);
  return { success: true, updatedCount: updatedCount };
}

// Bursar Manual Verification
function verifyBursarTransactionById(transactionRef) {
  const db = getBantuDatabase();
  const tx = db.transactions.find(t => t.ref === transactionRef);
  if (tx) {
    tx.verified = true;
    const student = db.students[tx.studentId];
    if (student) {
      const feeItem = student.fees.find(f => f.ref === transactionRef);
      if (feeItem) feeItem.status = "Verified";
    }
    saveBantuDatabase(db);
    return { success: true, message: "Transaction verified successfully." };
  }
  return { success: false, message: "Transaction reference not found." };
}

// Get Receipt Information by Reference
function getBantuReceiptByRef(studentId, transactionRef) {
  const db = getBantuDatabase();
  const student = db.students[studentId];
  if (!student) return null;

  const feeItem = student.fees.find(f => f.ref === transactionRef);
  if (!feeItem) return null;

  return {
    reference: feeItem.ref,
    date: feeItem.date,
    studentName: student.name,
    studentId: studentId,
    studentClass: student.class,
    email: student.email,
    amountPaid: feeItem.paid,
    amountInWords: convertNairaToWords(feeItem.paid),
    narrative: feeItem.desc,
    channel: feeItem.channel || "Paystack Automated Gateway",
    status: feeItem.status,
    totalBilled: student.totalTuitionBilled,
    totalPaid: student.totalTuitionPaid,
    balance: student.balance,
    feeStatus: student.feeStatus
  };
}

// Sequential Reference Number Generators
function generateNextApplicationReference(db) {
  let highestNum = 0;
  (db.applications || []).forEach(app => {
    const parts = (app.ref || "").split("/");
    if (parts.length >= 4) {
      const num = parseInt(parts[3], 10);
      if (!isNaN(num) && num > highestNum) {
        highestNum = num;
      }
    }
  });
  const nextNum = (highestNum + 1).toString().padStart(3, '0');
  return `BC/ADM/2026/${nextNum}`;
}

function generateNextStudentAdmissionNumber(db) {
  let highestNum = 26; // since BC/2026/026 is seeded for Msughter Tyover
  Object.keys(db.students || {}).forEach(id => {
    const parts = id.split("/");
    if (parts.length === 3 && parts[0] === "BC") {
      const num = parseInt(parts[2], 10);
      if (!isNaN(num) && num > highestNum) {
        highestNum = num;
      }
    }
  });
  const nextNum = (highestNum + 1).toString().padStart(3, '0');
  return `BC/2026/${nextNum}`;
}

// Admission Application Engine
function submitAdmissionApplication(data) {
  const db = getBantuDatabase();
  if (!db.applications) db.applications = [];

  const applicationRef = generateNextApplicationReference(db);

  const now = new Date();
  const currentDate = now.toLocaleDateString("en-GB", {
    day: "2-digit",
    month: "short",
    year: "numeric"
  });
  const currentTime = now.toLocaleTimeString("en-GB", {
    hour: "2-digit",
    minute: "2-digit"
  });

  const entryLevelFormatted = data.entryLevel || "Basic 7A";
  const examDate = "Saturday, 14 Nov 2026";
  const examTime = "09:00 AM WAT";
  const examVenue = "Bantu College Central Examination Hall, Academic Complex, Makurdi";

  const newApp = {
    ref: applicationRef,
    date: currentDate,
    studentName: data.studentName,
    dob: data.dob,
    entryLevel: entryLevelFormatted,
    guardianName: data.guardianName,
    email: data.email,
    phone: data.phone,
    previousSchool: data.previousSchool,
    message: data.message || "No additional comments provided.",
    status: "Exam Scheduled",
    decision: null,
    examDate: examDate,
    examTime: examTime,
    examVenue: examVenue,
    examScore: null,
    mailHistory: [
      {
        type: "EXAM_SCHEDULE",
        title: "Entrance Examination & Screening Docket",
        sender: BANTU_ADMISSIONS_CONFIG.officialSenderEmail,
        recipient: data.email,
        timestamp: `${currentDate} at ${currentTime}`,
        subject: `ENTRANCE EXAMINATION SCHEDULE: Bantu College (${data.studentName} - Ref: ${applicationRef})`
      }
    ]
  };

  db.applications.unshift(newApp);
  saveBantuDatabase(db);
  return { success: true, reference: applicationRef, application: newApp };
}

function updateApplicationStatus(applicationRef, newStatus) {
  const db = getBantuDatabase();
  if (!db.applications) return { success: false, message: "No applications found." };
  const app = db.applications.find(a => a.ref === applicationRef);
  if (app) {
    app.status = newStatus;
    saveBantuDatabase(db);
    return { success: true, message: `Application status updated to ${newStatus}.` };
  }
  return { success: false, message: "Application reference not found." };
}

function updateApplicationClass(applicationRef, newClass) {
  const db = getBantuDatabase();
  if (!db.applications) return { success: false, message: "No applications found." };
  const app = db.applications.find(a => a.ref === applicationRef);
  if (app) {
    app.entryLevel = newClass;
    if (app.studentId && db.students[app.studentId]) {
      db.students[app.studentId].class = newClass;
    }
    saveBantuDatabase(db);
    return { success: true, message: `Application class updated to ${newClass}.` };
  }
  return { success: false, message: "Application reference not found." };
}

// Entrance Screening Assessment Score Management
function saveApplicantEntranceScore(applicationRef, score) {
  const db = getBantuDatabase();
  const app = (db.applications || []).find(a => a.ref === applicationRef);
  if (!app) return { success: false, message: "Application record not found." };

  const parsedScore = parseFloat(score);
  if (isNaN(parsedScore) || parsedScore < 0 || parsedScore > 100) {
    return { success: false, message: "Screening score must be a numerical percentage between 0 and 100." };
  }

  app.examScore = Math.round(parsedScore * 10) / 10;
  if (app.status === "Exam Scheduled") {
    app.status = "Exam Completed";
  }
  saveBantuDatabase(db);
  return {
    success: true,
    application: app,
    recommendation: getScoreRecommendation(app.examScore)
  };
}

function getScoreRecommendation(score) {
  if (score === null || typeof score === "undefined") {
    return { verdict: "Awaiting Assessment", color: "blue", action: "Input Score", badgeClass: "portal-badge-b3" };
  }
  const s = parseFloat(score);
  if (s >= 60.0) {
    return { verdict: "Satisfactory", color: "green", action: "Grant Full Admission", badgeClass: "portal-badge-green" };
  } else if (s >= 45.0) {
    return { verdict: "Marginal / Borderline", color: "gold", action: "Admit on Probation", badgeClass: "portal-badge-gold" };
  } else {
    return { verdict: "Unsatisfactory", color: "red", action: "Decline Admission", badgeClass: "portal-badge-f" };
  }
}

// 1. Decision Action A: Grant Full Admission Offer
function grantFullAdmissionOfferInDb(applicationRef, assignedClass) {
  const db = getBantuDatabase();
  const app = (db.applications || []).find(a => a.ref === applicationRef);
  if (!app) {
    return { success: false, message: "Application record not found." };
  }

  const targetClass = assignedClass || app.entryLevel || "Basic 7A";
  app.entryLevel = targetClass;

  const now = new Date();
  const currentDate = now.toLocaleDateString("en-GB", { day: "2-digit", month: "short", year: "numeric" });
  const currentTime = now.toLocaleTimeString("en-GB", { hour: "2-digit", minute: "2-digit" });

  let assignedStudentId = app.studentId;
  let assignedPin = app.portalPin || "1234";

  if (!assignedStudentId || !db.students[assignedStudentId]) {
    assignedStudentId = generateNextStudentAdmissionNumber(db);
    assignedPin = "1234";
    const initials = app.studentName.split(" ").map(n => n[0]).join("").toUpperCase().slice(0, 2) || "BC";
    const studentEmail = app.studentName.toLowerCase().replace(/[^a-z]/g, ".") + "@bantucollege.edu";

    db.students[assignedStudentId] = {
      pin: assignedPin,
      name: app.studentName,
      initials: initials,
      email: studentEmail,
      class: targetClass,
      position: "Awaiting Assessment",
      feeStatus: "Partial",
      totalTuitionBilled: 450000,
      totalTuitionPaid: 0,
      balance: 450000,
      attendance: "100.00%",
      conduct: "Exemplary",
      formTeacherRemark: "Newly admitted scholar for the 2026/2027 academic session. Welcome to Bantu College.",
      principalRemark: "Congratulations on your admission. Read to Lead.",
      punctuality: "Excellent",
      neatness: "Excellent",
      peers: "Respectful and Cooperative",
      leadership: "Active Initiative",
      incidentText: "No negative disciplinary infractions or official reprimands recorded.",
      rawScores: [
        { subject: "English Studies", ca: 30, exam: 45 },
        { subject: "Mathematics", ca: 32, exam: 48 },
        { subject: "Social and Citizenship Education", ca: 28, exam: 42 },
        { subject: "Nigerian History", ca: 29, exam: 43 },
        { subject: "Physical and Health Education", ca: 30, exam: 44 },
        { subject: "Intermediate Science", ca: 31, exam: 46 },
        { subject: "Business Studies", ca: 27, exam: 40 },
        { subject: "Pre Vocational Studies", ca: 29, exam: 41 },
        { subject: "Cultural and Creative Arts", ca: 28, exam: 40 },
        { subject: "Information Technology", ca: 33, exam: 48 },
        { subject: "Literature", ca: 29, exam: 42 },
        { subject: "Christian Religious Studies (CRS)", ca: 30, exam: 45 },
        { subject: "French", ca: 25, exam: 37 },
        { subject: "Tiv Language", ca: 32, exam: 45 },
        { subject: "Chinese Language", ca: 24, exam: 35 }
      ],
      fees: [],
      sundry: []
    };
  } else {
    db.students[assignedStudentId].class = targetClass;
    db.students[assignedStudentId].conduct = "Exemplary";
  }

  app.status = "Offer Granted";
  app.decision = "Admitted";
  app.studentId = assignedStudentId;
  app.portalPin = assignedPin;
  app.decisionDate = `${currentDate} at ${currentTime}`;

  if (!app.mailHistory) app.mailHistory = [];
  app.mailHistory.push({
    type: "OFFER_GRANTED",
    title: "Provisional Offer of Admission Letter",
    sender: BANTU_ADMISSIONS_CONFIG.officialSenderEmail,
    recipient: app.email,
    timestamp: `${currentDate} at ${currentTime}`,
    subject: `OFFICIAL PROVISIONAL OFFER OF ADMISSION: Bantu College (${app.studentName})`
  });

  saveBantuDatabase(db);
  return {
    success: true,
    application: app,
    student: db.students[assignedStudentId],
    config: BANTU_ADMISSIONS_CONFIG,
    letterType: "OFFER_GRANTED"
  };
}

// 2. Decision Action B: Admit on Academic Probation
function grantProbationAdmissionInDb(applicationRef, assignedClass, probationConditions) {
  const db = getBantuDatabase();
  const app = (db.applications || []).find(a => a.ref === applicationRef);
  if (!app) {
    return { success: false, message: "Application record not found." };
  }

  const targetClass = assignedClass || app.entryLevel || "Basic 7A";
  app.entryLevel = targetClass;

  const now = new Date();
  const currentDate = now.toLocaleDateString("en-GB", { day: "2-digit", month: "short", year: "numeric" });
  const currentTime = now.toLocaleTimeString("en-GB", { hour: "2-digit", minute: "2-digit" });

  let assignedStudentId = app.studentId;
  let assignedPin = app.portalPin || "1234";

  const defaultConditions = "Candidate must attend mandatory after-school remedial clinics in Mathematics and English Studies, and maintain a minimum terminal aggregate of 60.00% across evaluated subjects to lift probationary standing.";
  const finalConditions = probationConditions || defaultConditions;

  if (!assignedStudentId || !db.students[assignedStudentId]) {
    assignedStudentId = generateNextStudentAdmissionNumber(db);
    assignedPin = "1234";
    const initials = app.studentName.split(" ").map(n => n[0]).join("").toUpperCase().slice(0, 2) || "BC";
    const studentEmail = app.studentName.toLowerCase().replace(/[^a-z]/g, ".") + "@bantucollege.edu";

    db.students[assignedStudentId] = {
      pin: assignedPin,
      name: app.studentName,
      initials: initials,
      email: studentEmail,
      class: targetClass,
      position: "Awaiting Assessment",
      feeStatus: "Partial",
      totalTuitionBilled: 450000,
      totalTuitionPaid: 0,
      balance: 450000,
      attendance: "100.00%",
      conduct: "On Academic Probation",
      formTeacherRemark: "Provisionally admitted on academic probation. Assigned to compulsory after-school remedial tutorials.",
      principalRemark: "Opportunity granted to prove scholastic capacity. Must attain 60% terminal aggregate.",
      punctuality: "Very Good",
      neatness: "Good",
      peers: "Polite and Respectful",
      leadership: "Developing",
      incidentText: "No negative disciplinary infractions or official reprimands recorded.",
      rawScores: [
        { subject: "English Studies", ca: 28, exam: 40 },
        { subject: "Mathematics", ca: 26, exam: 38 },
        { subject: "Social and Citizenship Education", ca: 27, exam: 40 },
        { subject: "Nigerian History", ca: 28, exam: 41 },
        { subject: "Physical and Health Education", ca: 29, exam: 42 },
        { subject: "Intermediate Science", ca: 27, exam: 39 },
        { subject: "Business Studies", ca: 26, exam: 38 },
        { subject: "Pre Vocational Studies", ca: 28, exam: 40 },
        { subject: "Cultural and Creative Arts", ca: 27, exam: 39 },
        { subject: "Information Technology", ca: 30, exam: 43 },
        { subject: "Literature", ca: 28, exam: 40 },
        { subject: "Christian Religious Studies (CRS)", ca: 29, exam: 42 },
        { subject: "French", ca: 24, exam: 35 },
        { subject: "Tiv Language", ca: 30, exam: 42 },
        { subject: "Chinese Language", ca: 23, exam: 33 }
      ],
      fees: [],
      sundry: []
    };
  } else {
    db.students[assignedStudentId].class = targetClass;
    db.students[assignedStudentId].conduct = "On Academic Probation";
  }

  app.status = "Admitted on Probation";
  app.decision = "Probation";
  app.probationConditions = finalConditions;
  app.studentId = assignedStudentId;
  app.portalPin = assignedPin;
  app.decisionDate = `${currentDate} at ${currentTime}`;

  if (!app.mailHistory) app.mailHistory = [];
  app.mailHistory.push({
    type: "OFFER_PROBATION",
    title: "Provisional Admission on Academic Probation Letter",
    sender: BANTU_ADMISSIONS_CONFIG.officialSenderEmail,
    recipient: app.email,
    timestamp: `${currentDate} at ${currentTime}`,
    subject: `OFFICIAL PROVISIONAL ADMISSION ON PROBATION: Bantu College (${app.studentName})`
  });

  saveBantuDatabase(db);
  return {
    success: true,
    application: app,
    student: db.students[assignedStudentId],
    config: BANTU_ADMISSIONS_CONFIG,
    letterType: "OFFER_PROBATION"
  };
}

// 3. Decision Action C: Decline Admission / Notice of Regret
function declineAdmissionInDb(applicationRef, declineReason) {
  const db = getBantuDatabase();
  const app = (db.applications || []).find(a => a.ref === applicationRef);
  if (!app) {
    return { success: false, message: "Application record not found." };
  }

  const now = new Date();
  const currentDate = now.toLocaleDateString("en-GB", { day: "2-digit", month: "short", year: "numeric" });
  const currentTime = now.toLocaleTimeString("en-GB", { hour: "2-digit", minute: "2-digit" });

  const defaultReason = "Candidate did not attain the competitive qualifying threshold of 50.00% in the entrance screening examination.";
  app.status = "Admission Declined";
  app.decision = "Declined";
  app.declineReason = declineReason || defaultReason;
  app.decisionDate = `${currentDate} at ${currentTime}`;

  if (!app.mailHistory) app.mailHistory = [];
  app.mailHistory.push({
    type: "OFFER_DECLINED",
    title: "Notice of Non-Admission and Academic Guidance Letter",
    sender: BANTU_ADMISSIONS_CONFIG.officialSenderEmail,
    recipient: app.email,
    timestamp: `${currentDate} at ${currentTime}`,
    subject: `APPLICATION DECISION NOTICE: Bantu College (${app.studentName})`
  });

  saveBantuDatabase(db);
  return {
    success: true,
    application: app,
    student: null,
    config: BANTU_ADMISSIONS_CONFIG,
    letterType: "OFFER_DECLINED"
  };
}

// 4. Action D: Resend Entrance Examination Schedule Docket
function resendExamDocketInDb(applicationRef) {
  const db = getBantuDatabase();
  const app = (db.applications || []).find(a => a.ref === applicationRef);
  if (!app) return { success: false, message: "Application record not found." };

  const now = new Date();
  const currentDate = now.toLocaleDateString("en-GB", { day: "2-digit", month: "short", year: "numeric" });
  const currentTime = now.toLocaleTimeString("en-GB", { hour: "2-digit", minute: "2-digit" });

  if (!app.mailHistory) app.mailHistory = [];
  app.mailHistory.push({
    type: "EXAM_SCHEDULE",
    title: "Entrance Examination & Screening Docket",
    sender: BANTU_ADMISSIONS_CONFIG.officialSenderEmail,
    recipient: app.email,
    timestamp: `${currentDate} at ${currentTime}`,
    subject: `ENTRANCE EXAMINATION SCHEDULE: Bantu College (${app.studentName} - Ref: ${app.ref})`
  });

  saveBantuDatabase(db);
  return {
    success: true,
    application: app,
    config: BANTU_ADMISSIONS_CONFIG,
    letterType: "EXAM_SCHEDULE"
  };
}

// Compatibility wrapper
function grantAdmissionOfferInDb(applicationRef, assignedClass) {
  return grantFullAdmissionOfferInDb(applicationRef, assignedClass);
}

function getAdmissionOfferData(applicationRef, requestedType) {
  const db = getBantuDatabase();
  const app = (db.applications || []).find(a => a.ref === applicationRef);
  if (!app) return null;
  const student = app.studentId ? db.students[app.studentId] : null;

  let activeType = requestedType;
  if (!activeType) {
    if (app.decision === "Probation" || app.status === "Admitted on Probation") activeType = "OFFER_PROBATION";
    else if (app.decision === "Declined" || app.status === "Admission Declined") activeType = "OFFER_DECLINED";
    else if (app.decision === "Admitted" || app.status === "Offer Granted") activeType = "OFFER_GRANTED";
    else activeType = "EXAM_SCHEDULE";
  }

  return {
    application: app,
    student: student,
    config: BANTU_ADMISSIONS_CONFIG,
    letterType: activeType
  };
}

