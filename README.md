# 💼 Portfolio Website with Contact Backend

A personal portfolio website with a working contact form that saves messages to MongoDB.

## 🚀 Features

- **Responsive Design** — Works on mobile and desktop
- **4 Sections** — About, Skills, Projects, Contact
- **Working Contact Form** — Validates input + saves to MongoDB
- **Success/Error Messages** — Real-time feedback on form submission
- **Animated Skill Bars** — Scroll-triggered animations
- **Sticky Nav** — Highlights active section while scrolling

## 🛠️ Tech Stack

| Layer    | Tech              |
|----------|-------------------|
| Frontend | HTML, CSS, JS     |
| Backend  | Node.js, Express  |
| Database | MongoDB, Mongoose |

## 📁 Project Structure

```
portfolio/
├── index.html      # Main frontend (all sections)
├── style.css       # All styles (responsive)
├── main.js         # Frontend JS (form validation, animations)
├── server.js       # Express backend + MongoDB API
├── package.json    # Node dependencies
└── README.md       # This file
```

## ⚡ Setup & Run

### 1. Install dependencies
```bash
npm install
```

### 2. Make sure MongoDB is running
```bash
# Install MongoDB locally or use MongoDB Atlas
mongod
```

### 3. (Optional) Set environment variables
```bash
# Create a .env file
MONGO_URI=mongodb://localhost:27017/portfolio
PORT=3000
```

### 4. Start the server
```bash
# Development (with auto-restart)
npm run dev

# Production
npm start
```

### 5. Open in browser
```
http://localhost:3000
```

## 🌐 API Endpoints

| Method | Endpoint       | Description              |
|--------|----------------|--------------------------|
| POST   | /api/contact   | Save contact form message |
| GET    | /api/messages  | Get all messages (admin)  |

### POST /api/contact — Request Body
```json
{
  "name": "Muhammad Ali",
  "email": "ali@example.com",
  "subject": "Internship Opportunity",
  "message": "Hello, I'd like to discuss..."
}
```

### Response (success)
```json
{
  "success": true,
  "message": "Message saved successfully!"
}
```

## 🚀 Deploy

### Option 1: Render (Free)
1. Push to GitHub
2. Connect repo on [render.com](https://render.com)
3. Set `MONGO_URI` environment variable (use MongoDB Atlas)
4. Deploy!

### Option 2: Railway
1. Push to GitHub
2. Import project on [railway.app](https://railway.app)
3. Add MongoDB plugin
4. Deploy!

### MongoDB Atlas (Free cloud DB)
1. Create free account at [mongodb.com/atlas](https://mongodb.com/atlas)
2. Create a cluster
3. Get connection string
4. Set as `MONGO_URI` env variable

## ✏️ Customization

Edit `index.html` to update:
- Your name, bio, and photo
- Skills and percentages
- Projects (title, description, links, tags)
- Contact info (email, GitHub, LinkedIn)

## 📝 License
MIT — Free to use and modify.
