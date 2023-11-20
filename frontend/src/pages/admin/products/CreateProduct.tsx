import { UploadOutlined } from "@ant-design/icons";
import {
  Button,
  Form,
  Input,
  InputNumber,
  Select,
  Upload,
  message,
  notification,
} from "antd";
import { useAddProductMutation } from "../../../redux/api/productApi";
import { AiOutlineLoading3Quarters } from "@react-icons/all-files/ai/AiOutlineLoading3Quarters";
import { AnyAction } from "@reduxjs/toolkit";
import { useGetCategoriesQuery } from "../../../redux/api/categoriesApi";
import { AiOutlineUpload } from "@react-icons/all-files/ai/AiOutlineUpload";
const CreateProduct = (): any => {
  const [form] = Form.useForm();
  const [addProduct, { isLoading, error }] = useAddProductMutation();
  const { data: category }: any = useGetCategoriesQuery();
  const onFinish = (values: any) => {
    addProduct(values)
      .unwrap()
      .then(() => {
        notification.success({
          message: "Thêm sản phẩm thành công",
        });
      })
      .then(() => {
        const formReset = document.querySelector("#formCreate") as
          | HTMLFormElement
          | any;
        return formReset.reset();
      });
  };
  console.log("error create product: ", error);
  if (error)
    return notification.error({
      message: "Thêm sản phẩm thất bại",
    });
  const beforeUpload = (file: AnyAction) => {
    console.log("Before Upload:", file);
    return true;
  };

  const onChange = (info: any) => {
    if (info.file.status === "done") {
      return message.success("Tải ảnh thành công");
    } else if (info.file.status === "error") {
      return message.error("Tải ảnh thất bại");
    }
  };
  return (
    <div>
      <Form form={form} id="form" labelCol={{ span: 8 }} onFinish={onFinish}>
        <Form.Item
          label="Tên sản phẩm"
          name="name"
          rules={[{ required: true, message: "Vui lòng nhập tên sản phẩm" }]}
        >
          <Input />
        </Form.Item>
        <Form.Item
          label="Giá tiền"
          name="price"
          rules={[{ required: true, message: "Vui lòng nhập giá sản phẩm" }]}
        >
          <InputNumber />
        </Form.Item>
        <Form.Item
          label="Số lượng đã bán"
          name="sold"
          rules={[
            {
              required: true,
              message: "Vui lòng nhập số lượng đã bán sản phẩm",
            },
          ]}
        >
          <InputNumber />
        </Form.Item>
        <Form.Item
          label="Tác giả"
          name="author"
          rules={[
            { required: true, message: "Vui lòng nhập tác giả sản phẩm" },
          ]}
        >
          <Input />
        </Form.Item>
        <Form.Item
          label="Ảnh sản phẩm"
          name="images"
          valuePropName="fileList"
          getValueFromEvent={(e) => {
            if (Array.isArray(e)) {
              return e;
            }
            return e && e.fileList;
          }}
        >
          <Upload
            listType="picture"
            beforeUpload={beforeUpload}
            onChange={onChange}
            multiple={true}
            action={"http://127.0.0.1:5000/api/upload"}
          >
            <Button icon={<UploadOutlined />}>Click to Upload</Button>
          </Upload>
        </Form.Item>
        <Form.Item
          label="Đánh giá"
          name="rate"
          rules={[
            { required: true, message: "Vui lòng nhập đánh giá sản phẩm" },
          ]}
        >
          <InputNumber />
        </Form.Item>
        <Form.Item
          label="Số lượng trong kho"
          name="quantityStock"
          rules={[
            { required: true, message: "Vui lòng nhập số lượng sản phẩm" },
          ]}
        >
          <InputNumber />
        </Form.Item>
        <Form.Item
          label="Mô tả"
          name="description"
          rules={[{ required: true, message: "Vui lòng nhập mô tả sản phẩm" }]}
        >
          <Input.TextArea />
        </Form.Item>
        <Form.Item label="Category" name="categoryId">
          <Select
            options={category?.result?.map((item: any) => {
              return {
                value: item._id,
                label: item.name,
              };
            })}
          ></Select>
        </Form.Item>
        <Form.Item>
          <Button htmlType="submit">
            {isLoading ? (
              <AiOutlineLoading3Quarters className="animate-spin text-blue-500" />
            ) : (
              <AiOutlineUpload />
            )}
          </Button>
        </Form.Item>
      </Form>
    </div>
  );
};

export default CreateProduct;
