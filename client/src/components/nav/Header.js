import React, { useState } from "react";
import {
  HomeOutlined,
  UserAddOutlined,
  SettingOutlined,
  LoginOutlined,
} from "@ant-design/icons";
import {auth} from '../../firebase'
import {signOut } from "firebase/auth";
import { useDispatch, useSelector } from "react-redux";

import { Link, useNavigate } from "react-router-dom";

import { Menu } from "antd";
const { SubMenu, Item } = Menu;

const Header = () => {
  const [current, setCurrent] = useState("home");

  
  let dispatch = useDispatch()
  const navigate = useNavigate();
  const handleClick = (e) => {
    setCurrent(e.key);
  };
  let {user} = useSelector(state =>({...state}))
  const logout = () =>{
    signOut(auth).then(() => {
      dispatch({
        type:"LOGOUT",
        payload:null
      })
      navigate("/login")
    }).catch((error) => {
      console.log(error);
    });
  }
  return (
    <Menu  selectedKeys={[current]} mode="horizontal">
      <Item key="home" icon={<HomeOutlined />}>
        <Link to="/">Home</Link>
      </Item>

      {!user &&  <Item key="Login" icon={<LoginOutlined />}>
        <Link to="/login">Login</Link>
      </Item>}

      {!user && <Item key="Register" icon={<UserAddOutlined />}>
        <Link to="/register">Register</Link>
      </Item>}

      {user && <SubMenu key="sub" icon={<SettingOutlined />} title={user.email && user.email.split("@")[0]} className="float-right">
        <Item key="setting1">option1</Item>
        <Item key="setting2">option2</Item>
        <Item key="setting3" onClick={logout}>Logout</Item>
      </SubMenu>}
    </Menu>
  );
};

export default Header;
