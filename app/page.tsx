"use client";

import { useCallback, useEffect, useMemo, useRef, useState } from "react";

type IconName = "grid" | "chart" | "clock" | "people" | "layers" | "search" | "download" | "chevron" | "arrow" | "menu" | "close" | "refresh" | "filter" | "external" | "signal";

function Icon({ name, size = 18 }: { name: IconName; size?: number }) {
  const common = { width: size, height: size, viewBox: "0 0 24 24", fill: "none", stroke: "currentColor", strokeWidth: 1.7, strokeLinecap: "round" as const, strokeLinejoin: "round" as const, "aria-hidden": true as const };
  const paths: Record<IconName, React.ReactNode> = {
    grid: <><rect x="3.5" y="3.5" width="7" height="7" rx="1.5"/><rect x="13.5" y="3.5" width="7" height="7" rx="1.5"/><rect x="3.5" y="13.5" width="7" height="7" rx="1.5"/><rect x="13.5" y="13.5" width="7" height="7" rx="1.5"/></>,
    chart: <><path d="M4 19.5V4.5M4 19.5h16"/><path d="m6.5 15.5 4-4 3 2 5-6"/><path d="M18.5 7.5v3h-3"/></>,
    clock: <><circle cx="12" cy="12" r="8.5"/><path d="M12 7v5l3.5 2"/></>,
    people: <><path d="M16 20v-1.6a3.4 3.4 0 0 0-3.4-3.4H7.4A3.4 3.4 0 0 0 4 18.4V20"/><circle cx="10" cy="8" r="3.4"/><path d="M17 4.8a3.3 3.3 0 0 1 0 6.4M20 20v-1.6a3.4 3.4 0 0 0-2.5-3.3"/></>,
    layers: <><path d="m12 3 8 4.5-8 4.5-8-4.5L12 3Z"/><path d="m4 12 8 4.5 8-4.5M4 16.5 12 21l8-4.5"/></>,
    search: <><circle cx="10.8" cy="10.8" r="6.8"/><path d="m16 16 4.5 4.5"/></>,
    download: <><path d="M12 3.5v11m0 0 4-4m-4 4-4-4"/><path d="M4 16.5v3a1 1 0 0 0 1 1h14a1 1 0 0 0 1-1v-3"/></>,
    chevron: <path d="m9 18 6-6-6-6"/>,
    arrow: <><path d="M5 12h14"/><path d="m13 6 6 6-6 6"/></>,
    menu: <><path d="M4 7h16M4 12h16M4 17h16"/></>,
    close: <><path d="m6 6 12 12M18 6 6 18"/></>,
    refresh: <><path d="M20 7v5h-5"/><path d="M19 12a7.5 7.5 0 1 1-2.1-5.2L20 9"/></>,
    filter: <><path d="M4 6h16M7 12h10m-7 6h4"/><circle cx="9" cy="6" r="1.5" fill="currentColor"/><circle cx="15" cy="12" r="1.5" fill="currentColor"/></>,
    external: <><path d="M14 4h6v6M20 4l-9 9"/><path d="M18 13v5a2 2 0 0 1-2 2H6a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h5"/></>,
    signal: <><path d="M3.5 15.5a12 12 0 0 1 17 0M6.5 18.5a7.8 7.8 0 0 1 11 0M9.5 21.5a3.6 3.6 0 0 1 5 0"/><circle cx="12" cy="11.5" r="1" fill="currentColor"/></>,
  };
  return <svg {...common}>{paths[name]}</svg>;
}

const navItems: { label: string; icon: IconName; href: string }[] = [
  { label: "Overview", icon: "grid", href: "#overview" },
  { label: "Revenue & CLV", icon: "chart", href: "#revenue" },
  { label: "Survival", icon: "clock", href: "#survival" },
  { label: "Customer segments", icon: "people", href: "#segments" },
  { label: "Service mix", icon: "layers", href: "#services" },
];

