import { PLAYBACK_STATE } from "../types";
import { millisToTime } from "../utils";

type StateDisplayProps = {
   state: PLAYBACK_STATE;
   nextUpdate?: number;
   playbackPosition: number;
};

const PositionDisplay = ({ state, playbackPosition, nextUpdate }: StateDisplayProps) => {
   if (state === PLAYBACK_STATE.PLAYING) {
      return (
         <>
            <p>Current position: {millisToTime(playbackPosition)}</p>
            <p className="text-sm">Next snapshot: {millisToTime(nextUpdate)}</p>
         </>
      );
   }

   if (state === PLAYBACK_STATE.PAUSED) {
      return <p>Paused</p>;
   }

   if (state === PLAYBACK_STATE.READY) {
      return <p>Ready to play</p>;
   }
};

export default PositionDisplay;
