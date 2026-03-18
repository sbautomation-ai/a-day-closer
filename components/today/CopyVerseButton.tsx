"use client";

import { useState } from "react";

type CopyVerseButtonProps = {
  reference: string;
  bibleText: string;
  appUrl?: string;
};

export function CopyVerseButton({ reference, bibleText, appUrl }: CopyVerseButtonProps) {
  const [copied, setCopied] = useState(false);
  const [shared, setShared] = useState(false);

  const buildText = () => {
    let text = `${reference}\n\n${bibleText}`;
    if (appUrl) text += `\n\n— A Day Closer\n${appUrl}`;
    return text;
  };

  async function handleCopy() {
    try {
      await navigator.clipboard.writeText(buildText());
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch {
      // Clipboard not available (e.g. non-HTTPS, blocked)
    }
  }

  async function handleShare() {
    try {
      await navigator.share({ title: reference, text: buildText() });
      setShared(true);
      setTimeout(() => setShared(false), 2000);
    } catch {
      // Share cancelled or unavailable
    }
  }

  const canShare = typeof navigator !== "undefined" && !!navigator.share;

  return (
    <div className="flex items-center gap-2">
      <button
        type="button"
        onClick={handleCopy}
        aria-label="Copy verse to clipboard"
        className="inline-flex items-center gap-1.5 rounded-full border border-white/15 bg-white/[0.06] px-3 py-1.5 text-xs text-white/55 transition-all duration-150 hover:bg-white/[0.12] hover:text-white/80"
      >
        {copied ? (
          <>
            <span aria-hidden>✓</span>
            Copied
          </>
        ) : (
          <>
            <span aria-hidden>⎘</span>
            Copy verse
          </>
        )}
      </button>
      {canShare && (
        <button
          type="button"
          onClick={handleShare}
          aria-label="Share verse"
          className="inline-flex items-center gap-1.5 rounded-full border border-white/15 bg-white/[0.06] px-3 py-1.5 text-xs text-white/55 transition-all duration-150 hover:bg-white/[0.12] hover:text-white/80"
        >
          {shared ? (
            <>
              <span aria-hidden>✓</span>
              Shared
            </>
          ) : (
            <>
              <span aria-hidden>↗</span>
              Share
            </>
          )}
        </button>
      )}
    </div>
  );
}
