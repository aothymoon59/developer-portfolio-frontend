const ADMIN_STORAGE_KEY = "portfolio_admin_auth";

export function getAdminAuth() {
  const fallback = { token: "", user: null };

  try {
    const storedAuth = localStorage.getItem(ADMIN_STORAGE_KEY);
    return storedAuth ? JSON.parse(storedAuth) : fallback;
  } catch (error) {
    return fallback;
  }
}

export function setAdminAuth(authData) {
  localStorage.setItem(ADMIN_STORAGE_KEY, JSON.stringify(authData));
}

export function clearAdminAuth() {
  localStorage.removeItem(ADMIN_STORAGE_KEY);
}

export function getAdminToken() {
  return getAdminAuth().token || "";
}

export function getAdminUser() {
  return getAdminAuth().user || null;
}

export function isAdminAuthenticated() {
  return Boolean(getAdminToken());
}
