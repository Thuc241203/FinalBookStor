import { GroupOutlined, ShopOutlined } from "@ant-design/icons";
import { Menu } from "antd";
import SubMenu from "antd/es/menu/SubMenu";
import { useGetCategoriesQuery } from "../redux/api/categoriesApi";
import { useAppDispatch } from "../app/hook";
import { setCategories } from "../redux/slices/paginationSlice";
import { Link } from "react-router-dom";
import { ICategories } from "../interfaces/categories";
import { setIsOpenToggleDrawer } from "../redux/slices/toggleDrawerSlice";
const NavbarMenu = () => {
  const { data }: any = useGetCategoriesQuery();
  const dispatch = useAppDispatch();

  return (
    <div>
      <Menu mode="inline">
        <SubMenu key="sub1" icon={<GroupOutlined />} title="Thể loại">
          {data?.result.map((items: ICategories) => {
            return (
              <Menu.Item
                key={items._id}
                onClick={() => {
                  dispatch(setCategories(items._id as any));
                  dispatch(setIsOpenToggleDrawer(false));
                }}
              >
                {items.name}
              </Menu.Item>
            );
          })}
        </SubMenu>
        <Menu.Item icon={<ShopOutlined />}>
          <Link
            to={"/my-order"}
            onClick={() => dispatch(setIsOpenToggleDrawer(false))}
          >
            Theo dõi Đơn hàng
          </Link>
        </Menu.Item>
      </Menu>
    </div>
  );
};

export default NavbarMenu;
