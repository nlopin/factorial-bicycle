import {PlacedOrder, PricedOrder, PriceDetails, SharedOrderFields} from "../types";

export function calculatePrice(order: PlacedOrder): PricedOrder {
    const individualPiecePrices = getPricesPerPiece(order)
    const extrasPerCombination = getExtrasCombinationPrice(order)
    const priceLines: PriceDetails["lines"] = [...individualPiecePrices, ...extrasPerCombination]

    return {
        ...order,
        price: {
            total: priceLines.reduce((total, [, currentPrice]) => total + currentPrice, 0),
            lines: priceLines
        }
    }
}

// todo polish the return type, must return only one key
function getPricesPerPiece (placedOrder: PlacedOrder): Array<[keyof SharedOrderFields, number]> {
    return [["frameFinish", 50], ["frameType",90]]
}

function getExtrasCombinationPrice(order: PlacedOrder): Array<[string, number]> {
    return [["SHINY+GLOSS", 50]]
}