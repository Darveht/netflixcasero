#!/bin/bash

# IBTV Security Setup Script
# This script helps configure the security settings for the IBTV platform

echo "🔒 IBTV Security Setup"
echo "======================"

# Check if .env file exists
if [ ! -f ".env" ]; then
    echo "📝 Creating .env file from template..."
    cp .env.example .env
    echo "✅ .env file created. Please edit it with your actual Firebase credentials."
    echo ""
    echo "⚠️  IMPORTANT: Never commit the .env file to version control!"
    echo ""
else
    echo "✅ .env file already exists."
fi

# Check if .gitignore exists and contains .env
if [ ! -f ".gitignore" ]; then
    echo "📝 Creating .gitignore file..."
    echo ".env" > .gitignore
    echo "✅ .gitignore created."
elif ! grep -q "^\.env$" .gitignore; then
    echo "📝 Adding .env to .gitignore..."
    echo ".env" >> .gitignore
    echo "✅ .env added to .gitignore."
else
    echo "✅ .gitignore already configured."
fi

# Check Node.js dependencies for security
if [ -f "package.json" ]; then
    echo "🔍 Checking for security vulnerabilities..."
    if command -v npm &> /dev/null; then
        npm audit --audit-level moderate
    else
        echo "⚠️  npm not found. Please install Node.js to run security audits."
    fi
else
    echo "📦 No package.json found. Creating basic security package.json..."
    cat > package.json << EOF
{
  "name": "ibtv-platform",
  "version": "1.0.0",
  "description": "IBTV Streaming Platform",
  "scripts": {
    "security-audit": "npm audit",
    "security-fix": "npm audit fix",
    "start": "python3 -m http.server 5000"
  },
  "devDependencies": {
    "eslint": "^8.0.0",
    "eslint-plugin-security": "^1.7.1"
  }
}
EOF
    echo "✅ package.json created with security tools."
fi

# Create security headers configuration for web server
echo "📝 Creating security headers configuration..."
cat > .htaccess << EOF
# Security Headers for IBTV Platform

# Prevent MIME type sniffing
Header always set X-Content-Type-Options nosniff

# Prevent clickjacking
Header always set X-Frame-Options DENY

# Enable XSS protection
Header always set X-XSS-Protection "1; mode=block"

# Control referrer information
Header always set Referrer-Policy "strict-origin-when-cross-origin"

# Permissions policy
Header always set Permissions-Policy "geolocation=(), microphone=(), camera=()"

# Content Security Policy
Header always set Content-Security-Policy "default-src 'self'; script-src 'self' 'unsafe-inline' https://www.gstatic.com https://cdnjs.cloudflare.com; style-src 'self' 'unsafe-inline' https://cdnjs.cloudflare.com; img-src 'self' data: https: blob:; media-src 'self' https: blob:; connect-src 'self' https://clack-koder-default-rtdb.firebaseio.com https://identitytoolkit.googleapis.com; font-src 'self' https://cdnjs.cloudflare.com; object-src 'none'; base-uri 'self'; form-action 'self';"

# Force HTTPS (uncomment in production)
# Header always set Strict-Transport-Security "max-age=31536000; includeSubDomains"
EOF

echo "✅ Security headers configuration created (.htaccess)."

# Create Python server with security headers
echo "📝 Creating secure Python server script..."
cat > secure-server.py << 'EOF'
#!/usr/bin/env python3
"""
Secure HTTP Server for IBTV Platform
Includes security headers and basic protection
"""

import http.server
import socketserver
import os
from urllib.parse import urlparse

