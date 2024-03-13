export interface Movie {
    id: string, // e.g. "e80d5a37-620e-4be2-92b9-fb1f5262494f"
    title: string,
    duration: number,
    budget: number,
    release_date: string,
    box_office: number,
    cinematographers: string[],
    poster: string,
    producers: string[],
    summary: string,  
}
