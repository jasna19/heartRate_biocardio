import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { TabsPage } from './tabs.page';

const routes: Routes = [
  {
    path: 'tabs',
    component: TabsPage,
    children: [
      {
        path: 'prijava',
        children: [
          {
            path: '',
            loadChildren: () => import('../prijava/prijava.module').then(m => m.PrijavaPageModule)
          }
        ]
      },
      {
        path: 'naprave',
        children: [
          {
            path: '',
            loadChildren: () => import('../naprave/tab1.module').then(m => m.Tab1PageModule)
          }
        ]
      },
      {
        path: 'srcniUtrip',
        children: [
          {
            path: '',
            loadChildren: () => import('../srcniUtrip/tab2.module').then(m => m.Tab2PageModule)
          }
        ]
      },
      {
        path: 'tab3',
        children: [
          {
            path: '',
            loadChildren: () => import('../tab3/tab3.module').then(m => m.Tab3PageModule)
          }
        ]
      },
      {
        path: '',
        redirectTo: '/tabs/prijava',
        pathMatch: 'full'
      }
    ]
  },
  {
    path: '',
    redirectTo: '/tabs/prijava',
    pathMatch: 'full'
  }
];

@NgModule({
  imports: [
    RouterModule.forChild(routes)
  ],
  exports: [RouterModule]
})
export class TabsPageRoutingModule {}
