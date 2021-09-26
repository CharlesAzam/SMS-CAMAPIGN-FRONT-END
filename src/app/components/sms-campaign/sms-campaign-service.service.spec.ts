import { TestBed } from '@angular/core/testing';

import { SmsCampaignService } from '../../services/sms-campaign.service';

describe('SmsCampaignService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: SmsCampaignService = TestBed.get(SmsCampaignService);
    expect(service).toBeTruthy();
  });
});
