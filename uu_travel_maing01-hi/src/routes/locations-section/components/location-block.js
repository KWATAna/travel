//@@viewOn:imports
import UU5 from "uu5g04";
import { createVisualComponent } from "uu5g04-hooks";
import Config from "../../config/config";
import Css from "./location-block.css";


//@@viewOff:imports

const STATICS = {
  //@@viewOn:statics
  displayName: Config.TAG + "TripsBlock",
  nestingLevel: "bigBoxCollection",
  //@@viewOff:statics
};

export const LocationsBlock = createVisualComponent({
  ...STATICS,

  //@@viewOn:propTypes
  propTypes: {
    data: UU5.PropTypes.object,
    handleOpenDetailsModal: UU5.PropTypes.func,
  },
  //@@viewOff:propTypes

  //@@viewOn:defaultProps
  defaultProps: {},
  //@@viewOff:defaultProps

  render(props) {
    const { data } = props;
    console.log(data)

    //@@viewOn:private
    // const baseUri = Uri.Uri.parse(top.location.href).getBaseUri().toString();
    // const imageUrl = Uri.UriBuilder.parse(baseUri)
    //   .setUseCase("location/getImageData")
    //   .setParameters({ image: newspaperDataObject.data?.image })
    //   .toString();
    //@@viewOff:private

    //@@viewOn:interface
    //@@viewOff:interface

    //@@viewOn:render
    const currentNestingLevel = UU5.Utils.NestingLevel.getNestingLevel(props, STATICS);

    return currentNestingLevel ? (
      <div>
        <UU5.Bricks.Card colorSchema="light-blue" className={Css.main()} bgStyle="transparent">
          <UU5.Bricks.Text className={Css.header()} content={`Country: ${data?.data?.country}`} />
          <UU5.Bricks.Text className={Css.text()} content={`City: ${data?.data?.city}`} />
          <UU5.Bricks.Text className={Css.text()} content={`Visa: ${data?.data?.visa}`} />
          <UU5.Bricks.Image
            src={`http://localhost:8080/uu-travel-maing01/22222222222222222222222222222222/location/getImageData?image=${data?.data?.image}`}
            authenticate
          />
        </UU5.Bricks.Card>
      </div>
    ) : null;
    //@@viewOff:render
  },
});

export default LocationsBlock;
