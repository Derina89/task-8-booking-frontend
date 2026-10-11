# Task 8 - Service Booking System Frontend

## Project Description

A modern service booking frontend built using React and TypeScript.

The frontend communicates with the Express.js backend API.
## Structure
task-8-booking-frontend/
├── src/
│   ├── components/
│   │   ├── Navbar.tsx
│   │   ├── ServiceCard.tsx
│   │   └── Loading.tsx
│   │
│   ├── pages/
│   │   ├── Home.tsx
│   │   ├── Services.tsx
│   │   ├── Login.tsx
│   │   ├── Register.tsx
│   │   ├── Booking.tsx
│   │   ├── Review.tsx
│   │   └── Confirmation.tsx
│   │
│   ├── services/
│   │   └── api.ts
│   │
│   ├── App.tsx
│   ├── main.tsx
│   └── index.css
│
├── package.json
└── vite.config.ts

## Technologies Used

- React
- TypeScript
- Vite
- React Router
- CSS
- Fetch API

## Features

- Home page
- Service listing
- User registration
- User login
- Service selection
- Booking date selection
- Booking time selection
- Review booking details
- Booking confirmation
- Booking ID display
- Responsive design
- Loading and error states

## Pages

- Home
- Services
- Login
- Register
- Booking
- Review
- Confirmation

## Booking Flow

Home → Services → Booking → Review → Confirmation

## Backend API

The frontend connects to:

`http://localhost:3000/api`

Main APIs used:

- `GET /api/services`
- `POST /api/register`
- `POST /api/login`
- `POST /api/bookings`

## How to Run

Install dependencies:

```bash
npm install

Start the frontend:

npm run dev

Frontend URL:

http://localhost:5173

The backend must also be running.

Task Status

Task 8 Frontend - Completed


**That's all.** These are the only two README contents you need right now.


