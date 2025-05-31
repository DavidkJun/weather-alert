import { Test, TestingModule } from '@nestjs/testing';
import { SchedulerService } from './scheduler.service';
import { UsersService } from '../users/users.service';
import { WeatherService } from '../weather/weather.service';
import { MailerService } from '../mailer/mailer.service';

describe('SchedulerService', () => {
  let service: SchedulerService;
  let usersService: UsersService;
  let weatherService: WeatherService;
  let mailerService: MailerService;

  const mockUsersService = {
    findAll: jest.fn(),
  };

  const mockWeatherService = {
    getForecast: jest.fn(),
  };

  const mockMailerService = {
    sendEmail: jest.fn(),
  };

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        SchedulerService,
        { provide: UsersService, useValue: mockUsersService },
        { provide: WeatherService, useValue: mockWeatherService },
        { provide: MailerService, useValue: mockMailerService },
      ],
    }).compile();

    service = module.get<SchedulerService>(SchedulerService);
    usersService = module.get<UsersService>(UsersService);
    weatherService = module.get<WeatherService>(WeatherService);
    mailerService = module.get<MailerService>(MailerService);
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  it('should send emails to users with matching weather conditions', async () => {
    mockUsersService.findAll.mockResolvedValue([
      { email: 'test1@example.com', city: 'Kyiv', conditions: ['Rain'] },
      { email: 'test2@example.com', city: 'Lviv', conditions: ['Clear'] },
    ]);

    mockWeatherService.getForecast
      .mockResolvedValueOnce({
        weather: [{ main: 'Rain', description: 'light rain' }],
        main: { temp: 14 },
      })
      .mockResolvedValueOnce({
        weather: [{ main: 'Clouds', description: 'overcast clouds' }],
        main: { temp: 11 },
      });

    await service.handleCron();

    expect(usersService.findAll).toHaveBeenCalled();
    expect(weatherService.getForecast).toHaveBeenCalledTimes(2);

    expect(mailerService.sendEmail).toHaveBeenCalledTimes(1);
    expect(mailerService.sendEmail).toHaveBeenCalledWith(
      'test1@example.com',
      'Weather Alert',
      expect.stringContaining('Kyiv: light rain')
    );
  });

  it('should not send email if conditions do not match', async () => {
    mockUsersService.findAll.mockResolvedValue([
      { email: 'test@example.com', city: 'Odesa', conditions: ['Clear'] },
    ]);

    mockWeatherService.getForecast.mockResolvedValue({
      weather: [{ main: 'Rain', description: 'moderate rain' }],
      main: { temp: 10 },
    });

    await service.handleCron();

    expect(mailerService.sendEmail).not.toHaveBeenCalled();
  });
});

