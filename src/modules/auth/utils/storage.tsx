export const StorageUtils = {
  getItem<T>(key: string): T | null {
    if (typeof window === "undefined") return null;
    const item = localStorage.getItem(key);
    return item ? JSON.parse(item) : null;
  },

  setItem<T>(key: string, value: T): void {
    if (typeof window === "undefined") return;
    localStorage.setItem(key, JSON.stringify(value));
  },

  removeItem(key: string): void {
    if (typeof window === "undefined") return;
    localStorage.removeItem(key);
  },
};

export const CookieUtils = {
  // Clear authentication cookies
  clearAuthCookies(): void {
    if (typeof window === "undefined") return;

    // Clear access token
    document.cookie =
      "accessToken=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;";
    // Clear refresh token
    document.cookie =
      "refreshToken=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;";

    // Also try with secure and sameSite attributes for better coverage
    document.cookie =
      "accessToken=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/; secure; samesite=strict;";
    document.cookie =
      "refreshToken=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/; secure; samesite=strict;";
  },

  // Get a specific cookie value
  getCookie(name: string): string | null {
    if (typeof window === "undefined") return null;

    const value = `; ${document.cookie}`;
    const parts = value.split(`; ${name}=`);
    if (parts.length === 2) {
      return parts.pop()?.split(";").shift() || null;
    }
    return null;
  },

  // Check if auth cookies exist
  hasAuthCookies(): boolean {
    return !!(this.getCookie("accessToken") || this.getCookie("refreshToken"));
  },
};
