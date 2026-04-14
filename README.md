# 🏨 Grand Azure Hotel API – Assignment

## Overview

You are given a working Express API for the Grand Azure Hotel. Your job is to:

1. Write tests for the existing routes
2. Set up a CI/CD pipeline using GitHub Actions
3. Deploy the API to Render so it redeploys automatically on every push to `main`

---

## The API

| Method | Route | Description |
|--------|-------|-------------|
| GET | `/` | Welcome message |
| GET | `/rooms` | All rooms (supports `?type=` filter) |
| GET | `/rooms/:id` | Single room by id |
| GET | `/available` | All available rooms |

Run it locally:

```bash
npm install
npm start
```

Test it locally:
```bash
npm test
```

---

## Your Tasks

### 1. Write Tests (`test/app.test.js`)

The test file is scaffolded with comments suggesting what to test for each route. Write at least **6 tests** using Mocha + Chai + Supertest.

**Use AI to help generate test cases** — paste `app.js` into your AI tool and ask it to write tests. Review everything it generates, make sure you understand each one, and adjust before running.

Run your tests locally first and make sure they all pass before pushing.

### 2. Create the CI/CD Workflow

Create the file `.github/workflows/deploy.yml`. Your workflow must:

- Trigger on push to `main`
- Install dependencies
- Run your tests — **pipeline must stop if any test fails**
- Deploy to Render via Deploy Hook secret

### 3. Deploy to Render

- Create a **Web Service** on Render connected to your GitHub repo
- Build command: `npm install`
- Start command: `node server.js`
- Copy the **Deploy Hook** URL from Settings
- Add it as a GitHub secret named `RENDER_DEPLOY_HOOK`

> **GitHub Classroom note:** When connecting Render to GitHub, you'll need to grant Render access to the classroom organization. During the OAuth flow, click *Configure* and enable access for the org. If it doesn't work, fork the repo to your personal account and deploy from there.

---

## Useful Links

| Resource | Link |
|----------|------|
| Mocha docs | https://mochajs.org |
| Chai docs | https://www.chaijs.com/api/bdd |
| Supertest docs | https://github.com/ladjs/supertest |
| GitHub Actions docs | https://docs.github.com/en/actions |
| GitHub Actions – workflow syntax | https://docs.github.com/en/actions/writing-workflows/workflow-syntax-for-github-actions |
| `actions/checkout` | https://github.com/actions/checkout |
| `actions/setup-node` | https://github.com/actions/setup-node |
| Render – Deploy Hooks | https://docs.render.com/deploy-hooks |
| Render – GitHub integration | https://docs.render.com/github |

---

## Bonus

- Add a `POST /rooms` route that adds a new room — write tests for it too
- Add a second workflow that runs tests on pull requests but does **not** deploy
