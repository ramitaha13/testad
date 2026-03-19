import { useState } from "react";

const mockStats = {
  userName: "מיכל כהן",
  userRole: "עובד סוציאלי",
  apartment: "דירה א׳ - חיפה",
};

const mockResidents = [
  {
    id: 1,
    name: "דוד לוי",
    age: 28,
    admissionDate: "15/01/2024",
    status: "active",
    lastMeeting: "15/03/2026",
    nextMeeting: "22/03/2026",
    treatmentPlan: "טיפול התנהגותי קוגניטיבי",
    alerts: 2,
  },
  {
    id: 2,
    name: "שרה כהן",
    age: 32,
    admissionDate: "20/02/2024",
    status: "active",
    lastMeeting: "18/03/2026",
    nextMeeting: "25/03/2026",
    treatmentPlan: "ליווי תעסוקתי ושיקום",
    alerts: 0,
  },
  {
    id: 3,
    name: "יוסי אברהם",
    age: 25,
    admissionDate: "10/12/2023",
    status: "active",
    lastMeeting: "19/03/2026",
    nextMeeting: "26/03/2026",
    treatmentPlan: "טיפול תרופתי ומעקב פסיכיאטרי",
    alerts: 1,
  },
  {
    id: 4,
    name: "רחל מזרחי",
    age: 30,
    admissionDate: "05/03/2024",
    status: "active",
    lastMeeting: "17/03/2026",
    nextMeeting: "24/03/2026",
    treatmentPlan: "שיקום חברתי ופיתוח כישורי חיים",
    alerts: 3,
  },
];

const mockMeetings = [
  {
    id: 1,
    residentName: "דוד לוי",
    date: "22/03/2026",
    time: "10:00",
    type: "פגישת מעקב",
    status: "scheduled",
  },
  {
    id: 2,
    residentName: "שרה כהן",
    date: "25/03/2026",
    time: "14:00",
    type: "פגישת הערכה",
    status: "scheduled",
  },
  {
    id: 3,
    residentName: "יוסי אברהם",
    date: "26/03/2026",
    time: "11:00",
    type: "פגישת משפחה",
    status: "scheduled",
  },
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
  {
    id: 3,
    residentName: "יוסי אברהם",
    type: "family",
    message: "בקשה לפגישה דחופה ממשפחה",
    date: "19/03/2026",
    urgent: false,
  },
];

const mockNotes = [
  {
    id: 1,
    residentName: "דוד לוי",
    date: "15/03/2026",
    content: "התקדמות משמעותית בטיפול. מראה שיתוף פעולה טוב יותר עם הצוות.",
    category: "progress",
  },
  {
    id: 2,
    residentName: "רחל מזרחי",
    date: "17/03/2026",
    content: "שיחה עם המשפחה - דנו באפשרויות להרחבת זמני ביקור בסופי שבוע.",
    category: "family",
  },
  {
    id: 3,
    residentName: "שרה כהן",
    date: "18/03/2026",
    content: "השתלבות מוצלחת בתוכנית התעסוקתית. המשך מעקב נדרש.",
    category: "employment",
  },
];

const NAV = [
  { id: "dashboard", label: "דשבורד", icon: "⬡", path: null },
  { id: "residents", label: "דיירים", icon: "◈", path: null },
  { id: "apartments", label: "דירות", icon: "⌂", path: null },
  { id: "alerts", label: "התראות", icon: "◎", path: null },
  {
    id: "reports",
    label: "דוחות",
    icon: "▦",
    path: "/socialWorkerReportsPage",
  },
];

