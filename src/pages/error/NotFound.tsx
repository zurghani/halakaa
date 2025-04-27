import { Result, Button } from "antd";
import "./errors.scss";
import { useNavigate } from "react-router-dom";
function NotFound() {
  const navigate = useNavigate();
  return (
    <Result
      className="error-page"
      status="404"
      title="404"
      subTitle="Sorry, the page you visited does not exist."
      extra={
        <Button type="primary" onClick={() => navigate("/home")}>
          Back Home
        </Button>
      }
    />
  );
}

export default NotFound;
