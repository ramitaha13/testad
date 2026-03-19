import { useState } from "react";

const mockStats = {
  apartments: 12,
  workers: 48,
  socialWorkers: 8,
  todayReports: 34,
  missingReports: 5,
  pendingReview: 11,
  systemManager: "אדמין ראשי",
};

const mockImportantNotes = [
  {
    id: 1,
    title: "ישיבת צוות - מחר",
    content: "ישיבת צוות שבועית בשעה 10:00 - חובה להגיע",
    type: "info",
    date: "20/03/2026",
  },
  {
    id: 2,
    title: "עדכון נהלים",
    content: "נהלי דיווח חדשים נכנסו לתוקף החל מהשבוע",
    type: "warning",
    date: "18/03/2026",
  },
  {
    id: 3,
    title: "תזכורת - הגשת דוחות",
    content: "יש להגיש את כל הדוחות עד סוף היום",
    type: "error",
    date: "19/03/2026",
  },
];

const mockApartments = [
  {
    id: 1,
    name: "דירה א׳ - חיפה",
    manager: "רונית לוי",
    sw: "מיכל כהן",
    workers: 5,
    todayReports: 3,
    total: 3,
    status: "ok",
  },
  {
    id: 2,
    name: "דירה ב׳ - תל אביב",
    manager: "אורן פרץ",
    sw: "דנה ברק",
    workers: 4,
    todayReports: 2,
    total: 3,
    status: "missing",
  },
  {
    id: 3,
    name: "דירה ג׳ - חדרה",
    manager: "שירה מזרחי",
    sw: "יואב ניר",
    workers: 6,
    todayReports: 3,
    total: 3,
    status: "ok",
  },
  {
    id: 4,
    name: "דירה ד׳ - נתניה",
    manager: "עמית גל",
    sw: "נועה שרון",
    workers: 3,
    todayReports: 1,
    total: 3,
    status: "missing",
  },
  {
    id: 5,
    name: "דירה ה׳ - רמת גן",
    manager: "ליאת אבד",
    sw: "תום כץ",
    workers: 5,
    todayReports: 3,
    total: 3,
    status: "ok",
  },
];

const mockUsers = [
  {
    id: 1,
    name: "רונית לוי",
    role: "מנהל דירה",
    apartment: "דירה א׳",
    status: "active",
  },
  {
    id: 2,
    name: "אורן פרץ",
    role: "מנהל דירה",
    apartment: "דירה ב׳",
    status: "active",
  },
  {
    id: 3,
    name: "מיכל כהן",
    role: "עובד סוציאלי",
    apartment: "דירה א׳",
    status: "active",
  },
  {
    id: 4,
    name: "יוסי דהן",
    role: "עובד",
    apartment: "דירה ג׳",
    status: "inactive",
  },
  {
    id: 5,
    name: "נועה שרון",
    role: "עובד סוציאלי",
    apartment: "דירה ד׳",
    status: "active",
  },
];

const mockReports = [
  {
    id: 1,
    apartment: "דירה א׳",
    worker: "יוסי דהן",
    shift: "בוקר",
    date: "19/03/2025",
    status: "נבדק",
  },
  {
    id: 2,
    apartment: "דירה ב׳",
    worker: "שרה לוין",
    shift: "צהריים",
    date: "19/03/2025",
    status: "נשלח",
  },
  {
    id: 3,
    apartment: "דירה ג׳",
    worker: "אלון בן דוד",
    shift: "לילה",
    date: "18/03/2025",
    status: "נשלח",
  },
  {
    id: 4,
    apartment: "דירה ד׳",
    worker: "רחל אברהם",
    shift: "בוקר",
    date: "19/03/2025",
    status: "טיוטה",
  },
  {
    id: 5,
    apartment: "דירה ה׳",
    worker: "מתן זיו",
    shift: "צהריים",
    date: "19/03/2025",
    status: "נבדק",
  },
];

const NAV = [
  { id: "dashboard", label: "דשבורד", icon: "⬡", path: null },
  { id: "apartments", label: "דירות", icon: "⌂", path: "/apartmentsPage" },
  { id: "users", label: "משתמשים", icon: "◈", path: "/usersPage" },
  { id: "reports", label: "דוחות", icon: "▦", path: "/reportsPage" },
];

