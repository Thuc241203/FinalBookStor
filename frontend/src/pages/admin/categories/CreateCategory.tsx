import { Button, Form, Input, notification } from "antd";
import { useAddCategoryMutation } from "../../../redux/api/categoriesApi";
import { AiOutlineLoading3Quarters } from "@react-icons/all-files/ai/AiOutlineLoading3Quarters";
import {AiOutlineUpload} from "@react-icons/all-files/ai/AiOutlineUpload";
const CreateCategory = () => {
  const [addCategory,{isLoading}] = useAddCategoryMutation();

  const onFinish = (values: any) => {
    addCategory(values)
      .unwrap()
      .then(() => {
        notification.success({
          message: "Thêm danh mục thành công",
        });
      })
      .then(() => {
        const formReset = document.querySelector("#formCreate") as HTMLFormElement | any;
        return formReset.reset();
      });
  };
  return (
    <div>
      <Form layout="vertical" id="form" onFinish={onFinish}>
        <Form.Item
          label="Tên danh mục"
          name="name"
          rules={[{ required: true, message: "Không được để trống !" }]}
        >
          <Input />
        </Form.Item>
        <Form.Item    
        >
          <Button htmlType="submit" >
          {isLoading ? (
              <AiOutlineLoading3Quarters className="animate-spin text-blue-500" />
            ) : (
              <AiOutlineUpload/>
            )}
          </Button>
        </Form.Item>
      </Form>
    </div>
  );
};

export default CreateCategory;
