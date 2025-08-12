'use client';

import { useEffect } from 'react';
import styles from './LandingPage.module.css';
import { useRouter } from 'next/navigation';

const LandingPage = () => {
  const router = useRouter();
  useEffect(() => {
    // Add smooth scrolling for navigation links
    const handleSmoothScroll = (e: any) => {
      if (e.target.getAttribute('href')?.startsWith('#')) {
        e.preventDefault();
        const target = document.querySelector(e.target.getAttribute('href'));
        if (target) {
          target.scrollIntoView({
            behavior: 'smooth',
            block: 'start'
          });
        }
      }
    };

    document.addEventListener('click', handleSmoothScroll);

    // Add scroll effect for header
    const handleScroll = () => {
      const header = document.querySelector('header');
      if (header) {
        if (window.scrollY > 100) {
          header.style.background = 'rgba(0, 0, 0, 0.3)';
        } else {
          header.style.background = 'rgba(255, 255, 255, 0.1)';
        }
      }
    };

    window.addEventListener('scroll', handleScroll);

    // Animate stats on scroll
    const animateStats = () => {
      const stats = document.querySelectorAll(`.${styles.statItem} h3`);
      const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
          if (entry.isIntersecting) {
            const target = entry.target;
            const finalValue = target.textContent;
            let currentValue = 0;
            const increment = parseFloat(finalValue.replace(/[^0-9.]/g, '')) / 50;
            
            const timer = setInterval(() => {
              if (currentValue < parseFloat(finalValue.replace(/[^0-9.]/g, ''))) {
                currentValue += increment;
                if (finalValue.includes('M')) {
                  target.textContent = Math.floor(currentValue) + 'M+';
                } else if (finalValue.includes('B')) {
                  target.textContent = Math.floor(currentValue) + 'B+';
                } else if (finalValue.includes('%')) {
                  target.textContent = currentValue.toFixed(1) + '%';
                } else {
                  target.textContent = Math.floor(currentValue) + '+';
                }
              } else {
                target.textContent = finalValue;
                clearInterval(timer);
              }
            }, 50);
            
            observer.unobserve(target);
          }
        });
      });
      
      stats.forEach(stat => observer.observe(stat));
    };

    animateStats();

    return () => {
      document.removeEventListener('click', handleSmoothScroll);
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);

  return (
    <div className={styles.landingPage}>
      <div className={styles.bgElements}>
        <div className={`${styles.floatingShape} ${styles.shape1}`}></div>
        <div className={`${styles.floatingShape} ${styles.shape2}`}></div>
        <div className={`${styles.floatingShape} ${styles.shape3}`}></div>
      </div>

      <header className={styles.header}>
        <nav className={styles.container}>
          <div onClick={(e) => {
            e.preventDefault();
            router.push("/");
          }} className={styles.logo}>ChatFlow</div>
          <ul className={styles.navLinks}>
            <li><a href="#features">Features</a></li>
            <li><a href="#pricing">Pricing</a></li>
            <li><a href="#about">About</a></li>
            <li><a href="#contact">Contact</a></li>
          </ul>
          <a href="/signup" className={styles.ctaButton}>Get Started</a>
        </nav>
      </header>

      <section className={styles.hero}>
        <div className={styles.container}>
          <h1>Connect Like Never Before</h1>
          <p>Experience seamless communication with our next-generation chat platform. Built with cutting-edge technology for the modern world.</p>
          <div className={styles.heroButtons}>
            <a href="/signin" className={styles.btnPrimary}>Start Chatting</a>
          </div>
        </div>
      </section>

      <section className={styles.features} id="features">
        <div className={styles.container}>
          <h2>Why Choose ChatFlow?</h2>
          <div className={styles.featuresGrid}>
            <div className={styles.featureCard}>
              <div className={styles.featureIcon}>⚡</div>
              <h3>Lightning Fast</h3>
              <p>Experience real-time messaging with zero lag. Our optimized infrastructure ensures your messages are delivered instantly.</p>
            </div>
            <div className={styles.featureCard}>
              <div className={styles.featureIcon}>🔒</div>
              <h3>Ultra Secure</h3>
              <p>End-to-end encryption keeps your conversations private. Your data is protected with military-grade security.</p>
            </div>
            <div className={styles.featureCard}>
              <div className={styles.featureIcon}>🌍</div>
              <h3>Global Reach</h3>
              <p>Connect with anyone, anywhere in the world. Our platform supports multiple languages and time zones.</p>
            </div>
            <div className={styles.featureCard}>
              <div className={styles.featureIcon}>🎨</div>
              <h3>Beautiful Design</h3>
              <p>Enjoy a clean, modern interface that&apos;s both beautiful and intuitive. Customizable themes to match your style.</p>
            </div>
            <div className={styles.featureCard}>
              <div className={styles.featureIcon}>📱</div>
              <h3>Cross Platform</h3>
              <p>Seamlessly sync across all your devices. Start a conversation on mobile and continue on desktop.</p>
            </div>
            <div className={styles.featureCard}>
              <div className={styles.featureIcon}>🤖</div>
              <h3>Smart Features</h3>
              <p>AI-powered features like smart replies, message translation, and intelligent notifications enhance your experience.</p>
            </div>
          </div>
        </div>
      </section>

      <section className={styles.stats}>
        <div className={styles.container}>
          <div className={styles.statsGrid}>
            <div className={styles.statItem}>
              <h3>10M+</h3>
              <p>Active Users</p>
            </div>
            <div className={styles.statItem}>
              <h3>50B+</h3>
              <p>Messages Sent</p>
            </div>
            <div className={styles.statItem}>
              <h3>99.9%</h3>
              <p>Uptime</p>
            </div>
            <div className={styles.statItem}>
              <h3>150+</h3>
              <p>Countries</p>
            </div>
          </div>
        </div>
      </section>

      <footer className={styles.footer}>
        <div className={styles.container}>
          <div className={styles.footerContent}>
            <div className={styles.footerSection}>
              <h4>Product</h4>
              <a href="#">Features</a>
              <a href="#">Pricing</a>
              <a href="#">API</a>
              <a href="#">Documentation</a>
            </div>
            <div className={styles.footerSection}>
              <h4>Company</h4>
              <a href="#">About Us</a>
              <a href="#">Careers</a>
              <a href="#">Blog</a>
              <a href="#">Press</a>
            </div>
            <div className={styles.footerSection}>
              <h4>Support</h4>
              <a href="#">Help Center</a>
              <a href="#">Contact Us</a>
              <a href="#">Community</a>
              <a href="#">Status</a>
            </div>
            <div className={styles.footerSection}>
              <h4>Legal</h4>
              <a href="#">Privacy Policy</a>
              <a href="#">Terms of Service</a>
              <a href="#">Cookie Policy</a>
              <a href="#">GDPR</a>
            </div>
          </div>
          <div className={styles.footerBottom}>
            <p>&copy; 2025 ChatFlow. All rights reserved. Built with ❤️ and Next.js</p>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default LandingPage;