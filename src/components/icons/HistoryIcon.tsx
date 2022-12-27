import * as React from "react"
import Svg, { SvgProps, Path } from "react-native-svg"

const HistoryIcon = (props: SvgProps) => (
  <Svg
    clipRule="evenodd"
    fillRule="evenodd"
    strokeLinejoin="round"
    strokeMiterlimit={2}
    viewBox="0 0 24 24"
    {...props}
  >
    <Path
      d="M3.503 6.726A9.996 9.996 0 0 1 11.998 2c5.518 0 9.997 4.48 9.997 9.997 0 5.519-4.479 9.999-9.997 9.999-5.245 0-9.553-4.048-9.966-9.188-.024-.302.189-.811.749-.811.391 0 .715.3.747.69.351 4.369 4.012 7.809 8.47 7.809 4.69 0 8.497-3.808 8.497-8.499 0-4.689-3.807-8.497-8.497-8.497a8.495 8.495 0 0 0-7.206 3.995l1.991.005a.75.75 0 0 1 0 1.5H2.75A.75.75 0 0 1 2 8.25V4.201a.75.75 0 0 1 1.5 0zm7.487.021.007 5.563c0 .288.165.55.424.675l3.978 1.928a.75.75 0 1 0 .652-1.35l-3.555-1.725-.006-5.093a.75.75 0 0 0-1.5.002z"
      fillRule="nonzero"
    />
  </Svg>
)

export default HistoryIcon
