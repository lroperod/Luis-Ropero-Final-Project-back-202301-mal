import { UserModel } from './../users/user-schema';
import { loginUserController, registerUserController } from './auth-controller';
import { Request, Response } from 'express';
import { encryptPassword, generateJWTToken } from './auth-utils';
import { CustomHTTPError } from '../../utils/errors/custom-http-error';

describe('Given a loginUserController', () => {
  const request = {
    body: {
      email: 'antonio@gmail.com',
      password: 'secreto123',
    },
  } as Partial<Request>;

  const response = {
    status: jest.fn().mockReturnThis(),
    json: jest.fn(),
    sendStatus: jest.fn(),
  } as Partial<Response>;

  const next = jest.fn();

  const tokenJWT = {
    accessToken: generateJWTToken(request.body.email),
  };
  const userLogin = {
    email: 'antonio@gmail.com',
    password: encryptPassword('secreto123'),
  };

  test('When the user exits, it should be respond with a access token', async () => {
    UserModel.findOne = jest.fn().mockImplementation(() => ({
      exec: jest.fn().mockResolvedValue(userLogin),
    }));
    await loginUserController(
      request as Request,
      response as Response,
      jest.fn(),
    );
    expect(UserModel.findOne).toHaveBeenCalledWith({
      email: 'antonio@gmail.com',
      password: '508b10f89ef1aa1f7dd4445e63225854',
    });
    expect(response.status).toHaveBeenCalledWith(201);
    expect(response.json).toHaveBeenCalledWith(tokenJWT);
  });

  test('When the user does not exits, it shoud be responde with status 404 ', async () => {
    UserModel.findOne = jest.fn().mockImplementation(() => ({
      exec: jest.fn().mockResolvedValue(null),
    }));
    await loginUserController(request as Request, response as Response, next);
    expect(next).toHaveBeenCalledWith(
      new CustomHTTPError(404, 'User or password does not exists'),
    );
  });
});

describe('Given a registerUserController', () => {
  const request = {
    body: {
      name: 'antonio',
      email: 'antonio@gmail.com',
      password: 'secreto123',
    },
  } as Partial<Request>;

  const response = {
    status: jest.fn().mockReturnThis(),
    json: jest.fn(),
    sendStatus: jest.fn(),
  } as Partial<Response>;

  const next = jest.fn();

  const userRegister = {
    ...request.body,
    password: encryptPassword('secreto123'),
  };

  test('When the user does not exits, it shoud be responde with status 201', async () => {
    UserModel.create = jest.fn();

    await registerUserController(
      request as Request,
      response as Response,
      next,
    );
    expect(UserModel.create).toBeCalledWith(userRegister);
    expect(response.status).toHaveBeenCalledWith(201);
    expect(response.json).toHaveBeenCalledWith({
      msg: 'User has been successfully registered',
    });
  });

  test('When the user exits, it should be respond with a with status 409', async () => {
    UserModel.findOne = jest.fn().mockImplementation(() => ({
      exec: jest.fn().mockResolvedValue(userRegister),
    }));

    await registerUserController(
      request as Request,
      response as Response,
      next,
    );
    expect(next).toHaveBeenCalledWith(
      new CustomHTTPError(
        409,
        'A user account already exits with this email address',
      ),
    );
  });
});
