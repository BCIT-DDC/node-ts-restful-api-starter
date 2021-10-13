import express, { Application, Router } from 'express';

import { logger } from '../api/utils/logger.util';
import { PORT, ENVIRONMENT } from '../api/utils/secrets.util';
import errorMiddleware from '../api/middleware/error.middleware';
import expressMiddleware from '../api/middleware/express.middleware';

export default class App {
    private readonly _env: string;

    private readonly _app: Application;

    private readonly _port: string | number;

    constructor(routes: Router[]) {
        this._port = PORT;
        this._env = ENVIRONMENT;
        this._app = express();

        this.initializeMiddleware();
        this.initializeRoutes(routes);
        this.initializeErrorHandling();
    }

    public get env(): string {
        return this._env;
    }

    public get port(): string | number {
        return this._port;
    }

    public get server(): Application {
        return this._app;
    }

    public listen(): void {
        this._app.listen(this._port, () => {
            if (this.env === 'development') {
                logger.info(
                    `🚀 Application Started; Listening on port: http://localhost:${this.port}`,
                );
            } else {
                logger.info(
                    `🚀 Application Started; Listening on port: ${this.port}`,
                );
            }
        });
    }

    private initializeMiddleware(): void {
        logger.info('🔨 Initializing Middleware ...');
        expressMiddleware(this._app);
        logger.info('🚀 Finished Initializing All Middleware.');
    }

    private initializeRoutes(routes: Router[]): void {
        logger.info('🔨 Initializing Routes ...');
        routes.forEach((router: Router) => {
            this._app.use('/', router);
        });
        logger.info('🚀 Finished Initializing Routes.');
    }

    private initializeErrorHandling(): void {
        logger.info('🔨 Initializing Error Handling Middleware ...');
        this._app.use(errorMiddleware);
        logger.info('🚀 Finished Initializing Error Handling Middleware.');
    }
}
