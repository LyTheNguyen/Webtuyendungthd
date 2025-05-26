import React from 'react';
import { Spinner } from 'react-bootstrap';

const Loading = () => {
  return (
    <div className="text-center py-5">
      <Spinner animation="border" variant="danger" role="status">
        <span className="visually-hidden">Đang tải...</span>
      </Spinner>
    </div>
  );
};

export default Loading; 