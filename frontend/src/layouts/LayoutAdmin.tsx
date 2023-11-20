import { useState } from "react";
import { Link, Outlet } from "react-router-dom";
import { Layout, Menu, Button, theme, Space, Badge, Avatar } from "antd";
import { AiFillDashboard } from "@react-icons/all-files/ai/AiFillDashboard";
import { BiSolidCategory } from "react-icons/bi";
import { FaBookBookmark } from "react-icons/fa6";
import { IoBag } from "react-icons/io5";
import { FaUserCog } from "react-icons/fa";
import {
  LogoutOutlined,
  MenuFoldOutlined,
  MenuUnfoldOutlined,
  UserOutlined,
} from "@ant-design/icons";
import { useAppDispatch, useAppSelector } from "../app/hook";
import { logout } from "../redux/slices/authSlice";

const LayoutAdmin = () => {
  const { Sider, Content } = Layout;
  const [collapsed, setCollapsed] = useState(false);
  const dispatch = useAppDispatch();
  const { user }: any = useAppSelector((state) => state.Authentication);

  return (
    <Layout style={{ minHeight: "100vh" }}>
      <Sider trigger={null} collapsible collapsed={collapsed}>
        <div className="py-5 text-2xl flex items-center justify-center">
          <span className="font-Raleway text-white">BookBook</span>
        </div>
        <Menu
          style={{ backgroundColor: "#001529", color: "white" }}
          mode="inline"
          className="hover:bg-white hover:text-black"
          items={[
            {
              key: "1",
              icon: <AiFillDashboard />,
              label: <Link to={"dashboard"}>Dashboard</Link>,
            },
            {
              key: "2",
              icon: <FaBookBookmark />,
              label: <Link to={"products"}>Sản phẩm</Link>,
            },
            {
              key: "3",
              icon: <BiSolidCategory />,
              label: <Link to={"categories"}>Danh mục</Link>,
            },
            {
              key: "4",
              icon: <IoBag />,
              label: <Link to={"order"}>quản lí đặt hàng</Link>,
            },
            {
              key: "5",
              icon: <FaUserCog />,
              label: <Link to={"profile"}>Tài khoản</Link>,
            },
            {
              key: "6",
              label: (
                <Button
                  icon={<LogoutOutlined />}
                  onClick={() => dispatch(logout())}
                  className="border-white text-white  "
                >
                  Đăng xuất
                </Button>
              ),
            },
          ]}
        />
      </Sider>
      <Layout>
        <header
          style={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            padding: 10,
          }}
        >
          <div className="">
            <Button
              type="text"
              icon={collapsed ? <MenuFoldOutlined /> : <MenuUnfoldOutlined />}
              onClick={() => setCollapsed(!collapsed)}
            />
          </div>
          <div className="flex gap-x-6 items-center">
            <Space>
              <Avatar size="small" icon={<UserOutlined />} />
              <span className="">{user ? user.name : "Ten"}</span>
            </Space>
          </div>
        </header>

        <Content
          style={{
            padding: 10,
            height: "100%",
          }}
        >
          <Outlet />
        </Content>
      </Layout>
    </Layout>
  );
};

export default LayoutAdmin;
