import * as redisController from './controllers/redisController';
import * as instagramController from './controllers/instagramController';
import * as socketController from './controllers/socketController';

redisController.init();
instagramController.init();
socketController.init();