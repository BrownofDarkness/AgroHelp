import { Router } from "express";
import {
  listCulture,
  createCulture,
  getCulture,
  updateCulture,
  deleteCulture,
  getDiseaseCulture,
  getPractiseCulture,
  getFertilizer,
} from "../controllers/culture.controller";

import {} from "express-oas-validator";

import { storage } from "../config";
import multer from "multer";
import { getCultureSchema, validate } from "../schema";

const upload = multer({ storage });

const router = Router();

/**
 * CultureCreate
 * @typedef {object} CultureCreate
 * @property {string} name.required - The culture name
 * @property {string} category.required - The culture category
 * @property {string} description - The culture description
 * @property {string} image - The culture image - binary
 */

/**
 * Culture
 * @typedef {object} Culture
 * @property {number} id -  Culture id
 * @property {string} name.required - The culture name
 * @property {string} image - The culture image
 * @property {string} category.required - The culture category
 * @property {string} description - The culture description
 * @property {array<Soil>} soils - The soils favorable for a culture
 */

/**
 * GET /api/culture/
 * @tags Culture
 * @return {array<Culture>} 200 - Success response application/json
 * @return {object} 400 - Bad request response
 * @summary List all the Culture Practise
 */

router.get("/", listCulture);

/**
 * POST /api/culture/
 * @summary Create a culture
 * @tags Culture
 * @consumes multipart/form-data
 * @param {CultureCreate} request.body.required - Culture Info - multipart/form-data
 * @return {Culture} 201 - success
 * @return {object} 400 -  Bad Request
 */
router.post(
  // * @param {CultureCreate} request.formData.required - The request body as multipart/form-data
  "/",
  upload.single("image"),
  createCulture
);

/**
 * GET /api/culture/{id}/
 * @tags Culture
 * @param {number} id.path.required A unique integer value identifying this  Culture
 * @return {Culture} 200 - success response application/json
 * @returns {object} 404 - Not Found
 * @summary Get a culture
 */
router.get("/:id/", validate(getCultureSchema), getCulture);

/**
 * PATCH /api/culture/{id}/
 * @summary Update partially a culture
 * @tags Culture
 * @param {number} id.path.required A unique integer value identifying this  Culture
 * @consumes multipart/form-data
 * @param {CreateCulture} request.body.required - Culture Info - multipart/form-data
 * @return {Culture} 200 - success response -  application/json
 * @returns {object} 404 - Not Found
 */
router.patch(
  "/:id/",
  validate(getCultureSchema),
  upload.single("image"),
  updateCulture
);
/**
 * PUT /api/culture/{id}/
 * @summary Update a culture
 * @tags Culture
 * @param {number} id.path.required A unique integer value identifying this  Culture
 * @param {CreateCulture} request.body.required - Culture Info - multipart/form-data
 * @return {Culture} 200 - success response - application/json
 * @returns {object} 404 - Not Found
 */
router.put(
  "/:id/",
  validate(getCultureSchema),
  upload.single("image"),
  updateCulture
);

/**
 * DELETE /api/culture/{id}/
 * @summary Delete a culture
 * @tags Culture
 * @param {number} id.path.required A unique integer value identifying this  Culture
 * @return {object} 404 - Not Found
 */
router.delete("/:id/", validate(getCultureSchema), deleteCulture);

/**
 * GET /api/culture/{id}/practises/
 * @tags Culture
 * @param {number} id.path.required A unique integer value identifying this  Culture
 * @return {CulturePractise} 200 - success response - application/json
 * @returns {object} 404 - Not Found
 * @summary Get all a culture practise
 */
router.get("/:id/practises/", validate(getCultureSchema), getPractiseCulture);

/**
 * GET /api/culture/{id}/diseases/
 * @tags Culture
 * @param {int} id.path.required A unique integer value identifying this  Culture
 * @return {CultureDisease} 200 - success response - application/json
 * @returns {object} 404 - Not Found
 * @summary Get all a culture disease advice
 */
router.get("/:id/diseases/", validate(getCultureSchema), getDiseaseCulture);

/**
 * CultureWithFertilizer
 * @typedef {object} CultureWithFertilizer
 * @property {number} id
 * @property {string} name.required - The culture name
 * @property {string} image - The culture image
 * @property {array<Soil>} soils - The soils favorable for a culture
 * @property {array<FertilizerWNC>} fertilizers - The fertilizers for that culture
 */

/**
 * GET /api/culture/{id}/fertilizers/
 * @tags Culture
 * @param {int} id.path.required A unique integer value identifying this  Culture
 * @return {CultureWithFertilizer} 200 - success response - application/json
 * @returns {object} 404 - Not Found
 * @summary Get all a culture fertilizers
 */
router.get("/:id/fertilizers/", validate(getCultureSchema), getFertilizer);

let cultureRouter = router;
export default cultureRouter;
