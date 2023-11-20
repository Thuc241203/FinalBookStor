import { Button, Form, Input, Space, message, notification } from "antd";
import { useSignupMutation } from "../../redux/api/auth";
import { useEffect } from "react";
import { AiOutlineLoading3Quarters } from "@react-icons/all-files/ai/AiOutlineLoading3Quarters";
import { LockOutlined, MailOutlined, UserOutlined } from "@ant-design/icons";

const Register = () => {
  const [signup, { isLoading, error }] = useSignupMutation();
  useEffect(() => {
    if (error) {
      return message.error("Đăng kí tài khoản thất bại");
    }
  }, [error]);
  const onFinish = async (values: any) => {
    signup(values)
      .unwrap()
      .then(() => {
        notification.success({ message: "Đăng kí thành công!" });
      });
  };

  return (
    <div className="">
      <Form layout="vertical" labelCol={{ span: 20 }} onFinish={onFinish}>
        <Form.Item
          label="User name"
          name={"name"}
          rules={[{ required: true, message: "Vui lòng nhập tên" }]}
        >
          <Input prefix={<UserOutlined className="site-form-item-icon" />} />
        </Form.Item>
        <Form.Item
          label="Email"
          name={"email"}
          rules={[
            { required: true, message: "Vui lòng nhập Email" },
            { type: "email", message: "Email không đúng định dạng" },
          ]}
        >
          <Input prefix={<MailOutlined />} />
        </Form.Item>
        <Form.Item
          label="Password"
          name={"password"}
          rules={[
            { required: true, message: "Vui lòng nhập password" },
            { min: 6, message: "Password tối thiểu 6 kí tự" },
          ]}
        >
          <Input.Password prefix={<LockOutlined />} />
        </Form.Item>
        <Form.Item
          label="Confirm password"
          name={"confirmPassword"}
          rules={[
            { required: true, message: "Vui lòng nhập confirm password" },
            ({ getFieldValue }) => ({
              validator(_, values) {
                if (!values || getFieldValue("password") === values) {
                  return Promise.resolve();
                } else {
                  return Promise.reject(new Error("Password không khớp"));
                }
              },
            }),
          ]}
        >
          <Input.Password prefix={<LockOutlined />} />
        </Form.Item>
        <Form.Item>
          <Space style={{ display: "flex", justifyContent: "space-between" }}>
            <Button htmlType="submit">
              {isLoading ? (
                <AiOutlineLoading3Quarters className="animate-spin" />
              ) : (
                "Register"
              )}
            </Button>
          </Space>
        </Form.Item>
      </Form>
    </div>
  );
};

export default Register;
