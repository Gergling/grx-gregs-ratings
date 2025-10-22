import { MetricChip } from "@gergling/ui-components";
import { useQuery } from "@tanstack/react-query";
import { useMemo } from "react";
import { TWELVE_HOURS_IN_MS } from "../../../common/constants";
import { PrimaryLabelChipProps } from "../../elastic-response/types";

const getLabel = (title: string = 'Development') => `${title} Progress (${title.charAt(0)}PX)`;

const fetchDevelopmentProgressData = async () => {
  const data = await fetch('https://api.github.com/repos/gergling/grx-gregs-ratings/milestones/1');
  const json: {
    open_issues: number;
    closed_issues: number;
    title: string;
  } = await data.json();
  return json;
}

type MetricChipProps = Parameters<typeof MetricChip>[0];

export const useRandometricDevelopmentProgress = (): PrimaryLabelChipProps => {
  const {
    data,
    error,
    isLoading,
  } = useQuery({
    queryKey: ['development-progress'],
    queryFn: fetchDevelopmentProgressData,
    staleTime: TWELVE_HOURS_IN_MS,
    gcTime: TWELVE_HOURS_IN_MS,
  });

  const {
    label,
    value,
  } = useMemo((): MetricChipProps => {
    const label = getLabel(data?.title);

    if (error) return {
      color: 'error',
      label: getLabel(),
      value: 'Error',
    };
    if (isLoading) return {
      color: 'default',
      label: getLabel(),
      value: 'Loading...',
    };
    if (!data) return {
      color: 'default',
      label: getLabel(),
      value: 'No data',
    };

    const total = data.closed_issues + data.open_issues;
    const fraction = data.closed_issues / total;
    const value = `${(fraction * 100).toFixed()}%`;

    return {
      color: 'primary',
      label,
      value,
    };
  }, [data, error, isLoading]);

  return useMemo(() => ({ label, value }), [label, value]);
};
