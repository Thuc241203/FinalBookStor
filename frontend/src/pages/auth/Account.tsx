import { Tabs, TabsProps } from "antd";
import Login from "./Login";
import Register from "./Register";

const Account = () => {
  const onChange = (key: string) => {
    console.log(key);
  };
  const items: TabsProps["items"] = [
    {
      key: "1",
      label: "Login",
      children: <Login />,
    },
    {
      key: "2",
      label: "Register",
      children: <Register />,
    },
  ];
  return (
    <div className="md:w-[768px] md:flex justify-center bg-white rounded-md shadow-md mx-auto">
      <Tabs
        defaultActiveKey="1"
        items={items}
        onChange={onChange}
        className="sm:p-2 md:w-96"
      />
    </div>
  );
};

export default Account;
