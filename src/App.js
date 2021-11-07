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
import Counter from './example/react/Counter';
import SyncInput from './example/react/SyncInput';
import SyncArray from './example/react/SyncArray';
import SyncExternal from './example/react/SyncExternal';
import Call from './example/wallet/Call';
import Connect from './example/wallet/Connect';
import Execute from './example/wallet/Execute';
import DefaultData from './example/react/DefaultData';

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
                            <EuiPageContent
                                hasBorder={false}
                                hasShadow={false}
                                paddingSize="none"
                                color="transparent"
                                borderRadius="none"
                            >
                                <EuiPageContentBody>
                                    <Switch>
                                        <Route path="/example/data">
                                            <DefaultData />
                                        </Route>
                                        <Route path="/example/counter">
                                            <Counter />
                                        </Route>
                                        <Route path="/example/sync-input">
                                            <SyncInput />
                                        </Route>
                                        <Route path="/example/sync-array">
                                            <SyncArray />
                                        </Route>
                                        <Route path="/example/sync-external">
                                            <SyncExternal/>
                                        </Route>
                                        <Route path="/wallet/connect">
                                            <Connect />
                                        </Route>
                                        <Route path="/wallet/call">
                                            <Call />
                                        </Route>
                                        <Route path="/wallet/execute">
                                            <Execute />
                                        </Route>
                                        <Route exact path="/">
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
