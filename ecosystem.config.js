/**
 * PM2 for KICCPA on a shared Hostinger VPS (alongside other apps).
 * Default ports 3010 / 5010 — change if already taken.
 *
 * On server, check free ports first:
 *   ss -tlnp | grep -E '3000|3010|5000|5010'
 *   pm2 list
 *
 * From repo root:
 *   pm2 start ecosystem.config.js
 *   pm2 save
 */
module.exports = {
  apps: [
    {
      name: "kiccpa-backend",
      cwd: "./backend",
      script: "index.js",
      instances: 1,
      autorestart: true,
      watch: false,
      max_memory_restart: "400M",
      env: {
        NODE_ENV: "production",
        PORT: 5010,
      },
    },
    {
      name: "kiccpa-frontend",
      cwd: "./frontend",
      script: "node_modules/next/dist/bin/next",
      args: "start -p 3010",
      instances: 1,
      autorestart: true,
      watch: false,
      max_memory_restart: "800M",
      env: {
        NODE_ENV: "production",
        PORT: 3010,
      },
    },
  ],
};
