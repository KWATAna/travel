//@@viewOn:imports
import { useContext } from "uu5g04-hooks";
import TripParticipantContext from "./trip-participant-context";
//@@viewOff:imports

export function useTripParticipant() {
  return useContext(TripParticipantContext);
}

export default useTripParticipant;
