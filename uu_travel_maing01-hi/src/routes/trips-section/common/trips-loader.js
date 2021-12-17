//@@viewOn:imports

import "uu5g04-bricks";
import { createComponent, useDataList } from "uu5g04-hooks";
import "uu_plus4u5g01-bricks";
import Calls from "calls";
import TripsContext from "../context/trips-context";
import Config from "../../config/config";
//@@viewOff:imports

const STATICS = {
  //@@viewOn:statics
  displayName: Config.TAG + "TripsLoader",
  //@@viewOff:statics
};

export const TripsLoader = createComponent({
  ...STATICS,
  //@@viewOn:propTypes
  //@@viewOff:propTypes

  //@@viewOn:defaultProps
  //@@viewOff:defaultProps

  //@@viewOn:render
  render(props) {
    const dataListResult = useDataList({
      handlerMap: {
        load: Calls.tripsList,
        create: Calls.tripCreate,
      },
      itemHandlerMap: {},
    });
    return <TripsContext.Provider value={dataListResult}>{props.children}</TripsContext.Provider>;
  },
  //@@viewOff:render
});

export default TripsLoader;
