import { Breadcrumb, BreadcrumbProps, Card, Space } from "antd";
import { Outlet, useOutletContext } from "react-router-dom";
import React, { useState } from "react";
import "./PageLayout.scss";

interface PageLayoutProps {
  title: string;
  breadCrumbItems?: BreadcrumbProps["items"];
}
type contextType = {
  setButtons: React.Dispatch<React.SetStateAction<React.ReactNode[]>>;
};

const PageLayout: React.FC<PageLayoutProps> = ({ title, breadCrumbItems }) => {
  breadCrumbItems = [{ title: "Main" }, { title: "Home" }];
  const [buttons, setButtons] = useState<React.ReactNode[]>([]);
  return (
    <>
      <div className="layout">
        {/* Breadcrumb Section */}
        <Breadcrumb className="layout__breadCrumb" items={breadCrumbItems} />

        {/* Main Card */}
        <div className="layout__card">
          <Card title={title} extra={<Space>{buttons}</Space>}>
            {/* Card Body */}

            <Space
              className="layout__card__body"
              direction="vertical"
              size="middle">
              <Outlet context={{ setButtons } satisfies contextType} />
            </Space>
          </Card>
        </div>
      </div>
    </>
  );
};

export default PageLayout;

export const useSetButtons = () => {
  return useOutletContext<contextType>();
};
