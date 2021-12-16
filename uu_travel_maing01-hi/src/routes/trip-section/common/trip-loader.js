//@@viewOn:imports

import "uu5g04-bricks";
import { createComponent, useDataList } from "uu5g04-hooks";
import "uu_plus4u5g01-bricks";
import Calls from "calls";
import TripContext from "../context/trip-context";
import Config from "../../config/config";
//@@viewOff:imports

const STATICS = {
  //@@viewOn:statics
  displayName: Config.TAG + "TripLoader",
  //@@viewOff:statics
};

export const TripLoader = createComponent({
  //@@viewOn:propTypes
  //@@viewOff:propTypes

  //@@viewOn:defaultProps
  //@@viewOff:defaultProps

  //@@viewOn:render
  render(props) {
    const dataItemResult = useDataList({
      initialDtoIn: {
        id: `${props.params}`,
      },
      handlerMap: {
        load: Calls.tripLoad,
      },
      itemHandlerMap: {},
    });
    console.log({dataItemResult})
    return <TripContext.Provider value={dataItemResult}>{props.children}</TripContext.Provider>;
  },
  //@@viewOff:render
});

export default TripLoader;
