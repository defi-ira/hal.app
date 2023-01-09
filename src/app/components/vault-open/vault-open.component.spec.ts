import { ComponentFixture, TestBed } from '@angular/core/testing';

import { VaultOpenComponent } from './vault-open.component';

describe('VaultComponent', () => {
  let component: VaultOpenComponent;
  let fixture: ComponentFixture<VaultOpenComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ VaultOpenComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(VaultOpenComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
