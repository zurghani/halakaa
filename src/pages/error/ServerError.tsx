import { Result, Button } from "antd";
import "./errors.scss";
function ServerError() {
  return (
    <Result
      className="error-page"
      status="500"
      title="500"
      subTitle="Sorry, something went wrong on our end."
      extra={
        <Button type="primary" onClick={() => {}}>
          Back Home
        </Button>
      }
    />
  );
}

export default ServerError;