const statusBadge = (status) => {
  const map = {
    נבדק: "bg-emerald-500/15 text-emerald-400 border border-emerald-500/30",
    נשלח: "bg-sky-500/15 text-sky-400 border border-sky-500/30",
    טיוטה: "bg-amber-500/15 text-amber-400 border border-amber-500/30",
    active: "bg-emerald-500/15 text-emerald-400 border border-emerald-500/30",
    inactive: "bg-zinc-500/15 text-zinc-400 border border-zinc-500/30",
  };
  const label = { active: "פעיל", inactive: "לא פעיל" };
  return (
    <span
      className={`text-xs font-medium px-2 py-0.5 rounded-full ${map[status] || ""}`}
    >
      {label[status] || status}
    </span>
  );
};

const shiftIcon = (shift) =>
  ({ בוקר: "☀", צהריים: "◑", לילה: "☽" })[shift] || "·";

export default function AdminDashboard() {
  const [active, setActive] = useState("dashboard");
  const [sidebarOpen, setSidebarOpen] = useState(true);

  const handleNavClick = (item) => {
    setActive(item.id);
    // אם יש path, עבור לדף החדש
    if (item.path) {
      window.location.href = item.path;
    }
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
          <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-violet-500 to-indigo-600 flex items-center justify-center text-white font-bold text-sm shrink-0">
            מ
          </div>
          {sidebarOpen && (
            <span className="font-semibold text-sm text-zinc-100 tracking-wide">
              מערכת ניהול
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
                    ? "bg-violet-600/20 text-violet-300 border border-violet-500/25"
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
            <div className="w-8 h-8 rounded-full bg-gradient-to-br from-violet-500 to-fuchsia-500 flex items-center justify-center text-xs font-bold shrink-0">
              א
            </div>
            {sidebarOpen && (
              <div className="overflow-hidden">
                <div className="text-sm font-medium text-zinc-200 truncate">
                  {mockStats.systemManager}
                </div>
                <div className="text-xs text-zinc-500">מנהל על</div>
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
              <span className="absolute top-1 right-1 w-2 h-2 bg-violet-500 rounded-full"></span>
            </button>
            <div className="text-xs text-zinc-500">יום ה׳, 19.03.2026</div>
          </div>
        </header>

        {/* Content */}
        <main className="flex-1 overflow-y-auto p-6">
          {active === "dashboard" && <DashboardView />}
          {active === "apartments" && <ApartmentsView />}
          {active === "users" && <UsersView />}
          {active === "reports" && <ReportsView />}
          {active === "alerts" && <AlertsView />}
        </main>
      </div>
    </div>
  );
}

/* ── Dashboard ── */
function DashboardView() {
  const stats = [
    {
      label: "מנהל המערכת",
      value: mockStats.systemManager,
      icon: "◈",
      color: "from-fuchsia-500 to-pink-500",
      isText: true,
    },
    {
      label: "דירות פעילות",
      value: mockStats.apartments,
      icon: "⌂",
      color: "from-violet-500 to-indigo-500",
    },
    {
      label: "עובדים",
      value: mockStats.workers,
      icon: "◈",
      color: "from-sky-500 to-cyan-500",
    },
    {
      label: "דוחות היום",
      value: mockStats.todayReports,
      icon: "▦",
      color: "from-emerald-500 to-teal-500",
    },
  ];

  return (
    <div className="space-y-6">
      {/* Stat Cards */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
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
              <div
                className={`${s.isText ? "text-lg" : "text-2xl"} font-bold text-zinc-100`}
              >
                {s.value}
              </div>
              <div className="text-xs text-zinc-500">{s.label}</div>
            </div>
          </div>
        ))}
      </div>

      {/* Important Notes Section */}
      <div className="bg-[#111318] border border-zinc-800/60 rounded-xl p-5">
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-sm font-semibold text-zinc-200 flex items-center gap-2">
            <span className="text-amber-400">📌</span>
            הערות חשובות
          </h2>
          <button className="text-xs text-violet-400 hover:text-violet-300 transition-colors">
            + הוסף הערה
          </button>
        </div>
        <div className="space-y-3">
          {mockImportantNotes.map((note) => {
            const noteStyles = {
              info: {
                bg: "bg-sky-500/10",
                border: "border-sky-500/25",
                icon: "ℹ",
                iconColor: "text-sky-400",
              },
              warning: {
                bg: "bg-amber-500/10",
                border: "border-amber-500/25",
                icon: "⚠",
                iconColor: "text-amber-400",
              },
              error: {
                bg: "bg-red-500/10",
                border: "border-red-500/25",
                icon: "✕",
                iconColor: "text-red-400",
              },
            };
            const style = noteStyles[note.type];

            return (
              <div
                key={note.id}
                className={`${style.bg} border ${style.border} rounded-lg p-3 flex items-start gap-3`}
              >
                <span className={`${style.iconColor} text-sm mt-0.5 shrink-0`}>
                  {style.icon}
                </span>
                <div className="flex-1 min-w-0">
                  <div className="text-sm font-medium text-zinc-200">
                    {note.title}
                  </div>
                  <div className="text-xs text-zinc-400 mt-1">
                    {note.content}
                  </div>
                </div>
                <div className="text-xs text-zinc-600 shrink-0">
                  {note.date}
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* Two columns */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Apartments status */}
        <div className="bg-[#111318] border border-zinc-800/60 rounded-xl p-5">
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-sm font-semibold text-zinc-200">
              סטטוס דירות — היום
            </h2>
            <span className="text-xs text-zinc-500">19/03/2026</span>
          </div>
          <div className="space-y-3">
            {mockApartments.map((apt) => (
              <div key={apt.id} className="flex items-center gap-3">
                <div
                  className={`w-2 h-2 rounded-full shrink-0 ${apt.status === "ok" ? "bg-emerald-400" : "bg-amber-400"}`}
                />
                <div className="flex-1 min-w-0">
                  <div className="text-sm text-zinc-300 truncate">
                    {apt.name}
                  </div>
                </div>
                <div className="text-xs text-zinc-500 shrink-0">
                  {apt.todayReports}/{apt.total} דוחות
                </div>
                <div className="w-20 h-1.5 bg-zinc-800 rounded-full overflow-hidden shrink-0">
                  <div
                    className={`h-full rounded-full ${apt.status === "ok" ? "bg-emerald-400" : "bg-amber-400"}`}
                    style={{
                      width: `${(apt.todayReports / apt.total) * 100}%`,
                    }}
                  />
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Recent reports */}
        <div className="bg-[#111318] border border-zinc-800/60 rounded-xl p-5">
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-sm font-semibold text-zinc-200">
              דוחות אחרונים
            </h2>
          </div>
          <div className="space-y-2">
            {mockReports.map((r) => (
              <div
                key={r.id}
                className="flex items-center gap-3 py-1.5 border-b border-zinc-800/40 last:border-0"
              >
                <span className="text-base w-5 text-center shrink-0">
                  {shiftIcon(r.shift)}
                </span>
                <div className="flex-1 min-w-0">
                  <div className="text-sm text-zinc-300 truncate">
                    {r.apartment}
                  </div>
                  <div className="text-xs text-zinc-500">{r.worker}</div>
                </div>
                {statusBadge(r.status)}
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Missing reports alert */}
      {mockStats.missingReports > 0 && (
        <div className="bg-amber-500/10 border border-amber-500/25 rounded-xl p-4 flex items-center gap-4">
          <span className="text-amber-400 text-xl shrink-0">⚠</span>
          <div>
            <div className="text-sm font-medium text-amber-300">
              {mockStats.missingReports} דוחות משמרת לא מולאו היום
            </div>
            <div className="text-xs text-amber-400/60 mt-0.5">
              דירה ב׳ ו-דירה ד׳ — משמרות חסרות
            </div>
          </div>
          <button className="mr-auto text-xs text-amber-400 hover:text-amber-300 underline underline-offset-2">
            צפייה
          </button>
        </div>
      )}
    </div>
  );
}

/* ── Apartments ── */
function ApartmentsView() {
  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <p className="text-sm text-zinc-500">
          סה״כ {mockApartments.length} דירות
        </p>
        <button className="flex items-center gap-2 bg-violet-600 hover:bg-violet-500 text-white text-sm px-4 py-2 rounded-lg transition-colors">
          <span>+</span> הוסף דירה
        </button>
      </div>
      <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-3">
        {mockApartments.map((apt) => (
          <div
            key={apt.id}
            className="bg-[#111318] border border-zinc-800/60 rounded-xl p-5 hover:border-zinc-700/60 transition-colors"
          >
            <div className="flex items-start justify-between mb-3">
              <div>
                <div className="font-semibold text-zinc-200">{apt.name}</div>
                <div className="text-xs text-zinc-500 mt-0.5">
                  מנהל: {apt.manager}
                </div>
              </div>
              <span
                className={`w-2.5 h-2.5 rounded-full mt-1 shrink-0 ${apt.status === "ok" ? "bg-emerald-400" : "bg-amber-400"}`}
              />
            </div>
            <div className="space-y-1.5 text-xs text-zinc-400">
              <div className="flex justify-between">
                <span>עו״ס:</span>
                <span className="text-zinc-300">{apt.sw}</span>
              </div>
              <div className="flex justify-between">
                <span>עובדים:</span>
                <span className="text-zinc-300">{apt.workers}</span>
              </div>
              <div className="flex justify-between">
                <span>דוחות היום:</span>
                <span
                  className={
                    apt.status === "ok" ? "text-emerald-400" : "text-amber-400"
                  }
                >
                  {apt.todayReports}/{apt.total}
                </span>
              </div>
            </div>
            <div className="mt-3 pt-3 border-t border-zinc-800/40 flex gap-2">
              <button className="flex-1 text-xs text-zinc-400 hover:text-zinc-200 bg-zinc-800/50 hover:bg-zinc-700/50 rounded-lg py-1.5 transition-colors">
                עריכה
              </button>
              <button className="flex-1 text-xs text-violet-400 hover:text-violet-300 bg-violet-500/10 hover:bg-violet-500/20 rounded-lg py-1.5 transition-colors">
                דוחות
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

/* ── Users ── */
function UsersView() {
  const roleColor = {
    "מנהל דירה": "text-violet-400",
    "עובד סוציאלי": "text-sky-400",
    עובד: "text-zinc-300",
  };
  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <p className="text-sm text-zinc-500">סה״כ {mockUsers.length} משתמשים</p>
        <button className="flex items-center gap-2 bg-violet-600 hover:bg-violet-500 text-white text-sm px-4 py-2 rounded-lg transition-colors">
          <span>+</span> הוסף משתמש
        </button>
      </div>
      <div className="bg-[#111318] border border-zinc-800/60 rounded-xl overflow-hidden">
        <table className="w-full text-sm">
          <thead>
            <tr className="border-b border-zinc-800/60">
              <th className="text-right text-xs text-zinc-500 font-medium px-5 py-3">
                שם
              </th>
              <th className="text-right text-xs text-zinc-500 font-medium px-5 py-3">
                תפקיד
              </th>
              <th className="text-right text-xs text-zinc-500 font-medium px-5 py-3">
                דירה
              </th>
              <th className="text-right text-xs text-zinc-500 font-medium px-5 py-3">
                סטטוס
              </th>
              <th className="px-5 py-3"></th>
            </tr>
          </thead>
          <tbody>
            {mockUsers.map((u) => (
              <tr
                key={u.id}
                className="border-b border-zinc-800/40 last:border-0 hover:bg-zinc-800/20 transition-colors"
              >
                <td className="px-5 py-3">
                  <div className="flex items-center gap-3">
                    <div className="w-7 h-7 rounded-full bg-gradient-to-br from-violet-500/40 to-indigo-500/40 border border-violet-500/20 flex items-center justify-center text-xs font-semibold text-violet-300">
                      {u.name[0]}
                    </div>
                    <span className="text-zinc-200">{u.name}</span>
                  </div>
                </td>
                <td
                  className={`px-5 py-3 text-sm font-medium ${roleColor[u.role] || "text-zinc-300"}`}
                >
                  {u.role}
                </td>
                <td className="px-5 py-3 text-zinc-400 text-xs">
                  {u.apartment}
                </td>
                <td className="px-5 py-3">{statusBadge(u.status)}</td>
                <td className="px-5 py-3 text-left">
                  <button className="text-xs text-zinc-500 hover:text-zinc-300 transition-colors">
                    עריכה
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

/* ── Reports ── */
function ReportsView() {
  const [filter, setFilter] = useState("הכל");
  const shifts = ["הכל", "בוקר", "צהריים", "לילה"];
  const filtered =
    filter === "הכל"
      ? mockReports
      : mockReports.filter((r) => r.shift === filter);

  return (
    <div className="space-y-4">
      <div className="flex items-center gap-2 flex-wrap">
        {shifts.map((s) => (
          <button
            key={s}
            onClick={() => setFilter(s)}
            className={`text-xs px-3 py-1.5 rounded-lg transition-colors ${filter === s ? "bg-violet-600 text-white" : "bg-zinc-800/60 text-zinc-400 hover:text-zinc-200"}`}
          >
            {s !== "הכל" && <span className="ml-1">{shiftIcon(s)}</span>}
            {s}
          </button>
        ))}
      </div>
      <div className="bg-[#111318] border border-zinc-800/60 rounded-xl overflow-hidden">
        <table className="w-full text-sm">
          <thead>
            <tr className="border-b border-zinc-800/60">
              {["דירה", "עובד", "משמרת", "תאריך", "סטטוס", ""].map((h) => (
                <th
                  key={h}
                  className="text-right text-xs text-zinc-500 font-medium px-5 py-3"
                >
                  {h}
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {filtered.map((r) => (
              <tr
                key={r.id}
                className="border-b border-zinc-800/40 last:border-0 hover:bg-zinc-800/20 transition-colors"
              >
                <td className="px-5 py-3 text-zinc-200">{r.apartment}</td>
                <td className="px-5 py-3 text-zinc-400">{r.worker}</td>
                <td className="px-5 py-3">
                  <span className="flex items-center gap-1.5 text-zinc-300">
                    <span>{shiftIcon(r.shift)}</span>
                    {r.shift}
                  </span>
                </td>
                <td className="px-5 py-3 text-zinc-500 text-xs">{r.date}</td>
                <td className="px-5 py-3">{statusBadge(r.status)}</td>
                <td className="px-5 py-3 text-left">
                  <button className="text-xs text-violet-400 hover:text-violet-300 transition-colors">
                    צפייה
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

/* ── Alerts ── */
function AlertsView() {
  const alerts = [
    {
      id: 1,
      type: "error",
      title: "דוח חסר — דירה ב׳",
      desc: "משמרת לילה מ-18/03 לא מולאה",
      time: "לפני שעה",
    },
    {
      id: 2,
      type: "warning",
      title: "דוח חסר — דירה ד׳",
      desc: "משמרת בוקר מ-19/03 לא מולאה",
      time: "לפני 2 שעות",
    },
    {
      id: 3,
      type: "info",
      title: "דוח חדש — דירה א׳",
      desc: "יוסי דהן הגיש דוח משמרת בוקר",
      time: "לפני 3 שעות",
    },
    {
      id: 4,
      type: "info",
      title: "דוח חדש — דירה ג׳",
      desc: "אלון בן דוד הגיש דוח משמרת לילה",
      time: "אתמול",
    },
    {
      id: 5,
      type: "success",
      title: "דוח אושר — דירה ה׳",
      desc: "מתן זיו — משמרת צהריים אושרה ע״י מנהל",
      time: "אתמול",
    },
  ];

  const styles = {
    error: {
      icon: "✕",
      bg: "bg-red-500/10",
      border: "border-red-500/20",
      dot: "bg-red-400",
      text: "text-red-300",
    },
    warning: {
      icon: "⚠",
      bg: "bg-amber-500/10",
      border: "border-amber-500/20",
      dot: "bg-amber-400",
      text: "text-amber-300",
    },
    info: {
      icon: "◎",
      bg: "bg-sky-500/10",
      border: "border-sky-500/20",
      dot: "bg-sky-400",
      text: "text-sky-300",
    },
    success: {
      icon: "✓",
      bg: "bg-emerald-500/10",
      border: "border-emerald-500/20",
      dot: "bg-emerald-400",
      text: "text-emerald-300",
    },
  };

  return (
    <div className="space-y-3 max-w-2xl">
      {alerts.map((a) => {
        const s = styles[a.type];
        return (
          <div
            key={a.id}
            className={`flex items-start gap-4 p-4 rounded-xl border ${s.bg} ${s.border}`}
          >
            <span className={`text-base mt-0.5 shrink-0 ${s.text}`}>
              {s.icon}
            </span>
            <div className="flex-1">
              <div className={`text-sm font-medium ${s.text}`}>{a.title}</div>
              <div className="text-xs text-zinc-400 mt-0.5">{a.desc}</div>
            </div>
            <div className="text-xs text-zinc-600 shrink-0">{a.time}</div>
          </div>
        );
      })}
    </div>
  );
}
