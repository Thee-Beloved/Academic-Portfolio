import React, { useState } from 'react';
import { Plus, Trash2, FileText, Database, RotateCcw, AlertTriangle } from 'lucide-react';
import { initialInventory, suppliersList } from '../data/mockData';
import './InventoryDemo.css';

export default function InventoryDemo() {
  const [inventory, setInventory] = useState(initialInventory);
  const [sqlLogs, setSqlLogs] = useState([
    { timestamp: new Date().toLocaleTimeString(), query: "SELECT * FROM inventory JOIN suppliers ON inventory.supplier_id = suppliers.id;" }
  ]);
  const [newItem, setNewItem] = useState({ name: '', sku: '', quantity: '', price: '', supplier: suppliersList[0] });
  const [showReport, setShowReport] = useState(false);
  const [showAddForm, setShowAddForm] = useState(false);

  const logSql = (query) => {
    setSqlLogs(prev => [{ timestamp: new Date().toLocaleTimeString(), query }, ...prev].slice(0, 15));
  };

  const handleAdjustStock = (id, amount) => {
    setInventory(prev => prev.map(item => {
      if (item.id === id) {
        const newQty = Math.max(0, item.quantity + amount);
        const newStatus = newQty === 0 ? "Out of Stock" : newQty < 10 ? "Low Stock" : "In Stock";
        
        logSql(`UPDATE inventory SET quantity = ${newQty}, status = '${newStatus}' WHERE id = ${id};`);
        
        return {
          ...item,
          quantity: newQty,
          status: newStatus
        };
      }
      return item;
    }));
  };

  const handleDeleteItem = (id, name) => {
    setInventory(prev => prev.filter(item => item.id !== id));
    logSql(`DELETE FROM inventory WHERE id = ${id}; -- Deleted: ${name}`);
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
    setSqlLogs([{ timestamp: new Date().toLocaleTimeString(), query: "TRUNCATE TABLE inventory; INSERT INTO inventory SELECT * FROM inventory_backup;" }]);
  };

  const totalValue = inventory.reduce((sum, item) => sum + (item.price * item.quantity), 0);
  const totalItemsCount = inventory.reduce((sum, item) => sum + item.quantity, 0);
  const lowStockCount = inventory.filter(item => item.status === "Low Stock").length;
  const outOfStockCount = inventory.filter(item => item.status === "Out of Stock").length;

  return (
    <div className="inventory-demo-container animate-fade-in">
      <div className="page-header">
        <h2 className="page-title">Inventory Management System</h2>
        <p className="page-subtitle">Interactive simulation of a Java/MySQL stock administration application, with real-time SQL console tracking.</p>
      </div>

      {/* KPI Stats */}
      <div className="stat-grid">
        <div className="glass-card stat-card border-inventory">
          <div className="stat-label">Total Value (USD)</div>
          <div className="stat-value text-inventory">${totalValue.toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 2 })}</div>
          <div className="stat-desc">Aggregated live pricing</div>
        </div>
        <div className="glass-card stat-card border-inventory">
          <div className="stat-label">Total Stock Items</div>
          <div className="stat-value">{totalItemsCount}</div>
          <div className="stat-desc">Across {inventory.length} SKUs</div>
        </div>
        <div className="glass-card stat-card border-inventory-warn">
          <div className="stat-label">Low Stock Alerts</div>
          <div className="stat-value text-warning">{lowStockCount}</div>
          <div className="stat-desc">Quantity less than 10</div>
        </div>
        <div className="glass-card stat-card border-inventory-danger">
          <div className="stat-label">Out of Stock</div>
          <div className="stat-value text-danger">{outOfStockCount}</div>
          <div className="stat-desc">Requires immediate reorder</div>
        </div>
      </div>

      <div className="inventory-dashboard-layout">
        {/* Inventory Control Table */}
        <div className="glass-card inventory-table-section">
          <div className="section-title-row">
            <h3>Active Stock Ledger</h3>
            <div className="btn-group">
              <button className="btn btn-secondary btn-icon" onClick={resetInventory} title="Reset Ledger">
                <RotateCcw size={16} />
              </button>
              <button className="btn btn-primary" onClick={() => setShowAddForm(!showAddForm)}>
                <Plus size={16} /> Add Item
              </button>
              <button className="btn btn-secondary" onClick={() => setShowReport(true)}>
                <FileText size={16} /> Generate Report
              </button>
            </div>
          </div>

          {showAddForm && (
            <form onSubmit={handleAddItem} className="add-item-form animate-fade-in">
              <div className="form-grid">
                <div className="form-group">
                  <label>Item Name</label>
                  <input type="text" placeholder="e.g. Intel Core i7 14700K" value={newItem.name} onChange={e => setNewItem({...newItem, name: e.target.value})} required />
                </div>
                <div className="form-group">
                  <label>SKU</label>
                  <input type="text" placeholder="e.g. IN-14700K" value={newItem.sku} onChange={e => setNewItem({...newItem, sku: e.target.value})} required />
                </div>
                <div className="form-group">
                  <label>Quantity</label>
                  <input type="number" min="0" placeholder="e.g. 50" value={newItem.quantity} onChange={e => setNewItem({...newItem, quantity: e.target.value})} required />
                </div>
                <div className="form-group">
                  <label>Unit Price ($)</label>
                  <input type="number" step="0.01" min="0" placeholder="e.g. 389.99" value={newItem.price} onChange={e => setNewItem({...newItem, price: e.target.value})} required />
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
                <button type="submit" className="btn btn-primary">Create Item</button>
              </div>
            </form>
          )}

          <div className="table-responsive">
            <table className="inventory-table">
              <thead>
                <tr>
                  <th>SKU / Name</th>
                  <th>Supplier</th>
                  <th>Quantity</th>
                  <th>Price</th>
                  <th>Status</th>
                  <th>Actions</th>
                </tr>
              </thead>
              <tbody>
                {inventory.length === 0 ? (
                  <tr>
                    <td colSpan="6" className="empty-table-cell">No items in inventory. Add an item or reset ledger.</td>
                  </tr>
                ) : (
                  inventory.map(item => (
                    <tr key={item.id} className={item.status === 'Out of Stock' ? 'row-out-of-stock' : item.status === 'Low Stock' ? 'row-low-stock' : ''}>
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
                          {item.status === 'Low Stock' && <AlertTriangle size={12} className="badge-icon" />}
                          {item.status}
                        </span>
                      </td>
                      <td>
                        <button className="delete-action-btn" onClick={() => handleDeleteItem(item.id, item.name)}>
                          <Trash2 size={16} />
                        </button>
                      </td>
                    </tr>
                  ))
                )}
              </tbody>
            </table>
          </div>
        </div>

        {/* Database Logging Console */}
        <div className="glass-card sql-console-section">
          <div className="section-title-row">
            <h3 className="console-title">
              <Database size={16} className="text-inventory" /> MySQL Database Logs
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
            Simulation captures Java JDBC drivers issuing CRUD operations to MySQL InnoDB database dynamically.
          </div>
        </div>
      </div>

      {/* Interactive Report Modal */}
      {showReport && (
        <div className="report-modal-overlay animate-fade-in" onClick={() => setShowReport(false)}>
          <div className="glass-card report-modal-content" onClick={e => e.stopPropagation()}>
            <div className="modal-header">
              <h3>Inventory Audit Report</h3>
              <button className="modal-close-btn" onClick={() => setShowReport(false)}>&times;</button>
            </div>
            <div className="modal-body">
              <div className="report-meta">
                <div><strong>Date Generated:</strong> {new Date().toLocaleDateString()}</div>
                <div><strong>System Operator:</strong> Academic Faculty Simulator</div>
              </div>
              
              <div className="report-summary-boxes">
                <div className="summary-box">
                  <h4>Total Valuation</h4>
                  <p>${totalValue.toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 2 })}</p>
                </div>
                <div className="summary-box">
                  <h4>Active SKUs</h4>
                  <p>{inventory.length}</p>
                </div>
                <div className="summary-box">
                  <h4>Out of Stock Alert</h4>
                  <p className={outOfStockCount > 0 ? "text-danger" : ""}>{outOfStockCount}</p>
                </div>
              </div>

              <div className="report-charts-grid">
                <div>
                  <h4 className="chart-title">Supplier Share (by SKU count)</h4>
                  <div className="mock-bar-chart">
                    {suppliersList.map(s => {
                      const count = inventory.filter(i => i.supplier === s).length;
                      const pct = inventory.length > 0 ? (count / inventory.length) * 100 : 0;
                      return (
                        <div key={s} className="bar-row">
                          <span className="bar-label">{s.split(' ')[0]}</span>
                          <div className="bar-track">
                            <div className="bar-fill bg-inventory" style={{ width: `${pct}%` }}></div>
                          </div>
                          <span className="bar-value">{count}</span>
                        </div>
                      );
                    })}
                  </div>
                </div>
                <div>
                  <h4 className="chart-title">Stock Status Distributions</h4>
                  <div className="mock-pie-bars">
                    {[
                      { label: "In Stock", value: inventory.filter(i => i.status === "In Stock").length, color: "var(--color-security)" },
                      { label: "Low Stock", value: lowStockCount, color: "var(--color-warning)" },
                      { label: "Out of Stock", value: outOfStockCount, color: "var(--color-danger)" }
                    ].map(st => {
                      const pct = inventory.length > 0 ? (st.value / inventory.length) * 100 : 0;
                      return (
                        <div key={st.label} className="bar-row">
                          <span className="bar-label">{st.label}</span>
                          <div className="bar-track">
                            <div className="bar-fill" style={{ width: `${pct}%`, backgroundColor: st.color }}></div>
                          </div>
                          <span className="bar-value">{st.value}</span>
                        </div>
                      );
                    })}
                  </div>
                </div>
              </div>

              <div className="report-note">
                <strong>Simulated Testing Note:</strong> Automating this reporting framework via background jobs cut manual reconciliation auditing overhead by <strong>60%</strong> in simulation scripts.
              </div>
            </div>
            <div className="modal-footer">
              <button className="btn btn-secondary" onClick={() => setShowReport(false)}>Close</button>
              <button className="btn btn-primary" onClick={() => alert("Report downloaded successfully (Simulated PDF download)")}>
                Download PDF Audit
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
