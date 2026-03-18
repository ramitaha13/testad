import { useState } from "react";

const mockStats = {
  systemManager: "אדמין ראשי",
};

const initialUsers = [
  {
    id: 1,
    name: "רונית לוי",
    role: "מנהל דירה",
    apartment: "דירה א׳",
    status: "active",
    email: "ronit.levi@example.com",
    phone: "050-1234567",
  },
  {
    id: 2,
    name: "אורן פרץ",
    role: "מנהל דירה",
    apartment: "דירה ב׳",
    status: "active",
    email: "oren.peretz@example.com",
    phone: "052-2345678",
  },
  {
    id: 3,
    name: "מיכל כהן",
    role: "עובד סוציאלי",
    apartment: "דירה א׳",
    status: "active",
    email: "michal.cohen@example.com",
    phone: "054-3456789",
  },
  {
    id: 4,
    name: "יוסי דהן",
    role: "עובד",
    apartment: "דירה ג׳",
    status: "inactive",
    email: "yossi.dahan@example.com",
    phone: "050-4567890",
  },
  {
    id: 5,
    name: "נועה שרון",
    role: "עובד סוציאלי",
    apartment: "דירה ד׳",
    status: "active",
    email: "noa.sharon@example.com",
    phone: "052-5678901",
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

export default function UsersPage() {
  const [active, setActive] = useState("users");
  const [sidebarOpen, setSidebarOpen] = useState(true);
  const [users, setUsers] = useState(initialUsers);
  const [showModal, setShowModal] = useState(false);
  const [editingUser, setEditingUser] = useState(null);
  const [formData, setFormData] = useState({
    name: "",
    role: "",
    apartment: "",
    email: "",
    phone: "",
    status: "active",
  });

  const handleNavClick = (item) => {
    setActive(item.id);
    if (item.path) {
      window.location.href = item.path;
    }
  };

  const handleAddNew = () => {
    setEditingUser(null);
    setFormData({
      name: "",
      role: "",
      apartment: "",
      email: "",
      phone: "",
      status: "active",
    });
    setShowModal(true);
  };

  const handleEdit = (user) => {
    setEditingUser(user);
    setFormData({
      name: user.name,
      role: user.role,
      apartment: user.apartment,
      email: user.email,
      phone: user.phone,
      status: user.status,
    });
    setShowModal(true);
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    if (editingUser) {
      // עריכה
      setUsers(
        users.map((user) =>
          user.id === editingUser.id
            ? {
                ...user,
                name: formData.name,
                role: formData.role,
                apartment: formData.apartment,
                email: formData.email,
                phone: formData.phone,
                status: formData.status,
              }
            : user,
        ),
      );
    } else {
      // הוספה
      const newUser = {
        id: Math.max(...users.map((u) => u.id)) + 1,
        name: formData.name,
        role: formData.role,
        apartment: formData.apartment,
        email: formData.email,
        phone: formData.phone,
        status: formData.status,
      };
      setUsers([...users, newUser]);
    }

    setShowModal(false);
    setFormData({
      name: "",
      role: "",
      apartment: "",
      email: "",
      phone: "",
      status: "active",
    });
  };

  const handleDelete = (id) => {
    if (window.confirm("האם אתה בטוח שברצונך למחוק את המשתמש?")) {
      setUsers(users.filter((user) => user.id !== id));
    }
  };

  const toggleStatus = (id) => {
    setUsers(
      users.map((user) =>
        user.id === id
          ? {
              ...user,
              status: user.status === "active" ? "inactive" : "active",
            }
          : user,
      ),
    );
  };

  const roleColor = {
    "מנהל דירה": "text-violet-400",
    "עובד סוציאלי": "text-sky-400",
    עובד: "text-zinc-300",
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
                סה״כ {users.length} משתמשים
              </p>
              <button
                onClick={handleAddNew}
                className="flex items-center gap-2 bg-violet-600 hover:bg-violet-500 text-white text-sm px-4 py-2 rounded-lg transition-colors"
              >
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
                      אימייל
                    </th>
                    <th className="text-right text-xs text-zinc-500 font-medium px-5 py-3">
                      טלפון
                    </th>
                    <th className="text-right text-xs text-zinc-500 font-medium px-5 py-3">
                      סטטוס
                    </th>
                    <th className="px-5 py-3"></th>
                  </tr>
                </thead>
                <tbody>
                  {users.map((u) => (
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
                        className={`px-5 py-3 text-sm font-medium ${
                          roleColor[u.role] || "text-zinc-300"
                        }`}
                      >
                        {u.role}
                      </td>
                      <td className="px-5 py-3 text-zinc-400 text-xs">
                        {u.apartment}
                      </td>
                      <td className="px-5 py-3 text-zinc-400 text-xs">
                        {u.email}
                      </td>
                      <td className="px-5 py-3 text-zinc-400 text-xs">
                        {u.phone}
                      </td>
                      <td className="px-5 py-3">
                        <button onClick={() => toggleStatus(u.id)}>
                          {statusBadge(u.status)}
                        </button>
                      </td>
                      <td className="px-5 py-3 text-left">
                        <div className="flex items-center gap-2 justify-end">
                          <button
                            onClick={() => handleEdit(u)}
                            className="text-xs text-zinc-500 hover:text-zinc-300 transition-colors"
                          >
                            עריכה
                          </button>
                          <button
                            onClick={() => handleDelete(u.id)}
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
          <div className="bg-[#111318] border border-zinc-800/60 rounded-xl p-6 max-w-md w-full max-h-[90vh] overflow-y-auto">
            <h2 className="text-xl font-semibold text-zinc-100 mb-4">
              {editingUser ? "עריכת משתמש" : "הוספת משתמש חדש"}
            </h2>

            <form onSubmit={handleSubmit} className="space-y-4">
              <div>
                <label className="block text-sm text-zinc-400 mb-1.5">
                  שם מלא
                </label>
                <input
                  type="text"
                  required
                  value={formData.name}
                  onChange={(e) =>
                    setFormData({ ...formData, name: e.target.value })
                  }
                  className="w-full bg-zinc-800/50 border border-zinc-700/60 rounded-lg px-3 py-2 text-zinc-100 text-sm focus:outline-none focus:border-violet-500/50 transition-colors"
                  placeholder="שם פרטי ומשפחה"
                />
              </div>

              <div>
                <label className="block text-sm text-zinc-400 mb-1.5">
                  תפקיד
                </label>
                <select
                  required
                  value={formData.role}
                  onChange={(e) =>
                    setFormData({ ...formData, role: e.target.value })
                  }
                  className="w-full bg-zinc-800/50 border border-zinc-700/60 rounded-lg px-3 py-2 text-zinc-100 text-sm focus:outline-none focus:border-violet-500/50 transition-colors"
                >
                  <option value="">בחר תפקיד</option>
                  <option value="מנהל דירה">מנהל דירה</option>
                  <option value="עובד סוציאלי">עובד סוציאלי</option>
                  <option value="עובד">עובד</option>
                </select>
              </div>

              <div>
                <label className="block text-sm text-zinc-400 mb-1.5">
                  דירה
                </label>
                <input
                  type="text"
                  required
                  value={formData.apartment}
                  onChange={(e) =>
                    setFormData({ ...formData, apartment: e.target.value })
                  }
                  className="w-full bg-zinc-800/50 border border-zinc-700/60 rounded-lg px-3 py-2 text-zinc-100 text-sm focus:outline-none focus:border-violet-500/50 transition-colors"
                  placeholder="לדוגמה: דירה א׳"
                />
              </div>

              <div>
                <label className="block text-sm text-zinc-400 mb-1.5">
                  אימייל
                </label>
                <input
                  type="email"
                  required
                  value={formData.email}
                  onChange={(e) =>
                    setFormData({ ...formData, email: e.target.value })
                  }
                  className="w-full bg-zinc-800/50 border border-zinc-700/60 rounded-lg px-3 py-2 text-zinc-100 text-sm focus:outline-none focus:border-violet-500/50 transition-colors"
                  placeholder="example@email.com"
                />
              </div>

              <div>
                <label className="block text-sm text-zinc-400 mb-1.5">
                  טלפון
                </label>
                <input
                  type="tel"
                  required
                  value={formData.phone}
                  onChange={(e) =>
                    setFormData({ ...formData, phone: e.target.value })
                  }
                  className="w-full bg-zinc-800/50 border border-zinc-700/60 rounded-lg px-3 py-2 text-zinc-100 text-sm focus:outline-none focus:border-violet-500/50 transition-colors"
                  placeholder="050-1234567"
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
                  <option value="active">פעיל</option>
                  <option value="inactive">לא פעיל</option>
                </select>
              </div>

              <div className="flex gap-3 pt-2">
                <button
                  type="submit"
                  className="flex-1 bg-violet-600 hover:bg-violet-500 text-white text-sm px-4 py-2.5 rounded-lg transition-colors"
                >
                  {editingUser ? "שמור שינויים" : "הוסף משתמש"}
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
