# HRMS Frontend

MERN Stack HRMS (Human Resource Management System) - Frontend

## Tech Stack

- React (Vite)
- React Router
- Tailwind CSS
- Context API (auth state)
- Axios

## Setup Instructions

1. Clone the repo

```bash
git clone <repo-url>
cd hrms-frontend
```

2. Install dependencies

```bash
npm install
```

3. Create `.env` file in root with:

```
VITE_API_URL=http://localhost:5000/api
```

For production, point this to the deployed backend URL.

4. Run the dev server

```bash
npm run dev
```

App runs on `http://localhost:5173`

## Live Deployment

Frontend deployed at: https://hrms-frontend-two-chi.vercel.app

## Folder Structure

```
src/
  context/        - AuthContext (login state, token handling)
  components/      - reusable UI pieces, grouped by feature
  pages/           - route-level pages, grouped by feature
  utils/           - axios instance with token interceptor
```

## Notes

- No Redux - Context API used for auth state since app scope did not need global state beyond auth.
- Role-based UI: Admin and Employee see different views on the same routes (e.g. `/leaves`, `/payroll`, `/attendance`) via role-check router components.
- Full color-coded monthly calendar implemented on employee dashboard (simplified styling vs spec mockup, but functionally matches required color codes: Present, Absent, Paid Leave, Unpaid Leave, Holiday, Half Day).
