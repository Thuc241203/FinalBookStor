import React, { useEffect, useState } from "react";
import { Button, Modal, Popconfirm, Space, Table, Tag } from "antd";
import { AiFillDelete } from "@react-icons/all-files/ai/AiFillDelete";
import { GrEdit } from "react-icons/gr";
import CreateProduct from "./CreateProduct";
import {
  useGetProductsQuery,
  useRemoveProductMutation,
} from "../../../redux/api/productApi";
import { AiOutlineLoading3Quarters } from "@react-icons/all-files/ai/AiOutlineLoading3Quarters";
import { IProduct } from "../../../interfaces/products";
import { Link } from "react-router-dom";
import { warning } from "../../../effect/notification";
import { useGetCategoriesQuery } from "../../../redux/api/categoriesApi";
import LottieLoading from "../../../effect/LottieLoading";
import { ColumnsType } from "antd/es/table";
const ProductManagement = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedRowKeys, setSelectedRowKeys] = useState<React.Key[]>([]);
  const { data, isLoading: loadingProduct }: any = useGetProductsQuery({
    _limit: 100,
    _order: "desc",
  });
  const [removeProduct, { isLoading: loadingRemove, error: errorRemove }] =
    useRemoveProductMutation();
  const { data: category }: any = useGetCategoriesQuery();

  useEffect(() => {
    if (errorRemove) {
      warning(errorRemove);
    }
  }, [errorRemove]);
  if (loadingProduct) {
    return (
      <div className="flex justify-center items-center">
        <LottieLoading />
      </div>
    );
  }

  const dataSource = data?.products?.map(
    ({
      _id,
      name,
      images,
      price,
      rate,
      sold,
      quantityStock,
      author,
      categoryId,
      description,
      createdAt,
    }: IProduct) => {
      return {
        key: _id,
        name,
        images,
        price,
        rate,
        sold,
        quantityStock,
        author,
        description,
        categoryId,
        createdAt,
      };
    }
  );

  const showModal = () => {
    setIsModalOpen(true);
  };

  const handleOk = () => {
    setIsModalOpen(false);
  };

  const handleCancel = () => {
    setIsModalOpen(false);
  };
  const columns: ColumnsType<any> | undefined = [
    {
      title: "Tên sách",
      width: 150,
      dataIndex: "name",
      key: "name",
      fixed: "left",
    },
    {
      title: "Giá",
      width: 100,
      dataIndex: "price",
      key: "price",
      fixed: "left",
      sorter: true,
    },
    {
      title: "Ảnh",
      key: "image",
      dataIndex: "image",
      render: (_: any, recod: any) => {
        return (
          <Space>
            {recod.images.map((item: any) => {
              return item?.response?.uploadedFiles?.map((itemImage: any) => {
                return <img src={itemImage.url} alt="" />;
              });
            })}
          </Space>
        );
      },
    },
    { title: "Tác giả", key: "author", dataIndex: "author" },
    { title: "Đánh giá", key: "rate", dataIndex: "rate" },
    { title: "lượt bán", key: "sold", dataIndex: "sold" },
    {
      title: "Số lượng trong kho",
      key: "quantityStock",
      dataIndex: "quantityStock",
    },
    {
      title: "Mô tả",
      key: "description",
      dataIndex: "description",
      render: (recod: any) => {
        return <p className="line-clamp-3">{recod}</p>;
      },
    },
    {
      title: "danh mục ",
      key: "categoryId",
      render: ({ categoryId }: any) => {
        const findCategoryId = category?.result?.filter((item: any) => {
          return item._id === categoryId;
        });
        return findCategoryId?.map((categoryId: any) => {
          return (
            <Tag color="magenta" key={categoryId._id}>
              {categoryId.name}
            </Tag>
          );
        });
      },
    },
    {
      title: "Hành động",
      key: "action",
      fixed: "right",
      width: 150,
      render: ({ key: id }: any) => (
        <Space size={"middle"}>
          <Popconfirm
            placement="topLeft"
            title={"Bạn có muốn xóa?"}
            onConfirm={() => removeProduct(id)}
            okText="Yes"
            cancelText="No"
          >
            <Button danger>
              {loadingRemove ? (
                <AiOutlineLoading3Quarters className="animate-spin" />
              ) : (
                <AiFillDelete className="text-xl" />
              )}
            </Button>
          </Popconfirm>
          <Link to={`/admin/products/${id}/edit`}>
            <Button>
              <GrEdit className="text-blue-500" />
            </Button>
          </Link>
        </Space>
      ),
    },
  ];

  const onSelectChange = (newSelectedRowKeys: React.Key[]) => {
    console.log("selectedRowKeys changed: ", newSelectedRowKeys);
    setSelectedRowKeys(newSelectedRowKeys);
  };

  const rowSelection = {
    selectedRowKeys,
    onChange: onSelectChange,
    selections: [
      Table.SELECTION_ALL,
      Table.SELECTION_INVERT,
      Table.SELECTION_NONE,
      {
        key: "odd",
        text: "Select Odd Row",
        onSelect: (changeableRowKeys: any) => {
          let newSelectedRowKeys = [];
          newSelectedRowKeys = changeableRowKeys.filter(
            (_: any, index: any) => {
              if (index % 2 !== 0) {
                return false;
              }
              return true;
            }
          );
          setSelectedRowKeys(newSelectedRowKeys);
        },
      },
      {
        key: "even",
        text: "Select Even Row",
        onSelect: (changeableRowKeys: any) => {
          let newSelectedRowKeys = [];
          newSelectedRowKeys = changeableRowKeys.filter(
            (_: any, index: any) => {
              if (index % 2 !== 0) {
                return true;
              }
              return false;
            }
          );
          setSelectedRowKeys(newSelectedRowKeys);
        },
      },
    ],
  };
  return (
    <div>
      <Table
        rowSelection={rowSelection}
        columns={columns}
        dataSource={dataSource}
        scroll={{ x: 1300 }}
      />
      <div className="">
        <Button className="" onClick={showModal}>
          Thêm sản phẩm
        </Button>
        <Modal
          title="THÊM SẢN PHẨM"
          open={isModalOpen}
          onOk={handleOk}
          onCancel={handleCancel}
        >
          <CreateProduct />
        </Modal>
      </div>
    </div>
  );
};

export default ProductManagement;
