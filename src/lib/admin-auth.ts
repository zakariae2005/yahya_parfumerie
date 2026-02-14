// Simple admin authentication (in production, use proper authentication)
const ADMIN_PASSWORD = 'admin123' // Should be hashed and in environment variable

export function validateAdminPassword(password: string): boolean {
  return password === ADMIN_PASSWORD
}

export function setAdminSession() {
  if (typeof window !== 'undefined') {
    sessionStorage.setItem('admin_authenticated', 'true')
  }
}

export function clearAdminSession() {
  if (typeof window !== 'undefined') {
    sessionStorage.removeItem('admin_authenticated')
  }
}

export function isAdminAuthenticated(): boolean {
  if (typeof window === 'undefined') return false
  return sessionStorage.getItem('admin_authenticated') === 'true'
}
