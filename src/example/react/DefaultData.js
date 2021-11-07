import { EuiFlexGroup, EuiFlexItem } from "@elastic/eui";
import { useEffect, useState } from "react";

function DefaultData() {
    const [data, setData] = useState("초깃값");

    useEffect(() => {
        setTimeout(() => {
            setData("5초가 지났습니다.")
        }, 5000)
    }, [])

    return (
        <EuiFlexGroup direction='column' style={{ padding: 10 }}>
            <EuiFlexItem>
                { data }
            </EuiFlexItem>
        </EuiFlexGroup>
    );
}

export default DefaultData