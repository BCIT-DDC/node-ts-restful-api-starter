import dotenv from 'dotenv';
import IOHandler from '@utils/iohandler.util';
import { logger } from '@utils/logger.util';

if (IOHandler.dirExists('.env')) {
    logger.info('Using .env file to supply config environment variables');
    dotenv.config({ path: '.env' });
} else {
    logger.info(
        'Using .env.example file to supply config environment variables',
    );
    dotenv.config({ path: '.env.example' });
}

export const PORT = process.env.PORT || 3000;
export const ENVIRONMENT = process.env.NODE_ENV || 'development';
