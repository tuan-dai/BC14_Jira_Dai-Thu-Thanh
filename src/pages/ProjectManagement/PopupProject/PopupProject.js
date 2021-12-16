import React from "react";
import {
  Drawer,
  Form,
  Button,
  Col,
  Row,
  Input,
  Select,
  DatePicker,
  Space,
} from "antd";
import { PlusOutlined } from "@ant-design/icons";
import { useSelector, useDispatch } from "react-redux";

export default function PopupProject() {
  const { visible, ComponentContentPopup, callBackSubmit } = useSelector(
    (state) => state.popupReducer
  );

  const dispatch = useDispatch();

//   const showPopup = () => {
//     dispatch({ type: "OPEN_POPUP" });
//   };

  const onClose = () => {
    dispatch({ type: "CLOSE_POPUP" });
  };

  return (
    <>
      {/* <Button onClick={showPopup}>SHOW POPUP</Button> */}
      <Drawer
        title="Create a new project"
        width={720}
        onClose={onClose}
        visible={visible}
        bodyStyle={{ paddingBottom: 80 }}
        footer={
          <div style={{ textAlign: "right" }}>
            <Button onClick={onClose} style={{ marginRight: 8 }}>
              Cancel
            </Button>
            <Button
              onClick={() => {
                callBackSubmit();
              }}
              type="primary"
            >
              Submit
            </Button>
          </div>
        }
      >
        {/* Noi dung thay doi cua Popup */}
        {ComponentContentPopup}
      </Drawer>
    </>
  );
}
