import mongoose from 'mongoose';

const Schema = mongoose.Schema;

export const ProjectModel = new Schema({
    title: {
        type: String,
        required: 'Un titre est requis.'
    },
    description: {
        type: String,
        required: 'Une description est requis.'
    },
    image: {
        type: String,
        required: 'Une image est requis.'
    },
    website: {
        type: String
    },
    github: {
        type: String
    },
    created_date: {
        type: Date,
        default: Date.now
    }
});