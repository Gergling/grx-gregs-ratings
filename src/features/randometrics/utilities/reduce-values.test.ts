import { describe, expect, it, vi } from 'vitest';
import { RandometricConfigKey } from '../config';
import { reduceRandometricValues } from './reduce-values';
import { ReactNode } from 'react';

// Mock the config keys to have a predictable set for testing
vi.mock('../config', async (importOriginal) => {
  const original = await importOriginal<typeof import('../config')>();
  return {
    ...original,
    RANDOMETRIC_CONFIG_KEYS: ['dev', 'eot', 'brx'] as RandometricConfigKey[],
  };
});

describe('reduceRandometricValues', () => {
  const initialValues = {
    dev: 'initial_dev',
    eot: 'initial_eot',
    brx: 'initial_brx',
  } as Record<RandometricConfigKey, ReactNode>;

  it('should not change the object reference if no values are updated', () => {
    const getValue = (previous: ReactNode) => previous; // Always return the same value
    const result = reduceRandometricValues(initialValues, getValue);

    expect(result).toBe(initialValues); // Check for reference equality
    expect(result).toEqual({
      dev: 'initial_dev',
      eot: 'initial_eot',
      brx: 'initial_brx',
    });
  });

  it('should update a single value and return a new object', () => {
    const getValue = (previous: ReactNode, key: RandometricConfigKey) => {
      if (key === 'dev') return 'updated_dev';
      return previous;
    };
    const result = reduceRandometricValues(initialValues, getValue);

    expect(result).not.toBe(initialValues); // Should be a new object
    expect(result).toEqual({
      dev: 'updated_dev',
      eot: 'initial_eot',
      brx: 'initial_brx',
    });
  });

  it('should update multiple values and return a new object', () => {
    const getValue = (previous: ReactNode, key: RandometricConfigKey) => {
      if (key === 'dev') return 'updated_dev';
      if (key === 'brx') return 'updated_brx';
      return previous;
    };
    const result = reduceRandometricValues(initialValues, getValue);

    expect(result).not.toBe(initialValues);
    expect(result).toEqual({
      dev: 'updated_dev',
      eot: 'initial_eot',
      brx: 'updated_brx',
    });
  });

  it('should not update a value if the new value is an empty string', () => {
    const getValue = (previous: ReactNode, key: RandometricConfigKey) => {
      if (key === 'eot') return ''; // Attempt to update with empty string
      return previous;
    };
    const result = reduceRandometricValues(initialValues, getValue);

    expect(result).toBe(initialValues); // Should not have created a new object
    expect(result.eot).toBe('initial_eot');
  });
});