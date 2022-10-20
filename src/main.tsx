import React from "react"
import ReactDOM from "react-dom/client"
import App from "./App"
import "./index.css"
import store from "./store"

store.changeSize({
    width: window.innerWidth,
    height: window.innerHeight
})

window.addEventListener("resize", () => {
    store.changeSize({
        width: window.innerWidth,
        height: window.innerHeight
    })
})

ReactDOM.createRoot(document.getElementById("root") as HTMLElement).render(
    <React.StrictMode>
        <App />
    </React.StrictMode>
)
