import { InlineWidget } from "react-calendly";

function Calendly({url, height}) {
  return (
    <InlineWidget styles={{height: height}} url={url} />
  )
}

export default Calendly