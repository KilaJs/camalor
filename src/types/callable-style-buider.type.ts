import type { Camalor, StyleBuilder } from "@camalor/core";

export interface CallableStyleBuilder extends StyleBuilder {
  (text: string): Camalor;
}
