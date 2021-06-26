import { NgModule } from '@angular/core';
import { PreloadAllModules, RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  { path: '', loadChildren: () => import('./tabs/tabs.module').then(m => m.TabsPageModule)},
  { path: 'prikaziUtrip/:deviceId', loadChildren: () => import('./srcniUtrip/tab2.module').then(m => m.Tab2PageModule)},
  { path: 'tretja/:seznamIntervalov', loadChildren: () => import('./tab3/tab3.module').then(m => m.Tab3PageModule)},
  { path: 'prijava', loadChildren: () => import('./prijava/prijava.module').then(m => m.PrijavaPageModule)},
  { path: 'naprave', loadChildren: () => import('./naprave/tab1.module').then(m => m.Tab1PageModule)},

];
@NgModule({
  imports: [
    RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules })
  ],
  exports: [RouterModule]
})
export class AppRoutingModule {}
