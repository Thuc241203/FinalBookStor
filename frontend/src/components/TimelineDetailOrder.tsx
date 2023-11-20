import { Timeline } from "antd";
import { useGetByIdShoppingQuery } from "../redux/api/shoppingApi";
import LottieLoading from "../effect/LottieLoading";
interface Item {
  children: string;
  color: string;
}
const TimelineDetailOrder = ({ id }: any) => {
  const { data, isLoading } = useGetByIdShoppingQuery(id);
  if (isLoading) {
    return (
      <div className="flex justify-center items-center">
        <LottieLoading />
      </div>
    );
  }
  const items: Item[] = [];
  switch (true) {
    case !data?.notProcessed:
      items.push({
        children: "Đặt hàng thành công, vui lòng đợi xác nhận!",
        color: "green",
      });
      break;
    case data?.isProcessing:
      items.push({
        children: "Đơn hàng đang được xử lý!",
        color: "green",
      });
      break;
    case data?.isDelivering:
      items.push({
        children: "Đơn hàng đang trong quá trình vận chuyển!",
        color: "green",
      });
      break;
    case data?.isDelivered:
      items.push({
        children: "Đơn hàng đã được giao thành công!",
        color: "green",
      });
      break;

    default:
      break;
  }
  return (
    <div>
      <Timeline items={items} />
    </div>
  );
};

export default TimelineDetailOrder;
