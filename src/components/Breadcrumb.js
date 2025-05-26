import React from 'react';
import { Link } from 'react-router-dom';
import { Breadcrumb as BSBreadcrumb } from 'react-bootstrap';

const Breadcrumb = ({ items }) => {
  return (
    <BSBreadcrumb style={{ fontSize: 'var(--font-size-base)' }}>
      <BSBreadcrumb.Item linkAs={Link} linkProps={{ to: '/' }}>
        Trang chủ
      </BSBreadcrumb.Item>
      {items.map((item, index) => (
        <BSBreadcrumb.Item
          key={index}
          linkAs={item.link ? Link : undefined}
          linkProps={item.link ? { to: item.link } : undefined}
          active={index === items.length - 1}
        >
          {item.label}
        </BSBreadcrumb.Item>
      ))}
    </BSBreadcrumb>
  );
};

export default Breadcrumb; 