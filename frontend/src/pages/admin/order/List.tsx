import { Button, Empty, Popconfirm, Table } from "antd";
import {
  useGetShoppingQuery,
  useRemoveShoppingMutation,
} from "../../../redux/api/shoppingApi";
import LottieLoading from "../../../effect/LottieLoading";
import {
  DeleteOutlined,
  EditOutlined,
  LoadingOutlined,
} from "@ant-design/icons";
import { Link } from "react-router-dom";
import { ColumnsType } from "antd/es/table";
import { AnyObject } from "antd/es/_util/type";

const OderList = () => {
  const { data, isLoading, error } = useGetShoppingQuery();
  const [removeOrder, { isLoading: LoadingRemoveOrder }] =
    useRemoveShoppingMutation();
  if (error) {
    return <Empty />;
  }
  if (isLoading) {
    return (
      <div className="flex justify-center items-center">
        <LottieLoading />
      </div>
    );
  }
  const dataSource = data?.map(
    ({
      productOrder,
      deliveryMethod,
      paymentMethod,
      shippingAddress,
      shippingPrice,
      _id,
      totalPrice,
      isProcessing,
      isDelivering,
      isDelivered,
      notProcessed,
      deleted,
    }: any) => {
      return {
        key: _id,
        productOrder,
        deliveryMethod,
        paymentMethod,
        shippingAddress,
        shippingPrice: shippingPrice / 1000 + ".000 đ",
        totalPrice: totalPrice / 1000 + ".000 đ",
        isProcessing,
        isDelivering,
        isDelivered,
        notProcessed,
        deleted,
      };
    }
  );
  const columns: ColumnsType<AnyObject>= [
    {
      title: "Sản phẩm đã mua",
      dataIndex: "productOrder",
      key: "productOrder",
      render: (record) => {
        return record.map((item:any ) => (
          <div className="" key={item._id}>
            <div className="">
              <img
                src={item.images[0].response.uploadedFiles[0].url}
                alt=""
                width={80}
              />
            </div>
            <div className="text-xs line-clamp-2">{item.name}</div>
          </div>
        ));
      },
      width: 100,
      fixed: "left",
    },
    {
      title: "Phương thức giao hàng",
      dataIndex: "deliveryMethod",
      key: "deliveryMethod",
    },
    {
      title: "Phương thức thanh toán",
      dataIndex: "paymentMethod",
      key: "paymentMethod",
    },
    {
      title: "Thông tin khách hàng",
      dataIndex: "shippingAddress",
      key: "shippingAddress",
      render: (record) => {
        return (
          <div className="text-xs">
            <div className="">{record.name}</div>
            <div className="">{record.phone}</div>
            <div className="">{record.address}</div>
          </div>
        );
      },
    },
    {
      title: "Phí giao hàng",
      dataIndex: "shippingPrice",
      key: "shippingPrice",
    },
    {
      title: "Tổng tiền",
      dataIndex: "totalPrice",
      key: "totalPrice",
    },
    {
      title: "Chưa xử lí",
      dataIndex: "notProcessed",
      key: "notProcessed",
      render: (_: any) => {
        return (
          <span className={_ ? "text-blue-500" : "text-red-500"}>
            {_.toString()}
          </span>
        );
      },
    },
    {
      title: "Đang xử lí",
      dataIndex: "isProcessing",
      key: "isProcessing",
      render: (_: any) => {
        return (
          <span className={_ ? "text-blue-500" : "text-red-500"}>
            {_.toString()}
          </span>
        );
      },
    },
    {
      title: "Đang giao hàng",
      dataIndex: "isDelivering",
      key: "isDelivering",
      render: (_: any) => {
        return (
          <span className={_ ? "text-blue-500" : "text-red-500"}>
            {_.toString()}
          </span>
        );
      },
    },
    {
      title: "Yêu cầu hủy đơn",
      dataIndex: "deleted",
      key: "deleted",
      render: (_: any) => {
        return (
          <span className={_ ? "text-blue-500" : "text-red-500"}>
            {_.toString()}
          </span>
        );
      },
    },
    {
      title: "Đã giao hàng",
      dataIndex: "isDelivered",
      key: "isDelivered",
      render: (_: any) => {
        return (
          <span className={_ ? "text-blue-500" : "text-red-500"}>
            {_.toString()}
          </span>
        );
      },
    },
    {
      title: "Tác vụ",
      key: "action",
      fixed: "right",
      width: 150,
      render: ({ key: id, deleted }: any) => {
        console.log("id: ", id);
        console.log("deleted: ", deleted);
        return (
          <>
            {deleted ? (
              <Popconfirm
                placement="topLeft"
                title={"Bạn có muốn xóa?"}
                onConfirm={() => removeOrder(id)}
                okText="Yes"
                cancelText="No"
              >
                {LoadingRemoveOrder ? (
                  <LoadingOutlined />
                ) : (
                  <Button icon={<DeleteOutlined />} danger />
                )}
              </Popconfirm>
            ) : (
              <Link to={`update/${id}`}>
                <EditOutlined style={{ color: "blue", fontSize: 20 }} />
              </Link>
            )}
          </>
        );
      },
    },
  ];
  return (
    <div>
      <Table dataSource={dataSource} columns={columns} scroll={{ x: 1300 }} />;
    </div>
  );
};

export default OderList;
