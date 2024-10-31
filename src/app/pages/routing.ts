import { Routes } from '@angular/router';

export const pageRoutes: Routes = [
  { path: "", loadChildren: () => import("./home/home.module").then(m => m.HomeModule) },
  { path: "details/:name", loadChildren: () => import("./details/details.module").then(m => m.DetailsModule) },
];
