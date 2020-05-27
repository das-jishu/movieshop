import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { BootNavbarComponent } from './boot-navbar.component';

describe('BootNavbarComponent', () => {
  let component: BootNavbarComponent;
  let fixture: ComponentFixture<BootNavbarComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ BootNavbarComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(BootNavbarComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
