import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { LandingRoutingModule } from './landing-routing.module';
import { LandingComponent } from './landing.component';
import { NavbarComponent } from './layouts/navbar/navbar.component';
import { HeroComponent } from './components/hero/hero.component';
import { IndexComponent } from './pages/index/index.component';
import { FeaturedComponent } from './components/featured/featured.component';
import { FooterComponent } from './layouts/footer/footer.component';




@NgModule({
  declarations: [
    LandingComponent,
    NavbarComponent,
    HeroComponent,
    IndexComponent,
    FeaturedComponent,
    FooterComponent,

  ],
  exports: [HeroComponent,NavbarComponent,LandingComponent,IndexComponent],
  imports: [
    CommonModule,
    LandingRoutingModule
  ]
})
export class LandingModule { }
