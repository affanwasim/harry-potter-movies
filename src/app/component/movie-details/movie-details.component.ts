import { Component, WritableSignal, signal } from '@angular/core';
import { handleRequest } from 'msw';
import { routes } from '../../app.routes';
import { ActivatedRoute, Router } from '@angular/router';
import { MoviesService } from '../../movies.service';
import { Observable, combineLatest, map, startWith } from 'rxjs';
import { Movie } from '../../model/movie';
import { CommonModule } from '@angular/common';
import { FormControl, FormsModule, ReactiveFormsModule} from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import {MatToolbarModule} from '@angular/material/toolbar';
import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIcon, MatIconModule } from '@angular/material/icon';

@Component({
  selector: 'app-movie-details',
  standalone: true,
  imports: [CommonModule,FormsModule,ReactiveFormsModule,MatButtonModule,MatToolbarModule,MatInputModule,MatFormFieldModule,MatIcon,MatIconModule],
  templateUrl: './movie-details.component.html',
  styleUrl: './movie-details.component.css'
})
export class MovieDetailsComponent {
  movie$:Observable<Movie|null>;
  id:string;
  constructor(private router:Router,private service:MoviesService,private route:ActivatedRoute) {
    this.id = this.route.snapshot.params['id'];
    console.log('id is : '+ this.id)
    this.movie$ = service.getMovie(this.id);
  }
  backToMovies(): void {
    const homePageURL:string = this.route.snapshot.url[0].path.toString();
    console.log(homePageURL);
    this.router.navigate([homePageURL]);
  }
}
