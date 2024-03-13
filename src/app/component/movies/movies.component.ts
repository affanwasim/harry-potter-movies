import { Component, OnInit } from '@angular/core';
import { handleRequest } from 'msw';
import { routes } from '../../app.routes';
import { ActivatedRoute, Router } from '@angular/router';
import { MoviesService } from '../../movies.service';
import { Observable } from 'rxjs';
import { Movie } from '../../model/movie';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-movies',
  standalone: true,
  imports: [CommonModule,FormsModule],
  templateUrl: './movies.component.html',
  styleUrl: './movies.component.css'
})
export class MoviesComponent implements OnInit {
  id:string='';
  movies: Movie[] = [];
  constructor(private router:Router, private service:MoviesService) {

  }
  ngOnInit(): void {
    this.id = ''+this.router.url.substring(this.router.url.lastIndexOf('/'),this.router.url.length+1);
    //this.id="e80d5a37-620e-4be2-92b9-fb1f5262494f";
    //this.service.getMovie('http://localhost:4200/movies/'+this.id);
    this.service.getMovies();
  }

  getMovies(): void {
    this.service.getMovies().subscribe((movies) => {
      this.movies = movies;
      console.log(movies);
    })
  }

}
