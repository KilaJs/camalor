import { createCamalorProxy } from "@camalor/proxy";
import { Camalor } from "./camalor";

export const camalor = createCamalorProxy(new Camalor()).style;
