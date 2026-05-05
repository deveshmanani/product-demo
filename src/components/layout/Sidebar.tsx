import { useLocation, useNavigate } from 'react-router-dom';
import { Menu, Switch, Avatar } from 'antd';
import {
  DashboardOutlined,
  ShoppingOutlined,
  SendOutlined,
  BellOutlined,
  MoonOutlined,
  SunOutlined,
  UserOutlined,
} from '@ant-design/icons';
import { useTheme } from '@/hooks/useTheme';
import { ROUTES } from '@/constants';
import styles from '@/components/layout/Sidebar.module.css';

const menuItems = [
  {
    key: 'dashboard',
    icon: <DashboardOutlined />,
    label: 'Dashboard',
  },
  {
    key: ROUTES.PRODUCTS,
    icon: <ShoppingOutlined />,
    label: 'Product List',
  },
  {
    key: ROUTES.SEND,
    icon: <SendOutlined />,
    label: 'Order List',
  },
  {
    key: 'notifications',
    icon: <BellOutlined />,
    label: 'Notifications',
  },
];

export default function Sidebar() {
  const location = useLocation();
  const navigate = useNavigate();
  const { isDark, toggleTheme } = useTheme();

  const navigableKeys = new Set<string>([ROUTES.PRODUCTS, ROUTES.SEND]);

  const handleMenuClick = (info: { key: string }) => {
    if (navigableKeys.has(info.key)) {
      navigate(info.key);
    }
  };

  return (
    <div className={styles.sidebar}>
      <div className={styles.logoSection}>
        <div className={styles.logoIcon}>B</div>
        <span className={styles.logoText}>BIRDBOX</span>
      </div>

      <div className={styles.navSection}>
        <Menu
          mode="inline"
          selectedKeys={[location.pathname]}
          items={menuItems}
          onClick={handleMenuClick}
          style={{ border: 'none', background: 'transparent' }}
        />
      </div>

      <div className={styles.bottomSection}>
        <div className={styles.themeToggle}>
          {isDark ? <MoonOutlined /> : <SunOutlined />}
          <span>Dark Mode</span>
          <Switch
            size="small"
            checked={isDark}
            onChange={toggleTheme}
          />
        </div>

        <div className={styles.userSection}>
          <Avatar size={36} icon={<UserOutlined />} />
          <div>
            <div className={styles.userName}>John Doe</div>
            <div className={styles.userRole}>Admin</div>
          </div>
        </div>
      </div>
    </div>
  );
}
