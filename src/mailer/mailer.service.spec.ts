import { Test, TestingModule } from '@nestjs/testing';
import { MailerService } from './mailer.service';
import * as nodemailer from 'nodemailer';
import {ConfigSetupService} from "../config/config.service";

describe('MailerService', () => {
  let service: MailerService;
  const sendMailMock = jest.fn();

  const createTransportMock = jest.fn().mockReturnValue({
    sendMail: sendMailMock,
  });

  const mockConfigService = {
    get: jest.fn((key: string) => {
      const config = {
        SMTP_USER: 'test@example.com',
        SMTP_PASS: 'password123',
      };
      return config[key];
    }),
  };

  beforeEach(async () => {
    jest.spyOn(nodemailer, 'createTransport').mockImplementation(createTransportMock);

    const module: TestingModule = await Test.createTestingModule({
      providers: [
        MailerService,
        {
          provide: ConfigSetupService,
          useValue: mockConfigService,
        },
      ],
    }).compile();

    service = module.get<MailerService>(MailerService);
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  it('should send an email', async () => {
    sendMailMock.mockResolvedValueOnce('Email sent');

    const result = await service.sendEmail('user@example.com', 'Hello', 'Test message');

    expect(sendMailMock).toHaveBeenCalledWith({
      from: 'test@example.com',
      to: 'user@example.com',
      subject: 'Hello',
      text: 'Test message',
    });

    expect(result).toBe('Email sent');
  });
});
