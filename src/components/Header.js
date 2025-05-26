import React from 'react';
import { Navbar, Nav, Container } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faFacebookF, faLinkedinIn, faTiktok } from '@fortawesome/free-brands-svg-icons';

const Header = () => {
  return (
    <header style={{ position: 'fixed', top: 0, left: 0, width: '100%', zIndex: 2000, background: '#fff' }}>
      {/* Top Info Bar */}
      <div className="bg-black py-1">
        <Container className="d-flex justify-content-between align-items-center">
          <div className="d-flex align-items-center" style={{ gap: '24px' }}>
            <div className="d-flex align-items-center" style={{ gap: '64px' }}>
              <span style={{ color: 'white', fontWeight: 500, fontSize: 'var(--font-size-sm)' }}>Tiếng Việt</span>
              <a href="mailto:sales@thdcybersecurity.com" className="text-decoration-none" style={{ color: 'white', fontSize: 'var(--font-size-sm)' }}>
                sales@thdcybersecurity.com
              </a>
              <a href="tel:0853287799" className="text-decoration-none" style={{ color: 'white', fontSize: 'var(--font-size-sm)' }}>
                0853 287 799
              </a>
            </div>
          </div>
          <div>
            <a href="#" className="text-decoration-none me-3">
              <img src="/images/fb.png" alt="Facebook" style={{ width: '24px', height: '24px', objectFit: 'contain', borderRadius: '50%' }} />
            </a>
            <a href="#" className="text-decoration-none me-3">
              <img src="/images/tiktok.png" alt="TikTok" style={{ width: '24px', height: '24px', objectFit: 'contain', borderRadius: '50%' }} />
            </a>
            <a href="#" className="text-decoration-none">
              <img src="/images/linkedin.png" alt="LinkedIn" style={{ width: '24px', height: '24px', objectFit: 'contain', borderRadius: '50%' }} />
            </a>
          </div>
        </Container>
      </div>

      {/* Main Navigation */}
      <Navbar bg="white" expand="lg" className="py-2 shadow-sm">
        <Container>
          <Navbar.Brand as={Link} to="/">
            
              <img src="/images/thdngang.jpg" alt="logoheader" style={{ height: '100px' }} />
            
          </Navbar.Brand>
          <Navbar.Toggle aria-controls="basic-navbar-nav" />
          <Navbar.Collapse id="basic-navbar-nav" className="justify-content-end">
            <Nav>
              <Nav.Link as={Link} to="#" className="mx-2" style={{ fontSize: 'var(--font-size-base)' }} onClick={e => e.preventDefault()}>Về THD</Nav.Link>
              <Nav.Link as={Link} to="/jobs" className="mx-2" style={{ fontSize: 'var(--font-size-base)' }}>Cơ hội việc làm</Nav.Link>
              <Nav.Link as={Link} to="#" className="mx-2" style={{ fontSize: 'var(--font-size-base)' }} onClick={e => e.preventDefault()}>THD Talent</Nav.Link>
              <Nav.Link as={Link} to="#" className="mx-2" style={{ fontSize: 'var(--font-size-base)' }} onClick={e => e.preventDefault()}>Life At THD</Nav.Link>
            </Nav>
          </Navbar.Collapse>
        </Container>
      </Navbar>

      {/* Breadcrumb section */}
      <div className="bg-white border-bottom">
        <Container className="py-2">
          <nav>
            <ol className="breadcrumb mb-0">
              <li className="breadcrumb-item">
                <Link to="/" className="text-decoration-none text-secondary">
                </Link>
              </li>
            </ol>
          </nav>
          
        </Container>
      </div>
    </header>
  );
};

export default Header; 