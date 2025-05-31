# Weather Alert

A NestJS backend service that allows user management, weather alert scheduling, and email notifications.

## Features

- 🌦 Weather monitoring & alerting
- 👤 User registration & management (MongoDB + Mongoose)
- 📬 Email notifications (Mailer module)
- ⏰ Scheduled jobs (Scheduler module)
- ✅ Unit tests (Jest)

## Getting Started

1. Clone the repo:

```bash
git clone https://github.com/your-username/weather-alert.git
cd weather-alert
```

2. Install dependencies:

```bash
npm install
```

3. Set up environment variables:

Create a `.env` file in the root directory. Example:

```
MONGO_URI=mongodb://localhost:27017/weather-alert
MAIL_USER=your@email.com
MAIL_PASS=yourpassword
```

4. Run the app:

```bash
npm run start:dev
```

5. Run tests:

```bash
npm test
```

## Project Structure

```
src/
├── config/         # Configuration (e.g. env vars)
├── users/          # User module (CRUD, schema)
├── weather/        # Weather-related logic
├── mailer/         # Email sending service
├── scheduler/      # Scheduled tasks
├── app.module.ts   # Root module
└── main.ts         # Entry point
```

## GitHub Actions CI

This project includes a GitHub Actions workflow to:

- Install dependencies
- Build the project
- Run tests on Node.js v18, v20, and v22

Workflow file: `.github/workflows/ci.yml`

## License

MIT
