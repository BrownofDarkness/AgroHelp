import { sequelize } from "../config/db";
import { Model, DataTypes } from "sequelize";

import Soil from "./Soil";
import Culture from "./Culture";

class SoilCulture extends Model {
  public culture_id!: number;
  public soil_id!: number;
  public readonly created_at!: Date;
  public readonly updated_at!: Date;
}

SoilCulture.init(
  {
    culture_id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: Culture,
        key: "id",
      },
    },
    soil_id: {
      type: DataTypes.BIGINT,
      allowNull: false,
      references: {
        model: Soil,
        key: "id",
      },
    },
  },
  {
    sequelize,
    tableName: "soil_culture",
    createdAt: "created_at",
    updatedAt: "updated_at",
  }
);

Soil.belongsToMany(Culture, {
  through: SoilCulture,
  as: "cultures",
  foreignKey: "soil_id",
});
Culture.belongsToMany(Soil, {
  through: SoilCulture,
  as: "soils",
  foreignKey: "culture_id",
});

export default SoilCulture;
