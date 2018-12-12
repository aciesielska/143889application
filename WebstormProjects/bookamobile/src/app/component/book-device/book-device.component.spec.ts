import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { BookDeviceComponent } from './book-device.component';

describe('BookDeviceComponent', () => {
  let component: BookDeviceComponent;
  let fixture: ComponentFixture<BookDeviceComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ BookDeviceComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(BookDeviceComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
