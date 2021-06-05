import { cleanResponse } from './functions';

export const getOne = (model) => async (req, res) => {
  const doc = await model
    .findOne({
      _id: req.params.id,
    })
    .lean()
    .exec();

  if (!doc) {
    res.status(404).json({ message: 'Resource not found' });
    return;
  }

  res.status(200).json({ data: cleanResponse(doc) });
};

export const getMany = (model) => async (req, res) => {
  const page = req.query.page ? Number(req.query.page) : 1;
  const limit = req.query.limit ? Number(req.query.limit) : 10;

  const docs = await model
    .find({})
    .limit(limit)
    .skip((page - 1) * limit)
    .lean()
    .exec();

  const totalResults = await model.countDocuments({}).exec();

  const totalPages =
    limit === 0 || totalResults === 0 ? 1 : Math.ceil(totalResults / limit);

  if (page < 1 || page > totalPages) {
    res.status(400).json({ message: 'Incorrect page number' });
    return;
  }

  res.status(200).json({
    data: cleanResponse(docs),
    page,
    limit,
    totalPages,
    totalResults,
  });
};

export const createOne = (model) => async (req, res) => {
  const createdDoc = await model.create({
    ...req.body,
    createdBy: req.user.id,
  });
  res.status(201).json({ data: cleanResponse(createdDoc._doc) });
};

export const updateOne = (model) => async (req, res) => {
  const updatedDoc = await model
    .findOneAndUpdate(
      {
        createdBy: req.user.id,
        _id: req.params.id,
      },
      req.body,
      { new: true }
    )
    .lean()
    .exec();

  if (!updatedDoc) {
    res.status(404).json({ message: 'Resource not found' });
    return;
  }

  res.status(200).json({ data: cleanResponse(updatedDoc) });
};

export const removeOne = (model) => async (req, res) => {
  const removed = await model
    .findOneAndRemove({
      createdBy: req.user.id,
      _id: req.params.id,
    })
    .lean()
    .exec();

  if (!removed) {
    res.status(404).json({ message: 'Resource not found' });
    return;
  }

  res.status(200).json({ data: cleanResponse(removed) });
};

export const crudControllers = (model) => ({
  removeOne: removeOne(model),
  updateOne: updateOne(model),
  getMany: getMany(model),
  getOne: getOne(model),
  createOne: createOne(model),
});
