import * as React from "react"
import Svg, { SvgProps, Path } from "react-native-svg"

const EditIcon = (props: SvgProps) => (
  <Svg
    clipRule="evenodd"
    fillRule="evenodd"
    strokeLinejoin="round"
    strokeMiterlimit={2}
    viewBox="0 0 24 24"
    {...props}
  >
    <Path
      d="M11.239 15.533c-1.045 3.004-1.238 3.451-1.238 3.84 0 .441.385.627.627.627.272 0 1.108-.301 3.829-1.249zm.888-.888 3.22 3.22 6.408-6.401a.832.832 0 0 0 0-1.182l-2.039-2.036a.834.834 0 0 0-1.183 0zM9 13.75a.772.772 0 0 0-.75-.75h-5.5c-.394 0-.75.348-.75.75s.356.75.75.75h5.5c.394 0 .75-.348.75-.75zm5-3a.772.772 0 0 0-.75-.75H2.75c-.394 0-.75.348-.75.75s.356.75.75.75h10.5c.394 0 .75-.348.75-.75zm0-3a.772.772 0 0 0-.75-.75H2.75c-.394 0-.75.348-.75.75s.356.75.75.75h10.5c.394 0 .75-.348.75-.75zm0-3a.772.772 0 0 0-.75-.75H2.75c-.394 0-.75.348-.75.75s.356.75.75.75h10.5c.394 0 .75-.348.75-.75z"
      fillRule="nonzero"
    />
  </Svg>
)

export default EditIcon
