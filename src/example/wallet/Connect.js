import { InjectedConnector } from '@web3-react/injected-connector';
import { useWeb3React } from '@web3-react/core'
import { EuiFlexGroup, EuiFlexItem, EuiButton } from "@elastic/eui";
import { useEffect, useState } from 'react';

const injected = new InjectedConnector({ supportedChainIds: [1, 3, 4, 5, 42] })

function Connect() {
    const context = useWeb3React();
    const { connector, library, chainId, account, activate, deactivate, active, error } = context;
    const [balance, setBalance] = useState("0");

    useEffect(() => {
        if(!!account && !!library) {
            library.getBalance(account).then(value => {
                console.log(value);
                setBalance(value.toString());
            })
        }
    }, [account, library, chainId])

    const connectWallet = () => {
        activate(injected);
    }
    
    return (
        <EuiFlexGroup direction={'column'} style={{ width: '30%' }}>
            <EuiFlexItem>
                <EuiButton onClick={() => connectWallet() }>지갑 연결하기</EuiButton>
            </EuiFlexItem>
            <EuiFlexItem>
                {active && (<>{"당신의 지갑 주소는 : " + account + " 입니다."}</>) }
                {!active && (<>지갑을 연결해주세요.</>)}
            </EuiFlexItem>
            <EuiFlexItem>
                { balance } ETH
            </EuiFlexItem>
        </EuiFlexGroup>
    )
}

export default Connect;