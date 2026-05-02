import { COLORS, MODIFIERS } from "@camalor/constants";
import { Camalor, StyleBuilder } from "@camalor/core";
import type { CamalorChainable } from "@camalor/types/chainable.type";
import { createStyleProxy } from "./create-style.proxy";

export function createCamalorProxy(camalor: Camalor): CamalorChainable {
  const handler: ProxyHandler<Camalor> = {
    get(target, prop: keyof CamalorChainable) {
      if (typeof prop === "string") {
        if (prop in COLORS || prop in MODIFIERS) {
          const builder = new StyleBuilder(target.segments);

          if (prop in COLORS) {
            builder.setColor(COLORS[prop as keyof typeof COLORS]);
          }

          if (prop in MODIFIERS) {
            builder.addModifier(MODIFIERS[prop as keyof typeof MODIFIERS]);
          }

          return createStyleProxy(builder);
        }
      }

      return (target as any)[prop];
    },
  };

  return new Proxy(camalor, handler) as CamalorChainable;
}
