import React, { useState } from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate, Outlet, useLocation, Link } from 'react-router-dom';
import { AppProvider, useAppContext } from './context/AppContext';
import Sidebar from './components/shared/Sidebar';
import TopBar from './components/shared/TopBar';
import LandingPage from './landing/LandingPage';
import { motion, AnimatePresence } from 'framer-motion';
import { clsx } from 'clsx';
import { twMerge } from 'tailwind-merge';
import { Settings, X, Shield, Hospital, User as UserIcon, Users, Heart, Building2, Map as MapIcon, Zap } from 'lucide-react';

// Admin Tabs
import AdminDashboard from './panels/admin/tabs/DashboardOverview';
import AdminUserManagement from './panels/admin/tabs/UserDirectory';
import AdminVerification from './panels/admin/tabs/DonorVerificationQueue';
import AdminSOS from './panels/admin/tabs/ActiveSOSRequests';
import AdminAnalytics from './panels/admin/tabs/AnalyticsReports';
import AdminSettings from './panels/admin/tabs/SystemSettings';

// Hospital Tabs
import EmergencyDashboard from './panels/hospital/tabs/EmergencyDashboard';
import RaiseSOSRequest from './panels/hospital/tabs/RaiseSOSRequest';
import HospitalRequestHistory from './panels/hospital/tabs/RequestHistory';
import BloodInventoryPool from './panels/hospital/tabs/BloodInventoryPool';
import ActiveRequestsTracker from './panels/hospital/tabs/ActiveRequestsTracker';

// NGO Tabs
import CampDashboard from './panels/ngo/tabs/CampDashboard';
import CreateBloodCamp from './panels/ngo/tabs/CreateBloodCamp';
import ManageRegistrations from './panels/ngo/tabs/ManageRegistrations';
import CampAnalytics from './panels/ngo/tabs/CampAnalytics';

// Donor Tabs
import PersonalProfile from './panels/donor/tabs/PersonalProfile';
import Availability from './panels/donor/tabs/Availability';
import ContributionArchive from './panels/donor/tabs/ContributionArchive';
import TrustScore from './panels/donor/tabs/TrustScore';
import NearbyCamps from './panels/donor/tabs/NearbyCamps';

// Patient Tabs
import PatientDashboard from './panels/patient/tabs/Dashboard';
import LiveDonorTracker from './panels/patient/tabs/LiveDonorTracker';
import MatchedDonorsList from './panels/patient/tabs/MatchedDonorsList';
import NearbyBloodBanks from './panels/patient/tabs/NearbyBloodBanks';
import PatientRequestHistory from './panels/patient/tabs/RequestHistory';
import PatientProfile from './panels/patient/tabs/MyProfile';
import AwardGallery from './panels/patient/tabs/AwardGallery';
import HowToUse from './panels/patient/tabs/HowToUse';
import FAQ from './panels/patient/tabs/FAQ';
import Disclaimer from './panels/patient/tabs/Disclaimer';

function cn(...inputs) {
  return twMerge(clsx(inputs));
}

