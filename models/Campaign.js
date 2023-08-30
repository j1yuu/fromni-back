import mongoose from "mongoose";

const CampaignSchema = new mongoose.Schema({
    title: {
        type: String,
        required: true
    },
    description: {
        type: String,
    },
    text: {
        type: Object,
        default: {}
    },
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true,
    },
    socials: {
        type: Array,
        default: [],
        required: true,
    },
    buttons: {
        type: Object,
        default: {},
    },
}, {
    timestamps: true
})

export default mongoose.model('Campaign', CampaignSchema)