import { sequelize } from "../config/db";
import { DataTypes, Model } from "sequelize";
import Culture from "./Culture";
import {
  MEDIA_ROOT,
  getServerAddress,
  getServerPort,
  getServerProtocole,
} from "../config";
import { isIPv6 } from "../utils/isIpv6";
import fs from "fs";
class CultureDiseaseAdvice extends Model {
  public disease_name!: string;
  public solution!: string;
  public image!: string;
  public id!: string;

  public get imageUrl(): string {
    const mediaFolder = "media";
    let address = getServerAddress();
    console.log(isIPv6(address));
    if (isIPv6(address)) {
      address = `[${address}]`;
    }
    const port = getServerPort();
    const protocole = getServerProtocole();
    const url = `${protocole}://${address}:${port}/${mediaFolder}`;
    return this.image.split(".").length > 1 ? `${url}/${this.image}` : null;
  }
}

CultureDiseaseAdvice.init(
  {
    disease_name: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    image: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    solution: {
      type: DataTypes.TEXT,
      allowNull: false,
    },
  },
  {
    sequelize,
    tableName: "culture_disease_advice",
    createdAt: "created_at",
    updatedAt: "updated_at",
  }
);

Culture.addHook("beforeDestroy", (cultureDisease: CultureDiseaseAdvice) => {
  const filePath = `${MEDIA_ROOT}/${cultureDisease.image}`;
  // Check if the file exists
  if (fs.existsSync(filePath)) {
    // Delete the file
    fs.unlinkSync(filePath);
  }
});

Culture.hasMany(CultureDiseaseAdvice, { foreignKey: "culture_id" });
CultureDiseaseAdvice.belongsTo(Culture, { foreignKey: "culture_id" });

export default CultureDiseaseAdvice;
