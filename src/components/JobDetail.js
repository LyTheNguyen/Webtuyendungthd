import React, { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import { Container, Row, Col, Card, Button, Spinner } from 'react-bootstrap';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faMapMarkerAlt, faClock, faArrowLeft, faChevronRight, faHome } from '@fortawesome/free-solid-svg-icons';
import { fetchJobs } from '../services/api';

// Mock data for fallback if API fails
const MOCK_JOB = {
  id: 1,
  tenvitri: 'Kỹ sư phát triển phần mềm',
  diachi: 'Hà Nội',
  loaivitri: 'Khối kỹ thuật',
  thoigianlamviec: 'Toàn thời gian',
  motacongviec: '- Design and execute data-driven growth plans to boost user adoption, retention, and engagement for key promotional products and services.\n- Identify market trends, user behaviors, and competitive insights to develop actionable growth opportunities.\n- Lead GTM strategies for new feature rollouts and campaign launches.\n- Coordinate with cross-functional teams and business units to ensure alignment in execution and communication.',
  yeucaucongviec: '- Bachelor\'s degree in Marketing, Business, Economics or a related field. MBA is a plus.\n- 5+ years of experience in growth, product marketing, or digital business strategy.\n- Proven track record in leading growth initiatives in high-growth environments, ideally B2C or digital platforms.\n- Strong business acumen with an analytical mindset; comfortable working with data to inform decisions.\n- Excellent communication and stakeholder management skills.\n- Experience in fintech, promotions, e-commerce or platform-based models is preferred.\n- Familiarity with performance tracking tools, customer research, and agile execution.',
  quyenloi: '- Tham gia các hoạt động văn chơi: đá bóng, chơi game, team, du lịch và team building\n- Nhận thưởng từ các dự án, quà tặng nhớ dịp lễ, Tết...\n- Hỗ trợ đóng đầu môc thực tập\n- Có hỗ trợ thành phần viện chiến thực sau kỳ thực tập mà không cần phải qua vòng or tuyển và thời gian thử việc\n- Được làm việc với các doanh nghiệp, tập đoàn trong và ngoài nước ở nhiều lĩnh vực khác nhau\n- Cơ hội trải nghiệm thực tập nên đạt được kết quả tốt trong thời gian đào tạo\n- Được tham gia các khóa huấn luyện, đào tạo nâng cao kỹ năng, nghiệp vụ từ các hãng công nghệ',
  thongtinlienhe: '- Liên hệ: Trịnh Bảo Long\n- Email: jobs@thdcybersecurity.com\n- Số điện thoại: (+84) 988 471 696'
};

