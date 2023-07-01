import { MEDIA_ROOT } from "../config";
import { Culture, Fertilizer } from "../models";
import Soil from "../models/Soil";
import serializeCulture from "../serializers/culture.serializer";
import CulturePractiseService from "../service/culture-practise.service";
import CultureService from "../service/culture.service";
import { status } from "../status";
import { Request, Response } from "express";
import fs from "fs";

/**
 * This controller is use to list all the cultures
 * @param req
 * @param res
 */
export const listCulture = async (req: Request, res: Response) => {
  const cultures = await CultureService.getAll({
    include: [{ model: Soil, as: "soils" }],
  });
  res.status(200).send(serializeCulture(cultures));
};

/**
 *This controller is to get a culture by it's id
 * @param req
 * @param res
 */
export const getCulture = async (req: Request, res: Response) => {
  const { id } = req.params;
  const culture = await CultureService.findById(id, {
    include: [{ model: Soil, as: "soils" }],
    rejectOnEmpty: false,
  });
  if (culture) {
    res.status(status.HTTP_OK).send(culture);
  } else {
    res
      .status(status.HTTP_BAD_REQUEST)
      .send({ message: `culture with id ${id} not found` });
  }
};

/**
 * This controller is use to create a culture
 * @param req
 * @param res
 */
export const createCulture = async (req: Request, res: Response) => {
  const { name, description, category } = req.body;
  if (!name) {
    return res
      .status(400)
      .send({ errors: `Culture with name required!`, success: false });
  } else {
    const presentCulture = await Culture.findOne({
      where: { name: name },
    });
    if (presentCulture) {
      return res
        .status(400)
        .send({ errors: `Culture with name ${name} already exists!` });
    }
  }

  const image = req.file?.filename || "";
  const culture = await CultureService.create({
    name: name.toLowerCase(),
    image,
    category,
    description,
  });
  res.status(status.HTTP_CREATED).send(serializeCulture(culture));
};

/**
 * This controller is to update a culture
 * @param req
 * @param res
 */
export const updateCulture = async (req: Request, res: Response) => {
  const { id } = req.params;
  const { name, category, description } = req.body;
  const image = req.file?.filename || "";
  const cultureToUpdate = await CultureService.findById(id);
  if (cultureToUpdate) {
    if (name) {
      cultureToUpdate.name = name;
    }
    if (category) {
      cultureToUpdate.category = category;
    }
    if (description) {
      cultureToUpdate.description = description;
    }
    if (image) {
      const filePath = `${MEDIA_ROOT}/${cultureToUpdate.image}`;
      // Check if the file exists
      if (fs.existsSync(filePath)) {
        // Delete the file
        fs.unlinkSync(filePath);
      }
      cultureToUpdate.image = image;
    }

    const culture = await cultureToUpdate.save();
    res.status(status.HTTP_OK).send(serializeCulture(culture));
  } else {
    res.status(status.HTTP_NOT_FOUND).send({ message: "Culture not found" });
  }
};

/**
 * This controller is use to delete a culture from it's id
 *
 * @param req
 * @param res
 */
export const deleteCulture = async (req: Request, res: Response) => {
  const { id } = req.params;
  const culture = await CultureService.findById(id, {
    include: [{ model: Soil, as: "soils" }],
    rejectOnEmpty: false,
  });
  if (!culture) {
    res.status(status.HTTP_NOT_FOUND).send({ message: "Culture not found" });
  }
  await CultureService.delete({ where: { id } });
  res.status(status.HTTP_NO_CONTENT).send({ message: `Deleted` });
};

export const getPractiseCulture = async (req: Request, res: Response) => {
  const { id } = req.params;
  const culture = await CulturePractiseService.findOne({
    include: [
      {
        model: Culture,
        where: {
          id,
        },
      },
    ],
    rejectOnEmpty: false,
  });
  if (culture) {
    res.status(status.HTTP_OK).send(culture);
  } else {
    res
      .status(status.HTTP_BAD_REQUEST)
      .send({ message: `culture with id ${id} not found` });
  }
};

export const getDiseaseCulture = async (req: Request, res: Response) => {
  const { id } = req.params;
  const culture = await CulturePractiseService.findOne({
    include: [
      {
        model: Culture,
        where: {
          id,
        },
      },
    ],
    rejectOnEmpty: false,
  });
  if (culture) {
    res.status(status.HTTP_OK).json(culture);
  } else {
    res
      .status(status.HTTP_BAD_REQUEST)
      .send({ message: `culture with id ${id} not found` });
  }
};

export const getFertilizer = async (req: Request, res: Response) => {
  const { id } = req.params;
  const cultures = await CultureService.findById(id, {
    include: [{ model: Fertilizer, as: "fertilizers" }],
    rejectOnEmpty: false,
  });

  if (cultures) {
    res.status(status.HTTP_OK).send(cultures);
  } else {
    res.status(status.HTTP_NOT_FOUND).send({ message: "Not Found" });
  }
};
