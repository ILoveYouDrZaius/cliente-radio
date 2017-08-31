export interface Song {
    $key?: string;
    genre?: string;
    artist: string;
    album: string;
    title: string;
    votes?: number;
}