import * as React from "react"
import Svg, { SvgProps, Path } from "react-native-svg"

const UploadIcon = (props: SvgProps) => (
  <Svg
    width={24}
    height={24}
    fillRule="evenodd"
    clipRule="evenodd"
    {...props}
  >
    <Path d="m11.492 10.172-2.5 3.064-.737-.677L11.992 8l3.753 4.585-.753.665-2.5-3.076V18h-1v-7.828zM18.5 20h-13A4.505 4.505 0 0 1 1 15.5a4.49 4.49 0 0 1 3.698-4.424l.779-.14.043-.789a6.488 6.488 0 0 1 12.958 0l.044.789.78.14A4.492 4.492 0 0 1 23 15.5c0 2.482-2.019 4.5-4.5 4.5m.978-9.908C19.266 6.141 16.006 3 12 3s-7.267 3.141-7.479 7.092A5.499 5.499 0 0 0 5.5 21h13a5.499 5.499 0 0 0 .978-10.908" />
  </Svg>
)

export default UploadIcon
