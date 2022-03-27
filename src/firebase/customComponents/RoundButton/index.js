import { useEffect } from "react";
import CameraEnhanceOutlinedIcon from '@material-ui/icons/CameraEnhanceOutlined';
import { Widgets } from "@material-ui/icons";

export default function RoundButton({onChange}) {

  return (
    <>
    <input type="file" id="file" hidden onChange={onChange}/>
    <div className="roundButton">
      <CameraEnhanceOutlinedIcon/>
    </div>
    </>
  )
}