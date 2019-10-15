import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { HousedetailComponent } from './housedetail.component';

describe('HousedetailComponent', () => {
  let component: HousedetailComponent;
  let fixture: ComponentFixture<HousedetailComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ HousedetailComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(HousedetailComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
