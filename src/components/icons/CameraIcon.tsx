import * as React from "react"
import Svg, { SvgProps, Path } from "react-native-svg"

const CameraIcon = (props: SvgProps) => (
  <Svg
    width={24}
    height={24}
    fillRule="evenodd"
    clipRule="evenodd"
    {...props}
  >
    <Path d="m16.983 2 1.406 2.109c.371.557.995.891 1.664.891h3.93v17h-24V5h5.93c.669 0 1.293-.334 1.664-.891L8.983 2h8zm3.07 4c-1.006 0-1.938-.5-2.496-1.337L16.448 3h-6.93L8.409 4.664A2.993 2.993 0 0 1 5.913 6H.983v15h22V6h-2.93zM13 7c3.311 0 6 2.689 6 6s-2.689 6-6 6-6-2.689-6-6 2.689-6 6-6zm0 1c2.76 0 5 2.24 5 5s-2.24 5-5 5-5-2.24-5-5 2.24-5 5-5zm0 2a3.001 3.001 0 0 1 0 6 3.001 3.001 0 0 1 0-6zm0 1a2 2 0 1 1-.001 4.001A2 2 0 0 1 13 11zM5 9a1 1 0 1 0-2 0 1 1 0 0 0 2 0zM2 3h3.001v1H2V3z" />
  </Svg>
)

export default CameraIcon
