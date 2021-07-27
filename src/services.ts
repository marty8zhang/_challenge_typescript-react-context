import { userGateway, UserGatewayInterface } from './gateways/UserGateway';
import { postGateway, PostGatewayInterface } from './gateways/PostGateway';

export interface ServicesInterface {
  userGateway?: UserGatewayInterface,
  postGateway?: PostGatewayInterface,
}

const services = Object.freeze({
  userGateway,
  postGateway,
} as ServicesInterface);

export { services as default };
