//@@viewOn:imports
import UU5 from "uu5g04";
import { createVisualComponent, useState } from "uu5g04-hooks";
import { useContextModal } from "../../../common/modal-manager";
import Config from "../../config/config";
import { ParticipantHeader, ParticipantControls, ParticipantFormUpdate } from "../../../bricks/form/participant-form";
import Css from "./trip-participant-card.css";
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
    setRemoveId: UU5.PropTypes.func,
  },
  //@@viewOff:propTypes

  //@@viewOn:defaultProps
  defaultProps: {},
  //@@viewOff:defaultProps

  render(props) {
    const { data, setRemoveId } = props;
    const [unmount, setUnmount] = useState(false);

    let { open, showAlert, close } = useContextModal();
    function handleOpenDetailsModal(data) {
      open({
        header: <ParticipantHeader />,
        content: <ParticipantFormUpdate data={data} closeModal={close} showAlert={showAlert} />,
        footer: <ParticipantControls />,
      });
    }

    //@@viewOn:private
    async function removeTrip() {
      await data.handlerMap.update({ tripId: data.data.id });
      setUnmount(!unmount);
    }
    //@@viewOff:private

    //@@viewOn:interface
    //@@viewOff:interface

    //@@viewOn:render
    const currentNestingLevel = UU5.Utils.NestingLevel.getNestingLevel(props, STATICS);

    return currentNestingLevel ? (
      <div>
        {!unmount ? (
          <UU5.Bricks.Card colorSchema="light-blue" className={Css.main()} bgStyle="transparent">
            <UU5.Bricks.Text className={Css.header()} content={`Name ${data?.data?.name}`} />
            <UU5.Bricks.Text className={Css.text()} content={`Date of Birth: ${data?.data?.dateOfBirth}`} />
            <UU5.Bricks.Text className={Css.text()} content={`Passport number: ${data?.data?.passNum}`} />
            <div className={Css.footer()}>
              <UU5.Bricks.Button
                onClick={() => {
                  setRemoveId(data.data.id);
                  removeTrip();
                }}
                bgStyle="outline"
              >
                <UU5.Bricks.Icon className={Css.icon()} icon={Config.removeParticipant} />
              </UU5.Bricks.Button>

              <UU5.Bricks.Button bgStyle="outline" onClick={() => handleOpenDetailsModal(data)}>
                <UU5.Bricks.Icon className={Css.icon()} icon={Config.editButton} />
              </UU5.Bricks.Button>
            </div>
          </UU5.Bricks.Card>
        ) : null}
      </div>
    ) : null;
    //@@viewOff:render
  },
});

export default ParticipantCard;
