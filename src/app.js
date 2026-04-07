const express = require('express');

const app = express();

app.use(express.json());

// ✅ In-memory database (for demo)
const profiles = {
  '101': {
    id: '101',
    name: 'Dagi',
    role: 'Student',
    bio: 'Preparing DevOps presentation demo.'
  },
  '102': {
    id: '102',
    name: 'Feben',
    role: 'Collaborator',
    bio: 'Reviews code and checks CI runs.'
  }
};

// Health check
app.get('/health', (req, res) => {
  res.status(200).json({ status: 'ok' });
});

// Message
app.get('/message', (req, res) => {
  res.status(200).json({
    course: 'SEng5304',
    topic: 'Introduction to DevOps',
    note: 'Automated test passed and service is running.'
  });
});

// Signup
app.post('/signup', (req, res) => {
  const { name, email } = req.body;

  if (!name || !email) {
    return res.status(400).json({
      error: 'name and email are required'
    });
  }

  return res.status(201).json({
    message: 'signup successful',
    user: { name, email }
  });
});

// Login
app.post('/login', (req, res) => {
  const { email, password } = req.body;

  if (!email || !password) {
    return res.status(400).json({
      error: 'email and password are required'
    });
  }

  return res.status(401).json({
    error: 'invalid credentials'
  });
});

// ✅ Fake profile (always same)
app.get('/profile-fake/:id', (req, res) => {
  return res.status(200).json({
    id: '000',
    name: 'Demo User',
    role: 'Student',
    bio: 'Hardcoded fake profile for demo only.'
  });
});

// ✅ Get real profile
app.get('/profile/:id', (req, res) => {
  const profile = profiles[req.params.id];

  if (!profile) {
    return res.status(404).json({
      error: 'profile not found'
    });
  }

  return res.status(200).json(profile);
});

// ✅ Update profile
app.put('/profile/:id', (req, res) => {
  const profile = profiles[req.params.id];
  const { name, role, bio } = req.body;

  if (!profile) {
    return res.status(404).json({
      error: 'profile not found'
    });
  }

  if (!name || !role) {
    return res.status(400).json({
      error: 'name and role are required'
    });
  }

  profiles[req.params.id] = {
    ...profile,
    name,
    role,
    bio: bio || profile.bio
  };

  return res.status(200).json({
    message: 'profile updated',
    profile: profiles[req.params.id]
  });
});

module.exports = app;