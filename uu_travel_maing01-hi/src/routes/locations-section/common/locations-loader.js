//@@viewOn:imports

import "uu5g04-bricks";
import { createComponent, useDataList } from "uu5g04-hooks";
import "uu_plus4u5g01-bricks";
import Calls from "calls";
import LocationsContext from "../context/locations-context";
import Config from "../../config/config";
//@@viewOff:imports

const STATICS = {
  //@@viewOn:statics
  displayName: Config.TAG + "LocationsLoader",
  //@@viewOff:statics
};

export const LocationsLoader = createComponent({
  ...STATICS,
  //@@viewOn:propTypes
  //@@viewOff:propTypes

  //@@viewOn:defaultProps
  //@@viewOff:defaultProps

  //@@viewOn:render
  render(props) {
    const dataListResult = useDataList({
      handlerMap: {
        load: Calls.locationList,
      },
      itemHandlerMap: {},
    });
    return <LocationsContext.Provider value={dataListResult}>{props.children}</LocationsContext.Provider>;
  },
  //@@viewOff:render
});

export default LocationsLoader;
