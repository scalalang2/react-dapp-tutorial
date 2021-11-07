import { EuiFieldText, EuiFlexGroup, EuiFlexItem, EuiText } from "@elastic/eui";
import { useState } from "react";

function SyncInput() {
    var [walletAddress, setWalletAddress] = useState("");

    function RenderWalletAddress({ addr }) {
        if(addr == "") {
            return (<EuiText color={'danger'} size={'s'}>지갑을 입력해주세요.</EuiText>)
        } else {
            return (<EuiText color={'success'} size='s'>{'0x' + addr}</EuiText>)
        }
    }

    return (
        <EuiFlexGroup>
            <EuiFlexItem grow={4}>
                <EuiFlexGroup direction='column'>
                    <EuiFlexItem>
                    <EuiFieldText
                        placeholder="지갑 주소를 입력해주세요"
                        prepend={[ '0x' ]}
                        onChange={(e) => setWalletAddress(e.target.value)}
                    />
                    </EuiFlexItem>
                    <EuiFlexItem>
                        지갑 주소 : <RenderWalletAddress addr={walletAddress} />
                    </EuiFlexItem>
                </EuiFlexGroup>
            </EuiFlexItem>
        </EuiFlexGroup>
    )
}

export default SyncInput;