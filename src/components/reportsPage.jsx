import { useState } from "react";

const mockStats = {
  systemManager: "אדמין ראשי",
};

const initialReports = [
  {
    id: 1,
    apartment: "דירה א׳",
    worker: "יוסי דהן",
    shift: "בוקר",
    date: "19/03/2025",
    status: "נבדק",
    notes: "כל הפעילויות בוצעו כמתוכנן",
  },
  {
    id: 2,
    apartment: "דירה ב׳",
    worker: "שרה לוין",
    shift: "צהריים",
    date: "19/03/2025",
    status: "נשלח",
    notes: "דרושה התייחסות לנושא התרופות",
  },
  {
    id: 3,
    apartment: "דירה ג׳",
    worker: "אלון בן דוד",
    shift: "לילה",
    date: "18/03/2025",
    status: "נשלח",
    notes: "אירוע קל בלילה, תועד במערכת",
  },
  {
    id: 4,
    apartment: "דירה ד׳",
    worker: "רחל אברהם",
    shift: "בוקר",
    date: "19/03/2025",
    status: "טיוטה",
    notes: "",
  },
  {
    id: 5,
    apartment: "דירה ה׳",
    worker: "מתן זיו",
    shift: "צהריים",
    date: "19/03/2025",
    status: "נבדק",
    notes: "יום רגוע, ללא אירועים מיוחדים",
  },
];

