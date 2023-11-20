import { Badge, Button, Rate, Tag, message } from "antd";
import { useEffect, useState } from "react";
import { InboxOutlined, MinusOutlined, PlusOutlined } from "@ant-design/icons";
import { useParams } from "react-router-dom";
import { useGetProductByIdQuery } from "../redux/api/productApi";
import SimilarProduct from "../components/SimilarProduct";
import { IProduct } from "../interfaces/products";
import { useAppDispatch, useAppSelector } from "../app/hook";
import LottieLoading from "../effect/LottieLoading";
import { addItemCart } from "../redux/slices/cartSlice";
import FeedBackProducts from "../components/FeedBackProducts";
import { useGetUserQuery } from "../redux/api/auth";
import { motion } from "framer-motion";

const ProductDetail = () => {
  const [count, setCount] = useState(1);
  const [currentImage, setCurrentImage] = useState<number | string>(0);
  const { slug } = useParams();
  const slugParams = slug?.split(".html") ?? [];
  const temp = slugParams[0]?.split("-") as string[];
  const id = temp[temp.length - 1];
  const dispatch = useAppDispatch();
  const { data: productDetail, isLoading }: any = useGetProductByIdQuery(id);
  const [userId, setUserId] = useState();
  const { user: userStorage }: any = useAppSelector(
    (state) => state.Authentication
  );
  const { data: user } = useGetUserQuery(userId);
  const idProductToOrder = user?.user?.products.flat();
  const checkProduct = idProductToOrder?.includes(id) as boolean;
  useEffect(() => {
    (async () => {
      const idUser = userStorage?._id;
      setUserId(idUser);
    })();
  }, [userStorage]);

  const listSilimar = productDetail?.listProductSimilar?.filter(
    (item: IProduct) => {
      return item._id !== id;
    }
  );

  const ListImage = productDetail?.data?.images?.map((items: any) => {
    return items?.response?.uploadedFiles[0].url;
  });

  if (isLoading) {
    return (
      <div className="flex justify-center items-center">
        <LottieLoading />
      </div>
    );
  }
  const gotoImage = (index: number | string) => {
    setCurrentImage(index);
  };
  const increase = () => {
    setCount(count + 1);
  };

  const decline = () => {
    let newCount = count - 1;
    if (newCount < 1) {
      newCount = 1;
    }
    setCount(newCount);
  };
  return (
    <div className="p-4 md:max-w-6xl md:mx-auto">
      <div className="md:grid md:grid-cols-2 lg:grid-cols-2 gap-8 bg-white p-6 rounded-lg shadow-md">
        <div className="space-y-6">
          <motion.div
            className="duration-500 ease-in-out h-96 bg-center bg-cover rounded-md overflow-hidden"
            style={{ backgroundImage: `url(${ListImage[currentImage]})` }}
            initial={{ opacity: 0, x: -50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5, delay: 0.1 }}
          />
          <div className="grid grid-cols-4 gap-2 mt-4">
            {ListImage?.map((image: any, index: any) => (
              <motion.button
                onClick={() => gotoImage(index)}
                key={index}
                initial={{ opacity: 0, x: -20, y: -20 }}
                animate={{ opacity: 1, x: 0, y: 0 }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                className="w-16 h-16 bg-center bg-cover rounded-md overflow-hidden"
                style={{ backgroundImage: `url(${image})` }}
              />
            ))}
          </div>
        </div>
        <div className="space-y-6">
          <div>
            <span className="text-sm text-gray-400">
              Tác giả: {productDetail?.data?.author}
            </span>
            <h2 className="text-2xl font-bold text-gray-800">
              {productDetail?.data?.name}
            </h2>
          </div>

          <div className="flex items-center space-x-2">
            <Rate allowHalf defaultValue={productDetail?.data?.rate} />
            <span className="text-gray-500">
              {productDetail?.data?.sold} lượt bán
            </span>
          </div>

          <div className="flex items-center space-x-2">
            <span className="text-gray-400">Loại sách:</span>
            <Tag color="red">{productDetail?.data?.categoryId?.name}</Tag>
          </div>

          <div>
            <span className="font-bold">Mô tả sản phẩm:</span>
            <p className="text-gray-600">{productDetail?.data?.description}</p>
          </div>
        </div>
      </div>
      <div className="mt-8 p-6 bg-white rounded-lg shadow-md">
        <div className="flex items-center space-x-4">
          <span className="font-bold text-xl">Số lượng</span>
          <div className="flex items-center space-x-4">
            <Button icon={<MinusOutlined />} onClick={decline} />
            <Badge count={count} showZero>
              <InboxOutlined className="text-xl" />
            </Badge>
            <Button icon={<PlusOutlined />} onClick={increase} />
          </div>
        </div>

        <div className="flex items-center space-x-4 mt-4">
          <span className="font-bold text-2xl">Tạm tính</span>
          <span className="font-poppins text-red-500 text-2xl">
            {(productDetail?.data?.price * count) / 1000 + ".000"} đ
          </span>
        </div>

        <div className="flex items-center space-x-4 mt-6">
          <Button>
            <a href={"/order"}>MUA NGAY</a>
          </Button>
          <Button
            onClick={() => {
              dispatch(
                addItemCart({ ...productDetail?.data, quantity: count })
              );
              message.success("Đã thêm vào giỏ hàng!");
            }}
          >
            THÊM VÀO GIỎ HÀNG
          </Button>
        </div>
      </div>
      <FeedBackProducts checkProduct={checkProduct} />
      <SimilarProduct listSilimar={listSilimar} />
    </div>
  );
};

export default ProductDetail;
