import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { CommonModule, NgForOf } from '@angular/common';

interface Note {
  id: number;
  title: string;
  content: string;
  tags: string[];
  date: string;
}

// @Component({

//   selector: 'app-notes-screen',
//   templateUrl: './notes-screen.html',
//   styleUrl: './notes-screen.css'

// });

// export class NotesScreen implements OnInit {
//   notes: Note[] = []; // Array de notas
//   selectedNote: Note | null = null; // Nota selecionada
//   form: FormGroup; // Formulário

//   constructor(private fb: FormBuilder) {
//     // Iniciando o formulário no construtor
//     this.form = this.fb.group({
//       title: [''],
//       content: [''],
//       tags: ['']
//     });
//   }};

//   ngOnInit(); void {
//     // Inicializando as notas
//     this.notes = [
//       { 
//         id: 1,  // Adicionando um ID único para cada nota
//         title: 'Exemplo', 
//         content: 'Teste', 
//         tags: ['demo'], 
//         date: new Date().toLocaleDateString() 
//       }
//     ],

//   // Selecionando a primeira nota
//     this.selectNote(this.notes[0]);
//   }

//   // Método para selecionar a nota
//   selectNote(note: Note): void {
//     this.selectedNote = note;
//     this.form.patchValue({
//       title: note.title,
//       content: note.content,
//       tags: note.tags.join(', ')
//     });
//   }

//   // Método para criar uma nova nota
//   createNew(): void {
//     const newNote: Note = {
//       id: Date.now(),  // Gerando um ID único para a nova nota
//       title: '',
//       content: '',
//       tags: [],
//       date: new Date().toLocaleDateString()
//     };
//     this.notes = [newNote, ...this.notes]; // Adiciona a nova nota ao topo
//     this.selectNote(newNote); // Seleciona a nova nota para edição
//   }

//   // Método para salvar uma nota
//   save(): void {
//     if (!this.selectedNote) return; // Verifica se uma nota foi selecionada
//     const val = this.form.value;

//     // Atualiza os dados da nota com os valores do formulário
//     this.selectedNote.title = val.title || '';
//     this.selectedNote.content = val.content || '';
//     this.selectedNote.tags = val.tags ? val.tags.split(',').map((t: string) => t.trim()) : [];
//     this.selectedNote.date = new Date().toLocaleDateString(); // Atualiza a data
//   }

//   // Método para cancelar a edição
//   cancel(): void {
//     if (this.selectedNote) {
//       // Restaura o formulário para os valores da nota selecionada
//       this.selectNote(this.selectedNote);
//     } else {
//       // Se nenhuma nota estiver selecionada, resetar o formulário
//       this.form.reset();
//     }
//   }

//   // Método para exibir as tags como uma string
//   tagsString(note: Note): string {
//     return note.tags.join(', '); // Converte a lista de tags em uma string separada por vírgulas
//   }