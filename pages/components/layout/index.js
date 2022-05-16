import { Layout, Menu, Breadcrumb } from "antd";
import {
  DesktopOutlined,
  PieChartOutlined,
  FileOutlined,
  TeamOutlined,
  UserOutlined,
} from "@ant-design/icons";
const { Header, Content, Footer, Sider } = Layout;
import React, { useState, useCallback } from "react";
import { useRouter } from "next/router";

function getItem(label, key, icon, children) {
  return {
    key,
    icon,
    children,
    label,
  };
}

const items = [
  //   getItem('Option 1', '1', <PieChartOutlined />),
  //   getItem('Option 2', '2', <DesktopOutlined />),
  //   getItem('User', 'sub1', <UserOutlined />, [
  //     getItem('Tom', '3'),
  //     getItem('Bill', '4'),
  //     getItem('Alex', '5'),
  //   ]),
  //   getItem('Team', 'sub2', <TeamOutlined />, [getItem('Team 1', '6'), getItem('Team 2', '8')]),
  getItem("Files", "1", <FileOutlined />),
  getItem("Employee", "2", <UserOutlined />),
];

export default function SiderDemo({ children }) {
  const router = useRouter();
  const [collapsed, setCollapsed] = useState(false);
  const onCollapse = (collapsed) => {
    setCollapsed(collapsed);
  };

  const onClick = (e) => {
    switch (e.key) {
      case "1":
        router.push("/upload");
        break;
      default:
        router.push("/employee");
    }
  };

  const getSelectedMenu = useCallback(() => {
    switch (router.pathname) {
      case "/upload":
        return "1";
      default:
        return "2";
    }
  },[router.pathname]);

  return (
    <Layout
      style={{
        minHeight: "100vh",
      }}
    >
      <Sider  breakpoint="lg"
      collapsedWidth="0" collapsible collapsed={collapsed} onCollapse={onCollapse}>
        <div className="logo"/>
        <Menu
          theme="dark"
          defaultSelectedKeys={[getSelectedMenu()]}
          mode="inline"
          items={items}
          onClick={onClick}
        />
      </Sider>
      <Layout className="site-layout">
        <Header
          className="site-layout-background"
          style={{
            padding: 0,
          }}
        />
        <Content
          style={{
            margin: "0 16px",
          }}
        >
          <div
            className="site-layout-background"
            style={{
              padding: 24,
              minHeight: 360,
              overflow: "scroll"
            }}
          >
            {children}
          </div>
        </Content>
        <Footer
          style={{
            textAlign: "center",
          }}
        >
          Portal ©2022 Created by Charles
        </Footer>
      </Layout>
    </Layout>
  );
}
