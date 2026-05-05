import { useState, type ReactNode } from 'react';
import { Layout, Drawer, Button } from 'antd';
import { MenuOutlined } from '@ant-design/icons';
import { useMediaQuery } from '@/hooks/useMediaQuery';
import Sidebar from '@/components/layout/Sidebar';
import styles from '@/components/layout/AppLayout.module.css';

const { Sider, Content } = Layout;

const SIDER_WIDTH = 250;
const SIDER_COLLAPSED_WIDTH = 80;

interface AppLayoutProps {
  children: ReactNode;
}

export default function AppLayout({ children }: AppLayoutProps) {
  const [collapsed, setCollapsed] = useState(false);
  const [drawerOpen, setDrawerOpen] = useState(false);
  const isMobile = useMediaQuery('(max-width: 992px)');

  const currentWidth = collapsed ? SIDER_COLLAPSED_WIDTH : SIDER_WIDTH;

  if (isMobile) {
    return (
      <Layout className={styles.layoutContainer}>
        <div className={styles.mobileHeader}>
          <Button
            type="text"
            icon={<MenuOutlined />}
            onClick={() => setDrawerOpen(true)}
            className={styles.hamburger}
          />
        </div>
        <Drawer
          placement="left"
          open={drawerOpen}
          onClose={() => setDrawerOpen(false)}
          width={SIDER_WIDTH}
          styles={{ body: { padding: 0 } }}
          closable={false}
        >
          <Sidebar collapsed={false} onToggle={() => setDrawerOpen(false)} />
        </Drawer>
        <Content className={styles.mobileContent}>
          {children}
        </Content>
      </Layout>
    );
  }

  return (
    <Layout className={styles.layoutContainer}>
      <Sider
        width={SIDER_WIDTH}
        collapsedWidth={SIDER_COLLAPSED_WIDTH}
        collapsed={collapsed}
        className={styles.sider}
        trigger={null}
      >
        <Sidebar collapsed={collapsed} onToggle={() => setCollapsed((c) => !c)} />
      </Sider>
      <Content
        className={styles.contentArea}
        style={{ marginLeft: currentWidth }}
      >
        {children}
      </Content>
    </Layout>
  );
}
