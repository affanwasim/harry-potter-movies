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

  getMovie(url:string) {
    this.http.get(url).subscribe((res) => {
      console.log(res);
    })
  }

  getMovies(): Observable<Movie[]> {
    return this.http.get<Movie[]>(this.moviesURL);
  }
}
