import _ from 'lodash';
import { NextFunction } from 'express';
import asyncMw from 'express-asyncmw';
import SequelizeFQP from '@krsbx/sequelize-fqp';
import { ZodError } from 'zod';
import {
  UniqueConstraintError,
  ValidationError,
  ValidationErrorItem,
} from 'sequelize';
import {
  createBadRequestResponse,
  createCodeStatus,
} from '@krsbx/response-formatter';
import { hasOwnProperty } from '../common';

export const queryParserMw = asyncMw<{
  reqQuery: {
    filters?: string;
  };
  extends: {
    filterQueryParams: UnknownObject;
  };
}>(async (req, res, next) => {
  req.filterQueryParams = req.query.filters
    ? SequelizeFQP(req.query.filters)
    : {};
  delete req.query.filters;

  return next();
});

export const errorHandlerMw = (
  err: unknown,
  req: Express.Request,
  res: Express.Response,
  next: NextFunction
) => {
  if (!err) return next();

  if (
    err instanceof ZodError ||
    err instanceof ValidationError ||
    err instanceof UniqueConstraintError ||
    err instanceof SyntaxError
  ) {
    const json = _.pick(err, ['name', 'errors']);

    if (
      err instanceof UniqueConstraintError &&
      hasOwnProperty<ValidationErrorItem[]>(json, 'errors')
    ) {
      _.forEach(json.errors, (error) => {
        delete error.instance?.dataValues;
      });
    }

    return res.status(400).json({
      ...createCodeStatus(400),
      message: json,
    });
  }

  console.log(err);

  return res.status(500).json(createCodeStatus(500));
};
