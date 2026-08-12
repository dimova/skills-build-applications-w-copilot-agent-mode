# Octofit Tracker Frontend

The React 19/Vite presentation tier uses React Router and Bootstrap to show Octofit users, teams, activities, leaderboard standings, and workouts.

## API configuration

`VITE_CODESPACE_NAME` must be defined when the frontend runs in GitHub Codespaces. Create `octofit-tracker/frontend/.env.local` with the Codespace name:

```env
VITE_CODESPACE_NAME=your-codespace-name
```

The frontend builds API requests as `https://${import.meta.env.VITE_CODESPACE_NAME}-8000.app.github.dev/api/[component]/`. When `VITE_CODESPACE_NAME` is unset, it safely falls back to `http://localhost:8000/api/[component]/`.

## Commands

```bash
npm run dev --prefix octofit-tracker/frontend
npm run build --prefix octofit-tracker/frontend
```
