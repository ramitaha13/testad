import { useState } from "react";

const mockStats = {
  userName: "דני כהן",
  userRole: "אב בית",
  apartment: "דירה א׳ - חיפה",
};

const mockResidents = [
  {
    id: 1,
    name: "דוד לוי",
    age: 28,
    room: "חדר 1",
    status: "active",
    medicationSchedule: "בוקר + ערב",
    todayMedication: "נטל בוקר",
    todayMood: "חיובי",
    alerts: 0,
  },
  {
    id: 2,
    name: "שרה כהן",
    age: 32,
    room: "חדר 2",
    status: "active",
    medicationSchedule: "בוקר + צהריים + ערב",
    todayMedication: "נטלה בוקר + צהריים",
    todayMood: "רגועה",
    alerts: 0,
  },
  {
    id: 3,
    name: "יוסי אברהם",
    age: 25,
    room: "חדר 3",
    status: "active",
    medicationSchedule: "בוקר + ערב",
    todayMedication: "נטל בוקר",
    todayMood: "טוב",
    alerts: 1,
  },
  {
    id: 4,
    name: "רחל מזרחי",
    age: 30,
    room: "חדר 4",
    status: "absent",
    medicationSchedule: "בוקר + ערב",
    todayMedication: "חסר - ביקור רופא",
    todayMood: "-",
    alerts: 0,
  },
];

const initialReports = [
  {
    id: 1,
    shiftType: "בוקר",
    date: "19/03/2026",
    dayOfWeek: "חמישי",
    supervisors: "דני כהן",
    status: "נשלח",
    residentsPresent: 4,
    totalResidents: 4,
    residents: [],
    conversationTopic: "",
    generalInfo: "",
    shiftDescription: "",
    unusualEvent: "",
    maintenanceTasks: "",
    importantNotes: "",
    supervisor1Name: "",
    supervisor2Name: "",
    receiver1Name: "",
    receiver2Name: "",
  },
];

const mockShifts = [
  {
    id: 1,
    date: "היום",
    shift: "בוקר",
    staff: "דני כהן",
    status: "active",
  },
  {
    id: 2,
    date: "היום",
    shift: "צהריים",
    staff: "מיכל אברהם",
    status: "upcoming",
  },
  {
    id: 3,
    date: "היום",
    shift: "לילה",
    staff: "רונן ברק",
    status: "upcoming",
  },
];

const mockNotes = [
  {
    id: 1,
    date: "19/03/2026",
    time: "08:30",
    note: 'דוד דיבר על רצון להתחיל לעבוד - לתאם עם עו"ס',
    priority: "high",
  },
  {
    id: 2,
    date: "19/03/2026",
    time: "10:15",
    note: "תיקון ברז במטבח - צריך לקרוא לאיש תחזוקה",
    priority: "medium",
  },
  {
    id: 3,
    date: "18/03/2026",
    time: "14:20",
    note: "ביקור הורי דוד התקיים בהצלחה",
    priority: "low",
  },
];

const NAV = [
  { id: "dashboard", label: "דשבורד", icon: "⬡", path: null },
  { id: "reports", label: "כל הדוחות", icon: "▦", path: null },
  { id: "addReport", label: "הוספת דוח", icon: "✎", path: null },
  { id: "shifts", label: "משמרות", icon: "◷", path: null },
  { id: "notes", label: "הערות", icon: "📝", path: null },
];

const shiftIcon = (shift) =>
  ({ בוקר: "☀", צהריים: "◑", לילה: "☽", "בוקר+צהריים": "☀◑" })[shift] || "·";

