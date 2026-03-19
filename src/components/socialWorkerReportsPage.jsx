import { useState } from "react";

const mockStats = {
  userName: "מיכל כהן",
  userRole: "עובד סוציאלי",
  apartment: "דירה א׳ - חיפה",
};

// דוחות לדוגמה
const mockReports = [
  {
    id: 1,
    apartment: "דירה א׳",
    shiftType: "בוקר",
    supervisors: "יוסי כהן, שרה לוי",
    startDate: "19/03/2026",
    dayOfWeek: "חמישי",
    status: "נבדק",
    residents: [
      {
        id: 1,
        name: "דוד לוי",
        present: "נוכח",
        absenceReason: "",
        medication: "נטל בבוקר",
        shower: "עשה",
        meal: "ארוחת בוקר",
        appetite: "טוב",
        personalPlan: "השתתפות בפעילות קבוצתית",
        duties: "ניקיון חדר",
        activity: "השתתף בסדנת אומנות",
        mood: "חיובי ושמח",
        unusualCurrent: "",
        medicationNoRx: "",
        sleep: "רציפה",
        wakeup: "תקין",
      },
      {
        id: 2,
        name: "שרה כהן",
        present: "נוכח",
        absenceReason: "",
        medication: "נטלה בזמן",
        shower: "עשה",
        meal: "ארוחת בוקר",
        appetite: "בינוני",
        personalPlan: 'פגישה עם עו"ס',
        duties: "עזרה במטבח",
        activity: "שיחה אישית עם מדריך",
        mood: "רגועה",
        unusualCurrent: "",
        medicationNoRx: "",
        sleep: "רציפה",
        wakeup: "תקין",
      },
    ],
    conversationTopic: "שיחה על התוכניות לסוף השבוע",
    generalInfo: "ביקור של הורי דוד בשעות הצהריים",
    shiftDescription: "משמרת רגועה, כל הדיירים שיתפו פעולה",
    unusualEvent: "",
    maintenanceTasks: "תיקון ברז במטבח",
    importantNotes: "לשים לב לתרופות של דוד - צריך חידוש מרשם",
    supervisor1Name: "יוסי כהן",
    supervisor2Name: "שרה לוי",
    receiver1Name: "מיכל אברהם",
    receiver2Name: "דני רוזן",
  },
  {
    id: 2,
    apartment: "דירה א׳",
    shiftType: "צהריים",
    supervisors: "מיכל אברהם, דני רוזן",
    startDate: "19/03/2026",
    dayOfWeek: "חמישי",
    status: "נשלח",
    residents: [
      {
        id: 1,
        name: "דוד לוי",
        present: "נוכח",
        medication: "נטל כמתוכנן",
        shower: "לא עשה",
        meal: "ארוחת צהריים",
        appetite: "מצוין",
        personalPlan: "ביקור הורים",
        duties: "סידור סלון",
        activity: "שיחה עם ההורים",
        mood: "מאושר מאוד",
        unusualCurrent: "",
        medicationNoRx: "",
        sleep: "רציפה",
        wakeup: "תקין",
      },
      {
        id: 2,
        name: "שרה כהן",
        present: "חסר",
        absenceReason: "ביקור רופא שיניים",
        medication: "",
        shower: "",
        meal: "",
        appetite: "",
        personalPlan: "",
        duties: "",
        activity: "",
        mood: "",
        unusualCurrent: "",
        medicationNoRx: "",
        sleep: "",
        wakeup: "",
      },
    ],
    conversationTopic: "",
    generalInfo: "ביקור הורים של דוד התקיים בהצלחה",
    shiftDescription: "משמרת שקטה, ביקור משפחה עבר בהצלחה",
    unusualEvent: "",
    maintenanceTasks: "",
    importantNotes: "שרה תחזור מביקור הרופא במשמרת ערב",
    supervisor1Name: "מיכל אברהם",
    supervisor2Name: "דני רוזן",
    receiver1Name: "רונן ברק",
    receiver2Name: "נועה שמש",
  },
  {
    id: 3,
    apartment: "דירה א׳",
    shiftType: "לילה",
    supervisors: "רונן ברק",
    startDate: "18/03/2026",
    dayOfWeek: "רביעי",
    status: "נבדק",
    residents: [
      {
        id: 1,
        name: "דוד לוי",
        present: "נוכח",
        medication: "נטל לפני שינה",
        shower: "עשה",
        meal: "ארוחת ערב",
        appetite: "טוב",
        personalPlan: "",
        duties: "",
        activity: "צפייה בטלוויזיה",
        mood: "רגוע",
        unusualCurrent: "התעורר פעם אחת באמצע הלילה",
        medicationNoRx: "",
        sleep: "לא רציפה",
        wakeup: "תקין",
      },
    ],
    conversationTopic: "שיחה על חלומות ושאיפות",
    generalInfo: "",
    shiftDescription: "לילה שקט יחסית",
    unusualEvent: "דוד התעורר באמצע הלילה - נרגע לאחר שיחה קצרה",
    maintenanceTasks: "",
    importantNotes: "לעקוב אחרי איכות השינה של דוד",
    supervisor1Name: "רונן ברק",
    supervisor2Name: "",
    receiver1Name: "יוסי כהן",
    receiver2Name: "שרה לוי",
  },
];

