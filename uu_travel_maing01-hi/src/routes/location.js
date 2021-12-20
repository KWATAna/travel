//@@viewOn:imports
import UU5 from "uu5g04";
import "uu5g04-bricks";
import { createVisualComponent } from "uu5g04-hooks";
import "uu_plus4u5g01-app";
import LocationsContext from "./locations-section/context/locations-context.js";
import LocationsLoader from "./locations-section/common/locations-loader.js";
import DataListStateResolver from "../common/data-list-state-resolver.js";
import Config from "./config/config.js";
import LocationsWrapper from "./locations-section/components/locations-wrapper.js";

//@@viewOff:imports

const STATICS = {
  //@@viewOn:static
  displayName: Config.TAG + "Locations",
  //@@viewOff:static
};

export const Locations = createVisualComponent({
  ...STATICS,

  //@@viewOn:propTypes
  //@@viewOff:propTypes

  //@@viewOn:defaultProps
  //@@viewOff:defaultProps

  render(props) {
    //@@viewOn:private

    //@@viewOff:private

    //@@viewOn:interface
    //@@viewOff:interface

    //@@viewOn:render
    return (
      <LocationsLoader>
        <LocationsContext.Consumer>
          {(dataListResult) => {
            return (
              <DataListStateResolver dataList={dataListResult}>
                <LocationsWrapper />
              </DataListStateResolver>
            );
          }}
        </LocationsContext.Consumer>
      </LocationsLoader>
    );
    //@@viewOff:render
  },
});

export default Locations;
