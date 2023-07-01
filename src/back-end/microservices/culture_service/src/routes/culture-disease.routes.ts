import express, { Router } from "express";
import {
  createCultureDisease,
  listCultureDisease,
  getCultureDisease,
  updateCultureDisease,
  deleteCultureDisease,
} from "../controllers/culture-disease.controller";

import { storage } from "../config";
import multer from "multer";
import { getCulturePractiseSchema } from "../schema/getCulturePractiseSchema";
import {
  validate,
  createCultureDiseaseAdviceSchema,
  updateCultureDiseaseAdviceSchema,
} from "../schema";

const upload = multer({ storage });

const router = Router();
router.use(express.json());
router.use(express.urlencoded({ extended: true }));
/**
 * CultureDisease
 * @typedef {object} CultureDisease
 * @property {string} id
 * @property {string} disease_name - Culture Disease name
 * @property {string} solution - Culture Disease Solution
 * @property {Culture} cuture - Culture associated to that disease
 *
 */

/**
 * CultureDiseaseCreate
 * @typedef {object} CultureDiseaseCreate
 * @property {string} culture_id - Culture id
 * @property {string} disease_name - Culture Disease name
 * @property {string} solution - Culture Disease solution
 * @property {string} image - disease image - binary
 *
 */

/**
 * GET /api/culture-disease/
 * @summary Get all culture disease
 * @returns {array<CultureDisease>} 200 - Success
 * @tags Culture Disease
 *
 */

router.get("/", listCultureDisease);

/**
 * POST /api/culture-disease/
 * @summary Create a culture diseases
 * @consumes multipart/form-data
 * @param {CultureDiseaseCreate} request.body.required - Culture Disease info - multipart/form-data
 * @returns {CultureDisease} 200 - Success
 * @tags Culture Disease
 */
router.post(
  "/",
  upload.single("image"),
  createCultureDisease
);

/**
 * GET /api/culture-disease/{id}/
 * @summary Get a culture disease
 * @returns {CultureDisease}
 * @param {int} id.path.required A unique integer value identifying this  culture disease
 * @tags Culture Disease
 *
 */
router.get("/:id/", validate(getCulturePractiseSchema), getCultureDisease);

/**
 * PUT /api/culture-disease/{id}/
 * @summary Update a culture disease
 * @consumes multipart/form-data
 * @param {int} id.path.required A unique integer value identifying this  culture disease
 * @param {CultureDiseaseCreate} request.body.required - Culture Disease info - multipart/form-data
 * @returns {CultureDisease} 200 - Success
 * @returns {object} 404 - Bad Request
 * @tags Culture Disease
 */
router.put(
  "/:id/",
  upload.single("image"),
  updateCultureDisease
);

/**
 * PATCH /api/culture-disease/{id}/
 * @summary Update a culture disease
 * @param {int} id.path.required A unique integer value identifying this  culture disease
 * @consumes multipart/form-data
 * @param {CultureDiseaseCreate} request.body.required - Culture Disease info - multipart/form-data
 * @returns {CultureDisease} 200 - Success
 * @returns {object} 404 - Bad Request
 * @tags Culture Disease
 */
router.patch(
  "/:id/",
  upload.single("image"),
  updateCultureDisease
);

/**
 * DELETE /api/culture-disease/
 * @summary Get all culture disease
 * @param {int} id.path.required A unique integer value identifying this  culture disease
 * @returns {object} 204 - success
 * @returns {object} 404 - Bad Request
 * @tags Culture Disease
 */
router.delete("/:id/", deleteCultureDisease);

let cultureDiseaseRouter = router;

export default cultureDiseaseRouter;
