/** PM2 on EC2: run from repo root — `pm2 start deploy/ec2-pm2.ecosystem.cjs` */
module.exports = {
  apps: [
    {
      name: "kiccpa-backend",
      cwd: "./backend",
      script: "index.js",
      env: { NODE_ENV: "production" },
    },
    {
      name: "kiccpa-web",
      cwd: "./frontend",
      script: "npm",
      args: "start",
      env: {
        NODE_ENV: "production",
        PORT: "3000",
        BACKEND_PROXY_URL: "http://127.0.0.1:5000",
        S3_RESOURCES_BUCKET: "kiccpa-resources",
        AWS_REGION: "ap-south-1",
      },
    },
  ],
};
