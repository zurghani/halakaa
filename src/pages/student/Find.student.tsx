import React from "react";
import { useSetButtons } from "../../layouts/PageLayout/PageLayout";
import { Button } from "antd";

const FindStudent: React.FC = () => {
  const { setButtons } = useSetButtons();
  React.useEffect(() => {
    setButtons([
      <Button key="add" type="default">
        Print
      </Button>,
      <Button key="search" type="default">
        Download
      </Button>,
    ]);
  });
  return (
    <div>
      <h2>Find Student</h2>
      <p>This is a placeholder for the Find Student component.</p>
    </div>
  );
};

export default FindStudent;
