import {
  Button,
  Form,
  Radio,
  RadioChangeEvent,
  Select,
  Space,
  notification,
} from "antd";
import { useState } from "react";
import { useAppDispatch, useAppSelector } from "../app/hook";
import { Link, useNavigate } from "react-router-dom";
import { useCreateShoppingMutation } from "../redux/api/shoppingApi";
import { afterAddItemCart } from "../redux/slices/cartSlice";
import { LoadingOutlined } from "@ant-design/icons";

const OrderPage = () => {
  const { orderItems }: any = useAppSelector((state) => state.Order);
  const { user }: any = useAppSelector((state) => state.Authentication);
  const [value, setValue] = useState("");
  const [addOrder, { isLoading }] = useCreateShoppingMutation();
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const productOrder = orderItems.map(
    ({ _id, name, images, price, quantity }: any) => {
      return {
        _id,
        name,
        images,
        price,
        quantity,
      };
    }
  );
  const onChange = (e: RadioChangeEvent) => {
    setValue(e.target.value);
  };
  const totalPriceItem = orderItems.reduce(
    (accumulator: any, currentValue: any) => {
      return accumulator + currentValue.price * currentValue.quantity;
    },
    0
  );

  const onFinishOrder = (value: any) => {
    addOrder({ value, productOrder, user: user?._id, shippingPrice: 15000 })
      .unwrap()
      .then(() => {
        notification.success({
          message: "Đặt hàng thành công",
        });
        dispatch(afterAddItemCart([]));
        navigate("/my-order");
      });
  };

  return (
    <div className="max-w-6xl mx-auto p-4">
      <Form layout="vertical" onFinish={onFinishOrder}>
        <Form.Item className="bg-white rounded-md shadow-sm p-4">
          <div className="md:grid md:grid-cols-2 md:gap-8">
            <div className="">
              <h3 className="ml-3 mt-3 text-2xl font-bold">Đơn Hàng</h3>
              {orderItems.map((item: any) => (
                <div
                  className="flex space-x-6 items-center my-4"
                  key={item._id}
                >
                  <div className="flex-shrink-0">
                    <img
                      src={item.images[0].response.uploadedFiles[0].url}
                      alt="Product Image"
                      className="w-20 h-20 object-cover rounded-md"
                    />
                  </div>
                  <div className="flex-grow">
                    <span className="text-lg font-semibold">{item?.name}</span>
                    <div className="flex justify-between">
                      <span className="text-gray-600">
                        SL: x{item?.quantity}
                      </span>
                      <span className="text-red-600">
                        {(item?.price * item?.quantity) / 1000 + ".000"} VNĐ
                      </span>
                    </div>
                  </div>
                </div>
              ))}
            </div>

            <div className="">
              <Form.Item
                label="Phương thức giao hàng"
                name="deliveryMethod"
                rules={[
                  {
                    message: "Vui lòng chọn phương thức giao hàng",
                    required: true,
                  },
                ]}
              >
                <Select
                  placeholder="Chọn phương thức giao hàng"
                  className="w-full"
                  options={[
                    {
                      key: 1,
                      label: "Giao hàng nhanh",
                      value: "Giao hàng nhanh",
                    },
                    {
                      key: 2,
                      label: "Giao tiết kiệm",
                      value: "Giao tiết kiệm",
                    },
                  ]}
                />
              </Form.Item>
              <Form.Item
                label="Phương thức thanh toán"
                name="paymentMethod"
                rules={[
                  {
                    message: "Vui lòng chọn phương thức thanh toán",
                    required: true,
                  },
                ]}
              >
                <Radio.Group onChange={onChange} value={value}>
                  <Space direction="vertical">
                    <Radio value={"tiền mặt"}>
                      Thanh toán tiền mặt khi nhận hàng
                    </Radio>
                  </Space>
                </Radio.Group>
              </Form.Item>
              <Form.Item>
                <div className="md:flex justify-between space-y-6 md:space-y-0">
                  {user ? (
                    <div className="">
                      <div className="flex justify-between items-center mb-4">
                        <span className="text-lg font-semibold">Giao tới:</span>

                        <span>{user?.address}</span>
                        <Link
                          to={"/update-user"}
                          className="text-blue-500 px-2 hover:underline"
                        >
                          Thay đổi
                        </Link>
                      </div>
                      <div className="flex flex-col text-gray-700">
                        <span>+ 84 {user?.phone}</span>
                        <span>Tên người dùng: {user?.name}</span>
                      </div>
                    </div>
                  ) : (
                    <span className="text-red-500">Vui lòng đăng nhập</span>
                  )}
                  <div className="space-y-4">
                    <div className="flex flex-col space-y-2">
                      <span className="text-lg font-semibold">
                        Tạm tính: {totalPriceItem / 1000 + ".000"} đ
                      </span>
                      <span>Phí vận chuyển: 15.000 VNĐ</span>
                    </div>
                    <div className="flex flex-col space-y-4">
                      <span className="text-lg font-semibold">
                        Tổng tiền: {(totalPriceItem + 15000) / 1000 + ".000"}{" "}
                        VNĐ
                      </span>
                      <div className="">
                        <Button danger disabled={!user} htmlType="submit">
                          {isLoading ? <LoadingOutlined /> : "Đặt Hàng"}
                        </Button>
                      </div>
                    </div>
                  </div>
                </div>
              </Form.Item>
            </div>
          </div>
        </Form.Item>
      </Form>
    </div>
  );
};

export default OrderPage;
