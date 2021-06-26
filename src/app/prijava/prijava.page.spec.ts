import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PrijavaPage } from './prijava.page';

describe('PrijavaPage', () => {
  let component: PrijavaPage;
  let fixture: ComponentFixture<PrijavaPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PrijavaPage ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PrijavaPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
