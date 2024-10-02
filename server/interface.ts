export interface MovieSearch {
    adult: boolean,
    backdrop_path: string,
    genre_ids: number[],
    id: number,
    original_language: string,
    original_title: string,
    overview: string,
    popularity: number,
    poster_path: string,
    release_data: string,
    title: string,
    video: boolean,
    vote_average: number,
    vote_count: number
}

export interface Movie {
    adult: boolean,
    backdrop_path: string,
    belongs_to_collection: SmallCollection | null,
    budget: number,
    genres: Genre[],
    homepage: string,
    id: number,
    imdb_id: string,
    original_language: string,
    original_title: string,
    overview: string,
    popularity: number,
    poster_path: string,
    production_companies: ProductionCompanie[],
    production_countries: ProductionCountrie[],
    release_date: string,
    revenue: string,
    runtime: string,
    spoken_languages: SpokenLanguage[],
    status: string,
    tagline: string,
    title: string,
    video: boolean,
    vote_average: number,
    vote_count: number
}

export interface SmallCollection {
    id: number,
    name: string,
    poster_path: string,
    backdrop_path: string
}

export interface Collection {
    id: number,
    name: string,
    overview: string,
    poster_path: string,
    backdrop_path: string,
    parts: CollectionMovie[]
}

export interface CollectionMovie {
    adult: boolean,
    backdrop_path: string,
    genre_ids: number[],
    id: number,
    original_language: string,
    original_title: string,
    overview: string,
    popularity: number,
    poster_path: string,
    release_date: string,
    title: string,
    video: boolean,
    vote_average: number,
    vote_count: number
}

export interface Genre {
    id: number,
    name: string
}

export interface ProductionCompanie {
    id: number,
    logo_path: string,
    name: string,
    origin_country: string
}

export interface ProductionCountrie {
    iso_3166_1: string,
    name: string
}

export interface SpokenLanguage {
    english_name: string,
    iso_639_1: string,
    name: string
}

export interface ResponseMsg {
    success: false | true;
    msg: string;
    data?: any;
    linkList?: any[];
}

export interface Recommendation {
    poster_path: string,
    adult: boolean,
    overview: string,
    release_date: string,
    genre_ids: Genre[],
    id: number,
    original_title: string,
    original_language: string,
    title: string,
    backdrop_path: string,
    popularity: number,
    vote_count: number,
    video: boolean,
    vote_average: number
}

export interface ReleaseDateResult {
    iso_3166_1: string,
    release_dates: ReleaseDate[]
}

export interface ReleaseDate {
    certification: string,
    iso_639_1: string,
    release_date: string,
    type: number,
    note: string
}

