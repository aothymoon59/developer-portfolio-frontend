import React from "react";
import { Breadcrumb, Space, Typography } from "antd";

const { Paragraph, Title } = Typography;

function AdminPageHeader({ title, description, items = [], extra = null }) {
  return (
    <div className="admin-page-header">
      <div>
        {items.length ? (
          <Breadcrumb className="admin-breadcrumb" items={items} />
        ) : null}
        <Title level={2}>{title}</Title>
        {description ? <Paragraph>{description}</Paragraph> : null}
      </div>

      {extra ? <Space>{extra}</Space> : null}
    </div>
  );
}

export default AdminPageHeader;
