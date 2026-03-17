"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { exportJournalText, deleteJournalHistory, deleteAccount } from "@/lib/actions/account";
import { GlassCard } from "@/components/ui/GlassCard";

type Props = {
  userId: string;
};

export function DangerZone({ userId }: Props) {
  const router = useRouter();

  const [exportLoading, setExportLoading] = useState(false);

  const [deleteJournalOpen, setDeleteJournalOpen] = useState(false);
  const [deleteJournalConfirm, setDeleteJournalConfirm] = useState("");
  const [deleteJournalLoading, setDeleteJournalLoading] = useState(false);
  const [deleteJournalError, setDeleteJournalError] = useState<string | null>(null);

  const [deleteAccountOpen, setDeleteAccountOpen] = useState(false);
  const [deleteAccountConfirm, setDeleteAccountConfirm] = useState("");
  const [deleteAccountLoading, setDeleteAccountLoading] = useState(false);
  const [deleteAccountError, setDeleteAccountError] = useState<string | null>(null);

  async function handleExport() {
    setExportLoading(true);
    const text = await exportJournalText(userId);
    const blob = new Blob([text], { type: "text/markdown" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = `a-day-closer-journal-${new Date().toISOString().slice(0, 10)}.md`;
    a.click();
    URL.revokeObjectURL(url);
    setExportLoading(false);
  }

  async function handleDeleteJournal() {
    if (deleteJournalConfirm !== "DELETE") return;
    setDeleteJournalLoading(true);
    setDeleteJournalError(null);
    const res = await deleteJournalHistory(userId);
    setDeleteJournalLoading(false);
    if (res.ok) {
      setDeleteJournalOpen(false);
      setDeleteJournalConfirm("");
      router.refresh();
    } else {
      setDeleteJournalError(res.error);
    }
  }

  async function handleDeleteAccount() {
    if (deleteAccountConfirm !== "DELETE MY ACCOUNT") return;
    setDeleteAccountLoading(true);
    setDeleteAccountError(null);
    const res = await deleteAccount(userId);
    setDeleteAccountLoading(false);
    if (res.ok) {
      router.push("/");
    } else {
      setDeleteAccountError(res.error);
    }
  }

  const ghostInput =
    "block w-full rounded-xl border border-white/20 bg-white/[0.08] px-4 py-2.5 text-white placeholder-white/30 backdrop-blur-sm focus:border-white/40 focus:bg-white/[0.12] focus:outline-none focus:ring-1 focus:ring-white/25 transition-colors duration-150 text-sm";

  const dangerBtn =
    "rounded-full border border-red-400/40 bg-red-500/20 px-4 py-2 text-sm font-medium text-red-300 transition-all duration-150 hover:bg-red-500/30 hover:text-red-200 disabled:opacity-50 disabled:pointer-events-none";

  const confirmBtn = (valid: boolean) =>
    [
      "rounded-full px-4 py-2 text-sm font-medium transition-all duration-150",
      valid
        ? "bg-red-500/80 text-white hover:bg-red-500"
        : "bg-white/10 text-white/40 cursor-not-allowed",
    ].join(" ");

  const cancelBtn =
    "rounded-full border border-white/20 bg-white/[0.06] px-4 py-2 text-sm font-medium text-white/60 hover:bg-white/10 hover:text-white transition-all duration-150";

  return (
    <div className="space-y-6">

      {/* Export */}
      <div className="flex items-center justify-between gap-4">
        <div>
          <p className="text-sm text-white/80">Download my journal</p>
          <p className="text-xs text-white/35">Export all entries as a Markdown file</p>
        </div>
        <button
          type="button"
          onClick={handleExport}
          disabled={exportLoading}
          className="rounded-full border border-white/20 bg-white/[0.06] px-4 py-2 text-sm font-medium text-white/70 hover:bg-white/10 hover:text-white transition-all duration-150 disabled:opacity-50 shrink-0"
        >
          {exportLoading ? "Exporting…" : "Download"}
        </button>
      </div>

      <div className="border-t border-white/10" />

      {/* Delete journal history */}
      {!deleteJournalOpen ? (
        <div className="flex items-center justify-between gap-4">
          <div>
            <p className="text-sm text-white/80">Delete journal history</p>
            <p className="text-xs text-white/35">Permanently remove all entries and reset your streak</p>
          </div>
          <button type="button" onClick={() => setDeleteJournalOpen(true)} className={`${dangerBtn} shrink-0`}>
            Delete
          </button>
        </div>
      ) : (
        <GlassCard className="space-y-4 px-5 py-4">
          <p className="text-sm text-white/70">
            This will permanently delete all your journal entries and reset your streak.
            Type <span className="font-mono text-red-300">DELETE</span> to confirm.
          </p>
          <input
            type="text"
            value={deleteJournalConfirm}
            onChange={(e) => setDeleteJournalConfirm(e.target.value)}
            placeholder="Type DELETE"
            className={ghostInput}
          />
          {deleteJournalError && (
            <p className="text-xs text-red-300">{deleteJournalError}</p>
          )}
          <div className="flex gap-2">
            <button
              type="button"
              onClick={handleDeleteJournal}
              disabled={deleteJournalConfirm !== "DELETE" || deleteJournalLoading}
              className={confirmBtn(deleteJournalConfirm === "DELETE" && !deleteJournalLoading)}
            >
              {deleteJournalLoading ? "Deleting…" : "Delete history"}
            </button>
            <button type="button" onClick={() => { setDeleteJournalOpen(false); setDeleteJournalConfirm(""); }} className={cancelBtn}>
              Cancel
            </button>
          </div>
        </GlassCard>
      )}

      <div className="border-t border-white/10" />

      {/* Delete account */}
      {!deleteAccountOpen ? (
        <div className="flex items-center justify-between gap-4">
          <div>
            <p className="text-sm text-white/80">Delete account</p>
            <p className="text-xs text-white/35">
              Permanently removes your account and all data
            </p>
          </div>
          <button type="button" onClick={() => setDeleteAccountOpen(true)} className={`${dangerBtn} shrink-0`}>
            Delete
          </button>
        </div>
      ) : (
        <GlassCard className="space-y-4 px-5 py-4">
          <p className="text-sm text-white/70">
            This permanently deletes your account, journal, and all settings.
            Type <span className="font-mono text-red-300">DELETE MY ACCOUNT</span> to confirm.
          </p>
          <input
            type="text"
            value={deleteAccountConfirm}
            onChange={(e) => setDeleteAccountConfirm(e.target.value)}
            placeholder="Type DELETE MY ACCOUNT"
            className={ghostInput}
          />
          {deleteAccountError && (
            <p className="text-xs text-red-300">{deleteAccountError}</p>
          )}
          <div className="flex gap-2">
            <button
              type="button"
              onClick={handleDeleteAccount}
              disabled={deleteAccountConfirm !== "DELETE MY ACCOUNT" || deleteAccountLoading}
              className={confirmBtn(deleteAccountConfirm === "DELETE MY ACCOUNT" && !deleteAccountLoading)}
            >
              {deleteAccountLoading ? "Deleting…" : "Delete account"}
            </button>
            <button type="button" onClick={() => { setDeleteAccountOpen(false); setDeleteAccountConfirm(""); }} className={cancelBtn}>
              Cancel
            </button>
          </div>
        </GlassCard>
      )}
    </div>
  );
}
