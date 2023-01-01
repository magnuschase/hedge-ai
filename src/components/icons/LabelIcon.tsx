import * as React from "react"
import Svg, { SvgProps, Path } from "react-native-svg"

const LabelIcon = (props: SvgProps) => (
  <Svg
    width={24}
    height={24}
		viewBox='0 0 24 24'
    fillRule="evenodd"
    clipRule="evenodd"
    {...props}
  >
    <Path d="m12.434 22.586 7.859-7.858.707.707L12.435 24l-.001-.001V24L0 11.566l.707-.707 11.727 11.727zm-.033-1.7L0 8.481V0h8.441l12.445 12.401-8.485 8.485zM8.028 1H1v7.067l11.401 11.405 7.07-7.07L8.028 1zM6.43 3.594A2 2 0 1 1 3.601 6.42 2 2 0 0 1 6.43 3.594zm-.707.707a1 1 0 1 1-1.416 1.414 1 1 0 0 1 1.416-1.414z" />
  </Svg>
)

export default LabelIcon
