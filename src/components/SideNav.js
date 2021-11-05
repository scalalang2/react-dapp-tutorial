import React from 'react'

import { EuiCollapsibleNavGroup } from '@elastic/eui';
import {
    EuiListGroup
} from '@elastic/eui';
  
export const ReactExampleNav = [
    { label: '카운터', href: '/example/counter'},
    { label: '입력값 동기화', href: '/example/sync-input' },
    { label: '배열 동기화', href: '/example/sync-array' },
    { label: '외부 데이터 조회하기', href: '/example/sync-external' },
];

export const WalletExampleNav = [
    { label: '지갑 연동', href: '/wallet/connect'},
    { label: '정보 조회', href: '/wallet/call' },
    { label: '스마트 컨트랙트 실행', href: '/wallet/execute' },
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
          listItems={ReactExampleNav}
          maxWidth="none"
          color="subdued"
          gutterSize="none"
          size="s"
        />
      </EuiCollapsibleNavGroup>
      <EuiCollapsibleNavGroup
        title="지갑 연동 예시"
        isCollapsible={true}
        initialIsOpen={true}
      >
        <EuiListGroup
          listItems={WalletExampleNav}
          maxWidth="none"
          color="subdued"
          gutterSize="none"
          size="s"
        />
      </EuiCollapsibleNavGroup>
    </>
);