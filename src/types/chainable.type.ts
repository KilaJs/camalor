import type { COLORS, MODIFIERS } from "@camalor/constants";
import type { Camalor } from "@camalor/core";

export type ColorKeys = keyof typeof COLORS;
export type ModifierKeys = keyof typeof MODIFIERS;

export type Chainable = {
  [K in ColorKeys]: Chainable;
} & {
  [K in ModifierKeys]: Chainable;
} & ((text: string) => CamalorChainable); 

export type CamalorChainable = Camalor & Chainable;
