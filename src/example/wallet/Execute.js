import { InjectedConnector } from '@web3-react/injected-connector';
import { Contract } from '@ethersproject/contracts'
import { useWeb3React } from '@web3-react/core'
import { EuiFlexGroup, EuiFlexItem, EuiPageHeader, EuiPageHeaderSection, EuiTitle, EuiPanel, EuiDescriptionList, EuiSpacer, EuiText, EuiLink, EuiForm, EuiFormRow, EuiFieldText, EuiButton, EuiGlobalToastList } from "@elastic/eui";
import { useEffect, useState } from 'react';
import { formatEther, parseUnits } from '@ethersproject/units';

const injected = new InjectedConnector({ supportedChainIds: [1, 3, 4, 5, 42] })
const testUSDTContract = "0xEaA0f8e8944258fd9905921c43243f269d55EF44";
const abi = require('../../abis/erc20.json');
let contract = null;

function getSigner(library, account) {
    return library.getSigner(account).connectUnchecked()
}

function getProviderOrSigner(library, account) {
    return account ? getSigner(library, account) : library
}

function getContract(address, ABI, library, account) {
    return new Contract(address, ABI, getProviderOrSigner(library, account))
}

function Execute() {
    const context = useWeb3React();
    const { connector, library, chainId, account, activate, deactivate, active, error } = context;
    const [toasts, setToasts] = useState([]);
    const [token, setToken] = useState("0");

    useEffect(async () => {
        // 이미 Metamask에서 허용된 앱인가?
        let isAuthorized = await injected.isAuthorized()
        if (isAuthorized) {
            try {
                await activate(injected);
                if (!!library && !!account) {
                    contract = getContract(testUSDTContract, abi, library, account);
                    let value = await contract.balanceOf(account);
                    setToken(formatEther(value.toString()))
                }
            } catch (err) {
                console.error(err);
            }
        }
    }, [library, account, chainId])

    const removeToast = (removedToast) => {
        setToasts(toasts.filter((toast) => toast.id !== removedToast.id));
    };

    const onSubmit = (event) => {
        event.preventDefault();

        let tokenValue = parseUnits(token, 'ether');
        let sendValue = parseUnits(event.target.token.value, 'ether');
        
        if(sendValue.gt(tokenValue)) {
            setToasts(toasts.concat({
                title: '경고',
                color: 'danger',
                iconType: 'help',
                text: <p>가진 토큰보다 더 많이 전송할 순 없습니다.</p>,
            }));
        } else {
            contract.transfer(event.target.toAddress.value, sendValue.toString())
                .then(result => {
                    setToasts(toasts.concat({
                        title: '알림',
                        color: 'success',
                        iconType: 'help',
                        text: <p>성공적으로 토큰을 보냈습니다.</p>,
                    }))
                })
            
// Transfer 이벤트인데 sender가 본인 계정인 경우에
let filter = contract.filters.Transfer(account, null)
contract.on(filter, async (from, to, amount, event) => {
    setToasts(toasts.concat({
        title: '알림',
        color: 'success',
        iconType: 'help',
        text: <p>블록에 성공적으로 포함되었습니다 :)</p>,
    }))

    // 토큰을 보냈으니 내 잔액도 변경됩니다.
    // 명시적으로 업데이트 해줍니다.
    let value = await contract.balanceOf(account);
    setToken(formatEther(value.toString()))
});
        }
    };

    return (
        <>
            <EuiPageHeader>
                <EuiPageHeaderSection>
                    <EuiTitle size="s">
                        <h1>토큰 전송하기</h1>
                    </EuiTitle>
                </EuiPageHeaderSection>
            </EuiPageHeader>
            <EuiSpacer />
            <EuiFlexGroup direction={'column'} size={{ width: '50%' }}>
                <EuiFlexItem>
                    <EuiForm component={'form'} onSubmit={onSubmit}>
                        <EuiFormRow label="누구에게 전송할 건가요?" helpText="이더리움 주소를 올바르게 입력해주세요.">
                            <EuiFieldText name="toAddress" />
                        </EuiFormRow>
                        <EuiFormRow label="전송할 토큰 수량" helpText="토큰 수량을 입력해주세요. 입력한 값은 10**18이 곱해져서 전송됩니다.">
                            <EuiFieldText name="token" type={'number'} />
                        </EuiFormRow>
                        <EuiButton type="submit" fill size={'s'} iconType={'push'}>
                            토큰 전송하기
                        </EuiButton>
                    </EuiForm>
                </EuiFlexItem>
                <EuiFlexItem>
                    <EuiPanel hasShadow={false} hasBorder={true}>
                        <EuiText>
                            본 예시에서 사용한 토큰은 Ropsten에 배포된 테스트 ERC20 코인인 <EuiLink href={"https://ropsten.etherscan.io/token/0xeaa0f8e8944258fd9905921c43243f269d55ef44"} target={'_blank'}>TUSDT</EuiLink> 입니다.
                        </EuiText>
                    </EuiPanel>
                </EuiFlexItem>
                <EuiFlexItem>
                    <EuiPanel hasShadow={false} hasBorder={true}>
                        <EuiDescriptionList listItems={[
                            { 'title': '코인 명', 'description': `Test USDT` },
                            { 'title': '내 잔액', 'description': `${token} TUSDT` }
                        ]} />
                    </EuiPanel>
                </EuiFlexItem>
            </EuiFlexGroup>
            <EuiGlobalToastList 
                toasts={toasts} 
                dismissToast={removeToast}
                toastLifeTimeMs={15000} />
        </>
    )
}

export default Execute;