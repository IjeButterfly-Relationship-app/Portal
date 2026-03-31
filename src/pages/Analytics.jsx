import React, { useState } from "react";
import {
  BarChart,
  Bar,
  PieChart,
  Pie,
  Cell,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from "recharts";
import "../styles/Analytics.css";

const AnalyticsGrowth = () => {
  const [timeRange, setTimeRange] = useState("12months");
  const [dateRange, setDateRange] = useState("custom");

  // Mock data for Subscription Conversion Funnel
  const funnelData = [
    { name: "Awareness", value: 100, percentage: 100 },
    { name: "Interest", value: 84.4, percentage: 84.4 },
    { name: "Consideration", value: 54.6, percentage: 54.6 },
    { name: "Conversion", value: 27.9, percentage: 27.9 },
  ];

  // Mock data for Matching Quality (Pie Chart)
  const matchingQualityData = [
    { name: "Highly Successful", value: 45, color: "#4CAF50" },
    { name: "Successful", value: 30, color: "#FFC107" },
    { name: "Needs Review", value: 15, color: "#FF9800" },
    { name: "Not Successful", value: 10, color: "#F44336" },
  ];

  // Mock data for Cohort Retention Analysis
  const cohortData = [
    {
      cohort: "Jan 2023",
      month_0: "100%",
      month_1: "78%",
      month_2: "65%",
      month_3: "52%",
      month_4: "48%",
      month_5: "41%",
      month_6: "35%",
    },
    {
      cohort: "Feb 2023",
      month_0: "100%",
      month_1: "72%",
      month_2: "61%",
      month_3: "50%",
      month_4: "44%",
      month_5: "38%",
    },
    {
      cohort: "Mar 2023",
      month_0: "100%",
      month_1: "75%",
      month_2: "62%",
      month_3: "51%",
      month_4: "46%",
    },
    {
      cohort: "Apr 2023",
      month_0: "100%",
      month_1: "68%",
      month_2: "55%",
      month_3: "43%",
    },
    {
      cohort: "May 2023",
      month_0: "100%",
      month_1: "70%",
      month_2: "58%",
    },
    {
      cohort: "Jun 2023",
      month_0: "100%",
      month_1: "65%",
    },
  ];

  const getRetentionColor = (value) => {
    const percentage = parseInt(value);
    if (percentage >= 75) return "#1DB854";
    if (percentage >= 50) return "#69F0AE";
    if (percentage >= 25) return "#FFE082";
    return "#FFAB91";
  };

  return (
    <div className="ag-container">
      {/* Header Section */}
      <div className="ag-header">
        <div className="ag-header-content">
          <h1 className="ag-title">Analytics & Growth</h1>
          <p className="ag-subtitle">
            Comprehensive insights into conversion funnels, user retention, and
            platform matching health
          </p>
        </div>

        {/* Controls */}
        <div className="ag-controls">
          <div className="ag-control-group">
            <label htmlFor="time-range" className="ag-label">
              Last 12 Months
            </label>
            <select
              id="time-range"
              className="ag-select"
              value={timeRange}
              onChange={(e) => setTimeRange(e.target.value)}
            >
              <option value="7days">Last 7 Days</option>
              <option value="30days">Last 30 Days</option>
              <option value="3months">Last 3 Months</option>
              <option value="12months">Last 12 Months</option>
              <option value="custom">Custom Range</option>
            </select>
          </div>

          <div className="ag-button-group">
            <button
              className={`ag-btn ag-btn-secondary ${dateRange === "today" ? "active" : ""}`}
              onClick={() => setDateRange("today")}
            >
              Today
            </button>
            <button
              className={`ag-btn ag-btn-secondary ${dateRange === "custom" ? "active" : ""}`}
              onClick={() => setDateRange("custom")}
            >
              Previous Body
            </button>
            <button className="ag-btn ag-btn-secondary">Share Analysis</button>
          </div>
        </div>
      </div>

      {/* Metrics Cards */}
      <div className="ag-metrics">
        <div className="ag-metric-card">
          <div className="ag-metric-header">
            <h3 className="ag-metric-title">Platform Health Score</h3>
            <span className="ag-metric-badge">+2.5%</span>
          </div>
          <div className="ag-metric-value">15.4%</div>
          <p className="ag-metric-description">
            Overall platform performance score
          </p>
        </div>

        <div className="ag-metric-card">
          <div className="ag-metric-header">
            <h3 className="ag-metric-title">Matching Success Rate</h3>
            <span className="ag-metric-badge">↑ 6.2</span>
          </div>
          <div className="ag-metric-value">8.2 / 10</div>
          <p className="ag-metric-description">
            User satisfaction with matches
          </p>
        </div>

        <div className="ag-metric-card">
          <div className="ag-metric-header">
            <h3 className="ag-metric-title">Active Subscriptions</h3>
            <span className="ag-metric-badge">+215 est</span>
          </div>
          <div className="ag-metric-value">1,248</div>
          <p className="ag-metric-description">Currently active memberships</p>
        </div>
      </div>

      {/* Charts Section */}
      <div className="ag-charts-section">
        {/* Left Column - Funnel Chart */}
        <div className="ag-chart-container ag-chart-funnel">
          <div className="ag-chart-header">
            <h2 className="ag-chart-title">Subscription Conversion Funnel</h2>
            <p className="ag-chart-description">
              User journey from awareness to subscription
            </p>
          </div>

          <div className="ag-funnel-chart">
            {funnelData.map((item, index) => (
              <div key={index} className="ag-funnel-bar-wrapper">
                <div className="ag-funnel-bar-info">
                  <span className="ag-funnel-stage">{item.name}</span>
                  <span className="ag-funnel-percentage">
                    {item.percentage.toFixed(1)}%
                  </span>
                </div>
                <div className="ag-funnel-bar-container">
                  <div
                    className="ag-funnel-bar"
                    style={{
                      width: `${item.value}%`,
                      backgroundColor: `hsl(${240 - index * 20}, 70%, 50%)`,
                    }}
                  />
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Right Column - Pie Chart */}
        <div className="ag-chart-container ag-chart-pie">
          <div className="ag-chart-header">
            <h2 className="ag-chart-title">Matching Quality</h2>
            <p className="ag-chart-description">
              Distribution of match quality ratings
            </p>
          </div>

          <div className="ag-pie-wrapper">
            <ResponsiveContainer width="100%" height={280}>
              <PieChart>
                <Pie
                  data={matchingQualityData}
                  cx="50%"
                  cy="50%"
                  innerRadius={60}
                  outerRadius={100}
                  dataKey="value"
                  startAngle={180}
                  endAngle={0}
                >
                  {matchingQualityData.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={entry.color} />
                  ))}
                </Pie>
              </PieChart>
            </ResponsiveContainer>

            <div className="ag-pie-legend">
              {matchingQualityData.map((item, index) => (
                <div key={index} className="ag-pie-legend-item">
                  <span
                    className="ag-pie-legend-color"
                    style={{ backgroundColor: item.color }}
                  />
                  <span className="ag-pie-legend-label">{item.name}</span>
                  <span className="ag-pie-legend-value">{item.value}%</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Cohort Retention Table */}
      <div className="ag-cohort-section">
        <div className="ag-cohort-header">
          <h2 className="ag-cohort-title">
            Cohort Retention Analysis (6 Months)
          </h2>
          <div className="ag-cohort-controls">
            <button className="ag-cohort-btn">Export</button>
            <button className="ag-cohort-btn">Details</button>
          </div>
        </div>

        <div className="ag-cohort-table-wrapper">
          <table className="ag-cohort-table">
            <thead>
              <tr>
                <th>Cohort Month</th>
                <th>Month 0</th>
                <th>Month 1</th>
                <th>Month 2</th>
                <th>Month 3</th>
                <th>Month 4</th>
                <th>Month 5</th>
                <th>Month 6</th>
              </tr>
            </thead>
            <tbody>
              {cohortData.map((row, rowIndex) => (
                <tr key={rowIndex}>
                  <td className="ag-cohort-label">{row.cohort}</td>
                  <td
                    style={{ backgroundColor: getRetentionColor(row.month_0) }}
                  >
                    {row.month_0}
                  </td>
                  <td
                    style={{ backgroundColor: getRetentionColor(row.month_1) }}
                  >
                    {row.month_1}
                  </td>
                  {row.month_2 && (
                    <td
                      style={{
                        backgroundColor: getRetentionColor(row.month_2),
                      }}
                    >
                      {row.month_2}
                    </td>
                  )}
                  {row.month_3 && (
                    <td
                      style={{
                        backgroundColor: getRetentionColor(row.month_3),
                      }}
                    >
                      {row.month_3}
                    </td>
                  )}
                  {row.month_4 && (
                    <td
                      style={{
                        backgroundColor: getRetentionColor(row.month_4),
                      }}
                    >
                      {row.month_4}
                    </td>
                  )}
                  {row.month_5 && (
                    <td
                      style={{
                        backgroundColor: getRetentionColor(row.month_5),
                      }}
                    >
                      {row.month_5}
                    </td>
                  )}
                  {row.month_6 && (
                    <td
                      style={{
                        backgroundColor: getRetentionColor(row.month_6),
                      }}
                    >
                      {row.month_6}
                    </td>
                  )}
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Footer */}
      <div className="ag-footer">
        <p>&copy; 2024 Analytics Suite. All rights reserved.</p>
        <div className="ag-footer-links">
          <a href="#privacy">Privacy Policy</a>
          <a href="#terms">Terms of Service</a>
          <a href="#support">Support Center</a>
        </div>
      </div>
    </div>
  );
};

export default AnalyticsGrowth;
