import request from 'supertest';
import { Application } from 'express';

import App from '../../src/app';
import Routes from '../../src/api/routes';

let application: App;
let app: Application;

beforeAll(() => {
    application = new App([...Routes]);
    application.listen();
    app = application.server;
});

afterAll(() => {
    application.close();
});

// Note: These tests expect database to be seeded with data
describe('[GET] /', () => {
    it('Should return 200 OK', done => {
        // eslint-disable-next-line prettier/prettier
        request(app)
            .get('/')
            .expect('Content-Type', /text/)
            .expect(200, done);
    });

    it('Should return 404 NOT FOUND', done => {
        // eslint-disable-next-line prettier/prettier
        request(app)
            .get('/random')
            .expect(404, done);
    });
});

describe('[GET] /api/post/:id', () => {
    const id = 1;
    it('Should return 200 OK - Post exists', done => {
        request(app)
            .get(`/api/post/${id}`)
            .expect('Content-Type', /json/)
            .expect(200)
            .expect(res => {
                res.body.id = id;
                res.body.content = 'https://slack.prisma.io';
                res.body.authorId = 1;
            })
            .end(err => {
                if (err) return done(err);
                return done();
            });
    });

    it("Should return 200 OK - Post doesn't exist", done => {
        // eslint-disable-next-line prettier/prettier
        request(app)
            .get('/api/post/500')
            .expect(200)
            .expect(res => {
                res.body = null;
            })
            .end(err => {
                if (err) return done(err);
                return done();
            });
    });
});

describe('[GET] /api/user/:id/drafts', () => {
    it('Should return 200 OK - User has no draft posts', done => {
        const id = 1;
        request(app)
            .get(`/api/user/${id}/drafts`)
            .expect('Content-Type', /json/)
            .expect(200)
            .expect(res => {
                res.body.length = 0;
            })
            .end(err => {
                if (err) return done(err);
                return done();
            });
    });

    it('Should return 200 OK - User has multiple draft posts', done => {
        const id = 3;
        request(app)
            .get(`/api/user/${id}/drafts`)
            .expect('Content-Type', /json/)
            .expect(200)
            .expect(res => {
                res.body.length = 1;
            })
            .end(err => {
                if (err) return done(err);
                return done();
            });
    });

    it("Should return 200 OK - User doesn't exist", done => {
        const id = 100;
        // eslint-disable-next-line prettier/prettier
        request(app)
            .get(`/api/user/${id}/drafts`)
            .expect(200, done)

    });
});

describe('[GET] /api/users', () => {
    it('Should return 200 OK - Get all users', done => {
        request(app)
            .get(`/api/users`)
            .expect('Content-Type', /json/)
            .expect(200, done);
    });
});

describe('[POST] /api/post', () => {
    it('Should return 200 OK - New post', done => {
        let postId: string;
        request(app)
            .post('/api/post')
            .send({
                title: 'Today',
                content: 'This is a post about the weather',
                authorEmail: 'nilu@prisma.io',
            })
            .set('Accept', 'application/json')
            .expect('Content-Type', /json/)
            .expect(200)
            .then(res => {
                expect(res.body.title).toBe('Today');
                expect(res.body.content).toBe(
                    'This is a post about the weather',
                );
                expect(res.body.published).toBe(false);
                expect(res.body.viewCount).toEqual(0);
                expect(res.body.authorId).toEqual(2);

                postId = res.body.id;
            })
            .then(() => {
                request(app)
                    .delete(`/api/post/${postId}`)
                    .expect('Content-Type', /json/)
                    .expect(200, done);
            })
            .catch(err => {
                if (err) return done(err);
                return done();
            });
    });

    it('Should return 500 Internal Server Error - Invalid email', done => {
        request(app)
            .post('/api/post')
            .send({
                title: 'Today',
                content: 'This is a post about the weather',
                authorEmail: 'email-prisma.io',
            })
            .set('Accept', 'application/json')
            .expect('Content-Type', /json/)
            .expect(500, done);
    });
});

describe('[POST] /api/signup', () => {
    it('Should return 200 OK - Register new user', done => {
        let userId: string;
        const user = {
            email: 'john@prisma.io',
            name: 'John',
        };
        request(app)
            .post('/api/signup')
            .send(user)
            .set('Accept', 'application/json')
            .expect('Content-Type', /json/)
            .expect(200)
            .then(res => {
                expect(res.body.email).toBe('john@prisma.io');
                expect(res.body.name).toBe('John');

                userId = res.body.id;
            })
            .then(() => {
                request(app)
                    .delete(`/api/user/${userId}`)
                    .expect('Content-Type', /json/)
                    .expect(200, done);
            })
            .catch(err => {
                if (err) return done(err);
                return done();
            });
    });

    it('Should return 500 Internal Server Error - User already exists', done => {
        request(app)
            .post('/api/signup')
            .send({
                email: 'alice@prisma.io',
                name: 'Alice',
            })
            .set('Accept', 'application/json')
            .expect(500, done);
    });
});

describe('[PUT] /api/publish/:id', () => {
    it('Should return 200 OK - Toggle post publish 1', done => {
        request(app)
            .put('/api/publish/1')
            .expect('Content-Type', /json/)
            .expect(200, done);
    });

    it('Should return 200 OK - Toggle post publish 2', done => {
        request(app)
            .put('/api/publish/1')
            .expect('Content-Type', /json/)
            .expect(200, done);
    });

    it("Should return 500 Internal Server Error - Post doesn't exist", done => {
        request(app)
            .put('/api/publish/51020')
            .expect('Content-Type', /json/)
            .expect(500, done);
    });
});

describe('[PUT] /api/post/:id/views', () => {
    it('Should return 200 OK - Increment post viewCount 1', done => {
        request(app)
            .put('/api/post/1/views')
            .expect('Content-Type', /json/)
            .expect(200, done);
    });

    it('Should return 200 OK - Increment post viewCount 2', done => {
        request(app)
            .put('/api/post/1/views')
            .expect('Content-Type', /json/)
            .expect(200, done);
    });

    it("Should return 500 Internal Server Error - Post doesn't exist", done => {
        request(app)
            .put('/api/post/51241/views')
            .expect('Content-Type', /json/)
            .expect(500, done);
    });
});
