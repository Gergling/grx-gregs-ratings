import { contextFactory } from "@gergling/ui-components";
import { PropsWithChildren } from "react";
import { create } from "zustand";

const blogStore = create<{
  width: number;
  setWidth: (width: number) => void;
}>((set) => ({
  width: 0,
  setWidth: (width) => set({ width }),
}));

export const {
  Provider: BlogProvider,
  useContextHook: useBlogContext,
} = contextFactory((_: PropsWithChildren) => blogStore(), 'blog');
