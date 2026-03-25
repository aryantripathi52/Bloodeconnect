import React, { useState } from 'react';
import { Search, ChevronDown, ChevronUp, LifeBuoy } from 'lucide-react';

const faqData = {
    "Getting Started": [
        { q: "How do I register as a patient?", a: "You can register through the mobile app or website by providing your basic details. A family member can also register on your behalf." },
        { q: "Is BloodConnect AI free to use?", a: "Yes, our platform is completely free for patients, donors, hospitals, and blood banks. Our mission is to save lives, not to make a profit from them." },
    ],
    "SOS Requests": [
        { q: "How quickly will I get matched with a donor?", a: "Our AI matching is instant. The time to get a response depends on donor availability and proximity. Critical requests are prioritized and sent to a wider network." },
        { q: "What if no donor is available nearby?", a: "The system automatically expands the search radius in increments. We also alert nearby blood banks and partner NGOs about the requirement." },
        { q: "Can I cancel a request after submitting?", a: "Yes, you can cancel an active request from your dashboard at any time. This frees up the matched donors for other emergencies." },
    ],
    "Donor Verification": [
        { q: "Are donors verified on this platform?", a: "Yes, we have a multi-level verification process, including mobile OTP, government ID (optional), and donation history. Verified donors have a badge on their profile." },
        { q: "What is a Trust Score?", a: "A Trust Score is an AI-calculated rating based on a donor's verification level, response time, and successful donation history. A higher score indicates a more reliable donor." },
    ],
};

const FaqItem = ({ q, a }) => {
    const [isOpen, setIsOpen] = useState(false);
    return (
        <div className="border-b">
            <button onClick={() => setIsOpen(!isOpen)} className="w-full flex justify-between items-center text-left p-5">
                <span className="font-semibold text-lg text-dark">{q}</span>
                {isOpen ? <ChevronUp className="text-primary" /> : <ChevronDown />}
            </button>
            {isOpen && <div className="p-5 pt-0 text-muted">{a}</div>}
        </div>
    );
};

const FAQ = () => {
    return (
        <div className="max-w-4xl mx-auto space-y-8">
            <div className="text-center">
                <h1 className="text-4xl font-bold text-dark">Frequently Asked Questions</h1>
                <p className="text-muted mt-2">Find answers to the most common questions about our platform.</p>
            </div>

            <div className="relative">
                <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-muted" size={20} />
                <input type="text" placeholder="Search questions..." className="w-full bg-white border-2 border-gray-200 rounded-lg pl-12 pr-4 py-3 focus:ring-primary focus:border-primary" />
            </div>

            <div className="space-y-6">
                {Object.entries(faqData).map(([category, items]) => (
                    <div key={category}>
                        <h2 className="text-2xl font-bold text-dark mb-4">{category}</h2>
                        <div className="bg-white rounded-lg shadow-sm overflow-hidden">
                            {items.map((item, i) => <FaqItem key={i} {...item} />)}
                        </div>
                    </div>
                ))}
            </div>

            <div className="text-center p-6 bg-primary-light rounded-lg">
                <LifeBuoy className="mx-auto text-primary mb-3" size={32}/>
                <h3 className="font-bold text-xl text-dark">Still have questions?</h3>
                <p className="text-muted mt-1">Our support team is here to help. Contact us 24/7.</p>
                <button className="mt-4 px-6 py-2 bg-primary text-white font-semibold rounded-lg shadow-sm hover:bg-red-700">Contact Support</button>
            </div>
        </div>
    );
};

export default FAQ;
