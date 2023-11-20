import { Button, Form, Switch, notification } from "antd";
import { useNavigate, useParams } from "react-router-dom";
import {
  useGetByIdShoppingQuery,
  useUpdateShoppingMutation,
} from "../../../redux/api/shoppingApi";
import { LoadingOutlined, VerticalAlignTopOutlined } from "@ant-design/icons";
import { useEffect } from "react";
import LottieLoading from "../../../effect/LottieLoading";

const EditOrder = () => {
  const { id }: any = useParams();
  const [form] = Form.useForm();
  const { data, isLoading } = useGetByIdShoppingQuery(id);
  const [updateShopping, { isLoading: LoadingUpdate, error: ErrUpdate }] =
    useUpdateShoppingMutation();
  const navigate = useNavigate();
  useEffect(() => {
    if (ErrUpdate) {
      notification.error({
        message: "Cập nhật đơn hàng thất bại",
      });
    }
  }, [ErrUpdate]);
  useEffect(() => {
    form.setFieldsValue({
      isProcessing: data?.isProcessing,
      isDelivering: data?.isDelivering,
      isDelivered: data?.isDelivered,
      notProcessed: data?.notProcessed,
    });
  }, [data]);
  if (isLoading) {
    return (
      <div className="flex justify-center items-center">
        <LottieLoading />
      </div>
    );
  }
  const onFinish = (values: any) => {
    updateShopping({ _id: id, ...values })
      .unwrap()
      .then(() => {
        notification.success({
          message: "Cập nhật đơn hàng thành công",
        });
        navigate("/admin/order");
      });
  };
  return (
    <div className="flex justify-center items-center gap-x-3 bg-white">
      <div className="" key={data?._id}>
        {data?.productOrder?.map((item: any) => {
          return (
            <div className="flex flex-col items-center gap-y-2" key={item._id}>
              <div className="">
                <img
                  src={item.images[0].response.uploadedFiles[0].url}
                  alt=""
                  style={{ width: 100 }}
                />
              </div>
              <div className="w-60 text-xs">{item.name}</div>
            </div>
          );
        })}
      </div>
      <Form onFinish={onFinish} form={form} layout="inline">
        <Form.Item
          label="chưa xử lí"
          name="notProcessed"
          valuePropName="checked"
        >
          <Switch />
        </Form.Item>
        <Form.Item
          label="đang xử lí"
          name="isProcessing"
          valuePropName="checked"
        >
          <Switch />
        </Form.Item>
        <Form.Item
          label="đang giao hàng"
          name="isDelivering"
          valuePropName="checked"
        >
          <Switch />
        </Form.Item>
        <Form.Item
          label="Dã giao hàng"
          name="isDelivered"
          valuePropName="checked"
        >
          <Switch />
        </Form.Item>
        <Form.Item>
          <Button htmlType="submit" icon={<VerticalAlignTopOutlined />}>
            {LoadingUpdate ? <LoadingOutlined /> : "Submit"}
          </Button>
        </Form.Item>
      </Form>
    </div>
  );
};

export default EditOrder;
