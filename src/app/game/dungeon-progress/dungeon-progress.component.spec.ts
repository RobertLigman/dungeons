import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DungeonProgressComponent } from './dungeon-progress.component';

describe('DungeonProgressComponent', () => {
  let component: DungeonProgressComponent;
  let fixture: ComponentFixture<DungeonProgressComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [DungeonProgressComponent]
    });
    fixture = TestBed.createComponent(DungeonProgressComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
