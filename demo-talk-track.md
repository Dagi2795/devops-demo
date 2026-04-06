# Demo Talk Track (3 to 5 minutes)

## 1) Goal

"I will show a very simple DevOps pipeline: code, test, build, and package."

## 2) Local quality check

1. Run `npm test`
2. Explain that tests are the quality gate
3. Mention that failing tests should block delivery

## 3) Run the service

1. Run `npm start`
2. Open `/health` endpoint
3. Explain this confirms app is running correctly

## 4) Containerization

1. Run `docker build -t devops-demo .`
2. Run `docker run -p 3000:3000 devops-demo`
3. Explain "same container runs the same way anywhere"

## 5) CI pipeline in GitHub Actions

1. Show `.github/workflows/ci-cd.yml`
2. Explain the 3 steps: install, test, Docker build
3. Explain this is continuous integration in practice

## 6) Close

"This small demo shows DevOps principles: automation, fast feedback, and reliable delivery."
