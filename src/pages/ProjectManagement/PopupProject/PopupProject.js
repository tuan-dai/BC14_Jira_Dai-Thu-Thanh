import React from "react";
import {
  Drawer,
<<<<<<< HEAD
=======
  Button,
>>>>>>> origin
} from "antd";
import { useSelector, useDispatch } from "react-redux";

export default function PopupProject() {
<<<<<<< HEAD
  const { visible, ComponentContentPopup } = useSelector(
=======
  const { visible, ComponentContentPopup, callBackSubmit } = useSelector(
>>>>>>> origin
    (state) => state.popupReducer
  );

  const dispatch = useDispatch();

<<<<<<< HEAD
  //   const showPopup = () => {
  //     dispatch({ type: "OPEN_POPUP" });
  //   };
=======
//   const showPopup = () => {
//     dispatch({ type: "OPEN_POPUP" });
//   };
>>>>>>> origin

  const onClose = () => {
    dispatch({ type: "CLOSE_POPUP" });
  };

  return (
    <>
      {/* <Button onClick={showPopup}>SHOW POPUP</Button> */}
      <Drawer
<<<<<<< HEAD
        title="Edit project"
=======
        title="Create a new project"
>>>>>>> origin
        width={720}
        onClose={onClose}
        visible={visible}
        bodyStyle={{ paddingBottom: 80 }}
<<<<<<< HEAD
      // footer={
      //   <div style={{ textAlign: "right" }}>
      //     <Button onClick={onClose} style={{ marginRight: 8 }}>
      //       Cancel
      //     </Button>
      //     <Button
      //       onClick={(e) => {
      //         callBackSubmit(e);
      //         onClose();
      //       }}
      //       type="primary"
      //     >
      //       Submit
      //     </Button>
      //   </div>
      // }
=======
        footer={
          <div style={{ textAlign: "right" }}>
            <Button onClick={onClose} style={{ marginRight: 8 }}>
              Cancel
            </Button>
            <Button
              onClick={(e) => {
                callBackSubmit(e);
                onClose();
              }}
              type="primary"
            >
              Submit
            </Button>
          </div>
        }
>>>>>>> origin
      >
        {/* Noi dung thay doi cua Popup */}
        {ComponentContentPopup}
      </Drawer>
    </>
  );
}
