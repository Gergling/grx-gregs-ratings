import { Temporal } from '@js-temporal/polyfill';
import { describe, expect, it } from 'vitest';
import { getRelativeTimeString } from './get-relative-time-string';

describe('getRelativeTimeString', () => {
  it('should return "just now" for a zero duration', () => {
    const duration = Temporal.Duration.from({ seconds: 0 });
    expect(getRelativeTimeString(duration)).toBe('just now');
  });

  it('should return "just now" for a duration with no relevant units', () => {
    const duration = Temporal.Duration.from({ milliseconds: 500 });
    expect(getRelativeTimeString(duration)).toBe('just now');
  });

  it('should handle singular units correctly', () => {
    expect(getRelativeTimeString(Temporal.Duration.from({ years: 1 }))).toBe('1 year ago');
    expect(getRelativeTimeString(Temporal.Duration.from({ months: 1 }))).toBe('1 month ago');
    expect(getRelativeTimeString(Temporal.Duration.from({ days: 1 }))).toBe('1 day ago');
    expect(getRelativeTimeString(Temporal.Duration.from({ hours: 1 }))).toBe('1 hour ago');
    expect(getRelativeTimeString(Temporal.Duration.from({ minutes: 1 }))).toBe('1 minute ago');
    expect(getRelativeTimeString(Temporal.Duration.from({ seconds: 1 }))).toBe('1 second ago');
  });

  it('should handle plural units correctly', () => {
    expect(getRelativeTimeString(Temporal.Duration.from({ years: 2 }))).toBe('2 years ago');
    expect(getRelativeTimeString(Temporal.Duration.from({ months: 5 }))).toBe('5 months ago');
    expect(getRelativeTimeString(Temporal.Duration.from({ days: 10 }))).toBe('1 week ago');
    expect(getRelativeTimeString(Temporal.Duration.from({ hours: 12 }))).toBe('12 hours ago');
    expect(getRelativeTimeString(Temporal.Duration.from({ minutes: 30 }))).toBe('30 minutes ago');
    expect(getRelativeTimeString(Temporal.Duration.from({ seconds: 45 }))).toBe('45 seconds ago');
  });

  it('should return the largest unit when multiple are present', () => {
    const durationWithYears = Temporal.Duration.from({
      years: 2,
      months: 3,
      days: 15,
    });
    expect(getRelativeTimeString(durationWithYears)).toBe('2 years ago');

    const durationWithMonths = Temporal.Duration.from({
      months: 3,
      days: 15,
      hours: 10,
    });
    expect(getRelativeTimeString(durationWithMonths)).toBe('3 months ago');

    const durationWithDays = Temporal.Duration.from({
      days: 15,
      hours: 10,
    });
    expect(getRelativeTimeString(durationWithDays)).toBe('2 weeks ago');

    const durationWithMinutes = Temporal.Duration.from({
      minutes: 5,
      seconds: 30,
    });
    expect(getRelativeTimeString(durationWithMinutes)).toBe('5 minutes ago');
  });

  describe('when handling weeks', () => {
    it('should convert 7 days to "1 week ago"', () => {
      const duration = Temporal.Duration.from({ days: 7 });
      expect(getRelativeTimeString(duration)).toBe('1 week ago');
    });

    it('should convert more than 7 days to weeks (plural)', () => {
      const duration = Temporal.Duration.from({ days: 14 });
      expect(getRelativeTimeString(duration)).toBe('2 weeks ago');
    });

    it('should floor the number of weeks for durations between multiples of 7', () => {
      const duration = Temporal.Duration.from({ days: 13 });
      expect(getRelativeTimeString(duration)).toBe('1 week ago');
    });
  });
});