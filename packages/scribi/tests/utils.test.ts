/**
 * Utility Functions Tests
 */

import { describe, expect, test } from '@rstest/core';
import { getUrlFromString, isValidUrl } from '../src/utils/url';

describe('URL Utilities', () => {
  describe('isValidUrl', () => {
    test('should return true for valid URLs', () => {
      expect(isValidUrl('https://example.com')).toBe(true);
      expect(isValidUrl('http://example.com')).toBe(true);
      expect(isValidUrl('https://example.com/path')).toBe(true);
      expect(isValidUrl('https://example.com/path?query=value')).toBe(true);
      expect(isValidUrl('https://subdomain.example.com')).toBe(true);
    });

    test('should return false for invalid URLs', () => {
      expect(isValidUrl('not a url')).toBe(false);
      expect(isValidUrl('example.com')).toBe(false);
      expect(isValidUrl('')).toBe(false);
      expect(isValidUrl('javascript:alert(1)')).toBe(true); // Valid URL scheme
    });
  });

  describe('getUrlFromString', () => {
    test('should return URL as-is if already valid', () => {
      expect(getUrlFromString('https://example.com')).toBe(
        'https://example.com',
      );
      expect(getUrlFromString('http://example.com')).toBe('http://example.com');
    });

    test('should add https:// to URLs without protocol', () => {
      expect(getUrlFromString('example.com')).toBe('https://example.com');
      expect(getUrlFromString('www.example.com')).toBe(
        'https://www.example.com',
      );
    });

    test('should return null for invalid strings', () => {
      expect(getUrlFromString('not a url at all')).toBe(null);
      expect(getUrlFromString('')).toBe(null);
    });
  });
});
