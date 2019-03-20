import {createFiltersEndpointRequest} from 'bapi/endpoints/filters/filters';
import {execute} from 'bapi/helpers/execute';
import {
  nockWithBapiScope,
  disableNetAndAllowBapiCors,
} from 'bapi/test-helpers/nock';
import {AxiosError} from 'axios';

disableNetAndAllowBapiCors();

describe('Throw error with status code', async () => {
  for (const statusCode of [404, 500]) {
    test(`${statusCode}`, async () => {
      nockWithBapiScope()
        .defaultReplyHeaders({'access-control-allow-origin': '*'})
        .get(`/v1/filters?with=values&filters%5Bcategory%5D=20201&shopId=139`)
        .reply(statusCode, {});

      try {
        await execute(
          'https://api-cloud.example.com/v1/',
          139,
          createFiltersEndpointRequest({
            where: {
              categoryId: 20201,
            },
          }),
        );
      } catch (e) {
        expect((e as AxiosError).response!.status).toBe(statusCode);

        return;
      }

      fail('Should not be reached, expect exception');
    });
  }
});
