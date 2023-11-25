import { useCallback, useEffect, useRef, useState } from "react";
import { PLAYBACK_STATE, RaceSnapshot } from "./types";
import { getTime } from "date-fns";
import SnapshotDisplay from "./components/SnapshotDisplay.tsx";
import Button from "./components/Button";
import PositionDisplay from "./components/PositionDisplay.tsx";
import { isUndefined } from "lodash-es";

const getButtonText = (playbackState: PLAYBACK_STATE) => {
   switch (true) {
      case playbackState === PLAYBACK_STATE.PLAYING:
         return "Pause";
      case playbackState === PLAYBACK_STATE.PAUSED:
         return "Reset";
      case playbackState === PLAYBACK_STATE.READY:
         return "Play";
   }
};

function App({ data }: { data: RaceSnapshot[] }) {
   const [startTime, setStartTime] = useState(0);
   const [snapshotIndex, setSnapshotIndex] = useState(0);
   const [playbackState, setPlaybackState] = useState<PLAYBACK_STATE>(PLAYBACK_STATE.READY);
   const [playbackSpeed, setPlaybackSpeed] = useState(1);
   const [, setFrame] = useState(0);
   const intervalRef = useRef(0);

   const advanceClock = useCallback(() => {
      setFrame((frame) => frame + 1);
   }, []);

   const nextPlaybackState = useCallback(() => {
      if (playbackState === PLAYBACK_STATE.READY) {
         setStartTime(getTime(new Date()));
         setPlaybackState(PLAYBACK_STATE.PLAYING);
         intervalRef.current = setInterval(advanceClock, 25);
      } else if (playbackState === PLAYBACK_STATE.PLAYING) {
         setPlaybackState(PLAYBACK_STATE.PAUSED);
         clearInterval(intervalRef.current);
      } else if (playbackState === PLAYBACK_STATE.PAUSED) {
         setStartTime(0);
         setSnapshotIndex(0);
         setPlaybackState(PLAYBACK_STATE.READY);
      }
   }, [playbackState, advanceClock]);

   const currentTime = getTime(new Date());
   const playbackPosition = playbackState === PLAYBACK_STATE.PLAYING ? (currentTime - startTime) * playbackSpeed : 0;
   const maxIndex = data.length - 1;
   const nextSnapshot = data[snapshotIndex + 1];

   useEffect(() => {
      if (nextSnapshot?.timeMillis < playbackPosition) {
         setSnapshotIndex((currentIndex) => Math.min(currentIndex + 1, maxIndex));
      }
      if (isUndefined(nextSnapshot)) {
         setPlaybackState(PLAYBACK_STATE.PAUSED);
         clearInterval(intervalRef.current);
      }
   }, [playbackPosition, nextSnapshot, maxIndex]);

   const currentSnapshot = data[snapshotIndex];

   return (
      <div className="flex justify-center items-center">
         <div className="w-96">
            <div className="flex justify-between w-full h-16">
               <div className="p-2">
                  <PositionDisplay
                     playbackPosition={playbackPosition}
                     state={playbackState}
                     nextUpdate={nextSnapshot?.timeMillis}
                  />
               </div>
               <div className="p-2 pr-0">
                  <select
                     className="border p-1 me-1"
                     disabled={playbackState === PLAYBACK_STATE.PLAYING}
                     onChange={(e) => setPlaybackSpeed(parseInt(e.target.value))}
                  >
                     <option value={1}>1x</option>
                     <option value={2}>2x</option>
                     <option value={5}>5x</option>
                     <option value={10}>10x</option>
                     <option value={20}>20x</option>
                     <option value={500}>500x</option>
                  </select>
                  <Button onClick={nextPlaybackState}>{getButtonText(playbackState)}</Button>
               </div>
            </div>
            <SnapshotDisplay snapshot={currentSnapshot} />
         </div>
      </div>
   );
}

export default App;
