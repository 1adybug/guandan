const cardList = Array(52)
    .fill(0)
    .map((_, index) => ({
        value: Math.floor(index / 4) + 1,
        suit: (index % 4) + 1
    }))