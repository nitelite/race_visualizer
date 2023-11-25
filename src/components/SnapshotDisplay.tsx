import { RaceSnapshot } from "../types";
import ScoreDisplay from "./ScoreDisplay";

const SnapshotDisplay = ({ snapshot }: { snapshot: RaceSnapshot }) => {
   return (
      <div className="border">
         <p className="p-2 border-b text-sm mb-1">Snapshot at {snapshot.time}</p>
         <div className="px-2 py-0 flex text-xs">
            <div className="w-5">#</div>
            <div className="grow"></div>
            <div>Lap time</div>
            <div className="w-8 text-right">Laps</div>
            <div className="w-8 text-right">Pits</div>
         </div>
         {snapshot.score.map((score, position) => (
            <ScoreDisplay key={score.name} position={position + 1} score={score} />
         ))}
      </div>
   );
};

export default SnapshotDisplay;
