import { ComponentFixture, TestBed } from '@angular/core/testing';

import { LinksCampaignsComponent } from './links-campaigns.component';

describe('LinksCampaignsComponent', () => {
  let component: LinksCampaignsComponent;
  let fixture: ComponentFixture<LinksCampaignsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ LinksCampaignsComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(LinksCampaignsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
