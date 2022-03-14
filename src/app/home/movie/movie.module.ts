import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { MoviePageRoutingModule } from './movie-routing.module';

import { MoviePage } from './movie.page';
import { NgbRatingModule} from '@ng-bootstrap/ng-bootstrap'; 

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    MoviePageRoutingModule,
    NgbRatingModule,
  ],
  declarations: [MoviePage]
})
export class MoviePageModule {}
