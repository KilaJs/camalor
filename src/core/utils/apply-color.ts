import type { AnsiCode } from "@camalor/constants";

export function applyColor(text: string, ansiCode: AnsiCode) {
  const [open, close] = ansiCode;
  return `\x1b[${open}m${text}\x1b[${close}m`;
}
