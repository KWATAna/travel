//@@viewOn:imports
import UU5 from "uu5g04";
import "uu5g04-bricks";
import { createVisualComponent } from "uu5g04-hooks";
import "uu_plus4u5g01-app";
import TripsContext from "./trips-section/context/trips-context.js";
import TripsLoader from "./trips-section/common/trips-loader.js";
import DataListStateResolver from "../common/data-list-state-resolver.js";
import Config from "./config/config.js";
import TripsWrapper from "./trips-section/components/trips-wrapper.js";

//@@viewOff:imports

const STATICS = {
  //@@viewOn:static
  displayName: Config.TAG + "Trips",
  //@@viewOff:static
};

export const Trips = createVisualComponent({
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
      <TripsLoader>
        <TripsContext.Consumer>
          {(dataListResult) => {
            return (
              <DataListStateResolver dataList={dataListResult}>
                <TripsWrapper />
              </DataListStateResolver>
            );
          }}
        </TripsContext.Consumer>
      </TripsLoader>
    );
    //@@viewOff:render
  },
});

export default Trips;
