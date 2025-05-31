import { Test, TestingModule } from '@nestjs/testing';
import { UsersService } from './users.service';
import { getModelToken } from '@nestjs/mongoose';
import { Model } from 'mongoose';

describe('UsersService', () => {
  let service: UsersService;
  let model: Model<any>;

  const mockUserModel = {
    create: jest.fn(),
    find: jest.fn().mockReturnThis(),
    exec: jest.fn(),
  };

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        UsersService,
        {
          provide: getModelToken('User'),
          useValue: mockUserModel,
        },
      ],
    }).compile();

    service = module.get<UsersService>(UsersService);
    model = module.get<Model<any>>(getModelToken('User'));
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  describe('create', () => {
    it('should create and return a user', async () => {
      const input = { email: 'test@example.com', city: 'Kyiv', conditions: ['Rain'] };
      const mockCreatedUser = { _id: 'abc123', ...input };

      mockUserModel.create.mockResolvedValue(mockCreatedUser);

      const result = await service.create(input.email, input.city, input.conditions);

      expect(mockUserModel.create).toHaveBeenCalledWith(input);
      expect(result).toEqual(mockCreatedUser);
    });
  });

  describe('findAll', () => {
    it('should return an array of users', async () => {
      const mockUsers = [
        { _id: '1', email: 'user1@example.com', city: 'Lviv', conditions: ['Snow'] },
        { _id: '2', email: 'user2@example.com', city: 'Odesa', conditions: ['Clear'] },
      ];

      mockUserModel.exec.mockResolvedValue(mockUsers);

      const result = await service.findAll();

      expect(mockUserModel.find).toHaveBeenCalled();
      expect(mockUserModel.exec).toHaveBeenCalled();
      expect(result).toEqual(mockUsers);
    });
  });
});
