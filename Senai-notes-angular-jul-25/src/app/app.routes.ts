import { Routes } from '@angular/router';
import { NewUserScreen } from './user-module/new-user-screen/new-user-screen';
import { LoginScreen } from './user-module/login-screen/login-screen';

export const routes: Routes = [
 {
    path: "new-user",
    loadComponent: ()=> NewUserScreen
 },
 {
    path: "login",
   loadComponent: () => LoginScreen

},


];
