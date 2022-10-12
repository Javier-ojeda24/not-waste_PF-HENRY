const { DataTypes } = requiere("sequalize");

module.export = (sequalize) => {
  sequalize.define("customer", {
    id: {
      type: DataTypes.NUMBER,
      primaryKey: true,
      unique: true,
    },
    name: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    password: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    email: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    image: {
      type: DataTypes.STRING,
      allowNull: false,
    },
        // TODO cambiar datatype a ENUM con los partidos de buenos aires
    city: {
      type: DataTypes.STRING,
      allowNull: false,
    }
  });
};
