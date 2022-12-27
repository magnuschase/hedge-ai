import * as React from "react"
import Svg, { SvgProps, Path } from "react-native-svg"

const SvgComponent = (props: SvgProps) => (
  <Svg
    width={24}
    height={24}
    viewBox="-27 0 310 310"
    preserveAspectRatio="xMidYMid"
    {...props}
  >
    <Path
      d="M218.281 90.106c50.292 50.292 50.292 130.969 0 181.61-49.244 50.292-130.27 50.292-180.562 0s-50.292-131.318 0-181.61L127.825 0v45.053l-8.382 8.382-59.721 59.722c-37.72 37.02-37.72 97.79 0 135.509 37.02 37.719 97.79 37.719 135.509 0 37.719-37.02 37.719-97.79 0-135.51l23.05-23.05Zm-45.053-5.588c-9.259 0-16.764-7.505-16.764-16.764 0-9.258 7.505-16.764 16.764-16.764 9.258 0 16.764 7.506 16.764 16.764 0 9.259-7.506 16.764-16.764 16.764Z"
      fill={props.fill || "#000"}
    />
  </Svg>
)

export default SvgComponent
