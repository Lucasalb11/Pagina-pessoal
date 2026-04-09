/**
 * Authentication utilities with security features
 */

const MAX_LOGIN_ATTEMPTS = 5;
const LOCKOUT_DURATION = 15 * 60 * 1000; // 15 minutes in milliseconds
const ATTEMPT_STORAGE_KEY = "admin_login_attempts";
const LOCKOUT_STORAGE_KEY = "admin_lockout_until";

interface LoginAttempts {
  count: number;
  lastAttempt: number;
}

/**
 * Simple hash function for password comparison
 * Note: This is a basic hash. For production, use proper password hashing (bcrypt, argon2, etc.)
 */
function simpleHash(password: string): string {
  let hash = 0;
  for (let i = 0; i < password.length; i++) {
    const char = password.charCodeAt(i);
    hash = ((hash << 5) - hash) + char;
    hash = hash & hash; // Convert to 32-bit integer
  }
  return hash.toString(36);
}

/**
 * Get stored login attempts
 */
function getLoginAttempts(): LoginAttempts {
  try {
    const stored = sessionStorage.getItem(ATTEMPT_STORAGE_KEY);
    if (stored) {
      return JSON.parse(stored);
    }
  } catch (e) {
    // Ignore errors
  }
  return { count: 0, lastAttempt: 0 };
}

/**
 * Save login attempts
 */
function saveLoginAttempts(attempts: LoginAttempts): void {
  try {
    sessionStorage.setItem(ATTEMPT_STORAGE_KEY, JSON.stringify(attempts));
  } catch (e) {
    // Ignore errors
  }
}

/**
 * Check if account is locked out
 */
export function isLockedOut(): boolean {
  try {
    const lockoutUntil = sessionStorage.getItem(LOCKOUT_STORAGE_KEY);
    if (lockoutUntil) {
      const lockoutTime = parseInt(lockoutUntil, 10);
      if (Date.now() < lockoutTime) {
        return true;
      } else {
        // Lockout expired, clear it
        sessionStorage.removeItem(LOCKOUT_STORAGE_KEY);
        sessionStorage.removeItem(ATTEMPT_STORAGE_KEY);
      }
    }
  } catch (e) {
    // Ignore errors
  }
  return false;
}

/**
 * Get remaining lockout time in seconds
 */
export function getRemainingLockoutTime(): number {
  try {
    const lockoutUntil = sessionStorage.getItem(LOCKOUT_STORAGE_KEY);
    if (lockoutUntil) {
      const lockoutTime = parseInt(lockoutUntil, 10);
      const remaining = Math.ceil((lockoutTime - Date.now()) / 1000);
      return remaining > 0 ? remaining : 0;
    }
  } catch (e) {
    // Ignore errors
  }
  return 0;
}

/**
 * Record failed login attempt
 */
function recordFailedAttempt(): void {
  const attempts = getLoginAttempts();
  attempts.count += 1;
  attempts.lastAttempt = Date.now();
  saveLoginAttempts(attempts);

  if (attempts.count >= MAX_LOGIN_ATTEMPTS) {
    // Lock out the account
    const lockoutUntil = Date.now() + LOCKOUT_DURATION;
    sessionStorage.setItem(LOCKOUT_STORAGE_KEY, lockoutUntil.toString());
  }
}

/**
 * Clear login attempts (on successful login)
 */
export function clearLoginAttempts(): void {
  try {
    sessionStorage.removeItem(ATTEMPT_STORAGE_KEY);
    sessionStorage.removeItem(LOCKOUT_STORAGE_KEY);
  } catch (e) {
    // Ignore errors
  }
}

/**
 * Verify password with rate limiting
 */
export function verifyPassword(inputPassword: string, correctPassword: string): {
  success: boolean;
  locked: boolean;
  remainingAttempts: number;
  lockoutTime?: number;
} {
  // Check if locked out
  if (isLockedOut()) {
    const remaining = getRemainingLockoutTime();
    return {
      success: false,
      locked: true,
      remainingAttempts: 0,
      lockoutTime: remaining,
    };
  }

  // Get current attempts
  const attempts = getLoginAttempts();
  const remainingAttempts = Math.max(0, MAX_LOGIN_ATTEMPTS - attempts.count);

  // Verify password (using simple comparison for now)
  // In production, use proper password hashing
  const isValid = inputPassword === correctPassword;

  if (isValid) {
    clearLoginAttempts();
    return {
      success: true,
      locked: false,
      remainingAttempts: MAX_LOGIN_ATTEMPTS,
    };
  } else {
    recordFailedAttempt();
    const newRemaining = Math.max(0, remainingAttempts - 1);
    
    return {
      success: false,
      locked: newRemaining === 0,
      remainingAttempts: newRemaining,
      lockoutTime: newRemaining === 0 ? LOCKOUT_DURATION / 1000 : undefined,
    };
  }
}

/**
 * Get admin password from environment or use default
 * WARNING: In production, this should be stored securely server-side
 */
export function getAdminPassword(): string {
  const envPassword = import.meta.env.VITE_ADMIN_PASSWORD;
  
  if (envPassword && envPassword.trim().length > 0) {
    return envPassword.trim();
  }
  
  // Fallback for development (should be removed in production)
  if (import.meta.env.DEV) {
    return "blockchain2024";
  }
  
  // In production, this should never be reached
  // The app should fail if no password is configured
  throw new Error("Admin password not configured. Set VITE_ADMIN_PASSWORD environment variable.");
}

