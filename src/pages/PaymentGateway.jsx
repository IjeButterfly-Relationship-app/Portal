import React, { useState } from "react";
import Sidebar from "../components/Sidebar";
import "../styles/PaymentGateway.css";

const PaymentGatewaySettings = () => {
  const [searchTerm, setSearchTerm] = useState("");

  // Metric cards data
  const metrics = [
    {
      title: "Active Gateways",
      value: "4",
      change: null,
      status: null,
    },
    {
      title: "Recnetly Gateway",
      badge: { text: "Secure", color: "secure" },
      badgeSecond: { text: "Success", color: "success" },
      value: "MTN Mobile Money",
    },
    {
      title: "Failed Gateway Events",
      value: "3",
      change: null,
    },
    {
      title: "Payment Success",
      value: "98.7%",
      change: null,
    },
  ];

  // Active gateways data
  const gateways = [
    {
      id: 1,
      name: "MTN Mobile Money",
      subtext: "Mobile 0.245%",
      status: "Disabled",
      statusColor: "disabled",
      methods: "1",
      lastTransaction: "1 jan damage",
      action: "Make Default",
      actionType: "primary",
    },
    {
      id: 2,
      name: "Airtel Money",
      subtext: "Hotspots inc pac",
      status: "Outdated",
      statusColor: "outdated",
      mapping: "Uganda",
      methods: "2",
      lastTransaction: "6 mins anurda ugk",
      action: "Set Default",
      actionType: "secondary",
    },
    {
      id: 3,
      name: "Flutterwave",
      subtext: "Stripe psc Flamencka",
      status: "Outdated",
      statusColor: "outdated",
      methods: "1",
      lastTransaction: "2 mins ago",
      action: "Make Default",
      actionType: "primary",
    },
    {
      id: 4,
      name: "Stripe",
      subtext: "Interswitch Barracuda",
      status: "Disabled",
      statusColor: "disabled",
      methods: "3",
      lastTransaction: "5 mins ago",
      action: "View Logs",
      actionType: "secondary",
    },
  ];

  // Payment method availability
  const paymentMethods = [
    {
      gateway: "Mobile Money",
      method: "Card",
      volumeTarget: true,
      primary: true,
    },
    {
      gateway: "Card",
      method: "Card",
      volumeTarget: true,
      primary: true,
    },
    {
      gateway: "Wallet",
      method: "Card",
      volumeTarget: true,
      primary: false,
    },
  ];

  // Gateway health logs
  const healthLogs = [
    { name: "Mobile Vouchers", count: "1" },
    { name: "Tanesa Marts", count: "2" },
    { name: "Acct Palanse", count: "1" },
  ];

  // Gateway routing rules
  const routingRules = [
    {
      id: 1,
      name: "Uganda Mobile Payments: 12/my Tp",
      status: "Enabled",
      icon: "🔍",
    },
    {
      id: 2,
      name: "Bremen Annual Filuary -- 6",
      logs: "Show Logs",
      icon: "📄",
    },
  ];

  return (
    <div className="pg-app">
      <Sidebar activeItem="billing" />
      <main className="pg-main">
        <div className="pg-container">
          {/* Header */}
          <div className="pg-header">
            <div className="pg-header-content">
              <h1 className="pg-title">Payment Gateway Settings</h1>
            </div>
            <div className="pg-header-actions">
              <div className="pg-search-bar">
                <input
                  type="text"
                  placeholder="Search admins, or sitemap..."
                  className="pg-search-input"
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                />
              </div>
              <div className="pg-header-icons">
                <button className="pg-icon-btn">📅</button>
                <button className="pg-icon-btn">💬</button>
                <button className="pg-icon-btn">🔔</button>
                <div className="pg-avatar">👤</div>
              </div>
            </div>
          </div>

          {/* Metrics Cards */}
          <div className="pg-metrics">
            <div className="pg-metric-card">
              <h3 className="pg-metric-title">Active Gateways</h3>
              <div className="pg-metric-value">4</div>
              <div className="pg-metric-helper">Active Gateways</div>
            </div>

            <div className="pg-metric-card">
              <h3 className="pg-metric-title">Recnetly Gateway</h3>
              <div className="pg-metric-badges">
                <span className="pg-badge pg-badge-secure">Secure</span>
                <span className="pg-badge pg-badge-success">Success</span>
              </div>
              <div className="pg-metric-value">MTN Mobile Money</div>
            </div>

            <div className="pg-metric-card">
              <h3 className="pg-metric-title">Failed Gateway Events</h3>
              <div className="pg-metric-value">3</div>
              <div className="pg-metric-helper">Failed Gateway Events</div>
            </div>

            <div className="pg-metric-card">
              <h3 className="pg-metric-title">Payment Success</h3>
              <div className="pg-metric-value">98.7%</div>
              <div className="pg-metric-helper">Payment Success</div>
            </div>
          </div>

          {/* Active Gateways Section */}
          <div className="pg-section">
            <h2 className="pg-section-title">Active Gateways</h2>
            <div className="pg-gateways-grid">
              {gateways.map((gateway) => (
                <div key={gateway.id} className="pg-gateway-card">
                  <div className="pg-gateway-header">
                    <div className="pg-gateway-number">{gateway.id}</div>
                    <div className="pg-gateway-info">
                      <h3 className="pg-gateway-name">{gateway.name}</h3>
                      <p className="pg-gateway-subtext">{gateway.subtext}</p>
                    </div>
                  </div>

                  <div className="pg-gateway-row">
                    <span className="pg-row-label">Status</span>
                    <span
                      className={`pg-status pg-status-${gateway.statusColor}`}
                    >
                      ● {gateway.status}
                    </span>
                  </div>

                  {gateway.mapping && (
                    <div className="pg-gateway-row">
                      <span className="pg-row-label">Mapping</span>
                      <span className="pg-row-value">{gateway.mapping}</span>
                    </div>
                  )}

                  <div className="pg-gateway-row">
                    <span className="pg-row-label">Supported methods</span>
                    <span className="pg-row-value">{gateway.methods}</span>
                  </div>

                  <div className="pg-gateway-row">
                    <span className="pg-row-label">
                      Last successful transaction time
                    </span>
                    <span className="pg-row-value">
                      {gateway.lastTransaction}
                    </span>
                  </div>

                  <button
                    className={`pg-btn pg-btn-${gateway.actionType} pg-gateway-action`}
                  >
                    {gateway.action}
                  </button>
                </div>
              ))}
            </div>
          </div>

          {/* Two Column Section */}
          <div className="pg-two-column">
            {/* Payment Method Availability */}
            <div className="pg-section">
              <h2 className="pg-section-title">Payment Method Availability</h2>
              <table className="pg-table">
                <thead>
                  <tr>
                    <th>Gateway Status</th>
                    <th>Transaction Volume Target</th>
                    <th>Primary</th>
                  </tr>
                </thead>
                <tbody>
                  {paymentMethods.map((method, idx) => (
                    <tr key={idx}>
                      <td>{method.gateway}</td>
                      <td>{method.method}</td>
                      <td className="pg-table-check">
                        {method.volumeTarget && method.primary ? (
                          <span className="pg-check">✓</span>
                        ) : (
                          <span className="pg-uncheck">◯</span>
                        )}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>

            {/* Gateway Health / Logs */}
            <div className="pg-section">
              <h2 className="pg-section-title">Gateway Health / Logs</h2>
              <div className="pg-health-list">
                {healthLogs.map((log, idx) => (
                  <div key={idx} className="pg-health-item">
                    <span className="pg-health-name">{log.name}</span>
                    <span className="pg-health-count">{log.count}</span>
                  </div>
                ))}
              </div>
              <div className="pg-health-actions">
                <button className="pg-btn pg-btn-secondary pg-btn-full">
                  Restore Backups
                </button>
                <button className="pg-btn pg-btn-primary pg-btn-full">
                  Save Logs
                </button>
              </div>
              <p className="pg-health-note">
                Content is managed by Super admin only
              </p>
            </div>
          </div>

          {/* Gateway Routing Rules */}
          <div className="pg-section">
            <h2 className="pg-section-title">Gateway Routing Rules</h2>
            <div className="pg-rules-list">
              {routingRules.map((rule) => (
                <div key={rule.id} className="pg-rule-item">
                  <div className="pg-rule-content">
                    <span className="pg-rule-icon">{rule.icon}</span>
                    <span className="pg-rule-name">{rule.name}</span>
                  </div>
                  {rule.status ? (
                    <span className="pg-rule-status-enabled">
                      {rule.status}
                    </span>
                  ) : (
                    <button className="pg-rule-link">{rule.logs}</button>
                  )}
                </div>
              ))}
            </div>
          </div>

          {/* Footer */}
          <footer className="pg-footer">
            <p>&copy; 2024 Payment Gateway. All rights reserved.</p>
          </footer>
        </div>
      </main>
    </div>
  );
};

export default PaymentGatewaySettings;
