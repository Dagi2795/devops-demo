# DevOps Demo (Simple)

This is a small project for a classroom demo of DevOps basics.

## What this demo includes

- A tiny Node.js API (`/health`, `/message`, and `/signup`)
- Automated tests with Jest
- Docker container build
- CI workflow using GitHub Actions

## Run locally

```bash
npm install
npm test
npm start
```

Service runs at `http://localhost:3000`.

Test endpoints:

- `GET /health`
- `GET /message`
- `GET /demo-update`
- `GET /about`
- `POST /signup`

Example signup request:

```bash
curl -X POST http://localhost:3000/signup \
	-H "Content-Type: application/json" \
	-d "{\"name\":\"Dagi\",\"email\":\"dagi@example.com\"}"
```

Expected response:

```json
{
	"message": "signup successful",
	"user": {
		"name": "Dagi",
		"email": "dagi@example.com"
	}
}
```

## Docker run

```bash
docker build -t devops-demo .
docker run -p 3000:3000 devops-demo
```

## CI pipeline steps

1. Install dependencies (`npm ci`)
2. Run tests (`npm run test:ci`)
3. Build Docker image (`docker build`)

## Why this is meaningful

- Shows CI quality gate (tests must pass)
- Shows CD readiness (container image can be built)
- Demonstrates fast feedback loop for developers
