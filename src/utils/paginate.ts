import { ModelCtor } from 'sequelize-typescript';
import { FindOptions } from 'sequelize';

export const paginate = async(
  model: ModelCtor,
  query: FindOptions,
  page = 1,
  paginationLimit = 10
) => {
  if (!page) page = 1;
  query.offset = (page - 1) * paginationLimit;
  query.limit = paginationLimit;

  const paginated = await model.findAll(query);

  //////////////////////////////////////////////////////////////
  const total = await model.findAll({
    where: query.where,
    attributes: ['id'],
    include: query.include,
  });

  return {
    data: paginated,
    metadata: {
      page,
      paginationLimit,
      count: paginated.length,
      total: total.length,
    },
  };
  //////////////////////////////////////////////////////////////////

  // let total: undefined | number;

  // try {
  //   if (query.include) query.include = undefined;
  //   total = await model.count(query);
  // } catch {
  //   total = undefined;
  // }

  // return {
  //   data: paginated,
  //   metadata: {
  //     page,
  //     paginationLimit,
  //     count: paginated.length,
  //     total,
  //   },
    
  // };
}