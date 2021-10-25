
export interface IListTrack {
    id: number,
    name: string,
    duration: number,
    price: number,
    artist: string,
    slug: string
}
export interface ITrack {   
    pageIndex: number,
    pageSize: number,
    total: number,
    items: Array<IListTrack>
}
