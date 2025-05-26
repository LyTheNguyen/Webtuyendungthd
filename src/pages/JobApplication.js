import React, { useState, useEffect } from 'react';
import { Container, Row, Col, Form, Button, Dropdown } from 'react-bootstrap';
import { useParams, useNavigate, Link } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faArrowLeft, faShare, faMapMarkerAlt, faCopy } from '@fortawesome/free-solid-svg-icons';
import PhoneInput from 'react-phone-input-2';
import 'react-phone-input-2/lib/bootstrap.css';
import { FaFacebookF, FaLinkedinIn } from 'react-icons/fa';
import { fetchJobs } from '../services/api';
import axios from 'axios';
import jobData from '../data/jobs.json';

// Configure axios defaults
const API_URL = 'http://localhost:1337';
const API_TOKEN = '82e1467e76ede38d2ab2512f13ddcbe6208e554ccca3e50d16519132df4a6b793522932fd63875a22b8385259b4d100fa6df1b91f888385661cb27d7c857d8889a3ee0c0a1487882ae1fc97d0f35b6ba71b23a06c093ab035cb343cbc43f6be86ac599309306fae308eb0c89a98f20c4f0c1c98f50a31bce323f211d321c3c12';

// Create axios instance with default config
const axiosInstance = axios.create({
  baseURL: API_URL,
  headers: {
    'Content-Type': 'application/json',
  }
});

