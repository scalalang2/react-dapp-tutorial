import { InjectedConnector } from '@web3-react/injected-connector';
import { Contract } from '@ethersproject/contracts'
import { useWeb3React } from '@web3-react/core'
import { EuiFlexGroup, EuiFlexItem, EuiPageHeader, EuiPageHeaderSection, EuiTitle, EuiPanel, EuiDescriptionList, EuiSpacer } from "@elastic/eui";
import { useEffect, useState } from 'react';
import { formatEther } from '@ethersproject/units';

const injected = new InjectedConnector({ supportedChainIds: [1, 3, 4, 5, 42] })
const uniswapContract = "0x1f9840a85d5af5bf1d1762f925bdaddc4201f984";
const vbAddress = "0xAb5801a7D398351b8bE11C439e05C5B3259aeC9B";
const abi = require('../../abis/erc20.json');

function getSigner(library, account) {
    return library.getSigner(account).connectUnchecked()
}

function getProviderOrSigner(library, account) {
    return account ? getSigner(library, account) : library
}

function getContract(address, ABI, library, account) {
    return new Contract(address, ABI, getProviderOrSigner(library, account))
}

function Call() {
    const context = useWeb3React();
    const { connector, library, chainId, account, activate, deactivate, active, error } = context;
    const [uni, setUNI] = useState("0");
    const [totalSupply, setTotalSupply] = useState("0");

    useEffect(async () => {
        // 이미 Metamask에서 허용된 앱인가?
        let isAuthorized = await injected.isAuthorized()
        if (isAuthorized) {
            try {
                await activate(injected);
                if(!!library && !!account) {
                    let contract = getContract(uniswapContract, abi, library, account);
                    let value = await contract.balanceOf(vbAddress);
                    setUNI(formatEther(value.toString()))

                    value = await contract.totalSupply();
                    setTotalSupply(formatEther(value.toString()))
                }
            } catch(err) {
                console.error(err);
            }
        }
    }, [library, account, chainId])

    return (
        <>
        <EuiPageHeader>
            <EuiPageHeaderSection>
                <EuiTitle size="s">
                    <h1>현재 유니스왑 코인</h1>
                </EuiTitle>
            </EuiPageHeaderSection>
        </EuiPageHeader>
        <EuiSpacer />
        <EuiFlexGroup size={{ width: '50%' }}>
            <EuiFlexItem>
                <EuiPanel hasShadow={false} hasBorder={true}>
                    <EuiDescriptionList listItems={[
                        { 'title': '비탈릭의 유니스왑 코인', 'description': `${uni} UNI` },
                        { 'title': '유니스왑 총 발행량', 'description': `${totalSupply} UNI` }
                    ]} />
                </EuiPanel>
            </EuiFlexItem>
        </EuiFlexGroup>
        </>
    )
}

export default Call;