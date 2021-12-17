//@@viewOn:imports

import "uu5g04-bricks";
import { createComponent, useDataList } from "uu5g04-hooks";
import "uu_plus4u5g01-bricks";
import Calls from "calls";
import TripContext from "../context/trip-participant-context";
import Config from "../../config/config";
//@@viewOff:imports

const STATICS = {
  //@@viewOn:statics
  displayName: Config.TAG + "TripParticipantLoader",
  //@@viewOff:statics
};

export const ParticipantLoader = createComponent({
  //@@viewOn:propTypes
  //@@viewOff:propTypes

  //@@viewOn:defaultProps
  //@@viewOff:defaultProps

  //@@viewOn:render
  render(props) {
    const dataItemResult = useDataList({
      initialDtoIn: {
        tripId: `${props.params}`,
      },
      handlerMap: {
        load: Calls.participantList,
      },
      itemHandlerMap: {
        delete: Calls.participantDelete,
        update: Calls.participantUpdate,
      },
    });
    return <TripContext.Provider value={dataItemResult}>{props.children}</TripContext.Provider>;
  },
  //@@viewOff:render
});

export default ParticipantLoader;
