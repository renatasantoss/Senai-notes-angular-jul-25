import { ComponentFixture, TestBed } from '@angular/core/testing';

import { NotesScreen } from './notes-screen';

describe('NotesScreen', () => {
  let component: NotesScreen;
  let fixture: ComponentFixture<NotesScreen>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [NotesScreen]
    })
    .compileComponents();

    fixture = TestBed.createComponent(NotesScreen);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
