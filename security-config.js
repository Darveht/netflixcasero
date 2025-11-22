// Security Configuration for IBTV Platform
// This file contains security settings and utilities

class SecurityConfig {
  constructor() {
    this.config = {
      // Firebase configuration with environment variables
      firebase: {
        apiKey: this.getEnvVar('FIREBASE_API_KEY'),
        authDomain: this.getEnvVar('FIREBASE_AUTH_DOMAIN'),
        databaseURL: this.getEnvVar('FIREBASE_DATABASE_URL'),
        projectId: this.getEnvVar('FIREBASE_PROJECT_ID'),
        storageBucket: this.getEnvVar('FIREBASE_STORAGE_BUCKET'),
        messagingSenderId: this.getEnvVar('FIREBASE_MESSAGING_SENDER_ID'),
        appId: this.getEnvVar('FIREBASE_APP_ID'),
        measurementId: this.getEnvVar('FIREBASE_MEASUREMENT_ID')
      },
      
      // Security headers
      headers: {
        'X-Content-Type-Options': 'nosniff',
        'X-Frame-Options': 'DENY',
        'X-XSS-Protection': '1; mode=block',
        'Referrer-Policy': 'strict-origin-when-cross-origin',
        'Permissions-Policy': 'geolocation=(), microphone=(), camera=()'
      },
      
      // Content Security Policy
      csp: {
        'default-src': "'self'",
        'script-src': "'self' 'unsafe-inline' https://www.gstatic.com https://cdnjs.cloudflare.com",
        'style-src': "'self' 'unsafe-inline' https://cdnjs.cloudflare.com",
        'img-src': "'self' data: https: blob:",
        'media-src': "'self' https: blob:",
        'connect-src': "'self' https://clack-koder-default-rtdb.firebaseio.com https://identitytoolkit.googleapis.com",
        'font-src': "'self' https://cdnjs.cloudflare.com",
        'object-src': "'none'",
        'base-uri': "'self'",
        'form-action': "'self'"
      }
    };
  }

  // Get environment variable with fallback
  getEnvVar(name) {
    if (typeof process !== 'undefined' && process.env) {
      return process.env[name];
    }
    
    // Fallback for client-side (should be replaced with actual values in production)
    const fallbacks = {
      'FIREBASE_API_KEY': '<FIREBASE_API_KEY>',
      'FIREBASE_AUTH_DOMAIN': '<FIREBASE_AUTH_DOMAIN>',
      'FIREBASE_DATABASE_URL': '<FIREBASE_DATABASE_URL>',
      'FIREBASE_PROJECT_ID': '<FIREBASE_PROJECT_ID>',
      'FIREBASE_STORAGE_BUCKET': '<FIREBASE_STORAGE_BUCKET>',
      'FIREBASE_MESSAGING_SENDER_ID': '<FIREBASE_MESSAGING_SENDER_ID>',
      'FIREBASE_APP_ID': '<FIREBASE_APP_ID>',
      'FIREBASE_MEASUREMENT_ID': '<FIREBASE_MEASUREMENT_ID>'
    };
    
    return fallbacks[name] || '';
  }

  // Get Firebase configuration
  getFirebaseConfig() {
    return this.config.firebase;
  }

  // Validate Firebase configuration
  validateFirebaseConfig() {
    const config = this.config.firebase;
    const requiredFields = ['apiKey', 'authDomain', 'databaseURL', 'projectId'];
    
    for (const field of requiredFields) {
      if (!config[field] || config[field].startsWith('<')) {
        console.error(`Firebase configuration error: ${field} is not properly configured`);
        return false;
      }
    }
    
    return true;
  }

  // Sanitize user input
  sanitizeInput(input) {
    if (typeof input !== 'string') return input;
    
    return input
      .replace(/[<>]/g, '') // Remove potential HTML tags
      .replace(/javascript:/gi, '') // Remove javascript: protocol
      .replace(/on\w+=/gi, '') // Remove event handlers
      .trim();
  }

  // Validate email format
  validateEmail(email) {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
  }

  // Generate secure random string
  generateSecureToken(length = 32) {
    const chars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
    let result = '';
    
    if (typeof crypto !== 'undefined' && crypto.getRandomValues) {
      const array = new Uint8Array(length);
      crypto.getRandomValues(array);
      
      for (let i = 0; i < length; i++) {
        result += chars[array[i] % chars.length];
      }
    } else {
      // Fallback for environments without crypto API
      for (let i = 0; i < length; i++) {
        result += chars[Math.floor(Math.random() * chars.length)];
      }
    }
    
    return result;
  }

  // Rate limiting helper
  createRateLimiter(maxAttempts = 5, windowMs = 15 * 60 * 1000) {
    const attempts = new Map();
    
    return (identifier) => {
      const now = Date.now();
      const userAttempts = attempts.get(identifier) || [];
      
      // Remove old attempts outside the window
      const validAttempts = userAttempts.filter(time => now - time < windowMs);
      
      if (validAttempts.length >= maxAttempts) {
        return false; // Rate limit exceeded
      }
      
      validAttempts.push(now);
      attempts.set(identifier, validAttempts);
      
      return true; // Allow request
    };
  }
}

// Export for use in other files
if (typeof module !== 'undefined' && module.exports) {
  module.exports = SecurityConfig;
} else if (typeof window !== 'undefined') {
  window.SecurityConfig = SecurityConfig;
}