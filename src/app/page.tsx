"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import { ChevronDown, ChevronUp, ShieldCheck, Zap, UserCheck, Eye, CreditCard, LayoutDashboard, Sun, Moon } from "lucide-react";
import Logo, { WhiteLogo } from "@/components/Logo";
import styles from "../components/landing/landing.module.css";
import { motion, AnimatePresence, Variants } from "framer-motion";
import dynamic from "next/dynamic";
import securityAnimationData from "../components/landing/locked-icon.json";

// Dynamically import Lottie to prevent SSR window issues and fix TS export types
const Lottie = dynamic(() => import("lottie-react").then((mod) => mod.Lottie), { ssr: false });

// Swiper imports
import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/css';
import 'swiper/css/effect-coverflow';
import 'swiper/css/pagination';
import 'swiper/css/autoplay';
import { EffectCoverflow, Pagination, Autoplay } from 'swiper/modules';

const FAQs = [
  {
    q: "Who can apply for a Peakpay loan?",
    a: "Individuals with a valid phone number, BVN, active bank account and verifiable source of income may complete an application. All applications remain subject to eligibility and credit assessment."
  },
  {
    q: "How do I apply?",
    a: "Create your Peakpay account, complete your profile and verification, view your estimated eligible amount and submit a loan request."
  },
  {
    q: "What information will I need?",
    a: "You may be required to provide your BVN, employment and income information, next-of-kin details, bank-account information, residential address and a recent utility bill."
  },
  {
    q: "How is my eligible amount determined?",
    a: "Your estimated eligible amount is based on the information provided during onboarding and the outcome of Peakpay's assessment."
  },
  {
    q: "Can I choose how long I want to repay?",
    a: "You can select from the repayment periods available during your loan request. The final approved tenure will be included in your loan offer."
  },
  {
    q: "Will I see the loan terms before accepting?",
    a: "Yes. Your offer letter provides the approved amount, interest rate, tenure, repayment amount, repayment date and total repayment amount before acceptance."
  }
];

const Benefits = [
  { icon: <Zap size={28} />, title: "Quick Digital Onboarding", desc: "Create your account, verify your phone number and securely set up your password and transaction PIN." },
  { icon: <ShieldCheck size={28} />, title: "Secure Identity Verification", desc: "Complete your BVN verification and liveness check to confirm your identity and protect your account." },
  { icon: <UserCheck size={28} />, title: "Personalised Eligibility", desc: "Provide your employment, income and bank information to receive a loan offer based on your profile." },
  { icon: <Eye size={28} />, title: "Transparent Loan Offers", desc: "Review your approved loan amount, interest rate, loan tenure, repayment amount and first payment date before accepting." },
  { icon: <CreditCard size={28} />, title: "Flexible Repayment Options", desc: "Repay your loan using your card or make a bank transfer through the platform." },
  { icon: <LayoutDashboard size={28} />, title: "Easy Loan Management", desc: "Monitor your outstanding balance, repayment progress, upcoming payment date and complete repayment schedule from your dashboard." }
];

const HowItWorksSteps = [
  { title: "Create Your Account", desc: "Register with your name, phone number and email address. Create a secure password and set up your security questions." },
  { title: "Complete Your Profile", desc: "Complete BVN verification and liveness, then provide next-of-kin, employment, income, PEP and bank-account details. Create your transaction PIN." },
  { title: "View Your Eligibility", desc: "Once your profile and verification are completed, your dashboard displays your estimated eligible loan amount." },
  { title: "Request a Loan", desc: "Enter the amount you need, select the purpose of the loan and choose your preferred repayment period." },
  { title: "Confirm Your Address", desc: "Provide your residential address, closest landmark, state, local government area and city. Upload a recent utility bill where required." },
  { title: "Review and Accept", desc: "Review your approved amount, interest rate, tenure, repayment amount, first payment date and payment method." },
  { title: "Receive and Manage", desc: "Accept the offer securely with your transaction PIN, complete repayment setup and manage your active loan from your dashboard." }
];

// Framer Motion Animation Variants
const fadeInUp: Variants = {
  hidden: { opacity: 0, y: 40 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.6, type: "spring", bounce: 0.4 } }
};

const staggerContainer: Variants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { staggerChildren: 0.15 }
  }
};

