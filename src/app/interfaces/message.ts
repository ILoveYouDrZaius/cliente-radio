export interface Message {
    $key?: string,
    timestamp: number,
    user: string,
    message: string
}