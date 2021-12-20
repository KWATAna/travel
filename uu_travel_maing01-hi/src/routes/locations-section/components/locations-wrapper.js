//@@viewOn:imports
import UU5 from "uu5g04";
import { createVisualComponent } from "uu5g04-hooks";
import Uu5Tiles from "uu5tilesg02";
import Config from "../../config/config";
import LocationsBlock from "./location-block";
import { useLocations } from "../context/use-locations";

//@@viewOff:imports

const STATICS = {
  //@@viewOn:statics
  displayName: Config.TAG + "TripsWrapper",
  nestingLevel: "bigBoxCollection",
  //@@viewOff:statics
};

export const LocationsWrapper = createVisualComponent({
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
    const { data } = useLocations();

    // @@viewOn:hooks
    // @@viewOff:hooks
    // @@viewOn:private

    //@@viewOff:private

    //@@viewOn:interface
    //@@viewOff:interface

    //@@viewOn:render
    const currentNestingLevel = UU5.Utils.NestingLevel.getNestingLevel(props, STATICS);

    return currentNestingLevel ? (
      <Uu5Tiles.ControllerProvider data={data}>
        <Uu5Tiles.Grid tileSpacing={8} rowSpacing={2} tileMinWidth={600} tileMaxWidth={800}>
          <LocationsBlock></LocationsBlock>
        </Uu5Tiles.Grid>
      </Uu5Tiles.ControllerProvider>
    ) : null;
    //@@viewOff:render
  },
});

export default LocationsWrapper;
