import { useState, useCallback, useEffect, useRef } from "react";

const DAYS_OF_WEEK = [
  "יום א'",
  "יום ב'",
  "יום ג'",
  "יום ד'",
  "יום ה'",
  "יום ו'",
  "שבת",
];

const SHIFTS = [
  { id: "morning", label: "בוקר", time: "08:30-14:00" },
  { id: "afternoon1", label: "צהריים 1", time: "14:00-20:30" },
  { id: "afternoon2", label: "צהריים 2", time: "14:00-20:30" },
  { id: "night", label: "לילה", time: "20:30-08:30" },
];

// Simplified shifts for the availability/constraints panel
const AVAIL_SHIFTS = [
  { id: "morning", label: "בוקר", maps: ["morning"] },
  { id: "afternoon", label: "צהריים", maps: ["afternoon1", "afternoon2"] },
  { id: "night", label: "לילה", maps: ["night"] },
];

const SHIFT_COLORS = {
  morning: {
    bg: "rgba(251,191,36,0.12)",
    border: "#F59E0B",
    text: "#92400E",
    icon: "☀️",
  },
  afternoon1: {
    bg: "rgba(59,130,246,0.10)",
    border: "#3B82F6",
    text: "#1E40AF",
    icon: "🌤️",
  },
  afternoon2: {
    bg: "rgba(139,92,246,0.10)",
    border: "#8B5CF6",
    text: "#5B21B6",
    icon: "⛅",
  },
  afternoon: {
    bg: "rgba(59,130,246,0.10)",
    border: "#3B82F6",
    text: "#1E40AF",
    icon: "🌤️",
  },
  night: {
    bg: "rgba(30,41,59,0.12)",
    border: "#475569",
    text: "#1E293B",
    icon: "🌙",
  },
};

function getWeekDates(startDate) {
  const dates = [];
  const d = new Date(startDate);
  for (let i = 0; i < 7; i++) {
    dates.push(new Date(d));
    d.setDate(d.getDate() + 1);
  }
  return dates;
}

function formatDate(date) {
  return `${date.getDate()}.${date.getMonth() + 1}`;
}

function getNextSunday() {
  const today = new Date();
  const day = today.getDay();
  const diff = day === 0 ? 0 : 7 - day;
  const sunday = new Date(today);
  sunday.setDate(today.getDate() + diff);
  return sunday.toISOString().split("T")[0];
}

function shuffle(arr) {
  const a = [...arr];
  for (let i = a.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [a[i], a[j]] = [a[j], a[i]];
  }
  return a;
}

function isWorkerAvailable(worker, day, shiftId, availability, schedule) {
  // Check user-defined availability constraints
  const availKey =
    shiftId === "afternoon1" || shiftId === "afternoon2"
      ? "afternoon"
      : shiftId;
  const avail = availability[worker]?.[`${day}-${availKey}`];
  if (avail === false) return false;

  const dayIdx = DAYS_OF_WEEK.indexOf(day);

  // Block morning if worker did night shift the previous day
  if (shiftId === "morning") {
    if (dayIdx > 0) {
      const prevDay = DAYS_OF_WEEK[dayIdx - 1];
      if (schedule[prevDay]?.night?.split(" + ").includes(worker)) return false;
    }
  }

  // Block night if worker is already assigned morning the next day
  if (shiftId === "night") {
    if (dayIdx < DAYS_OF_WEEK.length - 1) {
      const nextDay = DAYS_OF_WEEK[dayIdx + 1];
      if (schedule[nextDay]?.morning?.split(" + ").includes(worker))
        return false;
    }
  }

  return true;
}

function scoreSchedule(schedule, workers) {
  // Lower score = more fair distribution
  const counts = {};
  workers.forEach((w) => {
    counts[w] = { total: 0, morning: 0, afternoon: 0, night: 0 };
  });

  DAYS_OF_WEEK.forEach((day) => {
    SHIFTS.forEach((shift) => {
      const cell = schedule[day]?.[shift.id];
      if (!cell) return;
      // Handle multi-worker cells (e.g. "ראמי + גיל")
      const cellWorkers = cell.split(" + ");
      cellWorkers.forEach((w) => {
        if (w && counts[w]) {
          counts[w].total++;
          if (shift.id === "morning") counts[w].morning++;
          else if (shift.id === "afternoon1" || shift.id === "afternoon2")
            counts[w].afternoon++;
          else counts[w].night++;
        }
      });
    });
  });

  const vals = Object.values(counts);
  if (vals.length === 0) return 0;

  // Calculate variance for total shifts + each shift type
  const variance = (arr) => {
    if (arr.length === 0) return 0;
    const mean = arr.reduce((s, v) => s + v, 0) / arr.length;
    return arr.reduce((s, v) => s + (v - mean) ** 2, 0) / arr.length;
  };

  const totalVar = variance(vals.map((v) => v.total));
  const morningVar = variance(vals.map((v) => v.morning));
  const afternoonVar = variance(vals.map((v) => v.afternoon));
  const nightVar = variance(vals.map((v) => v.night));

  // Penalize empty cells heavily
  let emptyCells = 0;
  DAYS_OF_WEEK.forEach((day) => {
    SHIFTS.forEach((shift) => {
      if (!schedule[day]?.[shift.id]) emptyCells++;
    });
  });

  // Weighted score: total fairness matters most, then per-shift fairness, empty cells are worst
  return (
    emptyCells * 1000 +
    totalVar * 10 +
    morningVar * 3 +
    afternoonVar * 3 +
    nightVar * 5
  );
}

