/**
 * Validates if a string is a valid URL
 */
export function isValidUrl(url: string): boolean {
  try {
    new URL(url);
    return true;
  } catch {
    return false;
  }
}

/**
 * Extracts URL from a string (adds protocol if missing)
 */
export function getUrlFromString(str: string): string | null {
  if (isValidUrl(str)) {
    return str;
  }

  // Try adding https://
  const urlWithProtocol = `https://${str}`;
  if (isValidUrl(urlWithProtocol)) {
    return urlWithProtocol;
  }

  return null;
}
