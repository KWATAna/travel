//@@viewOn:imports
import { useContext } from "uu5g04-hooks";
import LocationsContext from "./locations-context";
//@@viewOff:imports

export function useLocations() {
  return useContext(LocationsContext);
}

export default useLocations;
