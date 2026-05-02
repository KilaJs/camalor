import { COLORS, MODIFIERS } from "@camalor/constants";
import type { StyleBuilder } from "@camalor/core";
import type { Chainable } from "@camalor/types/chainable.type";

export function createStyleProxy(builder: StyleBuilder): Chainable {
  const callable = ((text: string) =>
    builder.call(text)) as unknown as Chainable;

  const handler: ProxyHandler<Chainable> = {
    get(_, prop: keyof Chainable) {
      if (typeof prop === "string") {
        if (prop in COLORS) {
          builder.setColor(COLORS[prop as keyof typeof COLORS]);
          return createStyleProxy(builder);
        }

        if (prop in MODIFIERS) {
          builder.addModifier(MODIFIERS[prop as keyof typeof MODIFIERS]);
          return createStyleProxy(builder);
        }
      }
      return undefined;
    },
  };

  return new Proxy(callable, handler) as Chainable;
}
