import { EuiButton, EuiFlexGroup, EuiFlexItem, EuiSpacer } from "@elastic/eui";
import { useState } from "react";

function Counter() {
    const [counter, setCounter] = useState(0);
    return (
        <EuiFlexGroup direction='column' style={{ padding: 10 }}>
            <EuiFlexGroup>
                <EuiFlexItem grow={false}>
                    Counter: {counter}
                </EuiFlexItem>
            </EuiFlexGroup>
            <EuiSpacer />
            <EuiFlexGroup>
                <EuiFlexItem grow={false}>
                    <EuiButton size='s' fill onClick={() => setCounter(counter+1)}>증가</EuiButton>
                </EuiFlexItem>
                <EuiFlexItem grow={false}>
                    <EuiButton size='s' fill color={'secondary'} onClick={() => setCounter(counter-1)}>감소</EuiButton>
                </EuiFlexItem>
            </EuiFlexGroup>
        </EuiFlexGroup>
    );
}

export default Counter