import { useEffect, useState } from "react";
import { useGetShoppingQuery } from "../../redux/api/shoppingApi";
import { Button, Empty } from "antd";
import LottieLoading from "../../effect/LottieLoading";
import { useAppDispatch, useAppSelector } from "../../app/hook";
import { setDelivering } from "../../redux/slices/badgeOrderSlice";
import {
  setIdOrderTimeline,
  setisModalTimeline,
} from "../../redux/slices/timelineSlice";
import ModalTimeline from "../../components/ModalTimeline";
const DeliveringOrder = () => {
  const { data, isLoading, error }: any = useGetShoppingQuery();
  const [ProductDelivering, setProducDelivering]: any = useState();
  const { user }: any = useAppSelector((state) => state.Authentication);
  const dispatch = useAppDispatch();
  useEffect(() => {
    (async () => {
      const lengthProduct = await ProductDelivering?.map(
        (item: any) => item.productOrder.length
      );
      const [length] = lengthProduct;
      dispatch(setDelivering(length));
    })();
  }, [ProductDelivering, dispatch]);

  useEffect(() => {
    (async () => {
      const checkUserOrder = await data?.filter(
        (item: any) => item.userId === user?._id
      );
      const dataDelivering = await checkUserOrder?.filter(
        (items: any) => items.isDelivering === true
      );
      setProducDelivering(dataDelivering);
    })();
  }, [data, user]);

  if (error || ProductDelivering?.length === 0) {
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
    <div>
      {ProductDelivering?.map((items: any) => (
        <div key={items?._id}>
          <div className="">
            {items?.productOrder?.map((item: any) => (
              <div
                className="p-2 border-b md:flex md:justify-between"
                key={item?._id}
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
                      {items?.updatedAt}
                    </div>
                  </div>
                </div>
                <div className=" p-2 space-y-3">
                  <div className="text-right">
                    <div className="">{item.price / 1000 + ".000"} VNĐ</div>
                    Tổng tiền: {items.totalPrice / 1000 + ".000 đ"}
                  </div>
                  <div className="flex space-x-3">
                    <Button
                      size="small"
                      onClick={() => {
                        dispatch(setisModalTimeline(true));
                        dispatch(setIdOrderTimeline(items?._id));
                      }}
                    >
                      Theo dõi đơn
                    </Button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      ))}
      <ModalTimeline />
    </div>
  );
};

export default DeliveringOrder;