function buildOneSchedule(workers, availability) {
  const schedule = {};
  DAYS_OF_WEEK.forEach((day) => {
    schedule[day] = {};
    SHIFTS.forEach((shift) => {
      schedule[day][shift.id] = "";
    });
  });

  if (workers.length === 0) return schedule;

  const workerCount = {};
  workers.forEach((w) => {
    workerCount[w] = {
      morning: 0,
      afternoon1: 0,
      afternoon2: 0,
      night: 0,
      total: 0,
    };
  });

  const usedToday = {};
  DAYS_OF_WEEK.forEach((d) => (usedToday[d] = new Set()));

  // Randomize the order we process days for variety
  const dayOrder = shuffle([...DAYS_OF_WEEK]);
  const shiftOrder = ["night", "morning", "afternoon1", "afternoon2"];
  const shuffledShiftOrder = shuffle([...shiftOrder]);

  const isWeekend = (day) => day === "יום ו'" || day === "שבת";

  // Helper to pick one worker via weighted random from available list
  const pickWeighted = (available, shiftId) => {
    const maxTotal = Math.max(...available.map((w) => workerCount[w].total), 1);
    const weights = available.map((w) => {
      const totalPenalty = workerCount[w].total;
      const shiftPenalty = workerCount[w][shiftId] || 0;
      const weight = Math.max(
        0.1,
        maxTotal + 2 - totalPenalty - shiftPenalty * 0.5,
      );
      return weight * (0.5 + Math.random());
    });
    const totalWeight = weights.reduce((s, w) => s + w, 0);
    let r = Math.random() * totalWeight;
    for (let i = 0; i < available.length; i++) {
      r -= weights[i];
      if (r <= 0) return available[i];
    }
    return available[available.length - 1];
  };

  for (const day of dayOrder) {
    // On weekends, force morning first so afternoon can copy from it
    const shiftsForDay = isWeekend(day)
      ? ["morning", "afternoon1", "afternoon2", "night"]
      : shuffledShiftOrder;

    for (const shiftId of shiftsForDay) {
      // Weekend: morning picks 2 workers, afternoon copies them
      if (isWeekend(day) && shiftId === "morning") {
        let available = workers.filter((w) => {
          return isWorkerAvailable(w, day, shiftId, availability, schedule);
        });
        // Fallback: if not enough available, relax constraints gradually
        if (available.length < 2) {
          available = workers.filter((w) => {
            const availKey = "morning";
            const avail = availability[w]?.[`${day}-${availKey}`];
            return avail !== false;
          });
        }
        if (available.length < 2) {
          available = [...workers];
        }
        const chosen = [];
        if (available.length > 0) {
          const first = pickWeighted(available, shiftId);
          chosen.push(first);
          const remaining = available.filter((w) => w !== first);
          if (remaining.length > 0) {
            const second = pickWeighted(remaining, shiftId);
            chosen.push(second);
          }
        }
        if (chosen.length > 0) {
          schedule[day][shiftId] = chosen.join(" + ");
          chosen.forEach((w) => {
            usedToday[day].add(w);
            workerCount[w][shiftId]++;
            workerCount[w].total++;
          });
        }
        continue;
      }

      if (
        isWeekend(day) &&
        (shiftId === "afternoon1" || shiftId === "afternoon2")
      ) {
        const morningVal = schedule[day]?.morning || "";
        if (morningVal) {
          schedule[day][shiftId] = morningVal;
          // Count each worker
          morningVal.split(" + ").forEach((w) => {
            if (w && workerCount[w]) {
              workerCount[w][shiftId]++;
              workerCount[w].total++;
            }
          });
        }
        continue;
      }

      const available = workers.filter((w) => {
        if (usedToday[day].has(w)) return false;
        return isWorkerAvailable(w, day, shiftId, availability, schedule);
      });

      let chosen = null;

      if (available.length > 0) {
        chosen = pickWeighted(available, shiftId);
      } else {
        // Fallback 1: respect availability constraints but relax night-morning rule
        const fallback1 = workers.filter((w) => {
          if (usedToday[day].has(w)) return false;
          const availKey =
            shiftId === "afternoon1" || shiftId === "afternoon2"
              ? "afternoon"
              : shiftId;
          const avail = availability[w]?.[`${day}-${availKey}`];
          if (avail === false) return false;
          return true;
        });
        if (fallback1.length > 0) {
          chosen = pickWeighted(fallback1, shiftId);
        } else {
          // Fallback 2: anyone not yet used today
          const fallback2 = shuffle(
            workers.filter((w) => !usedToday[day].has(w)),
          );
          if (fallback2.length > 0) {
            chosen = fallback2[0];
          } else {
            // Fallback 3: anyone (will double up on a day)
            chosen = shuffle([...workers])[0] || null;
          }
        }
      }

      if (chosen) {
        schedule[day][shiftId] = chosen;
        usedToday[day].add(chosen);
        workerCount[chosen][shiftId]++;
        workerCount[chosen].total++;
      }
    }
  }

  return schedule;
}

