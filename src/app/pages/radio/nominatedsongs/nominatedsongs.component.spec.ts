import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { NominatedsongsComponent } from './nominatedsongs.component';

describe('NominatedsongsComponent', () => {
  let component: NominatedsongsComponent;
  let fixture: ComponentFixture<NominatedsongsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ NominatedsongsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(NominatedsongsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });
});
