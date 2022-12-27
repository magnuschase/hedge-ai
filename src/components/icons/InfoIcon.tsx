import * as React from "react"
import Svg, { SvgProps, Path } from "react-native-svg"

const InfoIcon = (props: SvgProps) => (
  <Svg
    clipRule="evenodd"
    fillRule="evenodd"
    strokeLinejoin="round"
    strokeMiterlimit={2}
    viewBox="0 0 24 24"
    {...props}
  >
    <Path
      d="M2 4v16.002a1 1 0 0 0 1.625.781l4.725-3.781H21a1 1 0 0 0 1-1V4a1 1 0 0 0-1-1H3a1 1 0 0 0-1 1zm18.5 11.502H7.823L3.5 18.962V4.5h17zm-8.502-6.5a.75.75 0 0 1 .75.75v3.5a.75.75 0 0 1-1.5 0v-3.5a.75.75 0 0 1 .75-.75zm.002-3a1 1 0 1 1 0 2 1 1 0 0 1 0-2z"
      fillRule="nonzero"
    />
  </Svg>
)

export default InfoIcon
