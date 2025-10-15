import { MetricChip } from "@gergling/ui-components";
import { useQuery } from "@tanstack/react-query";
import { useMemo } from "react";

// Development milestone data can be valid for about 12 hours.
const TWELVE_HOURS = 1000 * 60 * 60 * 12;

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

export const useRandometricDevelopmentProgress = (): MetricChipProps => {
  const {
    data,
    error,
    isLoading,
  } = useQuery({
    queryKey: ['development-progress'],
    queryFn: fetchDevelopmentProgressData,
    staleTime: TWELVE_HOURS,
    gcTime: TWELVE_HOURS,
  });

  const {
    color,
    label,
    value,
  } = useMemo((): MetricChipProps => {
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
    const label = getLabel(data.title);

    return {
      color: 'primary',
      label,
      value,
    };
  }, [data, error, isLoading]);

  return {
    color,
    label,
    value,
  };
};
