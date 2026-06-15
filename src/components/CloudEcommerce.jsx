import React, { useState } from 'react';
import { ShoppingCart, Server, BarChart2, CloudLightning, Activity, FileSpreadsheet, LineChart, Terminal, Play, Filter, RefreshCw } from 'lucide-react';
import { initialProducts, cloudDeploymentStats, retailDataset, retailMetrics, analyticsPlaygroundCode } from '../data/mockData';
import './CloudEcommerce.css';

export default function CloudEcommerce() {
  const [activeMode, setActiveMode] = useState('cloud'); // 'cloud' or 'datascience'

  // E-commerce State
  const [products, setProducts] = useState(initialProducts);
  const [cart, setCart] = useState([]);
  const [activeSubTab, setActiveSubTab] = useState('store');
  const [lambdaLogs, setLambdaLogs] = useState([
    { timestamp: new Date().toLocaleTimeString(), message: "AWS API Gateway initialized routing rules for api.mugi.cloud." },
    { timestamp: new Date().toLocaleTimeString(), message: "Cloudflare CDN Edge caching activated for Nairobi region cache nodes." }
  ]);
  const [isPurchasing, setIsPurchasing] = useState(false);

  // Data Science State
  const [activePlayground, setActivePlayground] = useState(analyticsPlaygroundCode[0]);
  const [executionOutput, setExecutionOutput] = useState(null);
  const [isExecuting, setIsExecuting] = useState(false);
  const [retailFilter, setRetailFilter] = useState('All');
  const [regionFilter, setRegionFilter] = useState('All');

  const logLambda = (message) => {
    setLambdaLogs(prev => [{ timestamp: new Date().toLocaleTimeString(), message }, ...prev].slice(0, 12));
  };

  // E-commerce logic
  const handleAddToCart = (product) => {
    if (product.stock <= 0) return;
    setCart(prev => {
      const existing = prev.find(item => item.id === product.id);
      if (existing) {
        return prev.map(item => item.id === product.id ? { ...item, qty: item.qty + 1 } : item);
      }
      return [...prev, { ...product, qty: 1 }];
    });
    setProducts(prev => prev.map(p => {
      if (p.id === product.id) {
        logLambda(`DynamoDB update: Locked 1 unit of product_id #${p.id} in shopping session.`);
        return { ...p, stock: p.stock - 1 };
      }
      return p;
    }));
  };

  const handleCheckout = () => {
    if (cart.length === 0) return;
    setIsPurchasing(true);
    logLambda(`API Trigger: POST https://api.mugi.cloud/v1/checkout - Executing checkout payload.`);
    setTimeout(() => {
      logLambda(`AWS Lambda Invoked: function 'checkout-handler' (Cold Start: 32ms)`);
      logLambda(`DynamoDB transaction: committed order payload. Generated TxID: txn_cf839a9`);
      logLambda(`SES Email Service: Queued confirmation letter receipt to customer.`);
      setCart([]);
      setIsPurchasing(false);
      alert("Purchase successful! Serverless database transaction completed on AWS cloud.");
    }, 1500);
  };

  const resetStore = () => {
    setProducts(initialProducts);
    setCart([]);
    logLambda(`Cloud Database reset: Re-seeded DynamoDB products table to defaults.`);
  };

  const totalCartCost = cart.reduce((sum, item) => sum + (item.price * item.qty), 0);

  // Data Science logic
  const executeCode = () => {
    setIsExecuting(true);
    setExecutionOutput(null);
    setTimeout(() => {
      setIsExecuting(false);
      setExecutionOutput(activePlayground.result);
    }, 900);
  };

  const handleSnippetChange = (id) => {
    const selected = analyticsPlaygroundCode.find(c => c.id === id);
    setActivePlayground(selected);
    setExecutionOutput(null);
  };

  const filteredDataset = retailDataset.filter(item => {
    const categoryMatch = retailFilter === 'All' || item.category === retailFilter;
    const regionMatch = regionFilter === 'All' || item.region === regionFilter;
    return categoryMatch && regionMatch;
  });

  return (
    <div className="cloud-demo-container animate-fade-in">
      <div className="page-header">
        <h2 className="page-title text-analytics-title">Cloud Computing & Data Science</h2>
        <p className="page-subtitle">A integrated suite highlighting serverless e-commerce storefronts, CDN traffic, and dataset analysis playgrounds.</p>
      </div>

      {/* Toggles */}
      <div className="cloud-tabs-row" style={{ marginBottom: '24px' }}>
        <button className={`cloud-tab ${activeMode === 'cloud' ? 'active-cloud-tab' : ''}`} onClick={() => setActiveMode('cloud')}>
          <CloudLightning size={16} /> Cloud Computing: Serverless E-Commerce
        </button>
        <button className={`cloud-tab ${activeMode === 'datascience' ? 'active-cloud-tab' : ''}`} onClick={() => setActiveMode('datascience')}>
          <FileSpreadsheet size={16} /> Data Science: Retail Case Study
        </button>
      </div>

      {/* KPI Stats */}
      {activeMode === 'cloud' ? (
        <div className="stat-grid">
          <div className="glass-card stat-card border-analytics">
            <div className="stat-label">Hosting Environment</div>
            <div className="stat-value" style={{ fontSize: '1.4rem' }}>AWS Lambda</div>
            <div className="stat-desc">Serverless computing model</div>
          </div>
          <div className="glass-card stat-card border-analytics">
            <div className="stat-label">Lambda Invocations</div>
            <div className="stat-value">{cloudDeploymentStats.serverlessInvocations.toLocaleString()}</div>
            <div className="stat-desc">Ingress hits last 24hr</div>
          </div>
          <div className="glass-card stat-card border-analytics">
            <div className="stat-label">CDN Cache Ratio</div>
            <div className="stat-value text-analytics">92.4%</div>
            <div className="stat-desc">Cloudflare proxy delivery</div>
          </div>
          <div className="glass-card stat-card border-analytics">
            <div className="stat-label">WAF Block Rate</div>
            <div className="stat-value text-success">99.98%</div>
            <div className="stat-desc">DDoS prevention active</div>
          </div>
        </div>
      ) : (
        <div className="stat-grid">
          <div className="glass-card stat-card border-analytics">
            <div className="stat-label">Dataset Volume</div>
            <div className="stat-value">{retailMetrics.recordsCount.toLocaleString()} rows</div>
            <div className="stat-desc">Imported transaction rows</div>
          </div>
          <div className="glass-card stat-card border-analytics">
            <div className="stat-label">Total Revenue Sum</div>
            <div className="stat-value">${retailMetrics.totalSales.toLocaleString()}</div>
            <div className="stat-desc">Total retail sales catalog</div>
          </div>
          <div className="glass-card stat-card border-analytics">
            <div className="stat-label">Operating Net Profit</div>
            <div className="stat-value text-analytics">${retailMetrics.totalProfit.toLocaleString()}</div>
            <div className="stat-desc">Consolidated profit metrics</div>
          </div>
          <div className="glass-card stat-card border-analytics">
            <div className="stat-label">Avg. Margin Percentage</div>
            <div className="stat-value">{retailMetrics.avgProfitMargin}%</div>
            <div className="stat-desc">Calculated margins</div>
          </div>
        </div>
      )}

      {/* Main Panel View */}
      {activeMode === 'cloud' ? (
        <div className="cloud-section-container animate-fade-in">
          {/* Sub-tabs inside Cloud */}
          <div className="cloud-tabs-row" style={{ borderBottom: 'none', background: 'var(--bg-secondary)', borderRadius: '8px', padding: '4px', maxWidth: '420px', marginBottom: '20px' }}>
            <button className={`cloud-tab ${activeSubTab === 'store' ? 'active-cloud-tab' : ''}`} onClick={() => setActiveSubTab('store')} style={{ padding: '8px 12px', fontSize: '0.8rem' }}>
              Product Catalog
            </button>
            <button className={`cloud-tab ${activeSubTab === 'analytics' ? 'active-cloud-tab' : ''}`} onClick={() => setActiveSubTab('analytics')} style={{ padding: '8px 12px', fontSize: '0.8rem' }}>
              Cloud Analytics
            </button>
            <button className={`cloud-tab ${activeSubTab === 'logs' ? 'active-cloud-tab' : ''}`} onClick={() => setActiveSubTab('logs')} style={{ padding: '8px 12px', fontSize: '0.8rem' }}>
              API Gateway Logs
            </button>
          </div>

          {activeSubTab === 'store' && (
            <div className="store-dashboard-layout animate-fade-in">
              <div className="glass-card storefront-card">
                <div className="section-title-row">
                  <h3>Catalog Items</h3>
                  <button className="chat-reset-btn" onClick={resetStore} title="Re-Seed Catalog">
                    <RefreshCw size={14} />
                  </button>
                </div>
                <div className="products-grid">
                  {products.map(p => (
                    <div key={p.id} className="product-card">
                      <div className="product-visual">{p.image}</div>
                      <div className="product-details">
                        <span className="product-category">{p.category}</span>
                        <h4>{p.name}</h4>
                        <div className="product-pricing">
                          <span className="product-price">${p.price.toFixed(2)}</span>
                          <span className="product-stock">{p.stock} left</span>
                        </div>
                        <button className="btn btn-primary btn-analytics-theme btn-small" onClick={() => handleAddToCart(p)} disabled={p.stock <= 0}>
                          {p.stock <= 0 ? "Out of Stock" : "Add to Cart"}
                        </button>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
              <div className="glass-card shopping-cart-card">
                <h3>Cart Checkouts</h3>
                <div className="cart-list-container">
                  {cart.length === 0 ? (
                    <div className="cart-empty-state">
                      <ShoppingCart size={32} className="text-muted" />
                      <p>Shopping cart is empty.</p>
                    </div>
                  ) : (
                    <div className="cart-items-list">
                      {cart.map(item => (
                        <div key={item.id} className="cart-item-row">
                          <div className="cart-item-name">
                            <span style={{ marginRight: '6px' }}>{item.image}</span>
                            {item.name}
                          </div>
                          <div className="cart-item-details">
                            <span>{item.qty} x ${item.price.toFixed(2)}</span>
                          </div>
                        </div>
                      ))}
                      <div className="cart-total-row">
                        <span>Total Cost</span>
                        <strong>${totalCartCost.toFixed(2)}</strong>
                      </div>
                      <button className="btn btn-primary btn-analytics-theme btn-full" onClick={handleCheckout} disabled={isPurchasing}>
                        {isPurchasing ? "Executing AWS API Lambda..." : "Process Cloud Checkout"}
                      </button>
                    </div>
                  )}
                </div>
              </div>
            </div>
          )}

          {activeSubTab === 'analytics' && (
            <div className="analytics-dashboard-grid animate-fade-in" style={{ gridTemplateColumns: '1fr' }}>
              <div className="glass-card visual-charts-card">
                <h3>Cloud Distribution Visualisations</h3>
                <div className="charts-flex-container" style={{ flexDirection: 'row' }}>
                  <div className="chart-item" style={{ flex: 1 }}>
                    <h4>Global Traffic Share & Edge Latency</h4>
                    <div className="svg-chart-container">
                      <svg viewBox="0 0 400 200" className="analytics-svg">
                        <line x1="50" y1="20" x2="350" y2="20" stroke="var(--bg-tertiary)" strokeDasharray="2 2" />
                        <line x1="50" y1="80" x2="350" y2="80" stroke="var(--bg-tertiary)" strokeDasharray="2 2" />
                        <line x1="50" y1="140" x2="350" y2="140" stroke="var(--bg-tertiary)" strokeDasharray="2 2" />
                        <line x1="50" y1="170" x2="350" y2="170" stroke="var(--bg-tertiary)" />
                        {cloudDeploymentStats.regionalTraffic.map((t, idx) => {
                          const y = 35 + idx * 35;
                          const width = t.share * 4;
                          return (
                            <g key={t.region}>
                              <rect x="50" y={y} width={width} height="15" fill="var(--color-analytics)" rx="3" className="animated-rect" />
                              <text x="350" y={y + 11} fill="var(--text-secondary)" fontSize="10" textAnchor="end">{t.region} ({t.latency}ms)</text>
                            </g>
                          );
                        })}
                      </svg>
                    </div>
                  </div>
                  <div className="chart-item" style={{ flex: 1 }}>
                    <h4>Ingress Edge Requests (24HR Cycle)</h4>
                    <div className="svg-chart-container">
                      <svg viewBox="0 0 400 200" className="analytics-svg">
                        <line x1="40" y1="20" x2="360" y2="20" stroke="var(--bg-tertiary)" strokeDasharray="2 2" />
                        <line x1="40" y1="80" x2="360" y2="80" stroke="var(--bg-tertiary)" strokeDasharray="2 2" />
                        <line x1="40" y1="140" x2="360" y2="140" stroke="var(--bg-tertiary)" strokeDasharray="2 2" />
                        <line x1="40" y1="170" x2="360" y2="170" stroke="var(--bg-tertiary)" />
                        <path d="M 50,150 L 100,165 L 150,70 L 200,30 L 250,60 L 300,110 L 350,140" fill="none" stroke="var(--color-analytics)" strokeWidth="3" className="animated-path" />
                        {cloudDeploymentStats.trafficTrend.map((p, idx) => {
                          const x = 50 + idx * 50;
                          const y = 170 - (p.requests / 1300) * 140;
                          return (
                            <g key={p.time}>
                              <circle cx={x} cy={y} r="4" fill="var(--color-analytics)" />
                              <text x={x} y="188" fill="var(--text-muted)" fontSize="9" textAnchor="middle">{p.time}</text>
                            </g>
                          );
                        })}
                      </svg>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          )}

          {activeSubTab === 'logs' && (
            <div className="logs-dashboard-layout animate-fade-in">
              <div className="glass-card lambda-logs-card" style={{ width: '100%' }}>
                <div className="section-title-row">
                  <h3><CloudLightning size={16} className="text-analytics" /> Serverless API Edge Logs</h3>
                </div>
                <div className="sql-log-terminal" style={{ height: '320px' }}>
                  {lambdaLogs.map((log, index) => (
                    <div key={index} className="sql-log-line">
                      <span className="sql-log-time">[{log.timestamp}]</span>
                      <span className="sql-log-query" style={{ color: '#e2e8f0' }}>{log.message}</span>
                    </div>
                  ))}
                  <div className="sql-log-prompt">
                    edge-cdn&gt; <span className="cursor-blink">_</span>
                  </div>
                </div>
              </div>
            </div>
          )}
        </div>
      ) : (
        <div className="datascience-section-container animate-fade-in">
          <div className="analytics-dashboard-grid">
            {/* Charts Visualisations */}
            <div className="glass-card visual-charts-card">
              <div className="section-title-row">
                <h3><LineChart size={18} className="text-analytics" /> Retail Sales Visualisations</h3>
              </div>
              <div className="charts-flex-container">
                <div className="chart-item">
                  <h4>Category Ingress Revenue & Net Profit Share</h4>
                  <div className="svg-chart-container">
                    <svg viewBox="0 0 400 180" className="analytics-svg">
                      <line x1="50" y1="30" x2="370" y2="30" stroke="var(--bg-tertiary)" strokeDasharray="4 4" />
                      <line x1="50" y1="90" x2="370" y2="90" stroke="var(--bg-tertiary)" strokeDasharray="4 4" />
                      <line x1="50" y1="150" x2="370" y2="150" stroke="var(--bg-tertiary)" />
                      {/* Tech */}
                      <rect x="50" y="45" width="220" height="15" fill="var(--color-analytics)" rx="3" className="animated-rect" />
                      <rect x="50" y="45" width="80" height="15" fill="var(--color-security)" rx="3" className="animated-rect" />
                      <text x="375" y="56" fill="var(--text-secondary)" fontSize="9" textAnchor="end">Tech ($4.7k)</text>
                      {/* Furn */}
                      <rect x="50" y="95" width="85" height="15" fill="var(--color-analytics)" rx="3" className="animated-rect" />
                      <rect x="50" y="95" width="28" height="15" fill="var(--color-security)" rx="3" className="animated-rect" />
                      <text x="375" y="106" fill="var(--text-secondary)" fontSize="9" textAnchor="end">Furn ($1.1k)</text>
                      {/* Office */}
                      <rect x="50" y="145" width="30" height="15" fill="var(--color-analytics)" rx="3" className="animated-rect" />
                      <rect x="50" y="145" width="12" height="15" fill="var(--color-security)" rx="3" className="animated-rect" />
                      <text x="375" y="156" fill="var(--text-secondary)" fontSize="9" textAnchor="end">Office ($330)</text>
                    </svg>
                  </div>
                </div>
              </div>
            </div>

            {/* SQL / Pandas Sandbox Code Console */}
            <div className="glass-card code-playground-card">
              <div className="section-title-row">
                <h3><Terminal size={18} className="text-analytics" /> Analytical Code Sandbox</h3>
              </div>
              <div className="playground-controls">
                <div className="select-snippet-group">
                  <select onChange={e => handleSnippetChange(e.target.value)} value={activePlayground.id}>
                    {analyticsPlaygroundCode.map(c => (
                      <option key={c.id} value={c.id}>{c.title}</option>
                    ))}
                  </select>
                </div>
                <button className="btn btn-primary btn-analytics-theme" onClick={executeCode} disabled={isExecuting}>
                  <Play size={14} /> {isExecuting ? "Executing..." : "Execute"}
                </button>
              </div>

              <div className="code-editor-mock">
                <pre className="code-editor-content" style={{ minHeight: '110px' }}>
                  <code>{activePlayground.code}</code>
                </pre>
              </div>

              <div className="output-console-mock">
                <div className="output-console-body" style={{ minHeight: '110px' }}>
                  {isExecuting ? (
                    <div className="console-running">Executing matrix aggregates...</div>
                  ) : executionOutput ? (
                    typeof executionOutput === 'string' ? (
                      <pre className="console-stdout">{executionOutput}</pre>
                    ) : (
                      <table className="console-result-table">
                        <thead>
                          <tr>{Object.keys(executionOutput[0]).map(k => <th key={k}>{k}</th>)}</tr>
                        </thead>
                        <tbody>
                          {executionOutput.map((r, rIdx) => (
                            <tr key={rIdx}>{Object.values(r).map((v, cIdx) => <td key={cIdx}>{v}</td>)}</tr>
                          ))}
                        </tbody>
                      </table>
                    )
                  ) : (
                    <div className="console-empty">Click execute to compile dataset scripts.</div>
                  )}
                </div>
              </div>
            </div>
          </div>

          {/* Dataset transactions explorer */}
          <div className="glass-card dataset-explorer-card" style={{ marginTop: '24px' }}>
            <div className="section-title-row">
              <h3>Database transactions (Slice)</h3>
              <div className="filter-controls">
                <select value={retailFilter} onChange={e => setRetailFilter(e.target.value)}>
                  <option value="All">All Categories</option>
                  <option value="Technology">Technology</option>
                  <option value="Furniture">Furniture</option>
                  <option value="Office Supplies">Office Supplies</option>
                </select>
                <select value={regionFilter} onChange={e => setRegionFilter(e.target.value)}>
                  <option value="All">All Regions</option>
                  <option value="North">North</option>
                  <option value="East">East</option>
                  <option value="West">West</option>
                  <option value="South">South</option>
                </select>
              </div>
            </div>
            <div className="table-responsive">
              <table className="dataset-table">
                <thead>
                  <tr>
                    <th>OrderID</th>
                    <th>Date</th>
                    <th>Category</th>
                    <th>Product</th>
                    <th>Sales</th>
                    <th>Profit</th>
                    <th>Region</th>
                  </tr>
                </thead>
                <tbody>
                  {filteredDataset.map(item => (
                    <tr key={item.id}>
                      <td>#000{item.id}</td>
                      <td>{item.date}</td>
                      <td><span className="dataset-cat-badge">{item.category}</span></td>
                      <td className="dataset-product-cell">{item.product}</td>
                      <td>${item.sales.toFixed(2)}</td>
                      <td className="text-success">+${item.profit.toFixed(2)}</td>
                      <td>{item.region}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
