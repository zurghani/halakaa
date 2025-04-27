import { Result, Button } from "antd";
import "./errors.scss";
import { useNavigate } from "react-router-dom";
function ServerError() {
  const navigate = useNavigate();

  return (
    <Result
      className="error-page"
      status="500"
      title="500"
      subTitle="Sorry, something went wrong on our end."
      extra={
        <Button type="primary" onClick={() => navigate("/home")}>
          Back Home
        </Button>
      }
    />
  );
}

export default ServerError;
