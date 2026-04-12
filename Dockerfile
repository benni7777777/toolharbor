# =============================================================================
# OpenToolsKit Production Dockerfile
# Multi-stage build for optimized image size
# Optimized with BuildKit cache mounts for faster builds
# =============================================================================

# syntax=docker/dockerfile:1

# -----------------------------------------------------------------------------
# Stage 1: Build the Next.js static export
# -----------------------------------------------------------------------------
FROM node:22-alpine AS builder

WORKDIR /app

# Install dependencies first (better layer caching)
# Use BuildKit cache mount to persist npm cache across builds
COPY package.json package-lock.json ./
RUN --mount=type=cache,target=/root/.npm \
    npm ci --ignore-scripts

# Copy source code
COPY . .

# Build the static export
# Use BuildKit cache mount for Next.js cache to speed up rebuilds
RUN --mount=type=cache,target=/root/.npm \
    --mount=type=cache,target=/app/.next/cache \
    npm run build

# -----------------------------------------------------------------------------
# Stage 2: Serve with Nginx
# -----------------------------------------------------------------------------
FROM nginx:1.25-alpine AS production

# Add labels for GitHub Container Registry
LABEL org.opencontainers.image.source="https://github.com/benni7777777/toolharbor"
LABEL org.opencontainers.image.description="OpenToolsKit - Open-source browser tools for private document workflows"
LABEL org.opencontainers.image.licenses="AGPL-3.0"
LABEL org.opencontainers.image.title="OpenToolsKit"
LABEL org.opencontainers.image.vendor="OpenToolsKit"

# Copy custom nginx configuration
COPY nginx.conf /etc/nginx/conf.d/default.conf
COPY security-headers.conf /etc/nginx/security-headers.conf

# Copy the static export from builder stage
COPY --from=builder /app/out /website/opentoolskit

# Decompress LibreOffice WASM .gz files so both original and .gz exist.
# gzip_static requires the original file to exist; without it, Nginx returns 404.
# The .gz files are kept alongside for gzip_static to serve to gzip-capable clients.
RUN if [ -d /website/opentoolskit/libreoffice-wasm ]; then \
    cd /website/opentoolskit/libreoffice-wasm && \
    for f in *.gz; do \
    [ -f "$f" ] && gunzip -k "$f" || true; \
    done; \
    fi

# Expose port 80
EXPOSE 80

# Start Nginx
CMD ["nginx", "-g", "daemon off;"]
