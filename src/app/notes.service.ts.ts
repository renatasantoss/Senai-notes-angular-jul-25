import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';


@Injectable({
  providedIn: 'root'
})

export class NotesServiceTs {
  private apiUrl = 'http://api.senai-notes.work.gd:8080/api/notas';  // URL da sua API

  constructor(private http: HttpClient) {}

  // Método GET para buscar as notas
  getNotes(): Observable<any[]> {
    return this.http.get<any[]>(this.apiUrl);
  }

  // Método PUT para salvar a nota após edição
  saveNote(note: any): Observable<any> {
    return this.http.put<any>(`${this.apiUrl}/${note.id}`, note);
  }

  // Método POST para criar uma nova nota
  createNote(note: any): Observable<any> {
    return this.http.post<any>(this.apiUrl, note);

}

  deleteNote(id: number): Observable<any> {
  return this.http.delete('http://api.senai-notes.work.gd:8080/api/notas'+ id);
}
}
