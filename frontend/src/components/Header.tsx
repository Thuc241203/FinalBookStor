import {
  LogoutOutlined,
  MenuFoldOutlined,
  QqOutlined,
  UserOutlined,
} from "@ant-design/icons";
import { FaCartShopping } from "react-icons/fa6";
import { MdAssignment } from "react-icons/md";
import { Badge, Button, Drawer, Dropdown, MenuProps, Modal } from "antd";
import { useState } from "react";
import { Link } from "react-router-dom";
import CartShop from "./CartShop";
import { useAppDispatch, useAppSelector } from "../app/hook";
import SearchComponent from "./SearchComponent";
import NavbarMenu from "./NavbarMenu";
import { logout } from "../redux/slices/authSlice";
import { setIsOpenToggleDrawer } from "../redux/slices/toggleDrawerSlice";
import Lottie from "lottie-react";
import Logo from "../assets/logo.json";
const Header = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const { items: itemsCart } = useAppSelector((state) => state.Cart);
  const { user }: any = useAppSelector((state) => state.Authentication);
  const { open: openToggle } = useAppSelector((state) => state.ToggleDrawer);
  const dispatch = useAppDispatch();

  const isAdmin = user && user.role === "admin";

  const items: MenuProps["items"] = [
    {
      key: 1,
      label: user ? (
        <Link to={`/update-user`}>
          <Button icon={<QqOutlined />} type="text">
            Tài Khoản
          </Button>
        </Link>
      ) : (
        <Link to={"/account"}>
          <Button type="text" icon={<UserOutlined />}>
            Tài Khoản
          </Button>
        </Link>
      ),
    },
    ...(isAdmin
      ? [
          {
            key: 3,
            label: (
              <Link to={"/admin"}>
                <Button type="text" icon={<MdAssignment />}>
                  Quản trị
                </Button>
              </Link>
            ),
          },
        ]
      : []),
  ];

  if (user) {
    items.push({
      key: items.length + 1,
      label: (
        <Button
          type="text"
          icon={<LogoutOutlined />}
          onClick={() => dispatch(logout())}
        >
          Đăng Xuất
        </Button>
      ),
    });
  }
  const showModal = () => {
    setIsModalOpen(true);
  };

  const handleOk = () => {
    setIsModalOpen(false);
  };

  const handleCancel = () => {
    setIsModalOpen(false);
  };
  const showDrawer = () => {
    dispatch(setIsOpenToggleDrawer(true));
  };

  const onClose = () => {
    dispatch(setIsOpenToggleDrawer(false));
  };
  return (
    <div className={"bg-[#c6eaf7] top-0 left-0 right-0 z-50 shadow-sm pt-2"}>
      <div className="md:max-w-6xl mx-auto space-y-2   ">
        <div className="flex justify-between items-center font-roboto font-bold md:text-4xl text-3xl text-center hover:text-custom-main duration-500 transition-colors ease-in-out">
          <div>
            <Link to={"/"}>
              <Lottie animationData={Logo} className="w-[35%]" />
            </Link>
          </div>
          <div className="px-4">
            <Link to={"/"} className="">
              bookbook
            </Link>
          </div>
        </div>

        <div className="mx-auto w-[90%] md:flex justify-center">
          <SearchComponent />
        </div>
        <div className="flex justify-Stretch md:justify-between items-center  border-t-2 border-white">
          <div className="">
            <div
              className={`hidden md:flex items-center space-x-6 font-poppins`}
            >
              <Link
                to={"/books"}
                className="hover:text-custom-main duration-500 transition-colors"
              >
                kho sách
              </Link>
              <Link
                to={"/my-order"}
                className="hover:text-custom-main duration-500 transition-colors"
              >
                theo dõi Đơn Hàng
              </Link>
            </div>
            <div className="md:hidden">
              <Button
                icon={<MenuFoldOutlined />}
                type="text"
                onClick={showDrawer}
              />
              <Drawer
                placement="left"
                onClose={onClose}
                open={openToggle}
                width={240}
              >
                <NavbarMenu />
              </Drawer>
            </div>
          </div>
          <div className="">
            <Dropdown menu={{ items }} trigger={["click"]}>
              <Button icon={<UserOutlined />} type="text">
                {user ? user?.name : ""}
              </Button>
            </Dropdown>
            <Badge count={itemsCart.length} size="small">
              <Button
                icon={<FaCartShopping />}
                type="text"
                onClick={showModal}
              />
            </Badge>
          </div>
        </div>
      </div>
      <Modal
        open={isModalOpen}
        onOk={handleOk}
        okType="default"
        onCancel={handleCancel}
        width={1000}
      >
        <CartShop />
      </Modal>
    </div>
  );
};

export default Header;
