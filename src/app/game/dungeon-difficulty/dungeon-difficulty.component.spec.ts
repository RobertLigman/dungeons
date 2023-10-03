import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DungeonDifficultyComponent } from './dungeon-difficulty.component';

describe('DungeonDifficultyComponent', () => {
  let component: DungeonDifficultyComponent;
  let fixture: ComponentFixture<DungeonDifficultyComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [DungeonDifficultyComponent]
    });
    fixture = TestBed.createComponent(DungeonDifficultyComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