function generateSchedule(workers, availability) {
  if (workers.length === 0) {
    const schedule = {};
    DAYS_OF_WEEK.forEach((day) => {
      schedule[day] = {};
      SHIFTS.forEach((shift) => {
        schedule[day][shift.id] = "";
      });
    });
    return schedule;
  }

  // Generate multiple candidates and pick the fairest one
  const NUM_CANDIDATES = 80;
  let bestSchedule = null;
  let bestScore = Infinity;

  for (let i = 0; i < NUM_CANDIDATES; i++) {
    const candidate = buildOneSchedule(workers, availability);
    const score = scoreSchedule(candidate, workers);
    if (score < bestScore) {
      bestScore = score;
      bestSchedule = candidate;
    }
  }

  // Post-optimization: try random swaps to improve fairness (skip weekends - they have multi-worker cells)
  const isWeekend = (day) => day === "יום ו'" || day === "שבת";
  const SWAP_ROUNDS = 200;
  for (let r = 0; r < SWAP_ROUNDS; r++) {
    const weekdays = shuffle(DAYS_OF_WEEK.filter((d) => !isWeekend(d)));
    if (weekdays.length === 0) break;
    const day = weekdays[0];
    const shiftIds = SHIFTS.map((s) => s.id);
    const s1 = shiftIds[Math.floor(Math.random() * shiftIds.length)];
    const s2 = shiftIds[Math.floor(Math.random() * shiftIds.length)];
    if (s1 === s2) continue;

    const w1 = bestSchedule[day][s1];
    const w2 = bestSchedule[day][s2];
    if (!w1 || !w2 || w1 === w2) continue;
    if (w1.includes(" + ") || w2.includes(" + ")) continue;

    // Check if swap is valid (both workers available for swapped shifts)
    if (!isWorkerAvailable(w1, day, s2, availability, bestSchedule)) continue;
    if (!isWorkerAvailable(w2, day, s1, availability, bestSchedule)) continue;

    // Try the swap
    const trial = JSON.parse(JSON.stringify(bestSchedule));
    trial[day][s1] = w2;
    trial[day][s2] = w1;

    // Verify night-to-morning constraint still holds after swap
    const dayIdx = DAYS_OF_WEEK.indexOf(day);
    let valid = true;
    if (dayIdx < 6) {
      const nextDay = DAYS_OF_WEEK[dayIdx + 1];
      const nightWorkers = (trial[day].night || "").split(" + ");
      const morningWorkers = (trial[nextDay]?.morning || "").split(" + ");
      if (nightWorkers.some((w) => morningWorkers.includes(w))) valid = false;
    }
    if (dayIdx > 0) {
      const prevDay = DAYS_OF_WEEK[dayIdx - 1];
      const morningWorkers = (trial[day].morning || "").split(" + ");
      const prevNightWorkers = (trial[prevDay]?.night || "").split(" + ");
      if (morningWorkers.some((w) => prevNightWorkers.includes(w)))
        valid = false;
    }
    if (!valid) continue;

    const newScore = scoreSchedule(trial, workers);
    if (newScore < bestScore) {
      bestScore = newScore;
      Object.assign(bestSchedule, trial);
    }
  }

  // Cross-day swap optimization (skip weekends)
  const CROSS_ROUNDS = 150;
  for (let r = 0; r < CROSS_ROUNDS; r++) {
    const candidates = shuffle(DAYS_OF_WEEK.filter((d) => !isWeekend(d)));
    if (candidates.length < 2) break;
    const [d1, d2] = candidates.slice(0, 2);
    const shiftId = SHIFTS[Math.floor(Math.random() * SHIFTS.length)].id;

    const w1 = bestSchedule[d1][shiftId];
    const w2 = bestSchedule[d2][shiftId];
    if (!w1 || !w2 || w1 === w2) continue;
    if (w1.includes(" + ") || w2.includes(" + ")) continue;

    // Check constraints
    if (!isWorkerAvailable(w1, d2, shiftId, availability, bestSchedule))
      continue;
    if (!isWorkerAvailable(w2, d1, shiftId, availability, bestSchedule))
      continue;

    // Check not already assigned to another shift that day
    const d1Shifts = SHIFTS.map((s) => s.id).filter((s) => s !== shiftId);
    const d2Shifts = SHIFTS.map((s) => s.id).filter((s) => s !== shiftId);
    if (d2Shifts.some((s) => bestSchedule[d2][s]?.split(" + ").includes(w1)))
      continue;
    if (d1Shifts.some((s) => bestSchedule[d1][s]?.split(" + ").includes(w2)))
      continue;

    const trial = JSON.parse(JSON.stringify(bestSchedule));
    trial[d1][shiftId] = w2;
    trial[d2][shiftId] = w1;

    // Verify night-morning constraints
    let valid = true;
    for (const d of [d1, d2]) {
      const idx = DAYS_OF_WEEK.indexOf(d);
      if (idx < 6) {
        const next = DAYS_OF_WEEK[idx + 1];
        const nightW = (trial[d].night || "").split(" + ");
        const mornW = (trial[next]?.morning || "").split(" + ");
        if (nightW.some((w) => mornW.includes(w))) {
          valid = false;
          break;
        }
      }
      if (idx > 0) {
        const prev = DAYS_OF_WEEK[idx - 1];
        const mornW = (trial[d].morning || "").split(" + ");
        const prevNightW = (trial[prev]?.night || "").split(" + ");
        if (mornW.some((w) => prevNightW.includes(w))) {
          valid = false;
          break;
        }
      }
    }
    if (!valid) continue;

    const newScore = scoreSchedule(trial, workers);
    if (newScore < bestScore) {
      bestScore = newScore;
      Object.assign(bestSchedule, trial);
    }
  }

  return bestSchedule;
}

