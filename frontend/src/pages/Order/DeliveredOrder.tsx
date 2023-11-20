import { useEffect, useState } from "react";
import { useGetShoppingQuery } from "../../redux/api/shoppingApi";
import { Button, Empty } from "antd";
import LottieLoading from "../../effect/LottieLoading";
import { Link } from "react-router-dom";
import { useAppDispatch, useAppSelector } from "../../app/hook";
import { setIdOrder } from "../../redux/slices/feedbackSlice";
import { setDelivered } from "../../redux/slices/badgeOrderSlice";
import {
  setIdOrderTimeline,
  setisModalTimeline,
} from "../../redux/slices/timelineSlice";
import ModalTimeline from "../../components/ModalTimeline";
import { convertSlug } from "../../utils/convertSlug";

const DeliveredOrder = () => {
  const { data, isLoading, error } = useGetShoppingQuery();
  const [ProductDelivered, setProducDelivered]: any = useState();
  const { user }: any = useAppSelector((state) => state.Authentication);
  const dispatch = useAppDispatch();
  useEffect(() => {
    (async () => {
      const lengthProductDelivered = await ProductDelivered?.map(
        (item: any) => item.productOrder.length
      );
      const [length] = lengthProductDelivered;
      dispatch(setDelivered(length));
    })();
  }, [ProductDelivered, dispatch]);
  useEffect(() => {
    (async () => {
      const checkUserOrder = await data?.filter(
        (item) => item.userId === user?._id
      );
      const dataDelivered = await checkUserOrder?.filter(
        (items) => items.isDelivered === true
      );
      setProducDelivered(dataDelivered);
    })();
  }, [data, user]);

  if (error || ProductDelivered?.length === 0) {
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
      {ProductDelivered?.map((items: any) => (
        <div key={items?._id}>
          <div className="">
            {items?.productOrder?.map((item: any) => (
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
                      {items?.updatedAt}
                    </div>
                  </div>
                </div>
                <div className=" p-2 space-y-3">
                  <div className="text-right">
                    <div className="">{item.price / 1000 + ".000"} đ</div>
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
                      Chi tiết đơn
                    </Button>
                    <Link
                      to={`/books/${convertSlug(item.name)}-${
                        item._id
                      }.html/detail`}
                      onClick={() => dispatch(setIdOrder(items._id))}
                    >
                      <Button size="small">Đánh giá sản phẩm</Button>
                    </Link>
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

export default DeliveredOrder;
