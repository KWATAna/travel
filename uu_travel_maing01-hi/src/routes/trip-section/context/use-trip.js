//@@viewOn:imports
import { useContext } from "uu5g04-hooks";
import TripContext from "./trip-context";
//@@viewOff:imports

export function useTrip() {
  return useContext(TripContext);
}

export default useTrip;
