const AUTH_COOKIE = "auth_data";
const COOKIE_MAX_AGE_DAYS = 7;

export interface AuthCookieData {
  token: string;
  email: string;
  name?: string;
}

export function setAuthCookie(data: AuthCookieData) {
  const maxAge = COOKIE_MAX_AGE_DAYS * 24 * 60 * 60;
  const value = encodeURIComponent(JSON.stringify(data));
  document.cookie = `${AUTH_COOKIE}=${value}; path=/; max-age=${maxAge}; SameSite=Lax`;
}

export function getAuthCookie(): AuthCookieData | null {
  if (typeof document === "undefined") return null;
  const match = document.cookie.match(new RegExp(`(?:^|; )${AUTH_COOKIE}=([^;]*)`));
  if (!match) return null;
  try {
    return JSON.parse(decodeURIComponent(match[1])) as AuthCookieData;
  } catch {
    return null;
  }
}

export function clearAuthCookie() {
  document.cookie = `${AUTH_COOKIE}=; path=/; max-age=0`;
}
