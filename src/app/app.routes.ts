import { Routes } from '@angular/router';
import { NewUserScreen } from './user-module/new-user-screen/new-user-screen';
import { LoginScreen } from './user-module/login-screen/login-screen';
import { NotesScreen } from './notes-screen/notes-screen';

export const routes: Routes = [
 {
    path: "new-user",
    loadComponent: ()=> NewUserScreen
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
