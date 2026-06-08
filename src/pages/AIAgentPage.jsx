import { useState, useRef, useEffect } from "react";

const SparkleIcon = () => (
  <svg
    width="16"
    height="16"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="1.5"
    strokeLinecap="round"
    strokeLinejoin="round"
  >
    <path d="M12 3l1.5 4.5L18 9l-4.5 1.5L12 15l-1.5-4.5L6 9l4.5-1.5z" />
    <path
      d="M19 3l.75 2.25L22 6l-2.25.75L19 9l-.75-2.25L16 6l2.25-.75z"
      opacity="0.5"
    />
  </svg>
);

const SendIcon = () => (
  <svg
    width="15"
    height="15"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2.2"
    strokeLinecap="round"
    strokeLinejoin="round"
  >
    <path d="M22 2L11 13" />
    <path d="M22 2L15 22l-4-9-9-4z" />
  </svg>
);

const TrashIcon = () => (
  <svg
    width="14"
    height="14"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="1.5"
    strokeLinecap="round"
    strokeLinejoin="round"
  >
    <polyline points="3 6 5 6 21 6" />
    <path d="M19 6l-1 14a2 2 0 0 1-2 2H8a2 2 0 0 1-2-2L5 6" />
    <path d="M10 11v6" />
    <path d="M14 11v6" />
    <path d="M9 6V4a1 1 0 0 1 1-1h4a1 1 0 0 1 1 1v2" />
  </svg>
);

const UserIcon = () => (
  <svg
    width="14"
    height="14"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="1.5"
    strokeLinecap="round"
    strokeLinejoin="round"
  >
    <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2" />
    <circle cx="12" cy="7" r="4" />
  </svg>
);

const PdfIcon = () => (
  <svg
    width="14"
    height="14"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="1.5"
    strokeLinecap="round"
    strokeLinejoin="round"
  >
    <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z" />
    <polyline points="14 2 14 8 20 8" />
    <line x1="16" y1="13" x2="8" y2="13" />
    <line x1="16" y1="17" x2="8" y2="17" />
  </svg>
);

const UploadIcon = () => (
  <svg
    width="28"
    height="28"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="1.2"
    strokeLinecap="round"
    strokeLinejoin="round"
  >
    <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4" />
    <polyline points="17 8 12 3 7 8" />
    <line x1="12" y1="3" x2="12" y2="15" />
  </svg>
);

const XIcon = () => (
  <svg
    width="11"
    height="11"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2.5"
    strokeLinecap="round"
    strokeLinejoin="round"
  >
    <line x1="18" y1="6" x2="6" y2="18" />
    <line x1="6" y1="6" x2="18" y2="18" />
  </svg>
);

const ClipIcon = () => (
  <svg
    width="16"
    height="16"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="1.5"
    strokeLinecap="round"
    strokeLinejoin="round"
  >
    <path d="M21.44 11.05l-9.19 9.19a6 6 0 0 1-8.49-8.49l9.19-9.19a4 4 0 0 1 5.66 5.66l-9.2 9.19a2 2 0 0 1-2.83-2.83l8.49-8.48" />
  </svg>
);

