//@@viewOn:imports
import UU5 from "uu5g04";
import { createVisualComponent } from "uu5g04-hooks";
import Uu5Tiles from "uu5tilesg02";
import { useContextModal } from "../../../common/modal-manager";
import Config from "../../config/config";
import { useTrips } from "../context/use-trips";
import TripsBlock from "./trips-block";
import { UpdateControls, UpdateForm, UpdateHeader } from "../../../bricks/form/travel-form";

//@@viewOff:imports

const STATICS = {
  //@@viewOn:statics
  displayName: Config.TAG + "TripsWrapper",
  nestingLevel: "bigBoxCollection",
  //@@viewOff:statics
};

export const TripsWrapper = createVisualComponent({
  ...STATICS,

  //@@viewOn:propTypes
  propTypes: {
    data: UU5.PropTypes.object,
  },
  //@@viewOff:propTypes

  //@@viewOn:defaultProps
  defaultProps: {},
  //@@viewOff:defaultProps

  render(props) {
    const { data, handlerMap } = useTrips();
    let { open, showAlert, close } = useContextModal();

    // @@viewOn:hooks
    // @@viewOff:hooks
    // @@viewOn:private
    function handleOpenDetailsModal(data) {
      open({
        header: <UpdateHeader />,
        content: (
          <UpdateForm
            handlerMap={handlerMap}
            isCreateForm={true}
            data={data}
            closeModal={close}
            showAlert={showAlert}
          />
        ),
        footer: <UpdateControls isCreate={true} />,
      });
    }
    const SORTERS = [
      {
        key: "price",
        label: { cs: "Trip price", en: "Trip price" },
        sorterFn: (a, b) => {
          console.log(a, b);
          return a.data.price - b.data.price;
        },
      },
    ];

    const FILTERS = [
      {
        key: "location",
        label: { cs: "Location", en: "Location" },
        component: (
          <UU5.Forms.Select label="Search by city">
            <UU5.Forms.Select.Option value="Prague" />
            <UU5.Forms.Select.Option value="Paris" />
          </UU5.Forms.Select>
        ),
        filterFn: (item, value) => {
          let fragments = value.split(/[\s,.-;:_]/);
          console.log(item);
          return fragments.some((frag) => {
            let itemValue = typeof item.data.name === "object" ? item.data.name : item.data.name;
            return itemValue.toLowerCase().indexOf(frag.toLowerCase()) !== -1;
          });
        },
      },
    ];
    const getActions = () => [
      {
        active: true,
        icon: "mdi-plus-circle",
        content: "Add New Trip",
        colorSchema: "primary",
        bgStyle: "filled",
        onClick: handleOpenDetailsModal,
      },
    ];
    //@@viewOff:private

    //@@viewOn:interface
    //@@viewOff:interface

    //@@viewOn:render
    const currentNestingLevel = UU5.Utils.NestingLevel.getNestingLevel(props, STATICS);

    return currentNestingLevel ? (
      <Uu5Tiles.ControllerProvider data={data} sorters={SORTERS} filters={FILTERS}>
        <Uu5Tiles.InfoBar />
        <Uu5Tiles.FilterBar />
        <Uu5Tiles.ActionBar actions={getActions()} />
        <Uu5Tiles.Grid tileSpacing={8} rowSpacing={2}>
          <TripsBlock></TripsBlock>
        </Uu5Tiles.Grid>
      </Uu5Tiles.ControllerProvider>
    ) : null;
    //@@viewOff:render
  },
});

export default TripsWrapper;
