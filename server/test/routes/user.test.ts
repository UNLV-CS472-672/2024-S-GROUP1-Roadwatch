import { describe, expect, test } from '@jest/globals';

describe('user test', () => {
  test('should return true', () => {
    const result = 1 + 2;
    expect(result).toBe(3);
  });
});
