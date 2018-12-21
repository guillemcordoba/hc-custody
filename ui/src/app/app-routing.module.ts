import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { HomeComponent } from './containers/home/home.component';
import { TraceablesComponent } from './trace/containers/traceables/traceables.component';

const routes: Routes = [
  {
    path: 'home',
    component: HomeComponent,
    children: [
      {
        path: ':type',
        component: TraceablesComponent
      }
    ]
  },
  {
    path: '',
    pathMatch: 'full',
    redirectTo: '/home/holding'
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {}
