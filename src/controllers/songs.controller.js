import db from '../models';

const findAll = async (req, res) => {
  try {
    const songs = await db.song.findAll();

    return res.status(200).json(songs);
  } catch (error) {
    return res.status(400).send(error);
  }
};

const findOne = (req, res, next) => {
  const {
    params: { id },
  } = req;

  db.Song.findByPk(id);
};

const create = (req, res) => {
  // db.Song.create()
};

const update = (req, res, next) => {
  const {
    params: { id },
  } = req;

  // db.Song.update(req.body, {
  //   where: { id: id }
  // })
};

const remove = (req, res, next) => {
  const {
    params: { id },
  } = req;

  // db.Song.destroy({
  //   where: { id: id }
  // })
};

export default {
  findAll,
  findOne,
  create,
  update,
  remove,
};
