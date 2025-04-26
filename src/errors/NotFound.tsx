import { Result, Button } from "antd";
import "./errors.scss";
function NotFound() {
  return (
    <Result
      className="error-page"
      status="404"
      title="404"
      subTitle="Sorry, the page you visited does not exist."
      extra={
        <Button type="primary" onClick={() => {}}>
          Back Home
        </Button>
      }
    />
  );
}

export default NotFound;
