import { observer } from "mobx-react-lite"
import store from "../../store"
import CardCount from "../CardCount"
import SideBack from "../SideBack"
import styles from "./index.module.less"

export interface SideProps {
    side: "left" | "right"
}

export default observer(function Side(props: SideProps) {
    const { side } = props

    const count = side === "left" ? store.leftCardCount : store.rightCardCount

    return (
        <div className={styles["side"]} style={{ [side]: "40px" }}>
            {Array(count)
                .fill(0)
                .map((item, index) => (
                    <SideBack key={index} style={{ position: "absolute", top: `${index * 14 + (store.height - 14 * (count - 1) - 200) / 2}px` }}>
                        {index + 1 === store.topCardCount && <CardCount count={store.topCardCount}></CardCount>}
                    </SideBack>
                ))}
        </div>
    )
})
