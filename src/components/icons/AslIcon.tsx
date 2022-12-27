import * as React from "react"
import Svg, { SvgProps, Path } from "react-native-svg"

const SvgComponent = (props: SvgProps) => (
  <Svg
    width={24}
    height={24}
    fillRule="evenodd"
    clipRule="evenodd"
    {...props}
  >
    <Path d="M22 24H5a3 3 0 0 1-3-3V3a3 3 0 0 1 3-3h17v24zm-2-4H5.495c-1.375 0-1.375 2 0 2H20v-2zm0-18h-3v9l-2-1.547L13 11V2H5v16h15V2z" />
  </Svg>
)

export default SvgComponent
