import express from "express"
import mongoose from "mongoose"
import cors from 'cors'
import { registerValidation, loginValidation, campaignCreateValidation } from "./validations.js"
import { checkAuth, handleValidationErrors } from './utils/index.js'
import { UserController, CampaignController } from "./controllers/index.js"

mongoose
    .connect(process.env.MONGODB_URI)
    .then(() => { console.log("db ok") })
    .catch((err) => { console.log("DB error", err) })

const app = express()

app.use(express.json())
app.use(cors())
app.get('/', (req, res) => {
    res.send('U shouldn`t be here!')
})

app.post('/auth/login', loginValidation, handleValidationErrors, UserController.login);
app.post('/auth/register', registerValidation, handleValidationErrors, UserController.register);
app.get('/auth/me', checkAuth, UserController.getMe);

app.post('/campaigns', checkAuth, campaignCreateValidation, handleValidationErrors, CampaignController.create);
app.get('/campaigns', checkAuth, CampaignController.getAll);
app.get('/campaigns/:id', checkAuth, CampaignController.getOne);
app.patch('/campaigns/:id', checkAuth, campaignCreateValidation, handleValidationErrors, CampaignController.update);
app.delete('/campaigns/:id', checkAuth, CampaignController.remove);

const port = process.env.PORT || 4444
app.listen(port, (err) => {
    if (err) {
        console.log(err);
    }
    console.log('server ok')
}) 