export default function HouseManagerDashboard() {
  const [active, setActive] = useState("dashboard");
  const [sidebarOpen, setSidebarOpen] = useState(true);
  const [showNoteModal, setShowNoteModal] = useState(false);
  const [reports, setReports] = useState(initialReports);
  const [showReportModal, setShowReportModal] = useState(false);
  const [viewingReport, setViewingReport] = useState(null);
  const [editingReport, setEditingReport] = useState(null);
  const [noteFormData, setNoteFormData] = useState({
    note: "",
    priority: "medium",
  });

  const [formData, setFormData] = useState({
    apartment: mockStats.apartment,
    shiftType: "בוקר",
    supervisors: "",
    startDate: "",
    dayOfWeek: "",
    residents: [
      {
        id: 1,
        name: "",
        present: "נוכח",
        absenceReason: "",
        medication: "",
        shower: "עשה",
        meal: "",
        appetite: "",
        personalPlan: "",
        duties: "",
        activity: "",
        mood: "",
        unusualCurrent: "",
        medicationNoRx: "",
        sleep: "רציפה",
        wakeup: "תקין",
      },
    ],
    conversationTopic: "",
    generalInfo: "",
    shiftDescription: "",
    unusualEvent: "",
    maintenanceTasks: "",
    importantNotes: "",
    supervisor1Name: "",
    supervisor2Name: "",
    receiver1Name: "",
    receiver2Name: "",
    status: "טיוטה",
  });

  const handleAddNewReport = () => {
    setEditingReport(null);
    setViewingReport(null);
    const today = new Date().toLocaleDateString("he-IL");
    const dayNames = ["ראשון", "שני", "שלישי", "רביעי", "חמישי", "שישי", "שבת"];
    const dayOfWeek = dayNames[new Date().getDay()];

    setFormData({
      apartment: mockStats.apartment,
      shiftType: "בוקר",
      supervisors: mockStats.userName,
      startDate: today,
      dayOfWeek: dayOfWeek,
      residents: mockResidents.map((r, index) => ({
        id: index + 1,
        name: r.name,
        present: "נוכח",
        absenceReason: "",
        medication: "",
        shower: "עשה",
        meal: "",
        appetite: "",
        personalPlan: "",
        duties: "",
        activity: "",
        mood: "",
        unusualCurrent: "",
        medicationNoRx: "",
        sleep: "רציפה",
        wakeup: "תקין",
      })),
      conversationTopic: "",
      generalInfo: "",
      shiftDescription: "",
      unusualEvent: "",
      maintenanceTasks: "",
      importantNotes: "",
      supervisor1Name: mockStats.userName,
      supervisor2Name: "",
      receiver1Name: "",
      receiver2Name: "",
      status: "טיוטה",
    });
    setShowReportModal(true);
  };

  const handleSubmitReport = (e) => {
    e.preventDefault();

    if (editingReport) {
      setReports(
        reports.map((report) =>
          report.id === editingReport.id ? { ...report, ...formData } : report,
        ),
      );
    } else {
      const newReport = {
        id: Math.max(0, ...reports.map((r) => r.id)) + 1,
        ...formData,
        residentsPresent: formData.residents.filter((r) => r.present === "נוכח")
          .length,
        totalResidents: formData.residents.length,
      };
      setReports([...reports, newReport]);
    }

    setShowReportModal(false);
  };

  const handleViewReport = (report) => {
    setViewingReport(report);
    setEditingReport(null);
    setShowReportModal(true);
  };

  const handleEditReport = (report) => {
    setEditingReport(report);
    setViewingReport(null);
    setFormData(report);
    setShowReportModal(true);
  };

  const handleDeleteReport = (id) => {
    if (window.confirm("האם אתה בטוח שברצונך למחוק את הדוח?")) {
      setReports(reports.filter((report) => report.id !== id));
    }
  };

  const addResident = () => {
    setFormData({
      ...formData,
      residents: [
        ...formData.residents,
        {
          id: formData.residents.length + 1,
          name: "",
          present: "נוכח",
          absenceReason: "",
          medication: "",
          shower: "עשה",
          meal: "",
          appetite: "",
          personalPlan: "",
          duties: "",
          activity: "",
          mood: "",
          unusualCurrent: "",
          medicationNoRx: "",
          sleep: "רציפה",
          wakeup: "תקין",
        },
      ],
    });
  };

  const removeResident = (id) => {
    setFormData({
      ...formData,
      residents: formData.residents.filter((r) => r.id !== id),
    });
  };

  const updateResident = (id, field, value) => {
    setFormData({
      ...formData,
      residents: formData.residents.map((r) =>
        r.id === id ? { ...r, [field]: value } : r,
      ),
    });
  };

  const statusBadge = (status) => {
    const map = {
      active: "bg-emerald-500/15 text-emerald-400 border border-emerald-500/30",
      absent: "bg-amber-500/15 text-amber-400 border border-amber-500/30",
      נבדק: "bg-emerald-500/15 text-emerald-400 border border-emerald-500/30",
      נשלח: "bg-sky-500/15 text-sky-400 border border-sky-500/30",
      טיוטה: "bg-amber-500/15 text-amber-400 border border-amber-500/30",
      upcoming: "bg-violet-500/15 text-violet-400 border border-violet-500/30",
    };
    const label = {
      active: "פעיל",
      absent: "חסר",
      upcoming: "קרוב",
    };
    return (
      <span
        className={`text-xs font-medium px-2 py-0.5 rounded-full ${map[status] || ""}`}
      >
        {label[status] || status}
      </span>
    );
  };

  const priorityBadge = (priority) => {
    const map = {
      high: "bg-red-500/15 text-red-400 border border-red-500/30",
      medium: "bg-amber-500/15 text-amber-400 border border-amber-500/30",
      low: "bg-zinc-500/15 text-zinc-400 border border-zinc-500/30",
    };
    const label = { high: "דחוף", medium: "בינוני", low: "רגיל" };
    return (
      <span
        className={`text-xs font-medium px-2 py-0.5 rounded-full ${map[priority] || ""}`}
      >
        {label[priority] || priority}
      </span>
    );
  };

  return (
    <div
      dir="rtl"
      className="min-h-screen flex bg-[#0d0f14] text-zinc-100"
      style={{ fontFamily: "'IBM Plex Sans Hebrew', 'Rubik', sans-serif" }}
    >
      {/* Sidebar */}
      <aside
        className={`${sidebarOpen ? "w-60" : "w-16"} transition-all duration-300 flex flex-col bg-[#111318] border-l border-zinc-800/60 shrink-0`}
      >
        {/* Logo */}
        <div className="flex items-center gap-3 px-4 py-5 border-b border-zinc-800/60">
          <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-emerald-500 to-teal-600 flex items-center justify-center text-white font-bold text-sm shrink-0">
            א
          </div>
          {sidebarOpen && (
            <span className="font-semibold text-sm text-zinc-100 tracking-wide">
              אב/אם בית
            </span>
          )}
        </div>

        {/* Nav */}
        <nav className="flex-1 px-2 py-4 flex flex-col gap-1">
          {NAV.map((item) => (
            <button
              key={item.id}
              onClick={() => setActive(item.id)}
              className={`flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm transition-all duration-150 w-full text-right
                ${
                  active === item.id
                    ? "bg-emerald-600/20 text-emerald-300 border border-emerald-500/25"
                    : "text-zinc-400 hover:text-zinc-200 hover:bg-zinc-800/50"
                }`}
            >
              <span className="text-base w-5 text-center shrink-0">
                {item.icon}
              </span>
              {sidebarOpen && <span>{item.label}</span>}
            </button>
          ))}
        </nav>

        {/* User */}
        <div className="px-3 py-4 border-t border-zinc-800/60">
          <div className="flex items-center gap-3">
            <div className="w-8 h-8 rounded-full bg-gradient-to-br from-emerald-500 to-teal-500 flex items-center justify-center text-xs font-bold shrink-0">
              ד
            </div>
            {sidebarOpen && (
              <div className="overflow-hidden">
                <div className="text-sm font-medium text-zinc-200 truncate">
                  {mockStats.userName}
                </div>
                <div className="text-xs text-zinc-500">
                  {mockStats.apartment}
                </div>
              </div>
            )}
          </div>
        </div>
      </aside>

      {/* Main */}
      <div className="flex-1 flex flex-col overflow-hidden">
        {/* Topbar */}
        <header className="h-14 flex items-center justify-between px-6 border-b border-zinc-800/60 bg-[#0d0f14]/80 backdrop-blur-sm shrink-0">
          <div className="flex items-center gap-4">
            <button
              onClick={() => setSidebarOpen(!sidebarOpen)}
              className="text-zinc-400 hover:text-zinc-200 transition-colors"
            >
              ☰
            </button>
            <h1 className="text-base font-semibold text-zinc-100">
              {NAV.find((n) => n.id === active)?.label}
            </h1>
          </div>
          <div className="flex items-center gap-3">
            <button className="relative w-8 h-8 flex items-center justify-center rounded-lg text-zinc-400 hover:text-zinc-200 hover:bg-zinc-800 transition-all">
              <span>🔔</span>
              {mockResidents.filter((r) => r.alerts > 0).length > 0 && (
                <span className="absolute top-1 right-1 w-2 h-2 bg-red-500 rounded-full"></span>
              )}
            </button>
            <div className="text-xs text-zinc-500">יום ה׳, 19.03.2026</div>
          </div>
        </header>

        {/* Content */}
        <main className="flex-1 overflow-y-auto p-6">
          {active === "dashboard" && (
            <DashboardView
              residents={mockResidents}
              reports={reports}
              shifts={mockShifts}
              notes={mockNotes}
              statusBadge={statusBadge}
              priorityBadge={priorityBadge}
              apartment={mockStats.apartment}
              shiftIcon={shiftIcon}
            />
          )}
          {active === "reports" && (
            <AllReportsView
              reports={reports}
              statusBadge={statusBadge}
              shiftIcon={shiftIcon}
              onView={handleViewReport}
              onEdit={handleEditReport}
              onDelete={handleDeleteReport}
            />
          )}
          {active === "addReport" && (
            <div className="flex items-center justify-center py-12">
              <button
                onClick={handleAddNewReport}
                className="flex items-center gap-3 bg-emerald-600 hover:bg-emerald-500 text-white px-8 py-4 rounded-xl transition-colors text-lg"
              >
                <span className="text-2xl">+</span>
                <span>צור דוח משמרת חדש</span>
              </button>
            </div>
          )}
          {active === "shifts" && (
            <ShiftsView shifts={mockShifts} statusBadge={statusBadge} />
          )}
          {active === "notes" && (
            <NotesView
              notes={mockNotes}
              priorityBadge={priorityBadge}
              onAddNote={() => setShowNoteModal(true)}
            />
          )}
        </main>
      </div>

      {/* Note Modal */}
      {showNoteModal && (
        <div className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center z-50 p-4">
          <div className="bg-[#111318] border border-zinc-800/60 rounded-xl p-6 max-w-2xl w-full">
            <h2 className="text-xl font-semibold text-zinc-100 mb-4">
              הערה חדשה
            </h2>

            <form className="space-y-4">
              <div>
                <label className="block text-sm text-zinc-400 mb-1.5">
                  דחיפות
                </label>
                <select
                  value={noteFormData.priority}
                  onChange={(e) =>
                    setNoteFormData({
                      ...noteFormData,
                      priority: e.target.value,
                    })
                  }
                  className="w-full bg-zinc-800/50 border border-zinc-700/60 rounded-lg px-3 py-2 text-zinc-100 text-sm focus:outline-none focus:border-emerald-500/50"
                >
                  <option value="low">רגיל</option>
                  <option value="medium">בינוני</option>
                  <option value="high">דחוף</option>
                </select>
              </div>

              <div>
                <label className="block text-sm text-zinc-400 mb-1.5">
                  תוכן ההערה
                </label>
                <textarea
                  value={noteFormData.note}
                  onChange={(e) =>
                    setNoteFormData({
                      ...noteFormData,
                      note: e.target.value,
                    })
                  }
                  rows="6"
                  className="w-full bg-zinc-800/50 border border-zinc-700/60 rounded-lg px-3 py-2 text-zinc-100 text-sm focus:outline-none focus:border-emerald-500/50 resize-none"
                  placeholder="כתוב את ההערה כאן..."
                />
              </div>

              <div className="flex gap-3 pt-2">
                <button
                  type="button"
                  onClick={() => setShowNoteModal(false)}
                  className="flex-1 bg-emerald-600 hover:bg-emerald-500 text-white text-sm px-4 py-2.5 rounded-lg transition-colors"
                >
                  שמור הערה
                </button>
                <button
                  type="button"
                  onClick={() => setShowNoteModal(false)}
                  className="flex-1 bg-zinc-800/50 hover:bg-zinc-700/50 text-zinc-300 text-sm px-4 py-2.5 rounded-lg transition-colors"
                >
                  ביטול
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* Report Modal - טופס מלא */}
      {showReportModal && !viewingReport && (
        <div className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center z-50 p-4">
          <div className="bg-[#111318] border border-zinc-800/60 rounded-xl p-6 max-w-6xl w-full max-h-[90vh] overflow-y-auto">
            <h2 className="text-xl font-semibold text-zinc-100 mb-6 text-center">
              {editingReport ? "עריכת דוח משמרת" : "דוח משמרת חדש"}
            </h2>

            <form onSubmit={handleSubmitReport} className="space-y-6">
              {/* פרטי המשמרת הכלליים */}
              <div className="bg-zinc-800/30 rounded-lg p-4">
                <h3 className="text-sm font-semibold text-zinc-200 mb-3">
                  פרטי המשמרת
                </h3>
                <div className="grid grid-cols-4 gap-4">
                  <div>
                    <label className="block text-xs text-zinc-400 mb-1.5">
                      1) איזה משמרת
                    </label>
                    <select
                      value={formData.shiftType}
                      onChange={(e) =>
                        setFormData({ ...formData, shiftType: e.target.value })
                      }
                      className="w-full bg-zinc-800/50 border border-zinc-700/60 rounded-lg px-3 py-2 text-zinc-100 text-sm focus:outline-none focus:border-emerald-500/50"
                    >
                      <option value="בוקר">בוקר</option>
                      <option value="צהריים">צהריים</option>
                      <option value="לילה">לילה</option>
                      <option value="בוקר+צהריים">בוקר+צהריים</option>
                    </select>
                  </div>
                  <div>
                    <label className="block text-xs text-zinc-400 mb-1.5">
                      2) שמות המדריכים במשמרת
                    </label>
                    <input
                      type="text"
                      value={formData.supervisors}
                      onChange={(e) =>
                        setFormData({
                          ...formData,
                          supervisors: e.target.value,
                        })
                      }
                      className="w-full bg-zinc-800/50 border border-zinc-700/60 rounded-lg px-3 py-2 text-zinc-100 text-sm focus:outline-none focus:border-emerald-500/50"
                      placeholder="שמות המדריכים"
                    />
                  </div>
                  <div>
                    <label className="block text-xs text-zinc-400 mb-1.5">
                      3) תאריך תחילת המשמרת
                    </label>
                    <input
                      type="text"
                      value={formData.startDate}
                      onChange={(e) =>
                        setFormData({ ...formData, startDate: e.target.value })
                      }
                      className="w-full bg-zinc-800/50 border border-zinc-700/60 rounded-lg px-3 py-2 text-zinc-100 text-sm focus:outline-none focus:border-emerald-500/50"
                    />
                  </div>
                  <div>
                    <label className="block text-xs text-zinc-400 mb-1.5">
                      4) יום בשבוע
                    </label>
                    <input
                      type="text"
                      value={formData.dayOfWeek}
                      onChange={(e) =>
                        setFormData({ ...formData, dayOfWeek: e.target.value })
                      }
                      className="w-full bg-zinc-800/50 border border-zinc-700/60 rounded-lg px-3 py-2 text-zinc-100 text-sm focus:outline-none focus:border-emerald-500/50"
                    />
                  </div>
                </div>
              </div>

              {/* 5) דיירים - טבלה לכל דייר */}
              <div className="bg-zinc-800/30 rounded-lg p-4">
                <div className="flex items-center justify-between mb-3">
                  <h3 className="text-sm font-semibold text-zinc-200">
                    5) דיירים - מילוי עבור כל דייר
                  </h3>
                  <button
                    type="button"
                    onClick={addResident}
                    className="text-xs bg-emerald-600 hover:bg-emerald-500 text-white px-3 py-1.5 rounded-lg transition-colors"
                  >
                    + הוסף דייר
                  </button>
                </div>

                <div className="space-y-4">
                  {formData.residents.map((resident, index) => (
                    <div
                      key={resident.id}
                      className="bg-zinc-900/50 rounded-lg p-4 border border-zinc-700/40"
                    >
                      <div className="flex items-center justify-between mb-3">
                        <h4 className="text-sm font-medium text-zinc-300">
                          דייר #{index + 1}
                        </h4>
                        {formData.residents.length > 1 && (
                          <button
                            type="button"
                            onClick={() => removeResident(resident.id)}
                            className="text-xs text-red-400 hover:text-red-300"
                          >
                            הסר
                          </button>
                        )}
                      </div>

                      <div className="grid grid-cols-3 gap-3">
                        <div className="col-span-3">
                          <label className="block text-xs text-zinc-400 mb-1">
                            שם הדייר
                          </label>
                          <input
                            type="text"
                            value={resident.name}
                            onChange={(e) =>
                              updateResident(
                                resident.id,
                                "name",
                                e.target.value,
                              )
                            }
                            className="w-full bg-zinc-800/50 border border-zinc-700/60 rounded-lg px-3 py-2 text-zinc-100 text-sm focus:outline-none focus:border-emerald-500/50"
                            placeholder="שם מלא"
                          />
                        </div>

                        <div>
                          <label className="block text-xs text-zinc-400 mb-1">
                            6) נוכח/חסר
                          </label>
                          <select
                            value={resident.present}
                            onChange={(e) =>
                              updateResident(
                                resident.id,
                                "present",
                                e.target.value,
                              )
                            }
                            className="w-full bg-zinc-800/50 border border-zinc-700/60 rounded-lg px-3 py-2 text-zinc-100 text-sm focus:outline-none focus:border-emerald-500/50"
                          >
                            <option value="נוכח">נוכח</option>
                            <option value="חסר">חסר</option>
                          </select>
                        </div>

                        {resident.present === "חסר" && (
                          <div className="col-span-2">
                            <label className="block text-xs text-zinc-400 mb-1">
                              סיבה להעדרות
                            </label>
                            <input
                              type="text"
                              value={resident.absenceReason}
                              onChange={(e) =>
                                updateResident(
                                  resident.id,
                                  "absenceReason",
                                  e.target.value,
                                )
                              }
                              className="w-full bg-zinc-800/50 border border-zinc-700/60 rounded-lg px-3 py-2 text-zinc-100 text-sm focus:outline-none focus:border-emerald-500/50"
                            />
                          </div>
                        )}

                        <div>
                          <label className="block text-xs text-zinc-400 mb-1">
                            7) נטילת כדורים
                          </label>
                          <input
                            type="text"
                            value={resident.medication}
                            onChange={(e) =>
                              updateResident(
                                resident.id,
                                "medication",
                                e.target.value,
                              )
                            }
                            className="w-full bg-zinc-800/50 border border-zinc-700/60 rounded-lg px-3 py-2 text-zinc-100 text-sm focus:outline-none focus:border-emerald-500/50"
                          />
                        </div>

                        <div>
                          <label className="block text-xs text-zinc-400 mb-1">
                            8) מקלחת
                          </label>
                          <select
                            value={resident.shower}
                            onChange={(e) =>
                              updateResident(
                                resident.id,
                                "shower",
                                e.target.value,
                              )
                            }
                            className="w-full bg-zinc-800/50 border border-zinc-700/60 rounded-lg px-3 py-2 text-zinc-100 text-sm focus:outline-none focus:border-emerald-500/50"
                          >
                            <option value="עשה">עשה</option>
                            <option value="לא עשה">לא עשה</option>
                          </select>
                        </div>

                        <div>
                          <label className="block text-xs text-zinc-400 mb-1">
                            9) איזה ארוחה
                          </label>
                          <input
                            type="text"
                            value={resident.meal}
                            onChange={(e) =>
                              updateResident(
                                resident.id,
                                "meal",
                                e.target.value,
                              )
                            }
                            className="w-full bg-zinc-800/50 border border-zinc-700/60 rounded-lg px-3 py-2 text-zinc-100 text-sm focus:outline-none focus:border-emerald-500/50"
                            placeholder="בוקר/צהריים/ערב"
                          />
                        </div>

                        <div>
                          <label className="block text-xs text-zinc-400 mb-1">
                            מידת התיאבון
                          </label>
                          <input
                            type="text"
                            value={resident.appetite}
                            onChange={(e) =>
                              updateResident(
                                resident.id,
                                "appetite",
                                e.target.value,
                              )
                            }
                            className="w-full bg-zinc-800/50 border border-zinc-700/60 rounded-lg px-3 py-2 text-zinc-100 text-sm focus:outline-none focus:border-emerald-500/50"
                          />
                        </div>

                        <div className="col-span-3">
                          <label className="block text-xs text-zinc-400 mb-1">
                            10) פירוט תוכנית אישית של הדייר
                          </label>
                          <textarea
                            value={resident.personalPlan}
                            onChange={(e) =>
                              updateResident(
                                resident.id,
                                "personalPlan",
                                e.target.value,
                              )
                            }
                            rows="2"
                            className="w-full bg-zinc-800/50 border border-zinc-700/60 rounded-lg px-3 py-2 text-zinc-100 text-sm focus:outline-none focus:border-emerald-500/50 resize-none"
                          />
                        </div>

                        <div>
                          <label className="block text-xs text-zinc-400 mb-1">
                            11) תורנויות שביצע
                          </label>
                          <input
                            type="text"
                            value={resident.duties}
                            onChange={(e) =>
                              updateResident(
                                resident.id,
                                "duties",
                                e.target.value,
                              )
                            }
                            className="w-full bg-zinc-800/50 border border-zinc-700/60 rounded-lg px-3 py-2 text-zinc-100 text-sm focus:outline-none focus:border-emerald-500/50"
                          />
                        </div>

                        <div className="col-span-2">
                          <label className="block text-xs text-zinc-400 mb-1">
                            12) פעילות הדייר במשמרת
                          </label>
                          <input
                            type="text"
                            value={resident.activity}
                            onChange={(e) =>
                              updateResident(
                                resident.id,
                                "activity",
                                e.target.value,
                              )
                            }
                            className="w-full bg-zinc-800/50 border border-zinc-700/60 rounded-lg px-3 py-2 text-zinc-100 text-sm focus:outline-none focus:border-emerald-500/50"
                          />
                        </div>

                        <div>
                          <label className="block text-xs text-zinc-400 mb-1">
                            13) מצב רוח
                          </label>
                          <input
                            type="text"
                            value={resident.mood}
                            onChange={(e) =>
                              updateResident(
                                resident.id,
                                "mood",
                                e.target.value,
                              )
                            }
                            className="w-full bg-zinc-800/50 border border-zinc-700/60 rounded-lg px-3 py-2 text-zinc-100 text-sm focus:outline-none focus:border-emerald-500/50"
                          />
                        </div>

                        <div className="col-span-2">
                          <label className="block text-xs text-zinc-400 mb-1">
                            14) אירוע חריג שוטף (SOS/מצב רוח/התנהגות/ביקור רופא)
                          </label>
                          <input
                            type="text"
                            value={resident.unusualCurrent}
                            onChange={(e) =>
                              updateResident(
                                resident.id,
                                "unusualCurrent",
                                e.target.value,
                              )
                            }
                            className="w-full bg-zinc-800/50 border border-zinc-700/60 rounded-lg px-3 py-2 text-zinc-100 text-sm focus:outline-none focus:border-emerald-500/50"
                          />
                        </div>

                        <div className="col-span-3">
                          <label className="block text-xs text-zinc-400 mb-1">
                            15) מתן תרופה ללא מרשם - פרט
                          </label>
                          <input
                            type="text"
                            value={resident.medicationNoRx}
                            onChange={(e) =>
                              updateResident(
                                resident.id,
                                "medicationNoRx",
                                e.target.value,
                              )
                            }
                            className="w-full bg-zinc-800/50 border border-zinc-700/60 rounded-lg px-3 py-2 text-zinc-100 text-sm focus:outline-none focus:border-emerald-500/50"
                          />
                        </div>

                        <div>
                          <label className="block text-xs text-zinc-400 mb-1">
                            16) איך ישן?
                          </label>
                          <select
                            value={resident.sleep}
                            onChange={(e) =>
                              updateResident(
                                resident.id,
                                "sleep",
                                e.target.value,
                              )
                            }
                            className="w-full bg-zinc-800/50 border border-zinc-700/60 rounded-lg px-3 py-2 text-zinc-100 text-sm focus:outline-none focus:border-emerald-500/50"
                          >
                            <option value="רציפה">שינה רציפה</option>
                            <option value="לא רציפה">לא רציפה</option>
                          </select>
                        </div>

                        <div>
                          <label className="block text-xs text-zinc-400 mb-1">
                            17) השכמה ויציאה למסגרת
                          </label>
                          <select
                            value={resident.wakeup}
                            onChange={(e) =>
                              updateResident(
                                resident.id,
                                "wakeup",
                                e.target.value,
                              )
                            }
                            className="w-full bg-zinc-800/50 border border-zinc-700/60 rounded-lg px-3 py-2 text-zinc-100 text-sm focus:outline-none focus:border-emerald-500/50"
                          >
                            <option value="תקין">תקין</option>
                            <option value="לא תקין">לא תקין</option>
                          </select>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* שאר השדות הכלליים */}
              <div className="bg-zinc-800/30 rounded-lg p-4 space-y-4">
                <div>
                  <label className="block text-sm text-zinc-400 mb-1.5">
                    18) נושא שיחה ארוכה
                  </label>
                  <textarea
                    value={formData.conversationTopic}
                    onChange={(e) =>
                      setFormData({
                        ...formData,
                        conversationTopic: e.target.value,
                      })
                    }
                    rows="3"
                    className="w-full bg-zinc-800/50 border border-zinc-700/60 rounded-lg px-3 py-2 text-zinc-100 text-sm focus:outline-none focus:border-emerald-500/50 resize-none"
                  />
                </div>

                <div>
                  <label className="block text-sm text-zinc-400 mb-1.5">
                    19) מידע כללי - אירועים/פעילות קבוצתית/ביקורים
                  </label>
                  <textarea
                    value={formData.generalInfo}
                    onChange={(e) =>
                      setFormData({ ...formData, generalInfo: e.target.value })
                    }
                    rows="3"
                    className="w-full bg-zinc-800/50 border border-zinc-700/60 rounded-lg px-3 py-2 text-zinc-100 text-sm focus:outline-none focus:border-emerald-500/50 resize-none"
                  />
                </div>

                <div>
                  <label className="block text-sm text-zinc-400 mb-1.5">
                    20) תיאור כללי של המשמרת
                  </label>
                  <textarea
                    value={formData.shiftDescription}
                    onChange={(e) =>
                      setFormData({
                        ...formData,
                        shiftDescription: e.target.value,
                      })
                    }
                    rows="3"
                    className="w-full bg-zinc-800/50 border border-zinc-700/60 rounded-lg px-3 py-2 text-zinc-100 text-sm focus:outline-none focus:border-emerald-500/50 resize-none"
                  />
                </div>

                <div>
                  <label className="block text-sm text-zinc-400 mb-1.5">
                    21) אירוע חריג
                  </label>
                  <textarea
                    value={formData.unusualEvent}
                    onChange={(e) =>
                      setFormData({ ...formData, unusualEvent: e.target.value })
                    }
                    rows="3"
                    className="w-full bg-zinc-800/50 border border-zinc-700/60 rounded-lg px-3 py-2 text-zinc-100 text-sm focus:outline-none focus:border-emerald-500/50 resize-none"
                  />
                </div>

                <div>
                  <label className="block text-sm text-zinc-400 mb-1.5">
                    22) משימות שנעשו - אחזקת דירה
                  </label>
                  <textarea
                    value={formData.maintenanceTasks}
                    onChange={(e) =>
                      setFormData({
                        ...formData,
                        maintenanceTasks: e.target.value,
                      })
                    }
                    rows="2"
                    className="w-full bg-zinc-800/50 border border-zinc-700/60 rounded-lg px-3 py-2 text-zinc-100 text-sm focus:outline-none focus:border-emerald-500/50 resize-none"
                  />
                </div>

                <div>
                  <label className="block text-sm text-zinc-400 mb-1.5">
                    23) הערות חשובות להעביר למדריכים הבאים
                  </label>
                  <textarea
                    value={formData.importantNotes}
                    onChange={(e) =>
                      setFormData({
                        ...formData,
                        importantNotes: e.target.value,
                      })
                    }
                    rows="2"
                    className="w-full bg-zinc-800/50 border border-zinc-700/60 rounded-lg px-3 py-2 text-zinc-100 text-sm focus:outline-none focus:border-emerald-500/50 resize-none"
                  />
                </div>
              </div>

              {/* חתימות */}
              <div className="bg-zinc-800/30 rounded-lg p-4">
                <h3 className="text-sm font-semibold text-zinc-200 mb-3">
                  חתימות
                </h3>
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="block text-xs text-zinc-400 mb-1.5">
                      24) שם מדריך מוסר משמרת
                    </label>
                    <input
                      type="text"
                      value={formData.supervisor1Name}
                      onChange={(e) =>
                        setFormData({
                          ...formData,
                          supervisor1Name: e.target.value,
                        })
                      }
                      className="w-full bg-zinc-800/50 border border-zinc-700/60 rounded-lg px-3 py-2 text-zinc-100 text-sm focus:outline-none focus:border-emerald-500/50"
                    />
                  </div>
                  <div>
                    <label className="block text-xs text-zinc-400 mb-1.5">
                      25) שם מדריך מוסר משמרת (2)
                    </label>
                    <input
                      type="text"
                      value={formData.supervisor2Name}
                      onChange={(e) =>
                        setFormData({
                          ...formData,
                          supervisor2Name: e.target.value,
                        })
                      }
                      className="w-full bg-zinc-800/50 border border-zinc-700/60 rounded-lg px-3 py-2 text-zinc-100 text-sm focus:outline-none focus:border-emerald-500/50"
                    />
                  </div>
                  <div>
                    <label className="block text-xs text-zinc-400 mb-1.5">
                      28) שם מדריך מקבל משמרת
                    </label>
                    <input
                      type="text"
                      value={formData.receiver1Name}
                      onChange={(e) =>
                        setFormData({
                          ...formData,
                          receiver1Name: e.target.value,
                        })
                      }
                      className="w-full bg-zinc-800/50 border border-zinc-700/60 rounded-lg px-3 py-2 text-zinc-100 text-sm focus:outline-none focus:border-emerald-500/50"
                    />
                  </div>
                  <div>
                    <label className="block text-xs text-zinc-400 mb-1.5">
                      29) שם מדריך מקבל משמרת (2)
                    </label>
                    <input
                      type="text"
                      value={formData.receiver2Name}
                      onChange={(e) =>
                        setFormData({
                          ...formData,
                          receiver2Name: e.target.value,
                        })
                      }
                      className="w-full bg-zinc-800/50 border border-zinc-700/60 rounded-lg px-3 py-2 text-zinc-100 text-sm focus:outline-none focus:border-emerald-500/50"
                    />
                  </div>
                </div>
                <p className="text-xs text-zinc-500 mt-2">
                  * חתימות (26, 27, 30, 31) ייחתמו על גבי הדוח המודפס
                </p>
              </div>

              {/* כפתורי שמירה */}
              <div className="flex gap-3 pt-4 border-t border-zinc-800/60">
                <button
                  type="submit"
                  className="flex-1 bg-emerald-600 hover:bg-emerald-500 text-white text-sm px-4 py-2.5 rounded-lg transition-colors"
                >
                  {editingReport ? "שמור שינויים" : "צור דוח"}
                </button>
                <button
                  type="button"
                  onClick={() => setShowReportModal(false)}
                  className="flex-1 bg-zinc-800/50 hover:bg-zinc-700/50 text-zinc-300 text-sm px-4 py-2.5 rounded-lg transition-colors"
                >
                  ביטול
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* Report View Modal */}
      {showReportModal && viewingReport && (
        <div className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center z-50 p-4">
          <div className="bg-[#111318] border border-zinc-800/60 rounded-xl p-6 max-w-4xl w-full max-h-[90vh] overflow-y-auto">
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-xl font-semibold text-zinc-100">
                פרטי דוח משמרת
              </h2>
              <button
                onClick={() => setShowReportModal(false)}
                className="text-zinc-500 hover:text-zinc-300 transition-colors text-xl"
              >
                ✕
              </button>
            </div>

            <div className="space-y-4">
              <div className="bg-zinc-800/30 rounded-lg p-4">
                <h3 className="text-sm font-semibold text-zinc-200 mb-2">
                  פרטי משמרת
                </h3>
                <div className="grid grid-cols-4 gap-3 text-sm">
                  <div>
                    <div className="text-xs text-zinc-500">משמרת</div>
                    <div className="text-zinc-200">
                      {viewingReport.shiftType}
                    </div>
                  </div>
                  <div>
                    <div className="text-xs text-zinc-500">תאריך</div>
                    <div className="text-zinc-200">{viewingReport.date}</div>
                  </div>
                  <div>
                    <div className="text-xs text-zinc-500">יום</div>
                    <div className="text-zinc-200">
                      {viewingReport.dayOfWeek}
                    </div>
                  </div>
                  <div>
                    <div className="text-xs text-zinc-500">סטטוס</div>
                    <div>{statusBadge(viewingReport.status)}</div>
                  </div>
                </div>
              </div>
            </div>

            <div className="flex gap-3 mt-6">
              <button
                onClick={() => handleEditReport(viewingReport)}
                className="flex-1 bg-emerald-600 hover:bg-emerald-500 text-white text-sm px-4 py-2.5 rounded-lg transition-colors"
              >
                עריכה
              </button>
              <button
                onClick={() => setShowReportModal(false)}
                className="flex-1 bg-zinc-800/50 hover:bg-zinc-700/50 text-zinc-300 text-sm px-4 py-2.5 rounded-lg transition-colors"
              >
                סגור
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

/* ── Dashboard View ── */
function DashboardView({
  residents,
  reports,
  shifts,
  notes,
  statusBadge,
  priorityBadge,
  apartment,
  shiftIcon,
}) {
  const activeShift = shifts.find((s) => s.status === "active");
  const recentNotes = notes.slice(0, 3);
  const recentReports = reports.slice(0, 3);

  return (
    <div className="space-y-6">
      {/* Apartment Info */}
      <div className="bg-gradient-to-br from-emerald-500/10 to-teal-500/10 border border-emerald-500/20 rounded-xl p-6">
        <div className="flex items-start justify-between">
          <div>
            <h2 className="text-2xl font-bold text-zinc-100 mb-2">
              {apartment}
            </h2>
            <p className="text-emerald-400 text-sm mb-4">
              מנהל/ת: {mockStats.userName}
            </p>
            <div className="flex items-center gap-2 text-sm text-zinc-400">
              <span className="flex items-center gap-1">
                <span className="text-emerald-400">◈</span>
                {residents.length} דיירים בדירה
              </span>
            </div>
          </div>
          <div className="w-16 h-16 rounded-xl bg-gradient-to-br from-emerald-500 to-teal-600 flex items-center justify-center text-white text-2xl">
            ⌂
          </div>
        </div>
      </div>

      {/* Residents Cards */}
      <div className="bg-[#111318] border border-zinc-800/60 rounded-xl p-5">
        <h3 className="text-sm font-semibold text-zinc-200 mb-4">
          דיירי הדירה
        </h3>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-3">
          {residents.map((r) => (
            <div
              key={r.id}
              className="bg-zinc-800/30 rounded-lg p-3 hover:bg-zinc-800/50 transition-colors"
            >
              <div className="flex items-center gap-2 mb-2">
                <div className="w-8 h-8 rounded-full bg-gradient-to-br from-emerald-500/40 to-teal-500/40 border border-emerald-500/30 flex items-center justify-center text-xs font-semibold text-emerald-300">
                  {r.name[0]}
                </div>
                <div>
                  <div className="text-sm font-medium text-zinc-200">
                    {r.name}
                  </div>
                  <div className="text-xs text-zinc-500">
                    גיל {r.age} • {r.room}
                  </div>
                </div>
              </div>
              <div className="text-xs text-zinc-500 space-y-1">
                <div className="flex items-center gap-1">
                  <span>סטטוס:</span>
                  {statusBadge(r.status)}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Two columns */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Current Shift */}
        <div className="bg-[#111318] border border-zinc-800/60 rounded-xl p-5">
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-sm font-semibold text-zinc-200">
              משמרת נוכחית
            </h2>
            {activeShift && statusBadge(activeShift.status)}
          </div>
          {activeShift ? (
            <div className="space-y-3">
              <div className="flex items-center gap-3 p-3 bg-emerald-500/10 border border-emerald-500/20 rounded-lg">
                <div className="w-10 h-10 rounded-lg bg-emerald-500/20 border border-emerald-500/30 flex items-center justify-center text-emerald-400 text-lg shrink-0">
                  ◷
                </div>
                <div className="flex-1">
                  <div className="text-sm font-medium text-zinc-200">
                    משמרת {activeShift.shift}
                  </div>
                  <div className="text-xs text-zinc-500">
                    {activeShift.staff}
                  </div>
                </div>
              </div>
            </div>
          ) : (
            <div className="text-center py-6 text-sm text-zinc-500">
              אין משמרת פעילה כרגע
            </div>
          )}

          <div className="mt-4 pt-4 border-t border-zinc-800/40">
            <h3 className="text-xs font-semibold text-zinc-400 mb-2">
              משמרות הבאות
            </h3>
            <div className="space-y-2">
              {shifts
                .filter((s) => s.status === "upcoming")
                .map((s) => (
                  <div
                    key={s.id}
                    className="flex items-center justify-between text-xs"
                  >
                    <span className="text-zinc-400">{s.shift}</span>
                    <span className="text-zinc-500">{s.staff}</span>
                  </div>
                ))}
            </div>
          </div>
        </div>

        {/* Recent Reports */}
        <div className="bg-[#111318] border border-zinc-800/60 rounded-xl p-5">
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-sm font-semibold text-zinc-200">
              דוחות אחרונים
            </h2>
            <button className="text-xs text-emerald-400 hover:text-emerald-300">
              צפה בכל
            </button>
          </div>
          <div className="space-y-2">
            {recentReports.map((r) => (
              <div
                key={r.id}
                className="flex items-center justify-between p-3 bg-zinc-800/30 rounded-lg hover:bg-zinc-800/50 transition-colors"
              >
                <div className="flex items-center gap-3">
                  <span className="text-lg">{shiftIcon(r.shiftType)}</span>
                  <div>
                    <div className="text-sm text-zinc-200">
                      משמרת {r.shiftType}
                    </div>
                    <div className="text-xs text-zinc-500">
                      {r.date} • {r.dayOfWeek}
                    </div>
                  </div>
                </div>
                {statusBadge(r.status)}
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Recent Notes */}
      <div className="bg-[#111318] border border-zinc-800/60 rounded-xl p-5">
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-sm font-semibold text-zinc-200">הערות אחרונות</h2>
          <button className="text-xs text-emerald-400 hover:text-emerald-300">
            צפה בכל
          </button>
        </div>
        <div className="space-y-3">
          {recentNotes.map((n) => (
            <div
              key={n.id}
              className="flex items-start gap-3 p-3 bg-zinc-800/30 rounded-lg"
            >
              <div className="flex-1">
                <div className="flex items-center gap-2 mb-1">
                  {priorityBadge(n.priority)}
                  <span className="text-xs text-zinc-500">
                    {n.date} • {n.time}
                  </span>
                </div>
                <div className="text-sm text-zinc-300">{n.note}</div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

/* ── All Reports View ── */
function AllReportsView({
  reports,
  statusBadge,
  shiftIcon,
  onView,
  onEdit,
  onDelete,
}) {
  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <p className="text-sm text-zinc-500">סה״כ {reports.length} דוחות</p>
      </div>
      <div className="bg-[#111318] border border-zinc-800/60 rounded-xl overflow-hidden">
        <table className="w-full text-sm">
          <thead>
            <tr className="border-b border-zinc-800/60">
              <th className="text-right text-xs text-zinc-500 font-medium px-5 py-3">
                משמרת
              </th>
              <th className="text-right text-xs text-zinc-500 font-medium px-5 py-3">
                תאריך
              </th>
              <th className="text-right text-xs text-zinc-500 font-medium px-5 py-3">
                יום
              </th>
              <th className="text-right text-xs text-zinc-500 font-medium px-5 py-3">
                מדריך
              </th>
              <th className="text-right text-xs text-zinc-500 font-medium px-5 py-3">
                סטטוס
              </th>
              <th className="px-5 py-3"></th>
            </tr>
          </thead>
          <tbody>
            {reports.map((r) => (
              <tr
                key={r.id}
                className="border-b border-zinc-800/40 last:border-0 hover:bg-zinc-800/20 transition-colors"
              >
                <td className="px-5 py-3">
                  <span className="flex items-center gap-1.5 text-zinc-300">
                    <span>{shiftIcon(r.shiftType)}</span>
                    {r.shiftType}
                  </span>
                </td>
                <td className="px-5 py-3 text-zinc-400 text-xs">{r.date}</td>
                <td className="px-5 py-3 text-zinc-400 text-xs">
                  {r.dayOfWeek}
                </td>
                <td className="px-5 py-3 text-zinc-300">{r.supervisors}</td>
                <td className="px-5 py-3">{statusBadge(r.status)}</td>
                <td className="px-5 py-3 text-left">
                  <div className="flex items-center gap-2 justify-end">
                    <button
                      onClick={() => onView(r)}
                      className="text-xs text-emerald-400 hover:text-emerald-300 transition-colors"
                    >
                      צפה
                    </button>
                    <button
                      onClick={() => onEdit(r)}
                      className="text-xs text-zinc-500 hover:text-zinc-300 transition-colors"
                    >
                      עריכה
                    </button>
                    <button
                      onClick={() => onDelete(r.id)}
                      className="text-xs text-red-400 hover:text-red-300 transition-colors"
                    >
                      מחק
                    </button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}

/* ── Shifts View ── */
function ShiftsView({ shifts, statusBadge }) {
  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <p className="text-sm text-zinc-500">משמרות להיום</p>
      </div>
      <div className="bg-[#111318] border border-zinc-800/60 rounded-xl overflow-hidden">
        <table className="w-full text-sm">
          <thead>
            <tr className="border-b border-zinc-800/60">
              <th className="text-right text-xs text-zinc-500 font-medium px-5 py-3">
                תאריך
              </th>
              <th className="text-right text-xs text-zinc-500 font-medium px-5 py-3">
                משמרת
              </th>
              <th className="text-right text-xs text-zinc-500 font-medium px-5 py-3">
                צוות
              </th>
              <th className="text-right text-xs text-zinc-500 font-medium px-5 py-3">
                סטטוס
              </th>
            </tr>
          </thead>
          <tbody>
            {shifts.map((s) => (
              <tr
                key={s.id}
                className="border-b border-zinc-800/40 last:border-0 hover:bg-zinc-800/20 transition-colors"
              >
                <td className="px-5 py-3 text-zinc-400">{s.date}</td>
                <td className="px-5 py-3 text-zinc-200">{s.shift}</td>
                <td className="px-5 py-3 text-zinc-300">{s.staff}</td>
                <td className="px-5 py-3">{statusBadge(s.status)}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}

/* ── Notes View ── */
function NotesView({ notes, priorityBadge, onAddNote }) {
  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <p className="text-sm text-zinc-500">סה״כ {notes.length} הערות</p>
        <button
          onClick={onAddNote}
          className="flex items-center gap-2 bg-emerald-600 hover:bg-emerald-500 text-white text-sm px-4 py-2 rounded-lg transition-colors"
        >
          <span>+</span> הערה חדשה
        </button>
      </div>
      <div className="space-y-3 max-w-3xl">
        {notes.map((n) => (
          <div
            key={n.id}
            className="bg-[#111318] border border-zinc-800/60 rounded-xl p-5"
          >
            <div className="flex items-start justify-between mb-3">
              <div className="flex items-center gap-2">
                {priorityBadge(n.priority)}
              </div>
              <div className="text-xs text-zinc-500">
                {n.date} • {n.time}
              </div>
            </div>
            <div className="text-sm text-zinc-300 leading-relaxed">
              {n.note}
            </div>
            <div className="mt-3 pt-3 border-t border-zinc-800/40 flex gap-2">
              <button className="text-xs text-zinc-500 hover:text-zinc-300 transition-colors">
                עריכה
              </button>
              <button className="text-xs text-red-400 hover:text-red-300 transition-colors">
                מחק
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
