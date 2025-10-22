import { describe, expect, it } from 'vitest';
import { Randometric } from '../config';
import { getMetricConfig } from './get-metric-config';

const mockRandometrics: Randometric[] = [
  {
    name: 'dev',
    priority: 1,
    props: {
      label: 'Metric A',
      horizontal: false, // effective size: 1x2
      size: { width: 1, height: 1 },
    },
  },
  {
    name: 'eot',
    priority: 2,
    props: {
      label: 'Metric B',
      horizontal: true, // effective size: 3x1
      size: { width: 2, height: 1 },
    },
  },
  {
    name: 'brx',
    priority: 3,
    props: {
      label: 'Metric C',
      horizontal: false, // effective size: 2x3
      size: { width: 2, height: 2 },
    },
  },
  {
    name: 'dev', // Duplicate name, different size
    priority: 4,
    props: {
      label: 'Metric A-2',
      horizontal: true, // effective size: 2x1
      size: { width: 1, height: 1 },
    },
  },
];

describe('getMetricConfig', () => {
  it('should return undefined if no metrics are provided', () => {
    const result = getMetricConfig({ name: 'dev' }, []);
    expect(result).toBeUndefined();
  });

  it('should return undefined if no match is found', () => {
    // @ts-expect-error - Testing with a name that is not a valid RandometricConfigKey.
    const result = getMetricConfig({ name: 'nonExistent' }, mockRandometrics);
    expect(result).toBeUndefined();
  });

  describe('when searching by name only', () => {
    it('should find the first metric that matches the name', () => {
      const result = getMetricConfig({ name: 'dev' }, mockRandometrics);
      expect(result).toBe(mockRandometrics[0]);
      expect(result?.name).toBe('dev');
      expect(result?.priority).toBe(1);
    });
  });

  describe('when searching by size only', () => {
    it('should find a metric with a non-horizontal effective size', () => {
      // 'dev' metric is { width: 1, height: 1, horizontal: false } -> effective 1x2
      const result = getMetricConfig({ width: 1, height: 2 }, mockRandometrics);
      expect(result).toBe(mockRandometrics[0]);
    });

    it('should find a metric with a horizontal effective size', () => {
      // 'eot' metric is { width: 2, height: 1, horizontal: true } -> effective 3x1
      const result = getMetricConfig({ width: 3, height: 1 }, mockRandometrics);
      expect(result).toBe(mockRandometrics[1]);
    });

    it('should return undefined for a size that does not match', () => {
      const result = getMetricConfig({ width: 99, height: 99 }, mockRandometrics);
      expect(result).toBeUndefined();
    });
  });

  describe('when searching by both name and size', () => {
    it('should find a metric that matches both name and effective size', () => {
      // second 'dev' metric is { name: 'dev', width: 1, height: 1, horizontal: true } -> effective 2x1
      const result = getMetricConfig(
        { name: 'dev', width: 2, height: 1 },
        mockRandometrics,
      );
      expect(result).toBe(mockRandometrics[3]);
      expect(result?.priority).toBe(4);
    });

    it('should not find a metric if only the name matches', () => {
      const result = getMetricConfig(
        { name: 'dev', width: 99, height: 99 },
        mockRandometrics,
      );
      expect(result).toBeUndefined();
    });

    it('should not find a metric if only the size matches', () => {
      const result = getMetricConfig(
        // @ts-expect-error - Testing with a name that is not a valid RandometricConfigKey.
        { name: 'nonExistent', width: 1, height: 2 }, // 'nonExistent' is not a valid name
        mockRandometrics,
      );
      expect(result).toBeUndefined();
    });
  });
});
