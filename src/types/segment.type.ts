import type { AnsiCode } from "@camalor/constants";

export interface Segment {
  text: string;
  color: AnsiCode;
  modifiers?: AnsiCode[];
}
