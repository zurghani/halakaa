import { Breadcrumb, BreadcrumbProps, Button, Card, Space } from "antd";
import { Link, Outlet, useMatches, useNavigate } from "react-router-dom";
import React from "react";
import "./PageLayout.scss";

interface PageLayoutProps {
  title: any;
  actions?: React.ReactNode[];
  children: React.ReactNode;
  breadCrumbItems: BreadcrumbProps["items"];
}

const PageLayout: React.FC<PageLayoutProps> = ({
  title,
  actions,
  children,
  breadCrumbItems,
}) => {
  breadCrumbItems = [{ title: "Main" }, { title: "Home" }];
  return (
    <>
      <div className="layout">
        {/* Breadcrumb Section */}
        <Breadcrumb className="layout__breadCrumb" items={breadCrumbItems} />

        {/* Main Card */}
        <div className="layout__card">
          <Card title={title} extra={<Space>{actions}</Space>}>
            {/* Card Body */}

            <Space
              className="layout__card__body"
              direction="vertical"
              size="middle">
              {React.Children.map(children, (child, index) => (
                <div className="layout__card__body__section">{child}</div>
              ))}
            </Space>
          </Card>
        </div>
      </div>
    </>
  );
};

export default PageLayout;
