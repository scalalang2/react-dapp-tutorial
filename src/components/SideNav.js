import React, { useState } from 'react'

import { EuiCollapsibleNavGroup, EuiText, EuiSpacer, EuiButton, EuiButtonIcon, EuiLink } from '@elastic/eui';
import {
    EuiListGroup,
    EuiListGroupProps,
    EuiPinnableListGroup,
    EuiPinnableListGroupItemProps,
} from '@elastic/eui';
  
export const KibanaNavLinks = [
    { label: 'Discover', href: '/test'},
    { label: 'Visualize' },
    { label: 'Dashboards' },
    { label: 'Canvas' },
    { label: 'Maps' },
    { label: 'Machine Learning' },
    { label: 'Graph' },
];
  
export const DeploymentsGroup = (
    <EuiCollapsibleNavGroup
      title={
        <span>
          <small style={{ fontWeight: 'normal' }}>메뉴</small> <br />
          <strong>샘플 코드 목록</strong>
        </span>
      }
      background="dark"
    >
      
    </EuiCollapsibleNavGroup>
);

export default () => (
    <>
      {DeploymentsGroup}
      <EuiCollapsibleNavGroup
        title="리액트 기본 예시"
        isCollapsible={true}
        initialIsOpen={true}
      >
        <EuiListGroup
          listItems={KibanaNavLinks}
          maxWidth="none"
          color="subdued"
          gutterSize="none"
          size="s"
        />
      </EuiCollapsibleNavGroup>
    </>
);