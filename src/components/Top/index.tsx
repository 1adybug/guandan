import { observer } from "mobx-react-lite"
import store from "../../store"
import Back from "../Back"
import CardCount from "../CardCount"
import styles from "./index.module.less"

export default observer(function Top() {
    return (
        <div className={styles["top"]}>
            {Array(store.topCardCount)
                .fill(0)
                .map((item, index) => (
                    <Back key={index} style={{ position: "absolute", left: `${index * 56 + (store.width - 56 * (store.topCardCount - 1) - 200) / 2}px` }}>
                        {index + 1 === store.topCardCount && <CardCount count={store.topCardCount}></CardCount>}
                    </Back>
                ))}
        </div>
    )
})
