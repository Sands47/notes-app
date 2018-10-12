import {Component, Input, OnChanges} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Note} from '../model/Note';
import {NotesServerService} from '../services/notes-server.service';

@Component({
  selector: 'app-notes',
  templateUrl: './notes.component.html',
  styleUrls: ['./notes.component.css']
})
export class NotesComponent implements OnChanges {
  notes: Note[] = [];
  text: string;
  @Input() section: string;

  constructor(private http: HttpClient, private notesService: NotesServerService) {
  }

  ngOnChanges() {
    this.notesService.getNotes(this.section).subscribe(data => this.notes = data);
  }

  add() {
    const note = {text: this.text, section: this.section};
    this.notes.push(note);
    this.notesService.addNote(note).subscribe();
    this.text = '';
  }

  remove(i: number) {
    this.notes.splice(i, 1);
  }

  moveToTop(i: number) {
    [this.notes[0], this.notes[i]] = [this.notes[i], this.notes[0]];
  }
}
