import React, { useState, useEffect } from 'react';
import { Home, GraduationCap, MessageSquare, ShoppingBag, Moon, Sun, Mail, Calendar, MapPin, Award } from 'lucide-react';
import StudentPortal from './components/StudentPortal';
import AcademicChatbot from './components/AcademicChatbot';
import CloudEcommerce from './components/CloudEcommerce';
import SkillsGraph from './components/SkillsGraph';
import ContactForm from './components/ContactForm';

const GithubIcon = ({ size = 16 }) => (
  <svg xmlns="http://www.w3.org/2000/svg" width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M15 22v-4a4.8 4.8 0 0 0-1-3.5c3 0 6-2 6-5.5.08-1.25-.27-2.48-1-3.5.28-1.15.28-2.35 0-3.5 0 0-1 0-3 1.5-2.64-.5-5.36-.5-8 0C6 2 5 2 5 2c-.3 1.15-.3 2.35 0 3.5A5.403 5.403 0 0 0 4 9c0 3.5 3 5.5 6 5.5-.39.49-.68 1.05-.85 1.65-.17.6-.22 1.23-.15 1.85v4" />
    <path d="M9 18c-4.51 2-5-2-7-2" />
  </svg>
);

const LinkedinIcon = ({ size = 16 }) => (
  <svg xmlns="http://www.w3.org/2000/svg" width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z" />
    <rect width="4" height="12" x="2" y="9" rx="1" />
    <circle cx="4" cy="4" r="2" />
  </svg>
);

