import { Routes } from '@angular/router';
import { LoginScreen } from './user-module/login-screen/login-screen';
import { NotesScreen } from './notes-screen/notes-screen';
import { NewUserScreen } from './user-module/new-user-screen/new-user-screen';

export const routes: Routes = [
 {
    path: "new-user",
    loadComponent: () => NewUserScreen
 },
 {
    path: "login",
   loadComponent: () => LoginScreen

},

 {
    path: "notes-screen",
   loadComponent: () => NotesScreen

},

 {

   path: "",
   loadComponent: () => LoginScreen

},

];
