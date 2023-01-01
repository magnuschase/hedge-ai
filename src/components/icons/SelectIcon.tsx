import * as React from "react"
import Svg, { SvgProps, Path } from "react-native-svg"

const SelectIcon = (props: SvgProps) => (
  <Svg width={24} height={24} viewBox="0 0 24 24" {...props}>
    <Path d="M13 24V10.667L23 19h-6.156L13 24zm8-20h2V0h-4v2h2v2zm0 6h2V6h-2v4zM17 0h-4v2h4V0zm4 14.73 2 1.645V12h-2v2.73zM11 0H7v2h4V0zm0 20H7v2h4v-2zM1 4h2V2h2V0H1v4zm2 2H1v4h2V6zm0 6H1v4h2v-4zm0 6H1v4h4v-2H3v-2z" />
  </Svg>
)

export default SelectIcon