const styles = `
  @import url('https://fonts.googleapis.com/css2?family=DM+Sans:ital,opsz,wght@0,9..40,300;0,9..40,400;0,9..40,500;1,9..40,300&family=DM+Mono:wght@400&display=swap');

  *, *::before, *::after { box-sizing: border-box; margin: 0; padding: 0; }

  .agent-root {
    height: 100vh; background: #08080f;
    display: flex; flex-direction: column;
    font-family: 'DM Sans', sans-serif; direction: rtl; overflow: hidden;
  }

  .topbar {
    display: flex; align-items: center; justify-content: space-between;
    padding: 16px 24px; border-bottom: 1px solid #13131e;
    flex-shrink: 0; background: #08080f;
  }
  .topbar-left { display: flex; align-items: center; gap: 12px; }
  .logo-mark {
    width: 36px; height: 36px; border-radius: 10px;
    background: linear-gradient(135deg, #6366f1 0%, #8b5cf6 100%);
    display: flex; align-items: center; justify-content: center;
    flex-shrink: 0; position: relative; overflow: hidden;
  }
  .logo-mark::before {
    content: ''; position: absolute; inset: 0;
    background: linear-gradient(135deg, rgba(255,255,255,0.15) 0%, transparent 60%);
  }
  .topbar-title { font-size: 16px; font-weight: 500; color: #e8e8f0; letter-spacing: -0.3px; }
  .topbar-sub { font-size: 12px; font-weight: 300; color: #35354d; display: flex; align-items: center; gap: 5px; margin-top: 1px; }
  .pulse-dot {
    width: 5px; height: 5px; border-radius: 50%; background: #22c55e;
    animation: pulse-glow 2s ease-in-out infinite; flex-shrink: 0;
  }
  @keyframes pulse-glow {
    0%,100% { box-shadow: 0 0 0 0 rgba(34,197,94,0.5); }
    50%      { box-shadow: 0 0 0 4px rgba(34,197,94,0); }
  }
  .topbar-right { display: flex; align-items: center; gap: 8px; }
  .docs-badge {
    display: flex; align-items: center; gap: 5px;
    padding: 5px 10px; background: rgba(99,102,241,0.08);
    border: 1px solid rgba(99,102,241,0.2); border-radius: 8px;
    font-size: 11px; color: #6366f1;
  }
  .clear-btn {
    display: flex; align-items: center; gap: 6px;
    padding: 7px 13px; background: transparent;
    border: 1px solid #1a1a28; border-radius: 8px;
    font-family: 'DM Sans', sans-serif; font-size: 12px; color: #35354d;
    cursor: pointer; transition: border-color 0.15s, color 0.15s;
  }
  .clear-btn:hover { border-color: #2d2d45; color: #6b6b7e; }

  /* Upload screen */
  .upload-screen {
    flex: 1; display: flex; flex-direction: column;
    align-items: center; justify-content: center;
    padding: 40px 24px; gap: 0;
  }
  .upload-zone {
    width: 100%; max-width: 480px;
    border: 1.5px dashed #1e1e30; border-radius: 20px;
    padding: 40px 32px; display: flex; flex-direction: column;
    align-items: center; gap: 16px; cursor: pointer;
    transition: border-color 0.2s, background 0.2s;
    background: #0c0c18;
  }
  .upload-zone:hover, .upload-zone.drag-over {
    border-color: #6366f1; background: rgba(99,102,241,0.04);
  }
  .upload-icon-wrap {
    width: 64px; height: 64px; border-radius: 16px;
    background: #10101e; border: 1px solid #1e1e30;
    display: flex; align-items: center; justify-content: center;
    color: #35354d; transition: color 0.2s, border-color 0.2s;
  }
  .upload-zone:hover .upload-icon-wrap { color: #6366f1; border-color: rgba(99,102,241,0.3); }
  .upload-title { font-size: 15px; font-weight: 400; color: #4b4b65; }
  .upload-sub { font-size: 12px; font-weight: 300; color: #25253a; }

  .files-list {
    width: 100%; max-width: 480px; margin-top: 16px;
    display: flex; flex-direction: column; gap: 8px;
  }
  .file-item {
    display: flex; align-items: center; gap: 10px;
    padding: 10px 14px; background: #0e0e1a;
    border: 1px solid #1a1a28; border-radius: 12px;
    animation: msg-in 0.25s ease;
  }
  .file-item-icon {
    width: 32px; height: 32px; border-radius: 8px;
    background: rgba(99,102,241,0.1); border: 1px solid rgba(99,102,241,0.15);
    display: flex; align-items: center; justify-content: center; color: #6366f1; flex-shrink: 0;
  }
  .file-item-name { flex: 1; font-size: 13px; color: #8888a0; overflow: hidden; text-overflow: ellipsis; white-space: nowrap; }
  .file-item-size { font-family: 'DM Mono', monospace; font-size: 10px; color: #2d2d45; }
  .file-remove {
    width: 20px; height: 20px; border-radius: 50%;
    background: transparent; border: 1px solid #1e1e2e;
    display: flex; align-items: center; justify-content: center;
    color: #35354d; cursor: pointer; flex-shrink: 0;
    transition: background 0.15s, color 0.15s;
  }
  .file-remove:hover { background: rgba(239,68,68,0.1); color: rgba(239,68,68,0.7); border-color: rgba(239,68,68,0.2); }

  .start-btn {
    margin-top: 20px; padding: 12px 32px;
    background: #6366f1; color: white; border: none;
    border-radius: 12px; font-family: 'DM Sans', sans-serif;
    font-size: 14px; font-weight: 500; cursor: pointer;
    transition: background 0.15s, transform 0.1s;
    position: relative; overflow: hidden;
  }
  .start-btn::before {
    content: ''; position: absolute; inset: 0;
    background: linear-gradient(to bottom, rgba(255,255,255,0.08), transparent);
  }
  .start-btn:hover { background: #5254cc; transform: translateY(-1px); }
  .start-btn:active { transform: scale(0.98); }
  .skip-btn {
    margin-top: 10px; padding: 8px 20px;
    background: transparent; color: #2d2d45; border: none;
    font-family: 'DM Sans', sans-serif; font-size: 13px; font-weight: 300;
    cursor: pointer; transition: color 0.15s;
  }
  .skip-btn:hover { color: #4b4b65; }

  /* Chat */
  .messages-area {
    flex: 1; overflow-y: auto; padding: 28px 24px; scroll-behavior: smooth;
  }
  .messages-area::-webkit-scrollbar { width: 4px; }
  .messages-area::-webkit-scrollbar-track { background: transparent; }
  .messages-area::-webkit-scrollbar-thumb { background: #1a1a28; border-radius: 2px; }

  .docs-banner {
    display: flex; align-items: center; gap: 10px; flex-wrap: wrap;
    padding: 10px 14px; margin-bottom: 20px;
    background: rgba(99,102,241,0.05); border: 1px solid rgba(99,102,241,0.12);
    border-radius: 12px; font-size: 12px; color: #4b4b65;
  }
  .docs-banner-label { color: #35354d; font-weight: 300; margin-left: 4px; }
  .doc-pill {
    display: flex; align-items: center; gap: 5px;
    padding: 3px 9px; background: rgba(99,102,241,0.08);
    border: 1px solid rgba(99,102,241,0.15); border-radius: 100px;
    color: #6366f1; font-size: 11px;
  }

  .msg-group {
    display: flex; flex-direction: column; gap: 4px; margin-bottom: 20px;
    animation: msg-in 0.3s cubic-bezier(0.22,1,0.36,1);
  }
  @keyframes msg-in {
    from { opacity: 0; transform: translateY(8px); }
    to   { opacity: 1; transform: translateY(0); }
  }
  .msg-row { display: flex; align-items: flex-end; gap: 10px; }
  .msg-row.user  { justify-content: flex-start; }
  .msg-row.agent { justify-content: flex-end; }
  .avatar {
    width: 28px; height: 28px; border-radius: 8px;
    display: flex; align-items: center; justify-content: center; flex-shrink: 0;
  }
  .avatar.user  { background: #1a1a2e; border: 1px solid #25253a; color: #4b4b65; }
  .avatar.agent { background: linear-gradient(135deg, #6366f1, #8b5cf6); color: white; }
  .bubble {
    max-width: 72%; padding: 12px 16px;
    font-size: 14px; font-weight: 300; line-height: 1.7;
    word-break: break-word; white-space: pre-wrap;
  }
  .bubble.user  { background: #12121e; border: 1px solid #1e1e30; border-radius: 16px 16px 4px 16px; color: #c8c8e0; }
  .bubble.agent { background: #0f0f1c; border: 1px solid #1a1a2e; border-radius: 16px 16px 16px 4px; color: #d8d8ee; }
  .msg-time { font-family: 'DM Mono', monospace; font-size: 10px; color: #25253a; padding: 0 4px; margin-top: 2px; }
  .msg-row.user  .msg-time { padding-right: 38px; }
  .msg-row.agent .msg-time { text-align: left; padding-left: 38px; }

  .typing-bubble {
    display: flex; align-items: center; gap: 5px;
    padding: 14px 18px; background: #0f0f1c;
    border: 1px solid #1a1a2e; border-radius: 16px 16px 16px 4px;
  }
  .typing-bubble span {
    width: 5px; height: 5px; border-radius: 50%; background: #6366f1;
    animation: typing-dot 1.4s ease-in-out infinite; opacity: 0.4;
  }
  .typing-bubble span:nth-child(2) { animation-delay: 0.2s; }
  .typing-bubble span:nth-child(3) { animation-delay: 0.4s; }
  @keyframes typing-dot {
    0%,60%,100% { transform: translateY(0); opacity: 0.4; }
    30% { transform: translateY(-5px); opacity: 1; }
  }

  .input-bar {
    flex-shrink: 0; padding: 12px 24px 20px;
    border-top: 1px solid #13131e; background: #08080f;
  }
  .input-inner {
    display: flex; align-items: flex-end; gap: 10px;
    background: #10101a; border: 1px solid #1e1e2e;
    border-radius: 16px; padding: 12px 14px; transition: border-color 0.2s;
  }
  .input-inner:focus-within { border-color: #2d2d45; }
  .attach-btn {
    width: 32px; height: 32px; border-radius: 8px;
    background: transparent; border: 1px solid #1e1e2e;
    display: flex; align-items: center; justify-content: center;
    color: #35354d; cursor: pointer; flex-shrink: 0;
    transition: border-color 0.15s, color 0.15s;
  }
  .attach-btn:hover { border-color: #6366f1; color: #6366f1; }
  .chat-textarea {
    flex: 1; background: transparent; border: none; outline: none; resize: none;
    font-family: 'DM Sans', sans-serif; font-size: 14px; font-weight: 300;
    line-height: 1.6; color: #d8d8ee; caret-color: #6366f1;
    min-height: 22px; max-height: 140px; overflow-y: auto; direction: rtl;
  }
  .chat-textarea::placeholder { color: #25253a; }
  .send-btn {
    width: 36px; height: 36px; border-radius: 10px;
    background: #6366f1; border: none;
    display: flex; align-items: center; justify-content: center;
    color: white; cursor: pointer; flex-shrink: 0;
    transition: background 0.15s, transform 0.1s, opacity 0.2s;
  }
  .send-btn:hover:not(:disabled) { background: #5254cc; transform: scale(1.05); }
  .send-btn:active:not(:disabled) { transform: scale(0.95); }
  .send-btn:disabled { opacity: 0.3; cursor: not-allowed; }
  .input-hint {
    font-size: 11px; font-weight: 300; color: #1e1e2a;
    text-align: center; margin-top: 10px;
    display: flex; align-items: center; justify-content: center; gap: 4px;
  }
  kbd {
    font-family: 'DM Mono', monospace; font-size: 10px;
    padding: 1px 5px; background: #10101a; border-radius: 4px;
    color: #2a2a3d; border: 1px solid #1a1a28;
  }
  .error-bar {
    margin: 0 24px 12px; padding: 10px 14px;
    background: rgba(239,68,68,0.06); border: 1px solid rgba(239,68,68,0.15);
    border-radius: 10px; font-size: 13px; font-weight: 300;
    color: rgba(239,68,68,0.65); direction: rtl; animation: msg-in 0.25s ease;
  }
`;

