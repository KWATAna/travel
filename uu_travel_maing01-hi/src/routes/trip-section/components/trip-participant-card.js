//@@viewOn:imports
import UU5 from "uu5g04";
import { createVisualComponent } from "uu5g04-hooks";
import { useContextModal } from "../../../common/modal-manager";
import Config from "../../config/config";
import { ParticipantHeader, ParticipantControls, ParticipantFormUpdate } from "../../../bricks/form/participant-form";

//@@viewOff:imports

const STATICS = {
  //@@viewOn:statics
  displayName: Config.TAG + "ItemBlock",
  nestingLevel: "bigBoxCollection",
  //@@viewOff:statics
};

export const ParticipantCard = createVisualComponent({
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
    const { data } = props;

    let { open, showAlert, close } = useContextModal();
    function handleOpenDetailsModal(data) {
      open({
        header: <ParticipantHeader />,
        content: <ParticipantFormUpdate data={data} closeModal={close} showAlert={showAlert} />,
        footer: <ParticipantControls />,
      });
    }


    //@@viewOn:private

    //@@viewOff:private

    //@@viewOn:interface
    //@@viewOff:interface

    //@@viewOn:render
    const currentNestingLevel = UU5.Utils.NestingLevel.getNestingLevel(props, STATICS);

    return currentNestingLevel ? (
      <div>
        <UU5.Bricks.Card>
          <UU5.Bricks.Text content={`Name ${data?.data?.name}`} />
          <UU5.Bricks.Text content={`Date of Birth: ${data?.data?.dateOfBirth}`} />
          <UU5.Bricks.Text content={`Passport number: ${data?.data?.passNum}`} />
          <UU5.Bricks.Button content="Delete" />
          <UU5.Bricks.Button content="Update" onClick={() => handleOpenDetailsModal(data)} />
        </UU5.Bricks.Card>
      </div>
    ) : null;
    //@@viewOff:render
  },
});

export default ParticipantCard;