function WorkerBadge({ name, onRemove }) {
  const hue = [...name].reduce((s, c) => s + c.charCodeAt(0), 0) % 360;
  return (
    <span
      className="inline-flex items-center gap-1 px-3 py-1.5 rounded-full text-sm font-medium transition-all duration-200"
      style={{
        background: `hsl(${hue}, 55%, 94%)`,
        color: `hsl(${hue}, 60%, 30%)`,
        border: `1.5px solid hsl(${hue}, 50%, 82%)`,
      }}
    >
      {name}
      {onRemove && (
        <button
          onClick={(e) => {
            e.stopPropagation();
            onRemove();
          }}
          className="mr-1 w-4 h-4 rounded-full flex items-center justify-center text-xs opacity-50 hover:opacity-100 transition-opacity"
          style={{ background: `hsl(${hue}, 40%, 80%)` }}
        >
          ✕
        </button>
      )}
    </span>
  );
}

function AvailabilityPanel({ workers, availability, setAvailability }) {
  const [expandedWorker, setExpandedWorker] = useState(null);

  const toggleAvail = (worker, day, shiftId) => {
    const key = `${day}-${shiftId}`;
    setAvailability((prev) => {
      const workerAvail = { ...(prev[worker] || {}) };
      workerAvail[key] = workerAvail[key] === false ? true : false;
      return { ...prev, [worker]: workerAvail };
    });
  };

  const toggleAllDay = (worker, day) => {
    setAvailability((prev) => {
      const workerAvail = { ...(prev[worker] || {}) };
      const allAvailable = AVAIL_SHIFTS.every(
        (s) => workerAvail[`${day}-${s.id}`] !== false,
      );
      AVAIL_SHIFTS.forEach((s) => {
        workerAvail[`${day}-${s.id}`] = allAvailable ? false : true;
      });
      return { ...prev, [worker]: workerAvail };
    });
  };

  const toggleAllShift = (worker, shiftId) => {
    setAvailability((prev) => {
      const workerAvail = { ...(prev[worker] || {}) };
      const allAvailable = DAYS_OF_WEEK.every(
        (d) => workerAvail[`${d}-${shiftId}`] !== false,
      );
      DAYS_OF_WEEK.forEach((d) => {
        workerAvail[`${d}-${shiftId}`] = allAvailable ? false : true;
      });
      return { ...prev, [worker]: workerAvail };
    });
  };

  const getUnavailCount = (worker) => {
    const wa = availability[worker] || {};
    return Object.values(wa).filter((v) => v === false).length;
  };

  return (
    <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-5">
      <div className="flex items-center justify-between mb-4">
        <h2 className="text-base font-bold text-gray-800">
          📋 אילוצים וזמינות
        </h2>
        <span className="text-xs text-gray-400">לחץ על עובד כדי לערוך</span>
      </div>

      <div className="space-y-2">
        {workers.map((worker) => {
          const hue =
            [...worker].reduce((s, c) => s + c.charCodeAt(0), 0) % 360;
          const isExpanded = expandedWorker === worker;
          const unavailCount = getUnavailCount(worker);

          return (
            <div
              key={worker}
              className="rounded-xl border border-gray-100 overflow-hidden transition-all duration-200"
            >
              <button
                onClick={() => setExpandedWorker(isExpanded ? null : worker)}
                className="w-full flex items-center justify-between px-4 py-3 hover:bg-gray-50/50 transition-colors"
              >
                <div className="flex items-center gap-3">
                  <div
                    className="w-8 h-8 rounded-full flex items-center justify-center text-sm font-bold"
                    style={{
                      background: `hsl(${hue}, 55%, 92%)`,
                      color: `hsl(${hue}, 60%, 35%)`,
                    }}
                  >
                    {worker[0]}
                  </div>
                  <span className="font-semibold text-gray-800 text-sm">
                    {worker}
                  </span>
                  {unavailCount > 0 && (
                    <span className="text-[10px] bg-red-50 text-red-600 px-2 py-0.5 rounded-full font-medium">
                      {unavailCount} חסימות
                    </span>
                  )}
                </div>
                <span
                  className="text-gray-400 text-lg transition-transform duration-200"
                  style={{
                    transform: isExpanded ? "rotate(180deg)" : "rotate(0deg)",
                  }}
                >
                  ▾
                </span>
              </button>

              {isExpanded && (
                <div className="px-4 pb-4">
                  <div className="text-[11px] text-gray-400 mb-2 flex items-center gap-1">
                    <span className="inline-block w-3 h-3 rounded bg-emerald-100 border border-emerald-300"></span>{" "}
                    זמין
                    <span className="inline-block w-3 h-3 rounded bg-red-100 border border-red-300 mr-3"></span>{" "}
                    לא זמין
                    <span className="text-gray-300 mr-2">|</span> לחץ כדי לשנות
                  </div>
                  <div className="overflow-x-auto">
                    <table
                      className="w-full text-xs border-collapse"
                      style={{ minWidth: "500px" }}
                    >
                      <thead>
                        <tr>
                          <th
                            className="py-1.5 px-2 text-right text-gray-400 font-medium"
                            style={{ width: "80px" }}
                          ></th>
                          {DAYS_OF_WEEK.map((day) => (
                            <th key={day} className="py-1.5 px-1 text-center">
                              <button
                                onClick={() => toggleAllDay(worker, day)}
                                className="text-gray-600 font-semibold hover:text-blue-600 transition-colors text-[11px]"
                                title="לחץ להחליף את כל היום"
                              >
                                {day.replace("יום ", "").replace("'", "")}
                              </button>
                            </th>
                          ))}
                        </tr>
                      </thead>
                      <tbody>
                        {AVAIL_SHIFTS.map((shift) => {
                          const colors = SHIFT_COLORS[shift.id];
                          return (
                            <tr key={shift.id}>
                              <td className="py-1 px-2">
                                <button
                                  onClick={() =>
                                    toggleAllShift(worker, shift.id)
                                  }
                                  className="flex items-center gap-1 hover:opacity-70 transition-opacity"
                                  title="לחץ להחליף את כל המשמרת"
                                >
                                  <span className="text-xs">{colors.icon}</span>
                                  <span
                                    className="font-medium"
                                    style={{
                                      color: colors.text,
                                      fontSize: "10px",
                                    }}
                                  >
                                    {shift.label}
                                  </span>
                                </button>
                              </td>
                              {DAYS_OF_WEEK.map((day) => {
                                const key = `${day}-${shift.id}`;
                                const isAvailable =
                                  availability[worker]?.[key] !== false;
                                return (
                                  <td
                                    key={key}
                                    className="py-1 px-1 text-center"
                                  >
                                    <button
                                      onClick={() =>
                                        toggleAvail(worker, day, shift.id)
                                      }
                                      className="w-full h-8 rounded-md transition-all duration-150 flex items-center justify-center text-sm"
                                      style={{
                                        background: isAvailable
                                          ? "rgba(16,185,129,0.1)"
                                          : "rgba(239,68,68,0.1)",
                                        border: `1.5px solid ${isAvailable ? "#6ee7b7" : "#fca5a5"}`,
                                        color: isAvailable
                                          ? "#059669"
                                          : "#dc2626",
                                      }}
                                    >
                                      {isAvailable ? "✓" : "✕"}
                                    </button>
                                  </td>
                                );
                              })}
                            </tr>
                          );
                        })}
                      </tbody>
                    </table>
                  </div>
                </div>
              )}
            </div>
          );
        })}
      </div>
    </div>
  );
}

