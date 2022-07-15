import React, { useState } from "react";
import {
  HomeOutlined,
  UserAddOutlined,
  SettingOutlined,
  LoginOutlined,
} from "@ant-design/icons";
import { Link } from "react-router-dom";

import { Menu } from "antd";
const { SubMenu, Item } = Menu;

const Header = () => {
  const [current, setCurrent] = useState("home");

  const handleClick = (e) => {
    setCurrent(e.key);
  };
  return (
    <Menu onClick={handleClick} selectedKeys={[current]} mode="horizontal">
      <Item key="home" icon={<HomeOutlined />}>
        <Link to="/">Home</Link>
      </Item>

      <Item key="Login" icon={<LoginOutlined />}>
        <Link to="/login">Login</Link>
      </Item>

      <Item key="Register" icon={<UserAddOutlined />}>
        <Link to="/register">Register</Link>
      </Item>

      <SubMenu icon={<SettingOutlined />} title="UserName">
        <Item key="setting1">option1</Item>
        <Item key="setting2">option2</Item>
      </SubMenu>
    </Menu>
  );
};

export default Header;
