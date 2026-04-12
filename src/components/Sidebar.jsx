import { NavLink, useNavigate } from "react-router-dom";
import "../styles/Sidebar.css";

const Sidebar = () => {
  const navigate = useNavigate();

  const menuItems = [
    { path: "/moderation", label: "Moderation" },
    { path: "/analytics", label: "Analytics" },
    { path: "/billing", label: "Billing" },
    { path: "/security", label: "Security & APIs" },
    { path: "/policies", label: "Policies" },
    { path: "/activity-logs", label: "Activity Logs" },
  ];

  const handleLogout = () => {
    // Add your logout logic here
    navigate("/login");
  };

  return (
    <aside className="sidebar">
      <div className="sidebar__header">
        <img
          src="/butterfly-logo.png"
          alt="Amoura"
          className="sidebar__logo-img"
        />
        <span className="sidebar__logo-text">
          Amoura<sup className="trademark">™</sup>
        </span>
      </div>

      <nav className="sidebar__nav">
        <p className="sidebar__section-title">CORE OPERATIONS</p>
        <ul className="sidebar__menu">
          {menuItems.map((item) => (
            <li key={item.path}>
              <NavLink
                to={item.path}
                className={({ isActive }) =>
                  isActive
                    ? "sidebar__link sidebar__link--active"
                    : "sidebar__link"
                }
              >
                {item.label}
              </NavLink>
            </li>
          ))}
        </ul>
      </nav>

      <div className="sidebar__footer">
        <button className="sidebar__logout" onClick={handleLogout}>
          <svg
            width="18"
            height="18"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
          >
            <path d="M9 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h4"></path>
            <polyline points="16,17 21,12 16,7"></polyline>
            <line x1="21" y1="12" x2="9" y2="12"></line>
          </svg>
          Logout
        </button>
      </div>
    </aside>
  );
};

export default Sidebar;
