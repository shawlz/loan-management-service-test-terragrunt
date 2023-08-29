import { Test, TestingModule } from '@nestjs/testing';
import { INestApplication } from '@nestjs/common';
import * as request from 'supertest';
import { AppModule } from '../src/app.module';
import { ExceptionFilter } from '../src/exceptions';

describe('AppController (e2e)', () => {
  let app: INestApplication;

  beforeEach(async () => {
    const moduleFixture: TestingModule = await Test.createTestingModule({
      imports: [AppModule],
    }).compile();

    app = moduleFixture.createNestApplication();
    app.useGlobalFilters(new ExceptionFilter());
    await app.init();
  });

  it('should be defined', () => {
    expect(app).toBeDefined();
  });

  it('/ (GET)', () => {
    return request(app.getHttpServer()).get('/health').expect(200);
  });
});