// Dev Role Switcher Component
const DevRoleSwitcher = () => {
  const [isOpen, setIsOpen] = useState(false);
  const { switchUser, currentUser } = useAppContext();

  const panels = [
    { id: 'admin', label: 'Admin', icon: Shield, color: '#C0392B' },
    { id: 'hospital', label: 'Hospital', icon: Hospital, color: '#2980B9' },
    { id: 'donor', label: 'Donor', icon: Heart, color: '#1ABC9C' },
    { id: 'patient', label: 'Patient', icon: UserIcon, color: '#8E44AD' },
    { id: 'ngo', label: 'NGO', icon: Users, color: '#F39C12' },
    { id: 'bloodbank', label: 'Blood Bank', icon: Building2, color: '#27AE60' },
    { id: 'govt', label: 'Govt', icon: MapIcon, color: '#717D7E' },
  ];

  return (
    <div className="fixed bottom-6 right-6 z-[9999]">
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, scale: 0.9, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.9, y: 20 }}
            className="mb-4 bg-white rounded-2xl shadow-2xl border border-border p-4 w-64"
          >
            <div className="flex justify-between items-center mb-4">
              <h4 className="text-xs font-black text-dark uppercase tracking-widest">Panel Switcher</h4>
              <button onClick={() => setIsOpen(false)}><X size={16} /></button>
            </div>
            <div className="space-y-2">
              <Link
                to="/"
                onClick={() => setIsOpen(false)}
                className="w-full flex items-center gap-3 px-4 py-2 text-xs font-bold rounded-xl bg-bg text-dark hover:bg-dark hover:text-white transition-all"
              >
                🏠 Back to Landing Page
              </Link>
              <div className="h-px bg-bg my-2" />
              {panels.map((p) => (
                <Link
                  key={p.id}
                  to={`/${p.id}`}
                  onClick={() => {
                    switchUser(p.id);
                    setIsOpen(false);
                  }}
                  className={cn(
                    "w-full flex items-center gap-3 px-4 py-2 text-xs font-bold rounded-xl transition-all border",
                    currentUser.panel === p.id 
                      ? "bg-dark text-white border-transparent" 
                      : "bg-white text-muted border-bg hover:border-dark hover:text-dark"
                  )}
                >
                  <p.icon size={14} style={{ color: currentUser.panel === p.id ? 'white' : p.color }} />
                  {p.label} Panel
                </Link>
              ))}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="bg-dark text-white p-4 rounded-full shadow-2xl hover:scale-110 active:scale-95 transition-all group relative"
      >
        <Settings className={cn("transition-transform duration-700", isOpen && "rotate-180")} size={24} />
        <span className="absolute right-full mr-4 top-1/2 -translate-y-1/2 bg-dark text-white text-[10px] font-bold px-3 py-1.5 rounded-lg opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap shadow-xl border border-white/10">
          DEV CONSOLE: SWITCH PANELS
        </span>
      </button>
    </div>
  );
};

// Layout Shell
const LayoutShell = () => {
  const { currentUser } = useAppContext();
  const isAdmin = currentUser.panel === 'admin';
  const isDonor = currentUser.panel === 'donor';
  const location = useLocation();

  return (
    <div className={cn(
      "flex min-h-screen transition-colors duration-500",
      isAdmin ? "bg-jade-bg" : isDonor ? "bg-response-bg" : "bg-bg"
    )}>
      <Sidebar />
      <div className="flex-1 ml-[240px] flex flex-col min-h-screen relative">
        <TopBar />
        <main className="flex-1 mt-16 p-6 overflow-y-auto">
          <AnimatePresence mode="wait">
            <motion.div
              key={location.pathname}
              initial={{ opacity: 0, y: 10, scale: 0.99 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: -10, scale: 0.99 }}
              transition={{ duration: 0.3, ease: "easeOut" }}
              className="h-full"
            >
              <Outlet />
            </motion.div>
          </AnimatePresence>
        </main>
      </div>
    </div>
  );
};

// Placeholder
const PlaceholderPage = ({ title }) => (
  <div className="flex flex-col items-center justify-center h-[calc(100vh-160px)] text-center">
    <div className="w-16 h-16 bg-bg rounded-full flex items-center justify-center mb-4 text-muted">
      <Heart size={32} className="animate-pulse" />
    </div>
    <h1 className="text-2xl font-bold text-dark mb-2">{title}</h1>
    <p className="text-muted max-w-md">
      This specific tab is currently under construction. Please use the sidebar to explore other sections.
    </p>
  </div>
);

