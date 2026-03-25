import React, { useState } from 'react';

const DisclaimerContent = () => (
    <div className="prose max-w-none">
        <h2>Service Disclaimer</h2>
        <p>BloodConnect AI is a technology platform intended to facilitate connections between voluntary blood donors and individuals in need. It is not a medical service, blood bank, or a substitute for professional medical advice.</p>
        <ul>
            <li><strong>No Guarantee:</strong> We do not guarantee the availability of donors, the accuracy of donor information, or that a donation will occur.</li>
            <li><strong>Not Liable:</strong> BloodConnect AI and its operators are not liable for the conduct of any user, the quality of donated blood, or any medical outcomes.</li>
            <li><strong>Consult Professionals:</strong> Always consult a qualified medical professional for any health concerns. In a critical emergency, contact your local emergency services immediately.</li>
        </ul>
        <p className="text-sm text-muted">Last updated: March 25, 2026</p>
    </div>
);

const PrivacyContent = () => (
    <div className="prose max-w-none">
        <h2>Privacy Policy</h2>
        <p>Your privacy is critically important to us. This policy outlines how we collect, use, and protect your information.</p>
        <h3>Data Collection</h3>
        <p>We collect information you provide during registration, such as name, contact details, and medical information (e.g., blood group). We also collect location data during active SOS requests to facilitate matching.</p>
        <h3>Data Usage</h3>
        <p>Your data is used solely to operate the platform: to match donors with recipients, to communicate alerts, and to improve our service. We will never sell your personal data.</p>
        <h3>Aadhar & Verification</h3>
        <p>Providing Aadhar or other government ID for verification is optional but helps increase your Trust Score. This data is encrypted and used only for verification purposes.</p>
        <h3>Third-Party Sharing</h3>
        <p>We may share anonymized, aggregated data with government health organizations for research and policy-making. Your personally identifiable information is only shared with a matched donor/recipient after you have accepted a request.</p>
        <p className="text-sm text-muted">Last updated: March 25, 2026</p>
    </div>
);

const Disclaimer = () => {
    const [activeTab, setActiveTab] = useState('Disclaimer');

    return (
        <div className="max-w-4xl mx-auto space-y-6">
            <h1 className="text-3xl font-bold text-dark">Legal Information</h1>
            <div className="flex border-b">
                <button onClick={() => setActiveTab('Disclaimer')} className={`px-6 py-3 font-semibold ${activeTab === 'Disclaimer' ? 'border-b-2 border-primary text-primary' : 'text-muted'}`}>
                    Disclaimer
                </button>
                <button onClick={() => setActiveTab('Privacy')} className={`px-6 py-3 font-semibold ${activeTab === 'Privacy' ? 'border-b-2 border-primary text-primary' : 'text-muted'}`}>
                    Privacy Policy
                </button>
            </div>
            <div className="bg-white p-6 rounded-lg shadow-sm">
                {activeTab === 'Disclaimer' ? <DisclaimerContent /> : <PrivacyContent />}
            </div>
        </div>
    );
};

export default Disclaimer;