const customers = [
  { id: "C-008241", plan: "Month-to-month", tenure: "2 mo", service: "Fiber optic", monthly: 109.7, risk: 94, reason: "New customer · no security add-on", initials: "JD", hue: "lavender" },
  { id: "C-003914", plan: "Month-to-month", tenure: "4 mo", service: "Fiber optic", monthly: 96.4, risk: 88, reason: "High charges · support contact", initials: "MR", hue: "peach" },
  { id: "C-006572", plan: "Month-to-month", tenure: "3 mo", service: "DSL", monthly: 73.2, risk: 81, reason: "No tech support · paperless billing", initials: "AK", hue: "mint" },
  { id: "C-001185", plan: "One year", tenure: "8 mo", service: "Fiber optic", monthly: 112.9, risk: 72, reason: "Recent service issue · high monthly fee", initials: "SL", hue: "blue" },
  { id: "C-005043", plan: "Month-to-month", tenure: "1 mo", service: "Fiber optic", monthly: 89.6, risk: 68, reason: "New customer · no online security", initials: "PT", hue: "rose" },
];

// Keep the portfolio headline figures together so they are easy to replace
// when this demo is updated with verified project results.
const dashboardStats = {
  totalSubscribers: 7043,
  churnRate: 26.5,
  churnedSubscribers: 1869,
  monthlyRevenueAtRisk: 70.1,
  monthlyRecurringRevenue: 493.6,
  estimatedLifetimeValue: 1920,
  monthToMonthChurn: 42.7,
};

const retainedSubscribers = dashboardStats.totalSubscribers - dashboardStats.churnedSubscribers;
const retentionRate = 100 - dashboardStats.churnRate;

const monthly = {
  "30d": { labels: ["Jun 01", "Jun 05", "Jun 09", "Jun 13", "Jun 17", "Jun 21", "Jun 25", "Jun 30"], revenue: [61, 58, 65, 63, 72, 69, 76, 81], churn: [53, 56, 51, 55, 49, 52, 46, 43] },
  "90d": { labels: ["Apr 01", "Apr 13", "Apr 26", "May 08", "May 21", "Jun 02", "Jun 15", "Jun 30"], revenue: [52, 57, 55, 65, 62, 70, 72, 81], churn: [61, 57, 59, 53, 55, 48, 50, 43] },
  "12m": { labels: ["Jul", "Aug", "Sep", "Oct", "Nov", "Dec", "Jan", "Feb", "Mar", "Apr", "May", "Jun"], revenue: [48, 49, 53, 51, 57, 56, 62, 65, 63, 70, 74, 81], churn: [67, 62, 63, 59, 60, 54, 56, 52, 50, 48, 47, 43] },
};

const cohortRows = [
  { name: "Jan 2025", values: [100, 74, 66, 61, 56, 52, 48] },
  { name: "Feb 2025", values: [100, 71, 63, 58, 54, 49] },
  { name: "Mar 2025", values: [100, 69, 62, 55, 50] },
  { name: "Apr 2025", values: [100, 72, 64, 58] },
  { name: "May 2025", values: [100, 68, 60] },
  { name: "Jun 2025", values: [100, 65] },
];

const fmtCurrency = (n: number) => `$${n.toFixed(1)}`;

