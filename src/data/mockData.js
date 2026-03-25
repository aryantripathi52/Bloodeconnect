export const mockUsers = {
  admin: {
    id: 'u1',
    name: 'Rajesh Kumar',
    role: 'Super Admin',
    avatar: 'https://i.pravatar.cc/150?u=u1',
    panel: 'admin',
    sidebarColor: '#C0392B'
  },
  hospital: {
    id: 'u2',
    name: 'Dr. Anjali Sharma',
    role: 'Emergency Head',
    avatar: 'https://i.pravatar.cc/150?u=u2',
    panel: 'hospital',
    sidebarColor: '#2980B9'
  },
  donor: {
    id: 'u3',
    name: 'Amit Singh',
    role: 'Verified Donor',
    avatar: 'https://i.pravatar.cc/150?u=u3',
    panel: 'donor',
    sidebarColor: '#1ABC9C'
  },
  patient: {
    id: 'u4',
    name: 'Suresh Raina',
    role: 'Patient Family',
    avatar: 'https://i.pravatar.cc/150?u=u4',
    panel: 'patient',
    sidebarColor: '#8E44AD'
  },
  ngo: {
    id: 'u5',
    name: 'Priya Verma',
    role: 'Camp Organizer',
    avatar: 'https://i.pravatar.cc/150?u=u5',
    panel: 'ngo',
    sidebarColor: '#F39C12'
  },
  bloodbank: {
    id: 'u6',
    name: 'Vikram Mehta',
    role: 'Bank Manager',
    avatar: 'https://i.pravatar.cc/150?u=u6',
    panel: 'bloodbank',
    sidebarColor: '#27AE60'
  },
  govt: {
    id: 'u7',
    name: 'Sanjay Gupta',
    role: 'NBTC Analyst',
    avatar: 'https://i.pravatar.cc/150?u=u7',
    panel: 'govt',
    sidebarColor: '#717D7E'
  }
};

export const panelConfig = {
  admin: {
    name: 'Admin Panel',
    role: 'Platform-wide control',
    color: '#C0392B',
    tabs: [
      'Dashboard overview',
      'User management',
      'Donor verification queue',
      'Active SOS requests',
      'Analytics & reports',
      'System settings'
    ]
  },
  hospital: {
    name: 'Hospital Panel',
    role: 'Emergency & inventory',
    color: '#2980B9',
    tabs: [
      'Emergency Dashboard',
      'Active Requests Tracker',
      'Blood Inventory',
      'Donor Pool Nearby',
      'Request History'
    ]
  },
  donor: {
    name: 'Donor Panel',
    role: 'Personal profile & activity',
    color: '#1ABC9C',
    tabs: [
      'My profile & availability',
      'Incoming SOS alerts',
      'Donation history',
      'Trust score & badges',
      'Nearby blood camps'
    ]
  },
  patient: {
    name: 'Patient / Family',
    role: 'Emergency requests',
    color: '#8E44AD',
    tabs: [
      'Dashboard',
      'Live Donor Tracker',
      'Matched Donors',
      'Nearby Blood Banks',
      'Request History',
      'My Profile',
      'Award Gallery',
      'How to Use',
      'FAQ',
      'Disclaimer & Privacy'
    ]
  },
  ngo: {
    name: 'NGO / Organizer',
    role: 'Camp management',
    color: '#F39C12',
    tabs: [
      'Camp Dashboard',
      'Create blood camp',
      'Manage registrations',
      'AI location suggestions',
      'Camp analytics',
      'Donor reach report'
    ]
  },
  bloodbank: {
    name: 'Blood Bank Panel',
    role: 'Stock & supply chain',
    color: '#27AE60',
    tabs: [
      'Stock levels by group',
      'Incoming requests',
      'Hospital connections',
      'Shortage alerts',
      'Expiry tracker'
    ]
  },
  govt: {
    name: 'Govt / NBTC Panel',
    role: 'Read-only analytics',
    color: '#717D7E',
    tabs: [
      'National demand map',
      'City-wise shortage report',
      'Donor growth trends',
      'Emergency response stats',
      'Export & policy reports'
    ]
  }
};