const AppRoutes = () => {
  const [isSOSModalOpen, setIsSOSModalOpen] = useState(false);

  return (
    <>
      <Routes>
        <Route path="/" element={<LandingPage />} />
        
        {/* Admin Panel */}
        <Route path="admin" element={<LayoutShell />}>
          <Route index element={<Navigate to="dashboard-overview" replace />} />
          <Route path="dashboard-overview" element={<AdminDashboard />} />
          <Route path="user-management" element={<AdminUserManagement />} />
          <Route path="donor-verification-queue" element={<AdminVerification />} />
          <Route path="active-sos-requests" element={<AdminSOS />} />
          <Route path="analytics-&-reports" element={<AdminAnalytics />} />
          <Route path="system-settings" element={<AdminSettings />} />
        </Route>

        {/* Hospital Panel */}
        <Route path="hospital" element={<LayoutShell />}>
          <Route index element={<Navigate to="emergency-dashboard" replace />} />
          <Route path="emergency-dashboard" element={<EmergencyDashboard onNewSOS={() => setIsSOSModalOpen(true)} />} />
          <Route path="active-requests-tracker" element={<ActiveRequestsTracker />} />
          <Route path="blood-inventory" element={<BloodInventoryPool onNewSOS={() => setIsSOSModalOpen(true)} />} />
          <Route path="donor-pool-nearby" element={<BloodInventoryPool onNewSOS={() => setIsSOSModalOpen(true)} />} />
          <Route path="request-history" element={<HospitalRequestHistory />} />
        </Route>

        {/* NGO Panel */}
        <Route path="ngo" element={<LayoutShell />}>
          <Route index element={<Navigate to="camp-dashboard" replace />} />
          <Route path="camp-dashboard" element={<CampDashboard />} />
          <Route path="create-blood-camp" element={<CreateBloodCamp />} />
          <Route path="manage-registrations" element={<ManageRegistrations />} />
          <Route path="ai-location-suggestions" element={<ManageRegistrations />} />
          <Route path="camp-analytics" element={<CampAnalytics />} />
          <Route path="donor-reach-report" element={<CampAnalytics />} />
        </Route>

        {/* Donor Panel */}
        <Route path="donor" element={<LayoutShell />}>
          <Route index element={<Navigate to="my-profile-&-availability" replace />} />
          <Route path="my-profile-&-availability" element={<PersonalProfile />} />
          <Route path="incoming-sos-alerts" element={<Availability />} />
          <Route path="donation-history" element={<ContributionArchive />} />
          <Route path="trust-score-&-badges" element={<TrustScore />} />
          <Route path="nearby-blood-camps" element={<NearbyCamps />} />
        </Route>

        {/* Patient Panel */}
        <Route path="patient" element={<LayoutShell />}>
          <Route index element={<Navigate to="dashboard" replace />} />
          <Route path="dashboard" element={<PatientDashboard />} />
          <Route path="live-donor-tracker" element={<LiveDonorTracker />} />
          <Route path="matched-donors" element={<MatchedDonorsList />} />
          <Route path="nearby-blood-banks" element={<NearbyBloodBanks />} />
          <Route path="request-history" element={<PatientRequestHistory />} />
          <Route path="my-profile" element={<PatientProfile />} />
          <Route path="award-gallery" element={<AwardGallery />} />
          <Route path="how-to-use" element={<HowToUse />} />
          <Route path="faq" element={<FAQ />} />
          <Route path="disclaimer-privacy" element={<Disclaimer />} />
        </Route>

        {/* Other Panels (Placeholders) */}
        {['bloodbank', 'govt'].map(panel => (
          <Route key={panel} path={panel} element={<LayoutShell />}>
            <Route index element={<PlaceholderPage title={`${panel.charAt(0).toUpperCase() + panel.slice(1)} Panel`} />} />
            <Route path="*" element={<PlaceholderPage title={`${panel.charAt(0).toUpperCase() + panel.slice(1)} Panel`} />} />
          </Route>
        ))}

        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>

      <RaiseSOSRequest 
        isOpen={isSOSModalOpen} 
        onClose={() => setIsSOSModalOpen(false)} 
      />
    </>
  );
};

const App = () => {
  return (
    <AppProvider>
      <Router>
        <AppRoutes />
        <DevRoleSwitcher />
      </Router>
    </AppProvider>
  );
};

export default App;
