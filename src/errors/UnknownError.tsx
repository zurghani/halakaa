import { Result, Button } from "antd";
import "./errors.scss";
function UnknownError() {
  return (
    <Result
      className="error-page"
      status="error"
      title="Something Went Wrong"
      subTitle="An unexpected error has occurred. Please try again later."
      extra={[
        <Button type="primary" onClick={() => {}}>
          Reload
        </Button>,
      ]}
    />
  );
}

export default UnknownError;