export default function App() {
  const [activeTab, setActiveTab] = useState('home');
  const [theme, setTheme] = useState('dark');

  // Sync theme to document element
  useEffect(() => {
    document.documentElement.setAttribute('data-theme', theme);
  }, [theme]);

  const toggleTheme = () => {
    setTheme(prev => prev === 'dark' ? 'light' : 'dark');
  };

  const renderContent = () => {
    switch (activeTab) {
      case 'portal':
        return <StudentPortal />;
      case 'chatbot':
        return <AcademicChatbot />;
      case 'ecommerce':
        return <CloudEcommerce />;
      case 'contact':
        return <ContactForm />;
      case 'home':
      default:
        return renderHome();
    }
  };

  const renderHome = () => (
    <div className="home-view-container animate-fade-in">
      <div className="home-hero-section glass-card">
        <div className="hero-content">
          <span className="hero-badge">Academic Excellence Hub</span>
          <h1>Moses Mugi</h1>
          <p>
            An interactive repository demonstrating advanced competencies in **modern web development**, **cloud-hosted infrastructures**, and **AI application integrations**. Explore the live sandbox portals below.
          </p>
          <div className="hero-buttons">
            <button className="btn btn-primary" onClick={() => setActiveTab('portal')}>
              <GraduationCap size={16} /> Launch Student Portal
            </button>
            <button className="btn btn-secondary" onClick={() => setActiveTab('chatbot')} style={{ marginLeft: '12px' }}>
              <MessageSquare size={16} /> Launch AI Chatbot
            </button>
          </div>
        </div>
      </div>

      {/* Project Card Showcase */}
      <div className="showcase-cards-grid">
        {/* Project 1 */}
        <div className="glass-card showcase-card border-inventory" onClick={() => setActiveTab('portal')}>
          <div className="showcase-card-header">
            <GraduationCap className="text-inventory" size={24} />
            <span className="showcase-year">Web Dev</span>
          </div>
          <h3>Student Portal System</h3>
          <p>Designed and developed a student record database interface. Features live SQL query logs tracking active course enrollments and grade updates.</p>
          <div className="showcase-badges">
            <span className="tech-badge">React</span>
            <span className="tech-badge">SQL</span>
            <span className="tech-badge">Database Design</span>
            <span className="tech-badge">State Modularity</span>
          </div>
        </div>

        {/* Project 2 */}
        <div className="glass-card showcase-card border-security" onClick={() => setActiveTab('chatbot')}>
          <div className="showcase-card-header">
            <MessageSquare className="text-security" size={24} />
            <span className="showcase-year">AI Integration</span>
          </div>
          <h3>Academic Queries Chatbot</h3>
          <p>Built a responsive AI agent assisting with technical, syllabus, and course catalog questions, powered by structured natural language logic.</p>
          <div className="showcase-badges">
            <span className="tech-badge">NLP</span>
            <span className="tech-badge">LLM Prompting</span>
            <span className="tech-badge">AI Integration</span>
            <span className="tech-badge">Context RAG</span>
          </div>
        </div>

        {/* Project 3 */}
        <div className="glass-card showcase-card border-analytics" onClick={() => setActiveTab('ecommerce')}>
          <div className="showcase-card-header">
            <ShoppingBag className="text-analytics" size={24} />
            <span className="showcase-year">Cloud Computing</span>
          </div>
          <h3>Cloud E-Commerce Platform</h3>
          <p>Mock serverless-hosted retail shop showing live checkout simulations, Lambda compute latency metrics, and CDN edge distribution traffic.</p>
          <div className="showcase-badges">
            <span className="tech-badge">AWS Lambda</span>
            <span className="tech-badge">CDN Edge</span>
            <span className="tech-badge">Cloud Analytics</span>
            <span className="tech-badge">E-Commerce</span>
          </div>
        </div>
      </div>

      {/* Skills Node Graph Section */}
      <SkillsGraph />

      {/* Education & Bio Section */}
      <div className="profile-details-grid">
        <div className="glass-card bio-details-card">
          <h3>Academic Foundations</h3>
          <p className="bio-desc">
            Focusing on scalable software design patterns, serverless cloud hosting benefits, and applying Large Language Models to support educational portal operations.
          </p>
          <div className="academic-meta-list">
            <div className="meta-row">
              <Calendar size={14} className="text-muted" />
              <span><strong>Active Focus:</strong> Serverless latency minimization, RAG portal interfaces</span>
            </div>
            <div className="meta-row">
              <MapPin size={14} className="text-muted" />
              <span><strong>Location:</strong> Nairobi, Kenya / Remote</span>
            </div>
          </div>
        </div>

        <div className="glass-card education-card">
          <h3>Education & Certifications</h3>
          <div className="edu-timeline">
            <div className="edu-item">
              <GraduationCap size={18} className="edu-icon" />
              <div className="edu-details">
                <h4>Bachelor of Science in Information Technology</h4>
                <p className="edu-school">State Technical University (2022 - 2028)</p>
                <p className="edu-notes">Focus on Cloud Engineering & Web Technologies. GPA: 3.88/4.0</p>
              </div>
            </div>
            <div className="edu-item">
              <Award size={18} className="edu-icon" />
              <div className="edu-details">
                <h4>AWS Certified Cloud Practitioner</h4>
                <p className="edu-school">Amazon Web Services Credential</p>
                <p className="edu-notes">Validating core serverless computing architectures and security compliance models.</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );

  return (
    <div className={`app-container tab-${activeTab}`}>
      <div className="bg-blob blob-1"></div>
      <div className="bg-blob blob-2"></div>
      <div className="bg-blob blob-3"></div>
      {/* Sidebar Navigation */}
      <aside className="sidebar">
        <div className="profile-card">
          <div className="profile-avatar-container">
            <img src="/profile.png" className="profile-avatar-img" alt="Moses Mugi" />
          </div>
          <h2 className="profile-name">Moses Mugi</h2>
          <p className="profile-title">Web & Cloud Engineer</p>
        </div>

        <nav style={{ flex: 1 }}>
          <ul className="nav-menu">
            <li 
              className={`nav-item ${activeTab === 'home' ? 'active' : ''}`}
              onClick={() => setActiveTab('home')}
            >
              <Home size={18} />
              <span className="nav-text">Home Dashboard</span>
            </li>
            <li 
              className={`nav-item ${activeTab === 'portal' ? 'active active-inventory' : ''}`}
              onClick={() => setActiveTab('portal')}
            >
              <GraduationCap size={18} />
              <span className="nav-text">Student Portal</span>
            </li>
            <li 
              className={`nav-item ${activeTab === 'chatbot' ? 'active active-security' : ''}`}
              onClick={() => setActiveTab('chatbot')}
            >
              <MessageSquare size={18} />
              <span className="nav-text">Academic Chatbot</span>
            </li>
            <li 
              className={`nav-item ${activeTab === 'ecommerce' ? 'active active-analytics' : ''}`}
              onClick={() => setActiveTab('ecommerce')}
            >
              <ShoppingBag size={18} />
              <span className="nav-text">E-Commerce Shop</span>
            </li>
            <li 
              className={`nav-item ${activeTab === 'contact' ? 'active active-inventory' : ''}`}
              onClick={() => setActiveTab('contact')}
            >
              <Mail size={18} />
              <span className="nav-text">Contact Me</span>
            </li>
          </ul>
        </nav>

        <div className="sidebar-footer">
          <div className="social-links">
            <a href="https://github.com/Thee-Beloved" target="_blank" rel="noreferrer" title="GitHub Profile"><GithubIcon size={16} /></a>
            <a href="https://www.linkedin.com/in/moses-mugi-52a553355" target="_blank" rel="noreferrer" title="LinkedIn Profile"><LinkedinIcon size={16} /></a>
            <a href="mailto:mugim4325@gmail.com" title="Send Email"><Mail size={16} /></a>
          </div>
          <button className="theme-toggle-btn" onClick={toggleTheme} title="Toggle Theme">
            {theme === 'dark' ? <Sun size={16} /> : <Moon size={16} />}
            <span className="theme-toggle-text">{theme === 'dark' ? 'Light Mode' : 'Dark Mode'}</span>
          </button>
        </div>
      </aside>

      {/* Main Page Display Frame */}
      <main className="main-content">
        {renderContent()}
      </main>
    </div>
  );
}
