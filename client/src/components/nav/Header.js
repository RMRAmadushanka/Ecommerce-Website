import React, { useState } from "react";
import {
  AppstoreOutlined,
  UserAddOutlined,
  SettingOutlined,
  LoginOutlined,
} from "@ant-design/icons";

import { Menu } from "antd";
const { SubMenu } = Menu;

const Header = () => {
  const [current, setCurrent] = useState("home");

  const handleClick = (e) => {
    setCurrent(e.key);
  };
  return (
    <Menu onClick={handleClick} selectedKeys={[current]} mode="horizontal">
      <Menu.Item key="home" icon={<AppstoreOutlined />}>
        Home
      </Menu.Item>

      <Menu.Item key="Login" icon={<LoginOutlined />}>
        Login
      </Menu.Item>

      <Menu.Item key="Register" icon={<UserAddOutlined />}>
        Register
      </Menu.Item>

      <SubMenu icon={<SettingOutlined />} title="UserName">
        <Menu.Item key="setting1">option1</Menu.Item>
        <Menu.Item key="setting2">option2</Menu.Item>
      </SubMenu>
    </Menu>
  );
};

export default Header;