function CellEditor({ value, workers, onChange, shiftInfo }) {
  const [isOpen, setIsOpen] = useState(false);
  const ref = useRef(null);
  const colors = SHIFT_COLORS[shiftInfo.id];

  useEffect(() => {
    function handleClick(e) {
      if (ref.current && !ref.current.contains(e.target)) setIsOpen(false);
    }
    document.addEventListener("mousedown", handleClick);
    return () => document.removeEventListener("mousedown", handleClick);
  }, []);

  return (
    <div ref={ref} className="relative">
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="w-full text-center py-2.5 px-2 rounded-lg text-sm font-semibold transition-all duration-200 min-h-[42px] cursor-pointer"
        style={{
          background: value ? colors.bg : "rgba(148,163,184,0.08)",
          border: `1.5px solid ${value ? colors.border + "55" : "#e2e8f0"}`,
          color: value ? colors.text : "#94a3b8",
        }}
      >
        {value || "—"}
      </button>
      {isOpen && (
        <div
          className="absolute z-50 top-full mt-1 right-0 bg-white rounded-xl shadow-2xl border border-gray-100 overflow-hidden min-w-[140px]"
          style={{ direction: "rtl" }}
        >
          <button
            onClick={() => {
              onChange("");
              setIsOpen(false);
            }}
            className="w-full text-right px-4 py-2.5 text-sm text-gray-400 hover:bg-gray-50 transition-colors border-b border-gray-50"
          >
            ריק
          </button>
          {workers.map((w) => (
            <button
              key={w}
              onClick={() => {
                onChange(w);
                setIsOpen(false);
              }}
              className="w-full text-right px-4 py-2.5 text-sm hover:bg-gray-50 transition-colors font-medium"
              style={{ color: value === w ? colors.border : "#334155" }}
            >
              {w} {value === w ? "✓" : ""}
            </button>
          ))}
        </div>
      )}
    </div>
  );
}

