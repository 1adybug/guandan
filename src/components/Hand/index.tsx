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
        const indexList = distributeCards()[0]
        indexList.sort((a, b) => twoList[a].value - twoList[b].value || twoList[a].suit - twoList[b].suit)
        return indexList.map(num => ({
            index: num,
            selected: false
        }))
    })

    const [downIndex, setDownIndex] = useState<number | null>(null)

    const [upIndex, setUpIndex] = useState<number | null>(null)

    const clickCard = (index: number) => {
        const newList = [...list]
        newList[index].selected = !newList[index].selected
        setList(newList)
    }

    const onMouseDown = (index: number) => {
        const newList = [...list]
        setDownIndex(index)
        setUpIndex(index)
        const sideList = newList.slice()
    }

    const onMouseEnter = (index: number) => {
        const newList = [...list]
        setUpIndex(index)
        const sideList = newList.slice()
    }

    return (
        <div className={`${styles["hand"]} ${className || ""}`} style={style}>
            {list.map((item, index) => (
                <Card onMouseEnter={() => onMouseEnter(index)} onMouseDown={() => onMouseDown(index)} onClick={() => clickCard(index)} cardIndex={item.index} key={item.index} style={{ position: "absolute", marginLeft: `${index * 56}px`, transform: item.selected ? "translateY(-20px)" : "none", backgroundColor: downIndex !== null && upIndex !== null && (index - downIndex) * (upIndex - index) >= 0 ? "skyblue" : "white" }} />
            ))}
        </div>
    )
}
