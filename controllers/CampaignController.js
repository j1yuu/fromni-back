import CampaignModel from "../models/Campaign.js"
import UserModel from "../models/User.js"

export const create = async (req, res) => {
    try {
        const doc = new CampaignModel({
            title: req.body.title,
            text: req.body.text,
            user: req.userId,
            description: req.body.description,
            socials: req.body.socials,
            buttons: req.body.buttons,
            inline: req.body.inline,
        });

        const campaign = await doc.save()

        res.json(campaign)
    } catch (err) {
        console.log(err);
        res.status(500).json({
            message: 'Не удалось создать кампанию'
        })
    }
}

export const getAll = async (req, res) => {
    try {
        const campaigns = await CampaignModel.find({ user: req.userId }).sort([['createdAt', -1]]).exec()
        res.json(campaigns)
    } catch (err) {
        console.log(err)

        res.status(500).json({
            message: 'Не удалось получить кампании'
        })
    }
}

export const getOne = async (req, res) => {
    try {
        const campaignId = req.params.id;
        const campaign = await CampaignModel.findById(campaignId).populate('user');
        const { ...campaignData } = campaign._doc;
        res.json({ campaignData });
    } catch (err) {
        console.log(err);
        res.status(500).json({
            message: 'Не удалось получить кампанию',
        });
    }
};

export const update = async (req, res) => {
    try {
        const campaignId = req.params.id;

        await CampaignModel.updateOne(
            { _id: campaignId },
            {
                title: req.body.title,
                text: req.body.text,
                user: req.userId,
                description: req.body.description,
                socials: req.body.socials,
                buttons: req.body.buttons,
                inline: req.body.inline,
            }
        )

        res.json({
            success: true
        })
    } catch (err) {
        console.log(err);
        res.status(500).json({
            message: 'Не удалось обновить кампанию',
        });
    }
}

export const remove = async (req, res) => {
    try {
        const campaignId = req.params.id;

        CampaignModel.deleteOne({ _id: campaignId }).then((doc) => {
            if (!doc) {
                return res.status(404).json({
                    message: 'Кампания не найдена',
                });
            }
            res.json({ success: true });
        });
    }
    catch (err) {
        console.log(err);
        return res.status(500).json({
            message: 'Не удалось удалить кампанию',
        });
    }
}