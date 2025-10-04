import { TestBed } from '@angular/core/testing';
import { NotesServiceTs } from './notes.service.ts';

describe('NotesServiceTs', () => {
  let service: NotesServiceTs;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(NotesServiceTs);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});


