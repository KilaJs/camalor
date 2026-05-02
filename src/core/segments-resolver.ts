// src/core/segments-resolver.ts
import type { Segment } from "@camalor/types/segment.type";
import { applyColor } from "./utils";

export function segmentsResolver(segments: Segment[]): string {
  let output = "";

  for (const seg of segments) {
    let segmentText = seg.text;

    if (seg.modifiers && seg.modifiers.length > 0) {
      for (const modifier of seg.modifiers) {
        segmentText = applyColor(segmentText, modifier);
      }
    }

    segmentText = applyColor(segmentText, seg.color);

    output += segmentText;
  }

  return output;
}
