import styles from "./index.module.less"

export interface CardCountProps {
    className?: string
    style?: React.CSSProperties
    count: number
}

export default function CardCount(props: CardCountProps) {
    const { className, style, count } = props
    return (
        <div className={`${styles["card-count"]} ${className || ""}`} style={style}>
            {count}
        </div>
    )
}
