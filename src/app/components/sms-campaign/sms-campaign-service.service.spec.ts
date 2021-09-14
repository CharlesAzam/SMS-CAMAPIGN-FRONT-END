import { TestBed } from '@angular/core/testing';

import { SmsCampaignServiceService } from './sms-campaign-service.service';

describe('SmsCampaignServiceService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: SmsCampaignServiceService = TestBed.get(SmsCampaignServiceService);
    expect(service).toBeTruthy();
  });
});
