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
  arquivoImagem: File | null = null;  // mantém o arquivo selecionado
  urlImagem = '';                     // URL local para preview


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

      this.selectedNote.tags = [this.tagSelecionada]
      this.selectedNote.titulo = this.tituloNota.value
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

    if (this.selectedNote.tags != null && this.selectedNote.tags.length > 0) {

      this.tagSelecionada = this.selectedNote.tags[0];

    } else {

      this.tagSelecionada = "";

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
    if (!this.selectedNote) {
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

  // onImagemSelecionada(event: any) {
  //   const arquivo = event.target.files[0];
  //   if (arquivo) {
  //     const reader = new FileReader();
  //     reader.onload = () => {
  //       // Atualiza apenas a nota selecionada
  //       this.selectedNote.imagemUrl = reader.result as string;
  //       this.cd.detectChanges(); // atualiza a tela
  //     };
  //     reader.readAsDataURL(arquivo);
  //   }
  // }

  definirImagem(evento: Event): void {
    const input = evento.target as HTMLInputElement;
    if (!input.files || input.files.length === 0) {
      alert('Selecione uma imagem.');
      return;
    }

    const file = input.files[0]; // o primeiro arquivo da lista

    // Validações simples (opcional, mas recomendado)
    const tiposPermitidos = ['image/jpeg', 'image/png', 'image/webp'];
    const tamanhoMaxMB = 5;

    if (!tiposPermitidos.includes(file.type)) {
      alert('Tipo inválido. Use JPG, PNG ou WEBP.');
      return;
    }
    if (file.size > tamanhoMaxMB * 1024 * 1024) {
      alert(`Arquivo muito grande (máx. ${tamanhoMaxMB}MB).`);
      return;
    }

    // Libera a URL anterior (evita vazamento de memória)
    if (this.urlImagem) {
      URL.revokeObjectURL(this.urlImagem);
    }

    // Guarda o arquivo e gera a URL local para preview imediato
    this.arquivoImagem = file;
    this.urlImagem = URL.createObjectURL(file);
  }

}