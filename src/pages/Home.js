import React, { useState, useEffect } from 'react';
import { Container, Row, Col, Button, Form, Nav, Accordion, InputGroup } from 'react-bootstrap';
import { Link, useNavigate } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faMapMarkerAlt, faClock, faChevronRight, faSearch, faHeart } from '@fortawesome/free-solid-svg-icons';
import { fetchAllJobs } from '../utils/api';

const Home = () => {
  const [activeTab, setActiveTab] = useState('all');
  const [searchTerm, setSearchTerm] = useState('');
  const [jobs, setJobs] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const navigate = useNavigate();

  // Lấy dữ liệu công việc từ API
  useEffect(() => {
    const getJobs = async () => {
      try {
        setLoading(true);
        const result = await fetchAllJobs();
        if (result && result.data) {
          setJobs(result.data);
        } else {
          setError("Dữ liệu từ API không đúng định dạng");
        }
      } catch (err) {
        console.error("Lỗi khi gọi API:", err);
        setError("Không thể kết nối tới API. Vui lòng đảm bảo Strapi đang chạy.");
      } finally {
        setLoading(false);
      }
    };

    getJobs();
  }, []);
  
  // Filter jobs based on active tab and search term
  let filteredJobs = [];
  
  if (activeTab === 'all') {
    filteredJobs = [...jobs]
      .sort((a, b) => b.sttvitri - a.sttvitri)
      .slice(0, 6);
  } else {
    filteredJobs = jobs.filter(job => 
      job.loaivitri && 
      job.loaivitri.toLowerCase() === activeTab.toLowerCase()
    );
  }
  
  if (searchTerm) {
    const term = searchTerm.toLowerCase();
    filteredJobs = filteredJobs.filter(job => 
      job.tenvitri.toLowerCase().includes(term) ||
      job.diachi.toLowerCase().includes(term) ||
      job.loaivitri.toLowerCase().includes(term) ||
      (job.motacongviec && job.motacongviec.toLowerCase().includes(term))
    );
  }

  const handleSearch = (e) => {
    e.preventDefault();
    navigate(`/jobs?search=${searchTerm}`);
  };

  return (
    <div className="home" style={{ overflow: 'hidden', width: '100%', maxWidth: '100vw' }}>
      {/* Hero Section - Static Content */}
      <section
        className="hero py-5"
        style={{
          backgroundImage: 'url("/images/logodo.jpg")',
          backgroundSize: 'cover',
          backgroundPosition: 'center',
          backgroundRepeat: 'no-repeat',
          maxHeight: '600px',
          width: '100%',
          maxWidth: '100vw',
          overflow: 'hidden'
        }}
      >
        <Container fluid="lg">
          <Row className="align-items-center mx-0" style={{ minHeight: '400px', maxHeight: '500px', paddingTop: '20px' }}>
            <Col md={7} className="d-flex flex-column justify-content-center">
              <div style={{ marginTop: '-20px' }}>
                <h1 className="display-4 mb-3 text-md-start text-center text-white" style={{ fontSize: 'var(--font-size-lg)' }}>
                  An toàn không phải là tùy chọn - mà là ưu tiên.
                </h1>
                <p className="lead mb-3 text-md-start text-center text-white" style={{ fontSize: 'var(--font-size-base)' }}>
                  Đừng để chỉ một lỗ hổng nhỏ khiến bạn trả giá bằng danh tiếng và tiền bạc. Chúng tôi mang đến giải pháp an ninh mạng toàn diện – phát hiện sớm, phản ứng nhanh, bảo vệ bền vững.Hãy để chúng tôi đồng hành và bảo vệ bạn khỏi mọi rủi ro ngay từ hôm nay.
                </p>
              </div>
            </Col>
            <Col md={5} className="text-center">
              <img
                src="/images/thdngang.jpg"
                alt="logoheader"
                className="img-fluid"
                style={{ 
                  width: '100%', 
                  maxWidth: '400px',
                  height: 'auto',
                  border: '4px solid #fff',
                  borderRadius: '20px',
                  marginTop: 0,
                  objectFit: 'contain'
                }}
              />
            </Col>
          </Row>
        </Container>
      </section>

      {/* Search Bar - Static Content */}
      <div className="mb-5" style={{ marginTop: '20px', marginBottom: '20px' }}>
        <Row className="justify-content-center">
          <Col md={8} lg={6}>
            <Form onSubmit={handleSearch}>
              <InputGroup>
                <Form.Control
                  type="text"
                  placeholder="Tìm công việc"
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="py-2"
                />
                <Button 
                  type="submit"
                  onClick={handleSearch}
                  style={{
                    backgroundColor: '#FF0000',
                    border: 'none',
                    color: '#fff'
                  }}
                >
                  Tìm công việc
                </Button>
              </InputGroup>
            </Form>
          </Col>
        </Row>
      </div>

      {/* Introduction Text - Static Content */}
      <div className="text-center mb-4">
        <Container>
          <p className="lead" style={{ fontSize: 'var(--font-size-base)' }}>
            Không chỉ đi làm - hãy cùng THD kiến tạo thế giới số và phát triển sự nghiệp đỉnh cao trong lĩnh vực an ninh mạng!
          </p>
        </Container>
      </div>

      {/* Position Heading - Static Content */}
      <div className="mb-4">
        <Container>
          <h4 className="text-center" style={{ fontSize: 'var(--font-size-lg)' }}>Vị trí đang tuyển</h4>
        </Container>
      </div>

      {/* Job Categories - Dynamic Content */}
      <section className="job-categories py-5 bg-white" style={{ 
        margin: '0 auto', 
        width: '100%',
        maxWidth: '100vw',
        overflow: 'hidden'
      }}>
        <Container fluid="lg">
          <div style={{ background: '#FF0000', borderRadius: '8px 8px 0 0', padding: '12px 0', textAlign: 'center', marginBottom: 0 }}>
            <h2 style={{ color: 'white', fontWeight: 700, fontSize: 'var(--font-size-lg)', margin: 0 }}>Việc làm tại THD</h2>
            <div style={{ color: 'white', fontSize: 'var(--font-size-base)', marginTop: '2px' }}>
              Một số vị trí thích hợp dành cho bạn có thể ở đây ngay tại đây. Khám phá nhé!
            </div>
          </div>
          <div className="d-flex justify-content-center mb-4">
            <Nav style={{ gap: '16px', padding: '8px' }}>
              <Nav.Item>
                <Nav.Link
                  active={activeTab === 'all'}
                  onClick={() => setActiveTab('all')}
                  style={{
                    borderRadius: '12px',
                    border: activeTab === 'all' ? '1px solid #FF0000' : '1px solid #222',
                    background: activeTab === 'all' ? '#FF0000' : '#fff',
                    color: activeTab === 'all' ? '#fff' : '#222',
                    fontWeight: 600,
                    minWidth: '120px',
                    padding: '8px 16px',
                    fontSize: 'var(--font-size-base)',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    height: '40px',
                    textAlign: 'center'
                  }}
                >
                  Mới nhất
                </Nav.Link>
              </Nav.Item>
              <Nav.Item>
                <Nav.Link
                  active={activeTab === 'Khối kỹ thuật'}
                  onClick={() => setActiveTab('Khối kỹ thuật')}
                  style={{
                    borderRadius: '12px',
                    border: activeTab === 'Khối kỹ thuật' ? '1px solid #FF0000' : '1px solid #222',
                    background: activeTab === 'Khối kỹ thuật' ? '#FF0000' : '#fff',
                    color: activeTab === 'Khối kỹ thuật' ? '#fff' : '#222',
                    fontWeight: 600,
                    minWidth: '120px',
                    padding: '8px 16px',
                    fontSize: 'var(--font-size-base)',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    height: '40px',
                    textAlign: 'center'
                  }}
                >
                  Khối kỹ thuật
                </Nav.Link>
              </Nav.Item>
              <Nav.Item>
                <Nav.Link
                  active={activeTab === 'Khối kinh doanh'}
                  onClick={() => setActiveTab('Khối kinh doanh')}
                  style={{
                    borderRadius: '12px',
                    border: activeTab === 'Khối kinh doanh' ? '1px solid #FF0000' : '1px solid #222',
                    background: activeTab === 'Khối kinh doanh' ? '#FF0000' : '#fff',
                    color: activeTab === 'Khối kinh doanh' ? '#fff' : '#222',
                    fontWeight: 600,
                    minWidth: '120px',
                    padding: '8px 16px',
                    fontSize: 'var(--font-size-base)',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    height: '40px',
                    textAlign: 'center'
                  }}
                >
                  Khối kinh doanh
                </Nav.Link>
              </Nav.Item>
              <Nav.Item>
                <Nav.Link
                  active={activeTab === 'Kiểm soát Nội Bộ'}
                  onClick={() => setActiveTab('Kiểm soát Nội Bộ')}
                  style={{
                    borderRadius: '12px',
                    border: activeTab === 'Kiểm soát Nội Bộ' ? '1px solid #FF0000' : '1px solid #222',
                    background: activeTab === 'Kiểm soát Nội Bộ' ? '#FF0000' : '#fff',
                    color: activeTab === 'Kiểm soát Nội Bộ' ? '#fff' : '#222',
                    fontWeight: 600,
                    minWidth: '120px',
                    padding: '8px 16px',
                    fontSize: 'var(--font-size-base)',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    height: '40px',
                    textAlign: 'center'
                  }}
                >
                  Kiểm soát Nội Bộ
                </Nav.Link>
              </Nav.Item>
              <Nav.Item>
                <Nav.Link
                  active={activeTab === 'Khối Backoffice'}
                  onClick={() => setActiveTab('Khối Backoffice')}
                  style={{
                    borderRadius: '12px',
                    border: activeTab === 'Khối Backoffice' ? '1px solid #FF0000' : '1px solid #222',
                    background: activeTab === 'Khối Backoffice' ? '#FF0000' : '#fff',
                    color: activeTab === 'Khối Backoffice' ? '#fff' : '#222',
                    fontWeight: 600,
                    minWidth: '120px',
                    padding: '8px 16px',
                    fontSize: 'var(--font-size-base)',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    height: '40px',
                    textAlign: 'center'
                  }}
                >
                  Khối Backoffice
                </Nav.Link>
              </Nav.Item>
            </Nav>
          </div>

          <Row className="g-4">
            {loading ? (
              <div className="text-center py-5 w-100">
                <div className="spinner-border text-danger" role="status">
                  <span className="visually-hidden">Đang tải dữ liệu...</span>
                </div>
              </div>
            ) : error ? (
              <>
                {/* Sample job frames when API is not connected - ĐÚNG TÊN VÀ THỨ TỰ */}
                <Col md={4} className="mb-4">
                  <div className="h-100 border-0 shadow-sm" style={{ borderRadius: 16, background: '#fff', padding: 24, display: 'flex', flexDirection: 'column', minHeight: 180 }}>
                    <div className="d-flex align-items-center mb-2">
                      <img src="/images/thdvuong.jpg" alt="THD SECURITY" style={{ width: 40, height: 40, marginRight: 12 }} />
                      <div>
                        <div className="fw-bold" style={{ fontSize: 16 }}>
                          <Link to="/jobs/11" className="text-decoration-none text-dark">Thực tập sinh Frontend</Link>
                        </div>
                        <div className="text-muted" style={{ fontSize: 16 }}>THD CYBER SECURITY</div>
                      </div>
                    </div>
                    <div className="mt-auto pt-2">
                      <div className="d-flex align-items-center mb-1" style={{ color: '#888', fontSize: 16 }}>
                        <FontAwesomeIcon icon={faMapMarkerAlt} className="me-2" />
                        Hồ Chí Minh
                      </div>
                      <div className="d-flex align-items-center" style={{ color: '#888', fontSize: 16 }}>
                        <FontAwesomeIcon icon={faClock} className="me-2" />
                        Fulltime
                      </div>
                    </div>
                  </div>
                </Col>
                <Col md={4} className="mb-4">
                  <div className="h-100 border-0 shadow-sm" style={{ borderRadius: 16, background: '#fff', padding: 24, display: 'flex', flexDirection: 'column', minHeight: 180 }}>
                    <div className="d-flex align-items-center mb-2">
                      <img src="/images/thdvuong.jpg" alt="THD SECURITY" style={{ width: 40, height: 40, marginRight: 12 }} />
                      <div>
                        <div className="fw-bold" style={{ fontSize: 16 }}>
                          <Link to="/jobs/12" className="text-decoration-none text-dark">Thực tập sinh Backend</Link>
                        </div>
                        <div className="text-muted" style={{ fontSize: 16 }}>THD CYBER SECURITY</div>
                      </div>
                    </div>
                    <div className="mt-auto pt-2">
                      <div className="d-flex align-items-center mb-1" style={{ color: '#888', fontSize: 16 }}>
                        <FontAwesomeIcon icon={faMapMarkerAlt} className="me-2" />
                        Hồ Chí Minh
                      </div>
                      <div className="d-flex align-items-center" style={{ color: '#888', fontSize: 16 }}>
                        <FontAwesomeIcon icon={faClock} className="me-2" />
                        Fulltime
                      </div>
                    </div>
                  </div>
                </Col>
                <Col md={4} className="mb-4">
                  <div className="h-100 border-0 shadow-sm" style={{ borderRadius: 16, background: '#fff', padding: 24, display: 'flex', flexDirection: 'column', minHeight: 180 }}>
                    <div className="d-flex align-items-center mb-2">
                      <img src="/images/thdvuong.jpg" alt="THD SECURITY" style={{ width: 40, height: 40, marginRight: 12 }} />
                      <div>
                        <div className="fw-bold" style={{ fontSize: 16 }}>
                          <Link to="/jobs/13" className="text-decoration-none text-dark">Thực tập sinh Mobile Developer</Link>
                        </div>
                        <div className="text-muted" style={{ fontSize: 16 }}>THD CYBER SECURITY</div>
                      </div>
                    </div>
                    <div className="mt-auto pt-2">
                      <div className="d-flex align-items-center mb-1" style={{ color: '#888', fontSize: 16 }}>
                        <FontAwesomeIcon icon={faMapMarkerAlt} className="me-2" />
                        Hồ Chí Minh
                      </div>
                      <div className="d-flex align-items-center" style={{ color: '#888', fontSize: 16 }}>
                        <FontAwesomeIcon icon={faClock} className="me-2" />
                        Fulltime
                      </div>
                    </div>
                  </div>
                </Col>
                <Col md={4} className="mb-4">
                  <div className="h-100 border-0 shadow-sm" style={{ borderRadius: 16, background: '#fff', padding: 24, display: 'flex', flexDirection: 'column', minHeight: 180 }}>
                    <div className="d-flex align-items-center mb-2">
                      <img src="/images/thdvuong.jpg" alt="THD SECURITY" style={{ width: 40, height: 40, marginRight: 12 }} />
                      <div>
                        <div className="fw-bold" style={{ fontSize: 16 }}>
                          <Link to="/jobs/14" className="text-decoration-none text-dark">Thực tập sinh An toàn thông tin</Link>
                        </div>
                        <div className="text-muted" style={{ fontSize: 16 }}>THD CYBER SECURITY</div>
                      </div>
                    </div>
                    <div className="mt-auto pt-2">
                      <div className="d-flex align-items-center mb-1" style={{ color: '#888', fontSize: 16 }}>
                        <FontAwesomeIcon icon={faMapMarkerAlt} className="me-2" />
                        Hồ Chí Minh
                      </div>
                      <div className="d-flex align-items-center" style={{ color: '#888', fontSize: 16 }}>
                        <FontAwesomeIcon icon={faClock} className="me-2" />
                        Fulltime
                      </div>
                    </div>
                  </div>
                </Col>
                <Col md={4} className="mb-4">
                  <div className="h-100 border-0 shadow-sm" style={{ borderRadius: 16, background: '#fff', padding: 24, display: 'flex', flexDirection: 'column', minHeight: 180 }}>
                    <div className="d-flex align-items-center mb-2">
                      <img src="/images/thdvuong.jpg" alt="THD SECURITY" style={{ width: 40, height: 40, marginRight: 12 }} />
                      <div>
                        <div className="fw-bold" style={{ fontSize: 16 }}>
                          <Link to="/jobs/16" className="text-decoration-none text-dark">Thực tập sinh Giải pháp an toàn thông tin</Link>
                        </div>
                        <div className="text-muted" style={{ fontSize: 16 }}>THD CYBER SECURITY</div>
                      </div>
                    </div>
                    <div className="mt-auto pt-2">
                      <div className="d-flex align-items-center mb-1" style={{ color: '#888', fontSize: 16 }}>
                        <FontAwesomeIcon icon={faMapMarkerAlt} className="me-2" />
                        Hồ Chí Minh
                      </div>
                      <div className="d-flex align-items-center" style={{ color: '#888', fontSize: 16 }}>
                        <FontAwesomeIcon icon={faClock} className="me-2" />
                        Fulltime
                      </div>
                    </div>
                  </div>
                </Col>
                <Col md={4} className="mb-4">
                  <div className="h-100 border-0 shadow-sm" style={{ borderRadius: 16, background: '#fff', padding: 24, display: 'flex', flexDirection: 'column', minHeight: 180 }}>
                    <div className="d-flex align-items-center mb-2">
                      <img src="/images/thdvuong.jpg" alt="THD SECURITY" style={{ width: 40, height: 40, marginRight: 12 }} />
                      <div>
                        <div className="fw-bold" style={{ fontSize: 16 }}>
                          <Link to="/jobs/18" className="text-decoration-none text-dark">Thực tập sinh Phát triển đối tác</Link>
                        </div>
                        <div className="text-muted" style={{ fontSize: 16 }}>THD CYBER SECURITY</div>
                      </div>
                    </div>
                    <div className="mt-auto pt-2">
                      <div className="d-flex align-items-center mb-1" style={{ color: '#888', fontSize: 16 }}>
                        <FontAwesomeIcon icon={faMapMarkerAlt} className="me-2" />
                        Hồ Chí Minh
                      </div>
                      <div className="d-flex align-items-center" style={{ color: '#888', fontSize: 16 }}>
                        <FontAwesomeIcon icon={faClock} className="me-2" />
                        Fulltime
                      </div>
                    </div>
                  </div>
                </Col>
              </>
            ) : filteredJobs.length === 0 ? (
              <div className="text-center py-5 w-100">
                <p>Không có công việc nào trong danh mục này. Vui lòng kiểm tra lại sau.</p>
              </div>
            ) : (
              filteredJobs.map((job) => (
                <Col md={4} key={job.id}>
                  <Link to={`/jobs/${job.id}`} className="text-decoration-none">
                    <div
                      className="job-item p-3 bg-white rounded shadow-sm"
                      style={{
                        height: '220px',
                        display: 'flex',
                        flexDirection: 'column',
                        justifyContent: 'flex-start',
                        alignItems: 'flex-start',
                        padding: '15px',
                        border: '1.5px solid #eee',
                        boxShadow: '0 2px 8px rgba(0,0,0,0.04)',
                        marginBottom: '8px',
                      }}
                    >
                      <div className="job-meta" style={{ color: '#888', fontSize: 'var(--font-size-base)', marginBottom: '6px' }}>
                        <FontAwesomeIcon icon={faMapMarkerAlt} className="me-1" />
                        {job.diachi}
                        {job.thoigianlamviec && (
                          <span style={{ marginLeft: 8 }}>
                            | {job.thoigianlamviec}
                          </span>
                        )}
                      </div>
                      <h5 className="text-danger mb-2" style={{ fontWeight: 500, fontSize: 'var(--font-size-base)' }}>{job.tenvitri}</h5>
                    </div>
                  </Link>
                </Col>
              ))
            )}
          </Row>

          <div className="text-center mt-4">
            <Button 
              className="px-4 py-2 fw-medium rounded-pill" 
              size="lg"
              style={{ 
                minWidth: '180px', 
                fontWeight: 600, 
                fontSize: 'var(--font-size-base)', 
                borderRadius: '24px',
                backgroundColor: '#FF0000',
                border: 'none',
                color: '#fff'
              }}
              onClick={() => navigate('/jobs')}
            >
              Xem thêm
              <FontAwesomeIcon icon={faChevronRight} className="ms-2" />
            </Button>
          </div>
        </Container>
      </section>

      {/* Company Info Section - Static Content */}
      <div className="text-white py-5 mt-5" style={{ 
        background: 'linear-gradient(180deg, #FF0000 0%, #000000 100%)',
        width: '100%',
        maxWidth: '100vw',
        overflow: 'hidden'
      }}>
        <Container fluid="lg">
          <Row className="align-items-center">
            <Col md={8}>
              <h2 className="mb-4 fw-bold" style={{ fontSize: 'var(--font-size-lg)' }}>Vì sao nên chọn THD?</h2>
              <p className="mb-4" style={{ fontSize: 'var(--font-size-base)', opacity: 0.9 }}>
                Khi gia nhập THD, bạn sẽ được trải nghiệm môi trường làm việc năng động, sáng tạo cùng những phúc lợi hấp dẫn:
              </p>
              <ul className="list-unstyled benefits-list" style={{ fontSize: 'var(--font-size-base)' }}>
                <li className="mb-3 d-flex align-items-center">
                  <div className="benefit-icon me-3" style={{ 
                    backgroundColor: 'rgba(255, 255, 255, 0.1)', 
                    borderRadius: '50%',
                    width: '40px',
                    height: '40px',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center'
                  }}>
                    <FontAwesomeIcon icon={faSearch} style={{ color: '#fff' }} />
                  </div>
                  <span>Được đào tạo nâng cao kỹ năng, nghiệp vụ</span>
                </li>
                <li className="mb-3 d-flex align-items-center">
                  <div className="benefit-icon me-3" style={{ 
                    backgroundColor: 'rgba(255, 255, 255, 0.1)', 
                    borderRadius: '50%',
                    width: '40px',
                    height: '40px',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center'
                  }}>
                    <FontAwesomeIcon icon={faSearch} style={{ color: '#fff' }} />
                  </div>
                  <span>Mức lương, thưởng và phúc lợi hấp dẫn</span>
                </li>
                <li className="mb-3 d-flex align-items-center">
                  <div className="benefit-icon me-3" style={{ 
                    backgroundColor: 'rgba(255, 255, 255, 0.1)', 
                    borderRadius: '50%',
                    width: '40px',
                    height: '40px',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center'
                  }}>
                    <FontAwesomeIcon icon={faSearch} style={{ color: '#fff' }} />
                  </div>
                  <span>Nhiều chương trình đào tạo, phát triển bản thân và kỹ thuật thăng tiến rõ ràng</span>
                </li>
                <li className="mb-3 d-flex align-items-center">
                  <div className="benefit-icon me-3" style={{ 
                    backgroundColor: 'rgba(255, 255, 255, 0.1)', 
                    borderRadius: '50%',
                    width: '40px',
                    height: '40px',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center'
                  }}>
                    <FontAwesomeIcon icon={faSearch} style={{ color: '#fff' }} />
                  </div>
                  <span>Hỗ trợ thí chứng chỉ (nếu có)</span>
                </li>
                <li className="mb-3 d-flex align-items-center">
                  <div className="benefit-icon me-3" style={{ 
                    backgroundColor: 'rgba(255, 255, 255, 0.1)', 
                    borderRadius: '50%',
                    width: '40px',
                    height: '40px',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center'
                  }}>
                    <FontAwesomeIcon icon={faSearch} style={{ color: '#fff' }} />
                  </div>
                  <span>Tham gia các dự án lớn về Chính phủ, Y tế 4.0, SmartCity, Doanh nghiệp, Ngân hàng...</span>
                </li>
              </ul>
            </Col>
            <Col md={4} className="text-center d-flex align-items-center justify-content-center">
              <div className="position-relative" style={{
                width: '350px',
                height: '350px',
                borderRadius: '20px',
                overflow: 'hidden',
                boxShadow: '0 10px 30px rgba(0,0,0,0.3)'
              }}>
                <img 
                  src="/images/congnghe.jpg" 
                  alt="THD Logo"
                  className="img-fluid"
                  style={{
                    width: '100%',
                    height: '100%',
                    objectFit: 'cover'
                  }}
                />
              </div>
            </Col>
          </Row>
        </Container>
      </div>

      {/* Recruitment Process - Static Content */}
      <section className="recruitment-process py-5" style={{ 
        width: '100%',
        maxWidth: '100vw',
        overflow: 'hidden'
      }}>
        <Container fluid="lg">
          <h2 className="text-center mb-5" style={{ fontSize: 'var(--font-size-lg)' }}>Quy trình tuyển dụng</h2>
          <Row className="g-4">
            <Col md={3}>
              <div className="process-step text-center">
                <img
                  src="/images/b1.jpg"
                  alt="Bước 1"
                  className="img-fluid rounded mb-3"
                />
                <h5 style={{ fontSize: 'var(--font-size-base)' }}>Bước 1: Ứng tuyển</h5>
              </div>
            </Col>
            <Col md={3}>
              <div className="process-step text-center">
                <img
                  src="/images/b2.jpg"
                  alt="Bước 2"
                  className="img-fluid rounded mb-3"
                />
                <h5 style={{ fontSize: 'var(--font-size-base)' }}>Bước 2: Đánh giá năng lực</h5>
              </div>
            </Col>
            <Col md={3}>
              <div className="process-step text-center">
                <img
                  src="/images/b3.jpg"
                  alt="Bước 3"
                  className="img-fluid rounded mb-3"
                />
                <h5 style={{ fontSize: 'var(--font-size-base)' }}>Bước 3: Phỏng vấn trực tiếp</h5>
              </div>
            </Col>
            <Col md={3}>
              <div className="process-step text-center">
                <img
                  src="/images/b4.jpg"
                  alt="Bước 4"
                  className="img-fluid rounded mb-3"
                />
                <h5 style={{ fontSize: 'var(--font-size-base)' }}>Bước 4: Chờ thư mời nhận việc</h5>
              </div>
            </Col>
          </Row>
        </Container>
      </section>

      {/* FAQ Section - Static Content */}
      <section className="faq py-5 bg-light" style={{ 
        width: '100%',
        maxWidth: '100vw',
        overflow: 'hidden'
      }}>
        <Container fluid="lg">
          <Row>
            <Col md={3} className="d-flex align-items-center justify-content-center" style={{ minHeight: '100%' }}>
              <h4 className="fw-bold" style={{ fontSize: 'var(--font-size-lg)', minWidth: '120px', marginTop: '32px', marginBottom: '32px' }}>FAQ</h4>
            </Col>
            <Col md={9}>
              <Accordion className="shadow-none border-0" defaultActiveKey="-1">
                <Accordion.Item eventKey="0" className="border-0">
                  <Accordion.Header style={{ borderBottom: '1px solid #eee', fontWeight: 500 }}>
                    Nếu tôi chưa có nhiều kinh nghiệm trong ngành, tôi có cơ hội được tuyển không?
                  </Accordion.Header>
                  <Accordion.Body>
                    [Nội dung câu trả lời]
                  </Accordion.Body>
                </Accordion.Item>
                <Accordion.Item eventKey="1" className="border-0">
                  <Accordion.Header style={{ borderBottom: '1px solid #eee', fontWeight: 500 }}>
                    Tôi cần chuẩn bị gì cho buổi phỏng vấn tại THD?
                  </Accordion.Header>
                  <Accordion.Body>
                    [Nội dung câu trả lời]
                  </Accordion.Body>
                </Accordion.Item>
                <Accordion.Item eventKey="2" className="border-0">
                  <Accordion.Header style={{ borderBottom: '1px solid #eee', fontWeight: 500 }}>
                    Thời gian thông báo kết quả phỏng vấn là bao lâu?
                  </Accordion.Header>
                  <Accordion.Body>
                    [Nội dung câu trả lời]
                  </Accordion.Body>
                </Accordion.Item>
                <Accordion.Item eventKey="3" className="border-0">
                  <Accordion.Header style={{ borderBottom: '1px solid #eee', fontWeight: 500 }}>
                    Nếu trượt vòng phỏng vấn, tôi có thể ứng tuyển lại không?
                  </Accordion.Header>
                  <Accordion.Body>
                    [Nội dung câu trả lời]
                  </Accordion.Body>
                </Accordion.Item>
                <Accordion.Item eventKey="4" className="border-0">
                  <Accordion.Header style={{ borderBottom: '1px solid #eee', fontWeight: 500 }}>
                    Phỏng vấn tại THD sẽ diễn ra trực tiếp hay trực tuyến?
                  </Accordion.Header>
                  <Accordion.Body>
                    [Nội dung câu trả lời]
                  </Accordion.Body>
                </Accordion.Item>
                <Accordion.Item eventKey="5" className="border-0">
                  <Accordion.Header style={{ borderBottom: '1px solid #eee', fontWeight: 500 }}>
                    Kết quả bài kiểm tra đánh giá năng lực sẽ ảnh hưởng bao nhiêu đến quyết định tuyển dụng?
                  </Accordion.Header>
                  <Accordion.Body>
                    [Nội dung câu trả lời]
                  </Accordion.Body>
                </Accordion.Item>
              </Accordion>
            </Col>
          </Row>
        </Container>
      </section>
    </div>
  );
};

export default Home; 