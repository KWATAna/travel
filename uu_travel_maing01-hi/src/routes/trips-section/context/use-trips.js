//@@viewOn:imports
import { useContext } from "uu5g04-hooks";
import TripsContext from "./trips-context";
//@@viewOff:imports

export function useTrips() {
  return useContext(TripsContext);
}

export default useTrips;
