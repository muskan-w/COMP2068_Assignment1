// nm import
import express, { Router } from 'express';

import { getAllFurniture, createFurniture, updateFurniture, deleteFurniture, getFurnitureById } from '../controllers/furnitureController';


// router to map url requests 
const router: Router = express.Router(); 


// CRUD routes 
router.get('/', getAllFurniture);  // GET all furniture items
router.get('/:id', getFurnitureById); // GET a furniture item by id
router.post('/', createFurniture); // POST new funriture 
router.put('/:id', updateFurniture); // PUT update furniture by id
router.delete('/:id', deleteFurniture); // DELETE furniture by id

// make it public
export default router;