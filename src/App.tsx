import type { ReactNode } from 'react'

type StatCardProps = {
  label: string
  value: number
  icon: string
  background: string
}

const assets = {
  signal: 'https://www.figma.com/api/mcp/asset/a606823e-8b1e-41f8-aeac-0d58f7861d30.svg',
  wifi: 'https://www.figma.com/api/mcp/asset/3d3f0c9d-9355-4e33-a8d1-0ecc0ee1b3ee.svg',
  battery: 'https://www.figma.com/api/mcp/asset/7912b588-00e4-4ef8-99e9-1a61ebbd82ad.svg',
  list: 'https://www.figma.com/api/mcp/asset/7afb0603-83fe-4c8e-a9c4-8fe44cb14436.svg',
  minus: 'https://www.figma.com/api/mcp/asset/a18d0208-a5ac-480b-87ce-9468983b1574.svg',
  close: 'https://www.figma.com/api/mcp/asset/9cc6a30d-2123-4acc-bc8b-1680cf9105b6.svg',
  check: 'https://www.figma.com/api/mcp/asset/a0684c9e-5683-43ec-a699-75329418eb35.svg',
}

function StatusBar() {
  return (
    <div className="status-bar" data-node-id="9:5283">
      <span>05:24 pm</span>
      <div className="status-icons">
        <img src={assets.signal} alt="" />
        <img src={assets.wifi} alt="" />
        <img src={assets.battery} alt="" />
      </div>
    </div>
  )
}

function StatCard({ label, value, icon, background }: StatCardProps) {
  return (
    <div className="stat-card" style={{ background }}>
      <div className="stat-content">
        <div className="stat-icon">
          <img src={icon} alt="" />
        </div>
        <span>{label}</span>
      </div>
      <strong>{value}</strong>
    </div>
  )
}

function App() {
  const stats: StatCardProps[] = [
    { label: 'Total', value: 0, icon: assets.list, background: '#74a1cd' },
    { label: 'Unattempted', value: 0, icon: assets.minus, background: '#5d8cb7' },
    { label: 'Incomplete', value: 0, icon: assets.close, background: '#4877a1' },
    { label: 'Completed', value: 0, icon: assets.check, background: '#2f5c86' },
  ]

  return (
    <main className="home" data-node-id="9:5280">
      <section className="hero" data-node-id="9:5282">
        <StatusBar />
        <header className="header-bar" data-node-id="9:5292">
          <h1>Home</h1>
        </header>
        <div className="greeting" data-node-id="9:5295">
          <p className="time">05:24 pm</p>
          <p>Good Evening, got supervisor! Let's get started!</p>
        </div>
      </section>

      <section className="stats" data-node-id="9:5298">
        <div className="stats-list">
          {stats.map((stat) => (
            <StatCard key={stat.label} {...stat} />
          ))}
        </div>
      </section>
    </main>
  )
}

export default App
