import * as React from "react"
import Svg, { SvgProps, Path, Circle } from "react-native-svg"

const SwitchCameraIcon = (props: SvgProps) => (
  <Svg
    viewBox="0 0 24 24"
    fill="none"
    stroke="#000"
    strokeWidth={2}
    strokeLinecap="round"
    strokeLinejoin="round"
    {...props}
  >
    <Path d="M11 19H4a2 2 0 0 1-2-2V7a2 2 0 0 1 2-2h5M13 5h7a2 2 0 0 1 2 2v10a2 2 0 0 1-2 2h-5" />
    <Circle cx={12} cy={12} r={3} />
    <Path d="m18 22-3-3 3-3M6 2l3 3-3 3" />
  </Svg>
)

export default SwitchCameraIcon