function getTime() {
  return new Date().toLocaleTimeString("he-IL", {
    hour: "2-digit",
    minute: "2-digit",
  });
}

function formatSize(bytes) {
  if (bytes < 1024) return bytes + " B";
  if (bytes < 1024 * 1024) return (bytes / 1024).toFixed(0) + " KB";
  return (bytes / (1024 * 1024)).toFixed(1) + " MB";
}

function fileToBase64(file) {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.onload = () => resolve(reader.result.split(",")[1]);
    reader.onerror = reject;
    reader.readAsDataURL(file);
  });
}

export default function AIAgentPage() {
  const [phase, setPhase] = useState("upload"); // "upload" | "chat"
  const [pendingFiles, setPendingFiles] = useState([]);
  const [pdfContents, setPdfContents] = useState([]); // [{name, data}]
  const [messages, setMessages] = useState([]);
  const [input, setInput] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [dragOver, setDragOver] = useState(false);
  const bottomRef = useRef(null);
  const textareaRef = useRef(null);
  const fileInputRef = useRef(null);

  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages, loading]);

  const autoResize = (el) => {
    el.style.height = "auto";
    el.style.height = Math.min(el.scrollHeight, 140) + "px";
  };

  const addFiles = (files) => {
    const pdfs = Array.from(files).filter((f) => f.type === "application/pdf");
    setPendingFiles((prev) => {
      const names = new Set(prev.map((f) => f.name));
      return [...prev, ...pdfs.filter((f) => !names.has(f.name))];
    });
  };

  const handleDrop = (e) => {
    e.preventDefault();
    setDragOver(false);
    addFiles(e.dataTransfer.files);
  };

  const startChat = async () => {
    if (pendingFiles.length === 0) {
      setPhase("chat");
      return;
    }
    // Convert all PDFs to base64 and store
    const converted = await Promise.all(
      pendingFiles.map(async (f) => ({
        name: f.name,
        data: await fileToBase64(f),
      })),
    );
    setPdfContents(converted);
    setPendingFiles([]);
    setPhase("chat");
  };

  const sendMessage = async () => {
    const text = input.trim();
    if (!text || loading) return;

    const userMsg = { role: "user", text, time: getTime() };
    setMessages((prev) => [...prev, userMsg]);
    setInput("");
    setError("");
    if (textareaRef.current) textareaRef.current.style.height = "auto";

    setLoading(true);
    try {
      const history = [...messages, userMsg].map((m) => ({
        role: m.role === "user" ? "user" : "assistant",
        content: m.text,
      }));

      const formData = new FormData();
      formData.append("message", text);
      formData.append("history", JSON.stringify(history));
      formData.append("pdfContents", JSON.stringify(pdfContents));

      const response = await fetch(
        "https://servertest-1-itea.onrender.com/ask-agent",
        { method: "POST", body: formData },
      );
      const data = await response.json();
      setMessages((prev) => [
        ...prev,
        {
          role: "agent",
          text: data.answer || "לא התקבלה תשובה",
          time: getTime(),
        },
      ]);
    } catch {
      setError("לא ניתן להגיע לשרת.");
    } finally {
      setLoading(false);
    }
  };

  const handleKeyDown = (e) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      sendMessage();
    }
  };

  const resetAll = () => {
    setPhase("upload");
    setMessages([]);
    setPdfContents([]);
    setPendingFiles([]);
    setError("");
  };

  if (phase === "upload") {
    return (
      <>
        <style>{styles}</style>
        <input
          ref={fileInputRef}
          type="file"
          accept="application/pdf"
          multiple
          style={{ display: "none" }}
          onChange={(e) => {
            addFiles(e.target.files);
            e.target.value = "";
          }}
        />
        <div className="agent-root">
          <div className="topbar">
            <div className="topbar-left">
              <div className="logo-mark">
                <SparkleIcon />
              </div>
              <div>
                <div className="topbar-title">AI Agent</div>
                <div className="topbar-sub">
                  <span className="pulse-dot" />
                  מוכן
                </div>
              </div>
            </div>
          </div>

          <div className="upload-screen">
            <div
              className={`upload-zone${dragOver ? " drag-over" : ""}`}
              onClick={() => fileInputRef.current?.click()}
              onDragOver={(e) => {
                e.preventDefault();
                setDragOver(true);
              }}
              onDragLeave={() => setDragOver(false)}
              onDrop={handleDrop}
            >
              <div className="upload-icon-wrap">
                <UploadIcon />
              </div>
              <div className="upload-title">גרור קבצי PDF לכאן</div>
              <div className="upload-sub">
                או לחץ לבחור קבצים · ניתן להעלות מספר קבצים
              </div>
            </div>

            {pendingFiles.length > 0 && (
              <div className="files-list">
                {pendingFiles.map((f, i) => (
                  <div className="file-item" key={i}>
                    <div className="file-item-icon">
                      <PdfIcon />
                    </div>
                    <span className="file-item-name">{f.name}</span>
                    <span className="file-item-size">{formatSize(f.size)}</span>
                    <button
                      className="file-remove"
                      onClick={(e) => {
                        e.stopPropagation();
                        setPendingFiles((prev) =>
                          prev.filter((_, j) => j !== i),
                        );
                      }}
                    >
                      <XIcon />
                    </button>
                  </div>
                ))}
              </div>
            )}

            <button className="start-btn" onClick={startChat}>
              {pendingFiles.length > 0
                ? `התחל שיחה עם ${pendingFiles.length} קובץ${pendingFiles.length > 1 ? "ות" : ""}`
                : "התחל שיחה ללא קבצים"}
            </button>
            {pendingFiles.length === 0 && (
              <button className="skip-btn" onClick={() => setPhase("chat")}>
                דלג והתחל שיחה רגילה
              </button>
            )}
          </div>
        </div>
      </>
    );
  }

  return (
    <>
      <style>{styles}</style>
      <div className="agent-root">
        <div className="topbar">
          <div className="topbar-left">
            <div className="logo-mark">
              <SparkleIcon />
            </div>
            <div>
              <div className="topbar-title">AI Agent</div>
              <div className="topbar-sub">
                <span className="pulse-dot" />
                מחובר ופעיל
              </div>
            </div>
          </div>
          <div className="topbar-right">
            {pdfContents.length > 0 && (
              <div className="docs-badge">
                <PdfIcon />
                {pdfContents.length} מסמך{pdfContents.length > 1 ? "ים" : ""}
              </div>
            )}
            <button className="clear-btn" onClick={resetAll}>
              <TrashIcon />
              שיחה חדשה
            </button>
          </div>
        </div>

        <div className="messages-area">
          {pdfContents.length > 0 && (
            <div className="docs-banner">
              <span className="docs-banner-label">השיחה מתבצעת לפי:</span>
              {pdfContents.map((p, i) => (
                <div className="doc-pill" key={i}>
                  <PdfIcon />
                  {p.name}
                </div>
              ))}
            </div>
          )}

          {messages.map((msg, i) => (
            <div className="msg-group" key={i}>
              <div className={`msg-row ${msg.role}`}>
                {msg.role === "user" && (
                  <div className="avatar user">
                    <UserIcon />
                  </div>
                )}
                <div className={`bubble ${msg.role}`}>{msg.text}</div>
                {msg.role === "agent" && (
                  <div className="avatar agent">
                    <SparkleIcon />
                  </div>
                )}
              </div>
              <div className={`msg-row ${msg.role}`}>
                <div className="msg-time">{msg.time}</div>
              </div>
            </div>
          ))}

          {loading && (
            <div className="msg-group">
              <div className="msg-row agent">
                <div className="typing-bubble">
                  <span />
                  <span />
                  <span />
                </div>
                <div className="avatar agent">
                  <SparkleIcon />
                </div>
              </div>
            </div>
          )}
          <div ref={bottomRef} />
        </div>

        {error && <div className="error-bar">{error}</div>}

        <div className="input-bar">
          <div className="input-inner">
            <textarea
              ref={textareaRef}
              className="chat-textarea"
              rows={1}
              value={input}
              onChange={(e) => {
                setInput(e.target.value);
                autoResize(e.target);
              }}
              onKeyDown={handleKeyDown}
              placeholder={
                pdfContents.length > 0
                  ? "שאל שאלה על המסמכים..."
                  : "כתוב הודעה..."
              }
            />
            <button
              className="send-btn"
              onClick={sendMessage}
              disabled={loading || !input.trim()}
              aria-label="שלח"
            >
              <SendIcon />
            </button>
          </div>
          <div className="input-hint">
            <kbd>Enter</kbd> לשליחה &nbsp;·&nbsp; <kbd>Shift+Enter</kbd> לשורה
            חדשה
          </div>
        </div>
      </div>
    </>
  );
}
