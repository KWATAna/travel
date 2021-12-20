//@@viewOn:imports
import UU5 from "uu5g04";
import { createVisualComponent, useState, useLsiValues } from "uu5g04-hooks";
import Config from "../config/config";
import Lsi from "./participant-form-lsi";
//@@viewOff:imports

const STATICS = {
  //@@viewOn:statics
  displayName: Config.TAG + "UpdateForm",
  nestingLevel: "bigBoxCollection",
  //@@viewOff:statics
};

const ParticipantFormUpdate = createVisualComponent({
  ...STATICS,

  //@@viewOn:propTypes
  propTypes: {},
  //@@viewOff:propTypes

  //@@viewOn:defaultProps
  defaultProps: {},
  //@@viewOff:defaultProps

  render(props) {
    const { closeModal, data } = props;

    //@@viewOn:hooks
    const [isLoading, setLoading] = useState(false);
    const inputLsi = useLsiValues(Lsi);
    //@@viewOff:hooks
    //@@viewOn:private
    async function handleUpdate(formData) {
      let { values, component } = formData;
      let id = data?.data?.id;
      let response;
      let action = data.handlerMap.update({ ...values, id });

      component.setPending();
      try {
        response = await action(values);
      } catch (e) {
        component.getAlertBus().addAlert({
          content: <UU5.Common.Error content={<UU5.Bricks.Lsi lsi={Lsi.saveError} />} />,
          colorSchema: "danger",
        });
      }
      component.setReady();

      if (response) {
        component.getAlertBus().addAlert({
          content: <UU5.Common.Error content={<UU5.Bricks.Lsi lsi={Lsi.saveSuccess} />} />,
          colorSchema: "success",
        });
      }
      closeModal();
    }
    //@@viewOff:private

    //@@viewOn:interface
    //@@viewOff:interface

    //@@viewOn:render
    return (
      <UU5.Forms.ContextForm
        onSave={handleUpdate}
        onCancel={closeModal}
        progressIndicator={<UU5.Bricks.Loading />}
        disabled={isLoading}
      >
        <UU5.Forms.Text
          pattern="[A-Za-z]{3}"
          patternMessage="Must contain at least 3 alphabet characters"
          required
          label={inputLsi.partName}
          name="name"
          value={data?.data?.name}
        />
        <UU5.Forms.DatePicker
          label={inputLsi.passExp}
          name="passExpiry"
          valueType="iso"
          value={data?.data?.passExpiry}
          size="l"
        />
        <UU5.Forms.Text required label={inputLsi.passNum} name="passNum" value={data?.data?.passNum} />
        <UU5.Forms.Text required disabled label={inputLsi.partState} name="state" value={data?.data?.state} />
        <UU5.Forms.Text required label={inputLsi.phoneNum} name="telNumber" value={data?.data?.telNumber} />

        <UU5.Forms.DatePicker
          label={inputLsi.dOB}
          name="dateOfBirth"
          valueType="iso"
          value={data?.data?.dateOfBirth}
          size="l"
        />
      </UU5.Forms.ContextForm>
    );
    //@@viewOff:render
  },
});

const ParticipantHeader = () => {
  return (
    <UU5.Forms.ContextHeader
      content={<UU5.Bricks.Lsi lsi={Lsi.header} />}
      info={<UU5.Bricks.Lsi lsi={Lsi.info} params={[Config.TRIP_UPDATE_TEXT]} />}
    />
  );
};

const ParticipantControls = ({ isCreateForm }) => {
  return (
    <UU5.Forms.ContextControls
      buttonSubmitProps={{
        content: <UU5.Bricks.Lsi lsi={isCreateForm ? Lsi.submit("Create") : Lsi.submit("Update")} />,
      }}
      buttonCancelProps={{ content: <UU5.Bricks.Lsi lsi={Lsi.cancel} /> }}
    />
  );
};
export { ParticipantHeader, ParticipantControls, ParticipantFormUpdate };
export default ParticipantFormUpdate;