const NAV = [
  { id: "dashboard", label: "דשבורד", icon: "⬡", path: "/admin" },
  { id: "apartments", label: "דירות", icon: "⌂", path: "/apartments" },
  { id: "users", label: "משתמשים", icon: "◈", path: "/users" },
  { id: "reports", label: "דוחות", icon: "▦", path: "/reports" },
  { id: "alerts", label: "התראות", icon: "◎", path: "/alerts" },
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
  ({ בוקר: "☀", צהריים: "◑", לילה: "☽" })[shift] || "·";

export default function ReportsPage() {
  const [active, setActive] = useState("reports");
  const [sidebarOpen, setSidebarOpen] = useState(true);
  const [reports, setReports] = useState(initialReports);
  const [filter, setFilter] = useState("הכל");
  const [showModal, setShowModal] = useState(false);
  const [viewingReport, setViewingReport] = useState(null);
  const [editingReport, setEditingReport] = useState(null);
  const [formData, setFormData] = useState({
    apartment: "",
    worker: "",
    shift: "",
    date: "",
    status: "טיוטה",
    notes: "",
  });

  const handleNavClick = (item) => {
    setActive(item.id);
    if (item.path) {
      window.location.href = item.path;
    }
  };

  const handleAddNew = () => {
    setEditingReport(null);
    setViewingReport(null);
    const today = new Date().toLocaleDateString("he-IL");
    setFormData({
      apartment: "",
      worker: "",
      shift: "",
      date: today,
      status: "טיוטה",
      notes: "",
    });
    setShowModal(true);
  };

  const handleView = (report) => {
    setViewingReport(report);
    setEditingReport(null);
    setShowModal(true);
  };

  const handleEdit = (report) => {
    setEditingReport(report);
    setViewingReport(null);
    setFormData({
      apartment: report.apartment,
      worker: report.worker,
      shift: report.shift,
      date: report.date,
      status: report.status,
      notes: report.notes,
    });
    setShowModal(true);
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    if (editingReport) {
      // עריכה
      setReports(
        reports.map((report) =>
          report.id === editingReport.id
            ? {
                ...report,
                apartment: formData.apartment,
                worker: formData.worker,
                shift: formData.shift,
                date: formData.date,
                status: formData.status,
                notes: formData.notes,
              }
            : report,
        ),
      );
    } else {
      // הוספה
      const newReport = {
        id: Math.max(...reports.map((r) => r.id)) + 1,
        apartment: formData.apartment,
        worker: formData.worker,
        shift: formData.shift,
        date: formData.date,
        status: formData.status,
        notes: formData.notes,
      };
      setReports([...reports, newReport]);
    }

    setShowModal(false);
    setFormData({
      apartment: "",
      worker: "",
      shift: "",
      date: "",
      status: "טיוטה",
      notes: "",
    });
  };

  const handleDelete = (id) => {
    if (window.confirm("האם אתה בטוח שברצונך למחוק את הדוח?")) {
      setReports(reports.filter((report) => report.id !== id));
    }
  };

  const handleApprove = (id) => {
    setReports(
      reports.map((report) =>
        report.id === id ? { ...report, status: "נבדק" } : report,
      ),
    );
  };

  const shifts = ["הכל", "בוקר", "צהריים", "לילה"];
  const filtered =
    filter === "הכל" ? reports : reports.filter((r) => r.shift === filter);

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
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2 flex-wrap">
                {shifts.map((s) => (
                  <button
                    key={s}
                    onClick={() => setFilter(s)}
                    className={`text-xs px-3 py-1.5 rounded-lg transition-colors ${
                      filter === s
                        ? "bg-violet-600 text-white"
                        : "bg-zinc-800/60 text-zinc-400 hover:text-zinc-200"
                    }`}
                  >
                    {s !== "הכל" && (
                      <span className="ml-1">{shiftIcon(s)}</span>
                    )}
                    {s}
                  </button>
                ))}
              </div>
              <button
                onClick={handleAddNew}
                className="flex items-center gap-2 bg-violet-600 hover:bg-violet-500 text-white text-sm px-4 py-2 rounded-lg transition-colors"
              >
                <span>+</span> דוח חדש
              </button>
            </div>

            <div className="bg-[#111318] border border-zinc-800/60 rounded-xl overflow-hidden">
              <table className="w-full text-sm">
                <thead>
                  <tr className="border-b border-zinc-800/60">
                    <th className="text-right text-xs text-zinc-500 font-medium px-5 py-3">
                      דירה
                    </th>
                    <th className="text-right text-xs text-zinc-500 font-medium px-5 py-3">
                      עובד
                    </th>
                    <th className="text-right text-xs text-zinc-500 font-medium px-5 py-3">
                      משמרת
                    </th>
                    <th className="text-right text-xs text-zinc-500 font-medium px-5 py-3">
                      תאריך
                    </th>
                    <th className="text-right text-xs text-zinc-500 font-medium px-5 py-3">
                      סטטוס
                    </th>
                    <th className="px-5 py-3"></th>
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
                      <td className="px-5 py-3 text-zinc-500 text-xs">
                        {r.date}
                      </td>
                      <td className="px-5 py-3">{statusBadge(r.status)}</td>
                      <td className="px-5 py-3 text-left">
                        <div className="flex items-center gap-2 justify-end">
                          <button
                            onClick={() => handleView(r)}
                            className="text-xs text-violet-400 hover:text-violet-300 transition-colors"
                          >
                            צפייה
                          </button>
                          <button
                            onClick={() => handleEdit(r)}
                            className="text-xs text-zinc-500 hover:text-zinc-300 transition-colors"
                          >
                            עריכה
                          </button>
                          {r.status !== "נבדק" && (
                            <button
                              onClick={() => handleApprove(r.id)}
                              className="text-xs text-emerald-400 hover:text-emerald-300 transition-colors"
                            >
                              אשר
                            </button>
                          )}
                          <button
                            onClick={() => handleDelete(r.id)}
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
        </main>
      </div>

      {/* Modal */}
      {showModal && (
        <div className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center z-50 p-4">
          <div className="bg-[#111318] border border-zinc-800/60 rounded-xl p-6 max-w-2xl w-full max-h-[90vh] overflow-y-auto">
            {viewingReport ? (
              // View Mode
              <>
                <div className="flex items-center justify-between mb-6">
                  <h2 className="text-xl font-semibold text-zinc-100">
                    פרטי דוח
                  </h2>
                  <button
                    onClick={() => setShowModal(false)}
                    className="text-zinc-500 hover:text-zinc-300 transition-colors"
                  >
                    ✕
                  </button>
                </div>

                <div className="space-y-4">
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <div className="text-xs text-zinc-500 mb-1">דירה</div>
                      <div className="text-sm text-zinc-200">
                        {viewingReport.apartment}
                      </div>
                    </div>
                    <div>
                      <div className="text-xs text-zinc-500 mb-1">עובד</div>
                      <div className="text-sm text-zinc-200">
                        {viewingReport.worker}
                      </div>
                    </div>
                    <div>
                      <div className="text-xs text-zinc-500 mb-1">משמרת</div>
                      <div className="text-sm text-zinc-200 flex items-center gap-2">
                        <span>{shiftIcon(viewingReport.shift)}</span>
                        {viewingReport.shift}
                      </div>
                    </div>
                    <div>
                      <div className="text-xs text-zinc-500 mb-1">תאריך</div>
                      <div className="text-sm text-zinc-200">
                        {viewingReport.date}
                      </div>
                    </div>
                    <div>
                      <div className="text-xs text-zinc-500 mb-1">סטטוס</div>
                      <div>{statusBadge(viewingReport.status)}</div>
                    </div>
                  </div>

                  <div>
                    <div className="text-xs text-zinc-500 mb-1">הערות</div>
                    <div className="text-sm text-zinc-300 bg-zinc-800/30 rounded-lg p-3 min-h-[100px]">
                      {viewingReport.notes || "אין הערות"}
                    </div>
                  </div>
                </div>

                <div className="flex gap-3 mt-6">
                  <button
                    onClick={() => handleEdit(viewingReport)}
                    className="flex-1 bg-violet-600 hover:bg-violet-500 text-white text-sm px-4 py-2.5 rounded-lg transition-colors"
                  >
                    עריכה
                  </button>
                  <button
                    onClick={() => setShowModal(false)}
                    className="flex-1 bg-zinc-800/50 hover:bg-zinc-700/50 text-zinc-300 text-sm px-4 py-2.5 rounded-lg transition-colors"
                  >
                    סגור
                  </button>
                </div>
              </>
            ) : (
              // Edit/Create Mode
              <>
                <h2 className="text-xl font-semibold text-zinc-100 mb-4">
                  {editingReport ? "עריכת דוח" : "דוח חדש"}
                </h2>

                <form onSubmit={handleSubmit} className="space-y-4">
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <label className="block text-sm text-zinc-400 mb-1.5">
                        דירה
                      </label>
                      <input
                        type="text"
                        required
                        value={formData.apartment}
                        onChange={(e) =>
                          setFormData({
                            ...formData,
                            apartment: e.target.value,
                          })
                        }
                        className="w-full bg-zinc-800/50 border border-zinc-700/60 rounded-lg px-3 py-2 text-zinc-100 text-sm focus:outline-none focus:border-violet-500/50 transition-colors"
                        placeholder="דירה א׳"
                      />
                    </div>

                    <div>
                      <label className="block text-sm text-zinc-400 mb-1.5">
                        עובד
                      </label>
                      <input
                        type="text"
                        required
                        value={formData.worker}
                        onChange={(e) =>
                          setFormData({ ...formData, worker: e.target.value })
                        }
                        className="w-full bg-zinc-800/50 border border-zinc-700/60 rounded-lg px-3 py-2 text-zinc-100 text-sm focus:outline-none focus:border-violet-500/50 transition-colors"
                        placeholder="שם העובד"
                      />
                    </div>

                    <div>
                      <label className="block text-sm text-zinc-400 mb-1.5">
                        משמרת
                      </label>
                      <select
                        required
                        value={formData.shift}
                        onChange={(e) =>
                          setFormData({ ...formData, shift: e.target.value })
                        }
                        className="w-full bg-zinc-800/50 border border-zinc-700/60 rounded-lg px-3 py-2 text-zinc-100 text-sm focus:outline-none focus:border-violet-500/50 transition-colors"
                      >
                        <option value="">בחר משמרת</option>
                        <option value="בוקר">☀ בוקר</option>
                        <option value="צהריים">◑ צהריים</option>
                        <option value="לילה">☽ לילה</option>
                      </select>
                    </div>

                    <div>
                      <label className="block text-sm text-zinc-400 mb-1.5">
                        תאריך
                      </label>
                      <input
                        type="text"
                        required
                        value={formData.date}
                        onChange={(e) =>
                          setFormData({ ...formData, date: e.target.value })
                        }
                        className="w-full bg-zinc-800/50 border border-zinc-700/60 rounded-lg px-3 py-2 text-zinc-100 text-sm focus:outline-none focus:border-violet-500/50 transition-colors"
                        placeholder="DD/MM/YYYY"
                      />
                    </div>

                    <div>
                      <label className="block text-sm text-zinc-400 mb-1.5">
                        סטטוס
                      </label>
                      <select
                        required
                        value={formData.status}
                        onChange={(e) =>
                          setFormData({ ...formData, status: e.target.value })
                        }
                        className="w-full bg-zinc-800/50 border border-zinc-700/60 rounded-lg px-3 py-2 text-zinc-100 text-sm focus:outline-none focus:border-violet-500/50 transition-colors"
                      >
                        <option value="טיוטה">טיוטה</option>
                        <option value="נשלח">נשלח</option>
                        <option value="נבדק">נבדק</option>
                      </select>
                    </div>
                  </div>

                  <div>
                    <label className="block text-sm text-zinc-400 mb-1.5">
                      הערות
                    </label>
                    <textarea
                      value={formData.notes}
                      onChange={(e) =>
                        setFormData({ ...formData, notes: e.target.value })
                      }
                      rows="6"
                      className="w-full bg-zinc-800/50 border border-zinc-700/60 rounded-lg px-3 py-2 text-zinc-100 text-sm focus:outline-none focus:border-violet-500/50 transition-colors resize-none"
                      placeholder="הערות על המשמרת..."
                    />
                  </div>

                  <div className="flex gap-3 pt-2">
                    <button
                      type="submit"
                      className="flex-1 bg-violet-600 hover:bg-violet-500 text-white text-sm px-4 py-2.5 rounded-lg transition-colors"
                    >
                      {editingReport ? "שמור שינויים" : "צור דוח"}
                    </button>
                    <button
                      type="button"
                      onClick={() => setShowModal(false)}
                      className="flex-1 bg-zinc-800/50 hover:bg-zinc-700/50 text-zinc-300 text-sm px-4 py-2.5 rounded-lg transition-colors"
                    >
                      ביטול
                    </button>
                  </div>
                </form>
              </>
            )}
          </div>
        </div>
      )}
    </div>
  );
}
