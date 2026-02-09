import { Request, Response } from 'express';
import Furniture from '../models/furniture';

/**
 * 
 * @swagger 
 * /api/furniture 
 *  get: 
 *   summary: Retreive all furniture items
 *   responses: 
 *     200: A list of furniture items
 *   description: Retrieve a list of all furniture items 
 */

// GET - fetch all furniture items 
export const getAllFurniture = async (req: Request, res: Response) => { 
    // use model to fetch all furniture items
    const furniture = await Furniture.find();
    return res.status(200).json(furniture);
};

/**
 * @swagger 
 * /api/furniture/{id}
 *  get:
 *    summary: Retreive a single furniture item by id
 *    parameters: 
 *     - in: path
 *      name: id
 *      required: true
 *    schema:
 *     type: string
 *    description: The furniture item id
 *    responses: 
 *      200: 
 *          description: A single furniture item
 *      404: 
 *         description: Furniture item not found
 */
// GET - fetch a single furniture item by id
export const getFurnitureById = async (req: Request, res: Response) => {
    // use model to fetch furniture item by id
    const furniture = await Furniture.findById(req.params.id);

    if (!furniture) {  // if no furniture item found with the given id, return 404
        return res.status(404).json({ 'error': 'Furniture item not found'});
    }
    return res.status(200).json(furniture); // request received successfully, return furniture item
};


/**
 * @swagger
 * /api/furniture
 *  post:
 *    summary: Create a new furniture item
 *    requestBody:
 *      required: true
 *      content:
 *        application/json:
 *         schema:
 *          type: object
 *          properties:
 *           name:
 *           type: string
 *           description:
 *           type: string
 *           price:
 *            type: integer
 *           material:
 *            type: string
 *           dimensions:
 *            type: object
 *            properties:
 *             length:
 *             type: integer
 *             width:
 *             type: integer
 *             height:
 *             type: integer
 *        reviews:
 *         type: array
 *         items:
 *           type: object
 *           properties:
 *            reviewer: 
 *             type: string
 *            reviewText:
 *             type: string
 *            rating:
 *             type: integer
 *        responses: 
 *          201: 
 *              Furniture item created successfully
 *          400: 
 *              Bad Request
 */
// POST - create a new furniture item
export const createFurniture = async (req: Request, res: Response) => {
    if (!req.body){
        return res.status(400).json({ 'error': 'Bad Request'}); 
    }

    // use furniture model to save to db 
    await Furniture.create(req.body);
    return res.status(201).json({ 'message': 'Furniture item created successfully!'}); 
}

/**
 * 
 * @swagger
 * /api/furniture/{id}
 *   put:
 *    summary: Update an existing furniture item by id
 *     parameters:
 *   - in: path
 *     name: id
 *     schema: 
 *      type: string
 *      required: true
 *      description: The furniture item id
 *     requestBody:
 *      required: true
      content: 
 *      application/json:
 *    schema:
 *      type: object
 *      properties:
 *      name:
 *       type: string
 *     description:
 *      type: string
 *    price:
 *      type: integer
 *    material:
 *      type: string
 *    dimensions:
 *      type: object
 *      properties:
 *       length:
 *        type: integer
 *      width:
 *         type: integer
 *     height:
 *       type: integer
 *   reviews:
 *    type: array
 *    items:
 *      type: object
 *      properties:
 *       reviewer:
 *         type: string
 *       reviewText:
 *        type: string
 *       rating:
 *        type: integer
 *   responses:
 *      200: 
 *          Furniture item updated successfully
 *      400:
 *          Bad Request
 *      404:
 *         Furniture item not found
 */

// PUT: update an existing furniture item by id
export const updateFurniture = async (req: Request, res: Response) => {
    // check if id is valid
    const furniture = await Furniture.findById(req.params.id);

    if (!furniture){
        return res.status(404).json({ 'error': 'Furniture item not found'}); 
    }   

    // use mongoose to update furniture request body
    await Furniture.findByIdAndUpdate(req.params.id, req.body);

    return res.status(204).json();
};

/**
 * 
 * @swagger 
 * /api/furniture/{id}
 *  delete:
 *    summary: Delete an existing furniture item by id
 *  parameters:
 *   - in: path
 *     name: id
 *     required: true
 *     schema:
 *       type: string
 *     description: The furniture item id to delete
 *  responses:
 *   204: 
 *    Furniture item deleted successfully
 *   404: 
 *    Furniture item not found
 */

// DELETE: delete an existing furniture item by id
export const deleteFurniture = async (req: Request, res: Response) => {
    // check if id is valid
    const furniture = await Furniture.findById(req.params.id);

    if (!furniture){
        return res.status(404).json({ 'error': 'Furniture item not found'}); 
    }

    // use mongoose to delete furniture by id
    await Furniture.findByIdAndDelete(req.params.id);

    return res.status(204).json();
}