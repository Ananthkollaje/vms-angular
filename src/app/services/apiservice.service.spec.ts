import { TestBed } from '@angular/core/testing';
import { HttpClientModule } from '@angular/common/http';
import { APIServiceService } from './apiservice.service';

describe('APIServiceService', () => {
  let service: APIServiceService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [
        HttpClientModule
      ]
    });
    service = TestBed.inject(APIServiceService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
