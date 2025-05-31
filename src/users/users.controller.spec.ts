import { Test, TestingModule } from '@nestjs/testing';
import { UsersController } from './users.controller';
import { UsersService } from './users.service';

describe('UsersController', () => {
  let controller: UsersController;
  let usersService: UsersService;

  const mockUsersService = {
    create: jest.fn(),
    findAll: jest.fn(),
  };

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [UsersController],
      providers: [
        { provide: UsersService, useValue: mockUsersService },
      ],
    }).compile();

    controller = module.get<UsersController>(UsersController);
    usersService = module.get<UsersService>(UsersService);
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  describe('create', () => {
    it('should call usersService.create with correct parameters and return result', async () => {
      const mockUser = {
        email: 'test@example.com',
        city: 'Kyiv',
        conditions: ['Rain'],
      };

      mockUsersService.create.mockResolvedValue({ id: '1', ...mockUser });

      const result = await controller.create(
        mockUser.email,
        mockUser.city,
        mockUser.conditions,
      );

      expect(usersService.create).toHaveBeenCalledWith(
        mockUser.email,
        mockUser.city,
        mockUser.conditions,
      );
      expect(result).toEqual({ id: '1', ...mockUser });
    });
  });

  describe('getAll', () => {
    it('should return array of users', async () => {
      const mockUsers = [
        { id: '1', email: 'user1@example.com', city: 'Lviv', conditions: ['Snow'] },
        { id: '2', email: 'user2@example.com', city: 'Odesa', conditions: ['Clear'] },
      ];

      mockUsersService.findAll.mockResolvedValue(mockUsers);

      const result = await controller.getAll();

      expect(usersService.findAll).toHaveBeenCalled();
      expect(result).toEqual(mockUsers);
    });
  });
});