function TrendChart({ range }: { range: keyof typeof monthly }) {
  const data = monthly[range];
  const point = (value: number, index: number) => `${38 + index * (692 / (data.revenue.length - 1))},${184 - value * 1.55}`;
  const revenuePoints = data.revenue.map(point).join(" ");
  const churnPoints = data.churn.map(point).join(" ");
  const area = `38,184 ${revenuePoints} 730,184`;
  return <div className="chart-wrap">
    <svg className="trend-chart" viewBox="0 0 760 220" role="img" aria-label={`Revenue and churn trends over ${range === "30d" ? "30 days" : range === "90d" ? "90 days" : "12 months"}`} preserveAspectRatio="none">
      <defs><linearGradient id="revenueFill" x1="0" y1="0" x2="0" y2="1"><stop offset="0%" stopColor="#71927a" stopOpacity=".25"/><stop offset="100%" stopColor="#71927a" stopOpacity="0"/></linearGradient></defs>
      {[45, 90, 135, 180].map(y => <g key={y}><line x1="38" y1={y} x2="730" y2={y} className="chart-grid"/><text x="0" y={y + 4} className="chart-y-label">{y === 45 ? "$540k" : y === 90 ? "$500k" : y === 135 ? "$460k" : "$420k"}</text></g>)}
      <polygon points={area} fill="url(#revenueFill)"/>
      <polyline points={revenuePoints} className="line-revenue"/>
      <polyline points={churnPoints} className="line-churn"/>
      {data.revenue.map((value, i) => <circle key={i} cx={38 + i * (692 / (data.revenue.length - 1))} cy={184 - value * 1.55} r="3.6" className="chart-dot"/>)}
    </svg>
    <div className="chart-x-labels">{data.labels.map(label => <span key={label}>{label}</span>)}</div>
  </div>;
}

