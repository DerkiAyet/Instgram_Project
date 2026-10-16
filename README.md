# Instagram Clone

A full-stack social media web app that recreates the Instagram experience, with a pixel-faithful UI, real-time messaging, and the core social interactions (posts, likes, comments, follows).

## Features

- **Authentication:** sign up, log in, secure sessions
- **Post feed:** browse posts from the people you follow
- **Publish posts:** upload images with captions
- **Profiles:** your own profile and other users' profiles, with edit profile support
- **Social graph:** follow / unfollow users
- **Interactions:** like and comment on posts
- **Real-time messaging:** instant one-to-one chat powered by Socket.io
- **Search:** find users quickly

## Tech Stack

**Frontend:** React
**Backend:** Node.js, Express 
**Database:** MySQL, Sequelize ORM 
**Real-time:** Socket.io

## Getting Started

### Prerequisites
- Node.js (v18+)
- MySQL

### Installation

```bash
# Clone the repo
git clone https://github.com/DerkiAyet/Instgram_Project.git
cd Instgram_Project

# Backend
cd server
npm install
cp .env.example .env     # fill in your DB credentials and secrets
npm start

# Frontend (in a new terminal)
cd client
npm install
npm start
```

### Environment variables

```env
DB_HOST=localhost
DB_USER=root
DB_PASSWORD=your_password
DB_NAME=instagram_db
JWT_SECRET=your_secret
MAIL_USER=your_email_test
MAIL_PWD=email_pwd
PORT=5000
```

## Possible Improvements

- Stories and reels
- Notifications
- Image/video upload to a cloud provider

## Author

**Ayet Halima Derki** · [GitHub](https://github.com/DerkiAyet) · [LinkedIn](https://www.linkedin.com/in/derki-ayet-35999931a)
