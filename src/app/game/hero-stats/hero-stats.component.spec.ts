import { ComponentFixture, TestBed } from '@angular/core/testing';

import { HeroStatsComponent } from './hero-stats.component';

describe('HeroStatsComponent', () => {
  let component: HeroStatsComponent;
  let fixture: ComponentFixture<HeroStatsComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [HeroStatsComponent]
    });
    fixture = TestBed.createComponent(HeroStatsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
