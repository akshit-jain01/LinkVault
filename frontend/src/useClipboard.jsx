import { useState } from "react";

export default function useClipboard(timeout = 1500) {
  const [copied, setCopied] = useState(false);

  const copy = async (text) => {
    await navigator.clipboard.writeText(text);
    setCopied(true);
    setTimeout(() => setCopied(false), timeout);
  };

  return { copied, copy };
}
