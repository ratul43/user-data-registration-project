import express from 'express';
const router = express.Router();
import * as UserController from '../app/controller/UserController.js';
import Authmiddleware from "../app/middleware/authmiddleware.js";





// Users

router.post("/Registration", UserController.Registration);
router.post("/Login", UserController.Login);
router.get("/ProfileDetails", Authmiddleware, UserController.ProfileDetails);
router.get("/AllUserProfile", UserController.AllUserProfile);

router.post("/ProfileUpdate",Authmiddleware, UserController.ProfileUpdate);
router.get("/DeleteUser/:id/", Authmiddleware, UserController.DeleteUser);



export default router;

