import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { firstValueFrom, Observable } from 'rxjs';


@Injectable({
  providedIn: 'root'
})

export class NotesServiceTs {
  private apiUrl = 'https://senai-gpt-api.azurewebsites.net/senainotes/notesg2';  // URL da sua API

  constructor(private http: HttpClient) {}

  // Método GET para buscar as notas
  getNotes(): Observable<any[]> {
    return this.http.get<any[]>(this.apiUrl, {
      headers: {
        "Content-Type" : "application/json",
        "Authorization" : "Bearer " + localStorage.getItem("meuToken")
      }
    });
  }

  // Método PUT para salvar a nota após edição
  saveNote(note: any): Observable<any> {
    return this.http.put<any>(`${this.apiUrl}/${note.id}`, note, {
      headers: {
        "Content-Type" : "application/json",
        "Authorization" : "Bearer " + localStorage.getItem("meuToken")
      }
    });
  }

  // Método POST para criar uma nova nota
  createNote(note: any): Observable<any> {
    return this.http.post<any>(this.apiUrl, note, {
      headers: {
        "Content-Type" : "application/json",
        "Authorization" : "Bearer " + localStorage.getItem("meuToken")
      }
    });

}

  async deleteNote(id: number): Promise<any> {

    let response = null;

    try {
      
      response = await firstValueFrom(this.http.delete(`https://senai-gpt-api.azurewebsites.net/senainotes/notesg2/`+ id, {
        headers: {
          "Content-Type" : "application/json",
          "Authorization" : "Bearer " + localStorage.getItem("meuToken")
        }
      }));

    } catch (error) {
      
      console.log("Deu erro no delete. Try catch funcionando.");

    }

    return response;

  }
}
