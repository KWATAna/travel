//@@viewOn:imports
import UU5 from "uu5g04";
import { createVisualComponent, useState, useLsiValues, useEffect } from "uu5g04-hooks";
import Config from "../config/config";
import Calls from "../../calls";
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
        <UU5.Forms.Text label="name" name="name" value={data?.data?.name} />
        <UU5.Forms.Text label="passExpiry" name="passExpiry" value={data?.data?.passExpiry} />
        <UU5.Forms.Text label="passNum" name="passNum" value={data?.data?.passNum} />
        <UU5.Forms.Text label="state" name="state" value={data?.data?.state} />
        <UU5.Forms.Text label="telNumber" name="telNumber" value={data?.data?.telNumber} />
        <UU5.Forms.Text label="tripId" name="tripId" value={data?.data?.tripId} />

        <UU5.Forms.DatePicker
          label="dateOfBirth"
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
