//@@viewOn:imports
import UU5 from "uu5g04";
import { createVisualComponent } from "uu5g04-hooks";
import Config from "../../config/config";
import Css from "./trip-block.css";

//@@viewOff:imports

const STATICS = {
  //@@viewOn:statics
  displayName: Config.TAG + "TripsBlock",
  nestingLevel: "bigBoxCollection",
  //@@viewOff:statics
};

export const TripsBlock = createVisualComponent({
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

    //@@viewOn:private

    //@@viewOff:private

    //@@viewOn:interface
    //@@viewOff:interface

    //@@viewOn:render
    const currentNestingLevel = UU5.Utils.NestingLevel.getNestingLevel(props, STATICS);

    return currentNestingLevel ? (
      <div>
        <UU5.Bricks.Card colorSchema="light-blue" className={Css.main()} bgStyle="transparent">
          <UU5.Bricks.Text className={Css.header()} content={`Name: ${data?.data?.name}`} />
          <UU5.Bricks.Text className={Css.text()} content={`Capacity: ${data?.data?.capacity}`} />
          <UU5.Bricks.Text className={Css.text()} content={`Starting date: ${data?.data?.startingDate}`} />
          <UU5.Bricks.Text className={Css.text()} content={`Price: ${data?.data?.price}`} />

          <UU5.Bricks.Button
            onClick={() => {
              UU5.Environment.setRoute({
                url: { useCase: "trip", parameters: { id: data?.data?.id } },
              });
            }}
          >
            Details
          </UU5.Bricks.Button>
        </UU5.Bricks.Card>
      </div>
    ) : null;
    //@@viewOff:render
  },
});

export default TripsBlock;
