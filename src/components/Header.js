import React from 'react';
import { useHistory } from 'react-router-dom';

import {
    EuiHeader,
    EuiHeaderSectionItem,
    EuiHeaderLogo,
} from '@elastic/eui';

export default () => {
    const history = useHistory();

    const moveToHome = () => {
        history.push('/')
    }

    return (
        <EuiHeader theme={'dark'}>
            <EuiHeaderSectionItem>
                <EuiHeaderLogo iconType={'consoleApp'} onClick={() => moveToHome()}>
                        React Dapp Tutorial
                </EuiHeaderLogo>
            </EuiHeaderSectionItem>
        </EuiHeader>
    )
}