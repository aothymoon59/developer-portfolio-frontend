import React, { useEffect, useMemo, useState } from "react";
import {
  AppstoreOutlined,
  BookOutlined,
  CalendarOutlined,
  FolderOpenOutlined,
  HomeOutlined,
  InfoCircleOutlined,
  LogoutOutlined,
  MenuFoldOutlined,
  MenuUnfoldOutlined,
  MessageOutlined,
  SettingOutlined,
  ToolOutlined,
  UserOutlined,
} from "@ant-design/icons";
import {
  Avatar,
  Button,
  Drawer,
  Layout,
  Menu,
  Space,
  Tag,
  Typography,
} from "antd";
import { Outlet, useLocation, useNavigate } from "react-router-dom";
import SiteHelmet from "../../components/SiteHelmet";
import useSiteSettings from "../../hooks/useSiteSettings";
import { clearAdminAuth, getAdminUser } from "./adminAuth";

const { Header, Sider, Content } = Layout;
const { Text, Title } = Typography;

const navigationItems = [
  {
    label: "Dashboard",
    path: "/admin/dashboard",
    icon: <AppstoreOutlined />,
  },
  {
    label: "Home",
    path: "/admin/home",
    icon: <HomeOutlined />,
  },
  {
    label: "About",
    path: "/admin/about",
    icon: <InfoCircleOutlined />,
  },
  {
    label: "Resume",
    path: "/admin/resume",
    icon: <UserOutlined />,
  },
  {
    label: "Projects",
    path: "/admin/projects",
    icon: <FolderOpenOutlined />,
  },
  {
    label: "Blogs",
    path: "/admin/blogs",
    icon: <BookOutlined />,
  },
  {
    label: "Messages",
    path: "/admin/messages",
    icon: <MessageOutlined />,
  },
  {
    label: "Settings",
    path: "/admin/settings",
    icon: <SettingOutlined />,
  },
  {
    label: "System Settings",
    path: "/admin/system-settings",
    icon: <ToolOutlined />,
  },
];

function AdminLayout() {
  const navigate = useNavigate();
  const location = useLocation();
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [collapsed, setCollapsed] = useState(false);
  const user = useMemo(() => getAdminUser(), []);
  const { siteSettings } = useSiteSettings();

  const pageTitle =
    navigationItems.find((item) => item.path === location.pathname)?.label ||
    "Admin Panel";

  const handleLogout = () => {
    clearAdminAuth();
    navigate("/admin-login");
  };

  useEffect(() => {
    document.body.classList.add("admin-route");

    return () => {
      document.body.classList.remove("admin-route");
    };
  }, []);

  const menuItems = navigationItems.map((item) => ({
    key: item.path,
    icon: item.icon,
    label: item.label,
  }));

  const sidebarContent = (
    <div className="admin-sidebar-shell">
      <div className="admin-sidebar-brand">
        <div>
          <Text className="admin-sidebar-brand__eyebrow">
            {siteSettings.siteTitle || "Portfolio CMS"}
          </Text>
          <Title level={4}>Admin Workspace</Title>
        </div>
      </div>

      <Menu
        mode="inline"
        selectedKeys={[location.pathname]}
        items={menuItems}
        onClick={({ key }) => {
          navigate(key);
          setSidebarOpen(false);
        }}
        className="admin-nav-menu"
      />

      <div className="admin-sidebar-footer">
        <Space align="center" className="admin-user-summary">
          <Avatar size={44} className="admin-user-summary__avatar">
            {(user?.name || "A").charAt(0).toUpperCase()}
          </Avatar>
          <div>
            <Text strong>{user?.name || "Admin User"}</Text>
            <Text type="secondary">{user?.email || "admin@example.com"}</Text>
          </div>
        </Space>

        <Button
          block
          icon={<LogoutOutlined />}
          className="admin-logout-button"
          onClick={handleLogout}
        >
          Logout
        </Button>
      </div>
    </div>
  );

  return (
    <Layout className="admin-layout">
      <SiteHelmet
        pageTitle={`Admin | ${pageTitle}`}
        description={`${siteSettings.siteTitle || "Portfolio"} admin panel`}
      />
      <Sider
        breakpoint="lg"
        collapsedWidth={90}
        collapsed={collapsed}
        onCollapse={setCollapsed}
        className="admin-sider"
        width={292}
        trigger={null}
      >
        {sidebarContent}
      </Sider>

      <Drawer
        placement="left"
        open={sidebarOpen}
        onClose={() => setSidebarOpen(false)}
        closable={false}
        width={300}
        className="admin-mobile-drawer"
      >
        {sidebarContent}
      </Drawer>

      <Layout className="admin-layout__main">
        <Header className="admin-topbar">
          <div className="admin-topbar__title">
            <Space>
              <Button
                className="admin-topbar__menu-button"
                icon={
                  sidebarOpen ? <MenuFoldOutlined /> : <MenuUnfoldOutlined />
                }
                onClick={() => setSidebarOpen((current) => !current)}
              />
              <div>
                <Text className="admin-topbar__eyebrow">Admin Panel</Text>
                <Title level={3}>{pageTitle}</Title>
              </div>
            </Space>
          </div>

          <Space>
            <Tag icon={<CalendarOutlined />} color="processing">
              {new Date().toLocaleDateString(undefined, {
                weekday: "short",
                year: "numeric",
                month: "short",
                day: "numeric",
              })}
            </Tag>
          </Space>
        </Header>

        <Content className="admin-content-shell">
          <Outlet />
        </Content>
      </Layout>
    </Layout>
  );
}

export default AdminLayout;
