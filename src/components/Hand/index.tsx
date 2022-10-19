import { useState } from "react"
import { twoList } from "../../constant"
import { distributeCards } from "../../utils"
import Card from "../Card"
import styles from "./index.module.less"

export interface Props {
    className?: string
    style?: React.CSSProperties
}

export default function Hand(props: Props) {
    const { className, style } = props

    const [list, setList] = useState(() => {
        const _ = distributeCards()[0]
        _.sort((a, b) => twoList[a].value - twoList[b].value || twoList[a].suit - twoList[b].suit)
        return _.map(num => ({
            index: num,
            selected: false
        }))
    })

    const [selectList, setSelectList] = useState<null | number[]>(null)

    const clickCard = (index: number) => {
        const _ = [...list]
        _[index].selected = !_[index].selected
        setList(_)
    }

    return (
        <div className={`${styles["hand"]} ${className || ""}`} style={style}>
            {list.map((item, index) => (
                <Card onClick={() => clickCard(index)} cardIndex={item.index} key={item.index} style={{ position: "absolute", marginLeft: `${index * 56}px`, transform: item.selected ? "translateY(-20px)" : "none" }} />
            ))}
        </div>
    )
}
