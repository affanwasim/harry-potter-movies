import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Movie } from './model/movie';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class MoviesService {
  moviesURL:string;
  constructor(private router:Router,private http:HttpClient) { 
    this.moviesURL = router.url;
  }

  getMovie(id:string):Observable<Movie> {
    return this.http.get<Movie>(this.moviesURL+'/'+id);
  }

  getMovies(): Observable<Movie[]> {
    return this.http.get<Movie[]>(this.moviesURL);
  }
}
