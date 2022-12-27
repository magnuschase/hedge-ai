import * as React from "react"
import Svg, { SvgProps, Path } from "react-native-svg"

const HomeIcon = (props: SvgProps) => (
  <Svg
    width={24}
    height={24}
    fillRule="evenodd"
    clipRule="evenodd"
    {...props}
  >
    <Path d="M6 23H3V13l8.991-8.005L21 13v10h-3v-9H6v9zm1-2h10v2H7v-2zm0-3h10v2H7v-2zm10-3v2H7v-2h10zM12 .971l12 10.661-1.328 1.493L12 3.644 1.328 13.125 0 11.632 12 .971z" />
  </Svg>
)

export default HomeIcon
