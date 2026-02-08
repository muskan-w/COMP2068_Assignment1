// nm import
import express, { Router } from 'express';

// local file imports 
// import { getAllFurniture, createFurniture, updateFurniture, deleteGame, createReview } from '..controllers/furnitureController';

// instantiate router to map url requests 
const router: Router = express.Router(); 

// map to the CRUD functions in the controller
//router.get('/', getAllFurniture);
//router.post('/', createFurniture);
//router.put('/:id', updateFurniture);
//router.delete('/:id', deleteGame);
//router.post('/:id/reviews', createReview);

// make it public
export default router;