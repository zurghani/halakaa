import { Result, Button } from "antd";
import { useNavigate } from "react-router-dom";
import { Paths } from "../../Routes";
import "./errors.scss";
function NotFound() {
  const navigate = useNavigate();
  return (
    <Result
      className="error-page"
      status="404"
      title="404"
      subTitle="Sorry, the page you visited does not exist."
      extra={
        <Button type="primary" onClick={() => navigate(Paths.HOME.ROOT)}>
          Back Home
        </Button>
      }
    />
  );
}

export default NotFound;
