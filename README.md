# Kurtz - URL Shortener

A minimalist URL shortener built with Next.js, Prisma, and Supabase. No ads, no tracking, just clean and efficient link shortening.

## Features

- **Simple Shortening**: Quickly generate short, memorable URLs with an intuitive interface.
- **Live Dashboard**: Track your recent links with click counts and timestamps.
- **Minimalist Design**: Clean, distraction-free UI with subtle animations.
- **User Sessions**: Automatic user identification via cookies for link tracking.
- **Database Backed**: Persistent storage with Prisma ORM and Supabase PostgreSQL.
- **Production Ready**: Optimized for deployment on Vercel or any Node.js host.

## Tech Stack

| Layer | Technology |
|-------|------------|
| **Frontend** | Next.js , React , Tailwind CSS |
| **Backend** | Next.js API Routes, Server Components |
| **Database** | Prisma 7, Supabase (PostgreSQL) |
| **Icons** | Lucide React |
| **Deployment** | Vercel |

## Quick Start

### Prerequisites

- Node.js 18+
- Prisma
- or Supabase account
- Git

### Installation

1. **Clone the repository**:
   ```bash
   git clone https://github.com/heisemmanuell/url-shortener.git
   cd url-shortener
   ```

2. **Install dependencies**:
   ```bash
   npm install
   # or
   pnpm install
   # or
   yarn install
   ```

3. **Set up environment variables**:
   
   Create a `.env.local` file in the root directory:
   ```env
   DATABASE_URL="postgresql://user:password@host:5432/url_shortener"
   ```
   
   Get your `DATABASE_URL` from:
   - **Supabase**: Project Settings → Database → Connection String
   - **Local PostgreSQL**: Format: `postgresql://user:password@localhost:5432/dbname`

4. **Initialize the database**:
   ```bash
   npx prisma migrate dev
   ```

5. **Start the development server**:
   ```bash
   pnpm run dev
   ```
   
   Open [http://localhost:3000](http://localhost:3000) in your browser.

## Usage

1. Enter a long URL in the form
2. Click "Shorten" to generate a short link
3. Copy the short link and share it
4. View all your shortened links in the "Recent Activity" section
5. Track click counts for each link

## Project Structure

```
├── app/                    # Next.js app router
│   ├── page.tsx           # Home page
│   ├── [shortcode]/       # Dynamic redirect route
│   ├── layout.tsx         # Root layout
│   └── actions.ts         # Server actions
├── components/            # React components
│   ├── form.tsx          # URL shortening form
│   ├── link-list.tsx     # Links table
│   └── features.tsx      # Features section
├── lib/                   # Utilities
│   └── db.ts             # Prisma client setup
├── prisma/               # Database config
│   ├── schema.prisma     # Data models
│   └── migrations/       # Migration history
└── public/               # Static assets
```

## Available Scripts

```bash
pnpm run dev       # Start development server
pnpm run build     # Build for production
pnpm start        # Start production server
pnpm run lint     # Run ESLint
```

## API Routes

### POST `/api/shorten`
Shorten a URL.

**Request:**
```json
{
  "url": "https://example.com/very/long/path"
}
```

**Response:**
```json
{
  "id": 1,
  "shortCode": "abc123",
  "originalUrl": "https://example.com/very/long/path",
  "createdAt": "2026-01-15T12:00:00Z",
  "clicks": 0
}
```

## Database Schema

```prisma
model Link {
  id          Int      @id @default(autoincrement())
  originalUrl String   @db.Text
  shortCode   String   @unique
  createdAt   DateTime @default(now())
  clicks      Int      @default(0)
  userId      String?
  
  @@index([shortCode])
  @@index([userId])
}
```

## Deployment

### Deploy to Vercel

1. Push your code to GitHub
2. Import the repository in [Vercel Dashboard](https://vercel.com/dashboard)
3. Add environment variables in project settings
4. Deploy with one click

### Deploy to Other Platforms

1. Build the application: `npm run build`
2. Set `DATABASE_URL` environment variable
3. Start the server: `npm start`

## Contributing

We welcome contributions! Please see [CONTRIBUTING.md](CONTRIBUTING.md) for guidelines on how to contribute to Kurtz.
