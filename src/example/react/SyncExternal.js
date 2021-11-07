import { EuiPanel, EuiFlexGroup, EuiFlexItem, EuiIcon, EuiPageHeader, EuiPageHeaderSection, EuiTitle, EuiSpacer } from "@elastic/eui"
import { useEffect, useState } from "react"

function SyncExternal() {
    const [coins, setCoins] = useState([]);

    useEffect(() => {
        // 15분 간 루나 가격 변화
        let coinAPI = "https://api.coingecko.com/api/v3/coins/markets?vs_currency=usd&order=market_cap_desc&per_page=100&page=1&sparkline=false";
        fetch(coinAPI).then(res => {
            return res.json()
        }).then(values => {
            setCoins(values)
        })
    }, [])

    const PriceHistoryView = () => {
        return coins.map(item => {
            return (
                <EuiPanel hasShadow={false} hasBorder={true}>
                    <EuiFlexGroup>
                        <EuiFlexItem grow={1}><img src={item.image} width={30} height={30} />{item.name}</EuiFlexItem>
                        <EuiFlexItem grow={2}>가격:${item.current_price}</EuiFlexItem>
                        <EuiFlexItem grow={2}>TVL:${item.total_volume}</EuiFlexItem>
                        <EuiFlexItem grow={2}>유통량:{item.circulating_supply}</EuiFlexItem>
                        <EuiFlexItem grow={2}>총 발행량:{item.total_supply}</EuiFlexItem>
                    </EuiFlexGroup>
                </EuiPanel>
            )
        })
    }

    return (
        <>
            <EuiPageHeader>
                <EuiPageHeaderSection>
                    <EuiTitle size="s">
                        <h1>코인 마켓 순위</h1>
                    </EuiTitle>
                </EuiPageHeaderSection>
            </EuiPageHeader>
            <EuiSpacer />
            <PriceHistoryView />
        </>
    )
}

export default SyncExternal;