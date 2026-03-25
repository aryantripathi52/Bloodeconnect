# 🩸 BloodConnect AI

BloodConnect AI is a powerful, multi-panel emergency blood donor matching platform designed for the Indian healthcare ecosystem. It leverages AI to instantly match patients with the nearest verified donors, hospitals, and blood banks, ensuring that every second counts in a medical emergency.

## 🚀 Key Features

- **7-Panel Ecosystem**: Tailored interfaces for Admins, Hospitals, Donors, Patients/Families, NGOs, Blood Banks, and Government Analysts.
- **AI Matching Engine**: Real-time algorithms to find the most reliable and closest donors based on Trust Scores and location.
- **Live Donor Tracker**: Interactive map-based tracking powered by **Google Maps API**.
- **Supabase Integration**: Robust backend for user authentication, real-time data synchronization, and secure medical records.
- **Emergency SOS**: One-tap SOS requests for hospitals and patients with instant multi-channel notifications (SMS, WhatsApp, In-App).
- **Gamified Rewards**: Trust scores, badges, and milestones for donors to encourage consistent contributions.

## 🛠️ Tech Stack

- **Frontend**: React.js, Vite, Tailwind CSS (v3)
- **State Management**: React Context API
- **Routing**: React Router v6
- **Animations**: Framer Motion
- **Icons**: Lucide React
- **Maps**: Google Maps API (@react-google-maps/api)
- **Backend**: Supabase (PostgreSQL, Auth, RLS)
- **Data Viz**: Recharts

## 🎨 Design Systems

The project uses distinct design languages for different user roles:
- **Jade Dynasty (Admin)**: Deep forest green (#1A2E1F) & Professional UI.
- **Jade Equilibrium (Hospital/NGO)**: Clinical and efficient layouts.
- **Jade Response (Donor)**: Trust-building and energetic themes.
- **Clinical Guardian (Patient)**: Clean, high-urgency interface with bold red accents.

## ⚙️ Getting Started

### Prerequisites
- Node.js (v18+)
- NPM or Yarn
- Supabase Project
- Google Maps API Key

### Installation

1. **Clone the repository**:
   ```bash
   git clone <repository-url>
   cd Bloodeconnect
   ```

2. **Install dependencies**:
   ```bash
   npm install
   ```

3. **Environment Variables**:
   Create a `.env` file in the root directory and add your credentials (see `.env.example`):
   ```env
   VITE_SUPABASE_URL=your_supabase_url
   VITE_SUPABASE_ANON_KEY=your_supabase_anon_key
   VITE_GOOGLE_MAPS_API_KEY=your_google_maps_key
   ```

4. **Run the development server**:
   ```bash
   npm run dev
   ```

## 📂 Project Structure

- `src/panels/`: Contains all user-specific panel components and tabs.
- `src/components/shared/`: Reusable UI components like Sidebar, TopBar, and MapView.
- `src/lib/`: Configuration for external services like Supabase.
- `src/data/`: Mock data and panel configurations.
- `src/landing/`: Public-facing marketing page.

## 🛡️ License

This project is licensed under the MIT License.

---
Built with ❤️ for saving lives.
