//@@viewOn:imports
import UU5 from "uu5g04";
import { createVisualComponent, useState } from "uu5g04-hooks";
import Config from "../../config/config";
import { useContextModal } from "../../../common/modal-manager";
import { UpdateControls, UpdateForm, UpdateHeader } from "../../../bricks/form/travel-form";

//@@viewOff:imports

const STATICS = {
  //@@viewOn:statics
  displayName: Config.TAG + "ItemBlock",
  nestingLevel: "bigBoxCollection",
  //@@viewOff:statics
};
const CLASS_NAMES = {
  centeredHeader: () => Config.Css.css`
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
  gap: 10px;
  `,
};

export const TripDetails = createVisualComponent({
  ...STATICS,

  //@@viewOn:propTypes
  propTypes: {
    data: UU5.PropTypes.object,
    handleOpenDetailsModal: UU5.PropTypes.func,
  },
  //@@viewOff:propTypes

  //@@viewOn:defaultProps
  defaultProps: {},
  //@@viewOff:defaultProps

  render(props) {
    let data = props.dataObject;
    let { id, state } = data.data;

    //@@viewOn:hooks
    let [switchState, setSwitchState] = useState(state);
    let { getConfirmRef, open, showAlert, close } = useContextModal();
    function handleOpenDetailsModal(data) {
      open({
        header: <UpdateHeader />,
        content: <UpdateForm data={data} closeModal={close} showAlert={showAlert} />,
        footer: <UpdateControls />,
      });
    }
    async function deleteTrip() {
      try {
        await data.handlerMap.delete({ id: id });
      } catch (e) {
        UU5.Environment.getPage()
          .getAlertBus()
          .addAlert({
            content: <UU5.Bricks.Text content="Cannot delete trip with active items" />,
            colorSchema: "red",
          });
      }
    }
    function handleOpenConfirmModal() {
      return getConfirmRef().open({
        onRefuse: () => console.log("refuse"),
        onConfirm: () => deleteTrip(),
        header: "Cookies",
        content: <UU5.Bricks.P>Are you sure you want to delete this TODO LIST.</UU5.Bricks.P>,
        confirmButtonProps: { content: "Delete", colorSchema: "danger" },
        refuseButtonProps: { content: "Cancel", colorSchema: "green" },
        confirmButtonLeft: true,
      });
    }
    //@@viewOff:hooks
    //@@viewOn:private
    //@@viewOff:private
    //@@viewOn:interface
    //@@viewOff:interface

    //@@viewOn:render
    const currentNestingLevel = UU5.Utils.NestingLevel.getNestingLevel(props, STATICS);
    return currentNestingLevel ? (
      <div>
        <UU5.Bricks.Card colorSchema="blue-rich" className={CLASS_NAMES.centeredHeader()}>
          <UU5.Bricks.Text content={`Name: ${data.data.name}`} />
          <UU5.Bricks.Text content={`Price: ${data.data.price}`} />
          <UU5.Bricks.Text content={`Starting date: ${data.data.startingDate}`} />
          <UU5.Bricks.Text content={`State: ${data.data.state}`} />
          <UU5.Bricks.SwitchSelector
            colorSchema="blue-rich"
            bgStyle="filled"
            items={["active", "closed", "pending"].map((value) => ({ value }))}
            label="Set new state"
            value={switchState}
            onChange={({ value }) => {
              data.handlerMap.setState({ state: value, id });
              setSwitchState(value);
            }}
          />
          <UU5.Bricks.ButtonGroup>
            <UU5.Bricks.Button size="s" onClick={handleOpenConfirmModal}>
              Delete
            </UU5.Bricks.Button>
            <UU5.Bricks.Button size="s" onClick={() => handleOpenDetailsModal(data)}>
              Update
            </UU5.Bricks.Button>
          </UU5.Bricks.ButtonGroup>
        </UU5.Bricks.Card>
      </div>
    ) : null;
    //@@viewOff:render
  },
});

export default TripDetails;
