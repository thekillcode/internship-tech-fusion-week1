import { clsx, type ClassValue } from "clsx"
import { twMerge } from "tailwind-merge"

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}


export const getBaseUrl = (port: number) => {
  if (typeof window !== 'undefined') {
    if (window.location.hostname === 'localhost' || window.location.hostname === '127.0.0.1') {
      return `http://127.0.0.1:${port}`;
    }
    // Use hostname instead of host to avoid the existing port
    return `${window.location.protocol}//${window.location.hostname}:${port}`;
  }
  return `http://127.0.0.1:${port}`;
};