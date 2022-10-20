import { ReactNode } from "react"
import styles from "./index.module.less"

export interface BackProps {
    className?: string
    style?: React.CSSProperties
    children?: ReactNode
}

export default function Back(props: BackProps) {
    const { className, style, children } = props
    return (
        <div className={`${styles["back"]} ${className || ""}`} style={style}>
            <div className={styles["back-bg"]}>{children}</div>
        </div>
    )
}
