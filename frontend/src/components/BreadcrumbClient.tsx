import { Breadcrumb } from "antd";
import { HomeOutlined, RightOutlined } from "@ant-design/icons";
import { Link, useLocation } from "react-router-dom";

const BreadcrumbClient = () => {
  const location = useLocation();
  const pathnames = location.pathname.split("/").filter((x) => x);
  const breadcrumbItems = [
    {
      title: (
        <div className="">
          <Link to="/">
            <HomeOutlined />
            <span className="px-2">Trang chủ</span>
          </Link>
        </div>
      ),
    },
  ];
  if (pathnames) {
    breadcrumbItems.push({
      title: (
        <>
          <Link to={`/${pathnames[0]}`}>
            <span>{pathnames[0]}</span>
          </Link>
        </>
      ),
    });
  }
  return (
    <div className="md:max-w-6xl mx-auto p-2 mt-[2  0px]">
      <Breadcrumb separator={<RightOutlined />}>
        {breadcrumbItems.map((item, index) => (
          <Breadcrumb.Item key={index}>{item.title}</Breadcrumb.Item>
        ))}
      </Breadcrumb>
    </div>
  );
};

export default BreadcrumbClient;
