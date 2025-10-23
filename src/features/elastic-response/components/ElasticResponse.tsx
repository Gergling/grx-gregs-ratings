import { contextFactory, useNavigationDrawer } from "@gergling/ui-components";
import { PropsWithChildren, useCallback, useEffect, useMemo } from "react";
import { create } from "zustand";
import useWindowWidthRem from "../../../common/hooks/use-window-width-rem";
import { getRem, getSize } from "../utilities/rem-cell";
import { getVisibleBreakpoint } from "../utilities/get-visible-breakpoint";

const elasticResponseStore = create<{
  breakpoints: number[];
  breakpoint: number;
  drawerRail: boolean;
  size: number;
  register: (breakpoint: number) => void;
  setDrawerRail: (drawerRail: boolean) => void;
  setSize: (size: number) => void;
}>((set, get) => ({
  breakpoints: [],
  breakpoint: 0,
  drawerRail: false,
  size: 0,
  register: (breakpoint: number) => {
    const {
      breakpoints: previousBreakpoints,
      size,
    } = get();
    const breakpoints = [...new Set([...previousBreakpoints, breakpoint])].sort((a, b) => b - a);
    const visibleBreakpoint = getVisibleBreakpoint(size, breakpoints);
    
    set({ breakpoint: visibleBreakpoint, breakpoints, size });
  },
  setDrawerRail: (drawerRail) => {
    set({ drawerRail });
  },
  setSize: (size: number) => {
    const {
      breakpoints,
    } = get();
    const breakpoint = getVisibleBreakpoint(size, breakpoints);
    set({ breakpoint, size });
  },
}));

const {
  Provider,
  useContextHook,
} = contextFactory(
  // TODO: GDS needs a fix so the factory doesn't need to have this argument.
  (_: PropsWithChildren) => {
    const store = elasticResponseStore();
    const { drawerRail, setSize } = store;

    const remWidthDrawerOffset = useMemo(
      () => drawerRail ? 2 : 0,
      [drawerRail]
    );

    const windowWidth = useWindowWidthRem();

    useEffect(
      () => {
        const rems = Math.floor(getSize(windowWidth - remWidthDrawerOffset, 0).columns);
        // console.log('use context size', rems)
        setSize(rems);
      },
      [setSize, windowWidth]
    );

    return store;
  },
  'elasticResponse'
);

export const useElasticResponse = () => {
  const {
    breakpoint,
    breakpoints,
    register,
    setDrawerRail,
    size,
  } = useContextHook();
  const { containerLeftMargin } = useNavigationDrawer();

  const isVisible = useCallback(
    (value: number) => value === (breakpoint),
    [breakpoint]
  );

  const getWidth = useCallback(
    (offset: number = 0) => getRem(breakpoint, 1).width - offset,
    [breakpoint]
  );

  useEffect(() => {
    setDrawerRail(containerLeftMargin > 0);
  }, [containerLeftMargin])

  return useMemo(() => ({
    breakpoint,
    breakpoints,
    getWidth,
    isVisible,
    register,
    size,
  }), [breakpoint, breakpoints, getWidth, isVisible, register, size]);
};

export const ElasticResponseItem = ({
  breakpoint,
  children,
}: PropsWithChildren & {
  breakpoint: number;
}) => {
  const {
    isVisible,
    register,
  } = useElasticResponse();
  const visible = useMemo(() => isVisible(breakpoint), [breakpoint, isVisible]);

  useEffect(() => {
    register(breakpoint);
  }, [breakpoint, register]);

  if (!visible) return null;

  return children;
}

export const ElasticResponseContainer = ({
  children,
}: PropsWithChildren) => (
  <Provider>
    {children}
  </Provider>
);
