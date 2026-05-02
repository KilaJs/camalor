import { MODIFIERS, type AnsiCode } from "@camalor/constants";
import { createCamalorProxy, createStyleProxy } from "@camalor/proxy";
import type { CamalorChainable, Chainable } from "@camalor/types/chainable.type";
import type { Segment } from "@camalor/types/segment.type";
import { segmentsResolver } from "./segments-resolver";

export class StyleBuilder {
  private color?: AnsiCode;
  private modifiers: AnsiCode[] = [];
  private parentSegments: Segment[];

  constructor(parentSegments: Segment[] = []) {
    this.parentSegments = parentSegments;
  }

  setColor(color: AnsiCode): this {
    this.color = color;
    return this;
  }

  addModifier(modifier: AnsiCode): this {
    this.modifiers.push(modifier);
    return this;
  }

  get bold(): this {
    return this.addModifier(MODIFIERS.bold);
  }

  get italic(): this {
    return this.addModifier(MODIFIERS.italic);
  }

  get underline(): this {
    return this.addModifier(MODIFIERS.underline);
  }

  get dim(): this {
    return this.addModifier(MODIFIERS.dim);
  }

  call(text: string): CamalorChainable {
    if (!this.color) {
      throw new Error("Color not set");
    }

    const newSegment: Segment = {
      text,
      color: this.color,
      modifiers: [...this.modifiers],
    };

    const camalor = new Camalor([...this.parentSegments, newSegment]);

    return createCamalorProxy(camalor);
  }
}

export class Camalor {
  public segments: Segment[] = [];

  constructor(segments: Segment[] = []) {
    this.segments = segments;
  }

  get style(): Chainable {
    const builder = new StyleBuilder(this.segments);
    return createStyleProxy(builder);
  }

  [Symbol.toPrimitive](hint: string) {
    return segmentsResolver(this.segments);
  }

  [Symbol.for("nodejs.util.inspect.custom")]() {
    return segmentsResolver(this.segments);
  }
}
