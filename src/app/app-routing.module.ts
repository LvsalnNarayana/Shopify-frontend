import { NgModule } from '@angular/core';
import { PreloadAllModules, RouterModule, Routes } from '@angular/router';
import { AuthGuard } from './services/auth.guard';

const routes: Routes = [
  { path: '', loadChildren: () => import('./pages/user/user.module').then(m => m.UserModule) },
  { path: 'admin', loadChildren: () => import('./pages/admin/admin.module').then(m => m.AdminModule) },
  { path: 'test', loadChildren: () => import('./test/test.module').then(m => m.TestModule) },
  { path: 'seller', loadChildren: () => import('./pages/seller/seller.module').then(m => m.SellerModule) },
];

@NgModule({
  imports: [RouterModule.forRoot(routes, {
    preloadingStrategy: PreloadAllModules
  })],
  exports: [RouterModule]
})
export class AppRoutingModule { }
