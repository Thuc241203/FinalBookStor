import { LoadingOutlined, VerticalAlignTopOutlined } from "@ant-design/icons";
import { Button, Form, Input, notification } from "antd";
import { useEffect } from "react";
import { useAppDispatch, useAppSelector } from "../../app/hook";
import { useUpdateUserMutation } from "../../redux/api/auth";
import { useNavigate } from "react-router-dom";
import { setUser } from "../../redux/slices/authSlice";

const UpdateUser = () => {
  const { user }: any = useAppSelector((state) => state.Authentication);
  const [form] = Form.useForm();
  const navigate = useNavigate();
  const [updateUser, { isLoading }] = useUpdateUserMutation();
  const dispatch = useAppDispatch();

  useEffect(() => {
    form.setFieldsValue({
      name: user?.name,
      email: user?.email,
      phone: user?.phone,
      address: user?.address,
    });
  }, [user]);

  const onFinish = (values: any) => {
    updateUser({ ...values, _id: user?._id })
      .unwrap()
      .then(() => {
        notification.success({
          message: "Cập nhật tài khoản thành công",
        });
        navigate("/");
        dispatch(setUser({ ...values, _id: user?._id }));
      });
  };

  return (
    <div className="flex justify-center max-w-6xl mx-auto">
      <div className="">
        <div className=" p-2 md:w-96 md:mx-auto">
          <Form layout="vertical" onFinish={onFinish} form={form}>
            <Form.Item
              name="name"
              label="Name"
              rules={[{ required: true, message: "Vui lòng nhập họ tên" }]}
            >
              <Input />
            </Form.Item>
            <Form.Item name="email" label="Email">
              <Input disabled placeholder="abc@gmail.com" />
            </Form.Item>
            <Form.Item
              name="phone"
              label="Phone number"
              rules={[
                {
                  required: true,
                  message: "Vui lòng nhập số điện thoại",
                  max: 10,
                },
              ]}
            >
              <Input placeholder="+84" />
            </Form.Item>
            <Form.Item
              name="address"
              label="Address"
              rules={[{ required: true, message: "Vui lòng nhập địa chỉ" }]}
            >
              <Input placeholder="Xã/Quận - Huyện/Tỉnh - Thành Phố" />
            </Form.Item>
            <Form.Item>
              {isLoading ? (
                <LoadingOutlined />
              ) : (
                <Button icon={<VerticalAlignTopOutlined />} htmlType="submit" />
              )}
            </Form.Item>
          </Form>
        </div>
      </div>
    </div>
  );
};

export default UpdateUser;
