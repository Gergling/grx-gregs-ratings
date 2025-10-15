import { MetricChip } from "@gergling/ui-components"
import { useRandometricDevelopmentProgress } from "../hooks"
import { useMemo } from "react";
import { MetricChipProps } from "../types";
import { FACETOMETRICS } from "../constants";
import { Temporal } from "@js-temporal/polyfill";
import { getSeasonalFacetometric } from "../utilities";
import { RandoMetricsContainer } from "./RandometricsPane.style";
import { PaneContainer } from "../../../common/components/PaneContainer";

export const RandometricsPane = () => {
  const now = useMemo(() => Temporal.Now.zonedDateTimeISO(), []);
  const seasonal = useMemo(() => getSeasonalFacetometric(now), [now]);
  const mvp = useRandometricDevelopmentProgress();
  const metrics = useMemo((): MetricChipProps[] => {
    return [
      ...FACETOMETRICS,
      mvp,
      seasonal,
    ];
  }, [mvp, seasonal])
  return (
    <PaneContainer>
      <RandoMetricsContainer>
        {metrics.map((metric) => (
          <MetricChip
            key={metric.label}
            color={metric.color}
            label={metric.label}
            value={metric.value}
          />
        ))}
      </RandoMetricsContainer>
    </PaneContainer>
  );
}