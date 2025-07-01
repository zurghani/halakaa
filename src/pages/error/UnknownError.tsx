import { Result, Button } from "antd";
import "./errors.scss";
import { useNavigate } from "react-router-dom";
import { Paths } from "../../Routes";
function UnknownError() {
  const navigate = useNavigate();

  return (
    <Result
      className="error-page"
      status="error"
      title="Something Went Wrong"
      subTitle="An unexpected error has occurred. Please try again later."
      extra={[
        <Button
          key="navigate"
          type="primary"
          onClick={() => navigate(Paths.HOME.ROOT)}>
          Reload
        </Button>,
      ]}
    />
  );
}

export default UnknownError;
