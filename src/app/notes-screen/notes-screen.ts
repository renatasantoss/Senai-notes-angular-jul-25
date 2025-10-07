import { ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, FormsModule, ReactiveFormsModule } from '@angular/forms';
import { CommonModule, NgForOf } from '@angular/common';
import { NotesServiceTs } from '../notes.service.ts.js';

interface Note {
  id: number;
  title: string;
  content: string;
  tags: string[];
  date: string;
  newNote: string;
}

@Component({

  selector: 'app-notes-screen',
  templateUrl: './notes-screen.html',
  styleUrl: './notes-screen.css',
  imports: [ReactiveFormsModule, CommonModule, FormsModule],
})

export class NotesScreen implements OnInit {
  notes: any[] = [];
  selectedNote: any = null;
  tagSelecionada: string = ''
  tituloNota = new FormControl("");
  descricaoNota = new FormControl("");

  constructor(private notesService: NotesServiceTs, private cd: ChangeDetectorRef) { }

  ngOnInit(): void {
    this.getNotes();
  }


  // Método para buscar as notas
  getNotes(): void {
    this.notesService.getNotes().subscribe((data: any[]) => {
      this.notes = data;
      this.cd.detectChanges();
      console.log(this.notes);
    });
  }

  // Método para salvar uma nota
  onNoteSave(): void {
    if (this.selectedNote) {

      this.selectedNote.tags= [this.tagSelecionada]
      this.selectedNote.titulo= this.tituloNota.value
      this.selectedNote.descricao = this.descricaoNota.value
      this.notesService.saveNote(this.selectedNote).subscribe(() => {
        this.getNotes();  // Atualiza a lista de notas
      });
    }
  }

  // Método para selecionar uma nota
  onNoteClick(note: any): void {
    this.selectedNote = note;
    this.tituloNota.setValue(this.selectedNote.titulo);
    this.descricaoNota.setValue(this.selectedNote.descricao);

    if (this.selectedNote.tags != null && this.selectedNote.tags.length > 0){

      this.tagSelecionada= this.selectedNote.tags[0]; 

    } else{

      this.tagSelecionada= "";

    }
  }

  // Método para criar uma nova nota
  onNoteCreate(): void {
    const newNote = {
      titulo: 'Novo Titulo',
      descricao: 'Descrição da nova nota',
      imagemUrl: 'link da imagem',
      usuarioId: 1,
      tags: ['Tag 1'],
      dataCriacao: new Date().toISOString(),
      dataAtualizacao: new Date().toISOString(),
    };

    this.notesService.createNote(newNote).subscribe(() => {
      this.getNotes();  // Atualiza a lista de notas
    });

  }


  // Método para excluir uma nota
  onNoteDelete(): void {
    if (this.selectedNote) {
      alert('Selecione uma nota para excluir.');
      return;
    }

    const confirmDelete = confirm(`Tem certeza que deseja excluir a nota "${this.selectedNote.titulo}"?`);
    if (confirmDelete) {
      this.notesService.deleteNote(this.selectedNote.id).subscribe(() => {
        this.selectedNote = null;   // Limpa a seleção
        this.getNotes();            // Atualiza a lista
      });
    }
  }
}