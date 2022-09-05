import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MemberClassificationComponent } from './member-classification.component';

describe('MemberClassificationComponent', () => {
  let component: MemberClassificationComponent;
  let fixture: ComponentFixture<MemberClassificationComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ MemberClassificationComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(MemberClassificationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
