import {Injectable} from '@angular/core';
import {HttpClient, HttpParams} from '@angular/common/http';
import {Observable} from 'rxjs';
import {Note} from '../model/Note';

@Injectable({
  providedIn: 'root'
})
export class NotesServerService {
  private notesUrl = 'http://localhost:8080/api/notes';

  constructor(private http: HttpClient) {
  }

  getNotes(section: string): Observable<Note[]> {
    const params: HttpParams = new HttpParams()
      .set('section', section);
    return this.http.get<Note[]>(this.notesUrl, {params: params});
  }

  addNote(note: Note): Observable<Note> {
    return this.http.post<Note>(this.notesUrl, note);
  }
}
