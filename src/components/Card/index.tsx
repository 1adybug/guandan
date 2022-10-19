import { twoList } from "../../constant"
import { getCardLook } from "../../utils"
import styles from "./index.module.less"

export interface CardProps {
    className?: string
    style?: React.CSSProperties
    cardIndex: number
    onClick: () => void
    onMouseDown: () => void
    onMouseEnter: () => void
}

const joker = ["J", "O", "K", "E", "R"]

export default function Card(props: CardProps) {
    const { className, style, cardIndex, onClick, onMouseDown, onMouseEnter } = props
    const card = twoList[cardIndex]
    const { text, color, icon } = getCardLook(card)

    return (
        <div onMouseEnter={onMouseEnter} onMouseDown={onMouseDown} onClick={onClick} className={`${styles["card"]} ${className || ""}`} style={style}>
            <div className={styles["code"]} style={{ color }}>
                <div className={styles["icon"]}>{icon}</div>
                {icon ? (
                    <div className={styles["text"]}>{text}</div>
                ) : (
                    joker.map(c => (
                        <div className={styles["joker"]} key={c}>
                            {c}
                        </div>
                    ))
                )}
            </div>
        </div>
    )
}
