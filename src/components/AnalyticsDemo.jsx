import React, { useState } from 'react';
import { Play, LineChart, Table, Terminal, FileSpreadsheet, Layers, Filter } from 'lucide-react';
import { retailDataset, retailMetrics, analyticsPlaygroundCode } from '../data/mockData';
import './AnalyticsDemo.css';

export default function AnalyticsDemo() {
  const [activePlayground, setActivePlayground] = useState(analyticsPlaygroundCode[0]);
  const [executionOutput, setExecutionOutput] = useState(null);
  const [isExecuting, setIsExecuting] = useState(false);
  const [retailFilter, setRetailFilter] = useState('All');
  const [regionFilter, setRegionFilter] = useState('All');

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

  // Filtering for raw dataset table
  const filteredDataset = retailDataset.filter(item => {
    const categoryMatch = retailFilter === 'All' || item.category === retailFilter;
    const regionMatch = regionFilter === 'All' || item.region === regionFilter;
    return categoryMatch && regionMatch;
  });

  return (
    <div className="analytics-demo-container animate-fade-in">
      <div className="page-header">
        <h2 className="page-title text-analytics-title">Data Analysis & Visualisation Hub</h2>
        <p className="page-subtitle">Interactive analytics engine showcasing Pandas dataset aggregation, SQL querying, and Power BI style visual trends.</p>
      </div>

      {/* Analytics KPI Stats */}
      <div className="stat-grid">
        <div className="glass-card stat-card border-analytics">
          <div className="stat-label">Retail Dataset Size</div>
          <div className="stat-value">{retailMetrics.recordsCount.toLocaleString()} rows</div>
          <div className="stat-desc">Imported transaction records</div>
        </div>
        <div className="glass-card stat-card border-analytics">
          <div className="stat-label">Total Sales Revenue</div>
          <div className="stat-value">${retailMetrics.totalSales.toLocaleString()}</div>
          <div className="stat-desc">Aggregated sales sum</div>
        </div>
        <div className="glass-card stat-card border-analytics">
          <div className="stat-label">Operating Profit</div>
          <div className="stat-value text-analytics">${retailMetrics.totalProfit.toLocaleString()}</div>
          <div className="stat-desc">Net profit returns</div>
        </div>
        <div className="glass-card stat-card border-analytics">
          <div className="stat-label">Avg. Profit Margin</div>
          <div className="stat-value">{retailMetrics.avgProfitMargin}%</div>
          <div className="stat-desc">Weighted average percentage</div>
        </div>
      </div>

      <div className="analytics-dashboard-grid">
        {/* Animated Charts Panel */}
        <div className="glass-card visual-charts-card">
          <div className="section-title-row">
            <h3>
              <LineChart size={18} className="text-analytics" /> Interactive Sales Visualisations
            </h3>
          </div>

          <div className="charts-flex-container">
            {/* SVG Bar Chart: Category Share */}
            <div className="chart-item">
              <h4>Sales and Profit by Category (USD)</h4>
              <div className="svg-chart-container">
                <svg viewBox="0 0 400 220" className="analytics-svg">
                  {/* Grid Lines */}
                  <line x1="50" y1="30" x2="370" y2="30" stroke="var(--bg-tertiary)" strokeDasharray="4 4" />
                  <line x1="50" y1="90" x2="370" y2="90" stroke="var(--bg-tertiary)" strokeDasharray="4 4" />
                  <line x1="50" y1="150" x2="370" y2="150" stroke="var(--bg-tertiary)" strokeDasharray="4 4" />
                  <line x1="50" y1="180" x2="370" y2="180" stroke="var(--bg-tertiary)" />

                  {/* Bars (Technology) */}
                  {/* Sales bar: value 4697 => 120 width max */}
                  <rect x="50" y="45" width="220" height="20" fill="var(--color-analytics)" rx="3" className="animated-rect" />
                  <rect x="50" y="45" width="80" height="20" fill="var(--color-security)" rx="3" className="animated-rect" />
                  <text x="375" y="60" fill="var(--text-secondary)" fontSize="10" textAnchor="end">Tech ($4.7k)</text>

                  {/* Bars (Furniture) */}
                  {/* Sales bar: value 1097 */}
                  <rect x="50" y="105" width="85" height="20" fill="var(--color-analytics)" rx="3" className="animated-rect" />
                  <rect x="50" y="105" width="28" height="20" fill="var(--color-security)" rx="3" className="animated-rect" />
                  <text x="375" y="120" fill="var(--text-secondary)" fontSize="10" textAnchor="end">Furn ($1.1k)</text>

                  {/* Bars (Office Supplies) */}
                  {/* Sales bar: value 329 */}
                  <rect x="50" y="165" width="30" height="20" fill="var(--color-analytics)" rx="3" className="animated-rect" />
                  <rect x="50" y="165" width="12" height="20" fill="var(--color-security)" rx="3" className="animated-rect" />
                  <text x="375" y="180" fill="var(--text-secondary)" fontSize="10" textAnchor="end">Office ($330)</text>

                  {/* X Axis */}
                  <text x="50" y="200" fill="var(--text-muted)" fontSize="9">0</text>
                  <text x="160" y="200" fill="var(--text-muted)" fontSize="9">$2,000</text>
                  <text x="270" y="200" fill="var(--text-muted)" fontSize="9">$4,000</text>
                  <text x="370" y="200" fill="var(--text-muted)" fontSize="9">$5,000</text>
                </svg>
                <div className="chart-legend">
                  <span className="legend-dot bg-analytics"></span> Sales
                  <span className="legend-dot bg-security" style={{ marginLeft: '12px' }}></span> Profit
                </div>
              </div>
            </div>

            {/* SVG Line Chart: Monthly Trend */}
            <div className="chart-item">
              <h4>Monthly Performance Trend</h4>
              <div className="svg-chart-container">
                <svg viewBox="0 0 400 220" className="analytics-svg">
                  {/* Grid Lines */}
                  <line x1="40" y1="30" x2="370" y2="30" stroke="var(--bg-tertiary)" strokeDasharray="2 2" />
                  <line x1="40" y1="80" x2="370" y2="80" stroke="var(--bg-tertiary)" strokeDasharray="2 2" />
                  <line x1="40" y1="130" x2="370" y2="130" stroke="var(--bg-tertiary)" strokeDasharray="2 2" />
                  <line x1="40" y1="180" x2="370" y2="180" stroke="var(--bg-tertiary)" />

                  {/* Monthly Trend Path (Sales) */}
                  {/* Points: Jan (2249), Feb (1288), Mar (1298), Apr (478), May (809) */}
                  {/* Coordinates: Jan(50, 60), Feb(120, 110), Mar(190, 110), Apr(260, 160), May(330, 140) */}
                  <path 
                    d="M 50,60 L 120,110 L 190,110 L 260,160 L 330,140" 
                    fill="none" 
                    stroke="var(--color-analytics)" 
                    strokeWidth="3" 
                    strokeLinecap="round"
                    className="animated-path"
                  />
                  
                  {/* Monthly Trend Path (Profit) */}
                  {/* Points: Jan(684), Feb(482), Mar(360), Apr(120), May(220) */}
                  {/* Coordinates: Jan(50, 145), Feb(120, 155), Mar(190, 165), Apr(260, 172), May(330, 170) */}
                  <path 
                    d="M 50,145 L 120,155 L 190,165 L 260,172 L 330,170" 
                    fill="none" 
                    stroke="var(--color-security)" 
                    strokeWidth="2" 
                    strokeLinecap="round"
                    className="animated-path"
                  />

                  {/* Points Circles */}
                  <circle cx="50" cy="60" r="4" fill="var(--color-analytics)" />
                  <circle cx="120" cy="110" r="4" fill="var(--color-analytics)" />
                  <circle cx="190" cy="110" r="4" fill="var(--color-analytics)" />
                  <circle cx="260" cy="160" r="4" fill="var(--color-analytics)" />
                  <circle cx="330" cy="140" r="4" fill="var(--color-analytics)" />

                  <circle cx="50" cy="145" r="3" fill="var(--color-security)" />
                  <circle cx="120" cy="155" r="3" fill="var(--color-security)" />
                  <circle cx="190" cy="165" r="3" fill="var(--color-security)" />
                  <circle cx="260" cy="172" r="3" fill="var(--color-security)" />
                  <circle cx="330" cy="170" r="3" fill="var(--color-security)" />

                  {/* Labels */}
                  <text x="50" y="200" fill="var(--text-muted)" fontSize="9" textAnchor="middle">Jan</text>
                  <text x="120" y="200" fill="var(--text-muted)" fontSize="9" textAnchor="middle">Feb</text>
                  <text x="190" y="200" fill="var(--text-muted)" fontSize="9" textAnchor="middle">Mar</text>
                  <text x="260" y="200" fill="var(--text-muted)" fontSize="9" textAnchor="middle">Apr</text>
                  <text x="330" y="200" fill="var(--text-muted)" fontSize="9" textAnchor="middle">May</text>
                </svg>
                <div className="chart-legend">
                  <span className="legend-dot bg-analytics"></span> Sales
                  <span className="legend-dot bg-security" style={{ marginLeft: '12px' }}></span> Profit
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* SQL / Python Code Sandbox */}
        <div className="glass-card code-playground-card">
          <div className="section-title-row">
            <h3>
              <Terminal size={18} className="text-analytics" /> Analytical Code Sandbox
            </h3>
          </div>
          <p className="playground-subtitle">Run simulated data analytics scripts on the retail transaction database schema.</p>

          <div className="playground-controls">
            <div className="select-snippet-group">
              <label>Select Analysis Script</label>
              <select onChange={e => handleSnippetChange(e.target.value)} value={activePlayground.id}>
                {analyticsPlaygroundCode.map(c => (
                  <option key={c.id} value={c.id}>{c.title}</option>
                ))}
              </select>
            </div>
            <button className="btn btn-primary btn-analytics-theme" onClick={executeCode} disabled={isExecuting}>
              <Play size={14} /> {isExecuting ? "Executing..." : "Execute Script"}
            </button>
          </div>

          <div className="code-editor-mock">
            <div className="editor-tab-row">
              <span className="editor-tab active-editor-tab">
                {activePlayground.language === 'sql' ? 'query.sql' : 'analytics.py'}
              </span>
              <span className="editor-lang-badge">{activePlayground.language.toUpperCase()}</span>
            </div>
            <pre className="code-editor-content">
              <code>{activePlayground.code}</code>
            </pre>
          </div>

          <div className="output-console-mock">
            <div className="output-console-header">Console Output</div>
            <div className="output-console-body">
              {isExecuting ? (
                <div className="console-running">
                  <span className="spinner-dots">Executing dataset queries...</span>
                </div>
              ) : executionOutput ? (
                typeof executionOutput === 'string' ? (
                  <pre className="console-stdout">{executionOutput}</pre>
                ) : (
                  <div className="table-responsive">
                    <table className="console-result-table">
                      <thead>
                        <tr>
                          {Object.keys(executionOutput[0]).map(key => <th key={key}>{key}</th>)}
                        </tr>
                      </thead>
                      <tbody>
                        {executionOutput.map((row, rIdx) => (
                          <tr key={rIdx}>
                            {Object.values(row).map((val, cIdx) => <td key={cIdx}>{val}</td>)}
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                )
              ) : (
                <div className="console-empty">Click "Execute Script" to run analysis scripts.</div>
              )}
            </div>
          </div>
        </div>
      </div>

      {/* Raw dataset Explorer */}
      <div className="glass-card dataset-explorer-card">
        <div className="section-title-row">
          <h3>
            <FileSpreadsheet size={18} className="text-analytics" /> Dataset transaction explorer (Slice)
          </h3>
          <div className="filter-controls">
            <div className="filter-item">
              <Filter size={12} className="text-muted" />
              <label>Category</label>
              <select value={retailFilter} onChange={e => setRetailFilter(e.target.value)}>
                <option value="All">All Categories</option>
                <option value="Technology">Technology</option>
                <option value="Furniture">Furniture</option>
                <option value="Office Supplies">Office Supplies</option>
              </select>
            </div>
            <div className="filter-item">
              <Filter size={12} className="text-muted" />
              <label>Region</label>
              <select value={regionFilter} onChange={e => setRegionFilter(e.target.value)}>
                <option value="All">All Regions</option>
                <option value="North">North</option>
                <option value="East">East</option>
                <option value="West">West</option>
                <option value="South">South</option>
              </select>
            </div>
          </div>
        </div>

        <div className="table-responsive">
          <table className="dataset-table">
            <thead>
              <tr>
                <th>TxID</th>
                <th>Order Date</th>
                <th>Category</th>
                <th>Product Label</th>
                <th>Sales Revenue</th>
                <th>Profit Margin</th>
                <th>Region</th>
              </tr>
            </thead>
            <tbody>
              {filteredDataset.map(item => (
                <tr key={item.id}>
                  <td>#000{item.id}</td>
                  <td>{item.date}</td>
                  <td>
                    <span className="dataset-cat-badge">{item.category}</span>
                  </td>
                  <td className="dataset-product-cell">{item.product}</td>
                  <td>${item.sales.toFixed(2)}</td>
                  <td className="text-success">+${item.profit.toFixed(2)}</td>
                  <td>{item.region}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        <div className="dataset-summary-text">
          Showing {filteredDataset.length} of {retailDataset.length} mock transactions from the complete 10,543 record SQL table.
        </div>
      </div>
    </div>
  );
}
