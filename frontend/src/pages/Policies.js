import React from 'react';
import { Shield, FileText, RefreshCw } from 'lucide-react';

const Policies = () => {
  return (
    <div className="font-sans min-h-screen bg-gray-50 flex flex-col items-center py-16 px-4 sm:px-6 lg:px-8">
      <div className="max-w-4xl w-full bg-white shadow-xl rounded-2xl overflow-hidden border border-gray-100">
        
        {/* Header */}
        <div className="bg-gradient-to-r from-gray-900 to-[#0A1128] px-8 py-10 text-white">
          <h1 className="text-4xl font-extrabold tracking-tight mb-2">Legal & Policies</h1>
          <p className="text-gray-400 text-lg">Effective Date: April 2026. Please read our guidelines carefully.</p>
        </div>

        <div className="p-8 sm:p-12 space-y-12">
          
          {/* Terms of Use */}
          <section id="terms" className="scroll-mt-10">
            <div className="flex items-center gap-4 mb-6 pb-2 border-b border-gray-100">
              <div className="p-3 rounded-xl bg-blue-50 text-blue-600"><FileText size={24} /></div>
              <h2 className="text-2xl font-bold text-gray-900">Terms of Use</h2>
            </div>
            <div className="text-gray-600 space-y-4 leading-relaxed font-medium text-sm md:text-base">
              <p>Welcome to SmartPoint. By accessing or using our platform, you agree to be bound by these Terms of Use and all applicable laws and regulations. If you do not agree with any part of these terms, you are prohibited from using our services.</p>
              <p>1. **Account Registration**: You must provide accurate and complete information upon registration. You are responsible for safeguarding your password and any activities under your account.</p>
              <p>2. **User Conduct**: You agree not to engage in any activity that interferes with or disrupts the services, or violates the intellectual property rights of others.</p>
              <p>3. **Pricing & Availability**: All prices are subject to change without notice. We reserve the right to modify or discontinue any product randomly without liability.</p>
            </div>
          </section>

          {/* Privacy Security */}
          <section id="privacy" className="scroll-mt-10">
            <div className="flex items-center gap-4 mb-6 pb-2 border-b border-gray-100">
             <div className="p-3 rounded-xl bg-green-50 text-green-600"><Shield size={24} /></div>
             <h2 className="text-2xl font-bold text-gray-900">Privacy & Security</h2>
            </div>
            <div className="text-gray-600 space-y-4 leading-relaxed font-medium text-sm md:text-base">
              <p>At SmartPoint, data security and user privacy are paramount. Our infrastructure employs state-of-the-art AES-256 encryption ensuring end-to-end security for all data transfers.</p>
              <p>1. **Data Collection**: We collect strictly what is necessary: your Name, encrypted Authentication hashes, and local Order mapping. We do not sell personally identifiable information to third parties.</p>
              <p>2. **Cookies**: We utilize strictly functional cookies ensuring persistence of JWT Authentication states locally during active navigation sessions.</p>
              <p>3. **Compliance**: We adhere to global GDPR and standard data protection mandates. Upon formal request, a user can permanently purge all associative relational DB maps of their account architecture.</p>
            </div>
          </section>

          {/* Return Policy */}
          <section id="returns" className="scroll-mt-10">
            <div className="flex items-center gap-4 mb-6 pb-2 border-b border-gray-100">
             <div className="p-3 rounded-xl bg-purple-50 text-purple-600"><RefreshCw size={24} /></div>
             <h2 className="text-2xl font-bold text-gray-900">Return & Refund Policy</h2>
            </div>
            <div className="text-gray-600 space-y-4 leading-relaxed font-medium text-sm md:text-base">
              <p>Our mandate is absolute customer satisfaction. If you are not entirely satisfied with your purchase, we're here to help.</p>
              <p>1. **Eligibility for Return**: You have 14 calendar days to return an item from the date you received it. The item must be unused, in the same transparent condition that you received it, and must reside in the original packaging.</p>
              <p>2. **Cash On Delivery Restitutions**: As our platform rigorously limits digital pipelines exclusively in favor of Cash On Delivery, refunds will be initiated physically via our reverse-logistics agents post-inspection.</p>
              <p>3. **Exceptions**: Goods marked as 'Sale', customized orders, and perishable consumables natively do not qualify for external returns.</p>
            </div>
          </section>
          
        </div>
        
        {/* Footer actions */}
        <div className="bg-gray-50 border-t border-gray-100 p-8 flex flex-col sm:flex-row justify-between items-center gap-4">
           <p className="text-sm font-bold text-gray-400 uppercase tracking-widest">SmartPoint Legal Affairs</p>
           <button onClick={() => window.close()} className="px-8 py-3 bg-gray-900 hover:bg-gray-800 text-white font-bold rounded-xl shadow transition-colors">
              Close Document Tab
           </button>
        </div>

      </div>
    </div>
  );
};

export default Policies;
