import { EuiFlexGroup, EuiFlexItem, EuiIcon, EuiPanel, EuiSpacer } from "@elastic/eui"

const students = [{
    name: "김창식",
    score: 1.24
}, {
    name: "이도현",
    score: 8.24
}, {
    name: "김인근",
    score: 7.21
}, {
    name: "정현빈",
    score: 5.48
}]

function SyncArray() {
    const StudentsView = () => {
        return students.map(item => {
            return (
                <>
                <EuiPanel hasShadow={false} hasBorder={true}>
                    <EuiFlexGroup>
                        <EuiFlexItem grow={false}>{item.name}</EuiFlexItem>
                        <EuiFlexItem grow={6}>
                            <div>
                                <EuiIcon type={'dot'} color={'success'} /> {item.score}
                            </div>
                        </EuiFlexItem>
                    </EuiFlexGroup>
                </EuiPanel>
                <EuiSpacer size={'s'} />
                </>
            )
        })
    }

    return (
        <StudentsView />
    )
}

export default SyncArray;