const scaleIn: Variants = {
  hidden: { opacity: 0, scale: 0.9, rotateX: 10 },
  visible: { opacity: 1, scale: 1, rotateX: 0, transition: { duration: 0.8, type: "spring", bounce: 0.4 } }
};

export default function LandingPage() {
  const [openFaq, setOpenFaq] = useState<number | null>(0);
  const [theme, setTheme] = useState<'dark' | 'light'>('dark');
  const [typedText, setTypedText] = useState("");
  const [particles, setParticles] = useState<{id: number, x: number, y: number, type: number, color: string}[]>([]);
  const [backgroundShapes, setBackgroundShapes] = useState<{id: number, x: string, y: string, type: number, color: string, delay: number, duration: number}[]>([]);
  
  const fullText = "A Smarter Way to Access and Manage Personal Loans";

  // Generate persistent background shapes on mount
  useEffect(() => {
    const colors = ["#ff8a00", "#00a67e", "#9333ea", "#3b82f6", "#f43f5e", "#eab308"];
    const shapes = Array.from({ length: 25 }).map((_, i) => ({
      id: i,
      x: `${Math.random() * 100}vw`,
      y: `${Math.random() * 100}vh`,
      type: Math.floor(Math.random() * 3),
      color: colors[Math.floor(Math.random() * colors.length)],
      delay: Math.random() * 5,
      duration: Math.random() * 10 + 10, // 10-20s floating animation
    }));
    setBackgroundShapes(shapes);
  }, []);

  // Typewriter effect
  useEffect(() => {
    let i = 0;
    const typingInterval = setInterval(() => {
      if (i < fullText.length) {
        setTypedText(fullText.substring(0, i + 1));
        i++;
      } else {
        clearInterval(typingInterval);
      }
    }, 70); 
    
    return () => clearInterval(typingInterval);
  }, []);

  // Interactive Background Vectors on Click
  useEffect(() => {
    const handleClick = (e: MouseEvent) => {
      // Don't spawn if clicking on buttons or links
      if ((e.target as HTMLElement).closest('button, a, .swiper-slide')) return;

      const colors = ["#ff8a00", "#00a67e", "#9333ea", "#3b82f6"];
      
      const newParticle = {
        id: Date.now(),
        x: e.clientX,
        y: e.clientY,
        type: Math.floor(Math.random() * 3), // 0: circle, 1: square, 2: plus
        color: colors[Math.floor(Math.random() * colors.length)]
      };
      
      setParticles(prev => [...prev, newParticle]);
      
      // Remove after animation completes
      setTimeout(() => {
        setParticles(prev => prev.filter(p => p.id !== newParticle.id));
      }, 1500);
    };
    
    window.addEventListener('click', handleClick);
    return () => window.removeEventListener('click', handleClick);
  }, []);

  const toggleTheme = () => {
    setTheme(prev => prev === 'dark' ? 'light' : 'dark');
  };

  return (
    <div className={styles.landingContainer} data-theme={theme}>
      {/* Persistent Background Shapes Layer */}
      <div style={{ position: 'fixed', top: 0, left: 0, width: '100%', height: '100%', pointerEvents: 'none', zIndex: 0, overflow: 'hidden' }}>
        {backgroundShapes.map(s => (
          <motion.div
            key={`bg-${s.id}`}
            initial={{ opacity: 0, x: s.x, y: s.y, rotate: 0 }}
            animate={{ 
              opacity: [0, 0.4, 0.4, 0],
              y: [`calc(${s.y} - 0px)`, `calc(${s.y} - 100px)`],
              rotate: 360
            }}
            transition={{
              duration: s.duration,
              repeat: Infinity,
              delay: s.delay,
              ease: "linear"
            }}
            style={{
              position: 'absolute',
              width: '40px',
              height: '40px',
              border: s.type === 0 ? `2px solid ${s.color}` : 'none',
              backgroundColor: s.type === 1 ? s.color : 'transparent',
              borderRadius: s.type === 0 ? '50%' : '0',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              opacity: 0.15 // base opacity
            }}
          >
            {s.type === 2 && (
              <div style={{ position: 'relative', width: '24px', height: '24px' }}>
                <div style={{ position: 'absolute', width: '100%', height: '3px', background: s.color, top: '10.5px' }} />
                <div style={{ position: 'absolute', height: '100%', width: '3px', background: s.color, left: '10.5px' }} />
              </div>
            )}
          </motion.div>
        ))}
      </div>

      {/* Interactive Particles Layer */}
      <div style={{ position: 'fixed', top: 0, left: 0, width: '100%', height: '100%', pointerEvents: 'none', zIndex: 9999 }}>
        <AnimatePresence>
          {particles.map(p => (
            <motion.div
              key={p.id}
              initial={{ opacity: 1, scale: 0, x: p.x - 15, y: p.y - 15, rotate: 0 }}
              animate={{ 
                opacity: 0, 
                scale: Math.random() * 2 + 1, 
                x: p.x - 15 + (Math.random() * 100 - 50), 
                y: p.y - 15 + (Math.random() * -100 - 50),
                rotate: Math.random() * 180
              }}
              exit={{ opacity: 0 }}
              transition={{ duration: 1.2, ease: "easeOut" }}
              style={{
                position: 'absolute',
                width: '30px',
                height: '30px',
                border: p.type === 0 ? `2px solid ${p.color}` : 'none',
                backgroundColor: p.type === 1 ? p.color : 'transparent',
                borderRadius: p.type === 0 ? '50%' : '0',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
              }}
            >
              {p.type === 2 && (
                <div style={{ position: 'relative', width: '20px', height: '20px' }}>
                  <div style={{ position: 'absolute', width: '100%', height: '2px', background: p.color, top: '9px' }} />
                  <div style={{ position: 'absolute', height: '100%', width: '2px', background: p.color, left: '9px' }} />
                </div>
              )}
            </motion.div>
          ))}
        </AnimatePresence>
      </div>

      {/* Navigation */}
      <nav className={styles.navbar}>
        <div className="flex items-center gap-2">
           {theme === 'dark' ? <WhiteLogo /> : <Logo variant="orange" />}
        </div>
        <div className={`hidden md:flex ${styles.navLinks}`}>
          <a href="#home" className={styles.navLink}>Home</a>
          <a href="#how-it-works" className={styles.navLink}>How It Works</a>
          <a href="#benefits" className={styles.navLink}>Why Peakpay</a>
          <a href="#faqs" className={styles.navLink}>FAQs</a>
        </div>
        <div className={styles.navActions}>
          <button onClick={toggleTheme} className={styles.themeToggle} aria-label="Toggle Theme">
            {theme === 'dark' ? <Sun size={20} /> : <Moon size={20} />}
          </button>
          <Link href="/login" className={styles.loginBtn}>Log In</Link>
          <Link href="/signup" className={styles.getStartedBtn}>Get Started</Link>
        </div>
      </nav>

      {/* Hero Section */}
      <section id="home" className={styles.heroSection}>
        {/* Animated Background Circles */}
        <div className={`${styles.bgCircle} ${styles.bgCircle1}`}></div>
        <div className={`${styles.bgCircle} ${styles.bgCircle2}`}></div>
        <div className={`${styles.bgCircle} ${styles.bgCircle3}`}></div>
        
        <motion.div 
          className={styles.heroContent}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: false, amount: 0.3 }}
          variants={staggerContainer}
        >
          <h1 className={styles.heroTitle}>
            {typedText}
            <span className={styles.cursor}></span>
          </h1>
          <motion.p className={styles.heroSubtitle} variants={fadeInUp}>
            From application to repayment, Peakpay gives you a simple and secure way to access credit, review your loan terms and stay in control of your repayments - all from one platform.
          </motion.p>
          <motion.div className={styles.heroActions} variants={fadeInUp}>
            <Link href="/signup" className={styles.getStartedBtn}>Get Started</Link>
            <Link href="/login" className={styles.secondaryBtn}>Log In</Link>
          </motion.div>
        </motion.div>
        
        <motion.div 
          className={`hidden lg:flex ${styles.heroImageContainer}`}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: false, amount: 0.3 }}
          variants={scaleIn}
        >
          <motion.img 
            src="/images/hero-mockup.jpg" 
            alt="Peakpay Dashboard" 
            className={styles.heroImage}
            whileHover={{ scale: 1.05, rotateY: 0, rotateX: 0 }}
            style={{ transform: "rotateY(-15deg) rotateX(10deg)" }}
          />
        </motion.div>
      </section>

      {/* Key Benefits */}
      <section id="benefits" className={styles.section}>
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: false, amount: 0.2 }}
          variants={fadeInUp}
        >
          <h2 className={styles.sectionTitle}>Everything you need to borrow with confidence</h2>
          <p className={styles.sectionSubtitle}>Financial support when you need it, powered by a seamless digital experience.</p>
        </motion.div>

        <motion.div 
          className={styles.benefitsGrid}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: false, amount: 0.1 }}
          variants={staggerContainer}
        >
          {Benefits.map((b, i) => (
            <motion.div key={i} className={styles.benefitCard} variants={fadeInUp}>
              <div className={styles.benefitIcon}>{b.icon}</div>
              <h3 className={styles.benefitTitle}>{b.title}</h3>
              <p className={styles.benefitDesc}>{b.desc}</p>
            </motion.div>
          ))}
        </motion.div>
      </section>

      {/* How It Works (3D Coverflow Carousel) */}
      <section id="how-it-works" className={styles.section} style={{ padding: "8rem 0" }}>
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: false, amount: 0.5 }}
          variants={fadeInUp}
          style={{ padding: "0 5%" }}
        >
          <h2 className={styles.sectionTitle}>Get started in a few simple steps</h2>
          <p className={styles.sectionSubtitle}>A clear and guided process so you always know what information is required.</p>
        </motion.div>

        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: false }}
          variants={scaleIn}
        >
          <Swiper
            effect={'coverflow'}
            grabCursor={true}
            centeredSlides={true}
            slidesPerView={'auto'}
            coverflowEffect={{
              rotate: 50,
              stretch: 0,
              depth: 100,
              modifier: 1,
              slideShadows: true,
            }}
            autoplay={{
              delay: 2500,
              disableOnInteraction: false,
            }}
            pagination={{ clickable: true }}
            modules={[EffectCoverflow, Pagination, Autoplay]}
            className="w-full py-12"
          >
            {HowItWorksSteps.map((step, i) => (
              <SwiperSlide key={i} style={{ width: '400px', height: 'auto' }}>
                <div className={styles.carouselItem}>
                  <div className={styles.stepNumber}>0{i + 1}</div>
                  <div className={styles.carouselContent}>
                    <h3 className={styles.benefitTitle}>{step.title}</h3>
                    <p className={styles.benefitDesc}>{step.desc}</p>
                  </div>
                </div>
              </SwiperSlide>
            ))}
          </Swiper>
        </motion.div>
      </section>

      {/* Security & Repayment Split Section */}
      <section className={styles.section}>
        <div className={`flex flex-col lg:flex-row gap-12 items-center ${styles.securitySection}`}>
          <motion.div 
            className="flex-1"
            initial="hidden"
            whileInView="visible"
            viewport={{ once: false, amount: 0.3 }}
            variants={staggerContainer}
          >
            <motion.h2 className={styles.sectionTitle} style={{ textAlign: "left" }} variants={fadeInUp}>Built to Protect Your Account</motion.h2>
            <motion.p className={styles.benefitDesc} style={{ marginBottom: "2.5rem", fontSize: "1.2rem" }} variants={fadeInUp}>
              Peakpay uses multiple verification and authorisation steps to help keep your account and transactions secure.
            </motion.p>
            <ul className="space-y-6">
              {[
                { icon: <ShieldCheck size={24} />, text: "Secure password creation & security questions" },
                { icon: <UserCheck size={24} />, text: "BVN verification & Liveness check" },
                { icon: <CreditCard size={24} />, text: "Transaction PIN & secure repayment processing" }
              ].map((item, i) => (
                <motion.li key={i} variants={fadeInUp} className="flex items-center gap-4 text-[var(--text-color)] font-medium text-lg">
                  <div className="p-3 rounded-xl bg-[#00a67e]/10 text-[#00a67e]">{item.icon}</div>
                  {item.text}
                </motion.li>
              ))}
            </ul>
          </motion.div>
          <motion.div 
            className="flex-1 flex justify-center"
            initial="hidden"
            whileInView="visible"
            viewport={{ once: false, amount: 0.3 }}
            variants={scaleIn}
          >
             <motion.div
              whileHover={{ scale: 1.1, rotateY: 0, rotateX: 0 }}
              style={{ width: "100%", maxWidth: "500px", margin: 0, transform: "rotateY(-5deg) rotateX(5deg)" }}
            >
              <Lottie 
                src={securityAnimationData} 
                autoplay={true}
                loop={true} 
                className={styles.heroImage} 
              />
            </motion.div>
          </motion.div>
        </div>
      </section>

      {/* FAQs */}
      <section id="faqs" className={styles.section}>
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: false }}
          variants={fadeInUp}
        >
          <h2 className={styles.sectionTitle}>Frequently Asked Questions</h2>
        </motion.div>
        
        <motion.div 
          className={styles.faqContainer}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: false, amount: 0.1 }}
          variants={staggerContainer}
        >
          {FAQs.map((faq, i) => (
            <motion.div key={i} className={styles.faqItem} variants={fadeInUp}>
              <div 
                className={styles.faqQuestion}
                onClick={() => setOpenFaq(openFaq === i ? null : i)}
              >
                {faq.q}
                <motion.div animate={{ rotate: openFaq === i ? 180 : 0 }}>
                  <ChevronDown size={24} className={openFaq === i ? "text-[#ff8a00]" : "text-[var(--text-muted)]"} />
                </motion.div>
              </div>
              <AnimatePresence>
                {openFaq === i && (
                  <motion.div 
                    initial={{ height: 0, opacity: 0, marginTop: 0 }}
                    animate={{ height: "auto", opacity: 1, marginTop: 16 }}
                    exit={{ height: 0, opacity: 0, marginTop: 0 }}
                    transition={{ duration: 0.3 }}
                    className={styles.faqAnswer}
                  >
                    {faq.a}
                  </motion.div>
                )}
              </AnimatePresence>
            </motion.div>
          ))}
        </motion.div>
      </section>

      {/* Pre-Footer CTA */}
      <section className={styles.preFooter}>
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: false }}
          variants={fadeInUp}
        >
          <h2 className={styles.sectionTitle} style={{ fontSize: "4rem" }}>Ready to Take Control?</h2>
          <p className={styles.sectionSubtitle} style={{ fontSize: "1.4rem", maxWidth: "700px" }}>Create your Peakpay account, complete your profile and discover the loan offer available to you today.</p>
          <div className="flex justify-center gap-6 mt-8">
            <Link href="/signup" className={styles.getStartedBtn} style={{ padding: "1.25rem 3.5rem", fontSize: "1.25rem" }}>Get Started Now</Link>
          </div>
        </motion.div>
      </section>

      {/* Structured Footer */}
      <footer className={styles.footer}>
        <div className={styles.footerGrid}>
          <div>
            <div className="mb-6">
              {theme === 'dark' ? <WhiteLogo /> : <Logo variant="orange" />}
            </div>
            <p className={styles.benefitDesc} style={{ maxWidth: "300px" }}>
              Simple financial solutions designed to help you access, manage and repay personal loans with confidence.
            </p>
          </div>
          
          <div>
            <h4 className={styles.footerTitle}>Product</h4>
            <div className={styles.footerLinks}>
              <a href="#how-it-works">How It Works</a>
              <a href="#benefits">Why Peakpay</a>
              <Link href="/login">Log In</Link>
              <Link href="/signup">Get Started</Link>
            </div>
          </div>

          <div>
            <h4 className={styles.footerTitle}>Support</h4>
            <div className={styles.footerLinks}>
              <a href="#faqs">FAQs</a>
              <a href="#">Contact Us</a>
              <a href="#">Help Center</a>
            </div>
          </div>

          <div>
            <h4 className={styles.footerTitle}>Legal</h4>
            <div className={styles.footerLinks}>
              <Link href="/privacy">Privacy Policy</Link>
              <Link href="/terms">Terms and Conditions</Link>
            </div>
          </div>
        </div>

        <p className={styles.disclaimer}>
          Disclaimer: Loan approval, eligible amount, interest rate, repayment period and other terms are subject to verification, assessment and applicable terms and conditions. Review your loan offer carefully before accepting.
        </p>
      </footer>
    </div>
  );
}
