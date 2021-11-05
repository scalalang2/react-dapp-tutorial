import { EuiPanel, EuiFlexGroup, EuiFlexItem, EuiIcon, EuiPageHeader, EuiPageHeaderSection, EuiTitle, EuiSpacer } from "@elastic/eui"
import { useEffect, useState } from "react"

function SyncExternal() {
    const [prices, setPrices] = useState([]);

    useEffect(() => {
        // 15분 간 루나 가격 변화
        let lunaPriceAPI = "https://fcd.terra.dev/v1/market/price?denom=ukrw&interval=15m";
        fetch(lunaPriceAPI).then(res => {
            return res.json()
        }).then(values => {
            setPrices(values.prices)
        })
    }, [])

    const PriceHistoryView = () => {
        return prices.map(item => {
            return (
                <EuiPanel hasShadow={false} hasBorder={true}>
                    <EuiFlexGroup>
                        <EuiFlexItem grow={1}>단위: KRW </EuiFlexItem>
                        <EuiFlexItem grow={2}>{item.price}</EuiFlexItem>
                        <EuiFlexItem grow={6}>
                            <div>
                                <EuiIcon type={'dot'} color={'success'} /> {item.datetime}
                            </div>
                        </EuiFlexItem>
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
                        <h1>루나 15분간 가격 변화</h1>
                    </EuiTitle>
                </EuiPageHeaderSection>
            </EuiPageHeader>
            <EuiSpacer />
            <PriceHistoryView />
        </>
    )
}

export default SyncExternal;