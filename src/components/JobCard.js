import React from 'react';
import { Card } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faMapMarkerAlt, faClock } from '@fortawesome/free-solid-svg-icons';

const JobCard = ({ job }) => {
  return (
    <Card className="job-card h-100">
      <Card.Body>
        <Card.Title style={{ fontSize: 'var(--font-size-lg)' }}>
          <Link to={`/jobs/${job.id}`} className="text-decoration-none">
            {job.tenvitri}
          </Link>
        </Card.Title>
        <div className="job-meta my-3" style={{ fontSize: 'var(--font-size-base)' }}>
          <p className="mb-2">
            <FontAwesomeIcon icon={faMapMarkerAlt} className="me-2" />
            {job.diachi}
          </p>
          <p className="mb-2">
            <FontAwesomeIcon icon={faClock} className="me-2" />
            {job.thoigianlamviec}
          </p>
        </div>
        {(job.motacongviec || job.description) && (
          <Card.Text className="text-muted" style={{ fontSize: 'var(--font-size-base)' }}>
            {job.motacongviec}
          </Card.Text>
        )}
        <Link
          to={`/jobs/${job.id}`}
          className="btn btn-outline-danger mt-3"
        >
          Xem chi tiết
        </Link>
      </Card.Body>
    </Card>
  );
};

export default JobCard;
