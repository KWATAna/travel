//@@viewOn:imports
import "uu5g04-bricks";
import { createVisualComponent, useDataObject, useState } from "uu5g04-hooks";
import "uu_plus4u5g01-app";
import Config from "./config/config.js";
import ParticipantLoader from "./trip-section/common/participant-loader";
import TripParticipantContext from "./trip-section/context/trip-participant-context.js";
import DataListStateResolver from "../common/data-list-state-resolver.js";
import TripParticipants from "./trip-section/components/trip-participant-section.js";
import TripDetails from "./trip-section/components/trip-details.js";
import Calls from "../calls.js";

//@@viewOff:imports

const STATICS = {
  //@@viewOn:static
  displayName: Config.TAG + "Trip",
  //@@viewOff:static
};
const CLASS_NAMES = {
  centeredHeader: () => Config.Css.css`
  display: flex;
  justify-content: center;
  align-items: center;
  height: 200px;
  `,
};

export const Trip = createVisualComponent({
  ...STATICS,

  //@@viewOn:propTypes
  //@@viewOff:propTypes

  //@@viewOn:defaultProps
  //@@viewOff:defaultProps

  render(props) {
    //@@viewOn:hooks
    let dataObject;
    if (props?.params?.id) {
      dataObject = useDataObject({
        handlerMap: {
          load: Calls.tripLoad,
          setState: Calls.tripSetState,
          update: Calls.tripUpdate,
          delete: Calls.tripDelete,
        },
        initialDtoIn: {
          id: `${props.params.id}`,
        },
      });
    }
    let [id, setId] = useState(props?.params?.id || false);

    //@@viewOff:hooks
    //@@viewOn:private
    //@@viewOff:private
    //@@viewOn:interface
    //@@viewOff:interface
    //@@viewOn:render

    if (!id) {
      return (
        <div className={CLASS_NAMES.centeredHeader()}>
          <h1>Select an existing trip</h1>
        </div>
      );
    }
    return (
      <div>
        <div>
          {dataObject && (
            <DataListStateResolver dataList={dataObject}>
              <TripDetails dataObject={dataObject} />
            </DataListStateResolver>
          )}
        </div>
        <div>
          <ParticipantLoader params={id}>
            <TripParticipantContext.Consumer>
              {(dataItemResult) => {
                return (
                  <DataListStateResolver dataList={dataItemResult}>
                    <TripParticipants params={id} />
                  </DataListStateResolver>
                );
              }}
            </TripParticipantContext.Consumer>
          </ParticipantLoader>
        </div>
      </div>
    );
    //@@viewOff:render
  },
});

export default Trip;
