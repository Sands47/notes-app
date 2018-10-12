import {Component, OnInit} from '@angular/core';
import {ActivatedRoute} from '@angular/router';
import {NotesServerService} from '../services/notes-server.service';
import {Note} from '../model/Note';
import {Observable} from 'rxjs';

@Component({
  selector: 'app-view-section',
  templateUrl: './view-section.component.html',
  styleUrls: ['./view-section.component.css']
})
export class ViewSectionComponent implements OnInit {
  section: string;
  notes$: Observable<Note[]>;

  constructor(private route: ActivatedRoute, private notesService: NotesServerService) {
  }

  ngOnInit() {
    this.section = this.route.snapshot.params['name'];
    this.notes$ = this.getNotes();
  }

  getNotes(): Observable<Note[]> {
    return this.notesService.getNotes(this.section);
  }
}
