import { useEffect, useState } from "react";
import {
  useGetAllUserQuery,
  useGetUserQuery,
  useUpdateUserMutation,
} from "../../../redux/api/auth";
import {
  Button,
  Form,
  Input,
  InputNumber,
  Modal,
  Switch,
  Table,
  notification,
} from "antd";
import { EditOutlined, UploadOutlined } from "@ant-design/icons";
import LottieLoading from "../../../effect/LottieLoading";
import { warning } from "../../../effect/notification";

const ProfileManager = () => {
  const { data, isLoading, error } = useGetAllUserQuery();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [form] = Form.useForm();
  const [idUser, setIdUser] = useState();
  const { data: userById }: any = useGetUserQuery(idUser);
  const [updateUser] = useUpdateUserMutation();
  console.log("user by id: ", userById);

  useEffect(() => {
    form.setFieldsValue({
      name: userById?.user?.name,
      email: userById?.user?.email,
      phone: userById?.user?.phone,
      address: userById?.user?.address,
    });
  }, [userById]);
  const onFinish = (values: any) => {
    updateUser({ ...values, _id: idUser })
      .unwrap()
      .then(() => {
        notification.success({
          message: "Cập nhật người dùng thành công",
        });
        handleCancel();
      });
  };

  const showModal = () => {
    setIsModalOpen(true);
  };

  const handleOk = () => {
    setIsModalOpen(false);
  };

  const handleCancel = () => {
    setIsModalOpen(false);
  };
  useEffect(() => {
    if (error) {
      warning(error);
    }
  }, [error]);
  if (isLoading) {
    return (
      <div className="flex justify-center items-center">
        <LottieLoading />
      </div>
    );
  }

  const dataSource = data?.user?.map((items: any) => {
    return {
      key: items._id,
      name: items.name,
      email: items.email,
      phone: items.phone,
      address: items.address,
      role: items.role,
    };
  });
  const columns = [
    {
      title: "Tên người dùng",
      dataIndex: "name",
      key: "name",
    },
    {
      title: "Email",
      dataIndex: "email",
      key: "email",
    },
    {
      title: "số điện thoại",
      dataIndex: "phone",
      key: "phone",
    },
    {
      title: "địa chỉ",
      dataIndex: "address",
      key: "address",
    },
    {
      title: "vai trò",
      dataIndex: "role",
      key: "role",
    },
    {
      title: "hành động",
      dataIndex: "actions",
      key: "actions",
      render: (_: any, { key: id }: any) => {
        return (
          <Button
            icon={<EditOutlined />}
            onClick={() => {
              showModal();
              setIdUser(id);
            }}
          />
        );
      },
    },
  ];
  return (
    <div>
      <Table dataSource={dataSource} columns={columns} />;
      <Modal
        title="Basic Modal"
        open={isModalOpen}
        onOk={handleOk}
        onCancel={handleCancel}
      >
        <Form layout="vertical" onFinish={onFinish} form={form}>
          <Form.Item
            name={"name"}
            label="Name"
            rules={[
              { message: "Trường name không được bỏ trống", required: true },
            ]}
          >
            <Input />
          </Form.Item>
          <Form.Item name={"email"} label="Email">
            <Input disabled />
          </Form.Item>
          <Form.Item
            name={"address"}
            label="Address"
            rules={[
              { message: "Trường address không được bỏ trống", required: true },
            ]}
          >
            <Input />
          </Form.Item>
          <Form.Item
            name={"phone"}
            label="Phone"
            rules={[
              { message: "Trường phone không được bỏ trống", required: true },
            ]}
          >
            <InputNumber />
          </Form.Item>
          <Form.Item name={"role"} label="Role">
            <Switch />
          </Form.Item>
          <Form.Item>
            <Button icon={<UploadOutlined />} htmlType="submit" />
          </Form.Item>
        </Form>
      </Modal>
    </div>
  );
};

export default ProfileManager;
