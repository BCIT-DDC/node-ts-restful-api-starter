import App from './app';

import HomeRoute from './api/routes/home.route';
import APIRoute from './api/routes/api.route';

const app: App = new App([HomeRoute, APIRoute]);

app.listen();

export default app.server;
