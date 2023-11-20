import { Modal } from "antd";
import TimelineDetailOrder from "./TimelineDetailOrder";
import { useAppDispatch, useAppSelector } from "../app/hook";
import { setisModalTimeline } from "../redux/slices/timelineSlice";

const ModalTimeline = () => {
  const { idOrder, isModal } = useAppSelector((state) => state.Timeline);
  const dispatch = useAppDispatch();
  return (
    <div>
      <Modal
        title="Chi tiết đơn hàng"
        open={isModal}
        footer={null}
        maskClosable={true}
        onCancel={() => dispatch(setisModalTimeline(false))}
      >
        <TimelineDetailOrder id={idOrder} />
      </Modal>
    </div>
  );
};

export default ModalTimeline;
