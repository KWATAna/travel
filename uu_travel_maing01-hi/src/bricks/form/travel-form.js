//@@viewOn:imports
import UU5 from "uu5g04";
import { createVisualComponent, useState, useEffect, useLsiValues } from "uu5g04-hooks";
import Config from "../config/config";
import Calls from "../../calls";
import Lsi from "./travel-form-lsi";
//@@viewOff:imports

const STATICS = {
  //@@viewOn:statics
  displayName: Config.TAG + "UpdateForm",
  nestingLevel: "bigBoxCollection",
  //@@viewOff:statics
};

const UpdateForm = createVisualComponent({
  ...STATICS,

  //@@viewOn:propTypes
  propTypes: {
    isCreateForm: UU5.PropTypes.bool,
    closeModal: UU5.PropTypes.func,
    data: UU5.PropTypes.object,
    handlerMap: UU5.PropTypes.object,
  },
  //@@viewOff:propTypes

  //@@viewOn:defaultProps
  defaultProps: {},
  //@@viewOff:defaultProps

  render(props) {
    const { closeModal, isCreateForm, data, handlerMap } = props;

    //@@viewOn:hooks
    const [isLoading, setLoading] = useState(false);
    const [locations, setLocations] = useState();
    const inputLsi = useLsiValues(Lsi);

    useEffect(() => {
      let fetchLocations = async () => {
        let locationList = await Calls.locationList();
        await setLocations(locationList.itemList);
      };
      fetchLocations();
    }, []);

    //@@viewOff:hooks

    //@@viewOn:private
    async function handleUpdate(formData) {
      let { values, component } = formData;
      let id = data?.data?.id;
      let action;
      let response;
      let participantIdList = [];
      if (isCreateForm) {
        action = handlerMap.create({ ...values, participantIdList });
      } else {
        action = data.handlerMap.update({ ...values, id });
      }
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
          required
          pattern="[A-Za-z]{3}"
          patternMessage="Must contain at least 3 alphabet characters"
          label={inputLsi.name}
          name="name"
          value={data?.data?.name}
        />
        <UU5.Forms.Text
          required
          patternMessage="Must contain digits"
          pattern="^[0-9]*$"
          label={inputLsi.price}
          name="price"
          value={data?.data?.price}
        />
        <UU5.Forms.Text
          required
          patternMessage="Must contain digits"
          pattern="^[0-9]*$"
          label={inputLsi.capacity}
          name="capacity"
          value={data?.data?.capacity}
        />
        <UU5.Forms.DatePicker
          required
          label={inputLsi.startDate}
          name="startingDate"
          valueType="iso"
          value={data?.data?.startingDate}
          size="l"
        />
        {isCreateForm && (
          <UU5.Forms.Select name="locationId" label={inputLsi.location}>
            {locations &&
              locations.map((item) => {
                return <UU5.Forms.Select.Option key={item.id} content={item.city} value={item.id} />;
              })}
          </UU5.Forms.Select>
        )}
      </UU5.Forms.ContextForm>
    );
    //@@viewOff:render
  },
});

const UpdateHeader = () => {
  return (
    <UU5.Forms.ContextHeader
      content={<UU5.Bricks.Lsi lsi={Lsi.header} />}
      info={<UU5.Bricks.Lsi lsi={Lsi.info} params={[Config.TRIP_UPDATE_TEXT]} />}
    />
  );
};

const UpdateControls = ({ isCreateForm }) => {
  return (
    <UU5.Forms.ContextControls
      buttonSubmitProps={{
        content: <UU5.Bricks.Lsi lsi={isCreateForm ? Lsi.submit("Create") : Lsi.submit("Update")} />,
      }}
      buttonCancelProps={{ content: <UU5.Bricks.Lsi lsi={Lsi.cancel} /> }}
    />
  );
};
export { UpdateHeader, UpdateControls, UpdateForm };
export default UpdateForm;
