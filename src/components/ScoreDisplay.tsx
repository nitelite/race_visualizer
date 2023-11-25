import { Score } from "../types";

const ScoreDisplay = ({ score, position }: { score: Score; position: number }) => {
   const color = score.finish ? "font-semibold" : "";
   return (
      <div className={`bg-white px-2 py-0 flex text-xs ${color}`}>
         <div className="w-5">{position}</div>
         <div className="grow">{score.name}</div>
         {score.in_pit ? <div>In pit</div> : <div>{score.current_lap_time.substring(3)}</div>}
         <div className="w-8 text-right">{score.lap}</div>
         <div className="w-8 text-right">{score.pits}</div>
      </div>
   );
};

export default ScoreDisplay;
