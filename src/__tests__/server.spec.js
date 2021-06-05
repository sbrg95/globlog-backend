import request from 'supertest';
import mongoose from 'mongoose';
import { app } from '../server';
import User from '../resources/user/user.model';
import { newToken } from '../utils/auth';

const api = request(app);

describe('API Authentication', () => {
  let token;
  beforeEach(async () => {
    const user = await User.create({
      email: 'jdoe@gmail.com',
      password: 123456789,
      username: 'jdoe',
      firstname: 'john',
      lastname: 'doe',
    });
    token = newToken(user);
  });

  test('api should be locked down', async () => {
    const response = await api.get('/api/user');
    expect(response.statusCode).toBe(401);
  });

  test('passes without JWT', async () => {
    const id = mongoose.Types.ObjectId();

    const results = await Promise.all([
      api.get('/api/post'),
      api.get(`/api/post/${id}`),
    ]);

    results.forEach((res) => expect(res.statusCode).not.toBe(401));
  });

  test('passes with JWT', async () => {
    const jwt = `Bearer ${token}`;
    const id = mongoose.Types.ObjectId();

    const results = await Promise.all([
      api.post('/api/post').set('Authorization', jwt),
      api.put(`/api/post/${id}`).set('Authorization', jwt),
      api.delete(`/api/post/${id}`).set('Authorization', jwt),
    ]);

    results.forEach((res) => expect(res.statusCode).not.toBe(401));
  });
});
