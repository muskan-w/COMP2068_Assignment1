import { Request, Response } from 'express';
import Furniture from '../models/furniture';


// GET - fetch all furniture items 
export const getAllFurniture = async (req: Request, res: Response) => { 
    // use model to fetch all furniture items
    const furniture = await Furniture.find();
    return res.status(200).json(furniture);
};


// GET - fetch a single furniture item by id
export const getFurnitureById = async (req: Request, res: Response) => {
    // use model to fetch furniture item by id
    const furniture = await Furniture.findById(req.params.id);

    if (!furniture) {  // if no furniture item found with the given id, return 404
        return res.status(404).json({ 'error': 'Furniture item not found'});
    }
    return res.status(200).json(furniture); // request received successfully, return furniture item
};

// POST - create a new furniture item
export const createFurniture = async (req: Request, res: Response) => {
    if (!req.body){
        return res.status(400).json({ 'error': 'Bad Request'}); 
    }

    // use furniture model to save to db 
    await Furniture.create(req.body);
    return res.status(201).json({ 'message': 'Furniture item created successfully!'}); 
}

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