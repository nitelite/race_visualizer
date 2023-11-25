import { addMilliseconds, lightFormat, startOfDay } from "date-fns";
import { isUndefined } from "lodash-es";

export const convertTimeStringToMillis = (timeString: string): number => {
   // Split the string by the colon and period to get hours, minutes, seconds, and milliseconds
   const [hours, minutes, seconds, milliseconds] = timeString.split(/[:.]/);

   // Calculate the total milliseconds
   return parseInt(hours) * 60 * 60 * 1000 + parseInt(minutes) * 60 * 1000 + parseInt(seconds) * 1000 + parseInt(milliseconds);
};

export const millisToTime = (millis: number | undefined): string => {
   if (isUndefined(millis)) {
      return "-";
   }

   const midnight = startOfDay(new Date());
   const withCorrectTime = addMilliseconds(midnight, millis);
   return lightFormat(withCorrectTime, "H:mm:ss.SSS");
};
