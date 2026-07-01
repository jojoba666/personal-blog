# Personal Blog

A personal blog built with **Next.js 14+ (App Router)**, **Tailwind CSS**, and **MDX**. Blog posts are written in Markdown/MDX under `content/posts/`.

---

## 🚀 Deployment

This project supports three deployment options: **Vercel** (recommended), **Docker** (self-hosted), and **GitHub Pages** (alternative).

### 1. Vercel (Recommended — Free Tier)

Vercel is the native platform for Next.js. Zero-config deployment with automatic SSL, CDN, and preview deployments per branch.

#### Quick Deploy

1. Push your code to a GitHub repository.
2. Go to [vercel.com](https://vercel.com) and sign in with GitHub.
3. Click **"Add New..." → "Project"** and import your repository.
4. Vercel will auto-detect Next.js. Click **Deploy**.
5. (Optional) Custom domain: add it in **Settings → Domains**.

#### Deploy via CLI

```bash
# Install Vercel CLI
npm i -g vercel

# Link project (first time)
vercel link

# Deploy to production
npm run deploy:vercel
# Or: vercel --prod
```

#### Required Environment Variables

| Variable | Description | Required |
|---|---|---|
| `NEXT_PUBLIC_SITE_URL` | Canonical site URL | No |
| `NODE_ENV` | Set to `production` by Vercel automatically | Auto |

#### Configuration

- `vercel.json` — Edge region (`hkg1` for Asia), security headers, clean URLs.
- GitHub integration auto-deploys on push to `main`.

---

### 2. Docker (Self-Hosted)

Build and run anywhere Docker is available.

```bash
# Build image
npm run docker:build
# Or: docker build -t personal-blog .

# Run container
npm run docker:run
# Or: docker run -p 3000:3000 personal-blog
```

The container:
- Exposes port **3000**
- Runs as **non-root** user (`nextjs`) for security
- Includes a **health check** at `/`
- Uses `next start` against the standalone build output

#### Docker Compose (optional)

Create `docker-compose.yml`:

```yaml
services:
  blog:
    build: .
    ports:
      - "3000:3000"
    restart: unless-stopped
    environment:
      - NODE_ENV=production
```

Then: `docker compose up -d`

---

### 3. GitHub Pages (Alternative)

Not recommended for dynamic routes, but works for fully static export.

**Prerequisites:**
- Set `output: "export"` in `next.config.js` (or `next.config.mjs`).
- Remove any API routes or server-side features.
- Uncomment the `deploy-pages` job in `.github/workflows/deploy.yml`.

Then push to `main` and enable GitHub Pages in repo **Settings → Pages → Source: GitHub Actions**.

---

## 🔄 CI/CD (GitHub Actions)

The pipeline (`.github/workflows/deploy.yml`) runs on every push and PR to `main`:

| Job | What it does |
|---|---|
| **Lint** | Runs `npm run lint` and type checks |
| **Build** | Runs `npm run build`, uploads artifact |
| **Test** | Placeholder for future tests |
| **Deploy** | Deploys to Vercel production (main branch only) |

### Required GitHub Secrets (for Vercel deploy)

Set these in **Repository → Settings → Secrets and variables → Actions**:

| Secret | Where to get it |
|---|---|
| `VERCEL_TOKEN` | Vercel Dashboard → Settings → Tokens |
| `VERCEL_ORG_ID` | `vercel link` output or `.vercel/project.json` |
| `VERCEL_PROJECT_ID` | Same as above |

---

## 🛠 Scripts

| Script | Description |
|---|---|
| `npm run dev` | Start development server |
| `npm run build` | Production build |
| `npm run start` | Start production server (after build) |
| `npm run lint` | Lint code with ESLint |
| `npm run lint:fix` | Auto-fix lint issues |
| `npm run format` | Format with Prettier |
| `npm run typecheck` | TypeScript type checking |
| `npm run test` | Run tests (placeholder) |
| `npm run clean` | Remove `.next` and `out` |
| `npm run docker:build` | Build Docker image |
| `npm run docker:run` | Run Docker container |

---

## 📁 Project Structure

```
personal-blog/
├── content/
│   └── posts/          # MDX blog posts (*.mdx)
├── public/             # Static assets (images, fonts, etc.)
├── src/
│   └── app/            # Next.js App Router pages
├── .github/
│   └── workflows/
│       └── deploy.yml  # CI/CD pipeline
├── vercel.json         # Vercel deployment config
├── Dockerfile          # Container build
├── next.config.*       # Next.js configuration
├── tailwind.config.*   # Tailwind CSS config
└── package.json        # Dependencies & scripts
```
