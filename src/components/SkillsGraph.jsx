import React, { useState } from 'react';
import { Network, HelpCircle } from 'lucide-react';
import { skillsGraph } from '../data/mockData';
import './SkillsGraph.css';

export default function SkillsGraph() {
  const [hoveredNode, setHoveredNode] = useState(null);

  const getGroupColor = (group) => {
    switch (group) {
      case 1: return '#06b6d4'; // Web Dev (Cyan)
      case 2: return '#38bdf8'; // Software Eng (Light Blue)
      case 3: return '#10b981'; // Cybersecurity (Emerald)
      case 4: return '#fbbf24'; // AI Integration (Amber)
      case 5: return '#f97316'; // Cloud Computing (Orange)
      case 6: return '#a855f7'; // Data Science (Purple)
      default: return 'var(--text-muted)';
    }
  };

  return (
    <div className="skills-graph-container animate-fade-in">
      <div className="glass-card skills-graph-card">
        <div className="section-title-row">
          <h3 className="graph-title-header">
            <Network size={18} className="text-cyan-glow" /> Academic Versatility & Skills Mapping
          </h3>
          <div className="graph-legend-list" style={{ flexWrap: 'wrap', gap: '8px 12px' }}>
            <span className="legend-item"><span className="legend-dot" style={{ backgroundColor: '#06b6d4' }}></span> Web Dev</span>
            <span className="legend-item"><span className="legend-dot" style={{ backgroundColor: '#38bdf8' }}></span> Software Eng</span>
            <span className="legend-item"><span className="legend-dot" style={{ backgroundColor: '#10b981' }}></span> Cybersecurity</span>
            <span className="legend-item"><span className="legend-dot" style={{ backgroundColor: '#fbbf24' }}></span> AI Integration</span>
            <span className="legend-item"><span className="legend-dot" style={{ backgroundColor: '#f97316' }}></span> Cloud Computing</span>
            <span className="legend-item"><span className="legend-dot" style={{ backgroundColor: '#a855f7' }}></span> Data Science</span>
          </div>
        </div>
        <p className="graph-subtitle">
          Hover over nodes to explore connection mappings across software design, security engineering, and data analysis.
        </p>

        <div className="graph-viewport-wrapper">
          <svg viewBox="0 0 1050 450" className="skills-svg-canvas">
            {/* Draw Links */}
            {skillsGraph.links.map((link, idx) => {
              const sourceNode = skillsGraph.nodes.find(n => n.id === link.source);
              const targetNode = skillsGraph.nodes.find(n => n.id === link.target);
              
              if (!sourceNode || !targetNode) return null;

              // Check if connection is active (either source or target hovered)
              const isActive = hoveredNode && 
                (hoveredNode.id === link.source || hoveredNode.id === link.target);

              return (
                <line
                  key={`link-${idx}`}
                  x1={sourceNode.x}
                  y1={sourceNode.y}
                  x2={targetNode.x}
                  y2={targetNode.y}
                  className={`graph-link-line ${isActive ? 'active-link' : ''}`}
                />
              );
            })}

            {/* Draw Nodes */}
            {skillsGraph.nodes.map(node => {
              const isHovered = hoveredNode?.id === node.id;
              const isDimmed = hoveredNode && !isHovered && 
                !skillsGraph.links.some(l => 
                  (l.source === node.id && l.target === hoveredNode.id) || 
                  (l.target === node.id && l.source === hoveredNode.id)
                );

              return (
                <g 
                  key={node.id} 
                  className={`graph-node-group ${isHovered ? 'node-hovered' : ''} ${isDimmed ? 'node-dimmed' : ''}`}
                  onMouseEnter={() => setHoveredNode(node)}
                  onMouseLeave={() => setHoveredNode(null)}
                >
                  {/* Glowing Node Halo */}
                  <circle
                    cx={node.x}
                    cy={node.y}
                    r={node.val / 2 + 8}
                    fill={getGroupColor(node.group)}
                    className="node-glow-halo"
                    opacity={isHovered ? 0.3 : 0.05}
                  />

                  {/* Core Node Circle */}
                  <circle
                    cx={node.x}
                    cy={node.y}
                    r={node.val / 2}
                    fill="#0f172a"
                    stroke={getGroupColor(node.group)}
                    strokeWidth={isHovered ? 3 : 2}
                    className="node-core-circle"
                  />

                  {/* Node Title Label */}
                  <text
                    x={node.x}
                    y={node.y + node.val / 2 + 16}
                    textAnchor="middle"
                    fill={isHovered ? 'var(--text-primary)' : 'var(--text-secondary)'}
                    fontSize="11"
                    fontWeight={isHovered ? 'bold' : '500'}
                    fontFamily="var(--font-heading)"
                  >
                    {node.id}
                  </text>
                </g>
              );
            })}
          </svg>
        </div>

        {/* Hover Detail Panel */}
        <div className="graph-node-detail-panel">
          {hoveredNode ? (
            <div className="detail-panel-active animate-fade-in" style={{ borderLeftColor: getGroupColor(hoveredNode.group) }}>
              <div className="panel-node-title">
                <span className="node-group-badge" style={{ backgroundColor: getGroupColor(hoveredNode.group) }}>
                  {hoveredNode.group === 1 ? "Web Development" 
                   : hoveredNode.group === 2 ? "Software Engineering" 
                   : hoveredNode.group === 3 ? "Cybersecurity" 
                   : hoveredNode.group === 4 ? "AI Integration" 
                   : hoveredNode.group === 5 ? "Cloud Computing" 
                   : "Data Science"}
                </span>
                <h4>{hoveredNode.id}</h4>
              </div>
              <p className="panel-node-desc">{hoveredNode.desc}</p>
            </div>
          ) : (
            <div className="detail-panel-empty">
              <HelpCircle size={16} className="text-muted" /> Hover over a skill node or project to map relations.
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