// Add request interceptor to add token to all requests
axiosInstance.interceptors.request.use(
  (config) => {
    config.headers.Authorization = `Bearer ${API_TOKEN}`;
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

const commonInputStyle = {
  height: '40px',
  borderRadius: '8px',
  border: '1px solid #E2E8F0',
  padding: '8px 16px',
  fontFamily: 'var(--font-family-base)',
  fontSize: 'var(--font-size-base)',
};

const commonSelectStyle = {
  height: '40px',
  borderRadius: '8px',
  border: '1px solid #E2E8F0',
  padding: '8px 16px',
  fontFamily: 'var(--font-family-base)',
  fontSize: 'var(--font-size-base)',
  background: '#fff',
};

const commonLabelStyle = {
  fontFamily: 'var(--font-family-base)',
  fontSize: 'var(--font-size-base)',
  fontWeight: '500',
  marginBottom: '8px',
  cursor: 'pointer',
  color: '#555'
};

const commonHeadingStyle = {
  fontFamily: 'var(--font-family-base)',
  fontSize: 'var(--font-size-lg)',
  fontWeight: '700'
};

const commonTextStyle = {
  fontFamily: 'var(--font-family-base)',
  fontSize: 'var(--font-size-base)'
};

const JobApplication = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [submitting, setSubmitting] = useState(false);
  const [job, setJob] = useState(null);
  const [formData, setFormData] = useState({
    id: '',
    documentId: '',
    hovaten: '',
    sdt: '',
    mail: '',
    createdAt: '',
    updatedAt: '',
    publishedAt: '',
    gioitinh: '',
    truongdaihoc: '',
    chuyennganh: '',
    bangcap: '',
    kinhnghiemcongtyganday: '',
    kinhnghiemcongviecganday: '',
    thongtinkhac: '',
    ngaysinh: '',
    thangsinh: '',
    namsinh: '',
    thangnhanbang: '',
    namnhanbang: '',
    kinhnghiemtuthang: '',
    kinhnghiemtunam: '',
    kinhnghiemdenthang: '',
    kinhnghiemdennam: '',
    cv: null,
    day: '',
    month: '',
    year: '',
    fromMonth: '',
    fromYear: '',
    toMonth: '',
    toYear: '',
    hearAbout: '',
    consent: false,
    notRobot: false
  });

  // Fetch job info from Strapi
  useEffect(() => {
    const fetchJob = async () => {
      try {
        // Try to get data from API first
        const allJobsResponse = await fetchJobs();
        if (allJobsResponse && allJobsResponse.data) {
          const foundJob = allJobsResponse.data.find(j => j.id === parseInt(id));
          if (foundJob) {
            setJob(foundJob);
            return;
          }
        }
        // If API fails or job not found, try data.js
        const jobFromData = jobData.data.find(j => j.id === parseInt(id));
        if (jobFromData) {
          setJob(jobFromData);
        } else {
          setJob(null);
        }
      } catch (error) {
        // If API call fails, use data.js
        const jobFromData = jobData.data.find(j => j.id === parseInt(id));
        if (jobFromData) {
          setJob(jobFromData);
        } else {
          setJob(null);
        }
      }
    };
    fetchJob();
  }, [id]);

  const handleInputChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData({
      ...formData,
      [name]: type === 'checkbox' ? checked : value
    });
  };

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      // Check file size
      if (file.size > 5 * 1024 * 1024) {
        alert('File CV không được vượt quá 5MB');
        e.target.value = '';
        return;
      }

      // Check file type - only allow PDF
      if (file.type !== 'application/pdf') {
        alert('File CV phải là định dạng PDF');
        e.target.value = '';
        return;
      }

      setFormData({
        ...formData,
        cv: file
      });
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!formData.notRobot) {
      alert('Vui lòng xác nhận bạn không phải là người máy');
      return;
    }

    try {
      setSubmitting(true);
      alert("Không thể gửi đơn ứng tuyển vì không có kết nối API. Vui lòng thử lại sau khi có kết nối.");
      navigate(`/jobs/${id}`);
    } catch (error) {
      console.error('Lỗi:', error);
      alert(error.message || 'Có lỗi xảy ra. Vui lòng thử lại sau.');
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <div style={{ background: '#fcfcfd', minHeight: '100vh' }}>
      {/* Red Header */}
      <div className="text-white py-4" style={{ background: '#FF0000', marginBottom: 24, padding: '24px 32px' }}>
        <Container>
          <div className="d-flex flex-column">
            <div className="d-flex align-items-center mb-2">
              <Link to={`/jobs/${id}`} className="text-white text-decoration-none" style={{ fontWeight: 500, fontSize: 'var(--font-size-base)' }}>
                <FontAwesomeIcon icon={faArrowLeft} className="me-2" />
                Quay lại
              </Link>
            </div>
            <h4 className="mb-0" style={{ fontWeight: 700, fontSize: 'var(--font-size-lg)' }}>{job ? job.tenvitri : ''}</h4>
            <div className="mt-2 small">
              <span className="me-3">{job ? job.loaivitri : ''}</span>
              <span style={{ fontWeight: 700, fontSize: 'var(--font-size-base)', margin: '0 8px' }}>•</span>
              <span><FontAwesomeIcon icon={faMapMarkerAlt} className="me-1" /> {job ? job.diachi : ''}</span>
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
      <div style={{ maxWidth: 1200, margin: '0 auto', background: '#fff', borderRadius: 16, boxShadow: '0 4px 32px rgba(0,0,0,0.08)', padding: 40, marginTop: -8 }}>
        <h3 className="mb-4 fw-bold" style={{ fontSize: 'var(--font-size-lg)' }}>Đơn ứng tuyển</h3>
        <Form onSubmit={handleSubmit}>
          {/* 1. Thông tin cá nhân */}
          <div className="mb-4">
            <div className="fw-bold mb-2" style={{ fontSize: 'var(--font-size-lg)' }}>1. Thông tin cá nhân:</div>
            <div className="mb-4">
              <div className="d-flex gap-4 mb-4">
                <div className="d-flex align-items-center">
                  <input
                    type="radio"
                    id="male"
                    name="gioitinh"
                    value="male"
                    checked={formData.gioitinh === 'male'}
                    onChange={handleInputChange}
                    className="custom-radio-input"
                    style={{ 
                      width: '20px', 
                      height: '20px',
                      marginRight: '8px',
                      accentColor: '#FF0000'
                    }}
                  />
                  <label htmlFor="male" style={{ fontSize: 'var(--font-size-base)', fontWeight: '500', marginBottom: 0, cursor: 'pointer', color: '#555' }}>Nam</label>
                </div>
                <div className="d-flex align-items-center">
                  <input
                    type="radio"
                    id="female"
                    name="gioitinh"
                    value="female"
                    checked={formData.gioitinh === 'female'}
                    onChange={handleInputChange}
                    className="custom-radio-input"
                    style={{ 
                      width: '20px', 
                      height: '20px',
                      marginRight: '8px',
                      accentColor: '#FF0000'
                    }}
                  />
                  <label htmlFor="female" style={{ fontSize: 'var(--font-size-base)', fontWeight: '500', marginBottom: 0, cursor: 'pointer', color: '#555' }}>Nữ</label>
                </div>
              </div>
              <Row>
                <Col md={6}>
                  <Form.Group className="mb-3">
                    <Form.Label className="fw-medium" style={{ color: '#555', marginBottom: '8px' }}>
                      Họ và tên <span className="text-danger">*</span>
                    </Form.Label>
                    <Form.Control 
                      type="text" 
                      name="hovaten" 
                      value={formData.hovaten || ''} 
                      onChange={handleInputChange} 
                      required 
                      placeholder="Nhập họ và tên" 
                      style={{ 
                        height: '48px',
                        borderRadius: '8px',
                        border: '1.5px solid #eee',
                        fontSize: 'var(--font-size-base)',
                        color: '#555',
                        backgroundColor: '#fff'
                      }} 
                    />
                  </Form.Group>
                </Col>
                <Col md={6}>
                  <Form.Group className="mb-3">
                    <Form.Label className="fw-medium" style={{ color: '#555', marginBottom: '8px' }}>
                      Ngày sinh <span className="text-danger">*</span>
                    </Form.Label>
                    <Row>
                      <Col xs={4}>
                        <Form.Select 
                          name="day" 
                          value={formData.day} 
                          onChange={handleInputChange} 
                          required 
                          style={{ 
                            height: '48px',
                            borderRadius: '8px',
                            border: '1.5px solid #eee',
                            fontSize: 'var(--font-size-base)',
                            color: '#555',
                            backgroundColor: '#fff'
                          }}
                        >
                          <option value="">Ngày</option>
                          {Array.from({ length: 31 }, (_, i) => i + 1).map(day => (
                            <option key={day} value={day}>{day}</option>
                          ))}
                        </Form.Select>
                      </Col>
                      <Col xs={4}>
                        <Form.Select 
                          name="month" 
                          value={formData.month} 
                          onChange={handleInputChange} 
                          required 
                          style={{ 
                            height: '48px',
                            borderRadius: '8px',
                            border: '1.5px solid #eee',
                            fontSize: 'var(--font-size-base)',
                            color: '#555',
                            backgroundColor: '#fff'
                          }}
                        >
                          <option value="">Tháng</option>
                          {Array.from({ length: 12 }, (_, i) => i + 1).map(month => (
                            <option key={month} value={month}>{month}</option>
                          ))}
                        </Form.Select>
                      </Col>
                      <Col xs={4}>
                        <Form.Select 
                          name="year" 
                          value={formData.year} 
                          onChange={handleInputChange} 
                          required 
                          style={{ 
                            height: '48px',
                            borderRadius: '8px',
                            border: '1.5px solid #eee',
                            fontSize: 'var(--font-size-base)',
                            color: '#555',
                            backgroundColor: '#fff'
                          }}
                        >
                          <option value="">Năm</option>
                          {Array.from({ length: new Date().getFullYear() - 1960 + 1 }, (_, i) => 1960 + i).reverse().map(year => (
                            <option key={year} value={year}>{year}</option>
                          ))}
                        </Form.Select>
                      </Col>
                    </Row>
                  </Form.Group>
                </Col>
              </Row>
              <Row>
                <Col md={6}>
                  <Form.Group className="mb-3">
                    <Form.Label className="fw-medium" style={{ color: '#555', marginBottom: '8px' }}>
                      Số điện thoại <span className="text-danger">*</span>
                    </Form.Label>
                    <PhoneInput
                      country={'vn'}
                      enableSearch={true}
                      value={formData.sdt}
                      onChange={(value, data, event, formattedValue) => {
                        setFormData(prev => ({
                          ...prev,
                          sdt: value
                        }));
                      }}
                      disableCountryCode={false}
                      disableDropdown={false}
                      countryCodeEditable={false}
                      inputProps={{
                        required: true,
                        style: {
                          width: '100%',
                          height: '48px',
                          fontSize: 'var(--font-size-base)',
                          borderRadius: '8px',
                          border: '1.5px solid #eee',
                          paddingLeft: '88px',
                          color: '#555',
                          backgroundColor: '#fff'
                        }
                      }}
                      containerStyle={{ width: '100%' }}
                      buttonStyle={{
                        borderRadius: '8px 0 0 8px',
                        height: '48px',
                        border: '1.5px solid #eee',
                        borderRight: 'none',
                        backgroundColor: '#fff'
                      }}
                      dropdownStyle={{ width: '300px' }}
                      searchStyle={{ margin: '0', width: '100%', height: '40px' }}
                      searchPlaceholder="Tìm quốc gia..."
                      searchNotFound="Không tìm thấy quốc gia"
                    />
                  </Form.Group>
                </Col>
                <Col md={6}>
                  <Form.Group className="mb-3">
                    <Form.Label className="fw-medium" style={{ color: '#555', marginBottom: '8px' }}>
                      Email <span className="text-danger">*</span>
                    </Form.Label>
                    <Form.Control 
                      type="email" 
                      name="mail" 
                      value={formData.mail} 
                      onChange={handleInputChange} 
                      required 
                      placeholder="Nhập email" 
                      style={{ 
                        height: '48px',
                        borderRadius: '8px',
                        border: '1.5px solid #eee',
                        fontSize: 'var(--font-size-base)',
                        color: '#555',
                        backgroundColor: '#fff'
                      }} 
                    />
                  </Form.Group>
                </Col>
              </Row>
            </div>
          </div>
          {/* 2. Học vấn */}
          <div className="mb-4">
            <div className="fw-bold mb-2" style={{ fontSize: 'var(--font-size-lg)' }}>2. Học vấn:</div>
            <Row className="mb-3">
              <Col md={6} className="mb-3 mb-md-0">
                <Form.Label className="fw-medium">Trường đại học/cao đẳng <span className="text-danger">*</span></Form.Label>
                <Form.Control type="text" name="truongdaihoc" value={formData.truongdaihoc} onChange={handleInputChange} placeholder="Nhập tên trường" required style={commonInputStyle} />
              </Col>
              <Col md={6}>
                <Form.Label className="fw-medium">Chuyên ngành <span className="text-danger">*</span></Form.Label>
                <Form.Control type="text" name="chuyennganh" value={formData.chuyennganh} onChange={handleInputChange} placeholder="Nhập chuyên ngành" required style={commonInputStyle} />
              </Col>
            </Row>
            <Row className="mb-3">
              <Col md={6} className="mb-3 mb-md-0">
                <Form.Label className="fw-medium">Bằng cấp <span className="text-danger">*</span></Form.Label>
                <Form.Control type="text" name="bangcap" value={formData.bangcap} onChange={handleInputChange} placeholder="Nhập bằng cấp" required style={commonInputStyle} />
              </Col>
              <Col md={6}>
                <Form.Label className="fw-medium">Năm nhận bằng <span className="text-danger">*</span></Form.Label>
                <Row>
                  <Col xs={6}>
                    <Form.Select name="thoigiannhanbang_month" value={formData.thoigiannhanbang_month} onChange={handleInputChange} required style={commonSelectStyle}>
                      <option value="">Tháng</option>
                      {Array.from({ length: 12 }, (_, i) => i + 1).map(month => (
                        <option key={month} value={month}>{month}</option>
                      ))}
                    </Form.Select>
                  </Col>
                  <Col xs={6}>
                    <Form.Select name="thoigiannhanbang_year" value={formData.thoigiannhanbang_year} onChange={handleInputChange} required style={commonSelectStyle}>
                      <option value="">Năm</option>
                      {Array.from({ length: 15 }, (_, i) => new Date().getFullYear() - 5 + i).map(year => (
                        <option key={year} value={year}>{year}</option>
                      ))}
                    </Form.Select>
                  </Col>
                </Row>
              </Col>
            </Row>
          </div>
          {/* 3. Kinh nghiệm */}
          <div className="mb-4">
            <div className="fw-bold mb-2" style={{ fontSize: 'var(--font-size-lg)' }}>3. Kinh nghiệm:</div>
            <Row className="mb-3">
              <Col md={6} className="mb-3 mb-md-0">
                <Form.Label className="fw-medium">Công ty gần nhất <span className="text-danger">*</span></Form.Label>
                <Form.Control type="text" name="kinhnghiemcongtyganday" value={formData.kinhnghiemcongtyganday} onChange={handleInputChange} placeholder="Nhập 'Không có' nếu không phù hợp" style={commonInputStyle} />
              </Col>
              <Col md={6}>
                <Form.Label className="fw-medium">Vị trí gần nhất <span className="text-danger">*</span></Form.Label>
                <Form.Control type="text" name="kinhnghiemcongviecganday" value={formData.kinhnghiemcongviecganday} onChange={handleInputChange} placeholder="Nhập 'Không có' nếu không phù hợp" style={commonInputStyle} />
              </Col>
            </Row>
            <Row className="mb-3">
              <Col md={6} className="mb-3 mb-md-0">
                <Form.Label className="fw-medium">Từ tháng</Form.Label>
                <Row>
                  <Col xs={6}>
                    <Form.Select name="fromMonth" value={formData.fromMonth} onChange={handleInputChange} style={commonSelectStyle}>
                      <option value="">Tháng</option>
                      {Array.from({ length: 12 }, (_, i) => i + 1).map(month => (
                        <option key={month} value={month}>{month}</option>
                      ))}
                    </Form.Select>
                  </Col>
                  <Col xs={6}>
                    <Form.Select name="fromYear" value={formData.fromYear} onChange={handleInputChange} style={commonSelectStyle}>
                      <option value="">Năm</option>
                      {Array.from({ length: 15 }, (_, i) => new Date().getFullYear() - 10 + i).map(year => (
                        <option key={year} value={year}>{year}</option>
                      ))}
                    </Form.Select>
                  </Col>
                </Row>
              </Col>
              <Col md={6}>
                <Form.Label className="fw-medium">Đến tháng</Form.Label>
                <Row>
                  <Col xs={6}>
                    <Form.Select name="toMonth" value={formData.toMonth} onChange={handleInputChange} style={commonSelectStyle}>
                      <option value="">Tháng</option>
                      {Array.from({ length: 12 }, (_, i) => i + 1).map(month => (
                        <option key={month} value={month}>{month}</option>
                      ))}
                    </Form.Select>
                  </Col>
                  <Col xs={6}>
                    <Form.Select name="toYear" value={formData.toYear} onChange={handleInputChange} style={commonSelectStyle}>
                      <option value="">Năm</option>
                      {Array.from({ length: 15 }, (_, i) => new Date().getFullYear() - 10 + i).map(year => (
                        <option key={year} value={year}>{year}</option>
                      ))}
                    </Form.Select>
                  </Col>
                </Row>
              </Col>
            </Row>
          </div>
          {/* 4. CV của bạn */}
          <div className="mb-4">
            <div className="fw-bold mb-2" style={{ fontSize: 'var(--font-size-lg)' }}>4. CV của bạn:</div>
            <Form.Group className="mb-3">
              <Form.Label className="fw-medium">Tải lên CV <span className="text-danger">*</span></Form.Label>
              <div className="text-muted small mb-2">(PDF - Tối đa 5 MB)</div>
              <div 
                style={{ 
                  border: '2px dashed #e0e0e0',
                  borderRadius: '8px',
                  padding: '24px',
                  backgroundColor: '#fff',
                  cursor: 'pointer',
                  position: 'relative'
                }}
                onClick={() => document.getElementById('resume-upload').click()}
                onDragOver={(e) => {
                  e.preventDefault();
                  e.stopPropagation();
                  e.currentTarget.style.border = '2px dashed #FF0000';
                }}
                onDragLeave={(e) => {
                  e.preventDefault();
                  e.stopPropagation();
                  e.currentTarget.style.border = '2px dashed #e0e0e0';
                }}
                onDrop={(e) => {
                  e.preventDefault();
                  e.stopPropagation();
                  e.currentTarget.style.border = '2px dashed #e0e0e0';
                  
                  const file = e.dataTransfer.files[0];
                  if (!file) return;

                  if (!file.type.includes('pdf')) {
                    alert('Chỉ chấp nhận file PDF');
                    return;
                  }
                  
                  if (file.size > 5 * 1024 * 1024) {
                    alert('File không được vượt quá 5MB');
                    return;
                  }

                  // Create a new event with the dropped file
                  const fileList = new DataTransfer();
                  fileList.items.add(file);
                  const event = {
                    target: {
                      files: fileList.files
                    }
                  };
                  handleFileChange(event);
                }}
              >
                <input
                  type="file"
                  name="cv"
                  id="resume-upload"
                  accept=".pdf"
                  onChange={(e) => {
                    const file = e.target.files[0];
                    if (file && !file.type.includes('pdf')) {
                      alert('Chỉ chấp nhận file PDF');
                      e.target.value = '';
                      return;
                    }
                    if (file && file.size > 5 * 1024 * 1024) {
                      alert('File không được vượt quá 5MB');
                      e.target.value = '';
                      return;
                    }
                    setFormData({
                      ...formData,
                      cv: file
                    });
                  }}
                  required
                  style={{ display: 'none' }}
                />
                <div className="text-center">
                  {formData.cv ? (
                    <div style={{ color: '#555' }}>
                      <FontAwesomeIcon icon={faCopy} className="me-2" style={{ color: '#FF0000' }} />
                      {formData.cv.name}
                    </div>
                  ) : (
                    <>
                      <div 
                        style={{ 
                          display: 'inline-block',
                          padding: '8px 24px',
                          background: '#FFE5E5',
                          borderRadius: '24px',
                          color: '#FF0000',
                          fontWeight: 500,
                          marginBottom: '8px'
                        }}
                      >
                        <FontAwesomeIcon icon={faCopy} className="me-2" />
                        Chọn tệp
                      </div>
                      <div style={{ color: '#757575' }}>hoặc kéo thả file vào đây</div>
                    </>
                  )}
                </div>
              </div>
            </Form.Group>
          </div>
          {/* 5. Khác */}
          <div className="mb-4">
            <div className="fw-bold mb-2" style={{ fontSize: 'var(--font-size-lg)' }}>5. Khác:</div>
            <Form.Group>
              <Form.Label>Bạn biết đến vị trí này qua đâu? <span className="text-danger">*</span></Form.Label>
              <Form.Select name="hearAbout" value={formData.hearAbout} onChange={handleInputChange} required style={commonSelectStyle}>
                <option value="">Vui lòng chọn...</option>
                <option value="LinkedIn">LinkedIn</option>
                <option value="Facebook">Facebook</option>
                <option value="Trang tuyển dụng">Trang tuyển dụng (VietnamWorks, TopCV...)</option>
                <option value="Bạn bè giới thiệu">Bạn bè giới thiệu</option>
                <option value="Khác">Khác</option>
              </Form.Select>
            </Form.Group>
          </div>
          {/* Đồng ý và xác nhận không phải robot */}
          <Form.Group className="mb-3">
            <Form.Check
              type="checkbox"
              id="consent"
              name="consent"
              label={<span style={{ fontSize: 'var(--font-size-xs)' }}>*Theo Nghị định 15/2022/NĐ-CP về bảo vệ dữ liệu cá nhân, THD sẽ áp dụng 'Thỏa thuận xử lý dữ liệu cá nhân' với tất cả ứng viên để đảm bảo tuân thủ nghị định.</span>}
              checked={formData.consent}
              onChange={handleInputChange}
              required
              style={{ accentColor: '#FF0000' }}
            />
            <Form.Text className="text-muted d-block ms-4 mt-2" style={{ fontSize: 'var(--font-size-xs)' }}>
              Khi gửi đơn ứng tuyển này cho THD, bạn đồng ý cho phép THD xử lý thông tin bạn cung cấp theo các điều khoản và điều kiện mà bạn đã đọc, hiểu rõ và đồng ý trong nội dung văn bản tại pháp luật.
            </Form.Text>
          </Form.Group>
          {/* Captcha */}
          <div className="mb-4 mt-4">
            <div style={{
              display: 'flex',
              alignItems: 'center',
              border: '1.5px solid #ccc',
              borderRadius: '8px',
              padding: '12px 16px',
              background: '#fff',
              maxWidth: 400
            }}>
              <Form.Check
                type="checkbox"
                id="notRobot"
                name="notRobot"
                label="Tôi không phải là người máy"
                checked={formData.notRobot}
                onChange={handleInputChange}
                required
                style={{ marginRight: 12 }}
              />
              <img src="/images/capcha1.png" alt="reCAPTCHA" style={{ height: 48, marginLeft: 16 }} />
            </div>
          </div>
          <div className="text-center mt-4">
            <Button 
              variant="danger" 
              type="submit" 
              style={{ padding: '12px 48px', fontWeight: 600, fontSize: 'var(--font-size-base)' }} 
              disabled={submitting}>
              Gửi đơn ứng tuyển
            </Button>
          </div>
        </Form>
      </div>
    </div>
  );
};

export default JobApplication;

<style>
{`
  .custom-radio-input {
    cursor: pointer;
  }
  .custom-radio-input:hover {
    accent-color: #FF0000;
  }
  .form-control::placeholder,
  .form-select {
    color: #757575;
  }
  .form-control:focus,
  .form-select:focus {
    border-color: #FF0000;
    box-shadow: 0 0 0 0.25rem rgba(255, 0, 0, 0.25);
  }
`}
</style> 