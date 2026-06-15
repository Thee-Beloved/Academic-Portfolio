import React, { useState } from 'react';
import { Award, GraduationCap, Database, RotateCcw, FileText, Plus, Trash2, Box, Package, User, AlertTriangle } from 'lucide-react';
import { initialEnrollment, studentProfile, initialInventory, suppliersList } from '../data/mockData';
import './StudentPortal.css';

export default function StudentPortal() {
  const [activeMode, setActiveMode] = useState('portal'); // 'portal' or 'inventory'

  // Student Portal State
  const [courses, setCourses] = useState(initialEnrollment);
  const [showTranscript, setShowTranscript] = useState(false);

  // Inventory Manager State
  const [inventory, setInventory] = useState(initialInventory);
  const [newItem, setNewItem] = useState({ name: '', sku: '', quantity: '', price: '', supplier: suppliersList[0] });
  const [showInventoryReport, setShowInventoryReport] = useState(false);
  const [showAddForm, setShowAddForm] = useState(false);

  // Consolidated SQL Logs
  const [sqlLogs, setSqlLogs] = useState([
    { timestamp: new Date().toLocaleTimeString(), query: "SELECT * FROM student_courses JOIN students ON student_courses.student_id = students.id WHERE student_id = 'STU-2023-8941';" }
  ]);

  const logSql = (query) => {
    setSqlLogs(prev => [{ timestamp: new Date().toLocaleTimeString(), query }, ...prev].slice(0, 12));
  };

  // Student Portal Logic
  const getGradeFromScore = (score) => {
    if (score >= 95) return 'A';
    if (score >= 90) return 'A-';
    if (score >= 85) return 'B+';
    if (score >= 80) return 'B';
    if (score >= 75) return 'C+';
    return 'C';
  };

  const getGpaPoints = (grade) => {
    switch (grade) {
      case 'A': return 4.0;
      case 'A-': return 3.7;
      case 'B+': return 3.3;
      case 'B': return 3.0;
      case 'C+': return 2.7;
      case 'C': return 2.0;
      default: return 0.0;
    }
  };

  const handleAdjustScore = (id, amount) => {
    setCourses(prev => prev.map(c => {
      if (c.id === id) {
        const newScore = Math.min(100, Math.max(0, c.score + amount));
        const newGrade = getGradeFromScore(newScore);
        logSql(`UPDATE student_grades SET score = ${newScore}, grade = '${newGrade}' WHERE course_id = '${id}' AND student_id = '${studentProfile.studentId}';`);
        return { ...c, score: newScore, grade: newGrade };
      }
      return c;
    }));
  };

  const totalCredits = courses.reduce((sum, c) => sum + c.credits, 0);
  const currentGpa = (() => {
    let totalPoints = 0;
    let totalCreditsCount = 0;
    courses.forEach(c => {
      totalPoints += getGpaPoints(c.grade) * c.credits;
      totalCreditsCount += c.credits;
    });
    return totalCreditsCount > 0 ? (totalPoints / totalCreditsCount).toFixed(2) : "0.00";
  })();

  const resetGrades = () => {
    setCourses(initialEnrollment);
    logSql(`TRUNCATE TABLE student_grades; INSERT INTO student_grades SELECT * FROM student_grades_backup;`);
  };

  // Inventory Manager Logic
  const handleAdjustStock = (id, amount) => {
    setInventory(prev => prev.map(item => {
      if (item.id === id) {
        const newQty = Math.max(0, item.quantity + amount);
        const newStatus = newQty === 0 ? "Out of Stock" : newQty < 10 ? "Low Stock" : "In Stock";
        logSql(`UPDATE inventory SET quantity = ${newQty}, status = '${newStatus}' WHERE id = ${id};`);
        return { ...item, quantity: newQty, status: newStatus };
      }
      return item;
    }));
  };

  const handleDeleteItem = (id, name) => {
    setInventory(prev => prev.filter(item => item.id !== id));
    logSql(`DELETE FROM inventory WHERE id = ${id}; -- Removed: ${name}`);
  };

  const handleAddItem = (e) => {
    e.preventDefault();
    if (!newItem.name || !newItem.sku || !newItem.quantity || !newItem.price) return;

    const qty = parseInt(newItem.quantity);
    const prc = parseFloat(newItem.price);
    const status = qty === 0 ? "Out of Stock" : qty < 10 ? "Low Stock" : "In Stock";
    const item = {
      id: Date.now(),
      name: newItem.name,
      sku: newItem.sku.toUpperCase(),
      quantity: qty,
      price: prc,
      supplier: newItem.supplier,
      status
    };

    setInventory(prev => [...prev, item]);
    logSql(`INSERT INTO inventory (name, sku, quantity, price, supplier, status) VALUES ('${item.name}', '${item.sku}', ${qty}, ${prc}, '${item.supplier}', '${status}');`);
    setNewItem({ name: '', sku: '', quantity: '', price: '', supplier: suppliersList[0] });
    setShowAddForm(false);
  };

  const resetInventory = () => {
    setInventory(initialInventory);
    logSql(`TRUNCATE TABLE inventory; INSERT INTO inventory SELECT * FROM inventory_backup;`);
  };

  const inventoryValue = inventory.reduce((sum, item) => sum + (item.price * item.quantity), 0);
  const inventoryItemsCount = inventory.reduce((sum, item) => sum + item.quantity, 0);

  return (
    <div className="portal-demo-container animate-fade-in">
      <div className="page-header">
        <h2 className="page-title text-inventory">Web Development & Software Engineering</h2>
        <p className="page-subtitle">Interactive database management systems capturing SQL query transactions issued by React and Java JDBC backends.</p>
      </div>

      {/* Switch Mode Controls */}
      <div className="cloud-tabs-row" style={{ marginBottom: '24px' }}>
        <button className={`cloud-tab ${activeMode === 'portal' ? 'active-cloud-tab' : ''}`} onClick={() => { setActiveMode('portal'); logSql("SELECT * FROM student_courses;"); }}>
          <GraduationCap size={16} /> Web Dev: Student Portal System
        </button>
        <button className={`cloud-tab ${activeMode === 'inventory' ? 'active-cloud-tab' : ''}`} onClick={() => { setActiveMode('inventory'); logSql("SELECT * FROM inventory;"); }}>
          <Box size={16} /> Software Eng: Inventory Manager
        </button>
      </div>

      {/* KPI Cards */}
      {activeMode === 'portal' ? (
        <div className="stat-grid">
          <div className="glass-card stat-card border-inventory">
            <div className="stat-label">Student Profile</div>
            <div className="stat-value" style={{ fontSize: '1.4rem' }}>{studentProfile.name}</div>
            <div className="stat-desc">Major: {studentProfile.major}</div>
          </div>
          <div className="glass-card stat-card border-inventory">
            <div className="stat-label">Cumulative GPA</div>
            <div className="stat-value text-inventory">{currentGpa} / 4.00</div>
            <div className="stat-desc">Real-time GPA computation</div>
          </div>
          <div className="glass-card stat-card border-inventory">
            <div className="stat-label">Total Credits Earned</div>
            <div className="stat-value">{totalCredits} Units</div>
            <div className="stat-desc">Across {courses.length} semesters</div>
          </div>
          <div className="glass-card stat-card border-inventory">
            <div className="stat-label">System Type</div>
            <div className="stat-value text-success">Web Portal</div>
            <div className="stat-desc">React frontend dashboard</div>
          </div>
        </div>
      ) : (
        <div className="stat-grid">
          <div className="glass-card stat-card border-inventory">
            <div className="stat-label">Total Stock Value</div>
            <div className="stat-value text-inventory">${inventoryValue.toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 2 })}</div>
            <div className="stat-desc">Aggregated live pricing</div>
          </div>
          <div className="glass-card stat-card border-inventory">
            <div className="stat-label">Active SKUs</div>
            <div className="stat-value">{inventory.length} items</div>
            <div className="stat-desc">Across hardware nodes</div>
          </div>
          <div className="glass-card stat-card border-inventory">
            <div className="stat-label">Warehouse Items</div>
            <div className="stat-value">{inventoryItemsCount} units</div>
            <div className="stat-desc">Total stock items</div>
          </div>
          <div className="glass-card stat-card border-inventory">
            <div className="stat-label">System Type</div>
            <div className="stat-value text-success">Desktop Application</div>
            <div className="stat-desc">Java Swing + JDBC simulation</div>
          </div>
        </div>
      )}

      <div className="portal-dashboard-layout">
        {/* Main Panel */}
        <div className="glass-card course-ledger-section">
          {activeMode === 'portal' ? (
            <>
              <div className="section-title-row">
                <h3>Registered Course Grades</h3>
                <div className="btn-group">
                  <button className="btn btn-secondary btn-icon" onClick={resetGrades} title="Reset Grades">
                    <RotateCcw size={16} />
                  </button>
                  <button className="btn btn-primary" onClick={() => setShowTranscript(true)}>
                    <FileText size={16} /> Audit Transcript
                  </button>
                </div>
              </div>
              <div className="table-responsive">
                <table className="portal-table">
                  <thead>
                    <tr>
                      <th>Course Code & Label</th>
                      <th>Credits</th>
                      <th>Score (Percent)</th>
                      <th>Letter Grade</th>
                      <th>GPA Weights</th>
                    </tr>
                  </thead>
                  <tbody>
                    {courses.map(course => (
                      <tr key={course.id}>
                        <td>
                          <div className="table-sku">{course.id}</div>
                          <div className="table-name">{course.name}</div>
                        </td>
                        <td>{course.credits} Credits</td>
                        <td>
                          <div className="qty-controls">
                            <button className="qty-btn" onClick={() => handleAdjustScore(course.id, -2)}>-2</button>
                            <span className="qty-val">{course.score}%</span>
                            <button className="qty-btn" onClick={() => handleAdjustScore(course.id, 2)}>+2</button>
                          </div>
                        </td>
                        <td>
                          <span className={`status-badge badge-${course.grade.toLowerCase().replace('+', 'plus').replace('-', 'minus')}`}>
                            {course.grade}
                          </span>
                        </td>
                        <td>
                          <span className="gpa-points-indicator">
                            {getGpaPoints(course.grade).toFixed(1)} Pts
                          </span>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </>
          ) : (
            <>
              <div className="section-title-row">
                <h3>Hardware Stock Ledger</h3>
                <div className="btn-group">
                  <button className="btn btn-secondary btn-icon" onClick={resetInventory} title="Reset Ledger">
                    <RotateCcw size={16} />
                  </button>
                  <button className="btn btn-primary" onClick={() => setShowAddForm(!showAddForm)}>
                    <Plus size={16} /> Add Item
                  </button>
                  <button className="btn btn-secondary" onClick={() => setShowInventoryReport(true)}>
                    <FileText size={16} /> Stock Audit
                  </button>
                </div>
              </div>

              {showAddForm && (
                <form onSubmit={handleAddItem} className="add-item-form animate-fade-in" style={{ background: 'var(--bg-secondary)', padding: '16px', borderRadius: '8px', marginBottom: '16px' }}>
                  <div className="form-grid">
                    <div className="form-group">
                      <label>Item Name</label>
                      <input type="text" placeholder="e.g. Intel Core i9" value={newItem.name} onChange={e => setNewItem({...newItem, name: e.target.value})} required />
                    </div>
                    <div className="form-group">
                      <label>SKU</label>
                      <input type="text" placeholder="e.g. IN-I9" value={newItem.sku} onChange={e => setNewItem({...newItem, sku: e.target.value})} required />
                    </div>
                    <div className="form-group">
                      <label>Quantity</label>
                      <input type="number" min="0" placeholder="e.g. 10" value={newItem.quantity} onChange={e => setNewItem({...newItem, quantity: e.target.value})} required />
                    </div>
                    <div className="form-group">
                      <label>Price ($)</label>
                      <input type="number" step="0.01" min="0" placeholder="e.g. 499" value={newItem.price} onChange={e => setNewItem({...newItem, price: e.target.value})} required />
                    </div>
                    <div className="form-group form-group-span">
                      <label>Supplier</label>
                      <select value={newItem.supplier} onChange={e => setNewItem({...newItem, supplier: e.target.value})}>
                        {suppliersList.map(s => <option key={s} value={s}>{s}</option>)}
                      </select>
                    </div>
                  </div>
                  <div className="form-actions">
                    <button type="button" className="btn btn-secondary" onClick={() => setShowAddForm(false)}>Cancel</button>
                    <button type="submit" className="btn btn-primary">Create SKU</button>
                  </div>
                </form>
              )}

              <div className="table-responsive">
                <table className="portal-table">
                  <thead>
                    <tr>
                      <th>SKU / Name</th>
                      <th>Supplier</th>
                      <th>Quantity</th>
                      <th>Price</th>
                      <th>Status</th>
                      <th>Action</th>
                    </tr>
                  </thead>
                  <tbody>
                    {inventory.map(item => (
                      <tr key={item.id}>
                        <td>
                          <div className="table-sku">{item.sku}</div>
                          <div className="table-name">{item.name}</div>
                        </td>
                        <td>{item.supplier}</td>
                        <td>
                          <div className="qty-controls">
                            <button className="qty-btn" onClick={() => handleAdjustStock(item.id, -1)}>-</button>
                            <span className="qty-val">{item.quantity}</span>
                            <button className="qty-btn" onClick={() => handleAdjustStock(item.id, 1)}>+</button>
                          </div>
                        </td>
                        <td>${item.price.toFixed(2)}</td>
                        <td>
                          <span className={`status-badge badge-${item.status.toLowerCase().replace(/\s+/g, '-')}`}>
                            {item.status}
                          </span>
                        </td>
                        <td>
                          <button className="delete-action-btn" onClick={() => handleDeleteItem(item.id, item.name)} style={{ background: 'none', border: 'none', cursor: 'pointer', color: 'var(--text-muted)' }}>
                            <Trash2 size={16} />
                          </button>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </>
          )}
        </div>

        {/* Console logs */}
        <div className="glass-card sql-console-section">
          <div className="section-title-row">
            <h3 className="console-title">
              <Database size={16} className="text-inventory" /> MySQL Server Console
            </h3>
          </div>
          <div className="sql-log-terminal">
            {sqlLogs.map((log, index) => (
              <div key={index} className="sql-log-line">
                <span className="sql-log-time">[{log.timestamp}]</span>
                <span className="sql-log-query">{log.query}</span>
              </div>
            ))}
            <div className="sql-log-prompt">
              mysql&gt; <span className="cursor-blink">_</span>
            </div>
          </div>
          <div className="sql-console-desc">
            {activeMode === 'portal' 
              ? "Tracks real-time SQL execution triggered by grades adjustments." 
              : "Simulates database statement prints sent from Java JDBC driver endpoints."}
          </div>
        </div>
      </div>

      {/* Transcript Modal */}
      {showTranscript && (
        <div className="report-modal-overlay animate-fade-in" onClick={() => setShowTranscript(false)}>
          <div className="glass-card report-modal-content" onClick={e => e.stopPropagation()}>
            <div className="modal-header">
              <h3>Academic Transcript Audit</h3>
              <button className="modal-close-btn" onClick={() => setShowTranscript(false)}>&times;</button>
            </div>
            <div className="modal-body">
              <div className="report-meta">
                <div><strong>Student Name:</strong> {studentProfile.name}</div>
                <div><strong>Advisor:</strong> {studentProfile.advisor}</div>
                <div><strong>Cumulative GPA:</strong> {currentGpa}</div>
              </div>
              <div className="transcript-box">
                <h4 style={{ marginBottom: '12px' }}>Course Breakdown</h4>
                <div className="mock-bar-chart">
                  {courses.map(c => {
                    const points = getGpaPoints(c.grade);
                    const pct = (points / 4.0) * 100;
                    return (
                      <div key={c.id} className="bar-row">
                        <span className="bar-label">{c.id}</span>
                        <div className="bar-track">
                          <div className="bar-fill bg-inventory" style={{ width: `${pct}%` }}></div>
                        </div>
                        <span className="bar-value" style={{ width: '50px' }}>{c.grade} ({points.toFixed(1)})</span>
                      </div>
                    );
                  })}
                </div>
              </div>
            </div>
            <div className="modal-footer">
              <button className="btn btn-secondary" onClick={() => setShowTranscript(false)}>Close</button>
              <button className="btn btn-primary" onClick={() => alert("Transcript Exported (Simulated)")}>Export PDF</button>
            </div>
          </div>
        </div>
      )}

      {/* Inventory Report Modal */}
      {showInventoryReport && (
        <div className="report-modal-overlay animate-fade-in" onClick={() => setShowInventoryReport(false)}>
          <div className="glass-card report-modal-content" onClick={e => e.stopPropagation()}>
            <div className="modal-header">
              <h3>Warehouse Valuation Audit</h3>
              <button className="modal-close-btn" onClick={() => setShowInventoryReport(false)}>&times;</button>
            </div>
            <div className="modal-body">
              <div className="report-meta">
                <div><strong>Date Generated:</strong> {new Date().toLocaleDateString()}</div>
                <div><strong>Asset Count:</strong> {inventory.length} SKUs</div>
                <div><strong>Total Value:</strong> ${inventoryValue.toLocaleString()}</div>
              </div>
              <div className="transcript-box">
                <h4 style={{ marginBottom: '12px' }}>Stock Quantity Distributions</h4>
                <div className="mock-bar-chart">
                  {inventory.map(item => {
                    const maxQty = Math.max(...inventory.map(i => i.quantity));
                    const pct = maxQty > 0 ? (item.quantity / maxQty) * 100 : 0;
                    return (
                      <div key={item.id} className="bar-row">
                        <span className="bar-label">{item.sku}</span>
                        <div className="bar-track">
                          <div className="bar-fill bg-inventory" style={{ width: `${pct}%` }}></div>
                        </div>
                        <span className="bar-value" style={{ width: '40px' }}>{item.quantity}</span>
                      </div>
                    );
                  })}
                </div>
              </div>
            </div>
            <div className="modal-footer">
              <button className="btn btn-secondary" onClick={() => setShowInventoryReport(false)}>Close</button>
              <button className="btn btn-primary" onClick={() => alert("Valuation sheet generated (Simulated)")}>Download CSV</button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
