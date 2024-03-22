import { Routes } from '@angular/router';
import { MoviesComponent } from './component/movies/movies.component';
import { MovieDetailsComponent } from './component/movie-details/movie-details.component';

export const routes: Routes = [
    {path: '', redirectTo:'movies', pathMatch:'full'},
    {path: 'movies', component : MoviesComponent},
    {path: 'movies/:id', component : MovieDetailsComponent},
];