const JobDetail = () => {
  const { id } = useParams();
  const [job, setJob] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [relatedJobs, setRelatedJobs] = useState([]);

  useEffect(() => {
    const getJob = async () => {
      try {
        setLoading(true);
        const response = await fetchJobs();
        console.log('API response:', response);
        
        if (response && response.data && response.data.length > 0) {
          const foundJob = response.data.find(j => j.id === parseInt(id));
          
          if (foundJob) {
            setJob(foundJob);
            
            // Find related jobs (same category, excluding current job)
            const related = response.data
              .filter(j => j.id !== parseInt(id) && j.loaivitri === foundJob.loaivitri)
              .slice(0, 2);
            setRelatedJobs(related);
          } else {
            console.log('Job not found, using mock data');
            setJob(MOCK_JOB);
            setRelatedJobs([]);
          }
        } else {
          console.log('No data from API, using mock data');
          setJob(MOCK_JOB);
          setRelatedJobs([]);
        }
        
        setLoading(false);
      } catch (err) {
        console.error('Error loading job details:', err);
        setJob(MOCK_JOB);
        setLoading(false);
      }
    };

    getJob();
  }, [id]);

  if (loading) {
    return (
      <div className="text-center py-5">
        <Spinner animation="border" variant="danger" />
        <p className="mt-3">Đang tải dữ liệu...</p>
      </div>
    );
  }

  if (!job) {
    return (
      <Container className="py-5">
        <div className="text-center py-5 text-danger">Không tìm thấy vị trí tuyển dụng này.</div>
        <div className="text-center">
          <Link to="/jobs" className="btn btn-outline-primary">
            <FontAwesomeIcon icon={faArrowLeft} className="me-2" />
            Quay lại danh sách
          </Link>
        </div>
      </Container>
    );
  }

  // Helper function to render content with bullet points if needed
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

  return (
    <>
      {/* Red Header */}
      <div className="text-white py-4" style={{ background: '#FF0000' }}>
        <Container>
          <div className="d-flex align-items-center mb-2">
            <Link to="/" className="text-white text-decoration-none" style={{ fontSize: 'var(--font-size-base)' }}>
              <FontAwesomeIcon icon={faHome} className="me-2" />
              Cơ hội việc làm
            </Link>
            <span className="mx-2" style={{ fontSize: 'var(--font-size-base)' }}>|</span>
            <Link to="/jobs" className="text-white text-decoration-none" style={{ fontSize: 'var(--font-size-base)' }}>
              Tìm công việc
            </Link>
            <span className="mx-2" style={{ fontSize: 'var(--font-size-base)' }}>|</span>
            <span style={{ fontSize: 'var(--font-size-base)' }}>{job.tenvitri}</span>
          </div>
          
          <h3 className="mb-0" style={{ fontSize: 'var(--font-size-lg)' }}>{job.tenvitri}</h3>
          <div className="mt-2">
            <span className="me-3">
              {job.loaivitri}
            </span>
            <span className="me-3">
              <FontAwesomeIcon icon={faMapMarkerAlt} className="me-1" /> {job.diachi}
            </span>
          </div>
        </Container>
      </div>

      <Container className="py-4">
        <Row>
          <Col lg={8}>
            {/* Job Description */}
            <div className="mb-5">
              <h5 className="mb-3" style={{ fontSize: 'var(--font-size-lg)' }}>Mô tả công việc</h5>
              <ul className="ps-3">
                {renderWithBullets(job.motacongviec)}
              </ul>
            </div>

            {/* Job Requirements */}
            <div className="mb-5">
              <h5 className="mb-3" style={{ fontSize: 'var(--font-size-lg)' }}>Yêu cầu công việc</h5>
              <ul className="ps-3">
                {renderWithBullets(job.yeucaucongviec)}
              </ul>
            </div>

            {/* Benefits */}
            <div className="mb-5">
              <h5 className="mb-3" style={{ fontSize: 'var(--font-size-lg)' }}>Quyền lợi</h5>
              <ul className="ps-3">
                {renderWithBullets(job.quyenloi)}
              </ul>
            </div>

            {/* Contact Information */}
            <div className="mb-4">
              <h5 className="mb-3" style={{ fontSize: 'var(--font-size-lg)' }}>Liên hệ ứng tuyển</h5>
              <ul className="ps-3">
                {renderWithBullets(job.thongtinlienhe)}
              </ul>
            </div>
          </Col>

          <Col lg={4}>
            {/* Apply Card */}
            <Card className="border-0 shadow-sm mb-4">
              <Card.Body className="p-4">
                <h5 className="mb-3" style={{ fontSize: 'var(--font-size-lg)' }}>Bạn có hứng thú với vị trí này?</h5>
                <div className="d-grid gap-2">
                  <Button 
                    variant="danger" 
                    className="py-2"
                    href="mailto:jobs@thdcybersecurity.com"
                  >
                    Ứng tuyển ngay
                  </Button>
                  <div className="text-center text-muted my-2">hoặc</div>
                  <Button variant="outline-secondary" className="py-2">
                    Giới thiệu bạn bè
                  </Button>
                </div>
              </Card.Body>
            </Card>

            {/* Related Jobs */}
            {relatedJobs.length > 0 && (
              <Card className="border-0 shadow-sm">
                <Card.Body className="p-4">
                  <h5 className="mb-3" style={{ fontSize: 'var(--font-size-lg)' }}>Vị trí liên quan</h5>
                  {relatedJobs.map(relatedJob => (
                    <div key={relatedJob.id} className="related-job mb-3 pb-3 border-bottom">
                      <h6 className="mb-1" style={{ fontSize: 'var(--font-size-base)' }}>
                        <Link to={`/jobs/${relatedJob.id}`} className="text-decoration-none text-danger">
                          {relatedJob.tenvitri}
                        </Link>
                      </h6>
                      <div className="small text-muted" style={{ fontSize: 'var(--font-size-base)' }}>
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
    </>
  );
};

export default JobDetail; 