const mockResidents = [
  { id: 1, name: "דוד לוי", age: 28, alerts: 1 },
  { id: 2, name: "שרה כהן", age: 32, alerts: 0 },
  { id: 3, name: "יוסי אברהם", age: 25, alerts: 0 },
];

const mockAlerts = [
  {
    id: 1,
    residentName: "רחל מזרחי",
    type: "behavior",
    message: "דווח על שינוי משמעותי במצב רוח - 3 ימים רצופים",
    date: "18/03/2026",
    urgent: true,
  },
  {
    id: 2,
    residentName: "דוד לוי",
    type: "medication",
    message: "דילוג על נטילת תרופות - 2 פעמים השבוע",
    date: "17/03/2026",
    urgent: true,
  },
];

const NAV = [
  { id: "dashboard", label: "דשבורד", icon: "⬡", path: "/socialWorkerAdmin" },
  { id: "residents", label: "דיירים", icon: "◈", path: null },
  { id: "apartments", label: "דירות", icon: "⌂", path: null },
  { id: "alerts", label: "התראות", icon: "◎", path: null },
  { id: "reports", label: "דוחות", icon: "▦", path: null },
];

const statusBadge = (status) => {
  const map = {
    נבדק: "bg-emerald-500/15 text-emerald-400 border border-emerald-500/30",
    נשלח: "bg-sky-500/15 text-sky-400 border border-sky-500/30",
    טיוטה: "bg-amber-500/15 text-amber-400 border border-amber-500/30",
  };
  return (
    <span
      className={`text-xs font-medium px-2 py-0.5 rounded-full ${map[status] || ""}`}
    >
      {status}
    </span>
  );
};

const shiftIcon = (shift) =>
  ({ בוקר: "☀", צהריים: "◑", לילה: "☽", "בוקר+צהריים": "☀◑" })[shift] || "·";

const alertIcon = (type) => {
  const icons = {
    behavior: "⚠",
    medication: "💊",
    family: "👨‍👩‍👧",
    general: "ℹ",
  };
  return icons[type] || "ℹ";
};

