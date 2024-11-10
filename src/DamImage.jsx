import { useState, useEffect } from 'react';
import state1 from "./assets/state1.png";
import state2 from "./assets/state2.png";
import state3 from "./assets/state3.png";

const DamImage = ({ outflowlevel }) => {
  // Using placeholder URLs instead of imported images
  console.log(outflowlevel)
  const [imgState, setImgState] = useState(state1);

  useEffect(() => {
    if (outflowlevel < 3) {
      setImgState(state1);
    } else if (outflowlevel >= 3 && outflowlevel < 6) {
      setImgState(state2);
    } else if (outflowlevel >= 6) {
      setImgState(state3);
    }
  }, [outflowlevel]);

  return (
    <div>
      <img src={imgState} alt="Dam state visualization" className="w-[80px] h-[50px]" />
    </div>
  );
};

export default DamImage;
