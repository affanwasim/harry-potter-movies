import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Movie } from './model/movie';

@Injectable({
  providedIn: 'root'
})
export class MoviesService {
  moviesURL:string = 'http://localhost:4200/movies'
  constructor(private http:HttpClient) { }

  getMovie(id:string):Observable<Movie> {
    return this.http.get<Movie>(this.moviesURL+'/'+id);
  }

  getMovies(): Observable<Movie[]> {
    return this.http.get<Movie[]>(this.moviesURL);
  }
}
