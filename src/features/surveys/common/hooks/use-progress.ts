import { useMemo } from "react";
import { SurveyProgressProps, SurveyProgressMarker } from "../../common/types";

export const useSurveyProgress = (
  answered: number,
  current: number,
  total: number,
  last?: boolean
): SurveyProgressProps => {
  const markers: SurveyProgressMarker[] = useMemo(
    () => ([
      ...Array.from({ length: answered }, () => ({ answered: true, current: false })),
      ...Array.from({ length: total - answered }, () => ({ answered: false, current: false }))
    ].map((props, idx) => ({ ...props, current: current === idx }))),
    [answered, current, total]
  );

  return useMemo(() => ({
    markers,
    last: last ?? false,
  }), [markers, last]);
};
