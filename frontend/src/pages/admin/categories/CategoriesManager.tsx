import { Button, Modal, Popconfirm, Select, Space, Table } from "antd";
import { useEffect, useState } from "react";
import {
  useGetCategoriesQuery,
  useRemoveCategoryMutation,
} from "../../../redux/api/categoriesApi";
import { Option } from "antd/es/mentions";
import { EditOutlined, PlusOutlined } from "@ant-design/icons";
import { AiOutlineLoading3Quarters } from "@react-icons/all-files/ai/AiOutlineLoading3Quarters";
import { ICategories } from "../../../interfaces/categories";
import { AiFillDelete } from "@react-icons/all-files/ai/AiFillDelete";
import { warning } from "../../../effect/notification";
import CreateCategory from "./CreateCategory";
import { Link } from "react-router-dom";
import LottieLoading from "../../../effect/LottieLoading";
const CategoriesManager = () => {
  const { data, isLoading }: any = useGetCategoriesQuery();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [removeCategory, { isLoading: removeLoading, error: removeError }] =
    useRemoveCategoryMutation();
  useEffect(() => {
    if (removeError) {
      warning(removeError);
    }
  }, [removeError]);

  if (isLoading) {
    return (
      <div className="flex justify-center items-center">
        <LottieLoading />
      </div>
    );
  }

  const dataSource = data?.result?.map(
    ({ name, products, _id }: ICategories) => {
      return {
        key: _id,
        name: name,
        products: products,
      };
    }
  );

  const columns = [
    {
      title: "Tên",
      dataIndex: "name",
      key: "name",
    },
    {
      title: "sản phẩm liên quan",
      dataIndex: "products",
      key: "products",
      render: (_: any, { products }: any) => {
        return (
          <Select
            mode="tags"
            style={{ width: "100%" }}
            placeholder="product Id"
          >
            {products?.map((product: any) => {
              return (
                <Option value={product} key={product}>
                  {product}
                </Option>
              );
            })}
          </Select>
        );
      },
    },
    {
      title: "Hành động",
      dataIndex: "actions",
      key: "action",
      render: (_: any, { key: id }: any) => {
        return (
          <Space size={"middle"}>
            <Popconfirm
              placement="topLeft"
              title={"Bạn có muốn xóa?"}
              onConfirm={() => removeCategory(id)}
              okText="Yes"
              cancelText="No"
            >
              <Button danger>
                {removeLoading ? (
                  <AiOutlineLoading3Quarters className="animate-spin" />
                ) : (
                  <AiFillDelete className="text-lg" />
                )}
              </Button>
            </Popconfirm>
            <Link to={`/admin/categories/${id}/edit`}>
              <Button
                icon={<EditOutlined />}
                className="text-blue-500"
              ></Button>
            </Link>
          </Space>
        );
      },
    },
  ];
  const showModal = () => {
    setIsModalOpen(true);
  };

  const handleOk = () => {
    setIsModalOpen(false);
  };

  const handleCancel = () => {
    setIsModalOpen(false);
  };
  return (
    <div>
      <Table dataSource={dataSource} columns={columns} />;
      <Button onClick={showModal} icon={<PlusOutlined />}>
        Add Category
      </Button>
      <Modal
        title="THÊM DANH MỤC"
        open={isModalOpen}
        onOk={handleOk}
        onCancel={handleCancel}
      >
        <CreateCategory />
      </Modal>
    </div>
  );
};

export default CategoriesManager;