export default function SocialWorkerReportsPage() {
  const [active, setActive] = useState("reports"); // שינוי מ-"dashboard" ל-"reports"
  const [sidebarOpen, setSidebarOpen] = useState(true);
  const [selectedReport, setSelectedReport] = useState(null);
  const [showDetailModal, setShowDetailModal] = useState(false);
  const [filterResident, setFilterResident] = useState("הכל");
  const [filterShift, setFilterShift] = useState("הכל");
  const [filterStatus, setFilterStatus] = useState("הכל");

  const handleNavClick = (item) => {
    setActive(item.id);
    if (item.path) {
      window.location.href = item.path;
    }
  };

  const handleViewReport = (report) => {
    setSelectedReport(report);
    setShowDetailModal(true);
  };

  // סינון דוחות
  const filteredReports = mockReports.filter((report) => {
    const residentMatch =
      filterResident === "הכל" ||
      report.residents.some((r) => r.name === filterResident);
    const shiftMatch =
      filterShift === "הכל" || report.shiftType === filterShift;
    const statusMatch =
      filterStatus === "הכל" || report.status === filterStatus;
    return residentMatch && shiftMatch && statusMatch;
  });

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
          <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-sky-500 to-cyan-600 flex items-center justify-center text-white font-bold text-sm shrink-0">
            ע
          </div>
          {sidebarOpen && (
            <span className="font-semibold text-sm text-zinc-100 tracking-wide">
              עובד סוציאלי
            </span>
          )}
        </div>

        {/* Nav */}
        <nav className="flex-1 px-2 py-4 flex flex-col gap-1">
          {NAV.map((item) => (
            <button
              key={item.id}
              onClick={() => handleNavClick(item)}
              className={`flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm transition-all duration-150 w-full text-right
                ${
                  active === item.id
                    ? "bg-sky-600/20 text-sky-300 border border-sky-500/25"
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
            <div className="w-8 h-8 rounded-full bg-gradient-to-br from-sky-500 to-cyan-500 flex items-center justify-center text-xs font-bold shrink-0">
              מ
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
              <span>◎</span>
              {mockAlerts.filter((a) => a.urgent).length > 0 && (
                <span className="absolute top-1 right-1 w-2 h-2 bg-red-500 rounded-full"></span>
              )}
            </button>
            <div className="text-xs text-zinc-500">יום ה׳, 19.03.2026</div>
          </div>
        </header>

        <main className="flex-1 overflow-y-auto p-6">
          {active === "dashboard" && (
            <DashboardView reports={mockReports} residents={mockResidents} />
          )}

          {active === "residents" && (
            <ResidentsView residents={mockResidents} />
          )}

          {active === "apartments" && <ApartmentsView />}

          {active === "alerts" && (
            <AlertsView alerts={mockAlerts} alertIcon={alertIcon} />
          )}

          {active === "reports" && (
            <ReportsView
              reports={filteredReports}
              onViewReport={handleViewReport}
              filterResident={filterResident}
              setFilterResident={setFilterResident}
              filterShift={filterShift}
              setFilterShift={setFilterShift}
              filterStatus={filterStatus}
              setFilterStatus={setFilterStatus}
              residents={mockResidents}
              statusBadge={statusBadge}
              shiftIcon={shiftIcon}
            />
          )}
        </main>
      </div>

      {/* Modal - פרטי דוח מלא */}
      {showDetailModal && selectedReport && (
        <div className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center z-50 p-4">
          <div className="bg-[#111318] border border-zinc-800/60 rounded-xl p-6 max-w-5xl w-full max-h-[90vh] overflow-y-auto">
            <div className="flex items-center justify-between mb-6">
              <div>
                <h2 className="text-xl font-semibold text-zinc-100">
                  דוח משמרת מפורט
                </h2>
                <p className="text-sm text-zinc-500 mt-1">
                  {selectedReport.apartment} • {selectedReport.shiftType} •{" "}
                  {selectedReport.startDate}
                </p>
              </div>
              <button
                onClick={() => setShowDetailModal(false)}
                className="text-zinc-500 hover:text-zinc-300 transition-colors text-xl"
              >
                ✕
              </button>
            </div>

            <div className="space-y-6">
              {/* פרטי משמרת */}
              <div className="bg-zinc-800/30 rounded-lg p-4">
                <h3 className="text-sm font-semibold text-zinc-200 mb-3">
                  פרטי המשמרת
                </h3>
                <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-sm">
                  <div>
                    <div className="text-xs text-zinc-500 mb-1">סוג משמרת</div>
                    <div className="text-zinc-200 flex items-center gap-2">
                      <span>{shiftIcon(selectedReport.shiftType)}</span>
                      {selectedReport.shiftType}
                    </div>
                  </div>
                  <div>
                    <div className="text-xs text-zinc-500 mb-1">תאריך</div>
                    <div className="text-zinc-200">
                      {selectedReport.startDate}
                    </div>
                  </div>
                  <div>
                    <div className="text-xs text-zinc-500 mb-1">יום בשבוע</div>
                    <div className="text-zinc-200">
                      {selectedReport.dayOfWeek}
                    </div>
                  </div>
                  <div>
                    <div className="text-xs text-zinc-500 mb-1">סטטוס</div>
                    {statusBadge(selectedReport.status)}
                  </div>
                  <div className="col-span-2">
                    <div className="text-xs text-zinc-500 mb-1">
                      מדריכים במשמרת
                    </div>
                    <div className="text-zinc-200">
                      {selectedReport.supervisors}
                    </div>
                  </div>
                </div>
              </div>

              {/* דיירים */}
              <div className="bg-zinc-800/30 rounded-lg p-4">
                <h3 className="text-sm font-semibold text-zinc-200 mb-3">
                  דיירים במשמרת ({selectedReport.residents.length})
                </h3>
                <div className="space-y-4">
                  {selectedReport.residents.map((resident) => (
                    <div
                      key={resident.id}
                      className="bg-zinc-900/50 rounded-lg p-4 border border-zinc-700/40"
                    >
                      <div className="flex items-center justify-between mb-3">
                        <h4 className="text-sm font-medium text-zinc-200">
                          {resident.name}
                        </h4>
                        <span
                          className={`text-xs px-2 py-1 rounded-full ${
                            resident.present === "נוכח"
                              ? "bg-emerald-500/15 text-emerald-400"
                              : "bg-red-500/15 text-red-400"
                          }`}
                        >
                          {resident.present}
                        </span>
                      </div>

                      {resident.present === "חסר" ? (
                        <div className="text-sm text-zinc-400">
                          <span className="text-zinc-500">סיבת היעדרות: </span>
                          {resident.absenceReason}
                        </div>
                      ) : (
                        <div className="grid grid-cols-2 md:grid-cols-3 gap-3 text-xs">
                          <div>
                            <span className="text-zinc-500">
                              נטילת כדורים:{" "}
                            </span>
                            <span className="text-zinc-300">
                              {resident.medication || "לא צוין"}
                            </span>
                          </div>
                          <div>
                            <span className="text-zinc-500">מקלחת: </span>
                            <span className="text-zinc-300">
                              {resident.shower}
                            </span>
                          </div>
                          <div>
                            <span className="text-zinc-500">ארוחה: </span>
                            <span className="text-zinc-300">
                              {resident.meal || "לא צוין"}
                            </span>
                          </div>
                          <div>
                            <span className="text-zinc-500">תיאבון: </span>
                            <span className="text-zinc-300">
                              {resident.appetite || "לא צוין"}
                            </span>
                          </div>
                          <div>
                            <span className="text-zinc-500">מצב רוח: </span>
                            <span className="text-zinc-300">
                              {resident.mood || "לא צוין"}
                            </span>
                          </div>
                          <div>
                            <span className="text-zinc-500">שינה: </span>
                            <span className="text-zinc-300">
                              {resident.sleep}
                            </span>
                          </div>

                          {resident.personalPlan && (
                            <div className="col-span-3">
                              <span className="text-zinc-500">
                                תוכנית אישית:{" "}
                              </span>
                              <span className="text-zinc-300">
                                {resident.personalPlan}
                              </span>
                            </div>
                          )}

                          {resident.activity && (
                            <div className="col-span-3">
                              <span className="text-zinc-500">פעילות: </span>
                              <span className="text-zinc-300">
                                {resident.activity}
                              </span>
                            </div>
                          )}

                          {resident.duties && (
                            <div className="col-span-3">
                              <span className="text-zinc-500">תורנויות: </span>
                              <span className="text-zinc-300">
                                {resident.duties}
                              </span>
                            </div>
                          )}

                          {resident.unusualCurrent && (
                            <div className="col-span-3">
                              <span className="text-red-400">אירוע חריג: </span>
                              <span className="text-zinc-300">
                                {resident.unusualCurrent}
                              </span>
                            </div>
                          )}
                        </div>
                      )}
                    </div>
                  ))}
                </div>
              </div>

              {/* מידע כללי על המשמרת */}
              {(selectedReport.conversationTopic ||
                selectedReport.generalInfo ||
                selectedReport.shiftDescription) && (
                <div className="bg-zinc-800/30 rounded-lg p-4 space-y-3">
                  <h3 className="text-sm font-semibold text-zinc-200">
                    מידע כללי
                  </h3>

                  {selectedReport.conversationTopic && (
                    <div>
                      <div className="text-xs text-zinc-500 mb-1">
                        נושא שיחה ארוכה
                      </div>
                      <div className="text-sm text-zinc-300">
                        {selectedReport.conversationTopic}
                      </div>
                    </div>
                  )}

                  {selectedReport.generalInfo && (
                    <div>
                      <div className="text-xs text-zinc-500 mb-1">
                        אירועים/פעילות קבוצתית/ביקורים
                      </div>
                      <div className="text-sm text-zinc-300">
                        {selectedReport.generalInfo}
                      </div>
                    </div>
                  )}

                  {selectedReport.shiftDescription && (
                    <div>
                      <div className="text-xs text-zinc-500 mb-1">
                        תיאור כללי של המשמרת
                      </div>
                      <div className="text-sm text-zinc-300">
                        {selectedReport.shiftDescription}
                      </div>
                    </div>
                  )}
                </div>
              )}

              {/* אירועים חריגים והערות */}
              {(selectedReport.unusualEvent ||
                selectedReport.maintenanceTasks ||
                selectedReport.importantNotes) && (
                <div className="bg-amber-500/10 border border-amber-500/20 rounded-lg p-4 space-y-3">
                  <h3 className="text-sm font-semibold text-amber-300">
                    אירועים והערות חשובות
                  </h3>

                  {selectedReport.unusualEvent && (
                    <div>
                      <div className="text-xs text-amber-400 mb-1">
                        אירוע חריג
                      </div>
                      <div className="text-sm text-zinc-300">
                        {selectedReport.unusualEvent}
                      </div>
                    </div>
                  )}

                  {selectedReport.maintenanceTasks && (
                    <div>
                      <div className="text-xs text-amber-400 mb-1">
                        משימות אחזקה
                      </div>
                      <div className="text-sm text-zinc-300">
                        {selectedReport.maintenanceTasks}
                      </div>
                    </div>
                  )}

                  {selectedReport.importantNotes && (
                    <div>
                      <div className="text-xs text-amber-400 mb-1">
                        הערות למדריכים הבאים
                      </div>
                      <div className="text-sm text-zinc-300">
                        {selectedReport.importantNotes}
                      </div>
                    </div>
                  )}
                </div>
              )}

              {/* מסירת משמרת */}
              <div className="bg-zinc-800/30 rounded-lg p-4">
                <h3 className="text-sm font-semibold text-zinc-200 mb-3">
                  מסירת משמרת
                </h3>
                <div className="grid grid-cols-2 gap-4 text-sm">
                  <div>
                    <div className="text-xs text-zinc-500 mb-1">
                      מדריכים מוסרים משמרת
                    </div>
                    <div className="text-zinc-300">
                      {selectedReport.supervisor1Name}
                      {selectedReport.supervisor2Name &&
                        `, ${selectedReport.supervisor2Name}`}
                    </div>
                  </div>
                  <div>
                    <div className="text-xs text-zinc-500 mb-1">
                      מדריכים מקבלים משמרת
                    </div>
                    <div className="text-zinc-300">
                      {selectedReport.receiver1Name}
                      {selectedReport.receiver2Name &&
                        `, ${selectedReport.receiver2Name}`}
                    </div>
                  </div>
                </div>
              </div>
            </div>

            <div className="flex gap-3 mt-6 pt-4 border-t border-zinc-800/60">
              <button
                onClick={() => setShowDetailModal(false)}
                className="flex-1 bg-zinc-800/50 hover:bg-zinc-700/50 text-zinc-300 text-sm px-4 py-2.5 rounded-lg transition-colors"
              >
                סגור
              </button>
              <button className="flex-1 bg-sky-600 hover:bg-sky-500 text-white text-sm px-4 py-2.5 rounded-lg transition-colors">
                ייצא לPDF
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

/* ── Reports View ── */
function ReportsView({
  reports,
  onViewReport,
  filterResident,
  setFilterResident,
  filterShift,
  setFilterShift,
  filterStatus,
  setFilterStatus,
  residents,
  statusBadge,
  shiftIcon,
}) {
  return (
    <div className="space-y-4">
      {/* סינונים */}
      <div className="bg-[#111318] border border-zinc-800/60 rounded-xl p-4">
        <h3 className="text-sm font-semibold text-zinc-200 mb-3">
          סינון דוחות
        </h3>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div>
            <label className="block text-xs text-zinc-400 mb-1.5">דייר</label>
            <select
              value={filterResident}
              onChange={(e) => setFilterResident(e.target.value)}
              className="w-full bg-zinc-800/50 border border-zinc-700/60 rounded-lg px-3 py-2 text-zinc-100 text-sm focus:outline-none focus:border-sky-500/50"
            >
              <option value="הכל">כל הדיירים</option>
              {residents.map((r) => (
                <option key={r.id} value={r.name}>
                  {r.name}
                </option>
              ))}
            </select>
          </div>
          <div>
            <label className="block text-xs text-zinc-400 mb-1.5">משמרת</label>
            <select
              value={filterShift}
              onChange={(e) => setFilterShift(e.target.value)}
              className="w-full bg-zinc-800/50 border border-zinc-700/60 rounded-lg px-3 py-2 text-zinc-100 text-sm focus:outline-none focus:border-sky-500/50"
            >
              <option value="הכל">כל המשמרות</option>
              <option value="בוקר">בוקר</option>
              <option value="צהריים">צהריים</option>
              <option value="לילה">לילה</option>
              <option value="בוקר+צהריים">בוקר+צהריים</option>
            </select>
          </div>
          <div>
            <label className="block text-xs text-zinc-400 mb-1.5">סטטוס</label>
            <select
              value={filterStatus}
              onChange={(e) => setFilterStatus(e.target.value)}
              className="w-full bg-zinc-800/50 border border-zinc-700/60 rounded-lg px-3 py-2 text-zinc-100 text-sm focus:outline-none focus:border-sky-500/50"
            >
              <option value="הכל">כל הסטטוסים</option>
              <option value="נבדק">נבדק</option>
              <option value="נשלח">נשלח</option>
              <option value="טיוטה">טיוטה</option>
            </select>
          </div>
        </div>
      </div>

      {/* רשימת דוחות */}
      <div className="flex items-center justify-between">
        <p className="text-sm text-zinc-500">נמצאו {reports.length} דוחות</p>
      </div>

      <div className="bg-[#111318] border border-zinc-800/60 rounded-xl overflow-hidden">
        <table className="w-full text-sm">
          <thead>
            <tr className="border-b border-zinc-800/60">
              <th className="text-right text-xs text-zinc-500 font-medium px-5 py-3">
                דירה
              </th>
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
                דיירים
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
                <td className="px-5 py-3 text-zinc-200">{r.apartment}</td>
                <td className="px-5 py-3">
                  <span className="flex items-center gap-1.5 text-zinc-300">
                    <span>{shiftIcon(r.shiftType)}</span>
                    {r.shiftType}
                  </span>
                </td>
                <td className="px-5 py-3 text-zinc-400 text-xs">
                  {r.startDate}
                </td>
                <td className="px-5 py-3 text-zinc-400 text-xs">
                  {r.dayOfWeek}
                </td>
                <td className="px-5 py-3 text-zinc-400 text-xs">
                  {r.residents.filter((res) => res.present === "נוכח").length}/
                  {r.residents.length}
                </td>
                <td className="px-5 py-3">{statusBadge(r.status)}</td>
                <td className="px-5 py-3 text-left">
                  <button
                    onClick={() => onViewReport(r)}
                    className="text-xs text-sky-400 hover:text-sky-300 transition-colors"
                  >
                    צפה בדוח
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}

/* ── Dashboard View ── */
function DashboardView({ reports, residents }) {
  const stats = [
    {
      label: "דוחות השבוע",
      value: reports.length,
      icon: "▦",
      color: "from-sky-500 to-cyan-500",
    },
    {
      label: "דיירים פעילים",
      value: residents.length,
      icon: "◈",
      color: "from-violet-500 to-indigo-500",
    },
    {
      label: "אירועים חריגים",
      value: reports.filter((r) => r.unusualEvent).length,
      icon: "◎",
      color: "from-amber-500 to-orange-500",
    },
  ];

  return (
    <div className="space-y-6">
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        {stats.map((s) => (
          <div
            key={s.label}
            className="bg-[#111318] border border-zinc-800/60 rounded-xl p-4 flex items-center gap-4"
          >
            <div
              className={`w-10 h-10 rounded-lg bg-gradient-to-br ${s.color} flex items-center justify-center text-white text-base shrink-0`}
            >
              {s.icon}
            </div>
            <div>
              <div className="text-2xl font-bold text-zinc-100">{s.value}</div>
              <div className="text-xs text-zinc-500">{s.label}</div>
            </div>
          </div>
        ))}
      </div>

      <div className="bg-[#111318] border border-zinc-800/60 rounded-xl p-5">
        <h2 className="text-sm font-semibold text-zinc-200 mb-4">
          דוחות אחרונים
        </h2>
        <div className="space-y-2">
          {reports.slice(0, 5).map((r) => (
            <div
              key={r.id}
              className="flex items-center justify-between p-3 bg-zinc-800/30 rounded-lg"
            >
              <div className="flex items-center gap-3">
                <span className="text-lg">{shiftIcon(r.shiftType)}</span>
                <div>
                  <div className="text-sm text-zinc-200">{r.apartment}</div>
                  <div className="text-xs text-zinc-500">
                    {r.startDate} • {r.shiftType}
                  </div>
                </div>
              </div>
              {statusBadge(r.status)}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

/* ── Residents View ── */
function ResidentsView({ residents }) {
  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <p className="text-sm text-zinc-500">סה״כ {residents.length} דיירים</p>
      </div>
      <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-3">
        {residents.map((r) => (
          <div
            key={r.id}
            className="bg-[#111318] border border-zinc-800/60 rounded-xl p-5 hover:border-zinc-700/60 transition-colors"
          >
            <div className="flex items-center gap-3 mb-3">
              <div className="w-10 h-10 rounded-full bg-gradient-to-br from-sky-500/40 to-cyan-500/40 border border-sky-500/20 flex items-center justify-center text-sm font-semibold text-sky-300">
                {r.name[0]}
              </div>
              <div>
                <div className="font-semibold text-zinc-200">{r.name}</div>
                <div className="text-xs text-zinc-500">גיל {r.age}</div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

/* ── Apartments View ── */
function ApartmentsView() {
  return (
    <div className="space-y-4">
      <div className="text-center py-12 text-zinc-500">
        <div className="text-4xl mb-3">⌂</div>
        <p>תצוגת דירות - בפיתוח</p>
      </div>
    </div>
  );
}

/* ── Alerts View ── */
function AlertsView({ alerts, alertIcon }) {
  return (
    <div className="space-y-3 max-w-3xl">
      {alerts.map((a) => (
        <div
          key={a.id}
          className={`flex items-start gap-4 p-4 rounded-xl border ${
            a.urgent
              ? "bg-red-500/10 border-red-500/20"
              : "bg-amber-500/10 border-amber-500/20"
          }`}
        >
          <span
            className={`text-base mt-0.5 shrink-0 ${
              a.urgent ? "text-red-400" : "text-amber-400"
            }`}
          >
            {alertIcon(a.type)}
          </span>
          <div className="flex-1">
            <div
              className={`text-sm font-medium ${
                a.urgent ? "text-red-300" : "text-amber-300"
              }`}
            >
              {a.residentName}
            </div>
            <div className="text-xs text-zinc-400 mt-0.5">{a.message}</div>
          </div>
          <div className="flex items-center gap-3">
            <div className="text-xs text-zinc-600 shrink-0">{a.date}</div>
            <button className="text-xs text-sky-400 hover:text-sky-300 px-3 py-1 bg-sky-500/10 rounded-lg">
              טפל
            </button>
          </div>
        </div>
      ))}
    </div>
  );
}
