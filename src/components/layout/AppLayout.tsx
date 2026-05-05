import type { ReactNode } from 'react';
import { Layout } from 'antd';
import Sidebar from '@/components/layout/Sidebar';
import styles from '@/components/layout/AppLayout.module.css';

const { Sider, Content } = Layout;

interface AppLayoutProps {
  children: ReactNode;
}

export default function AppLayout({ children }: AppLayoutProps) {
  return (
    <Layout className={styles.layoutContainer}>
      <Sider
        width={250}
        className={styles.sider}
        breakpoint="lg"
        collapsedWidth={80}
      >
        <Sidebar />
      </Sider>
      <Content className={styles.contentArea}>
        {children}
      </Content>
    </Layout>
  );
}
