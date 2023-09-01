import express from "express";
import { FriendBusiness } from "../../business/FriendBusiness"
import { FriendDatabase } from "../../data/mySQL/FriendDatabase"
import { FriendController } from "../FriendController"


export const friendRouter = express.Router()



const friendDatabase = new FriendDatabase()

const friendBusiness = new FriendBusiness(friendDatabase)

const friendController = new FriendController(friendBusiness)


friendRouter.post("/create", (req, res) => friendController.createFriend(req, res))

friendRouter.delete("/unfriend/:id", (req, res) => friendController.unFriend(req, res))