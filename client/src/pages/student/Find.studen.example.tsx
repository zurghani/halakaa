import React, { useEffect } from "react";
import { useSetButtons } from "../../layouts/PageLayout/PageLayout";
import { Button } from "antd";

const FindStudent: React.FC = () => {
    const [count, setCount] = React.useState(0);
    const { setButtons } = useSetButtons();
    useEffect(() => {
        setButtons([
            <Button key="add" type="default" onClick={() => setCount(count + 1)}>
                +
            </Button>,
            <Button key="search" type="default" onClick={() => setCount(count - 1)}>
                -
            </Button>,
        ]);
    });
    return (
        <div>
            {count}
            <h2>Find Student</h2>
            <p>This is a placeholder for the Find Student component.</p>
        </div>
    );
};

export default FindStudent;
