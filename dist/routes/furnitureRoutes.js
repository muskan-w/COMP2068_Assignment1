"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
// nm import
const express_1 = __importDefault(require("express"));
const furnitureController_1 = require("../controllers/furnitureController");
// router to map url requests 
const router = express_1.default.Router();
// CRUD routes 
router.get('/', furnitureController_1.getAllFurniture); // GET all furniture items
router.get('/:id', furnitureController_1.getFurnitureById); // GET a furniture item by id
router.post('/', furnitureController_1.createFurniture); // POST new funriture 
router.put('/:id', furnitureController_1.updateFurniture); // PUT update furniture by id
router.delete('/:id', furnitureController_1.deleteFurniture); // DELETE furniture by id
// make it public
exports.default = router;
