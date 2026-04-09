/**
 * Validation utilities for security
 */

/**
 * Validates if a string is a valid URL
 */
export function isValidUrl(url: string): boolean {
  if (!url || typeof url !== 'string') {
    return false;
  }
  
  try {
    const parsed = new URL(url);
    // Only allow http and https protocols
    return ['http:', 'https:'].includes(parsed.protocol);
  } catch {
    return false;
  }
}

/**
 * Sanitizes a string by removing potentially dangerous characters
 */
export function sanitizeString(input: string, maxLength: number = 1000): string {
  if (!input || typeof input !== 'string') {
    return '';
  }
  
  // Remove null bytes and control characters (except newlines and tabs)
  let sanitized = input
    .replace(/\0/g, '')
    .replace(/[\x01-\x08\x0B\x0C\x0E-\x1F\x7F]/g, '');
  
  // Limit length
  if (sanitized.length > maxLength) {
    sanitized = sanitized.substring(0, maxLength);
  }
  
  return sanitized.trim();
}

/**
 * Validates and sanitizes a URL
 */
export function validateAndSanitizeUrl(url: string): string | null {
  if (!url) {
    return null;
  }
  
  const sanitized = sanitizeString(url, 2048);
  
  if (!isValidUrl(sanitized)) {
    return null;
  }
  
  return sanitized;
}

/**
 * Validates project data
 */
export function validateProjectData(data: {
  title?: string;
  description?: string;
  github?: string;
  homepage?: string;
  image?: string;
}): { valid: boolean; errors: string[] } {
  const errors: string[] = [];
  
  if (!data.title || data.title.trim().length === 0) {
    errors.push('Title is required');
  } else if (data.title.length > 200) {
    errors.push('Title must be less than 200 characters');
  }
  
  if (!data.description || data.description.trim().length === 0) {
    errors.push('Description is required');
  } else if (data.description.length > 2000) {
    errors.push('Description must be less than 2000 characters');
  }
  
  if (!data.github) {
    errors.push('GitHub URL is required');
  } else if (!isValidUrl(data.github)) {
    errors.push('GitHub URL is invalid');
  }
  
  if (data.homepage && !isValidUrl(data.homepage)) {
    errors.push('Homepage URL is invalid');
  }
  
  if (data.image && !isValidUrl(data.image)) {
    errors.push('Image URL is invalid');
  }
  
  return {
    valid: errors.length === 0,
    errors,
  };
}

