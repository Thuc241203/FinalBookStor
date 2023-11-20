import { Button } from "antd";
import Lottie from "lottie-react";
import NotFound from "../assets/notFound.json";
import { Link } from "react-router-dom";

const NotFoundPage = () => {
  return (
    <div className="w-screen h-screen text-center">
      <Lottie animationData={NotFound} className="md:w-96 m-auto" />
      <div className="">không tìm thấy trang này.</div>
      <Link to={"/"}>
        <Button type="link">Back to Home</Button>
      </Link>
    </div>
  );
};

export default NotFoundPage;
