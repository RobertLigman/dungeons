import { ComponentFixture, TestBed } from '@angular/core/testing';

import { HeroRestingComponent } from './hero-resting.component';

describe('HeroRestingComponent', () => {
  let component: HeroRestingComponent;
  let fixture: ComponentFixture<HeroRestingComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [HeroRestingComponent]
    });
    fixture = TestBed.createComponent(HeroRestingComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
