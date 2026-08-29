import React from "react";
import Link from "next/link";
import { ArrowLeft } from "lucide-react";
import Logo from "@/components/Logo";

export default function PrivacyPolicy() {
  return (
    <div className="min-h-screen bg-[#050505] text-white/80 pb-20">
      <div className="border-b border-white/10 bg-[#0a0a0a] sticky top-0 z-50">
        <div className="max-w-4xl mx-auto px-6 h-20 flex items-center justify-between">
          <Link href="/" className="flex items-center gap-2 hover:opacity-80 transition-opacity">
            <ArrowLeft size={20} className="text-white/60" />
            <span className="text-white font-medium">Back to Home</span>
          </Link>
          <Logo variant="orange" />
        </div>
      </div>

      <div className="max-w-3xl mx-auto px-6 mt-16">
        <div className="mb-12">
          <h1 className="text-4xl font-bold text-white mb-4">Privacy Policy for Peakpay</h1>
          <p className="text-white/60 text-lg">Last updated: August 2026</p>
        </div>

        <div className="space-y-8 text-lg leading-relaxed font-light">
          <p>
            This Privacy Policy describes how Peakpay, operated by Smart City Limited (“we,” “us,” or
            “our”), collects, uses, stores, discloses, and protects personal information when you
            access or use the Peakpay mobile application, website, and related services
            (collectively, the “Platform”).
          </p>

          <p>
            We recognize the importance of privacy and are committed to handling personal data
            lawfully, transparently, and securely, in accordance with the Nigeria Data Protection
            Regulation (NDPR), the General Data Protection Regulation (GDPR) where applicable,
            and relevant consumer protection and financial regulations.
          </p>

          <p>
            By accessing or using the Platform, you acknowledge that you have read, understood,
            and agreed to the terms of this Privacy Policy.
          </p>

          <div className="space-y-4">
            <h2 className="text-2xl font-semibold text-white mt-12 mb-6">1. Lawful Basis for Processing</h2>
            <p>We process personal data on one or more of the following lawful bases:</p>
            <ul className="list-disc pl-6 space-y-2 text-white/70">
              <li>Your explicit consent</li>
              <li>The performance of a contract (loan and financial services)</li>
              <li>Compliance with legal and regulatory obligations</li>
              <li>Our legitimate interests, including fraud prevention, risk management, and service improvement, provided such interests do not override your rights</li>
            </ul>
            <p>You may withdraw consent at any time, subject to legal and contractual restrictions.</p>
          </div>

          <div className="space-y-4">
            <h2 className="text-2xl font-semibold text-white mt-12 mb-6">2. Information We Collect</h2>
            <h3 className="text-xl font-medium text-white">A. Information Collected with Permission</h3>
            <p>We only request permissions that are necessary for service delivery and regulatory compliance.</p>
            
            <h4 className="text-lg font-medium text-white mt-6">2.1 Approximate Location Data</h4>
            <p>We collect approximate location information to:</p>
            <ul className="list-disc pl-6 space-y-2 text-white/70">
              <li>Reduce fraud and account-related risks</li>
              <li>Support compliance and security monitoring</li>
            </ul>
            <p>Location data is collected only with your consent and transmitted via encrypted channels.</p>

            <h4 className="text-lg font-medium text-white mt-6">2.2 Camera Access</h4>
            <p>Camera access is required for:</p>
            <ul className="list-disc pl-6 space-y-2 text-white/70">
              <li>Identity verification (KYC)</li>
              <li>Facial verification and document upload</li>
            </ul>
            <p>Peakpay does not access photos or videos stored on your device outside the verification process. If camera permission is denied, certain services may be unavailable.</p>

            <h4 className="text-lg font-medium text-white mt-6">2.3 Emergency Contacts</h4>
            <p>We collect details of two emergency contacts, including name, relationship, and phone number, strictly for:</p>
            <ul className="list-disc pl-6 space-y-2 text-white/70">
              <li>Identity verification</li>
              <li>Credit risk assessment</li>
              <li>Fraud prevention</li>
            </ul>
            <p>Contacts are collected only when explicitly selected by you. We do not access or store your full contact list.</p>

            <h4 className="text-lg font-medium text-white mt-6">2.4 Biometric (Face Recognition) Data</h4>
            <p>For liveness detection, Peakpay uses Apple’s TrueDepth API to process temporary facial mesh and landmark data locally on your device.</p>
            <ul className="list-disc pl-6 space-y-2 text-white/70">
              <li>Facial data is not stored, reused, or shared</li>
              <li>Data is deleted immediately after verification</li>
              <li>No biometric data is retained following app uninstallation</li>
            </ul>

            <h4 className="text-lg font-medium text-white mt-6">2.5 Device and Technical Information</h4>
            <p>We collect limited device information such as:</p>
            <ul className="list-disc pl-6 space-y-2 text-white/70">
              <li>Device model and OS version</li>
              <li>Network type</li>
              <li>Language and time zone</li>
              <li>Advertising identifiers (GAID / IDFA)</li>
            </ul>
            <p>This information supports security monitoring, fraud prevention, analytics, and service optimization.</p>

            <h4 className="text-lg font-medium text-white mt-6">2.6 Advertising and Analytics</h4>
            <p>We use AppsFlyer for attribution, analytics, and fraud detection. You may manage or restrict ad tracking through your device settings.</p>
          </div>

          <div className="space-y-4">
            <h2 className="text-2xl font-semibold text-white mt-12 mb-6">3. Personal Information Provided by You</h2>
            
            <h3 className="text-xl font-medium text-white">3.1 Categories of Data</h3>
            <p>We may collect and process:</p>
            <ul className="list-disc pl-6 space-y-2 text-white/70">
              <li>Full name</li>
              <li>Gender</li>
              <li>Date of birth</li>
              <li>BVN</li>
              <li>Phone number</li>
              <li>Residential address</li>
              <li>Emergency contact details</li>
              <li>Education and employment information</li>
              <li>Income details</li>
              <li>Bank account or wallet information</li>
            </ul>

            <h3 className="text-xl font-medium text-white mt-6">3.2 Purpose of Processing</h3>
            <p>Your data is used to:</p>
            <ul className="list-disc pl-6 space-y-2 text-white/70">
              <li>Verify identity and comply with KYC/AML regulations</li>
              <li>Assess creditworthiness and manage risk</li>
              <li>Prevent fraud and unauthorized access</li>
              <li>Deliver, maintain, and improve our services</li>
              <li>Communicate service updates, offers, and notices</li>
              <li>Resolve disputes and customer requests</li>
              <li>Comply with legal and regulatory obligations</li>
            </ul>
          </div>

          <div className="space-y-4">
            <h2 className="text-2xl font-semibold text-white mt-12 mb-6">4. Data Storage and Security</h2>
            <p>Peakpay, operated by Smart City Limited, implements industry-standard security measures, including:</p>
            <ul className="list-disc pl-6 space-y-2 text-white/70">
              <li>SSL/TLS encryption during data transmission</li>
              <li>Restricted internal access controls</li>
              <li>Secure server infrastructure</li>
              <li>Periodic security reviews and audits</li>
            </ul>
            <p>We apply data minimization principles and retain personal data only to the extent necessary.</p>
          </div>

          <div className="space-y-4">
            <h2 className="text-2xl font-semibold text-white mt-12 mb-6">5. Data Sharing and Disclosure</h2>
            <p>We do not sell personal data.</p>
            <p>We may disclose information only:</p>
            <ul className="list-disc pl-6 space-y-2 text-white/70">
              <li>To regulated service providers acting on our instructions</li>
              <li>Where required by law or regulatory authorities</li>
              <li>To prevent fraud or protect legal rights</li>
              <li>With your explicit consent</li>
            </ul>
            <p>All third parties are contractually bound to confidentiality and data protection obligations.</p>
          </div>

          <div className="space-y-4">
            <h2 className="text-2xl font-semibold text-white mt-12 mb-6">6. Data Retention</h2>
            <p>We retain personal data only for as long as necessary to:</p>
            <ul className="list-disc pl-6 space-y-2 text-white/70">
              <li>Provide our services</li>
              <li>Fulfill contractual obligations</li>
              <li>Meet legal and regulatory requirements</li>
              <li>Resolve disputes and prevent fraud</li>
            </ul>
            <p>Where retention is no longer required, data is securely deleted or anonymized.</p>
          </div>

          <div className="space-y-4">
            <h2 className="text-2xl font-semibold text-white mt-12 mb-6">7. Account Deletion and User Rights</h2>
            <p>You have the right to:</p>
            <ul className="list-disc pl-6 space-y-2 text-white/70">
              <li>Access your personal data</li>
              <li>Request correction or update</li>
              <li>Withdraw consent (where applicable)</li>
              <li>Request deletion of your account</li>
            </ul>
            <p>Account deletion may be restricted if:</p>
            <ul className="list-disc pl-6 space-y-2 text-white/70">
              <li>There are active, pending, or unpaid obligations</li>
              <li>Retention is required by law</li>
            </ul>
            <p>Re-registration using the same phone number is permitted after 15 days, subject to fraud-prevention controls.</p>
          </div>

          <div className="space-y-4">
            <h2 className="text-2xl font-semibold text-white mt-12 mb-6">8. Data Subject Rights (NDPR & GDPR)</h2>
            <p>Subject to applicable law, you may exercise the following rights:</p>
            <ul className="list-disc pl-6 space-y-2 text-white/70">
              <li>Right to access</li>
              <li>Right to rectification</li>
              <li>Right to erasure</li>
              <li>Right to restrict or object to processing</li>
              <li>Right to data portability</li>
              <li>Right to lodge a complaint with a data protection authority</li>
            </ul>
            <p>Requests can be submitted using the contact details below.</p>
          </div>

          <div className="space-y-4">
            <h2 className="text-2xl font-semibold text-white mt-12 mb-6">9. Our Role as Data Controller</h2>
            <p>Smart City Limited acts as the Data Controller for personal data processed through Peakpay and is responsible for ensuring lawful, secure, and transparent handling of such data.</p>
          </div>

          <div className="space-y-4">
            <h2 className="text-2xl font-semibold text-white mt-12 mb-6">10. Changes to This Policy</h2>
            <p>We may update this Privacy Policy periodically. Updates will be published on the Platform. Continued use of Peakpay constitutes acceptance of the revised policy.</p>
          </div>

          <div className="space-y-4 p-8 bg-[#111] rounded-2xl border border-white/10 mt-12">
            <h2 className="text-2xl font-semibold text-white mb-6">11. Contact Information</h2>
            <div className="space-y-2">
              <p><strong className="text-white">Application Name:</strong> Peakpay</p>
              <p><strong className="text-white">Company:</strong> Smart City Limited</p>
              <p><strong className="text-white">Email:</strong> <a href="mailto:support@smartcitylimited.com" className="text-[#ff8a00] hover:underline">support@smartcitylimited.com</a></p>
              <p><strong className="text-white">Business Hours:</strong> Monday to Friday, 9:00 a.m. – 6:00 p.m.</p>
            </div>
          </div>

        </div>
      </div>
    </div>
  );
}
