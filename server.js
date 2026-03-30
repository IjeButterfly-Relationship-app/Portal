const express = require('express');
const cors = require('cors');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

const app = express();
const PORT = 3001;

// Middleware
app.use(cors());
app.use(express.json());

// In-memory storage (replace with database in production)
let admins = [];

// JWT secret
const JWT_SECRET = 'your-secret-key-change-in-production';

// Auth middleware
const authMiddleware = (req, res, next) => {
  const authHeader = req.headers.authorization;
  
  if (!authHeader) {
    return res.status(401).json({ message: 'No token provided' });
  }
  
  const token = authHeader.split(' ')[1];
  
  try {
    const decoded = jwt.verify(token, JWT_SECRET);
    req.user = decoded;
    next();
  } catch (error) {
    return res.status(401).json({ message: 'Invalid token' });
  }
};

// Admin Onboard Endpoint
app.post('/api/admins/onboard', authMiddleware, async (req, res) => {
  try {
    const {
      firstName,
      lastName,
      email,
      phoneNumber,
      city,
      country,
      role,
      jobTitle,
      reportingToId,
      accessLevel,
      temporaryPassword,
      conciergeModule,
      viewMemberProfiles,
      sendMessages,
      manageCoaching,
      moderationAccess,
      analyticsAccess,
      billingAccess,
      securityAccess,
      sendWelcomeEmail,
      requireTwoFa,
    } = req.body;

    // Validation
    if (!firstName || !lastName) {
      return res.status(400).json({ message: 'First name and last name are required' });
    }
    
    if (!email) {
      return res.status(400).json({ message: 'Email is required' });
    }
    
    if (!temporaryPassword) {
      return res.status(400).json({ message: 'Temporary password is required' });
    }
    
    // Check if admin already exists
    const existingAdmin = admins.find(admin => admin.email === email);
    if (existingAdmin) {
      return res.status(409).json({ message: 'Admin with this email already exists' });
    }

    // Hash password
    const hashedPassword = await bcrypt.hash(temporaryPassword, 10);

    // Create new admin
    const newAdmin = {
      id: Date.now().toString(),
      firstName,
      lastName,
      email,
      phoneNumber: phoneNumber || '',
      city: city || '',
      country: country || '',
      role: role || 'Concierge Admin',
      jobTitle: jobTitle || '',
      reportingToId: reportingToId || null,
      accessLevel: accessLevel || 'standard',
      password: hashedPassword,
      permissions: {
        conciergeModule: conciergeModule ?? true,
        viewMemberProfiles: viewMemberProfiles ?? true,
        sendMessages: sendMessages ?? true,
        manageCoaching: manageCoaching ?? true,
        moderationAccess: moderationAccess ?? false,
        analyticsAccess: analyticsAccess ?? true,
        billingAccess: billingAccess ?? false,
        securityAccess: securityAccess ?? false,
      },
      requireTwoFa: requireTwoFa ?? true,
      createdAt: new Date().toISOString(),
      createdBy: req.user.id,
    };

    admins.push(newAdmin);

    console.log('New admin onboarded:', email);

    res.status(201).json({
      message: 'Admin account created successfully',
      admin: {
        id: newAdmin.id,
        firstName: newAdmin.firstName,
        lastName: newAdmin.lastName,
        email: newAdmin.email,
        role: newAdmin.role,
      }
    });

  } catch (error) {
    console.error('Onboard error:', error);
    res.status(500).json({ message: 'Internal server error' });
  }
});

// Login endpoint
app.post('/auth/login', async (req, res) => {
  try {
    const { email, password } = req.body;
    
    const admin = admins.find(a => a.email === email);
    if (!admin) {
      return res.status(401).json({ message: 'Invalid credentials' });
    }
    
    const isValidPassword = await bcrypt.compare(password, admin.password);
    if (!isValidPassword) {
      return res.status(401).json({ message: 'Invalid credentials' });
    }
    
    const token = jwt.sign(
      { id: admin.id, email: admin.email, role: admin.role },
      JWT_SECRET,
      { expiresIn: '24h' }
    );
    
    res.json({ token, admin: { id: admin.id, email: admin.email, role: admin.role } });
  } catch (error) {
    console.error('Login error:', error);
    res.status(500).json({ message: 'Internal server error' });
  }
});

// Get all admins
app.get('/api/admins', authMiddleware, (req, res) => {
  res.json(admins.map(admin => ({
    id: admin.id,
    firstName: admin.firstName,
    lastName: admin.lastName,
    email: admin.email,
    role: admin.role,
    jobTitle: admin.jobTitle,
    createdAt: admin.createdAt,
  })));
});

// Health check
app.get('/health', (req, res) => {
  res.json({ status: 'ok', timestamp: new Date().toISOString() });
});

// Seed initial super admin
const seedSuperAdmin = async () => {
  const superAdminExists = admins.find(a => a.email === 'superadmin@example.com');
  if (!superAdminExists) {
    const hashedPassword = await bcrypt.hash('admin123', 10);
    admins.push({
      id: 'super-admin-001',
      firstName: 'Super',
      lastName: 'Admin',
      email: 'superadmin@example.com',
      role: 'Super Admin',
      password: hashedPassword,
      permissions: {
        conciergeModule: true,
        viewMemberProfiles: true,
        sendMessages: true,
        manageCoaching: true,
        moderationAccess: true,
        analyticsAccess: true,
        billingAccess: true,
        securityAccess: true,
      },
      createdAt: new Date().toISOString(),
    });
    console.log('Super admin created: superadmin@example.com / admin123');
  }
};

seedSuperAdmin();

app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
  console.log(`Admin onboard endpoint: POST http://localhost:${PORT}/api/admins/onboard`);
});
