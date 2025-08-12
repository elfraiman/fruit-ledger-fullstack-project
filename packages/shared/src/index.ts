// Main entry point for shared package
export * from './types';

// Utility functions that might be shared
export const API_ENDPOINTS = {
  FRUITS: '/api/fruits',
  LOCATIONS: '/api/locations',
  LEDGER: '/api/ledger',
  REPORTS: '/api/reports',
};

export const HTTP_STATUS = {
  OK: 200,
  CREATED: 201,
  BAD_REQUEST: 400,
  NOT_FOUND: 404,
  INTERNAL_SERVER_ERROR: 500,
};