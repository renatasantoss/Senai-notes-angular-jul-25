import { Routes } from '@angular/router';
import { NewUserScreen } from './user-module/new-user-screen/new-user-screen';

export const routes: Routes = [
 {
    path: "new-user",
    loadComponent: ()=> NewUserScreen
 }
];
