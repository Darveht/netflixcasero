#!/usr/bin/env python3
import http.server
import socketserver

PORT = 5000
HOST = "0.0.0.0"

class MyHandler(http.server.SimpleHTTPRequestHandler):
    def end_headers(self):
        self.send_header('Cache-Control', 'no-cache, no-store, must-revalidate')
        self.send_header('Pragma', 'no-cache')
        self.send_header('Expires', '0')
        self.send_header('Access-Control-Allow-Origin', '*')
        super().end_headers()

class ReuseAddressTCPServer(socketserver.TCPServer):
    allow_reuse_address = True

with ReuseAddressTCPServer((HOST, PORT), MyHandler) as httpd:
    print(f"Serving at http://{HOST}:{PORT}")
    httpd.serve_forever()
