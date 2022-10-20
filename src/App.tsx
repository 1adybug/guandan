import "antd/dist/antd.less"
import Hand from "./components/Hand"
import Side from "./components/Side"
import Top from "./components/Top"

export default () => {
    return (
        <>
            <Side side="left" />
            <Side side="right" />
            <Top></Top>
            <Hand></Hand>
        </>
    )
}
