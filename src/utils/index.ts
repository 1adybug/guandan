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
        case 1:
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
