export default function HomePage() {
  return (
    <div
      dir="rtl"
      className="min-h-screen flex items-center justify-center bg-[#0d0f14]"
      style={{ fontFamily: "'IBM Plex Sans Hebrew', 'Rubik', sans-serif" }}
    >
      <div className="text-center space-y-8 p-8">
        {/* Logo/Title */}
        <div className="mb-12">
          <div className="w-20 h-20 mx-auto mb-4 rounded-2xl bg-gradient-to-br from-violet-500 via-purple-500 to-sky-500 flex items-center justify-center text-white font-bold text-3xl">
            מ
          </div>
          <h1 className="text-3xl font-bold text-zinc-100 mb-2">
            מערכת ניהול דירות
          </h1>
          <p className="text-zinc-500 text-sm">בחר את סוג המשתמש שלך להמשך</p>
        </div>

        {/* Buttons */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 max-w-7xl mx-auto">
          {/* Admin Button */}
          <button
            onClick={() => (window.location.href = "/admin")}
            className="group relative bg-[#111318] border border-zinc-800/60 rounded-2xl p-8 hover:border-violet-500/40 transition-all duration-300 hover:scale-105"
          >
            <div className="absolute inset-0 bg-gradient-to-br from-violet-600/10 to-purple-600/10 rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity"></div>

            <div className="relative">
              <div className="w-16 h-16 mx-auto mb-4 rounded-xl bg-gradient-to-br from-violet-500 to-indigo-600 flex items-center justify-center text-white text-2xl">
                ⬡
              </div>

              <h2 className="text-xl font-semibold text-zinc-100 mb-2">
                מנהל מערכת
              </h2>

              <p className="text-sm text-zinc-500 mb-4">
                ניהול דירות, משתמשים ודוחות
              </p>

              <div className="flex items-center justify-center gap-2 text-violet-400 text-sm font-medium">
                <span>כניסה למערכת</span>
                <span className="group-hover:translate-x-1 transition-transform">
                  ←
                </span>
              </div>
            </div>
          </button>

          {/* Social Worker Button */}
          <button
            onClick={() => (window.location.href = "/socialWorkerAdmin")}
            className="group relative bg-[#111318] border border-zinc-800/60 rounded-2xl p-8 hover:border-sky-500/40 transition-all duration-300 hover:scale-105"
          >
            <div className="absolute inset-0 bg-gradient-to-br from-sky-600/10 to-cyan-600/10 rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity"></div>

            <div className="relative">
              <div className="w-16 h-16 mx-auto mb-4 rounded-xl bg-gradient-to-br from-sky-500 to-cyan-600 flex items-center justify-center text-white text-2xl">
                ◈
              </div>

              <h2 className="text-xl font-semibold text-zinc-100 mb-2">
                עובד סוציאלי
              </h2>

              <p className="text-sm text-zinc-500 mb-4">
                מעקב אחר דיירים ודוחות
              </p>

              <div className="flex items-center justify-center gap-2 text-sky-400 text-sm font-medium">
                <span>כניסה למערכת</span>
                <span className="group-hover:translate-x-1 transition-transform">
                  ←
                </span>
              </div>
            </div>
          </button>

          {/* House Manager Button */}
          <button
            onClick={() => (window.location.href = "/houseManagerDashboard")}
            className="group relative bg-[#111318] border border-zinc-800/60 rounded-2xl p-8 hover:border-emerald-500/40 transition-all duration-300 hover:scale-105"
          >
            <div className="absolute inset-0 bg-gradient-to-br from-emerald-600/10 to-teal-600/10 rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity"></div>

            <div className="relative">
              <div className="w-16 h-16 mx-auto mb-4 rounded-xl bg-gradient-to-br from-emerald-500 to-teal-600 flex items-center justify-center text-white text-2xl">
                ⌂
              </div>

              <h2 className="text-xl font-semibold text-zinc-100 mb-2">
                אב/אם בית
              </h2>

              <p className="text-sm text-zinc-500 mb-4">
                ניהול דירה ודוחות משמרות
              </p>

              <div className="flex items-center justify-center gap-2 text-emerald-400 text-sm font-medium">
                <span>כניסה למערכת</span>
                <span className="group-hover:translate-x-1 transition-transform">
                  ←
                </span>
              </div>
            </div>
          </button>

          {/* Instructor Button */}
          <button
            onClick={() => (window.location.href = "/instructorDashboard")}
            className="group relative bg-[#111318] border border-zinc-800/60 rounded-2xl p-8 hover:border-amber-500/40 transition-all duration-300 hover:scale-105"
          >
            <div className="absolute inset-0 bg-gradient-to-br from-amber-600/10 to-orange-600/10 rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity"></div>

            <div className="relative">
              <div className="w-16 h-16 mx-auto mb-4 rounded-xl bg-gradient-to-br from-amber-500 to-orange-600 flex items-center justify-center text-white text-2xl">
                👤
              </div>

              <h2 className="text-xl font-semibold text-zinc-100 mb-2">
                מדריך
              </h2>

              <p className="text-sm text-zinc-500 mb-4">מילוי דוחות משמרת</p>

              <div className="flex items-center justify-center gap-2 text-amber-400 text-sm font-medium">
                <span>כניסה למערכת</span>
                <span className="group-hover:translate-x-1 transition-transform">
                  ←
                </span>
              </div>
            </div>
          </button>
        </div>

        {/* Footer */}
        <div className="mt-12 text-xs text-zinc-600">
          מערכת ניהול דירות שיקום © 2026
        </div>
      </div>
    </div>
  );
}
