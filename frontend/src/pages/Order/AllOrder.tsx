import { useEffect, useState } from "react";
import {
  useGetShoppingQuery,
  useUpdateShoppingMutation,
} from "../../redux/api/shoppingApi";
import LottieLoading from "../../effect/LottieLoading";
import { Button, Empty, notification } from "antd";
import { LoadingOutlined } from "@ant-design/icons";
import { useAppDispatch, useAppSelector } from "../../app/hook";
import { setAllOrder } from "../../redux/slices/badgeOrderSlice";
import ModalTimeline from "../../components/ModalTimeline";
import {
  setIdOrderTimeline,
  setisModalTimeline,
} from "../../redux/slices/timelineSlice";

const AllOrder = () => {
  const { data, isLoading, error }: any = useGetShoppingQuery();
  const [updateShopping, { isLoading: UpdateOrderLoading }] =
    useUpdateShoppingMutation();
  const [ProductnotProcessed, setProductnotProcessed]: any = useState();
  const { user }: any = useAppSelector((state) => state.Authentication);
  const dispatch = useAppDispatch();
  useEffect(() => {
    (async () => {
      const lengthProductProcessed = await ProductnotProcessed?.map(
        (item: any) => item.productOrder.length
      );
      const [length] = lengthProductProcessed;
      dispatch(setAllOrder(length));
    })();
  }, [ProductnotProcessed, dispatch]);

  useEffect(() => {
    (async () => {
      const checkUserOrder = await data?.filter(
        (item: any) => item.userId === user?._id
      );
      const dataAllOrder = await checkUserOrder?.filter(
        (items: any) => items.notProcessed === false
      );
      setProductnotProcessed(dataAllOrder);
    })();
  }, [data, user]);

  if (error || ProductnotProcessed?.length === 0) {
    return <Empty />;
  }
  if (isLoading) {
    return (
      <div className="flex justify-center items-center">
        <LottieLoading />
      </div>
    );
  }

  return (
    <div className="space-y-6">
      {ProductnotProcessed?.map((itemOrder: any) => (
        <div className="" key={itemOrder._id}>
          <div className=""> Đơn Hàng: #{itemOrder._id}</div>
          {itemOrder?.productOrder?.map((item: any) => (
            <div
              className="p-2 border-b md:flex md:justify-between"
              key={item._id}
            >
              <div className="flex justify-between ">
                <div className="">
                  <img
                    src={item.images[0].response.uploadedFiles[0].url}
                    alt=""
                    className="md:w-24 w-20"
                  />
                </div>
                <div className="space-y-3">
                  <div className="flex-none mx-auto">
                    {item.name} , SL: x{item.quantity}
                  </div>
                  <div className="text-gray-500 text-xs">
                    {itemOrder?.updatedAt}
                  </div>
                </div>
              </div>
              <div className=" p-2 space-y-3">
                <div className="text-right">
                  <div className="">{item.price / 1000 + ".000"} đ</div>
                  Tổng tiền: {itemOrder.totalPrice / 1000 + ".000 đ"}
                </div>
                <div className="flex space-x-3">
                  <Button
                    size="small"
                    onClick={() => {
                      dispatch(setisModalTimeline(true));
                      dispatch(setIdOrderTimeline(itemOrder?._id));
                    }}
                  >
                    Theo dõi đơn
                  </Button>
                  <Button
                    size="small"
                    onClick={() =>
                      updateShopping({ deleted: true, _id: itemOrder._id })
                        .unwrap()
                        .then(() => {
                          return notification.success({
                            message:
                              "Đã gửi yêu cầu vui lòng chờ shop phản hồi!",
                          });
                        })
                    }
                  >
                    {UpdateOrderLoading ? <LoadingOutlined /> : "Hủy đơn"}
                  </Button>
                </div>
              </div>
            </div>
          ))}
        </div>
      ))}
      <ModalTimeline />
    </div>
  );
};

export default AllOrder;
