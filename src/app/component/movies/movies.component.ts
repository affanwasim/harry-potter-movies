import { AfterContentInit, Component, OnInit, WritableSignal, signal } from '@angular/core';
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
  selector: 'app-movies',
  standalone: true,
  imports: [CommonModule,FormsModule,ReactiveFormsModule,MatButtonModule,MatToolbarModule,MatInputModule,MatFormFieldModule,MatIcon,MatIconModule],
  templateUrl: './movies.component.html',
  styleUrl: './movies.component.css'
})
export class MoviesComponent {
  id:WritableSignal<string>=signal('');
  movies$: Observable<Movie[]>;
  filteredMovies$: Observable<Movie[]>;
  finalMovies$: Observable<Movie[]>;
  filter: FormControl;
  filter$: Observable<string>;
  year: FormControl;
  year$: Observable<number|undefined>;
  constructor(private router:Router, private service:MoviesService) {
    this.movies$ = service.getMovies();
    this.filter = new FormControl('');
    this.filter$ = this.filter.valueChanges.pipe(startWith(''));
    this.year = new FormControl();
    this.year$ = this.year.valueChanges.pipe(startWith(undefined));
    this.filteredMovies$ = combineLatest(this.movies$, this.filter$).pipe(
      map(([movies, filterString]) => movies.filter(movie => movie.title.toLowerCase().indexOf(filterString.toLowerCase()) !== -1))
      
      );
    this.finalMovies$ = combineLatest(this.filteredMovies$, this.year$).pipe(
      map(([movies, yearFilter]) => movies.filter(movie => {
        let releaseYear:number = Number.parseInt(movie.release_date.substring(0,movie.release_date.indexOf('-')));
        console.log('Release Year:' + releaseYear);
        console.log('Year Filter: '+ yearFilter);
        return (yearFilter == undefined || (releaseYear==yearFilter));
      }))
    );
  }

}
