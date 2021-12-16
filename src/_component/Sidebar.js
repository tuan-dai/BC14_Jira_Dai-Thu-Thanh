import React, { useState } from "react";
import "../index.css";
import { Layout, Menu } from "antd";
import {
  MenuUnfoldOutlined,
  MenuFoldOutlined,
  UserOutlined,
  VideoCameraOutlined,
  UploadOutlined,
  BarsOutlined,
  SearchOutlined,
  PlusOutlined,
} from "@ant-design/icons";

const { Header, Sider, Content } = Layout;

export default function Sidebar() {
  const [state, setState] = useState({
    collapsed: false,
  });

  const toggle = () => {
    setState({
      collapsed: !state.collapsed,
    });
  };

  return (
    <div>
      
      <Sider
        trigger={null}
        collapsible
        collapsed={state.collapsed}
        style={{ height: "100%" }}
      >
        <div className="text-right pr-2" onClick={toggle}><BarsOutlined  style={{cursor: 'pointer', color: '#fff', fontSize: 25}}/></div>
        <Menu theme="dark" mode="inline" defaultSelectedKeys={["1"]}>
          <Menu.Item key="1" icon={<PlusOutlined style={{fontSize: 20}}/>}>
            Create issue
          </Menu.Item>
          <Menu.Item key="2" icon={<SearchOutlined style={{fontSize: 20}} />}>
            Search
          </Menu.Item>
        </Menu>
      </Sider>
    </div>
  );
}
