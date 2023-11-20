import {
  DeleteOutlined,
  InboxOutlined,
  MinusOutlined,
  PlusOutlined,
} from "@ant-design/icons";
import { Avatar, Badge, Button, Popconfirm, Space, Table } from "antd";
import { useAppDispatch, useAppSelector } from "../app/hook";
import { decrease, increase, removeItemCart } from "../redux/slices/cartSlice";
import React, { useEffect, useState } from "react";
import { addItemsCart } from "../redux/slices/orderSlice";
import { ColumnsType } from "antd/es/table";

const CartShop = () => {
  const { items } = useAppSelector((state) => state.Cart);
  const dispatch = useAppDispatch();
  const [selectedRowKeys, setSelectedRowKeys] = useState<React.Key[]>([]);
  const [totalPrice, setTotalPrice] = useState<number>(0);
  const itemSelectlCart = items.filter((item: any) =>
    selectedRowKeys.includes(item._id)
  );
  useEffect(() => {
    if (itemSelectlCart) {
      const totalPriceCart = itemSelectlCart.reduce(
        (accumulator: any, currentValue: any) => {
          return accumulator + currentValue.price * currentValue.quantity;
        },
        0
      );
      setTotalPrice(totalPriceCart);
    }
  }, [itemSelectlCart]);
  const dataSource = items.map(
    ({ _id, name, price, images, quantity }: any) => {
      return {
        key: _id,
        name,
        price,
        images,
        quantity,
      };
    }
  );
  const columns:
    | ColumnsType<{
        key: string;
        name: string;
        price: number;
        images: any;
        quantity: number;
      }>
    | undefined = [
    {
      title: "Sản phẩm",
      dataIndex: "name",
      width: 400,
      key: "name",
      render: (_: any, recod: any) => {
        const image = recod.images.map((item: any) => {
          return item.response.uploadedFiles[0].url;
        });
        return (
          <div className="flex items-center gap-x-3">
            <img src={image[0]} alt="" className="w-24" />
            <span className="line-clamp-2 font-poppins">{_}</span>
          </div>
        );
      },
    },
    {
      title: "Đơn giá",
      dataIndex: "price",
      key: "price",
      render: (_: number) => {
        return (
          <span className="text-red-500 text-base">{_ / 1000 + ".000"} đ</span>
        );
      },
    },
    {
      title: "Số lượng",
      dataIndex: "quantity",
      key: "quantity",
      render: (_: any, { quantity, key }: any) => {
        return (
          <Space>
            <Button
              icon={<PlusOutlined />}
              onClick={() => dispatch(increase(key))}
            ></Button>
            <Badge count={quantity}>
              <Avatar shape="square" icon={<InboxOutlined />} className="" />
            </Badge>
            <Button
              icon={<MinusOutlined />}
              onClick={() => dispatch(decrease(key))}
            ></Button>
          </Space>
        );
      },
    },
    {
      title: "Thành tiền",
      dataIndex: "total",
      key: "total",
      render: (_: any, recod: any) => {
        return (
          <span className=" text-blue-500 text-base">
            {(recod.quantity * recod.price) / 1000 + ".000"} đ
          </span>
        );
      },
    },
    {
      title: <DeleteOutlined />,
      dataIndex: "total",
      key: "total",
      render: (_: any, recod: any) => {
        return (
          <Popconfirm
            title="Xóa sản phẩm"
            description="Bạn có muốn xóa khỏi giỏ hàng?"
            onConfirm={() => {
              dispatch(removeItemCart(recod.key));
            }}
            okText="Yes"
            cancelText="No"
            okType="danger"
          >
            <Button danger icon={<DeleteOutlined />}></Button>
          </Popconfirm>
        );
      },
    },
  ];
  const onSelectChange = (newSelectedRowKeys: React.Key[]) => {
    setSelectedRowKeys(newSelectedRowKeys);
  };
  const rowSelection = {
    selectedRowKeys,
    onChange: onSelectChange,
  };
  return (
    <div className="table-container overflow-x-auto max-w-full">
      <Table
        rowSelection={rowSelection}
        dataSource={dataSource}
        columns={columns}
      />
      <Space className="flex flex-col gap-y-3 text-lg">
        <Space>
          <span>Thành tiền</span>
          <span>{totalPrice != 0 ? totalPrice / 1000 + ".000" : "0"} VNĐ</span>
        </Space>
        <Space>
          <span className="text-red-700 font-bold">
            {totalPrice != 0 ? totalPrice / 1000 + ".000" : "0"} VNĐ
          </span>
        </Space>
        <Space>
          <Button
            disabled={itemSelectlCart.length == 0}
            onClick={() => dispatch(addItemsCart(itemSelectlCart))}
          >
            <a href={"/order"}>Thanh toán</a>
          </Button>
        </Space>
      </Space>
    </div>
  );
};

export default CartShop;
