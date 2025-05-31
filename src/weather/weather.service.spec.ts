import { Test, TestingModule } from '@nestjs/testing';
import { WeatherService } from './weather.service';
import axios from 'axios';
import { ConfigSetupService } from '../config/config.service';

jest.mock('axios');
const mockedAxios = axios as jest.Mocked<typeof axios>;

describe('WeatherService', () => {
  let service: WeatherService;
  let configService: ConfigSetupService;

  const mockConfigService = {
    get: jest.fn(),
  };

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        WeatherService,
        {
          provide: ConfigSetupService,
          useValue: mockConfigService,
        },
      ],
    }).compile();

    service = module.get<WeatherService>(WeatherService);
    configService = module.get<ConfigSetupService>(ConfigSetupService);
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  it('should fetch weather data for a city', async () => {
    const city = 'Kyiv';
    const apiKey = 'test-api-key';
    const mockResponse = {
      data: {
        weather: [{ main: 'Rain', description: 'light rain' }],
        main: { temp: 12.3 },
        name: city,
      },
    };

    mockConfigService.get.mockReturnValue(apiKey);
    mockedAxios.get.mockResolvedValue(mockResponse);

    const result = await service.getForecast(city);

    expect(mockConfigService.get).toHaveBeenCalledWith('OPENWEATHER_API_KEY');
    expect(mockedAxios.get).toHaveBeenCalledWith(
      `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=metric`
    );
    expect(result).toEqual(mockResponse.data);
  });
});
