import { TestBed } from '@angular/core/testing';

import { NotesServerService } from './notes-server.service';

describe('NotesServerService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: NotesServerService = TestBed.get(NotesServerService);
    expect(service).toBeTruthy();
  });
});
