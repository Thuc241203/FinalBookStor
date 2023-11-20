import { IoIosAppstore } from "react-icons/io";
import { PiGooglePlayLogoThin } from "react-icons/pi";
const Footer = () => {
  return (
    <footer className=" bg-gray-800 text-white py-8">
      <div className="px-14 container mx-auto flex flex-wrap justify-between">
        <div className="w-full md:w-1/2 lg:w-1/4">
          <h4 className="text-lg font-semibold mb-4">Tin tức</h4>
          <ul className="space-y-2">
            <li>
              <a href="#" className="hover:text-gray-300">
                bán sách mới nhất
              </a>
            </li>
            <li>
              <a href="#" className="hover:text-gray-300">
                sale hot
              </a>
            </li>
            <li>
              <a href="#" className="hover:text-gray-300">
                chốt ngay tầm giá
              </a>
            </li>
          </ul>
        </div>
        <div className="w-full md:w-1/2 lg:w-1/4">
          <h4 className="text-lg font-semibold mb-4">Sách</h4>
          <ul className="space-y-2">
            <li>
              <a href="#" className="hover:text-gray-300">
                Tiểu thuyết
              </a>
            </li>
            <li>
              <a href="#" className="hover:text-gray-300">
                Khoa học
              </a>
            </li>
            <li>
              <a href="#" className="hover:text-gray-300">
                Sách kinh doanh
              </a>
            </li>
          </ul>
        </div>{" "}
        <div className="w-full md:w-1/2 lg:w-1/4">
          <h4 className="text-lg font-semibold mb-4">Sách</h4>
          <ul className="space-y-2">
            <li>
              <a href="#" className="hover:text-gray-300">
                Tiểu thuyết
              </a>
            </li>
            <li>
              <a href="#" className="hover:text-gray-300">
                Khoa học
              </a>
            </li>
            <li>
              <a href="#" className="hover:text-gray-300">
                Sách kinh doanh
              </a>
            </li>
          </ul>
        </div>
        <div className="w-full md:w-1/2 lg:w-1/4 mt-6 md:mt-0">
          <h4 className="text-lg font-semibold mb-4">Tải ứng dụng bokbok</h4>
          <div className="flex space-x-4">
            <a
              href="#"
              className="flex items-center bg-white text-gray-800 px-3 py-2 rounded"
            >
              <IoIosAppstore />
              <span className="ml-2">App Store</span>
            </a>
            <a
              href="#"
              className="flex items-center bg-white text-gray-800 px-3 py-2 rounded"
            >
              <PiGooglePlayLogoThin />

              <span className="ml-2">Google Play</span>
            </a>
          </div>
        </div>
        <div className="w-full md:w-1/2 lg:w-1/4 mt-6 md:mt-0"></div>
      </div>
    </footer>
  );
};

export default Footer;
