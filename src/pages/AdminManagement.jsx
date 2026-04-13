import { useState, useRef, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import "../styles/AdminManagement.css";

const ADMINS = [
  {
    id: 1,
    name: "Sarah Nakato",
    email: "sarah.nakato@admincore.io",
    role: "Concierge Admin",
    dept: "Kampala",
    department: "Customer Experience",
    status: "Active",
    lastActive: "Active now",
    avatar: "https://i.pravatar.cc/40?img=5",
  },
  {
    id: 2,
    name: "Kwame Mensah",
    email: "kwame.am@admincore.io",
    role: "Moderator",
    dept: "Accra",
    department: "Trust & Safety",
    status: "Active",
    lastActive: "5 min ago",
    avatar: "https://i.pravatar.cc/40?img=11",
  },
  {
    id: 3,
    name: "Tunde Adesanya",
    email: "tunde.ads@admincore.io",
    role: "Tech Admin",
    dept: "Lagos",
    department: "Engineering",
    status: "Suspended",
    lastActive: "1 hour ago",
    avatar: "https://i.pravatar.cc/40?img=12",
  },
  {
    id: 4,
    name: "Fatima Osei",
    email: "fatima.osei@admincore.io",
    role: "Data Analyst",
    dept: "Nairobi",
    department: "Analytics",
    status: "Active",
    lastActive: "3 hours ago",
    avatar: "https://i.pravatar.cc/40?img=9",
  },
  {
    id: 5,
    name: "Amara Okonkwo",
    email: "amara.okonk@admincore.io",
    role: "Concierge Admin",
    dept: "Abuja",
    department: "Customer Experience",
    status: "Active",
    lastActive: "Yesterday",
    avatar: "https://i.pravatar.cc/40?img=16",
  },
];

const ROLE_COLORS = {
  "Concierge Admin": "role--concierge",
  Moderator: "role--moderator",
  "Tech Admin": "role--tech",
  "Data Analyst": "role--analyst",
};

const navItems = [
  { id: "dashboard", label: "Dashboard", icon: "" },
  { id: "users", label: "Users", icon: "" },
  { id: "reports", label: "Reports", icon: "" },
  { id: "messages", label: "Messages", icon: "" },
  { id: "analytics", label: "Analytics", icon: "" },
  { id: "settings", label: "Settings", icon: "" },
];

export default function AdminManagement() {
  const navigate = useNavigate();
  const [activeNav, setActiveNav] = useState("dashboard");
  const [admins, setAdmins] = useState(ADMINS);
  const [selected, setSelected] = useState([]);
  const [openMenu, setOpenMenu] = useState(null);
  const [confirmRemove, setConfirmRemove] = useState(null);
  const [search, setSearch] = useState("");
  const [roleFilter, setRoleFilter] = useState("Role");
  const [deptFilter, setDeptFilter] = useState("Department");
  const [statusFilter, setStatusFilter] = useState("Status");
  const [currentPage, setCurrentPage] = useState(1);
  const [bulkOpen, setBulkOpen] = useState(false);
  const menuRef = useRef(null);

  // Close dropdown on outside click
  useEffect(() => {
    function handle(e) {
      if (menuRef.current && !menuRef.current.contains(e.target)) {
        setOpenMenu(null);
      }
    }
    document.addEventListener("mousedown", handle);
    return () => document.removeEventListener("mousedown", handle);
  }, []);

  const filteredAdmins = admins.filter((a) => {
    const matchSearch =
      a.name.toLowerCase().includes(search.toLowerCase()) ||
      a.email.toLowerCase().includes(search.toLowerCase());
    const matchRole = roleFilter === "Role" || a.role === roleFilter;
    const matchDept = deptFilter === "Department" || a.dept === deptFilter;
    const matchStatus = statusFilter === "Status" || a.status === statusFilter;
    return matchSearch && matchRole && matchDept && matchStatus;
  });

  const allChecked =
    filteredAdmins.length > 0 &&
    filteredAdmins.every((a) => selected.includes(a.id));

  function toggleAll() {
    if (allChecked) {setSelected([]);}
    else {setSelected(filteredAdmins.map((a) => a.id));}
  }

  function toggleOne(id) {
    setSelected((prev) =>
      prev.includes(id) ? prev.filter((x) => x !== id) : [...prev, id],
    );
  }

  function handleRemove(admin) {
    setConfirmRemove(admin);
    setOpenMenu(null);
  }

  function confirmDoRemove() {
    setAdmins((prev) => prev.filter((a) => a.id !== confirmRemove.id));
    setSelected((prev) => prev.filter((id) => id !== confirmRemove.id));
    setConfirmRemove(null);
  }

  function removeSelected() {
    setAdmins((prev) => prev.filter((a) => !selected.includes(a.id)));
    setSelected([]);
    setBulkOpen(false);
  }

  const pages = [1, 2, 3, 4, "...", 10];

  return (
    <div className="admin-management-layout">
      {/* Sidebar */}
      <aside className="mod-sidebar">
        <div className="mod-sidebar-header">
          <div className="mod-logo">
            <span className="mod-logo-icon"></span>
            <span className="mod-logo-text">Butterfly</span>
          </div>
        </div>

        <div className="mod-sidebar-section">
          <div className="mod-sidebar-label">CORE OPERATIONS</div>
          <nav className="mod-sidebar-nav">
            {navItems.map((item) => (
              <div
                key={item.id}
                className={`mod-nav-item ${activeNav === item.label ? "active" : ""}`}
                onClick={() => {
                  setActiveNav(item.label);
                  if (item.label === "Dashboard") {navigate("/dashboard");}
                }}
              >
                <span className="mod-nav-icon">{item.icon}</span>
                <span className="mod-nav-label">{item.label}</span>
              </div>
            ))}
          </nav>
        </div>

        <div className="mod-sidebar-footer">
          <button className="mod-logout-btn">
            <span>↪</span> Logout
          </button>
        </div>
      </aside>

      {/* Main Content */}
      <main className="admin-main">
        <div className="am-root">
          {/* ── Header ── */}
          <header className="am-header">
            <div className="am-logo">
              <div className="am-logo-mark">
                <span></span>
              </div>
            </div>
            <div className="am-search-wrap">
              <span className="am-search-ico">🔍</span>
              <input className="am-search-global" placeholder="Search admin..." />
            </div>
            <div className="am-header-right">
              <button className="am-icon-btn" aria-label="Notifications">
                🔔
              </button>
              <button className="am-icon-btn" aria-label="Settings">
                ⚙️
              </button>
              <div className="am-super-admin">
                <div className="am-super-info">
                  <span className="am-super-name">Super Admin</span>
                  <span className="am-super-email">alex.kirabo@admincore.io</span>
                </div>
                <img
                  src="https://i.pravatar.cc/36?img=3"
                  alt="Super Admin"
                  className="am-super-avatar"
                />
              </div>
            </div>
          </header>

          <div className="am-page">
            {/* ── Page title ── */}
            <div className="am-title-row">
              <div>
                <h1 className="am-title">Admin Management</h1>
                <p className="am-subtitle">
              Manage admin accounts and their access permissions.
                </p>
              </div>
              <div className="am-title-actions">
                <button className="am-btn am-btn--outline">Cancel</button>
                <button className="am-btn am-btn--primary">
              Add Admin <span>▾</span>
                </button>
              </div>
            </div>

            {/* ── Table card ── */}
            <div className="am-card">
              {/* Toolbar */}
              <div className="am-toolbar">
                <div className="am-toolbar-left">
                  {/* Bulk actions */}
                  <div className="am-dropdown-wrap">
                    <button
                      className="am-btn am-btn--purple"
                      onClick={() => setBulkOpen((v) => !v)}
                      data-testid="bulk-actions-btn"
                    >
                  Bulk Actions <span>▾</span>
                    </button>
                    {bulkOpen && (
                      <div className="am-dropdown am-dropdown--bulk">
                        <button
                          className="am-dropdown-item am-dropdown-item--danger"
                          onClick={removeSelected}
                          data-testid="remove-selected-btn"
                        >
                      🗑 Remove Selected
                        </button>
                      </div>
                    )}
                  </div>

                  {/* Best Actions */}
                  <button className="am-filter-btn">
                    <span className="am-filter-ico">$</span> Best Actions{" "}
                    <span>▾</span>
                  </button>

                  {/* Role filter */}
                  <select
                    className="am-filter-btn"
                    value={roleFilter}
                    onChange={(e) => setRoleFilter(e.target.value)}
                    data-testid="role-filter"
                  >
                    <option>Role</option>
                    {[...new Set(ADMINS.map((a) => a.role))].map((r) => (
                      <option key={r}>{r}</option>
                    ))}
                  </select>

                  {/* Dept filter */}
                  <select
                    className="am-filter-btn"
                    value={deptFilter}
                    onChange={(e) => setDeptFilter(e.target.value)}
                    data-testid="dept-filter"
                  >
                    <option>Department</option>
                    {[...new Set(ADMINS.map((a) => a.dept))].map((d) => (
                      <option key={d}>{d}</option>
                    ))}
                  </select>

                  {/* Status filter */}
                  <select
                    className="am-filter-btn"
                    value={statusFilter}
                    onChange={(e) => setStatusFilter(e.target.value)}
                    data-testid="status-filter"
                  >
                    <option>Status</option>
                    <option>Active</option>
                    <option>Suspended</option>
                  </select>
                </div>

                {/* Inline search */}
                <div className="am-inline-search">
                  <span>🔍</span>
                  <input
                    placeholder="Search..."
                    value={search}
                    onChange={(e) => setSearch(e.target.value)}
                    data-testid="inline-search"
                  />
                </div>
              </div>

              {/* Remove Selected bar */}
              {selected.length > 0 && (
                <div className="am-remove-bar">
                  <button
                    className="am-remove-selected-btn"
                    onClick={removeSelected}
                    data-testid="remove-selected-bar-btn"
                  >
                🗑 Remove Selected
                  </button>
                </div>
              )}

              {/* Table */}
              <div className="am-table-wrap">
                <table className="am-table">
                  <thead>
                    <tr>
                      <th className="am-th am-th--check">
                        <input
                          type="checkbox"
                          checked={allChecked}
                          onChange={toggleAll}
                          data-testid="select-all"
                          className="am-checkbox"
                        />
                      </th>
                      <th className="am-th">
                    ADMIN <span className="am-sort-ico">↓</span>
                      </th>
                      <th className="am-th">ROLE</th>
                      <th className="am-th">DEPT</th>
                      <th className="am-th">DEPARTMENT</th>
                      <th className="am-th">STATUS</th>
                      <th className="am-th">LAST ACTIVE</th>
                      <th className="am-th am-th--actions">ACTIONS</th>
                    </tr>
                  </thead>
                  <tbody>
                    {filteredAdmins.map((admin) => (
                      <tr
                        key={admin.id}
                        className={`am-tr ${selected.includes(admin.id) ? "am-tr--selected" : ""}`}
                        data-testid={`row-${admin.id}`}
                      >
                        <td className="am-td am-td--check">
                          <input
                            type="checkbox"
                            className="am-checkbox"
                            checked={selected.includes(admin.id)}
                            onChange={() => toggleOne(admin.id)}
                            data-testid={`check-${admin.id}`}
                          />
                        </td>
                        <td className="am-td">
                          <div className="am-admin-cell">
                            <img
                              src={admin.avatar}
                              alt={admin.name}
                              className="am-row-avatar"
                            />
                            <div>
                              <div className="am-admin-name">{admin.name}</div>
                              <div className="am-admin-email">{admin.email}</div>
                            </div>
                          </div>
                        </td>
                        <td className="am-td">
                          <span
                            className={`am-role-badge ${ROLE_COLORS[admin.role] || ""}`}
                          >
                            {admin.role}
                          </span>
                        </td>
                        <td className="am-td am-td--dept">{admin.dept}</td>
                        <td className="am-td">
                          <div
                            className={`am-status-dot-row ${admin.status === "Suspended" ? "am-status--suspended" : ""}`}
                          >
                            {admin.status === "Suspended" ? (
                              <span className="am-status-ico am-status-ico--suspended">
                            ⊕
                              </span>
                            ) : (
                              <span className="am-status-ico am-status-ico--active">
                            ✔
                              </span>
                            )}
                            <span>{admin.status}</span>
                          </div>
                        </td>
                        <td className="am-td">
                          <span
                            className={`am-pill ${admin.status === "Suspended" ? "am-pill--suspended" : "am-pill--active"}`}
                          >
                            <span className="am-pill-dot" />
                            {admin.status}
                          </span>
                        </td>
                        <td className="am-td am-td--last">{admin.lastActive}</td>
                        <td
                          className="am-td am-td--actions"
                          ref={openMenu === admin.id ? menuRef : null}
                        >
                          <div className="am-action-wrap">
                            <button
                              className="am-three-dots"
                              onClick={() =>
                                setOpenMenu((v) =>
                                  v === admin.id ? null : admin.id,
                                )
                              }
                              data-testid={`menu-btn-${admin.id}`}
                              aria-label="Actions menu"
                            >
                          ···
                            </button>
                            {openMenu === admin.id && (
                              <div
                                className="am-context-menu"
                                data-testid={`menu-${admin.id}`}
                              >
                                <button className="am-ctx-item">
                                  <span></span> Edit
                                </button>
                                <button className="am-ctx-item">
                                  <span></span> Suspend
                                </button>
                                <button
                                  className="am-ctx-item am-ctx-item--danger"
                                  onClick={() => handleRemove(admin)}
                                  data-testid={`remove-btn-${admin.id}`}
                                >
                                  <span>🗑</span> Remove
                                </button>
                                <button className="am-ctx-item">
                                  <span>🔑</span> Reset Password
                                </button>
                              </div>
                            )}
                          </div>
                        </td>
                      </tr>
                    ))}
                    {filteredAdmins.length === 0 && (
                      <tr>
                        <td colSpan={8} className="am-empty">
                      No admins match your filters.
                        </td>
                      </tr>
                    )}
                  </tbody>
                </table>
              </div>

              {/* Footer */}
              <div className="am-table-footer">
                <span className="am-count">
              Showing {filteredAdmins.length} of 50 administrative accounts
                </span>
                <div className="am-pagination">
                  <button
                    className="am-page-btn"
                    onClick={() => setCurrentPage((p) => Math.max(1, p - 1))}
                  >
                ‹ Previous
                  </button>
                  {pages.map((p, i) => (
                    <button
                      key={i}
                      className={`am-page-num ${currentPage === p ? "active" : ""}`}
                      onClick={() => typeof p === "number" && setCurrentPage(p)}
                      data-testid={`page-${p}`}
                    >
                      {p}
                    </button>
                  ))}
                  <button
                    className="am-page-btn"
                    onClick={() => setCurrentPage((p) => Math.min(10, p + 1))}
                  >
                Next ›
                  </button>
                </div>
              </div>
            </div>
          </div>

          {/* ── Confirm Remove Modal ── */}
          {confirmRemove && (
            <div
              className="am-overlay"
              onClick={() => setConfirmRemove(null)}
              data-testid="confirm-overlay"
            >
              <div
                className="am-confirm-modal"
                onClick={(e) => e.stopPropagation()}
                data-testid="confirm-modal"
              >
                <h3 className="am-confirm-title">Remove {confirmRemove.name}?</h3>
                <p className="am-confirm-body">
              Are you sure you want to remove {confirmRemove.name}? This action
              cannot be undone.
                </p>
                <div className="am-confirm-actions">
                  <button
                    className="am-btn am-btn--outline"
                    onClick={() => setConfirmRemove(null)}
                    data-testid="cancel-remove"
                  >
                Cancel
                  </button>
                  <button
                    className="am-btn am-btn--danger"
                    onClick={confirmDoRemove}
                    data-testid="confirm-remove"
                  >
                Remove
                  </button>
                </div>
              </div>
            </div>
          )}

          {/* ── Footer ── */}
          <footer className="am-footer">© 2026 Butterfly Ijeoma Limited</footer>
        </div>
      </main>
    </div>
  );
}
