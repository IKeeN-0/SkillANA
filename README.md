# SkillANA

> A full-stack platform for developers to **verify skills, earn badges, and build a resume** — all in one place.

SkillANA lets users take timed, multiple-choice skill tests across technology categories. Pass a test, earn a digital badge tied to your profile. Then pick one of 5 resume templates, auto-fill it with your profile data, and export a **professional PDF resume** — powered by headless Chromium.

---

## Features

| Feature | Description |
|---|---|
| Skill Tests | Timed MCQ quizzes per badge (configurable questions, time limit, passing score) |
| Badge System | 50+ badges across 5 categories: Web, DevOps, Languages, Databases, Data Science |
| User Profile | Edit personal info, about me, education, work experience, contact, and profile photo |
| Resume Builder | 5 templates with auto-fill from profile; export as downloadable PDF |
| Authentication | Email/password, Google OAuth, and OTP email verification |
| Collections | Browse all available badges by category |
| API Docs | Built-in Swagger UI at `/api-docs` |

---

## Tech Stack

| Layer | Technology |
|---|---|
| Framework | Next.js 16 (App Router) |
| Language | TypeScript |
| Styling | Tailwind CSS v4 |
| Database | MongoDB (via Mongoose) |
| Auth | JWT + Google OAuth + OTP (email) |
| Email | Nodemailer (Gmail SMTP) |
| File Storage | UploadThing |
| PDF Export | Puppeteer Core + @sparticuz/chromium |
| Animation | Framer Motion |
| API Docs | Swagger (next-swagger-doc + swagger-ui-react) |
| Container | Docker (multi-stage build) |
| Reverse Proxy | Nginx |
| Cloud | AWS ECR + EC2 |

---

## Project Structure

```
SkillANA/
├── app/
│   ├── page.tsx                  # Landing page
│   ├── home/                     # Dashboard (earned badges, skill stats)
│   ├── skills/                   # Browse & take skill tests
│   ├── badge/
│   │   ├── [id]/                 # Badge detail page
│   │   ├── test/[id]/            # Active quiz page
│   │   └── result/               # Test result & badge award
│   ├── my-resume/                # Resume template selection
│   ├── resume-export/[id]/       # Resume preview page
│   ├── resume-pdf/               # Headless PDF render target (internal)
│   ├── profile/                  # User profile editor
│   ├── collections/              # All available badges
│   ├── login/                    # Login page
│   ├── create-account/           # Registration page
│   ├── verify/                   # OTP verification page
│   ├── all-badge/                # Badge browser
│   ├── api-docs/                 # Swagger UI
│   └── api/                      # REST API routes
│       ├── auth/login/
│       ├── auth/register/
│       ├── auth/register/pending-users/
│       ├── auth/google/
│       ├── auth/otp/ + auth/otp/verify/
│       ├── badges/ + badges/[id]/
│       ├── users/[id]/ + users/[id]/badge/
│       ├── print/                # PDF generation endpoint
│       ├── uploadthing/          # File upload handler
│       └── docs/                 # Swagger spec endpoint
├── lib/
│   ├── db.ts                     # MongoDB connection (cached)
│   ├── models/schema.ts          # Mongoose models (User, Badge, OTP, etc.)
│   ├── swagger-config.ts
│   ├── swagger-schema.ts
│   └── swagger-route.ts
├── public/
│   ├── badges/                   # Badge images organized by category
│   ├── resumes/                  # Resume template preview images
│   ├── icon/                     # UI icons
│   └── videos/
├── nginx/nginx.conf              # Reverse proxy config
├── Dockerfile                    # Multi-stage Docker build
├── docker-compose.yaml           # App + Nginx stack
└── docker-compose-mongo.yaml     # MongoDB container
```

---

## Getting Started (Local Development)

### Prerequisites

- **Node.js 22+**
- **MongoDB** instance (local, Atlas, or Docker)
- Accounts/API keys for: UploadThing, Google OAuth, Gmail SMTP

### 1. Clone the repository

```bash
git clone <repo-url>
cd SkillANA
```

### 2. Install dependencies

```bash
npm install
```

### 3. Configure environment variables

