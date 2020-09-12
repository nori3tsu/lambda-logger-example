import { APIGatewayProxyHandler } from 'aws-lambda';
import 'source-map-support/register';
import { tagged, logger } from './logger';
import * as uuid from 'uuid';

export const hello: APIGatewayProxyHandler = async (_event, _context) => {
  return tagged({id: uuid.v4()}, async () => {
    logger().info('hello')

    await new Promise((resolve) => setTimeout(resolve, 1000))

    logger().info('world!')

    return {
      statusCode: 200,
      body: JSON.stringify({}, null, 2),
    };
  })
}
