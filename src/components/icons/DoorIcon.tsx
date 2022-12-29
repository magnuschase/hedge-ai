import * as React from "react"
import Svg, { SvgProps, Path } from "react-native-svg"

const DoorIcon = (props: SvgProps) => (
  <Svg
    width={24}
    height={24}
    fillRule="evenodd"
    clipRule="evenodd"
    {...props}
  >
    <Path d="M20 23h2v1H2v-1h2V0h16v23zM19 1H5v22h14L9 21.046V3.031L19 1zm-7 11h-2v1h2v-1z" />
  </Svg>
)

export default DoorIcon
