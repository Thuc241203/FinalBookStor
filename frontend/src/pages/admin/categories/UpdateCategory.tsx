import { AiOutlineLoading3Quarters } from "@react-icons/all-files/ai/AiOutlineLoading3Quarters";
import { AiOutlineUpload } from "@react-icons/all-files/ai/AiOutlineUpload";
import { Button, Form, Input, notification } from "antd";
import { useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import {
  useGetCategoryByIdQuery,
  useUpdateCategoryMutation,
} from "../../../redux/api/categoriesApi";
import { warning } from "../../../effect/notification";

const UpdateCategory = () => {
  const { id }:any = useParams();
  const [form] = Form.useForm();
  const navigate = useNavigate();
  const { data: CategoryById }:any = useGetCategoryByIdQuery(id);
  const [updateCategory, { isLoading: updateLoading, error: updateError }] =
    useUpdateCategoryMutation();
  console.log("category: ", CategoryById);

  useEffect(() => {
    form.setFieldsValue({
      name: CategoryById?.category?.name,
    });
  }, [CategoryById]);

  useEffect(() => {
    if (updateError) return warning(updateError);
  }, [updateError]);

  const onFinish = async (values: any) => {
    const respones = await updateCategory({ ...values, _id: id }).unwrap();
    if (respones) {
      notification.success({
        message: "Cập nhật danh mục thành công",
      });
      navigate("/admin/categories");
    }
  };

  return (
    <div>
      <Form
        layout="vertical"
        id="form"
        onFinish={onFinish}
        form={form}
        style={{ maxWidth: 400, margin: "0 auto" }}
      >
        <Form.Item
          label="Tên danh mục"
          name="name"
          rules={[{ required: true, message: "Không được để trống !" }]}
        >
          <Input />
        </Form.Item>
        <Form.Item>
          <Button htmlType="submit">
            {updateLoading ? (
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

export default UpdateCategory;
