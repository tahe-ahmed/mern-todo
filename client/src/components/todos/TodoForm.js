import React from "react";
import CustomDialogContent from "./Modal";
import { CustomDialog } from "react-st-modal";

function TodoForm(props) {
  return (
    <div class="add-items d-flex">
      {
        <>
          <button
            type="button"
            class="btn btn-primary btn-circle btn-xl"
            onClick={async () => {
              await CustomDialog(
                <CustomDialogContent
                  onSubmit={props.onSubmit}
                  edit={props.edit}
                />,
                {
                  title: "Add New Todo",
                  showCloseIcon: true,
                }
              );
            }}
          >
            <i class="fa fa-plus"></i>
          </button>
        </>
      }
    </div>
  );
}

export default TodoForm;
