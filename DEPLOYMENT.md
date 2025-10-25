# Deployment Guide

This application is now compatible with multiple deployment platforms. Choose the one that best fits your needs:

## 🚀 Vercel (Recommended for Frontend)

Vercel is perfect for React applications with excellent performance and global CDN.

### Quick Deploy
1. Push your code to GitHub
2. Connect your repository to Vercel
3. Vercel will automatically detect the Vite framework and deploy

### Manual Deploy
```bash
# Install Vercel CLI
npm i -g vercel

# Deploy
npm run deploy:vercel
```

### Configuration
- **Build Command**: `npm run build`
- **Output Directory**: `dist`
- **Framework**: Vite (auto-detected)
- **Node Version**: 18.x

## 🚂 Railway

Railway is great for full-stack applications and provides persistent storage.

### Quick Deploy
1. Push your code to GitHub
2. Connect your repository to Railway
3. Railway will automatically detect the Node.js project and deploy

### Manual Deploy
```bash
# Install Railway CLI
npm install -g @railway/cli

# Login and deploy
railway login
railway up
```

### Configuration
- **Build Command**: `npm run build`
- **Start Command**: `npm run preview`
- **Node Version**: 18.x
- **Port**: Automatically assigned

## 🐳 Docker

For containerized deployments on any platform supporting Docker.

### Build and Run
```bash
# Build the Docker image
docker build -t claude-artifacts-starter .

# Run the container
docker run -p 3000:3000 claude-artifacts-starter
```

## 📦 GitHub Pages

For static hosting with custom domain support.

### Deploy
```bash
npm run deploy
```

Then configure GitHub Pages to use the `gh-pages` branch.

## 🔧 Environment Variables

### Vercel
- No additional environment variables required
- All configuration is in `vercel.json`

### Railway
- `PORT`: Automatically set by Railway
- `NODE_ENV`: Set to `production` automatically

## 📁 File Structure

```
├── vercel.json          # Vercel configuration
├── railway.json         # Railway configuration
├── nixpacks.toml        # Railway build configuration
├── Dockerfile           # Docker configuration
├── .vercelignore        # Vercel ignore file
├── .railwayignore       # Railway ignore file
├── .dockerignore        # Docker ignore file
└── DEPLOYMENT.md        # This file
```

## 🚨 Important Notes

1. **Vercel**: Best for frontend-only applications with excellent performance
2. **Railway**: Great for full-stack apps, provides database and storage options
3. **Docker**: Universal deployment option, works on any platform
4. **GitHub Pages**: Free static hosting, good for demos and documentation

## 🔍 Troubleshooting

### Build Issues
- Ensure all dependencies are in `package.json`
- Check that TypeScript compilation passes: `npm run build`
- Verify all imports are correct

### Runtime Issues
- Check that the port is correctly configured
- Ensure environment variables are set
- Verify the build output is in the correct directory

### Platform-Specific Issues
- **Vercel**: Check `vercel.json` configuration
- **Railway**: Check `railway.json` and `nixpacks.toml`
- **Docker**: Check `Dockerfile` and `.dockerignore`

## 📞 Support

For deployment issues:
- Vercel: [Vercel Documentation](https://vercel.com/docs)
- Railway: [Railway Documentation](https://docs.railway.app)
- Docker: [Docker Documentation](https://docs.docker.com)