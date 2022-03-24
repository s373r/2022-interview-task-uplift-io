import request from 'supertest';

import { Test, TestingModule } from '@nestjs/testing';
import { INestApplication } from '@nestjs/common';

import { AppModule } from '../src/app.module';

describe('AppController (e2e)', () => {
  let app: INestApplication;

  beforeEach(async () => {
    const moduleFixture: TestingModule = await Test.createTestingModule({
      imports: [AppModule],
    }).compile();

    app = moduleFixture.createNestApplication();
    await app.init();
  });

  it('/blocks/:id (GET): Get a block by ID (as a number)', () => {
    const expectedBlock = {
      difficulty: '228060758',
      extraData: '0xd5830104058650617269747986312e31322e31826c69',
      gasLimit: 4703192,
      gasUsed: 0,
      hash: '0x45480a102d7afb8beb1f17df4a85e91eaa8d3a89c538df40449be6297494235c',
      logsBloom:
        '0x00000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000',
      miner: '0x15EB27CBC64CbD64AEF14aA2943Eee70E5040A06',
      mixHash:
        '0xacb1736c033e45f3b509d80f3b7ebc7bb569da6b3deee39138172bca93ecb188',
      nonce: '0x8cf8a797ec6f8d75',
      number: 100500,
      parentHash:
        '0x81ad2cbf509ec6b59ef00d57b005a019eb13ee24fdbad25ae7f496ad39e80fe5',
      receiptsRoot:
        '0x56e81f171bcc55a6ff8345e692c0f86e5b48e01b996cadc001622fb5e363b421',
      sha3Uncles:
        '0x1dcc4de8dec75d7aab85b567b6ccd41ad312451b948a7413f0a142fd40d49347',
      size: 537,
      stateRoot:
        '0x40dbe46a1756d5ecd93eb1db750eb9e95dd819e35951caa2df37ec24579ad5d9',
      timestamp: 1480952706,
      totalDifficulty: '11939088725135',
      transactions: [],
      transactionsRoot:
        '0x56e81f171bcc55a6ff8345e692c0f86e5b48e01b996cadc001622fb5e363b421',
      uncles: [],
    };

    return request(app.getHttpServer())
      .get('/blocks/100500')
      .expect(200, expectedBlock);
  });

  it('/blocks/:id (GET): Get a block by ID (as a number)', () => {
    // NOTE: we do not know how the latest block will look,
    //       so just check HTTP status
    return request(app.getHttpServer()).get('/blocks/latest').expect(200);
  });

  it('/blocks/:id (GET): Try to get a non-existent block', () => {
    return request(app.getHttpServer())
      .get('/blocks/100000000000000000')
      .expect(404);
  });

  it('/blocks/:id (GET): Try to use an invalid block ID', () => {
    return request(app.getHttpServer()).get('/blocks/foobar').expect(400);
  });

  it('/groups/ (GET)', () => {
    return request(app.getHttpServer())
      .get('/groups/')
      .expect(200, ['12', '13']);
  });

  it('/groups/:id (GET): Get a group', () => {
    const expectedGroup = {
      '0': 'DeFi Indexes',
      '1': ['0', '1', '2', '3', '4', '5', '6'],
      name: 'DeFi Indexes',
      indexes: ['0', '1', '2', '3', '4', '5', '6'],
    };

    return request(app.getHttpServer())
      .get('/groups/12')
      .expect(200, expectedGroup);
  });

  it('/groups/:id (GET): Try to get a non-existent group', () => {
    return request(app.getHttpServer()).get('/groups/777').expect(404);
  });

  it('/groups/:id (GET): Try to use invalid group ID', () => {
    return request(app.getHttpServer()).get('/groups/foobar').expect(400);
  });

  it('/indexes/:id (GET): Get an index', () => {
    const expectedIndex = {
      '0': 'DeFi Index (1)',
      '1': '150000000000000000',
      '2': '9500',
      '3': '250000000',
      '4': '-45',
      name: 'DeFi Index (1)',
      ethPriceInWei: '150000000000000000',
      usdPriceInCents: '9500',
      usdCapitalization: '250000000',
      percentageChange: '-45',
    };

    return request(app.getHttpServer())
      .get('/indexes/12')
      .expect(200, expectedIndex);
  });

  it('/indexes/:id (GET): Try to get a non-existent index', () => {
    return request(app.getHttpServer()).get('/indexes/1').expect(404);
  });

  it('/indexes/:id (GET): Try to use invalid index ID', () => {
    return request(app.getHttpServer()).get('/indexes/foobar').expect(400);
  });
});
