export class QuitGameDTO {
    gameId: number 
    playerId: number
}

export class UpdateGameStateDTO {
    gameId: number 
    move: number
    playerId: number
}