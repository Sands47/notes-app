import {BrowserModule} from '@angular/platform-browser';
import {NgModule} from '@angular/core';

import {AppComponent} from './app.component';
import {NotesComponent} from './notes/notes.component';
import {FormsModule} from '@angular/forms';
import {HttpClientModule} from '@angular/common/http';
import {SectionsComponent} from './sections/sections.component';
import {SectionFilterPipe} from './util/SectionFilterPipe';
import {RouterModule, Routes} from '@angular/router';
import {NotesEditorComponent} from './notes-editor/notes-editor.component';
import {PageNotFoundComponent} from './page-not-found-component';
import {ViewSectionComponent} from './view-section/view-section.component';
import {NotesServerService} from './services/notes-server.service';
import {CanDeactivateNote} from './services/can-deactivate-note';
import {UserFormComponent} from './user-form/user-form.component';
import {EqualToValidator} from './util/EqualToValidator';
import {UserUniqueValidator} from './util/UserUniqueValidator';
import { LoginFormComponent } from './login-form/login-form.component';

const routes: Routes = [
  {path: '', component: NotesEditorComponent, canDeactivate: [CanDeactivateNote]},
  {path: 'viewSection/:name', component: ViewSectionComponent},
  {path: 'register', component: UserFormComponent},
  {path: ':name', component: NotesEditorComponent, canDeactivate: [CanDeactivateNote]},
  {path: '**', component: PageNotFoundComponent}
];

@NgModule({
  declarations: [
    AppComponent,
    NotesComponent,
    SectionsComponent,
    SectionFilterPipe,
    NotesEditorComponent,
    PageNotFoundComponent,
    ViewSectionComponent,
    UserFormComponent,
    EqualToValidator,
    UserUniqueValidator,
    LoginFormComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    HttpClientModule,
    RouterModule.forRoot(routes)
  ],
  providers: [NotesServerService, CanDeactivateNote],
  bootstrap: [AppComponent]
})
export class AppModule {
}
