import React, { useEffect, useState, useCallback, useRef } from "react";
import axios from "axios";
import { FaFolderOpen, FaCheck, FaTimes } from "react-icons/fa";

// Evaluated once at module load — the runtime environment never changes.
const isElectron =
  typeof navigator !== "undefined" &&
  navigator.userAgent.toLowerCase().includes("electron");

function FolderPicker() {
  const [folderPath, setFolderPath] = useState("");
  const [inputValue, setInputValue] = useState("");
  const [isEditing, setIsEditing] = useState(false);
  const [status, setStatus] = useState(null); // { type: "success"|"error", message: string }
  const [loading, setLoading] = useState(false);

  // Fix #1: store timeout ref so it can be cleared on unmount
  const statusTimerRef = useRef(null);

  const showStatus = useCallback((type, message) => {
    if (statusTimerRef.current) clearTimeout(statusTimerRef.current);
    setStatus({ type, message });
    statusTimerRef.current = setTimeout(() => setStatus(null), 3000);
  }, []);

  // Fix #1: clear the timeout when the component unmounts
  useEffect(() => {
    return () => {
      if (statusTimerRef.current) clearTimeout(statusTimerRef.current);
    };
  }, []);

  const folderName = folderPath
    ? folderPath.replace(/\\/g, "/").split("/").filter(Boolean).pop()
    : "";

  // Fix #5: stable reference so the useEffect dependency array is accurate
  const fetchCurrentPath = useCallback(async () => {
    try {
      const response = await axios.get(
        `${process.env.REACT_APP_API_BASE_URL}/folder-path`
      );
      if (response.data?.folderPath) {
        setFolderPath(response.data.folderPath);
        localStorage.setItem("FOLDER_PATH", response.data.folderPath);
        return;
      }
    } catch {
      // fall through to cache
    }
    const cached = localStorage.getItem("FOLDER_PATH");
    if (cached) setFolderPath(cached);
  }, []);

  const applyFolderPath = async (newPath) => {
    const trimmed = (newPath || "").trim();
    if (!trimmed) return;
    setLoading(true);
    setStatus(null);
    try {
      const response = await axios.post(
        `${process.env.REACT_APP_API_BASE_URL}/pickFolder`,
        { folderPath: trimmed }
      );
      const confirmed = response.data?.folderPath || trimmed;
      setFolderPath(confirmed);
      // Fix #3: removed setInputValue(confirmed) here — inputValue is only
      // relevant while the textarea is visible, so syncing it when editing
      // closes serves no purpose.
      localStorage.setItem("FOLDER_PATH", confirmed);
      setIsEditing(false);
      showStatus("success", "Folder updated");
    } catch (error) {
      const message =
        error?.response?.data?.error || "Failed to set folder path.";
      showStatus("error", message);
    } finally {
      setLoading(false);
    }
  };

  // Electron: open native OS folder dialog
  const handleElectronPicker = async () => {
    if (!window.electronAPI?.selectFolder) return;
    const selected = await window.electronAPI.selectFolder();
    if (selected) await applyFolderPath(selected);
  };

  const handleStartEdit = () => {
    setInputValue(folderPath);
    setIsEditing(true);
    setStatus(null);
  };

  const handleCancelEdit = () => {
    setIsEditing(false);
    setInputValue(folderPath);
    setStatus(null);
  };

  const handleConfirmEdit = () => {
    applyFolderPath(inputValue);
  };

  // Fix #2: prevent the textarea's native newline on Enter so the path
  // string never contains a \n character before being submitted.
  const handleKeyDown = (e) => {
    if (e.key === "Enter") {
      e.preventDefault();
      handleConfirmEdit();
    }
    if (e.key === "Escape") handleCancelEdit();
  };

  // Fix #5: fetchCurrentPath is now stable — safe to list as dependency
  useEffect(() => {
    fetchCurrentPath();
  }, [fetchCurrentPath]);

  return (
    <div className="px-3 py-3 rounded-lg bg-slate-950/60 border border-slate-800">
      {/* Label */}
      <div className="flex items-center gap-2 mb-2.5">
        <FaFolderOpen className="text-indigo-400 text-sm flex-shrink-0" />
        <span className="text-sm text-slate-300 font-semibold">
          Model Folder
        </span>
      </div>

      {isEditing ? (
        /* ── Edit mode: type / paste a path ── */
        <div className="space-y-2">
          {/* Fix #7: aria-label for screen readers */}
          <textarea
            autoFocus
            rows={3}
            value={inputValue}
            onChange={(e) => setInputValue(e.target.value)}
            onKeyDown={handleKeyDown}
            placeholder="Paste or type full folder path…"
            aria-label="Model folder path"
            className="w-full bg-slate-900 border border-slate-700 text-slate-200 text-xs rounded-lg px-2.5 py-2 focus:outline-none focus:border-indigo-500 placeholder-slate-600 resize-none leading-relaxed"
          />
          <div className="flex gap-2">
            <button
              onClick={handleConfirmEdit}
              disabled={loading || !inputValue.trim()}
              className="flex-1 flex items-center justify-center gap-1.5 px-3 py-1.5 bg-indigo-600 hover:bg-indigo-500 text-white text-xs rounded-lg transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
            >
              <FaCheck className="text-xs" />
              {loading ? "Applying…" : "Apply"}
            </button>
            {/* Fix #7: aria-label for the icon-only cancel button */}
            <button
              onClick={handleCancelEdit}
              disabled={loading}
              aria-label="Cancel"
              className="flex items-center justify-center px-3 py-1.5 bg-slate-800 hover:bg-slate-700 text-slate-300 text-xs rounded-lg transition-colors"
            >
              <FaTimes className="text-xs" />
            </button>
          </div>
        </div>
      ) : (
        /* ── Display mode ── */
        <>
          {/* Current folder name — truncated, full path on hover */}
          <div
            className="text-xs text-slate-400 mb-2.5 truncate"
            title={folderPath || undefined}
          >
            {folderName || "No folder selected"}
          </div>

          {/* Action button */}
          {isElectron ? (
            /* Electron: native OS folder picker */
            <button
              onClick={handleElectronPicker}
              disabled={loading}
              className="w-full flex items-center justify-center gap-2 px-3 py-2 bg-slate-800 text-slate-200 text-sm rounded-lg hover:bg-slate-700 active:bg-slate-600 transition-colors disabled:opacity-50"
            >
              {loading ? "Applying…" : "Choose Folder"}
            </button>
          ) : (
            /* Web: open path text editor */
            <button
              onClick={handleStartEdit}
              className="w-full flex items-center justify-center gap-2 px-3 py-2 bg-slate-800 text-slate-200 text-sm rounded-lg hover:bg-slate-700 active:bg-slate-600 transition-colors"
            >
              Change Folder
            </button>
          )}
        </>
      )}

      {/* Status feedback */}
      {status && (
        <div
          className={`mt-2 text-xs ${
            status.type === "success" ? "text-emerald-400" : "text-red-400"
          }`}
        >
          {status.message}
        </div>
      )}
    </div>
  );
}

export default FolderPicker;
