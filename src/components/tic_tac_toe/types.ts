enum BoxState {
    Empty,
    O,
    X,
}

type GameState = BoxState[];

type Winner = {
    box: BoxState;
    a: number | null;
    b: number | null;
    c: number | null;
} | null;

export { BoxState, type GameState, type Winner };
