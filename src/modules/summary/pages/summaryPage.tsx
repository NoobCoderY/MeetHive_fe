import Summary from "../components/summary"
import MSummary from "../components/mobile-version/summary"
import useResponsive from "@/hooks/useResponsive"

const SummaryPage = () => {
  const breakPoints=useResponsive([600,900,1400])
  return (
    <>
      {breakPoints===0?<MSummary/>:<Summary/>}</>
  )
}

export default SummaryPage