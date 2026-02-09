"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || (function () {
    var ownKeys = function(o) {
        ownKeys = Object.getOwnPropertyNames || function (o) {
            var ar = [];
            for (var k in o) if (Object.prototype.hasOwnProperty.call(o, k)) ar[ar.length] = k;
            return ar;
        };
        return ownKeys(o);
    };
    return function (mod) {
        if (mod && mod.__esModule) return mod;
        var result = {};
        if (mod != null) for (var k = ownKeys(mod), i = 0; i < k.length; i++) if (k[i] !== "default") __createBinding(result, mod, k[i]);
        __setModuleDefault(result, mod);
        return result;
    };
})();
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = __importStar(require("mongoose"));
const reviewSchema = new mongoose_1.Schema({
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
const furnitureSchema = new mongoose_1.Schema({
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
const Furniture = mongoose_1.default.model('Furniture', furnitureSchema);
exports.default = Furniture;
