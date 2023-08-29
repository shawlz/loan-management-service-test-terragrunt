// all-exception.filter.spec.ts
import { Test, TestingModule } from '@nestjs/testing';
import { HttpStatus, HttpException, Logger } from '@nestjs/common';

import { ExceptionFilter } from './exception-filter';
import { ValidationFailed } from './validation';

const mockAppLoggerService = {
  info: jest.fn(),
  error: jest.fn(),
  warn: jest.fn(),
  debug: jest.fn(),
};
const mockJson = jest.fn();
const mockStatus = jest.fn().mockImplementation(() => ({
  json: mockJson,
}));
const mockGetResponse = jest.fn().mockImplementation(() => ({
  status: mockStatus,
}));
const mockHttpArgumentsHost = jest.fn().mockImplementation(() => ({
  getResponse: mockGetResponse,
  getRequest: jest.fn(),
}));

const mockArgumentsHost = {
  switchToHttp: mockHttpArgumentsHost,
  getArgByIndex: jest.fn(),
  getArgs: jest.fn(),
  getType: jest.fn(),
  switchToRpc: jest.fn(),
  switchToWs: jest.fn(),
};

describe('System header validation service', () => {
  let service: ExceptionFilter;

  beforeEach(async () => {
    jest.clearAllMocks();
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        ExceptionFilter,
        {
          provide: Logger,
          useValue: mockAppLoggerService,
        },
      ],
    }).compile();
    service = module.get<ExceptionFilter>(ExceptionFilter);
  });

  describe('All exception filter tests', () => {
    it('should be defined', () => {
      expect(service).toBeDefined();
    });

    it('should throw Http exception', () => {
      service.catch(
        new HttpException('Http exception', HttpStatus.BAD_REQUEST),
        mockArgumentsHost,
      );
      expect(mockHttpArgumentsHost).toBeCalledTimes(1);
      expect(mockHttpArgumentsHost).toBeCalledWith();
      expect(mockGetResponse).toBeCalledTimes(1);
      expect(mockGetResponse).toBeCalledWith();
      expect(mockStatus).toBeCalledTimes(1);
      expect(mockStatus).toBeCalledWith(HttpStatus.BAD_REQUEST);
      expect(mockJson).toBeCalledTimes(1);
      expect(mockJson).toBeCalledWith({
        message: 'Http exception',
        success: false,
        code: 400,
      });
    });

    it('should throw an exception', () => {
      service.catch(new Error('Error exception'), mockArgumentsHost);
      expect(mockHttpArgumentsHost).toBeCalledTimes(1);
      expect(mockHttpArgumentsHost).toBeCalledWith();
      expect(mockGetResponse).toBeCalledTimes(1);
      expect(mockGetResponse).toBeCalledWith();
      expect(mockStatus).toBeCalledTimes(1);
      expect(mockJson).toBeCalledWith({
        message: 'Internal Server Error',
        success: false,
        code: 500,
      });
    });

    it('should return with exception', () => {
      service.catch('Generic exception', mockArgumentsHost);
      expect(mockHttpArgumentsHost).toBeCalledTimes(1);
      expect(mockHttpArgumentsHost).toBeCalledWith();
      expect(mockGetResponse).toBeCalledTimes(1);
      expect(mockGetResponse).toBeCalledWith();
      expect(mockStatus).toBeCalledTimes(1);
      expect(mockJson).toBeCalledWith({
        message: 'Internal Server Error',
        success: false,
        code: 500,
      });
    });

    it('should return with validation error', () => {
      service.catch(
        new HttpException(
          {
            message: 'Validation error',
            errors: {
              name: '',
              email: '',
              password: '',
            },
          },
          HttpStatus.BAD_REQUEST,
        ),
        mockArgumentsHost,
      );

      expect(mockHttpArgumentsHost).toBeCalledTimes(1);
      expect(mockHttpArgumentsHost).toBeCalledWith();
      expect(mockGetResponse).toBeCalledTimes(1);
      expect(mockGetResponse).toBeCalledWith();
      expect(mockStatus).toBeCalledTimes(1);
      expect(mockJson).toBeCalledWith({
        message: 'Validation error',
        success: false,
        code: 400,
      });
    });
  });
});
