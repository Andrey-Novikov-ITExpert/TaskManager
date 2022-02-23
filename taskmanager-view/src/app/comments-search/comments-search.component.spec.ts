import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CommentsSearchComponent } from './comments-search.component';

describe('CommentsSearchComponent', () => {
  let component: CommentsSearchComponent;
  let fixture: ComponentFixture<CommentsSearchComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CommentsSearchComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(CommentsSearchComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