Create a `.env` file in the project root (see [Environment Variables](#environment-variables) below).

### 4. Run the development server

```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) in your browser.

---

## Environment Variables

### `.env` — Main application config

Create this file at the project root before running the app.

```env
# MongoDB connection string
# Format: mongodb://<user>:<password>@<host>:<port>/<dbname>?authSource=admin
DBURL=mongodb://<username>:<password>@<host>:<port>/<dbname>?authSource=admin

# Secret key used to sign and verify JWT tokens
JWT_SECRET=your_jwt_secret_here

# Gmail App Password used by Nodemailer to send OTP emails
# Generate one at: https://myaccount.google.com/apppasswords
APP_PASS=your_gmail_app_password

# UploadThing API token for handling file uploads (profile images, etc.)
# Get yours at: https://uploadthing.com
UPLOADTHING_TOKEN=your_uploadthing_token

# Gmail address that OTP emails are sent from
EMAIL_USER=your_email@gmail.com

# Google OAuth Client ID — safe to expose to the browser (NEXT_PUBLIC_ prefix)
# Create credentials at: https://console.cloud.google.com
NEXT_PUBLIC_GOOGLE_CLIENT_ID=your_google_client_id.apps.googleusercontent.com
```

> **Security note:** Only `NEXT_PUBLIC_GOOGLE_CLIENT_ID` is exposed to the browser. All other variables are server-side secrets — never commit them to version control. Add `.env` to your `.gitignore`.

#### Optional — PDF generation via Browserless

```env
# If set, the /api/print route will use Browserless.io instead of local Chromium.
# Get a token at: https://browserless.io
BROWSERLESS_TOKEN=your_browserless_token
```

If `BROWSERLESS_TOKEN` is not set, the app falls back to:
- Local Chromium via `@sparticuz/chromium` in production/Docker
- A locally installed browser in development

---

### `.env.database` — MongoDB Docker container init

Only needed when running MongoDB via `docker-compose-mongo.yaml`.

```env
MONGO_INITDB_ROOT_USERNAME=admin
MONGO_INITDB_ROOT_PASSWORD=your_mongo_root_password
```

These values must match the credentials in your main `.env` `DBURL`.

---

## Running with Docker

### Step 1 — Start MongoDB

```bash
docker compose -f docker-compose-mongo.yaml up -d
```

### Step 2 — Create a shared Docker network (first time only)

```bash
docker network create my-network
```

### Step 3 — Build the app image

```bash
docker build -t skillana:latest .
```

### Step 4 — Run the full stack (App + Nginx)

Update `docker-compose.yaml` — set `my-web.image` to your local image tag or AWS ECR URI, then:

```bash
docker compose up -d
```

The app will be available at [http://localhost](http://localhost) via Nginx on port 80.

---

## Build for Production

```bash
npm run build
npm start
```

The project uses Next.js `output: "standalone"` mode, producing a minimal self-contained server in `.next/standalone/`. This is what the Dockerfile copies into the final runner stage.

---

## Database Schema

The MongoDB schema for all 5 collections (`users`, `badges`, `badgecategories`, `pendinusers`, `otps`) is documented in detail — including field types, constraints, relationships, and which API routes interact with each collection.

→ [docs/DB_SCHEMA.md](./docs/DB_SCHEMA.md)

---

## API Documentation

Swagger UI is built in and accessible at:

```
http://localhost:3000/api-docs
```

---

## Badge Categories

| Category | Technologies |
|---|---|
| **Web** | React, Next.js, TypeScript, Node.js, Express, Tailwind CSS, REST API, Angular, Vue, HTML, CSS, ... |
| **DevOps** | Docker, Kubernetes, Terraform, Jenkins, Ansible, ArgoCD, Bash, YAML, ... |
| **Programming Languages** | Python, Go, Java, Rust, C, C++, C#, Ruby, Lua, ... |
| **Databases** | MongoDB, PostgreSQL, MySQL, Firebase, Neo4j, GraphQL, Snowflake, InfluxDB, ... |
| **Data Science** | PyTorch, TensorFlow, Pandas, NumPy, scikit-learn, LangChain, HuggingFace, Apache Spark, ... |

---

## Contributing

1. Fork the repo
2. Create a feature branch: `git checkout -b feature/your-feature`
3. Commit your changes
4. Push to your branch and open a Pull Request

---

## License

This project is for educational and portfolio purposes.
