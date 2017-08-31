import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { FavouritesmodalComponent } from './favouritesmodal.component';

describe('FavouritesmodalComponent', () => {
  let component: FavouritesmodalComponent;
  let fixture: ComponentFixture<FavouritesmodalComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ FavouritesmodalComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(FavouritesmodalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });
});
