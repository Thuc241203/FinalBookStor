import { LockOutlined } from "@ant-design/icons";
import { Button, Checkbox, Form, Input, Space, notification } from "antd";
import Link from "antd/es/typography/Link";
import { useSigninMutation } from "../../redux/api/auth";
import { AiOutlineMail } from "@react-icons/all-files/ai/AiOutlineMail";
import { useAppDispatch } from "../../app/hook";
import { isAuth, setToken, setUser } from "../../redux/slices/authSlice";
import { useEffect } from "react";
import { AiOutlineLoading3Quarters } from "@react-icons/all-files/ai/AiOutlineLoading3Quarters";
import { useNavigate } from "react-router-dom";
const Login = () => {
  const navigate = useNavigate();
  const dispatch = useAppDispatch();
  const [signin, { isLoading, error }]: any = useSigninMutation();
  console.log("error: ", error);
  useEffect(() => {
    if (error) {
      notification.error({ message: error?.data?.message });
    }
  }, [error]);
  const onFinish = async (values: any) => {
    const data = await signin(values).unwrap();
    const { accessToken, user, message } = data;
    if (data) {
      notification.success({ message: message });
      dispatch(setToken(accessToken));
      dispatch(isAuth());
      dispatch(setUser(user));
      navigate("/");
    }
  };

  return (
    <div className="mx-auto space-y-8">
      <Form
        name="normal_login"
        className="login-form"
        initialValues={{ remember: true }}
        onFinish={onFinish}
        layout="vertical"
      >
        <Form.Item
          label="Email"
          name="email"
          rules={[
            { required: true, message: "Please input your email!" },
            { type: "email", message: "Email không đúng định dạng" },
          ]}
        >
          <Input
            prefix={<AiOutlineMail className="site-form-item-icon" />}
            placeholder="Email"
          />
        </Form.Item>
        <Form.Item
          label="Password"
          name="password"
          rules={[{ required: true, message: "Please input your Password!" }]}
        >
          <Input.Password
            prefix={<LockOutlined className="site-form-item-icon" />}
            type="password"
            placeholder="Password"
          />
        </Form.Item>
        <Form.Item>
          <Space style={{ display: "flex", justifyContent: "space-between" }}>
            <Checkbox>Nhớ tài khoản</Checkbox>
            <Link className="login-form-forgot text-blue-500">
              Quên mật khẩu
            </Link>
          </Space>
        </Form.Item>

        <Form.Item>
          <Space>
            <Button htmlType="submit">
              {isLoading ? (
                <AiOutlineLoading3Quarters className="animate-spin" />
              ) : (
                "Login"
              )}
            </Button>
          </Space>
        </Form.Item>
      </Form>
    </div>
  );
};

export default Login;
