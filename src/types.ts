export type User = {
    name: string,
    email: string,
    phone: string
}

type FrameType = "FULL_SUSPENSION"| "DIAMOND"| "STEP_THROUGH"

type FrameFinish = "MATTE" | "SHINY"

type Wheels = "ROAD" | "MOUNTAIN" | "FAT_BIKE"

type RimColor = "RED" | "BLACK" | "BLUE"

type Chain = "SINGLE_SPEED" | "8_SPEED"

export type SharedOrderFields = {
    frameType: FrameType,
    frameFinish: FrameFinish,
    wheels: Wheels
    chain: Chain,
    rimColor: RimColor
}

export type UnverifiedOrder = SharedOrderFields

export type VerifiedOrder = SharedOrderFields

export type PlacedOrder = SharedOrderFields & {
    userEmail: User["email"]
}

export type PricedOrder = PlacedOrder & {
    price: PriceDetails
}

export type PriceDetails = {
    total: number,
    lines: Array<[string, number]>
}

export type NewOrder = PricedOrder & {
    id: number,
    state: "new",
    createdAt: Date
}

export type Either<R, E> = R | E

type Valid = [true]

type Invalid = [false, string]

export type ValidationError = string

export type ValidationResult = Invalid | Valid
