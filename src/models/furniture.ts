import mongoose, { Model, Schema } from 'mongoose'; 

interface IReview {
    reviewer: string;
    reviewText: string;
    rating: number; 
} 

interface IFurniture {
    name: string;
    description: string;
    price: number;
    material: string;
    dimensions: {
        length: number;
        width: number;
        height: number;
    };
    reviews: IReview[]; // child property
}

const reviewSchema = new Schema<IReview>({
    reviewer: {
        type: String, 
        required: [true, 'Reviewer name is required']
    },
    reviewText: {
        type: String,
        required: [true, 'Review text is required'],
        minLength: 10
    },
    rating: {
        type: Number,
        required: [true, 'Rating is required'],
        min: 1,
        max: 5
    }
});

// furniture
const furnitureSchema = new Schema<IFurniture>({
    name: {
        type: String,
        required: [true, 'Furniture name is required']
    },
    description: {
        type: String,
        required: [true, 'Furniture description is required']
    },
    price: {
        type: Number,
        required: [true, 'Furniture price is required'],    
        min: [0, 'Price must be a positive number'] // handle error cases
    },
    material: {
        type: String,
        required: [true, 'Furniture material is required']
    },
    dimensions: {
        length: {
            type: Number,
            required: [true, 'Furniture length is required'],
            min: [0, 'Length must be a positive number'] // handle error cases
        },
        width: {
            type: Number,
            required: [true, 'Furniture width is required'],
            min: [0, 'Width must be a positive number']
        },
        height: {
            type: Number,
            required: [true, 'Furniture height is required'],
            min: [0, 'Height must be a positive number']
        }
    },
    reviews: [reviewSchema] 
});

// make public 
const Furniture = mongoose.model<IFurniture>('Furniture', furnitureSchema);
export default Furniture;