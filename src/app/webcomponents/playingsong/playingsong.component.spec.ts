import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PlayingsongComponent } from './playingsong.component';

describe('PlayingsongComponent', () => {
  let component: PlayingsongComponent;
  let fixture: ComponentFixture<PlayingsongComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PlayingsongComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PlayingsongComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });
});
