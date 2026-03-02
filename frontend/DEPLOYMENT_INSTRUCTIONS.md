# Deployment Instructions for Internet Identity Authentication

## Overview
This application uses Internet Identity for authentication. To ensure seamless login across different domains and devices (including mobile), you need to configure alternative origins and derivation origins properly.

## Understanding the Issue
The "unverified origin" error occurs when Internet Identity cannot verify the origin of the authentication request. This is especially common on mobile devices where:
- The browser may use different origins
- CORS policies are stricter
- The authentication flow needs proper configuration

## Configuration Steps

### 1. Update Alternative Origins
Edit `frontend/public/.well-known/ii-alternative-origins` to include all domains where your app will be accessed:

