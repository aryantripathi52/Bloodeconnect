import React from 'react';
import { User, Upload, ShieldCheck, Edit, Save, Phone, Mail, MapPin, Heart, Bell, MessageSquare, ToggleLeft, ToggleRight } from 'lucide-react';

const user = { name: "Priya Sharma", bloodGroup: "B+", city: "Gurgaon", verified: true, age: 28, phone: "+91 98765 43210", email: "priya.sharma@email.com" };

const ProfileHeader = () => (
    <div className="bg-white p-6 rounded-lg shadow-sm flex items-center justify-between">
        <div className="flex items-center">
            <div className="relative mr-5">
                <img src={`https://i.pravatar.cc/150?u=u4`} alt="User Avatar" className="w-20 h-20 rounded-full" />
                <button className="absolute bottom-0 right-0 bg-primary text-white p-1.5 rounded-full"><Upload size={14} /></button>
            </div>
            <div>
                <h1 className="text-2xl font-bold text-dark flex items-center">{user.name} {user.verified && <ShieldCheck size={20} className="ml-2 text-success fill-current" />}</h1>
                <p className="text-muted">{user.bloodGroup} | {user.city}</p>
            </div>
        </div>
        <button className="flex items-center px-4 py-2 bg-gray-100 text-dark rounded-lg font-semibold border-2 border-gray-200 hover:bg-gray-200">
            <Edit size={16} className="mr-2" /> Edit Profile
        </button>
    </div>
);

const ProfileSection = ({ title, children }) => (
    <div className="bg-white p-6 rounded-lg shadow-sm">
        <h3 className="text-lg font-bold text-dark mb-4 border-b pb-2">{title}</h3>
        <div className="space-y-4">{children}</div>
    </div>
);

const InfoRow = ({ icon, label, value }) => (
    <div className="flex items-center">
        <div className="w-8 text-muted">{icon}</div>
        <div className="flex-1">
            <p className="text-xs text-muted">{label}</p>
            <p className="font-semibold text-dark">{value}</p>
        </div>
    </div>
);

const Toggle = ({ label, icon, enabled }) => (
    <div className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
        <div className="flex items-center font-semibold text-dark">{icon}{label}</div>
        {enabled ? <ToggleRight size={32} className="text-success" /> : <ToggleLeft size={32} className="text-muted" />}
    </div>
);

const PatientProfile = () => {
    return (
        <div className="space-y-6">
            <ProfileHeader />
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <div className="md:col-span-2 space-y-6">
                    <ProfileSection title="Personal Details">
                        <div className="grid grid-cols-2 gap-4">
                            <InfoRow icon={<User />} label="Full Name" value={user.name} />
                            <InfoRow icon={<User />} label="Age" value={user.age} />
                            <InfoRow icon={<Phone />} label="Phone" value={user.phone} />
                            <InfoRow icon={<Mail />} label="Email" value={user.email} />
                            <InfoRow icon={<MapPin />} label="City" value={user.city} />
                        </div>
                    </ProfileSection>
                    <ProfileSection title="Medical Info">
                        <div className="grid grid-cols-2 gap-4">
                            <InfoRow icon={<Droplets />} label="Blood Group" value={user.bloodGroup} />
                            <InfoRow icon={<Heart />} label="Known Conditions" value="None" />
                            <InfoRow icon={<Heart />} label="Allergies" value="None" />
                        </div>
                    </ProfileSection>
                </div>
                <div className="space-y-6">
                    <ProfileSection title="Emergency Contacts">
                        <InfoRow icon={<User />} label="Father" value="+91 98765 11111" />
                        <InfoRow icon={<User />} label="Spouse" value="+91 98765 22222" />
                    </ProfileSection>
                    <ProfileSection title="Notification Preferences">
                        <Toggle label="SMS" icon={<MessageSquare className="mr-2"/>} enabled={true} />
                        <Toggle label="WhatsApp" icon={<MessageSquare className="mr-2"/>} enabled={true} />
                        <Toggle label="Email" icon={<Mail className="mr-2"/>} enabled={false} />
                    </ProfileSection>
                </div>
            </div>
            <div className="flex justify-end">
                <button className="flex items-center px-6 py-3 bg-primary text-white rounded-lg font-bold shadow-lg hover:bg-red-700">
                    <Save size={18} className="mr-2" /> Save Changes
                </button>
            </div>
        </div>
    );
};

export default PatientProfile;
