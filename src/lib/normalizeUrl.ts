/**
 * Normalizes a URL by ensuring it has the correct protocol format.
 * Fixes URLs that have "https:" or "http:" without "//" after the protocol.
 * 
 * Examples:
 *   normalizeUrl("https:www.example.com") -> "https://www.example.com"
 *   normalizeUrl("http:example.com") -> "http://example.com"
 *   normalizeUrl("https://www.example.com") -> "https://www.example.com" (unchanged)
 *   normalizeUrl("http://example.com") -> "http://example.com" (unchanged)
 * 
 * @param url - The URL to normalize
 * @returns The normalized URL with correct protocol format
 */
export function normalizeUrl(url: string | null | undefined): string | null {
  if (!url || typeof url !== 'string') {
    return null;
  }

  const trimmed = url.trim();
  
  // Fix https: without //
  if (trimmed.startsWith('https:') && !trimmed.startsWith('https://')) {
    return trimmed.replace(/^https:/, 'https://');
  }
  
  // Fix http: without //
  if (trimmed.startsWith('http:') && !trimmed.startsWith('http://')) {
    return trimmed.replace(/^http:/, 'http://');
  }
  
  return trimmed;
}