class SecureHTTPRequestHandler(http.server.SimpleHTTPRequestHandler):
    def end_headers(self):
        # Add security headers
        self.send_header('X-Content-Type-Options', 'nosniff')
        self.send_header('X-Frame-Options', 'DENY')
        self.send_header('X-XSS-Protection', '1; mode=block')
        self.send_header('Referrer-Policy', 'strict-origin-when-cross-origin')
        self.send_header('Permissions-Policy', 'geolocation=(), microphone=(), camera=()')
        
        # Content Security Policy
        csp = (
            "default-src 'self'; "
            "script-src 'self' 'unsafe-inline' https://www.gstatic.com https://cdnjs.cloudflare.com; "
            "style-src 'self' 'unsafe-inline' https://cdnjs.cloudflare.com; "
            "img-src 'self' data: https: blob:; "
            "media-src 'self' https: blob:; "
            "connect-src 'self' https://clack-koder-default-rtdb.firebaseio.com https://identitytoolkit.googleapis.com; "
            "font-src 'self' https://cdnjs.cloudflare.com; "
            "object-src 'none'; "
            "base-uri 'self'; "
            "form-action 'self';"
        )
        self.send_header('Content-Security-Policy', csp)
        
        super().end_headers()
    
    def do_GET(self):
        # Basic path traversal protection
        parsed_path = urlparse(self.path)
        if '..' in parsed_path.path:
            self.send_error(403, "Forbidden")
            return
        
        super().do_GET()

if __name__ == "__main__":
    PORT = 5000
    
    with socketserver.TCPServer(("", PORT), SecureHTTPRequestHandler) as httpd:
        print(f"🔒 Secure server running at http://localhost:{PORT}")
        print("Press Ctrl+C to stop the server")
        try:
            httpd.serve_forever()
        except KeyboardInterrupt:
            print("\n🛑 Server stopped")
EOF

chmod +x secure-server.py
echo "✅ Secure Python server created (secure-server.py)."

# Create security checklist
echo "📝 Creating security checklist..."
cat > SECURITY-CHECKLIST.md << EOF
# Security Checklist for IBTV Platform

## Pre-deployment Checklist

### Environment Configuration
- [ ] .env file configured with actual Firebase credentials
- [ ] .env file added to .gitignore
- [ ] No hardcoded credentials in source code
- [ ] Environment variables validated

### Security Headers
- [ ] Content Security Policy implemented
- [ ] X-Frame-Options set to DENY
- [ ] X-Content-Type-Options set to nosniff
- [ ] X-XSS-Protection enabled
- [ ] Referrer-Policy configured

### External Dependencies
- [ ] All CDN resources have SRI hashes
- [ ] External scripts reviewed for security
- [ ] Dependencies updated to latest versions
- [ ] npm audit run and vulnerabilities fixed

### Input Validation
- [ ] User input sanitized
- [ ] Email validation implemented
- [ ] Rate limiting configured
- [ ] Authentication flows tested

### HTTPS Configuration
- [ ] SSL certificate installed
- [ ] HTTP to HTTPS redirect configured
- [ ] Strict-Transport-Security header enabled
- [ ] Secure cookies configured

### Firebase Security
- [ ] Firebase security rules configured
- [ ] Database access restricted
- [ ] Authentication required for sensitive operations
- [ ] API keys restricted to specific domains

### Monitoring
- [ ] Error logging configured
- [ ] Security event monitoring setup
- [ ] Failed login attempt tracking
- [ ] CSP violation reporting enabled

## Regular Maintenance

### Weekly
- [ ] Check for dependency updates
- [ ] Review error logs
- [ ] Monitor failed authentication attempts

### Monthly
- [ ] Run security audit (npm audit)
- [ ] Review and update dependencies
- [ ] Check CSP violation reports
- [ ] Review access logs

### Quarterly
- [ ] Security assessment
- [ ] Penetration testing
- [ ] Review and update security policies
- [ ] Credential rotation

## Emergency Response

### If Security Incident Detected
1. Isolate affected systems
2. Preserve evidence
3. Notify security team
4. Document incident
5. Implement fixes
6. Review and improve security measures

### Contact Information
- Security Team: security@ibtv.com
- Emergency Contact: [Phone Number]
EOF

echo "✅ Security checklist created (SECURITY-CHECKLIST.md)."

echo ""
echo "🎉 Security setup complete!"
echo ""
echo "Next steps:"
echo "1. Edit .env file with your actual Firebase credentials"
echo "2. Review SECURITY-CHECKLIST.md"
echo "3. Run 'python3 secure-server.py' to start the secure server"
echo "4. Test the application thoroughly"
echo ""
echo "⚠️  Remember: Never commit .env file to version control!"