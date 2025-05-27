import React from 'react';
import { Container, Row, Col } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import { FaFacebookF, FaLinkedinIn, FaYoutube, FaEnvelope, FaPhone } from 'react-icons/fa';

const Footer = () => {
  return (
    <footer style={{ background: '#000000', color: '#fff', marginTop: 40 }}>
      {/* ISO Certificates */}
      <div style={{ padding: '20px 0' }}>
        <Container>
          <Row className="justify-content-center align-items-center g-0">
            <Col xs={6} md={2} className="text-center d-flex justify-content-center">
              <img src="/images/iso9001.png" alt="ISO 9001" style={{ height: 80, width: 'auto', objectFit: 'contain' }} />
            </Col>
            <Col xs={6} md={2} className="text-center d-flex justify-content-center">
              <img src="/images/iso27001.png" alt="ISO 27001" style={{ height: 80, width: 'auto', objectFit: 'contain' }} />
            </Col>
            <Col xs={6} md={2} className="text-center d-flex justify-content-center">
              <img src="/images/iso30107-3.png" alt="ISO 30107-3" style={{ height: 80, width: 'auto', objectFit: 'contain' }} />
            </Col>
          </Row>
        </Container>
      </div>

      <div style={{ padding: '40px 0 0 0' }}>
        <Container>
          {/* Row for headquarters and branch office */}
          <Row className="mb-4">
            {/* Trụ sở chính */}
            <Col md={4}>
              <div style={{ fontWeight: 600, marginBottom: 12, fontSize: '16px' }}>Trụ sở chính</div>
              <ul style={{ listStyle: 'none', padding: 0, margin: 0, color: '#e0e0e0', fontSize: '14px' }}>
                <li style={{ marginBottom: 6 }}>60 Nguyễn Văn Thủ, Phương Đa Kao, Quận 1, TP.Hồ Chí Minh</li>
              </ul>
              <div className="contact-info">
                <div style={{ fontWeight: 600, marginBottom: 12, fontSize: '16px', color: '#fff' }}>Thông tin liên hệ</div>
                <div style={{ fontSize: '14px', color: '#e0e0e0' }}>
                  <FaEnvelope className="me-2" />
                  sales@thdcybersecurity.com
                </div>
                <div style={{ fontSize: '14px', color: '#e0e0e0' }}>
                  <FaPhone className="me-2" />
                  0853 287 799
                </div>
              </div>
            </Col>
            {/* Chi nhánh */}
            <Col md={8}>
              <div style={{ fontWeight: 600, marginBottom: 12, fontSize: '16px' }}>Chi nhánh</div>
              <ul style={{ listStyle: 'none', padding: 0, margin: 0, color: '#e0e0e0', fontSize: '14px' }}>
                <li style={{ marginBottom: 6 }}>Hồ Chí Minh: Tòa nhà Ereka, 17 Hồ Bá Kiện, Phường 15, Quận 10, Tp.HCM, Việt Nam</li>
                <li style={{ marginBottom: 6 }}>Gia Lai: Lô 10-1 Phù Đổng Hoa Lư, Phường Phù Đổng, Tp. Pleiku, Gia Lai, Việt Nam.</li>
                <li style={{ marginBottom: 6 }}>Cần Thơ: Số 7A2 Đường Bùi Quang Trinh, KDC Phú An, Phường Phú Thứ, Quận Cái Răng, Tp. Cần Thơ, Việt Nam.</li>
                <li>Hà Nội: Tầng 8, Tòa nhà AC, Số 3, Ngõ 78 Duy Tân, Cầu Giấy, Tp. Hà Nội, Việt Nam.</li>
              </ul>
            </Col>
          </Row>

          {/* Horizontal divider */}
          <div style={{ height: '1px', background: '#444', margin: '20px 0' }} />

          {/* Row for service blocks */}
          <Row>
            <Col xs={6} sm={4} md={2} className="mb-3">
              <div style={{ fontWeight: 600, marginBottom: 8, fontSize: '16px' }}>Khối dịch vụ công</div>
              <ul style={{ listStyle: 'none', padding: 0, color: '#e0e0e0', fontSize: '14px' }}>
                <li>Quản Trị Phát Hiện Và Xử Lý Sự Cố</li>
                <li>Kiểm Thử Xâm Nhập</li>
                <li>Dịch Vụ Phòng Chống Và Tiêu Diệt Virus</li>
              </ul>
            </Col>
            <Col xs={6} sm={4} md={2} className="mb-3">
              <div style={{ fontWeight: 600, marginBottom: 8, fontSize: '16px' }}>Khối ngân hàng</div>
              <ul style={{ listStyle: 'none', padding: 0, color: '#e0e0e0', fontSize: '14px' }}>
                <li>Quản Trị Phát Hiện Và Xử Lý Sự Cố</li>
                <li>Kiểm Thử Xâm Nhập</li>
                <li>Xử lý Phần Mềm Độc Hại</li>
                <li>Dịch Vụ Phòng Chống Và Tiêu Diệt Virus</li>
              </ul>
            </Col>
            <Col xs={6} sm={4} md={2} className="mb-3">
              <div style={{ fontWeight: 600, marginBottom: 8, fontSize: '16px' }}>Khối tài chính</div>
              <ul style={{ listStyle: 'none', padding: 0, color: '#e0e0e0', fontSize: '14px' }}>
                <li>Quản Trị Phát Hiện Và Xử Lý Sự Cố</li>
                <li>Kiểm Thử Xâm Nhập</li>
                <li>Xử lý Phần Mềm Độc Hại</li>
                <li>Dịch Vụ Phòng Chống Và Tiêu Diệt Virus</li>
              </ul>
            </Col>
            <Col xs={6} sm={4} md={2} className="mb-3">
              <div style={{ fontWeight: 600, marginBottom: 8, fontSize: '16px' }}>Khối y tế</div>
              <ul style={{ listStyle: 'none', padding: 0, color: '#e0e0e0', fontSize: '14px' }}>
                <li>Quản Trị Phát Hiện Và Xử Lý Sự Cố</li>
                <li>Kiểm Thử Xâm Nhập</li>
                <li>Xử lý Phần Mềm Độc Hại</li>
                <li>Dịch Vụ Phòng Chống Và Tiêu Diệt Virus</li>
              </ul>
            </Col>
            <Col xs={6} sm={4} md={2} className="mb-3">
              <div style={{ fontWeight: 600, marginBottom: 8, fontSize: '16px' }}>Khối giáo dục</div>
              <ul style={{ listStyle: 'none', padding: 0, color: '#e0e0e0', fontSize: '14px' }}>
                <li>Quản Trị Phát Hiện Và Xử Lý Sự Cố</li>
                <li>Kiểm Thử Xâm Nhập</li>
                <li>Xử lý Phần Mềm Độc Hại</li>
                <li>Dịch Vụ Phòng Chống Và Tiêu Diệt Virus</li>
              </ul>
            </Col>
            <Col xs={6} sm={4} md={2} className="mb-3">
              <div style={{ fontWeight: 600, marginBottom: 8, fontSize: '16px' }}>Khối doanh nghiệp</div>
              <ul style={{ listStyle: 'none', padding: 0, color: '#e0e0e0', fontSize: '14px' }}>
                <li>Quản Trị Phát Hiện Và Xử Lý Sự Cố</li>
                <li>Kiểm Thử Xâm Nhập</li>
                <li>Xử lý Phần Mềm Độc Hại</li>
                <li>Dịch Vụ Phòng Chống Và Tiêu Diệt Virus</li>
              </ul>
            </Col>
          </Row>

          {/* Horizontal divider */}
          <div style={{ height: '1px', background: '#444', margin: '20px 0' }} />
        </Container>
      </div>
      <div style={{ borderTop: '1px solid #444', marginTop: 24, padding: '18px 0 8px 0', background: '#000000' }}>
        <Container>
          <Row className="align-items-center justify-content-between">
            <Col md={6} className="mb-3 mb-md-0 d-flex align-items-center">
              <img src="/images/logoden.png" alt="THD Logo" style={{ height: 48, marginRight: 16 }} />
              <span style={{ color: '#fff', fontWeight: 600, fontSize: '14px', whiteSpace: 'nowrap' }}>© 2025 THD Cyber Security. All Rights Reserved</span>
            </Col>
            <Col md={6} className="d-flex justify-content-end align-items-center">
              <div className="d-flex align-items-center">
                <Link to="#" style={{ color: '#fff', margin: '0 12px', fontSize: '14px' }}><FaFacebookF /></Link>
                <Link to="#" style={{ color: '#fff', margin: '0 12px', fontSize: '14px' }}><FaLinkedinIn /></Link>
                <Link to="#" style={{ color: '#fff', margin: '0 12px', fontSize: '14px' }}><FaYoutube /></Link>
                <Link to="#" style={{ color: '#fff', marginLeft: 24, fontSize: '14px' }}>Sitemap</Link>
                <Link to="#" style={{ color: '#fff', marginLeft: 24, fontSize: '14px' }}>Quy định sử dụng</Link>
              </div>
            </Col>
          </Row>
        </Container>
      </div>
    </footer>
  );
};

export default Footer; 