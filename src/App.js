import React from 'react';

import {
    EuiPage,
    EuiPageContent,
    EuiPageContentBody,
    EuiPageHeader,
    EuiPageSideBar,
    EuiPageBody,
    EuiTitle,
} from '@elastic/eui';

import {
    BrowserRouter as Router,
    Switch,
    Route,
    Link
  } from "react-router-dom";

import Header from './components/Header';
import SideNav from './components/SideNav';

function App() {
    return (
        <Router>
            <div className="app">
                <Header />
                <EuiPage paddingSize="none" style={{ height: '100%'}}>
                    <EuiPageSideBar>
                        <SideNav />
                    </EuiPageSideBar>
                    <EuiPageBody panelled paddingSize="none">
                        <EuiPageBody paddingSize="m">
                            <EuiPageHeader bottomBorder>
                                <EuiTitle size={'s'}>
                                    <h1>카운터 예제</h1>
                                </EuiTitle>
                            </EuiPageHeader>
                            <EuiPageContent
                                hasBorder={false}
                                hasShadow={false}
                                paddingSize="none"
                                color="transparent"
                                borderRadius="none"
                            >
                                <EuiPageContentBody>
                                    <Switch>
                                        <Route path="/test">
                                            test
                                        </Route>
                                        <Route path="/">
                                            home
                                        </Route>
                                    </Switch>
                                </EuiPageContentBody>
                            </EuiPageContent>
                        </EuiPageBody>
                    </EuiPageBody>
                </EuiPage>
            </div>
        </Router>
    );
}

export default App;
