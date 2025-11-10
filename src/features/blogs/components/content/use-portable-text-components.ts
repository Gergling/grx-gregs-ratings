import { PortableTextReactComponents } from "@portabletext/react";
import { BlogRendererFigure } from "./Figure";
import { BlogRendererMicroform } from "./Microform";
import { BlogRendererAccordion } from "./Accordion";

export const usePortableTextComponents = (): Partial<PortableTextReactComponents> => ({
  types: {
    accordion: BlogRendererAccordion,
    figure: BlogRendererFigure,
    microform: BlogRendererMicroform,
  },
});
