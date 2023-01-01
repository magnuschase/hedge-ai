import * as React from "react"
import Svg, { SvgProps, Path } from "react-native-svg"

const SaveIcon = (props: SvgProps) => (
  <Svg width={24} height={24} {...props}>
    <Path d="M14 3h2.997v5H14V3zm9 1v20H1V0h17.997L23 4zM6 9h12V2H6v7zm14 4H4v9h16v-9z" />
  </Svg>
)

export default SaveIcon
