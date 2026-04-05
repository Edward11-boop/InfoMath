import { Link, useLocation } from 'react-router-dom'
import { useState, useEffect } from 'react'
import { Menu, X } from 'lucide-react'

function Navbar() {
  const [isOpen, setIsOpen] = useState(false)
  const [scrolled, setScrolled] = useState(false)
  const location = useLocation()

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 20)
    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  // Închide drawer la schimbare rută
  useEffect(() => {
    setIsOpen(false)
  }, [location])

  const links = [
    { to: '/', label: 'Acasă' },
    { to: '/despre-noi', label: 'Despre Noi' },
    { to: '/programare', label: 'Programare' },
  ]

  return (
    <>
      <style>{`
        @keyframes slideDown {
          from { opacity: 0; transform: translateY(-12px); }
          to   { opacity: 1; transform: translateY(0); }
        }
        @keyframes drawerIn {
          from { opacity: 0; transform: translateX(100%); }
          to   { opacity: 1; transform: translateX(0); }
        }
        @keyframes fadeInLink {
          from { opacity: 0; transform: translateX(24px); }
          to   { opacity: 1; transform: translateX(0); }
        }
        @keyframes shimmer {
          0%   { background-position: -200% center; }
          100% { background-position:  200% center; }
        }
        .navbar-wrap {
          animation: slideDown 0.5s cubic-bezier(.22,1,.36,1) both;
        }
        .nav-link {
          position: relative;
          color: rgba(255,255,255,0.75);
          font-size: 1rem;
          font-weight: 500;
          letter-spacing: 0.04em;
          text-decoration: none;
          padding: 6px 0;
          transition: color 0.25s;
        }
        .nav-link::after {
          content: '';
          position: absolute;
          bottom: 0; left: 0;
          width: 0; height: 1.5px;
          background: linear-gradient(90deg, #818cf8, #c084fc, #818cf8);
          background-size: 200% auto;
          border-radius: 99px;
          transition: width 0.35s cubic-bezier(.22,1,.36,1);
        }
        .nav-link:hover { color: #fff; }
        .nav-link:hover::after {
          width: 100%;
          animation: shimmer 1.5s linear infinite;
        }
        .nav-link.active {
          color: #fff;
        }
        .nav-link.active::after {
          width: 100%;
          background: linear-gradient(90deg, #818cf8, #c084fc);
        }
        .hamburger-btn {
          width: 40px; height: 40px;
          border-radius: 10px;
          border: 1px solid rgba(255,255,255,0.15);
          background: rgba(255,255,255,0.05);
          display: flex; align-items: center; justify-content: center;
          color: white;
          cursor: pointer;
          transition: background 0.2s, border-color 0.2s, transform 0.15s;
        }
        .hamburger-btn:hover {
          background: rgba(255,255,255,0.12);
          border-color: rgba(255,255,255,0.3);
          transform: scale(1.05);
        }
        .drawer {
          animation: drawerIn 0.45s cubic-bezier(.22,1,.36,1) both;
        }
        .drawer-link {
          display: flex;
          align-items: center;
          gap: 12px;
          color: rgba(255,255,255,0.7);
          font-size: 1.1rem;
          font-weight: 500;
          letter-spacing: 0.05em;
          text-decoration: none;
          padding: 14px 16px;
          border-radius: 12px;
          border: 1px solid transparent;
          transition: all 0.25s cubic-bezier(.22,1,.36,1);
          opacity: 0;
        }
        .drawer-link:hover {
          color: #fff;
          background: rgba(255,255,255,0.07);
          border-color: rgba(255,255,255,0.12);
          transform: translateX(6px);
        }
        .drawer-link.active {
          color: #fff;
          background: rgba(129,140,248,0.15);
          border-color: rgba(129,140,248,0.3);
        }
        .drawer-link:nth-child(1) { animation: fadeInLink 0.4s 0.15s cubic-bezier(.22,1,.36,1) forwards; }
        .drawer-link:nth-child(2) { animation: fadeInLink 0.4s 0.22s cubic-bezier(.22,1,.36,1) forwards; }
        .drawer-link:nth-child(3) { animation: fadeInLink 0.4s 0.29s cubic-bezier(.22,1,.36,1) forwards; }
        .dot-badge {
          width: 6px; height: 6px;
          border-radius: 50%;
          background: linear-gradient(135deg, #818cf8, #c084fc);
          flex-shrink: 0;
        }
        .close-btn {
          width: 36px; height: 36px;
          border-radius: 10px;
          border: 1px solid rgba(255,255,255,0.12);
          background: rgba(255,255,255,0.05);
          display: flex; align-items: center; justify-content: center;
          color: rgba(255,255,255,0.7);
          cursor: pointer;
          transition: all 0.2s;
        }
        .close-btn:hover {
          background: rgba(255,255,255,0.1);
          color: white;
          transform: rotate(90deg);
        }
        .overlay {
          position: fixed; inset: 0;
          background: rgba(0,0,0,0.35);
          backdrop-filter: blur(2px);
          z-index: 49;
          animation: fadeInLink 0.3s ease both;
        }
        .logo-text {
          background: linear-gradient(135deg, #fff 40%, #a5b4fc);
          -webkit-background-clip: text;
          -webkit-text-fill-color: transparent;
          background-clip: text;
          font-weight: 700;
          letter-spacing: -0.02em;
        }
      `}</style>

      <nav className="navbar-wrap flex flex-1 mt-2 px-6">
        <div
          className="w-full flex items-center justify-between p-4 rounded-2xl border"
          style={{
            background: scrolled ? 'rgba(255,255,255,0.08)' : 'rgba(255,255,255,0.06)',
            borderColor: 'rgba(255,255,255,0.12)',
            boxShadow: scrolled
              ? '0 8px 32px rgba(0,0,0,0.3), inset 0 1px 0 rgba(255,255,255,0.1)'
              : '0 4px 24px rgba(0,0,0,0.2), inset 0 1px 0 rgba(255,255,255,0.08)',
            backdropFilter: 'blur(20px)',
            transition: 'all 0.4s ease',
          }}
        >
          {/* Logo */}
          <Link to="/" className="logo-text text-2xl" style={{ textDecoration: 'none' }}>
            CrazyMath
          </Link>

          <div className="hidden md:flex items-center gap-8">
            {links.map(({ to, label }) => (
              <Link
                key={to}
                to={to}
                className={`nav-link ${location.pathname === to ? 'active' : ''}`}
              >
                {label}
              </Link>
            ))}
          </div>

          {/* Hamburger - doar sub md */}
          <button
            className="flex md:hidden"
            onClick={() => setIsOpen(true)}
            style={{
              width: 40, height: 40,
              borderRadius: 10,
              border: '1px solid rgba(255,255,255,0.15)',
              background: 'rgba(255,255,255,0.05)',
              alignItems: 'center', justifyContent: 'center',
              color: 'white',
              cursor: 'pointer',
            }}
          >
            <Menu size={20} />
          </button>
        </div>
      </nav>

      {/* Overlay */}
      {isOpen && (
        <div className="overlay" onClick={() => setIsOpen(false)} />
      )}

      {/* Drawer */}
      {isOpen && (
        <div
          className="drawer fixed top-0 right-0 h-full z-50 flex flex-col"
          style={{
            width: 'min(75vw, 300px)',
            background: 'rgba(15, 15, 30, 0.85)',
            backdropFilter: 'blur(32px)',
            borderLeft: '1px solid rgba(255,255,255,0.1)',
            boxShadow: '-20px 0 60px rgba(0,0,0,0.5)',
            padding: '24px 20px',
          }}
        >
          {/* Header drawer */}
          <div className="flex items-center justify-between mb-10">
            <span
              className="logo-text"
              style={{ fontSize: '1.2rem', fontWeight: 700 }}
            >
              CrazyMath
            </span>
            <button className="close-btn" onClick={() => setIsOpen(false)}>
              <X size={18} />
            </button>
          </div>

          {/* Separator */}
          <div style={{
            height: '1px',
            background: 'linear-gradient(90deg, rgba(129,140,248,0.5), transparent)',
            marginBottom: '24px',
          }} />

          {/* Linkuri */}
          <div className="flex flex-col gap-2">
            {links.map(({ to, label }) => (
              <Link
                key={to}
                to={to}
                className={`drawer-link ${location.pathname === to ? 'active' : ''}`}
                onClick={() => setIsOpen(false)}
              >
                <span className="dot-badge" />
                {label}
              </Link>
            ))}
          </div>

          {/* Footer drawer */}
          <div
            className="mt-auto pt-6"
            style={{
              borderTop: '1px solid rgba(255,255,255,0.06)',
              fontSize: '0.75rem',
              color: 'rgba(255,255,255,0.25)',
              letterSpacing: '0.05em',
            }}
          >
            © 2026 CrazyMath
          </div>
        </div>
      )}
    </>
  )
}

export default Navbar