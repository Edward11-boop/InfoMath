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
        .navbar-wrap {
          animation: slideDown 0.5s cubic-bezier(.22,1,.36,1) both;
        }
        .nav-link {
          position: relative;
          color: rgba(255,255,255,0.55);
          font-size: 0.95rem;
          font-weight: 500;
          letter-spacing: 0.02em;
          text-decoration: none;
          padding: 8px 18px;
          border-radius: 999px;
          transition: color 0.25s, background 0.25s;
          white-space: nowrap;
        }
        .nav-link:hover {
          color: rgba(255,255,255,0.85);
        }
        .nav-link.active {
          color: #fff;
          background: rgba(255,255,255,0.15);
          box-shadow: inset 0 1px 1px rgba(255,255,255,0.25), 0 2px 8px rgba(0,0,0,0.2);
        }
        .logo-text {
          background: linear-gradient(135deg, #fff 40%, #a5b4fc);
          -webkit-background-clip: text;
          -webkit-text-fill-color: transparent;
          background-clip: text;
          font-weight: 700;
          letter-spacing: -0.02em;
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
        }
      `}</style>

      <nav className="navbar-wrap  flex justify-center mt-4 px-6">
        <div
          className="flex items-center justify-between px-2 py-2 rounded-full"
          style={{
            background: scrolled ? 'rgba(255,255,255,0.1)' : 'rgba(255,255,255,0.07)',
            border: '1px solid rgba(255,255,255,0.12)',
            boxShadow: '0 4px 24px rgba(0,0,0,0.25), inset 0 1px 0 rgba(255,255,255,0.1)',
            backdropFilter: 'blur(20px)',
            transition: 'all 0.4s ease',
            width: '100%',
            maxWidth: '700px',
          }}
        >
          {/* Logo */}
          <Link to="/" className="logo-text text-xl pl-3" style={{ textDecoration: 'none', flexShrink: 0 }}>
            InfoMath
          </Link>

          {/* Linkuri desktop */}
          <div className="hidden md:flex items-center gap-1">
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

          {/* Hamburger mobile */}
          <button
            className="md:hidden mr-1 flex items-center justify-center"
            onClick={() => setIsOpen(true)}
            style={{
              width: 38, height: 38,
              borderRadius: 999,
              border: '1px solid rgba(255,255,255,0.15)',
              background: 'rgba(255,255,255,0.07)',
              color: 'white',
              cursor: 'pointer',
            }}
          >
            <Menu size={18} />
          </button>
        </div>
      </nav>

      {isOpen && <div className="overlay" onClick={() => setIsOpen(false)} />}

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
          <div className="flex items-center justify-between mb-10">
            <span className="logo-text" style={{ fontSize: '1.2rem', fontWeight: 700 }}>
              CrazyMath
            </span>
            <button className="close-btn" onClick={() => setIsOpen(false)}>
              <X size={18} />
            </button>
          </div>

          <div style={{
            height: '1px',
            background: 'linear-gradient(90deg, rgba(129,140,248,0.5), transparent)',
            marginBottom: '24px',
          }} />

          <div className="flex flex-col gap-2">
            {links.map(({ to, label }) => (
              <Link
                key={to}
                to={to}
                className={`drawer-link ${location.pathname === to ? 'active' : ''}`}
              >
                <span className="dot-badge" />
                {label}
              </Link>
            ))}
          </div>

          <div className="mt-auto pt-6" style={{
            borderTop: '1px solid rgba(255,255,255,0.06)',
            fontSize: '0.75rem',
            color: 'rgba(255,255,255,0.25)',
          }}>
            © 2026 CrazyMath
          </div>
        </div>
      )}
    </>
  )
}

export default Navbar