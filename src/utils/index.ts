import { oneList, twoList } from "../constant"

export interface Card {
    value: number
    suit: number
}

export interface CardLook {
    text: string
    color: string
    icon: string
}

export function getCardText(card: Card) {
    switch (card.value) {
        case 14:
            return "A"
        case 11:
            return "J"
        case 12:
            return "Q"
        case 13:
            return "K"
        case 99:
            return "Joker"
        case 100:
            return "Joker"
        default:
            return String(card.value)
    }
}

export function getCardColor(card: Card) {
    if (card.suit === 0 || card.suit === 1 || card.suit === 3) return "black"
    return "red"
}

export function getCardIcon(card: Card) {
    switch (card.suit) {
        case 1:
            return "♠"
        case 2:
            return "♥"
        case 3:
            return "♣"
        case 4:
            return "♦"
        default:
            return ""
    }
}

export function getCardLook(card: Card): CardLook {
    return {
        text: getCardText(card),
        color: getCardColor(card),
        icon: getCardIcon(card)
    }
}

export function distributeCards() {
    const indexList = twoList.map((_, index) => index)
    indexList.sort(() => Math.random() - 0.5)
    return [indexList.slice(0, 26), indexList.slice(26, 52), indexList.slice(52, 78), indexList.slice(78, 104)]
}

export interface CardType {
    type: string
    isBoom: boolean
    valueList: number[]
}

export function isFocus(card: Card) {
    return card.value === 2
}

export function isPower(card: Card) {
    return isFocus(card) && card.suit === 2
}

export function getCompareValue(card: Card) {
    return isFocus(card) ? 15 : card.value
}

export function getBoomType(cardList: Card[]): CardType | null {
    const { length } = cardList

    switch (length) {
        case 4:
            if (cardList.filter(card => card.value === 99).length === 2 && cardList.filter(card => card.value === 100).length === 2) {
                return {
                    type: "四大天王",
                    isBoom: true,
                    valueList: [6]
                }
            }
            if (cardList.every(card => card.value === cardList[0].value)) {
                return {
                    type: "四个头",
                    isBoom: true,
                    valueList: [1, getCompareValue(cardList[0])]
                }
            }
            return null

        case 5:
            if (cardList.every(card => card.value === cardList[0].value)) {
                return {
                    type: "五个头",
                    isBoom: true,
                    valueList: [2, getCompareValue(cardList[0])]
                }
            }
            const valueList = cardList.map(card => card.value)
            valueList.sort((a, b) => a - b)
            if (cardList.every(card => card.suit === cardList[0].suit)) {
                if (valueList.every((value, index) => value - valueList[0] === index)) {
                    return {
                        type: "同花顺",
                        isBoom: true,
                        valueList: [3, valueList[0]]
                    }
                }
                const minList = [2, 3, 4, 5, 14]
                if (valueList.every((value, index) => value === minList[index])) {
                    return {
                        type: "同花顺",
                        isBoom: true,
                        valueList: [3, 1]
                    }
                }
            }
            return null

        case 6:
            if (cardList.every(card => card.value === cardList[0].value)) {
                return {
                    type: "六个头",
                    isBoom: true,
                    valueList: [4, getCompareValue(cardList[0])]
                }
            }
            return null

        case 7:
            if (cardList.every(card => card.value === cardList[0].value)) {
                return {
                    type: "七个头",
                    isBoom: true,
                    valueList: [5, getCompareValue(cardList[0])]
                }
            }
            return null

        case 8:
            if (cardList.every(card => card.value === cardList[0].value)) {
                return {
                    type: "八个头",
                    isBoom: true,
                    valueList: [7, getCompareValue(cardList[0])]
                }
            }
            return null

        case 9:
            if (cardList.every(card => card.value === cardList[0].value)) {
                return {
                    type: "九个头",
                    isBoom: true,
                    valueList: [8, getCompareValue(cardList[0])]
                }
            }
            return null

        case 10:
            if (cardList.every(card => card.value === cardList[0].value)) {
                return {
                    type: "十个头",
                    isBoom: true,
                    valueList: [9, getCompareValue(cardList[0])]
                }
            }
            return null

        default:
            return null
    }
}

export function getCardType(cardList: Card[]): CardType | null {
    const type = getBoomType(cardList)
    if (type) return type
    const { length } = cardList

    const valueList = cardList.map(card => card.value)
    valueList.sort((a, b) => a - b)

    switch (length) {
        case 1:
            return {
                type: "单牌",
                isBoom: false,
                valueList: [getCompareValue(cardList[0])]
            }

        case 2:
            if (cardList.every(card => card.value === cardList[0].value)) {
                return {
                    type: "对子",
                    isBoom: false,
                    valueList: [getCompareValue(cardList[0])]
                }
            }
            return null

        case 3:
            if (cardList.every(card => card.value === cardList[0].value)) {
                return {
                    type: "三不带",
                    isBoom: false,
                    valueList: [getCompareValue(cardList[0])]
                }
            }
            return null

        case 5:
            if (valueList.every((value, index) => value - valueList[0] === index)) {
                return {
                    type: "顺子",
                    isBoom: false,
                    valueList: [valueList[0]]
                }
            }

            const minList = [2, 3, 4, 5, 14]

            if (valueList.every((value, index) => value - minList[index] === 0)) {
                return {
                    type: "顺子",
                    isBoom: false,
                    valueList: [1]
                }
            }

            if (valueList[0] === valueList[1] && valueList[3] === valueList[4]) {
                if (valueList[2] === valueList[1]) {
                    return {
                        type: "三带二",
                        isBoom: false,
                        valueList: [getCompareValue(cardList[2]), getCompareValue(cardList[3])]
                    }
                }
                if (valueList[2] === valueList[3]) {
                    return {
                        type: "三带二",
                        isBoom: false,
                        valueList: [getCompareValue(cardList[2]), getCompareValue(cardList[1])]
                    }
                }
            }

            return null

        case 6:
            if (valueList[0] === valueList[1] && valueList[1] === valueList[2] && valueList[3] === valueList[4] && valueList[4] === valueList[5]) {
                return {
                    type: "飞机",
                    isBoom: false,
                    valueList: [valueList[0]]
                }
            }

            if (valueList[0] === valueList[1] && valueList[2] === valueList[3] && valueList[4] === valueList[5]) {
                if (valueList[2] - valueList[0] === 1 && valueList[4] - valueList[2] === 1) {
                    return {
                        type: "三连对",
                        isBoom: false,
                        valueList: [valueList[0]]
                    }
                }

                if (valueList[0] === 2 && valueList[2] === 3 && valueList[4] === 14) {
                    return {
                        type: "三连对",
                        isBoom: false,
                        valueList: [1]
                    }
                }
            }

            return null

        default:
            return null
    }
}
