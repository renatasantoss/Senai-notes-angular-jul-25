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

@Component({

  selector: 'app-notes-screen',
  templateUrl: './notes-screen.html',
  styleUrl: './notes-screen.css', 
  imports: [ReactiveFormsModule],
})

export class NotesScreen {



  
}