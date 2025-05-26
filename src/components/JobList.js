import React, { useState, useEffect } from 'react';
import { Container, Row, Col } from 'react-bootstrap';
import JobCard from './JobCard';
import { fetchJobs } from '../services/api';

const JobList = () => {
  const [jobs, setJobs] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const getJobs = async () => {
      try {
        setLoading(true);
        const response = await fetchJobs();
        setJobs(response.data);
        setLoading(false);
      } catch (err) {
        setError('Không thể tải danh sách vị trí làm việc. Vui lòng thử lại sau.');
        setLoading(false);
        console.error('Error loading jobs:', err);
      }
    };

    getJobs();
  }, []);

  if (loading) {
    return <div className="text-center py-5">Đang tải dữ liệu...</div>;
  }

  if (error) {
    return <div className="text-center py-5 text-danger">{error}</div>;
  }

  return (
    <Container className="py-5">
      <h2 className="text-center mb-4" style={{ fontSize: 'var(--font-size-lg)' }}>Vị Trí Tuyển Dụng</h2>
      <Row className="g-4">
        {jobs.map((job) => (
          <Col key={job.id} xs={12} md={6} lg={4}>
            <JobCard job={job} />
          </Col>
        ))}
      </Row>
    </Container>
  );
};

export default JobList; 