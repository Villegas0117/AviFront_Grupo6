import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CreareditargaleriasComponent } from './creareditargalerias.component';

describe('CreareditargaleriasComponent', () => {
  let component: CreareditargaleriasComponent;
  let fixture: ComponentFixture<CreareditargaleriasComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CreareditargaleriasComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CreareditargaleriasComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