function NoteEditor({ value, onChange }) {
  const [editing, setEditing] = useState(false);
  const inputRef = useRef(null);

  useEffect(() => {
    if (editing && inputRef.current) inputRef.current.focus();
  }, [editing]);

  if (editing) {
    return (
      <input
        ref={inputRef}
        className="w-full text-xs px-2 py-1 border border-amber-300 rounded bg-amber-50/50 text-amber-900 outline-none"
        style={{ direction: "rtl" }}
        value={value}
        onChange={(e) => onChange(e.target.value)}
        onBlur={() => setEditing(false)}
        onKeyDown={(e) => e.key === "Enter" && setEditing(false)}
        placeholder="הערה..."
      />
    );
  }

  return (
    <button
      onClick={() => setEditing(true)}
      className="w-full text-xs px-2 py-0.5 rounded text-right transition-colors truncate"
      style={{
        color: value ? "#92400E" : "#cbd5e1",
        background: value ? "rgba(251,191,36,0.08)" : "transparent",
      }}
    >
      {value || "＋ הערה"}
    </button>
  );
}

export default function ScheduleGenerator() {
  const [title, setTitle] = useState("דירת מירון 9 א'");
  const [workers, setWorkers] = useState([]);
  const [newWorker, setNewWorker] = useState("");
  const [startDate, setStartDate] = useState(getNextSunday());
  const [schedule, setSchedule] = useState({});
  const [notes, setNotes] = useState({});
  const [headerNotes, setHeaderNotes] = useState({});
  const [availability, setAvailability] = useState({});
  const [generated, setGenerated] = useState(false);
  const [showStats, setShowStats] = useState(false);

  const weekDates = getWeekDates(startDate);

  const addWorker = useCallback(() => {
    const trimmed = newWorker.trim();
    if (trimmed && !workers.includes(trimmed)) {
      setWorkers((prev) => [...prev, trimmed]);
      setNewWorker("");
    }
  }, [newWorker, workers]);

  const removeWorker = useCallback((name) => {
    setWorkers((prev) => prev.filter((w) => w !== name));
    setAvailability((prev) => {
      const next = { ...prev };
      delete next[name];
      return next;
    });
  }, []);

  const handleGenerate = useCallback(() => {
    const s = generateSchedule(workers, availability);
    setSchedule(s);
    setGenerated(true);
  }, [workers, availability]);

  const handleCellChange = useCallback((day, shiftId, value) => {
    setSchedule((prev) => ({
      ...prev,
      [day]: { ...prev[day], [shiftId]: value },
    }));
  }, []);

  const handleNoteChange = useCallback((day, shiftId, value) => {
    setNotes((prev) => ({
      ...prev,
      [`${day}-${shiftId}`]: value,
    }));
  }, []);

  const handleHeaderNoteChange = useCallback((day, value) => {
    setHeaderNotes((prev) => ({ ...prev, [day]: value }));
  }, []);

  const getWorkerStats = useCallback(() => {
    const stats = {};
    workers.forEach((w) => {
      stats[w] = {
        morning: 0,
        afternoon1: 0,
        afternoon2: 0,
        night: 0,
        total: 0,
      };
    });
    DAYS_OF_WEEK.forEach((day) => {
      if (!schedule[day]) return;
      SHIFTS.forEach((shift) => {
        const cell = schedule[day][shift.id];
        if (!cell) return;
        cell.split(" + ").forEach((worker) => {
          if (worker && stats[worker]) {
            stats[worker][shift.id]++;
            stats[worker].total++;
          }
        });
      });
    });
    return stats;
  }, [schedule, workers]);

  const dateRange =
    weekDates.length > 0
      ? `${formatDate(weekDates[0])}-${formatDate(weekDates[6])}.${weekDates[0].getFullYear()}`
      : "";

  return (
    <div
      className="min-h-screen font-sans"
      style={{
        direction: "rtl",
        background:
          "linear-gradient(145deg, #f8fafc 0%, #eef2f7 50%, #e8edf5 100%)",
        fontFamily: "'Noto Sans Hebrew', 'Segoe UI', Tahoma, sans-serif",
      }}
    >
      <link
        href="https://fonts.googleapis.com/css2?family=Noto+Sans+Hebrew:wght@300;400;500;600;700;800&display=swap"
        rel="stylesheet"
      />

      {/* Header */}
      <div
        className="relative overflow-hidden"
        style={{
          background:
            "linear-gradient(135deg, #0f172a 0%, #1e3a5f 50%, #1a365d 100%)",
        }}
      >
        <div
          className="absolute inset-0 opacity-10"
          style={{
            backgroundImage:
              "radial-gradient(circle at 20% 50%, #3b82f6 0%, transparent 50%), radial-gradient(circle at 80% 20%, #f59e0b 0%, transparent 40%)",
          }}
        />
        <div className="relative max-w-7xl mx-auto px-4 py-6">
          <div className="flex items-center justify-between flex-wrap gap-3">
            <div>
              <input
                className="text-2xl font-bold bg-transparent text-white border-none outline-none placeholder-white/40 w-full"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                placeholder="שם הדירה / מחלקה"
              />
              <div className="text-white/50 text-sm mt-1 font-light">
                סידור עבודה שבועי
              </div>
            </div>
            <div className="flex items-center gap-2 bg-white/10 backdrop-blur rounded-xl px-4 py-2">
              <span className="text-white/60 text-sm">שבוע</span>
              <input
                type="date"
                value={startDate}
                onChange={(e) => setStartDate(e.target.value)}
                className="bg-transparent text-white border-none outline-none text-sm font-medium"
                style={{ direction: "ltr" }}
              />
            </div>
          </div>
          <div className="text-white/70 text-lg font-medium mt-2">
            {dateRange}
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 py-6 space-y-6">
        {/* Workers panel */}
        <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-5">
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-base font-bold text-gray-800">👥 עובדים</h2>
            <span className="text-xs text-gray-400 bg-gray-50 px-2 py-1 rounded-full">
              {workers.length} עובדים
            </span>
          </div>
          <div className="flex flex-wrap gap-2 mb-4">
            {workers.map((w) => (
              <WorkerBadge key={w} name={w} onRemove={() => removeWorker(w)} />
            ))}
          </div>
          <div className="flex gap-2">
            <input
              className="flex-1 px-4 py-2.5 rounded-xl border border-gray-200 text-sm outline-none focus:border-blue-400 focus:ring-2 focus:ring-blue-100 transition-all bg-gray-50/50"
              placeholder="הוסף שם עובד..."
              value={newWorker}
              onChange={(e) => setNewWorker(e.target.value)}
              onKeyDown={(e) => e.key === "Enter" && addWorker()}
            />
            <button
              onClick={addWorker}
              className="px-5 py-2.5 bg-blue-600 text-white rounded-xl text-sm font-semibold hover:bg-blue-700 transition-colors shadow-sm"
            >
              הוסף
            </button>
          </div>
        </div>

        {/* Availability / Constraints panel */}
        <AvailabilityPanel
          workers={workers}
          availability={availability}
          setAvailability={setAvailability}
        />

        {/* Generate button */}
        <button
          onClick={handleGenerate}
          className="w-full py-4 rounded-2xl text-white font-bold text-base transition-all duration-300 shadow-lg hover:shadow-xl active:scale-[0.99]"
          style={{
            background:
              "linear-gradient(135deg, #2563eb 0%, #1d4ed8 50%, #1e40af 100%)",
          }}
        >
          {generated ? "🔄 צור סידור מחדש" : "⚡ צור סידור אוטומטי"}
        </button>

        {/* Schedule table */}
        {generated && (
          <>
            <div className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden">
              <div className="overflow-x-auto">
                <table
                  className="w-full border-collapse"
                  style={{ minWidth: "800px" }}
                >
                  <thead>
                    <tr>
                      <th
                        className="sticky right-0 z-10 bg-gray-50 px-3 py-3 text-xs font-bold text-gray-500 border-b border-gray-100"
                        style={{ minWidth: "100px" }}
                      >
                        משמרת / שעה
                      </th>
                      {DAYS_OF_WEEK.map((day, i) => (
                        <th
                          key={day}
                          className="px-2 py-3 text-center border-b border-gray-100"
                          style={{
                            background:
                              i === 6
                                ? "rgba(251,191,36,0.06)"
                                : i === 5
                                  ? "rgba(139,92,246,0.04)"
                                  : "#fafbfc",
                            minWidth: "110px",
                          }}
                        >
                          <div className="text-sm font-bold text-gray-800">
                            {day}
                          </div>
                          <div
                            className="text-xs text-gray-400 font-medium"
                            style={{ direction: "ltr" }}
                          >
                            {formatDate(weekDates[i])}
                          </div>
                          <div className="mt-1">
                            <input
                              className="w-full text-[10px] text-center px-1 py-0.5 rounded bg-transparent text-purple-600 placeholder-gray-300 outline-none focus:bg-purple-50/50 transition-colors"
                              placeholder="הערה ליום..."
                              value={headerNotes[day] || ""}
                              onChange={(e) =>
                                handleHeaderNoteChange(day, e.target.value)
                              }
                            />
                          </div>
                        </th>
                      ))}
                    </tr>
                  </thead>
                  <tbody>
                    {SHIFTS.map((shift) => {
                      const colors = SHIFT_COLORS[shift.id];
                      return (
                        <tr key={shift.id}>
                          <td
                            className="sticky right-0 z-10 px-3 py-2 border-b border-gray-50"
                            style={{ background: colors.bg }}
                          >
                            <div className="flex items-center gap-1.5">
                              <span className="text-base">{colors.icon}</span>
                              <div>
                                <div
                                  className="text-xs font-bold"
                                  style={{ color: colors.text }}
                                >
                                  {shift.label}
                                </div>
                                <div
                                  className="text-[10px] text-gray-400"
                                  style={{ direction: "ltr" }}
                                >
                                  {shift.time}
                                </div>
                              </div>
                            </div>
                          </td>
                          {DAYS_OF_WEEK.map((day, i) => (
                            <td
                              key={`${day}-${shift.id}`}
                              className="px-1.5 py-1.5 border-b border-gray-50"
                              style={{
                                background:
                                  i === 6
                                    ? "rgba(251,191,36,0.03)"
                                    : i === 5
                                      ? "rgba(139,92,246,0.02)"
                                      : "transparent",
                              }}
                            >
                              <CellEditor
                                value={schedule[day]?.[shift.id] || ""}
                                workers={workers}
                                onChange={(val) =>
                                  handleCellChange(day, shift.id, val)
                                }
                                shiftInfo={shift}
                              />
                              <NoteEditor
                                value={notes[`${day}-${shift.id}-1`] || ""}
                                onChange={(val) =>
                                  handleNoteChange(day, shift.id + "-1", val)
                                }
                              />
                              <NoteEditor
                                value={notes[`${day}-${shift.id}-2`] || ""}
                                onChange={(val) =>
                                  handleNoteChange(day, shift.id + "-2", val)
                                }
                              />
                            </td>
                          ))}
                        </tr>
                      );
                    })}
                  </tbody>
                </table>
              </div>
            </div>

            {/* Stats toggle */}
            <button
              onClick={() => setShowStats(!showStats)}
              className="text-sm text-gray-500 hover:text-blue-600 transition-colors font-medium"
            >
              {showStats ? "▲ הסתר סטטיסטיקה" : "▼ הצג סטטיסטיקה"}
            </button>

            {showStats && (
              <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-5">
                <h3 className="text-sm font-bold text-gray-700 mb-3">
                  📊 חלוקת משמרות
                </h3>
                <div className="overflow-x-auto">
                  <table className="w-full text-sm">
                    <thead>
                      <tr className="text-gray-500 text-xs">
                        <th className="text-right py-2 px-3 font-semibold">
                          עובד
                        </th>
                        <th className="text-center py-2 px-3">☀️ בוקר</th>
                        <th className="text-center py-2 px-3">🌤️ צהר' 1</th>
                        <th className="text-center py-2 px-3">⛅ צהר' 2</th>
                        <th className="text-center py-2 px-3">🌙 לילה</th>
                        <th className="text-center py-2 px-3 font-bold">
                          סה״כ
                        </th>
                      </tr>
                    </thead>
                    <tbody>
                      {Object.entries(getWorkerStats()).map(([name, s]) => (
                        <tr key={name} className="border-t border-gray-50">
                          <td className="py-2 px-3 font-semibold text-gray-800">
                            <WorkerBadge name={name} />
                          </td>
                          <td className="text-center py-2 px-3 text-amber-700 font-medium">
                            {s.morning}
                          </td>
                          <td className="text-center py-2 px-3 text-blue-700 font-medium">
                            {s.afternoon1}
                          </td>
                          <td className="text-center py-2 px-3 text-purple-700 font-medium">
                            {s.afternoon2}
                          </td>
                          <td className="text-center py-2 px-3 text-gray-700 font-medium">
                            {s.night}
                          </td>
                          <td className="text-center py-2 px-3 font-bold text-gray-900">
                            {s.total}
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>
            )}
          </>
        )}
      </div>
    </div>
  );
}
