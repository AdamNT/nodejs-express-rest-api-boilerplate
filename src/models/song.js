const song = (sequelize, DataTypes) => {
  const Song = sequelize.define(
    'song',
    {
      id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
      },
      name: {
        type: DataTypes.STRING,
        allowNull: false,
        validate: {
          notEmpty: true,
        },
      },
    },
    {
      tableName: 'song',
      timestamps: false,
    }
  );

  // User.associate = db => {
  //   User.hasMany(db.Message);
  // };

  return Song;
};

export default song;