export default function SocialWorkerDashboard() {
  const [active, setActive] = useState("dashboard");
  const [sidebarOpen, setSidebarOpen] = useState(true);
  const [selectedResident, setSelectedResident] = useState(null);
  const [showNoteModal, setShowNoteModal] = useState(false);
  const [noteFormData, setNoteFormData] = useState({
    residentName: "",
    content: "",
    category: "general",
  });

  const handleNavClick = (item) => {
    setActive(item.id);
    if (item.path) {
      window.location.href = item.path;
    }
  };

  const handleAddNote = () => {
    setShowNoteModal(true);
    setNoteFormData({
      residentName: selectedResident?.name || "",
      content: "",
      category: "general",
    });
  };

  const statusBadge = (status) => {
    const map = {
      active: "bg-emerald-500/15 text-emerald-400 border border-emerald-500/30",
      scheduled: "bg-sky-500/15 text-sky-400 border border-sky-500/30",
    };
    const label = { active: "פעיל", scheduled: "מתוכנן" };
    return (
      <span
        className={`text-xs font-medium px-2 py-0.5 rounded-full ${map[status] || ""}`}
      >
        {label[status] || status}
      </span>
    );
  };

  const alertIcon = (type) => {
    const icons = {
      behavior: "⚠",
      medication: "💊",
      family: "👨‍👩‍👧",
      general: "ℹ",
    };
    return icons[type] || "ℹ";
  };

  const categoryBadge = (category) => {
    const map = {
      progress:
        "bg-emerald-500/15 text-emerald-400 border border-emerald-500/30",
      family: "bg-violet-500/15 text-violet-400 border border-violet-500/30",
      employment: "bg-sky-500/15 text-sky-400 border border-sky-500/30",
      general: "bg-zinc-500/15 text-zinc-400 border border-zinc-500/30",
    };
    const label = {
      progress: "התקדמות",
      family: "משפחה",
      employment: "תעסוקה",
      general: "כללי",
    };
    return (
      <span
        className={`text-xs font-medium px-2 py-0.5 rounded-full ${map[category] || ""}`}
      >
        {label[category] || category}
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
              <span>◎</span>
              {mockAlerts.filter((a) => a.urgent).length > 0 && (
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
              meetings={mockMeetings}
              alerts={mockAlerts}
              statusBadge={statusBadge}
              alertIcon={alertIcon}
            />
          )}
          {active === "residents" && (
            <ResidentsView
              residents={mockResidents}
              statusBadge={statusBadge}
              onSelectResident={setSelectedResident}
            />
          )}
          {active === "apartments" && <ApartmentsView />}
          {active === "alerts" && (
            <AlertsView alerts={mockAlerts} alertIcon={alertIcon} />
          )}
          {active === "reports" && (
            <ReportsView
              notes={mockNotes}
              categoryBadge={categoryBadge}
              onAddNote={handleAddNote}
            />
          )}
        </main>
      </div>

      {/* Note Modal */}
      {showNoteModal && (
        <div className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center z-50 p-4">
          <div className="bg-[#111318] border border-zinc-800/60 rounded-xl p-6 max-w-2xl w-full">
            <h2 className="text-xl font-semibold text-zinc-100 mb-4">
              דוח חדש
            </h2>

            <form className="space-y-4">
              <div>
                <label className="block text-sm text-zinc-400 mb-1.5">
                  דייר
                </label>
                <select
                  value={noteFormData.residentName}
                  onChange={(e) =>
                    setNoteFormData({
                      ...noteFormData,
                      residentName: e.target.value,
                    })
                  }
                  className="w-full bg-zinc-800/50 border border-zinc-700/60 rounded-lg px-3 py-2 text-zinc-100 text-sm focus:outline-none focus:border-sky-500/50"
                >
                  <option value="">בחר דייר</option>
                  {mockResidents.map((r) => (
                    <option key={r.id} value={r.name}>
                      {r.name}
                    </option>
                  ))}
                </select>
              </div>

              <div>
                <label className="block text-sm text-zinc-400 mb-1.5">
                  קטגוריה
                </label>
                <select
                  value={noteFormData.category}
                  onChange={(e) =>
                    setNoteFormData({
                      ...noteFormData,
                      category: e.target.value,
                    })
                  }
                  className="w-full bg-zinc-800/50 border border-zinc-700/60 rounded-lg px-3 py-2 text-zinc-100 text-sm focus:outline-none focus:border-sky-500/50"
                >
                  <option value="general">כללי</option>
                  <option value="progress">התקדמות</option>
                  <option value="family">משפחה</option>
                  <option value="employment">תעסוקה</option>
                </select>
              </div>

              <div>
                <label className="block text-sm text-zinc-400 mb-1.5">
                  תוכן הדוח
                </label>
                <textarea
                  value={noteFormData.content}
                  onChange={(e) =>
                    setNoteFormData({
                      ...noteFormData,
                      content: e.target.value,
                    })
                  }
                  rows="6"
                  className="w-full bg-zinc-800/50 border border-zinc-700/60 rounded-lg px-3 py-2 text-zinc-100 text-sm focus:outline-none focus:border-sky-500/50 resize-none"
                  placeholder="פרט את הדוח..."
                />
              </div>

              <div className="flex gap-3 pt-2">
                <button
                  type="button"
                  onClick={() => setShowNoteModal(false)}
                  className="flex-1 bg-sky-600 hover:bg-sky-500 text-white text-sm px-4 py-2.5 rounded-lg transition-colors"
                >
                  שמור דוח
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
    </div>
  );
}

/* ── Dashboard View ── */
function DashboardView({
  residents,
  meetings,
  alerts,
  statusBadge,
  alertIcon,
}) {
  const stats = [
    {
      label: "דיירים בטיפול",
      value: residents.length,
      icon: "◈",
      color: "from-sky-500 to-cyan-500",
    },
    {
      label: "פגישות השבוע",
      value: meetings.length,
      icon: "◷",
      color: "from-violet-500 to-indigo-500",
    },
    {
      label: "התראות דחופות",
      value: alerts.filter((a) => a.urgent).length,
      icon: "◎",
      color: "from-red-500 to-rose-500",
    },
  ];

  const upcomingMeetings = meetings.slice(0, 3);
  const urgentAlerts = alerts.filter((a) => a.urgent).slice(0, 3);

  return (
    <div className="space-y-6">
      {/* Stats */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        {stats.map((s) => (
          <div
            key={s.label}
            className="bg-[#111318] border border-zinc-800/60 rounded-xl p-4 flex items-center gap-4 hover:border-zinc-700/60 transition-colors"
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

      {/* Two columns */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Upcoming Meetings */}
        <div className="bg-[#111318] border border-zinc-800/60 rounded-xl p-5">
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-sm font-semibold text-zinc-200">
              פגישות קרובות
            </h2>
            <button className="text-xs text-sky-400 hover:text-sky-300">
              צפה בכל
            </button>
          </div>
          <div className="space-y-3">
            {upcomingMeetings.map((m) => (
              <div
                key={m.id}
                className="flex items-center gap-3 p-3 bg-zinc-800/30 rounded-lg hover:bg-zinc-800/50 transition-colors"
              >
                <div className="w-10 h-10 rounded-lg bg-sky-500/20 border border-sky-500/30 flex items-center justify-center text-sky-400 text-xs font-bold shrink-0">
                  {m.date.split("/")[0]}
                </div>
                <div className="flex-1 min-w-0">
                  <div className="text-sm font-medium text-zinc-200">
                    {m.residentName}
                  </div>
                  <div className="text-xs text-zinc-500">
                    {m.type} • {m.time}
                  </div>
                </div>
                {statusBadge(m.status)}
              </div>
            ))}
          </div>
        </div>

        {/* Urgent Alerts */}
        <div className="bg-[#111318] border border-zinc-800/60 rounded-xl p-5">
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-sm font-semibold text-zinc-200">
              התראות דחופות
            </h2>
            <button className="text-xs text-red-400 hover:text-red-300">
              צפה בכל
            </button>
          </div>
          <div className="space-y-3">
            {urgentAlerts.length > 0 ? (
              urgentAlerts.map((a) => (
                <div
                  key={a.id}
                  className="flex items-start gap-3 p-3 bg-red-500/10 border border-red-500/20 rounded-lg"
                >
                  <span className="text-red-400 text-lg mt-0.5 shrink-0">
                    {alertIcon(a.type)}
                  </span>
                  <div className="flex-1 min-w-0">
                    <div className="text-sm font-medium text-red-300">
                      {a.residentName}
                    </div>
                    <div className="text-xs text-zinc-400 mt-1">
                      {a.message}
                    </div>
                  </div>
                  <div className="text-xs text-zinc-600 shrink-0">{a.date}</div>
                </div>
              ))
            ) : (
              <div className="text-center py-6 text-sm text-zinc-500">
                אין התראות דחופות כרגע
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Residents requiring attention */}
      <div className="bg-[#111318] border border-zinc-800/60 rounded-xl p-5">
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-sm font-semibold text-zinc-200">
            דיירים הדורשים תשומת לב
          </h2>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
          {residents
            .filter((r) => r.alerts > 0)
            .map((r) => (
              <div
                key={r.id}
                className="flex items-center gap-3 p-3 bg-amber-500/10 border border-amber-500/20 rounded-lg"
              >
                <div className="w-10 h-10 rounded-full bg-gradient-to-br from-amber-500/40 to-orange-500/40 border border-amber-500/30 flex items-center justify-center text-sm font-semibold text-amber-300 shrink-0">
                  {r.name[0]}
                </div>
                <div className="flex-1 min-w-0">
                  <div className="text-sm font-medium text-zinc-200">
                    {r.name}
                  </div>
                  <div className="text-xs text-zinc-500">
                    {r.alerts} התראות פעילות
                  </div>
                </div>
                <button className="text-xs text-amber-400 hover:text-amber-300 px-3 py-1 bg-amber-500/10 rounded-lg">
                  צפה
                </button>
              </div>
            ))}
        </div>
      </div>
    </div>
  );
}

/* ── Residents View ── */
function ResidentsView({ residents, statusBadge, onSelectResident }) {
  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <p className="text-sm text-zinc-500">סה״כ {residents.length} דיירים</p>
      </div>
      <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-3">
        {residents.map((r) => (
          <div
            key={r.id}
            onClick={() => onSelectResident(r)}
            className="bg-[#111318] border border-zinc-800/60 rounded-xl p-5 hover:border-zinc-700/60 transition-colors cursor-pointer"
          >
            <div className="flex items-start justify-between mb-3">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-full bg-gradient-to-br from-sky-500/40 to-cyan-500/40 border border-sky-500/20 flex items-center justify-center text-sm font-semibold text-sky-300">
                  {r.name[0]}
                </div>
                <div>
                  <div className="font-semibold text-zinc-200">{r.name}</div>
                  <div className="text-xs text-zinc-500">גיל {r.age}</div>
                </div>
              </div>
              {r.alerts > 0 && (
                <span className="w-5 h-5 rounded-full bg-red-500 text-white text-xs flex items-center justify-center font-bold">
                  {r.alerts}
                </span>
              )}
            </div>
            <div className="space-y-1.5 text-xs text-zinc-400">
              <div className="flex justify-between">
                <span>תאריך קבלה:</span>
                <span className="text-zinc-300">{r.admissionDate}</span>
              </div>
              <div className="flex justify-between">
                <span>פגישה אחרונה:</span>
                <span className="text-zinc-300">{r.lastMeeting}</span>
              </div>
              <div className="flex justify-between">
                <span>פגישה הבאה:</span>
                <span className="text-sky-400">{r.nextMeeting}</span>
              </div>
            </div>
            <div className="mt-3 pt-3 border-t border-zinc-800/40">
              <div className="text-xs text-zinc-500 mb-1">תוכנית טיפול:</div>
              <div className="text-xs text-zinc-300">{r.treatmentPlan}</div>
            </div>
            <div className="mt-3 flex gap-2">
              <button className="flex-1 text-xs text-zinc-400 hover:text-zinc-200 bg-zinc-800/50 hover:bg-zinc-700/50 rounded-lg py-1.5 transition-colors">
                תיק אישי
              </button>
              <button className="flex-1 text-xs text-sky-400 hover:text-sky-300 bg-sky-500/10 hover:bg-sky-500/20 rounded-lg py-1.5 transition-colors">
                דוחות
              </button>
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
      <div className="flex items-center justify-between">
        <p className="text-sm text-zinc-500">רשימת דירות</p>
        <button className="flex items-center gap-2 bg-sky-600 hover:bg-sky-500 text-white text-sm px-4 py-2 rounded-lg transition-colors">
          <span>+</span> דירה חדשה
        </button>
      </div>
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

/* ── Reports View (was Notes) ── */
function ReportsView({ notes, categoryBadge, onAddNote }) {
  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <p className="text-sm text-zinc-500">סה״כ {notes.length} דוחות</p>
        <button
          onClick={onAddNote}
          className="flex items-center gap-2 bg-sky-600 hover:bg-sky-500 text-white text-sm px-4 py-2 rounded-lg transition-colors"
        >
          <span>+</span> דוח חדש
        </button>
      </div>
      <div className="space-y-3 max-w-3xl">
        {notes.map((n) => (
          <div
            key={n.id}
            className="bg-[#111318] border border-zinc-800/60 rounded-xl p-5"
          >
            <div className="flex items-start justify-between mb-3">
              <div>
                <div className="text-sm font-medium text-zinc-200 mb-1">
                  {n.residentName}
                </div>
                {categoryBadge(n.category)}
              </div>
              <div className="text-xs text-zinc-500">{n.date}</div>
            </div>
            <div className="text-sm text-zinc-400 leading-relaxed">
              {n.content}
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
