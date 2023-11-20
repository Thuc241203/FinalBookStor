import { Badge, Empty, Tabs, TabsProps } from "antd";
import AllOrder from "./AllOrder";
import ProcessingOrder from "./ProcessingOrder";
import DeliveringOrder from "./DeliveringOrder";
import DeliveredOrder from "./DeliveredOrder";
import { useAppSelector } from "../../app/hook";

const MyOrder = () => {
  const { user } = useAppSelector((state) => state.Authentication);
  const { allOrder, delivering, delivered, processing } = useAppSelector(
    (state) => state.BadgeSlice
  );
  const items: TabsProps["items"] = [
    {
      key: "1",
      label: (
        <Badge size="small" count={allOrder}>
          Tất cả
        </Badge>
      ),
      children: <AllOrder />,
    },
    {
      key: "2",
      label: "Chờ thanh toán",
      children: <Empty />,
    },
    {
      key: "3",
      label: (
        <Badge size="small" count={processing}>
          Đang xử lý
        </Badge>
      ),
      children: <ProcessingOrder />,
    },
    {
      key: "4",
      label: (
        <Badge size="small" count={delivering}>
          Đang vẩn chuyển
        </Badge>
      ),
      children: <DeliveringOrder />,
    },
    {
      key: "5",
      label: (
        <Badge size="small" count={delivered}>
          Đã giao
        </Badge>
      ),
      children: <DeliveredOrder />,
    },
    {
      key: "6",
      label: "Đã hủy",
      children: <Empty />,
    },
  ];
  return (
    <div className="max-w-6xl mx-auto bg-white p-2">
      <div className="">
        <h2>Đơn hàng của tôi</h2>
      </div>
      {!user ? (
        <div>
          <Empty />
          <div className="text-center text-xs text-red-500">
            Vui lòng đăng nhập để xem đơn hàng!
          </div>
        </div>
      ) : (
        <Tabs defaultActiveKey="1" items={items} />
      )}
    </div>
  );
};

export default MyOrder;
