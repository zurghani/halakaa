import { Breadcrumb, Button, Card, Space } from "antd";
import React from "react";
import "./PageLayout.scss";

interface PageLayoutProps {
  title: any;
  actions?: React.ReactNode[];
  children: React.ReactNode;
}

const PageLayout: React.FC<PageLayoutProps> = ({
  title,
  actions,
  children,
}) => {
  return (
    <>
      <div className="layout">
        {/* Breadcrumb Section */}
        <Breadcrumb />

        {/* Main Card */}
        <div className="layout__card">
          <Card title={undefined}>
            {/* Card Header */}
            <div className="layout__card__header">
              <h2>{title}</h2>
              <Space>
                <Button>Test</Button>
                <Button>Test2</Button>
              </Space>
            </div>

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
