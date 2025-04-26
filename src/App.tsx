import Loggedin from "./layout/Loggedin";
import { Button, ConfigProvider } from "antd";

function App() {
  const componentA = <Button type="primary">Admin Component A</Button>;
  const componentB = <Button type="default">تجربة</Button>;
  const componentC = <Button type="dashed">Student Component C</Button>;
  return (
    <>
      <Loggedin>
        <div>{componentB}</div>
      </Loggedin>
    </>
  );
}

export default App;