export default function Dashboard() {
  const [range, setRange] = useState<keyof typeof monthly>("90d");
  const [search, setSearch] = useState("");
  const [contract, setContract] = useState("All contracts");
  const [active, setActive] = useState("Overview");
  const [drawer, setDrawer] = useState(false);
  const [selectedCustomer, setSelectedCustomer] = useState<(typeof customers)[number] | null>(null);
  const [toast, setToast] = useState("");
  const [updated, setUpdated] = useState("just now");
  const drawerCloseRef = useRef<HTMLButtonElement>(null);
  const returnFocusRef = useRef<HTMLElement | null>(null);

  const filteredCustomers = useMemo(() => customers.filter(customer => {
    const matchesSearch = `${customer.id} ${customer.service} ${customer.plan} ${customer.reason}`.toLowerCase().includes(search.toLowerCase());
    const matchesContract = contract === "All contracts" || customer.plan === contract;
    return matchesSearch && matchesContract;
  }), [search, contract]);

  const showToast = (message: string) => {
    setToast(message);
    window.setTimeout(() => setToast(""), 2600);
  };

  const openCustomer = (customer: (typeof customers)[number]) => {
    if (document.activeElement instanceof HTMLElement) returnFocusRef.current = document.activeElement;
    setSelectedCustomer(customer);
  };

  const closeCustomer = useCallback(() => {
    setSelectedCustomer(null);
    window.setTimeout(() => returnFocusRef.current?.focus(), 0);
  }, []);

  useEffect(() => {
    if (!selectedCustomer) return;
    drawerCloseRef.current?.focus();
    const closeOnEscape = (event: KeyboardEvent) => {
      if (event.key === "Escape") closeCustomer();
    };
    document.addEventListener("keydown", closeOnEscape);
    return () => document.removeEventListener("keydown", closeOnEscape);
  }, [selectedCustomer, closeCustomer]);

  const downloadCsv = () => {
    const header = ["Customer ID", "Contract", "Tenure", "Internet service", "Monthly charges", "Churn risk", "Risk signal"];
    const rows = filteredCustomers.map(c => [c.id, c.plan, c.tenure, c.service, c.monthly.toFixed(2), `${c.risk}%`, c.reason]);
    const csv = [header, ...rows].map(row => row.map(value => `"${String(value).replaceAll('"', '""')}"`).join(",")).join("\n");
    const link = document.createElement("a");
    link.href = URL.createObjectURL(new Blob([csv], { type: "text/csv;charset=utf-8" }));
    link.download = "signal-at-risk-customers.csv";
    link.click();
    URL.revokeObjectURL(link.href);
    showToast("Your customer list is ready to download");
  };

  const downloadSummary = () => {
    const summary = [
      "SIGNAL — TELECOM RETENTION ANALYTICS",
      "Portfolio snapshot | June 30, 2025",
      "",
      `Subscribers analyzed,${dashboardStats.totalSubscribers}`,
      `Overall churn rate,${dashboardStats.churnRate}%`,
      `Month-to-month churn rate,${dashboardStats.monthToMonthChurn}%`,
      `Monthly recurring revenue,$${dashboardStats.monthlyRecurringRevenue}k`,
      `Monthly revenue at risk,$${dashboardStats.monthlyRevenueAtRisk}k`,
      `Estimated customer lifetime value,$${dashboardStats.estimatedLifetimeValue.toLocaleString()}`,
      "Highest-risk onboarding window,Months 1–4",
      "",
      "Source note,Representative portfolio demo figures. Replace with verified analysis outputs before external publication.",
    ].join("\n");
    const link = document.createElement("a");
    link.href = URL.createObjectURL(new Blob([summary], { type: "text/csv;charset=utf-8" }));
    link.download = "signal-retention-summary.csv";
    link.click();
    URL.revokeObjectURL(link.href);
    showToast("Your portfolio summary is ready to download");
  };

  return <div className="app-shell" id="overview">
    <aside className={`sidebar ${drawer ? "sidebar-open" : ""}`}>
      <a className="brand" href="#overview" aria-label="Signal dashboard home"><span className="brand-mark"><Icon name="signal" size={22}/></span><span className="brand-name">signal<span>.</span></span></a>
      <div className="workspace-switch"><span className="workspace-avatar">N</span><span className="workspace-copy"><strong>Northstar Telecom</strong><small>Retention workspace</small></span><span className="workspace-caret">⌄</span></div>
      <div className="side-label">WORKSPACE</div>
      <nav className="side-nav" aria-label="Dashboard sections">{navItems.map(item => <a href={item.href} key={item.label} className={active === item.label ? "active" : ""} onClick={() => { setActive(item.label); setDrawer(false); }}><Icon name={item.icon}/><span>{item.label}</span>{item.label === "Customer segments" && <span className="nav-count">4</span>}</a>)}</nav>
      <div className="sidebar-bottom"><div className="retention-card"><div className="retention-icon"><Icon name="signal" size={16}/></div><strong>Retention pulse</strong><p>Churn eased by 1.8 pts this quarter.</p><a href="#revenue">See what changed <Icon name="arrow" size={13}/></a><div className="pulse-decoration"><i/><i/><i/><i/><i/><i/><i/><i/><i/><i/><i/><i/></div></div><button className="profile-button" onClick={() => showToast("Workspace profile settings are coming soon")}><span className="profile-avatar">PP</span><span className="profile-copy"><strong>Preet Patel</strong><small>Analytics lead</small></span><span className="profile-more">···</span></button></div>
    </aside>

    <main className="main-content">
      <header className="topbar"><button className="mobile-menu" onClick={() => setDrawer(!drawer)} aria-label={drawer ? "Close navigation" : "Open navigation"}><Icon name={drawer ? "close" : "menu"}/></button><div className="breadcrumbs"><span>Workspace</span><Icon name="chevron" size={14}/><strong>{active}</strong></div><div className="topbar-actions"><span className="live-state"><i/> Sample data</span><button className="icon-button" aria-label="Refresh dashboard" onClick={() => { setUpdated("just now"); showToast("Dashboard data refreshed"); }}><Icon name="refresh"/></button><span className="topbar-divider"/><button className="top-avatar" aria-label="Open profile" onClick={() => showToast("Signed in as Preet Patel")}>PP</button></div></header>

      <div className="page-wrap">
        <section className="page-heading"><div><div className="heading-meta"><span>MONDAY, JUNE 30, 2025</span><span className="meta-dot"/><span>LAST UPDATED {updated.toUpperCase()}</span></div><h1>Retention, in focus.</h1><p>A clear view of who may leave, what’s at stake, and where to act first.</p></div><div className="heading-actions"><button className="button button-quiet" onClick={downloadSummary}><Icon name="download" size={16}/> Export summary</button><button className="button button-dark" onClick={downloadCsv}><Icon name="download" size={16}/> Download data</button></div></section>

        <section className="metric-row" aria-label="Key retention metrics">
          <article className="metric"><div className="metric-label">Subscribers analyzed <span className="metric-info" title="Records in the portfolio analysis">i</span></div><div className="metric-main"><strong>{dashboardStats.totalSubscribers.toLocaleString()}</strong><span className="metric-trend neutral">Full portfolio</span></div><div className="metric-foot">Across 6 customer cohorts</div></article>
          <article className="metric metric-risk"><div className="metric-label">Churn rate <span className="metric-info" title="Share of subscribers who churned">i</span></div><div className="metric-main"><strong>{dashboardStats.churnRate}<span className="metric-unit">%</span></strong><span className="metric-trend down">↓ 1.8 pts</span></div><div className="metric-foot">Quarter over quarter</div></article>
          <article className="metric metric-risk"><div className="metric-label">Monthly revenue at risk <span className="metric-info" title="Estimated MRR associated with high-risk subscribers">i</span></div><div className="metric-main"><strong>${dashboardStats.monthlyRevenueAtRisk}<span className="metric-unit">k</span></strong><span className="metric-trend up">↑ 6.2%</span></div><div className="metric-foot">14.2% of total MRR</div></article>
          <article className="metric"><div className="metric-label">Estimated customer LTV <span className="metric-info" title="Estimated customer lifetime value">i</span></div><div className="metric-main"><strong>${dashboardStats.estimatedLifetimeValue.toLocaleString()}</strong><span className="metric-trend down">↑ $84</span></div><div className="metric-foot">+4.6% from last quarter</div></article>
          <article className="metric"><div className="metric-label">Active subscribers</div><div className="metric-main"><strong>{retainedSubscribers.toLocaleString()}</strong><span className="metric-trend neutral">{retentionRate.toFixed(1)}% retained</span></div><div className="metric-foot">Still active in this portfolio</div></article>
          <article className="metric metric-risk"><div className="metric-label">Churned subscribers</div><div className="metric-main"><strong>{dashboardStats.churnedSubscribers.toLocaleString()}</strong><span className="metric-trend neutral">{dashboardStats.churnRate}% of base</span></div><div className="metric-foot">Across the full portfolio</div></article>
        </section>

        <section className="insight-banner"><span className="insight-spark"><Icon name="signal" size={17}/></span><p><strong>Month-to-month customers show a 42.7% churn rate.</strong> The first four months are the highest-risk window.</p><a href="#survival">Explore early-life risk <Icon name="arrow" size={14}/></a></section>

        <section className="analysis-grid" id="revenue">
          <article className="panel trend-panel"><div className="panel-heading"><div><h2>Revenue & churn</h2><p>Monthly recurring revenue alongside churn movement</p></div><div className="range-switch" role="group" aria-label="Chart time range">{(["30d", "90d", "12m"] as const).map(item => <button key={item} className={range === item ? "selected" : ""} onClick={() => setRange(item)}>{item === "12m" ? "12 months" : item === "90d" ? "90 days" : "30 days"}</button>)}</div></div><div className="chart-key"><span><i className="key-revenue"/> MRR <strong>${dashboardStats.monthlyRecurringRevenue}k</strong></span><span><i className="key-churn"/> Churned customers <strong>{dashboardStats.churnedSubscribers.toLocaleString()}</strong></span><button onClick={() => showToast("Chart data is shown in the selected period")}>View details <Icon name="arrow" size={13}/></button></div><TrendChart range={range}/><div className="chart-insight"><span className="insight-label">WHAT WE SEE</span><span>Revenue is recovering while churn pressure continues to ease.</span><span className="chart-change">+8.4% <small>MRR</small></span></div></article>
          <article className="panel contract-panel"><div className="panel-heading"><div><h2>Contract is the clearest signal</h2><p>Churn rate by agreement type</p></div><button className="panel-more" aria-label="Contract chart information" onClick={() => showToast("Rates reflect churned subscribers within each contract group")}>···</button></div><div className="contract-visual"><div className="contract-number"><strong>42.7<span>%</span></strong><small>month-to-month<br/>churn rate</small></div><div className="contract-bars"><div className="contract-bar-row"><span>Month-to-month</span><div className="bar-track"><i style={{ width: "67%" }} className="bar-orange"/></div><strong>42.7%</strong></div><div className="contract-bar-row"><span>One year</span><div className="bar-track"><i style={{ width: "35%" }} className="bar-blue"/></div><strong>11.3%</strong></div><div className="contract-bar-row"><span>Two year</span><div className="bar-track"><i style={{ width: "9%" }} className="bar-sage"/></div><strong>2.8%</strong></div></div></div><div className="contract-note"><span className="note-icon">↗</span><span>Longer commitments are linked with stronger retention.</span></div></article>
        </section>

        <section className="analysis-grid secondary-grid" id="survival">
          <article className="panel survival-panel"><div className="panel-heading"><div><h2>The first four months matter most</h2><p>Share of customers still active after joining</p></div><span className="panel-kicker">SURVIVAL ANALYSIS</span></div><div className="survival-content"><div className="survival-chart"><div className="survival-y"><span>100%</span><span>75%</span><span>50%</span><span>25%</span></div><svg viewBox="0 0 500 190" role="img" aria-label="Customer survival rate drops most sharply during the first four months" preserveAspectRatio="none"><defs><linearGradient id="survivalFill" x1="0" y1="0" x2="0" y2="1"><stop offset="0%" stopColor="#b9684b" stopOpacity=".18"/><stop offset="100%" stopColor="#b9684b" stopOpacity="0"/></linearGradient></defs>{[18, 68, 118, 168].map(y => <line key={y} x1="0" y1={y} x2="500" y2={y} className="chart-grid"/>)}<polygon points="0,20 22,28 43,37 64,52 86,62 107,75 129,83 150,94 171,100 193,106 214,113 236,118 257,122 279,128 300,133 321,137 343,141 364,145 386,148 407,152 429,155 450,157 472,160 500,162 500,180 0,180" fill="url(#survivalFill)"/><polyline points="0,20 22,28 43,37 64,52 86,62 107,75 129,83 150,94 171,100 193,106 214,113 236,118 257,122 279,128 300,133 321,137 343,141 364,145 386,148 407,152 429,155 450,157 472,160 500,162" className="survival-line"/><line x1="83" y1="18" x2="83" y2="180" className="risk-marker"/><circle cx="83" cy="60" r="5" className="survival-point"/></svg><div className="survival-x"><span>0</span><span>4</span><span>8</span><span>12</span><span>16</span><span>20</span><span>24 mo</span></div><div className="risk-callout"><span>Early risk window</span><strong>Months 1–4</strong></div></div></div><div className="survival-foot"><span><i className="key-survival"/> Customer survival probability</span><span>Kaplan–Meier estimate</span></div></article>
          <article className="panel cohort-panel" id="segments"><div className="panel-heading"><div><h2>Retention by cohort</h2><p>Customers returning each month after signup</p></div><button className="text-button" onClick={() => showToast("Showing six monthly signup cohorts")}>See cohorts <Icon name="arrow" size={13}/></button></div><div className="cohort-table"><div className="cohort-row cohort-head"><span>START MONTH</span>{["M0", "M1", "M2", "M3", "M4", "M5", "M6"].map(m => <span key={m}>{m}</span>)}</div>{cohortRows.map(row => <div className="cohort-row" key={row.name}><span className="cohort-name">{row.name}</span>{Array.from({ length: 7 }, (_, i) => { const value = row.values[i]; return <span key={i} className={value ? "cohort-cell" : "cohort-cell empty"} style={value ? { backgroundColor: `rgba(57, 103, 77, ${0.1 + value / 150})` } : undefined}>{value ? `${value}%` : ""}</span>; })}</div>)}</div><div className="cohort-legend"><span>Lower retention</span><i/><i/><i/><i/><span>Higher retention</span></div></article>
        </section>

        <section className="lower-grid" id="services">
          <article className="panel service-panel"><div className="panel-heading"><div><h2>Service mix, at a glance</h2><p>Where customer experience can shift</p></div><button className="text-button" onClick={() => showToast("Service mix uses the full subscriber sample")}>All services <Icon name="chevron" size={13}/></button></div><div className="service-list"><div className="service-row"><span className="service-mark fiber">F</span><span className="service-name"><strong>Fiber optic</strong><small>High-speed internet</small></span><span className="service-churn"><strong>41.9%</strong><small>churn rate</small></span><div className="service-mini-bar"><i style={{ width: "82%" }}/></div><span className="service-share">43% of base</span></div><div className="service-row"><span className="service-mark dsl">D</span><span className="service-name"><strong>DSL</strong><small>Broadband internet</small></span><span className="service-churn"><strong>19.0%</strong><small>churn rate</small></span><div className="service-mini-bar"><i style={{ width: "40%" }}/></div><span className="service-share">34% of base</span></div><div className="service-row"><span className="service-mark phone">N</span><span className="service-name"><strong>No internet</strong><small>Voice and legacy plans</small></span><span className="service-churn"><strong>7.4%</strong><small>churn rate</small></span><div className="service-mini-bar"><i style={{ width: "15%" }}/></div><span className="service-share">23% of base</span></div></div></article>
          <article className="panel action-panel"><div className="action-top"><span className="action-icon"><Icon name="signal" size={20}/></span><span className="action-tag">RETENTION OPPORTUNITY</span></div><h2>Start with the customers who just joined.</h2><p>Early tenure and flexible contracts combine for the sharpest risk. A first-90-day check-in could protect the most value.</p><div className="action-proof"><div><strong>1–4</strong><span>months of tenure</span></div><span className="proof-divider"/><div><strong>42.7%</strong><span>M2M churn rate</span></div><span className="proof-divider"/><div><strong>$70k</strong><span>monthly MRR at risk</span></div></div><a href="#customers" className="action-link" onClick={() => setActive("Customer segments")}>Review at-risk customers <Icon name="arrow" size={15}/></a><div className="action-orbit orbit-one"/><div className="action-orbit orbit-two"/></article>
        </section>

        <section className="panel customers-panel" id="customers"><div className="customer-head"><div className="panel-heading"><div><h2>Customers to look at first</h2><p>Highest risk, highest urgency. Sample records for the portfolio preview.</p></div><span className="risk-count"><i/> 248 high risk</span></div><div className="customer-tools"><label className="search-box"><Icon name="search" size={16}/><input value={search} onChange={e => setSearch(e.target.value)} placeholder="Search customer or service" aria-label="Search customers"/><kbd>⌘ K</kbd></label><label className="contract-select"><Icon name="filter" size={15}/><select value={contract} onChange={e => setContract(e.target.value)} aria-label="Filter by contract"><option>All contracts</option><option>Month-to-month</option><option>One year</option><option>Two year</option></select></label><button className="button button-quiet export-mobile" onClick={downloadCsv}><Icon name="download" size={15}/> Export</button></div></div>
          <div className="table-scroll"><table><thead><tr><th>CUSTOMER</th><th>CONTRACT & TENURE</th><th>SERVICE</th><th>MONTHLY CHARGES</th><th>CHURN RISK</th><th>RISK SIGNAL</th><th><span className="sr-only">Open customer</span></th></tr></thead><tbody>{filteredCustomers.length ? filteredCustomers.map(customer => <tr key={customer.id} onClick={() => openCustomer(customer)} tabIndex={0} onKeyDown={e => { if (e.key === "Enter") openCustomer(customer); }}><td><span className={`customer-avatar ${customer.hue}`}>{customer.initials}</span><span className="customer-id">{customer.id}</span></td><td><span className="contract-name">{customer.plan}</span><small className="table-sub">{customer.tenure} tenure</small></td><td>{customer.service}</td><td>{fmtCurrency(customer.monthly)}<small className="table-sub"> / month</small></td><td><span className={`risk-pill ${customer.risk >= 85 ? "risk-high" : "risk-medium"}`}><i/>{customer.risk}%</span></td><td className="reason-cell">{customer.reason}</td><td><button className="row-action" aria-label={`Open ${customer.id}`} onClick={e => { e.stopPropagation(); openCustomer(customer); }}><Icon name="chevron" size={16}/></button></td></tr>) : <tr><td colSpan={7} className="empty-state"><strong>No matching customers</strong><span>Try a different name or contract filter.</span></td></tr>}</tbody></table></div><div className="table-foot"><span>Showing <strong>{filteredCustomers.length} sample {filteredCustomers.length === 1 ? "record" : "records"}</strong> from a 248-subscriber high-risk pool</span><button className="text-button" onClick={downloadCsv}>Export filtered data <Icon name="arrow" size={13}/></button></div>
        </section>
        <footer className="page-footer"><span><span className="footer-mark">s.</span> SIGNAL <span className="footer-sep">/</span> TELECOM RETENTION ANALYTICS</span><span>Portfolio demo · Representative sample records · June 2025</span><button onClick={() => showToast("Project documentation is being prepared")}>About this analysis <Icon name="external" size={12}/></button></footer>
      </div>
    </main>

    {drawer && <button className="drawer-scrim" onClick={() => setDrawer(false)} aria-label="Close navigation"/>}
    {selectedCustomer && <div className="detail-scrim" onClick={closeCustomer}><section className="customer-drawer" role="dialog" aria-modal="true" aria-labelledby="drawer-title" onClick={e => e.stopPropagation()}><button ref={drawerCloseRef} className="drawer-close" onClick={closeCustomer} aria-label="Close customer details"><Icon name="close"/></button><span className={`customer-avatar large ${selectedCustomer.hue}`}>{selectedCustomer.initials}</span><span className="drawer-kicker">CUSTOMER RISK PROFILE</span><h2 id="drawer-title">{selectedCustomer.id}</h2><p className="drawer-subtitle">{selectedCustomer.plan} · {selectedCustomer.tenure} tenure</p><div className="drawer-risk"><span>Churn risk score</span><strong>{selectedCustomer.risk}%</strong><div className="drawer-risk-bar"><i style={{ width: `${selectedCustomer.risk}%` }}/></div><small>High risk · prioritize for a retention check-in</small></div><div className="drawer-details"><div><span>Internet service</span><strong>{selectedCustomer.service}</strong></div><div><span>Monthly charges</span><strong>{fmtCurrency(selectedCustomer.monthly)}</strong></div><div><span>Estimated annual value</span><strong>{fmtCurrency(selectedCustomer.monthly * 12)}</strong></div><div><span>Primary risk signal</span><strong>{selectedCustomer.reason}</strong></div></div><button className="button button-dark drawer-action" onClick={() => { showToast(`Follow-up flagged for ${selectedCustomer.id}`); closeCustomer(); }}>Flag for follow-up <Icon name="arrow" size={15}/></button><p className="drawer-note">Sample customer profile for demonstration purposes.</p></section></div>}
    {toast && <div className="toast" role="status"><span className="toast-check">✓</span>{toast}</div>}
  </div>;
}
