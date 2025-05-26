import React, { useState, useEffect } from 'react';
import { Container, Row, Col, Button, Card, Spinner, Dropdown } from 'react-bootstrap';
import { Link, useParams, useNavigate } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faMapMarkerAlt, faClock, faShare, faArrowLeft, faChevronRight, faCopy, faChevronLeft } from '@fortawesome/free-solid-svg-icons';
import { FaFacebookF, FaLinkedinIn } from 'react-icons/fa';
import { fetchJobs } from '../services/api';
import jobData from '../components/data';

const JobDetail = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [job, setJob] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [relatedJobs, setRelatedJobs] = useState([]);
  
  // Fetch job details based on the ID
  useEffect(() => {
    const getJob = async () => {
      try {
        setLoading(true);
        // Try to get data from API first
        const result = await fetchJobs();
        if (result && result.data) {
          const currentJob = result.data.find(j => j.id === parseInt(id));
          if (currentJob) {
            setJob(currentJob);
            // Get related jobs from API
            const related = result.data
              .filter(j => j.id !== parseInt(id) && j.loaivitri === currentJob.loaivitri)
              .slice(0, 2);
            setRelatedJobs(related);
          } else {
            // If job not found in API, try data.js
            const jobFromData = jobData.data.find(j => j.id === parseInt(id));
            if (jobFromData) {
              setJob(jobFromData);
              // Get related jobs from data.js
              const related = jobData.data
                .filter(j => j.id !== parseInt(id) && j.loaivitri === jobFromData.loaivitri)
                .slice(0, 2);
              setRelatedJobs(related);
            } else {
              setError("Không tìm thấy vị trí tuyển dụng này");
            }
          }
        } else {
          // If API fails, use data.js
          const jobFromData = jobData.data.find(j => j.id === parseInt(id));
          if (jobFromData) {
            setJob(jobFromData);
            // Get related jobs from data.js
            const related = jobData.data
              .filter(j => j.id !== parseInt(id) && j.loaivitri === jobFromData.loaivitri)
              .slice(0, 2);
            setRelatedJobs(related);
          } else {
            setError("Không tìm thấy vị trí tuyển dụng này");
          }
        }
      } catch (err) {
        // If API call fails, use data.js
        const jobFromData = jobData.data.find(j => j.id === parseInt(id));
        if (jobFromData) {
          setJob(jobFromData);
          // Get related jobs from data.js
          const related = jobData.data
            .filter(j => j.id !== parseInt(id) && j.loaivitri === jobFromData.loaivitri)
            .slice(0, 2);
          setRelatedJobs(related);
        } else {
          setError("Không tìm thấy vị trí tuyển dụng này");
        }
      } finally {
        setLoading(false);
      }
    };
    
    getJob();
  }, [id]);
  
  // Helper function to render content with bullet points
  const renderWithBullets = (content) => {
    if (!content) return null;
    
    // Check if content has bullet points (starts with - or * or •)
    if (/^[\s]*[-*•]/.test(content)) {
      return content.split('\n').map((line, index) => {
        if (line.trim().startsWith('-') || line.trim().startsWith('*') || line.trim().startsWith('•')) {
          return <li key={index}>{line.trim().substring(1).trim()}</li>;
        }
        return line.trim() ? <p key={index}>{line}</p> : null;
      });
    }
    
    return <div style={{ whiteSpace: 'pre-line' }}>{content}</div>;
  };
  
  if (loading) {
    return (
      <div className="text-center py-5">
        <div className="spinner-border text-danger" role="status">
          <span className="visually-hidden">Đang tải...</span>
        </div>
      </div>
    );
  }
  
  if (error || !job) {
    return (
      <Container className="py-5">
        <div className="text-center">
          <h3 className="text-danger mb-4">{error || 'Không tìm thấy vị trí tuyển dụng này.'}</h3>
          <Button variant="danger" onClick={() => navigate('/jobs')}>
            <FontAwesomeIcon icon={faChevronLeft} className="me-2" />
            Quay lại danh sách
          </Button>
        </div>
      </Container>
    );
  }

  return (
    <>
      {/* Red Header */}
      <div className="text-white py-4" style={{ background: '#FF0000' }}>
        <Container>
          <div className="d-flex flex-column">
            <div className="d-flex align-items-center mb-2">
              <Link to="/jobs" className="text-white text-decoration-none">
                <FontAwesomeIcon icon={faArrowLeft} className="me-2" />
                Quay lại
              </Link>
            </div>
            
            <h3 className="mb-0" style={{ fontSize: 'var(--font-size-lg)' }}>{job.tenvitri}</h3>
            <div className="mt-2 small">
              <span className="me-3">{job.loaivitri}</span>
              <span><FontAwesomeIcon icon={faMapMarkerAlt} className="me-1" /> {job.diachi}</span>
            </div>
            <div className="mt-2">
              {/* Nút chia sẻ dạng dropdown */}
              <Dropdown align="end">
                <Dropdown.Toggle variant="outline-light" size="sm" id="dropdown-share">
                  <FontAwesomeIcon icon={faShare} className="me-1" />
                  Chia sẻ
                </Dropdown.Toggle>
                <Dropdown.Menu>
                  <Dropdown.Item onClick={() => {navigator.clipboard.writeText(window.location.href)}}>
                    <FontAwesomeIcon icon={faCopy} className="me-2" />Sao chép liên kết
                  </Dropdown.Item>
                  <Dropdown.Item onClick={() => window.open(`https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(window.location.href)}`, '_blank')}>
                    <FaFacebookF className="me-2" />Chia sẻ Facebook
                  </Dropdown.Item>
                  <Dropdown.Item onClick={() => window.open(`https://www.linkedin.com/sharing/share-offsite/?url=${encodeURIComponent(window.location.href)}`, '_blank')}>
                    <FaLinkedinIn className="me-2" />Chia sẻ LinkedIn
                  </Dropdown.Item>
                </Dropdown.Menu>
              </Dropdown>
            </div>
          </div>
        </Container>
      </div>

      {/* Breadcrumb */}
      <nav className="bg-light">
        <Container className="py-2">
          <div className="d-flex align-items-center">
            <Link to="/" className="text-decoration-none text-dark">Cơ hội việc làm</Link>
            <span className="mx-2">&gt;</span>
            <Link to="/jobs" className="text-decoration-none text-dark">Tìm công việc</Link>
            <span className="mx-2">&gt;</span>
            <span className="text-danger">{job.tenvitri}</span>
          </div>
        </Container>
      </nav>

      <div className="py-4">
        <Container>
          <Row>
            <Col lg={8}>
              {/* Job Description */}
              {job.motacongviec && (
                <div className="mb-5">
                  <h5 className="mb-3" style={{ fontSize: 'var(--font-size-base)' }}>Mô tả công việc</h5>
                  <ul className="ps-3">
                    {renderWithBullets(job.motacongviec)}
                  </ul>
                </div>
              )}

              {/* Job Requirements */}
              {job.yeucaucongviec && (
                <div className="mb-5">
                  <h5 className="mb-3" style={{ fontSize: 'var(--font-size-base)' }}>Yêu cầu công việc</h5>
                  <ul className="ps-3">
                    {renderWithBullets(job.yeucaucongviec)}
                  </ul>
                </div>
              )}

              {/* Benefits */}
              {job.quyenloi && (
                <div className="mb-5">
                  <h5 className="mb-3" style={{ fontSize: 'var(--font-size-base)' }}>Quyền lợi</h5>
                  <ul className="ps-3">
                    {renderWithBullets(job.quyenloi)}
                  </ul>
                </div>
              )}

              {/* Contact Information */}
              {job.thongtinlienhe && (
                <div className="mb-4">
                  <h5 className="mb-3" style={{ fontSize: 'var(--font-size-base)' }}>Liên hệ ứng tuyển</h5>
                  <ul className="ps-3">
                    {renderWithBullets(job.thongtinlienhe)}
                  </ul>
                </div>
              )}
            </Col>

            <Col lg={4}>
              {/* Apply Card */}
              <Card className="border-0 shadow-sm mb-4">
                <Card.Body className="p-4">
                  <h5 className="mb-3" style={{ fontSize: 'var(--font-size-base)' }}>Bạn có hứng thú với vị trí này?</h5>
                  <div className="d-grid gap-2">
                    <Button 
                      variant="danger" 
                      className="py-2"
                      onClick={() => navigate(`/jobs/${id}/apply`)}
                    >
                      Ứng tuyển ngay
                    </Button>
                    <div className="text-center text-muted my-2">hoặc</div>
                    <Button 
                      variant="outline-secondary" 
                      className="py-2"
                      onClick={() => navigate(`/jobs/${id}/refer`)}
                    >
                      Giới thiệu bạn bè
                    </Button>
                  </div>
                </Card.Body>
              </Card>

              {/* Related Jobs */}
              {relatedJobs.length > 0 && (
                <Card className="border-0 shadow-sm">
                  <Card.Body className="p-4">
                    <h5 className="mb-3" style={{ fontSize: 'var(--font-size-base)' }}>Vị trí liên quan</h5>
                    {relatedJobs.map(relatedJob => (
                      <div key={relatedJob.id} className="related-job mb-3 pb-3 border-bottom">
                        <h6 className="mb-1">
                          <Link to={`/jobs/${relatedJob.id}`} className="text-decoration-none text-danger">
                            {relatedJob.tenvitri}
                          </Link>
                        </h6>
                        <div className="small text-muted">
                          <FontAwesomeIcon icon={faMapMarkerAlt} className="me-1 text-danger" />
                          {relatedJob.diachi} <span className="mx-1">|</span>
                          <FontAwesomeIcon icon={faClock} className="ms-1 me-1 text-danger" />
                          {relatedJob.thoigianlamviec}
                        </div>
                      </div>
                    ))}
                  </Card.Body>
                </Card>
              )}
            </Col>
          </Row>
        </Container>
      </div>
    </>
  );
};

export default JobDetail; 