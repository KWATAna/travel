//@@viewOn:imports
import UU5 from "uu5g04";
import { createVisualComponent, useState, useEffect } from "uu5g04-hooks";
import Uu5Tiles from "uu5tilesg02";
import Config from "../../config/config";
import { useTripParticipant } from "../context/use-trip-participant";
import ParticipantCard from "./trip-participant-card";
import Calls from "../../../calls";
//@@viewOff:imports

const STATICS = {
  //@@viewOn:statics
  displayName: Config.TAG + "TripParticipants",
  nestingLevel: "bigBoxCollection",
  //@@viewOff:statics
};
const CLASS_NAMES = {
  centeredHeader: () => Config.Css.css`
  flex-direction: column;
  align-items: center;
  `,
};

export const TripParticipants = createVisualComponent({
  ...STATICS,

  //@@viewOn:propTypes
  propTypes: {
    data: UU5.PropTypes.object,
    params: UU5.PropTypes.string,
  },
  //@@viewOff:propTypes

  //@@viewOn:defaultProps
  defaultProps: {},
  //@@viewOff:defaultProps

  render(props) {
    const { params } = props;
    //@@viewOn:hooks
    const { data, handlerMap } = useTripParticipant();
    const [removeId, setRemoveId] = useState("FFF");
    const myregexp = /^[0-9a-fA-F]{24}$/;

    useEffect(() => {
      if (removeId.match(myregexp)) {
        let fetchTrip = async () => {
          let trip = await Calls.tripLoad({ id: params });
          let startingArray = [...trip.participantIdList];
          let newArr = startingArray.filter((id) => id !== removeId);
          await Calls.tripUpdate({ id: params, participantIdList: newArr });
        };
        fetchTrip();
      }
    }, [removeId]);

    const [participants, setParticipants] = useState();

    useEffect(() => {
      let fetchParticipants = async () => {
        let participantList = await Calls.participantList();
        let list = participantList.itemList.filter((el) => el.tripId !== params);
        await setParticipants(list);
      };
      fetchParticipants();
    }, []);

    //@@viewOff:hooks
    //@@viewOn:private
    async function UpdateTripParticipant(formData) {
      const { values } = formData;
      await handlerMap.update({ ...values, tripId: params });
      const trip = await Calls.tripLoad({ id: params });
      const upPartList = [...trip.participantIdList, values.id];
      await Calls.tripUpdate({ id: params, participantIdList: upPartList });
    }
    const SORTERS = [
      {
        key: "dateOfBirth",
        label: "dateOfBirth",
        sorterFn: (a, b) => {
          return new Date(a.data.dateOfBirth) - new Date(b.data.dateOfBirth);
        },
      },
    ];
    //@@viewOff:private

    //@@viewOn:interface
    //@@viewOff:interface
    //@@viewOn:render
    const currentNestingLevel = UU5.Utils.NestingLevel.getNestingLevel(props, STATICS);
    return currentNestingLevel ? (
      <Uu5Tiles.ControllerProvider sorters={SORTERS} data={data}>
        <UU5.Forms.Form onSave={UpdateTripParticipant}>
          {participants && (
            <UU5.Forms.Select
              className={CLASS_NAMES.centeredHeader()}
              name="id"
              labelWidth="auto"
              label="Select participant"
            >
              {participants &&
                participants.map((item) => {
                  return <UU5.Forms.Select.Option key={item.id} content={item.name} value={item.id} />;
                })}
            </UU5.Forms.Select>
          )}
          <UU5.Forms.Controls />
        </UU5.Forms.Form>
        <Uu5Tiles.InfoBar />

        <Uu5Tiles.Grid tileSpacing={8} rowSpacing={2} tileMaxWidth={400}>
          <ParticipantCard setRemoveId={setRemoveId} />
        </Uu5Tiles.Grid>
      </Uu5Tiles.ControllerProvider>
    ) : null;
    //@@viewOff:render
  },
});

export default TripParticipants;
