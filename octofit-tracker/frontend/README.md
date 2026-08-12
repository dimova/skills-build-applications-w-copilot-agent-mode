# Octofit Tracker Frontend

The React 19/Vite presentation tier uses React Router and Bootstrap to show Octofit users, teams, activities, leaderboard standings, and workouts.

## API configuration

The frontend automatically derives the backend URL from the current GitHub Codespaces hostname or falls back to `http://localhost:8000` for local development. To override that behavior, create `octofit-tracker/frontend/.env.local` with either of these values:

```env
VITE_CODESPACE_NAME=your-codespace-name
# Or use a complete API origin:
VITE_API_BASE_URL=https://your-api-host.example.com
```

`VITE_API_BASE_URL` takes precedence over `VITE_CODESPACE_NAME`. The frontend builds requests under `/api/[component]/` for users, teams, activities, leaderboard standings, and workouts.

## Commands

```bash
npm run dev --prefix octofit-tracker/frontend
npm run build --prefix octofit-tracker/frontend
```
