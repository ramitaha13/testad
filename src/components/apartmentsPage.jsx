import { useState } from "react";

const mockStats = {
  systemManager: "אדמין ראשי",
};

const initialApartments = [
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

const NAV = [
  { id: "dashboard", label: "דשבורד", icon: "⬡", path: "/admin" },
  { id: "apartments", label: "דירות", icon: "⌂", path: "/apartments" },
  { id: "users", label: "משתמשים", icon: "◈", path: "/users" },
  { id: "reports", label: "דוחות", icon: "▦", path: "/reports" },
  { id: "alerts", label: "התראות", icon: "◎", path: "/alerts" },
];

export default function ApartmentsPage() {
  const [active, setActive] = useState("apartments");
  const [sidebarOpen, setSidebarOpen] = useState(true);
  const [apartments, setApartments] = useState(initialApartments);
  const [showModal, setShowModal] = useState(false);
  const [editingApartment, setEditingApartment] = useState(null);
  const [formData, setFormData] = useState({
    name: "",
    manager: "",
    sw: "",
    workers: "",
  });

  const handleNavClick = (item) => {
    setActive(item.id);
    if (item.path) {
      // ניתוב לדף אחר
      window.location.href = item.path;
    }
  };

  const handleAddNew = () => {
    setEditingApartment(null);
    setFormData({
      name: "",
      manager: "",
      sw: "",
      workers: "",
    });
    setShowModal(true);
  };

  const handleEdit = (apt) => {
    setEditingApartment(apt);
    setFormData({
      name: apt.name,
      manager: apt.manager,
      sw: apt.sw,
      workers: apt.workers.toString(),
    });
    setShowModal(true);
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    if (editingApartment) {
      // עריכה
      setApartments(
        apartments.map((apt) =>
          apt.id === editingApartment.id
            ? {
                ...apt,
                name: formData.name,
                manager: formData.manager,
                sw: formData.sw,
                workers: parseInt(formData.workers) || 0,
              }
            : apt,
        ),
      );
    } else {
      // הוספה
      const newApartment = {
        id: Math.max(...apartments.map((a) => a.id)) + 1,
        name: formData.name,
        manager: formData.manager,
        sw: formData.sw,
        workers: parseInt(formData.workers) || 0,
        todayReports: 0,
        total: 3,
        status: "ok",
      };
      setApartments([...apartments, newApartment]);
    }

    setShowModal(false);
    setFormData({
      name: "",
      manager: "",
      sw: "",
      workers: "",
    });
  };

  const handleDelete = (id) => {
    if (window.confirm("האם אתה בטוח שברצונך למחוק את הדירה?")) {
      setApartments(apartments.filter((apt) => apt.id !== id));
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
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <p className="text-sm text-zinc-500">
                סה״כ {apartments.length} דירות
              </p>
              <button
                onClick={handleAddNew}
                className="flex items-center gap-2 bg-violet-600 hover:bg-violet-500 text-white text-sm px-4 py-2 rounded-lg transition-colors"
              >
                <span>+</span> הוסף דירה
              </button>
            </div>
            <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-3">
              {apartments.map((apt) => (
                <div
                  key={apt.id}
                  className="bg-[#111318] border border-zinc-800/60 rounded-xl p-5 hover:border-zinc-700/60 transition-colors"
                >
                  <div className="flex items-start justify-between mb-3">
                    <div>
                      <div className="font-semibold text-zinc-200">
                        {apt.name}
                      </div>
                      <div className="text-xs text-zinc-500 mt-0.5">
                        מנהל: {apt.manager}
                      </div>
                    </div>
                    <span
                      className={`w-2.5 h-2.5 rounded-full mt-1 shrink-0 ${
                        apt.status === "ok" ? "bg-emerald-400" : "bg-amber-400"
                      }`}
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
                          apt.status === "ok"
                            ? "text-emerald-400"
                            : "text-amber-400"
                        }
                      >
                        {apt.todayReports}/{apt.total}
                      </span>
                    </div>
                  </div>
                  <div className="mt-3 pt-3 border-t border-zinc-800/40 flex gap-2">
                    <button
                      onClick={() => handleEdit(apt)}
                      className="flex-1 text-xs text-zinc-400 hover:text-zinc-200 bg-zinc-800/50 hover:bg-zinc-700/50 rounded-lg py-1.5 transition-colors"
                    >
                      עריכה
                    </button>
                    <button
                      onClick={() => handleDelete(apt.id)}
                      className="flex-1 text-xs text-red-400 hover:text-red-300 bg-red-500/10 hover:bg-red-500/20 rounded-lg py-1.5 transition-colors"
                    >
                      מחק
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </main>
      </div>

      {/* Modal */}
      {showModal && (
        <div className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center z-50 p-4">
          <div className="bg-[#111318] border border-zinc-800/60 rounded-xl p-6 max-w-md w-full">
            <h2 className="text-xl font-semibold text-zinc-100 mb-4">
              {editingApartment ? "עריכת דירה" : "הוספת דירה חדשה"}
            </h2>

            <form onSubmit={handleSubmit} className="space-y-4">
              <div>
                <label className="block text-sm text-zinc-400 mb-1.5">
                  שם הדירה
                </label>
                <input
                  type="text"
                  required
                  value={formData.name}
                  onChange={(e) =>
                    setFormData({ ...formData, name: e.target.value })
                  }
                  className="w-full bg-zinc-800/50 border border-zinc-700/60 rounded-lg px-3 py-2 text-zinc-100 text-sm focus:outline-none focus:border-violet-500/50 transition-colors"
                  placeholder="לדוגמה: דירה א׳ - חיפה"
                />
              </div>

              <div>
                <label className="block text-sm text-zinc-400 mb-1.5">
                  שם המנהל
                </label>
                <input
                  type="text"
                  required
                  value={formData.manager}
                  onChange={(e) =>
                    setFormData({ ...formData, manager: e.target.value })
                  }
                  className="w-full bg-zinc-800/50 border border-zinc-700/60 rounded-lg px-3 py-2 text-zinc-100 text-sm focus:outline-none focus:border-violet-500/50 transition-colors"
                  placeholder="שם מלא"
                />
              </div>

              <div>
                <label className="block text-sm text-zinc-400 mb-1.5">
                  עובד סוציאלי
                </label>
                <input
                  type="text"
                  required
                  value={formData.sw}
                  onChange={(e) =>
                    setFormData({ ...formData, sw: e.target.value })
                  }
                  className="w-full bg-zinc-800/50 border border-zinc-700/60 rounded-lg px-3 py-2 text-zinc-100 text-sm focus:outline-none focus:border-violet-500/50 transition-colors"
                  placeholder="שם מלא"
                />
              </div>

              <div>
                <label className="block text-sm text-zinc-400 mb-1.5">
                  מספר עובדים
                </label>
                <input
                  type="number"
                  required
                  min="1"
                  value={formData.workers}
                  onChange={(e) =>
                    setFormData({ ...formData, workers: e.target.value })
                  }
                  className="w-full bg-zinc-800/50 border border-zinc-700/60 rounded-lg px-3 py-2 text-zinc-100 text-sm focus:outline-none focus:border-violet-500/50 transition-colors"
                  placeholder="מספר"
                />
              </div>

              <div className="flex gap-3 pt-2">
                <button
                  type="submit"
                  className="flex-1 bg-violet-600 hover:bg-violet-500 text-white text-sm px-4 py-2.5 rounded-lg transition-colors"
                >
                  {editingApartment ? "שמור שינויים" : "הוסף דירה"}
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
          </div>
        </div>
      )}
    </div>
  );
}
