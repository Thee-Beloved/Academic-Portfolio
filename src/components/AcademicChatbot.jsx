import React, { useState, useEffect, useRef } from 'react';
import { Bot, User, Send, RefreshCw, Terminal, Play, ShieldAlert, ShieldCheck, Sparkles, AlertTriangle } from 'lucide-react';
import { chatbotScenarios, pentestScript, vulnerabilityReport } from '../data/mockData';
import './AcademicChatbot.css';

export default function AcademicChatbot() {
  const [activeMode, setActiveMode] = useState('chatbot'); // 'chatbot' or 'security'

  // Chatbot State
  const [messages, setMessages] = useState([
    { sender: 'bot', text: "Hello! I am MugiAI, your academic assistant. Ask me questions about course prerequisites, algorithm complexities, or abstract outlines!", timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }) }
  ]);
  const [userInput, setUserInput] = useState('');
  const [isBotTyping, setIsBotTyping] = useState(false);
  const chatEndRef = useRef(null);

  // Security Console State
  const [terminalLines, setTerminalLines] = useState([
    { type: "system", text: "Kali GNU/Linux Rolling - Academic Pentest Simulator v1.0.4" },
    { type: "system", text: "Type or click 'Start Simulation' to execute target exploitation." }
  ]);
  const [isConsoleRunning, setIsConsoleRunning] = useState(false);
  const [scriptIndex, setScriptIndex] = useState(0);
  const [selectedVuln, setSelectedVuln] = useState(null);
  const terminalEndRef = useRef(null);

  // Scroll locks
  useEffect(() => {
    if (activeMode === 'chatbot' && chatEndRef.current) {
      chatEndRef.current.scrollIntoView({ behavior: 'smooth' });
    }
  }, [messages, isBotTyping, activeMode]);

  useEffect(() => {
    if (activeMode === 'security' && terminalEndRef.current) {
      terminalEndRef.current.scrollIntoView({ behavior: 'smooth' });
    }
  }, [terminalLines, isConsoleRunning, activeMode]);

  // Chatbot logic
  const handleSendMessage = (text) => {
    if (!text.trim()) return;

    const userMsg = {
      sender: 'user',
      text: text,
      timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
    };
    setMessages(prev => [...prev, userMsg]);
    setUserInput('');
    setIsBotTyping(true);

    setTimeout(() => {
      let responseText = "";
      const query = text.toLowerCase();

      if (query.includes('prerequisite') || query.includes('cs-305') || query.includes('cloud')) {
        responseText = chatbotScenarios.find(s => s.id === 'query-1').response;
      } else if (query.includes('big-o') || query.includes('complexity') || query.includes('o(')) {
        responseText = chatbotScenarios.find(s => s.id === 'query-2').response;
      } else if (query.includes('abstract') || query.includes('research') || query.includes('outline')) {
        responseText = chatbotScenarios.find(s => s.id === 'query-3').response;
      } else {
        responseText = `Hi Moses! That's a great question. As an academic assistant, I am currently configured to help with CS topics. \n\nTry clicking one of the quick prompts (e.g. **Big-O Complexity** or **Course Prerequisites**) to explore my knowledge base!`;
      }

      const botMsg = {
        sender: 'bot',
        text: responseText,
        timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
      };

      setMessages(prev => [...prev, botMsg]);
      setIsBotTyping(false);
    }, 1200);
  };

  const handleResetChat = () => {
    setMessages([
      { sender: 'bot', text: "Hello! I am MugiAI, your academic assistant. Ask me questions about course prerequisites, algorithm complexities, or abstract outlines!", timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }) }
    ]);
    setIsBotTyping(false);
  };

  // Cybersecurity Console logic
  const runNextScriptLine = () => {
    if (scriptIndex >= pentestScript.length) {
      setIsConsoleRunning(false);
      return;
    }

    const currentLine = pentestScript[scriptIndex];
    setTerminalLines(prev => [...prev, currentLine]);
    setScriptIndex(prev => prev + 1);

    let delay = 1000;
    if (currentLine.type === 'input') delay = 1500;
    else if (currentLine.type === 'status') delay = 1200;
    else delay = 400;

    setTimeout(() => {
      runNextScriptLine();
    }, delay);
  };

  useEffect(() => {
    if (isConsoleRunning) {
      runNextScriptLine();
    }
  }, [isConsoleRunning, scriptIndex]);

  const handleStartSimulation = () => {
    if (isConsoleRunning) return;
    setTerminalLines([
      { type: "system", text: "Resetting target state... Target up on 192.168.1.50" },
      { type: "system", text: "Initializing exploit payload harness..." }
    ]);
    setScriptIndex(0);
    setIsConsoleRunning(true);
  };

  const handleResetConsole = () => {
    setIsConsoleRunning(false);
    setScriptIndex(0);
    setTerminalLines([
      { type: "system", text: "Terminal reset. Ready for penetration testing simulation run." }
    ]);
  };

  const getSeverityBadgeClass = (severity) => {
    switch (severity) {
      case 'CRITICAL': return 'sev-critical';
      case 'HIGH': return 'sev-high';
      case 'MEDIUM': return 'sev-medium';
      default: return 'sev-low';
    }
  };

  return (
    <div className="chatbot-demo-container animate-fade-in">
      <div className="page-header">
        <h2 className="page-title text-security-title">AI Integration & Cybersecurity</h2>
        <p className="page-subtitle">A collaborative platform featuring natural language model handlers and simulated network audit terminals.</p>
      </div>

      {/* Toggles */}
      <div className="cloud-tabs-row" style={{ marginBottom: '24px' }}>
        <button className={`cloud-tab ${activeMode === 'chatbot' ? 'active-cloud-tab' : ''}`} onClick={() => setActiveMode('chatbot')}>
          <Bot size={16} /> AI Integration: MugiAI Advisor
        </button>
        <button className={`cloud-tab ${activeMode === 'security' ? 'active-cloud-tab' : ''}`} onClick={() => setActiveMode('security')}>
          <Terminal size={16} /> Cybersecurity: Pentesting Terminal
        </button>
      </div>

      {/* KPI Stats */}
      {activeMode === 'chatbot' ? (
        <div className="stat-grid">
          <div className="glass-card stat-card border-security">
            <div className="stat-label">AI Processing Core</div>
            <div className="stat-value">Regex-Intent Parser</div>
            <div className="stat-desc">Contextual prompting rules</div>
          </div>
          <div className="glass-card stat-card border-security">
            <div className="stat-label">FAQ Databases</div>
            <div className="stat-value">CS Curriculum</div>
            <div className="stat-desc">Structured catalog links</div>
          </div>
          <div className="glass-card stat-card border-security">
            <div className="stat-label">Context Size</div>
            <div className="stat-value">4,096 Tokens</div>
            <div className="stat-desc">Simulated RAG window</div>
          </div>
          <div className="glass-card stat-card border-security-success">
            <div className="stat-label">System State</div>
            <div className="stat-value text-success">Active</div>
            <div className="stat-desc">Ready to process speech</div>
          </div>
        </div>
      ) : (
        <div className="stat-grid">
          <div className="glass-card stat-card border-security">
            <div className="stat-label">Target Subnet</div>
            <div className="stat-value">192.168.1.50</div>
            <div className="stat-desc">Subnet: mock-target.local</div>
          </div>
          <div className="glass-card stat-card border-security-danger">
            <div className="stat-label">Vulnerabilities Detected</div>
            <div className="stat-value text-danger">3 Active</div>
            <div className="stat-desc">2 Critical, 1 High CVSS</div>
          </div>
          <div className="glass-card stat-card border-security">
            <div className="stat-label">Remediations Mapped</div>
            <div className="stat-value">OWASP Guidelines</div>
            <div className="stat-desc">Security mitigation steps</div>
          </div>
          <div className="glass-card stat-card border-security-success">
            <div className="stat-label">Remediation Status</div>
            <div className="stat-value text-success">Cleaned / Patched</div>
            <div className="stat-desc">Simulated patching verified</div>
          </div>
        </div>
      )}

      {/* Main Grid View */}
      {activeMode === 'chatbot' ? (
        <div className="chatbot-grid-layout animate-fade-in">
          {/* Chat Bubble Window */}
          <div className="glass-card chat-card-container">
            <div className="chat-card-header">
              <div className="bot-profile-header">
                <div className="bot-header-avatar"><Bot size={18} /></div>
                <div>
                  <h4 style={{ color: 'var(--text-primary)' }}>MugiAI Advisor</h4>
                  <span className="online-badge">● NLP Context Active</span>
                </div>
              </div>
              <button className="chat-reset-btn" onClick={handleResetChat} title="Clear Chat History">
                <RefreshCw size={14} />
              </button>
            </div>

            <div className="chat-messages-container">
              {messages.map((msg, index) => (
                <div key={index} className={`chat-message-bubble ${msg.sender === 'user' ? 'message-user' : 'message-bot'}`}>
                  <div className="message-avatar">
                    {msg.sender === 'user' ? <User size={14} /> : <Bot size={14} />}
                  </div>
                  <div className="message-bubble-content">
                    <div className="message-text">
                      {msg.text.split('\n').map((line, lIdx) => (
                        <p key={lIdx} style={{ marginBottom: line.trim() === '' ? '12px' : '4px' }}>
                          {line}
                        </p>
                      ))}
                    </div>
                    <span className="message-time">{msg.timestamp}</span>
                  </div>
                </div>
              ))}
              {isBotTyping && (
                <div className="chat-message-bubble message-bot">
                  <div className="message-avatar"><Bot size={14} /></div>
                  <div className="message-bubble-content">
                    <div className="typing-indicator">
                      <span></span><span></span><span></span>
                    </div>
                  </div>
                </div>
              )}
              <div ref={chatEndRef}></div>
            </div>

            <div className="chat-input-bar">
              <input 
                type="text" 
                placeholder="Ask about prerequisites, outlines, or time complexities..." 
                value={userInput}
                onChange={e => setUserInput(e.target.value)}
                onKeyDown={e => e.key === 'Enter' && handleSendMessage(userInput)}
              />
              <button className="chat-send-btn" onClick={() => handleSendMessage(userInput)}>
                <Send size={14} />
              </button>
            </div>
          </div>

          {/* Quick Prompt library */}
          <div className="glass-card prompt-library-card">
            <div className="section-title-row" style={{ marginBottom: '16px' }}>
              <h3>
                <Sparkles size={16} className="text-security" /> Quick Prompts Library
              </h3>
            </div>
            <p className="prompt-library-desc">Click a syllabus query to watch MugiAI answer utilizing its contextual datasets.</p>
            <div className="prompt-buttons-list">
              {chatbotScenarios.map(sc => (
                <button key={sc.id} className="prompt-library-btn" onClick={() => handleSendMessage(sc.prompt)}>
                  <div className="prompt-btn-title">{sc.label}</div>
                  <div className="prompt-btn-text">"{sc.prompt}"</div>
                </button>
              ))}
            </div>
          </div>
        </div>
      ) : (
        <div className="pentest-grid-layout animate-fade-in">
          {/* Linux Terminal Console */}
          <div className="glass-card terminal-card">
            <div className="terminal-header">
              <div className="terminal-dots">
                <span className="dot dot-red"></span>
                <span className="dot dot-yellow"></span>
                <span className="dot dot-green"></span>
              </div>
              <div className="terminal-title">
                <Terminal size={14} /> root@kali: /workspace/exploit_kit
              </div>
              <div className="terminal-actions">
                <button className="terminal-btn-icon" onClick={handleResetConsole} disabled={isConsoleRunning} title="Reset Terminal">
                  <RefreshCw size={14} />
                </button>
              </div>
            </div>
            <div className="terminal-body" style={{ height: '350px' }}>
              <div className="terminal-screen-overlay"></div>
              <div className="terminal-content">
                {terminalLines.map((line, idx) => {
                  if (line.type === 'input') {
                    return (
                      <div key={idx} className="terminal-line line-input">
                        <span className="terminal-prompt">kali@root:~#</span> {line.text}
                      </div>
                    );
                  } else if (line.type === 'status') {
                    return (
                      <div key={idx} className="terminal-line line-status">
                        {line.text}
                      </div>
                    );
                  } else if (line.type === 'system') {
                    return (
                      <div key={idx} className="terminal-line line-system">
                        [*] {line.text}
                      </div>
                    );
                  } else {
                    return (
                      <pre key={idx} className="terminal-line line-output">
                        {line.text}
                      </pre>
                    );
                  }
                })}
                {isConsoleRunning && (
                  <div className="terminal-line terminal-loader">
                    <span className="terminal-prompt">kali@root:~#</span>
                    <span className="terminal-typing-cursor">█</span>
                  </div>
                )}
                <div ref={terminalEndRef}></div>
              </div>
            </div>
            <div className="terminal-footer">
              <button className="btn btn-primary btn-security-theme" onClick={handleStartSimulation} disabled={isConsoleRunning}>
                <Play size={16} /> {isConsoleRunning ? "Exploiting Target..." : "Start Penetration Simulation"}
              </button>
              <div className="terminal-helper-text">
                Simulates target scanning (`nmap`) and payload executions (`metasploit`).
              </div>
            </div>
          </div>

          {/* Audit board */}
          <div className="glass-card audit-report-card" style={{ padding: '20px' }}>
            <div className="section-title-row">
              <h3>Vulnerability Audit Board</h3>
              <button className="btn btn-secondary btn-small" onClick={() => alert("Audit sheet downloaded (Simulated)")}>Export PDF</button>
            </div>
            <p className="audit-subtitle">Identified vulnerabilities mapped to OWASP risk mitigation benchmarks.</p>
            <div className="vuln-cards-list">
              {vulnerabilityReport.vulnerabilities.map(vuln => (
                <div key={vuln.id} className={`vuln-card ${selectedVuln?.id === vuln.id ? 'active-vuln-card' : ''}`} onClick={() => setSelectedVuln(selectedVuln?.id === vuln.id ? null : vuln)}>
                  <div className="vuln-card-header">
                    <span className={`vuln-severity-badge ${getSeverityBadgeClass(vuln.severity)}`}>{vuln.severity}</span>
                    <span className="vuln-id">{vuln.id}</span>
                  </div>
                  <h4 className="vuln-card-title" style={{ fontSize: '0.88rem' }}>{vuln.title}</h4>
                  {selectedVuln?.id === vuln.id && (
                    <div className="vuln-detail-drawer animate-fade-in" style={{ fontSize: '0.8rem' }}>
                      <p>{vuln.description}</p>
                      <div className="section-remediation" style={{ marginTop: '8px' }}>
                        <h5>Remediation</h5>
                        <p>{vuln.remediation}</p>
                      </div>
                    </div>
                  )}
                </div>
              ))}
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
