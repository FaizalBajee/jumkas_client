# Stage 1: build the app
# Use a well-supported Node image to install dependencies and create a production build.
# We pin to a minor version (e.g., 20) to keep the build stable across CI runs.
FROM node:20-alpine AS build

# Set a working directory inside the container.
WORKDIR /app

# Copy package metadata first to leverage Docker layer caching when dependencies don't change.
COPY package.json package-lock.json* ./

# Install dependencies (including dev deps required for build).
RUN npm ci

# Copy the rest of the source code.
COPY . .

# Run the build step (Vite builds to dist/ by default).
RUN npm run build


# Stage 2: serve the build output
# Use a small, secure web server to serve static assets.
FROM nginx:stable-alpine AS production

# Remove the default nginx content.
RUN rm -rf /usr/share/nginx/html/*

# Copy the built files from the previous stage.
COPY --from=build /app/dist /usr/share/nginx/html

# (Optional) copy a custom nginx config if you have one.
# COPY nginx.conf /etc/nginx/conf.d/default.conf

# Expose the default HTTP port.
EXPOSE 80

# Start nginx in the foreground.
CMD ["nginx", "-g", "daemon off;"]
