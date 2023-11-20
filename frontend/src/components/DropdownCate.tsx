import { Dropdown, MenuProps, Space } from "antd";
import { useGetCategoriesQuery } from "../redux/api/categoriesApi";
import { useAppDispatch } from "../app/hook";
import { setCategories } from "../redux/slices/paginationSlice";

const DropdownCate = () => {
  const { data }: any = useGetCategoriesQuery();
  const dispatch = useAppDispatch();
  const items: MenuProps["items"] = data?.result.map((item: any) => {
    return {
      key: item._id,
      label: (
        <Space onClick={() => dispatch(setCategories(item._id))}>
          {item.name}
        </Space>
      ),
    };
  });
  return (
    <div>
      <Dropdown
        menu={{ items }}
        placement="bottom"
        arrow={{ pointAtCenter: true }}
      >
        <button className="hover:text-custom-main duration-500 transition-colors">
          Danh mục sách
        </button>
      </Dropdown>
    </div>
  );
};

export default DropdownCate;
