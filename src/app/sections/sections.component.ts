import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {Observable} from 'rxjs';
import {HttpClient, HttpParams} from '@angular/common/http';
import {Section} from '../model/Section';
import {LoginService} from '../services/login.service';

@Component({
  selector: 'app-sections',
  templateUrl: './sections.component.html',
  styleUrls: ['./sections.component.css']
})
export class SectionsComponent implements OnInit {
  private sectionsUrl = 'http://localhost:8080/api/sections';
  private sectionsReplaceUrl = 'http://localhost:8080/api/sections/replace';

  activeSection: string;
  sections: Section[] = [];

  @Input()
  set section(section: string) {
    if (section && section.length > 0) {
      this.activeSection = section;
    }
  }

  @Output() sectionChanged: EventEmitter<string> = new EventEmitter<string>();

  constructor(private http: HttpClient, private loginService: LoginService) {
    this.readSections();
    this.loginService.userLogin$.subscribe(user => {
      console.log(user);
      sessionStorage.setItem('user', user.username);
      this.readSections();
    });
  }

  ngOnInit() {
  }

  readSections() {
    this.getSections().subscribe(sections => {
      this.sections = sections;
      if (this.activeSection == null && this.sections.length > 0) {
        this.showSection(this.sections[0]);
      }
    });
  }

  getSections(): Observable<Section[]> {
    return this.http.get<Section[]>(this.sectionsUrl);
  }

  showSection(section: Section) {
    this.sectionChanged.emit(section.title);
  }

  addSection(sectionInput: HTMLInputElement) {
    const title = sectionInput.value;
    if (!title) {
      return;
    }
    if (this.sections.find(s => s.title === title)) {
      return;
    }
    const section = {title: title};
    this.sections.unshift(section);
    this.showSection(section);
    this.writeSections().subscribe(() => sectionInput.value = '');
  }

  writeSections(): Observable<Section[]> {
    return this.http.post<Section[]>(this.sectionsReplaceUrl, this.sections);
  }
}
