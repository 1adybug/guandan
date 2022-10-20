import { makeAutoObservable } from "mobx"

class Store {
    width = 0
    height = 0
    selectList: number[] = []
    topCardCount = 20
    leftCardCount = 20
    rightCardCount = 20
    constructor() {
        makeAutoObservable(this)
    }
    changeSelectList(newList: number[]) {
        this.selectList = newList
    }
    changeSize(size: { width: number; height: number }) {
        this.width = size.width
        this.height = size.height
    }
    changeTopCardCount(count: number) {
        this.topCardCount = count
    }
    changeLeftCardCount(count: number) {
        this.leftCardCount = count
    }
    changeRightCardCount(count: number) {
        this.rightCardCount = count
    }
}

const store = new Store()

export default store
