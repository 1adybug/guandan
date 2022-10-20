import { ReactNode } from "react"
import styles from "./index.module.less"

export interface SideBackProps {
    className?: string
    style?: React.CSSProperties
    children?: ReactNode
}

export default function SideBack(props: SideBackProps) {
    const { className, style, children } = props
    return (
        <div className={`${styles["side-back"]} ${className || ""}`} style={style}>
            <div className={styles["back-bg"]}>{children}</div>
        </div>
    )
}
