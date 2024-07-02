type FrameType = "FULL_SUSPENSION"| "DIAMOND"| "STEP_THROUGH"

type FrameFinish = "MATTE" | "SHINY"

type Wheels = "ROAD" | "MOUNTAIN" | "FAT_BIKE"

type RimColor = "RED" | "BLACK" | "BLUE"

type Chain = "SINGLE_SPEED" | "8_SPEED"

type SharedOrderFields = {
    frameType: FrameType,
    frameFinish: FrameFinish,
    wheels: Wheels
    chain: Chain,
    rimColor: RimColor
}

type UnverifiedOrder = SharedOrderFields & {
    kind: "draft";
}

type PlacedOrder = SharedOrderFields & {
    kind: "new"
}

type Either<R, E> = R | E

type OrderError = string

type ValidationResult = Either<[true], [false, string]>
type ValidationFunction = (UnverifiedOrder) => ValidationResult

function placeOrder(order: UnverifiedOrder): Either<PlacedOrder, OrderError> {
    let error = null
    const validations: ValidationFunction[]  = [checkMountainWheelsCombination, checkFatBikeWheelsCombination, checkAvailability]

    const isVerified = validations.every(el => {
        const [isOk, err] = el(order)
        if (!isOk) error = err

        return isOk
    })

    return isVerified ? {...order, kind: "new"} : error
}

function checkMountainWheelsCombination (order:UnverifiedOrder): ValidationResult {
    if (order.wheels === "MOUNTAIN" && order.frameType !== "FULL_SUSPENSION") {
        return [false, "MOUNTAIN_WHEELS_MUST_HAVE_FULL_SUSPENSION"]
    }

    return [true]
}

function checkFatBikeWheelsCombination (order:UnverifiedOrder): ValidationResult {
    if (order.wheels === "FAT_BIKE" && order.rimColor === "RED") {
        return [false, "FAT_BIKE_RED_RIM_NOT_POSSIBLE"]
    }

    return [true]
}

function checkAvailability (order: UnverifiedOrder): ValidationResult {
    // @ts-ignore todo call DB
    const isAvailable = getCombinationAvailability(order)

    if (!isAvailable) {
        return [false, "COMBINATION_NOT_IN_STOCK"]
    }

    return [true]
}
