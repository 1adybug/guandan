import { Button, message } from "antd"
import { observer } from "mobx-react-lite"
import { useState } from "react"
import { twoList } from "../../constant"
import store from "../../store"
import { distributeCards, Card as CardOrigin, getCardType } from "../../utils"
import Card from "../Card"
import styles from "./index.module.less"

export interface Props {
    className?: string
    style?: React.CSSProperties
}

export default observer(function Hand(props: Props) {
    const { className, style } = props

    const [list, setList] = useState(() => {
        const indexList = distributeCards()[0]
        indexList.sort((a, b) => twoList[a].value - twoList[b].value || twoList[a].suit - twoList[b].suit)
        return indexList
    })

    const [downIndex, setDownIndex] = useState<number | null>(null)

    const [upIndex, setUpIndex] = useState<number | null>(null)

    const clickCard = (cardIndex: number) => {
        const index = store.selectList.indexOf(cardIndex)

        const newList = [...store.selectList]

        if (index < 0) {
            newList.push(cardIndex)
            store.changeSelectList(newList)
            return
        }

        newList.splice(index, 1)
        store.changeSelectList(newList)
    }

    const onMouseDown = (index: number) => {
        // const newList = [...list]
        // setDownIndex(index)
        // setUpIndex(index)
        // const sideList = newList.slice()
    }

    const onMouseEnter = (index: number) => {
        // const newList = [...list]
        // setUpIndex(index)
        // const sideList = newList.slice()
    }

    const showCardType = () => {
        const cardList: CardOrigin[] = store.selectList.map(cardIndex => twoList[cardIndex])
        const type = getCardType(cardList)
        if (type) {
            message.success(type.type)
            return
        }
        message.warning("不是合法的牌型")
    }

    return (
        <div className={styles["hand"]}>
            <div className={styles["tool-list"]}>
                <Button className={styles["button"]} onClick={() => store.changeSelectList([])}>
                    取消
                </Button>
                <Button danger className={styles["button"]} onClick={() => store.changeSelectList([])}>
                    不要
                </Button>
                <Button className={styles["button"]} disabled={store.selectList.length === 0} type="primary" onClick={showCardType}>
                    出牌
                </Button>
            </div>

            <div className={styles["card-list"]}>
                {list.map((cardIndex, num) => (
                    <Card onMouseEnter={() => onMouseEnter(cardIndex)} onMouseDown={() => onMouseDown(cardIndex)} onClick={() => clickCard(cardIndex)} cardIndex={cardIndex} key={cardIndex} style={{ position: "absolute", left: `${num * 56 + (store.width - 56 * (list.length - 1) - 200) / 2}px`, transform: store.selectList.includes(cardIndex) ? "translateY(-20px)" : "none" }} />
                ))}
            </div>
        </div>
    )
})
