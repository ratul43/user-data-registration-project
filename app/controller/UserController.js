import Usermodel from "../model/usermodel.js";
import {EncodeToken} from "../utillity/tokenutility.js";
export const Registration = async(req, res) => {

    try{
        let reqBody = req.body;
        await Usermodel.create(reqBody)
        return res.json({status: "success", "Message": "User registered"});
    }
    catch(err){
        return res.json({status: "fail", "Message": err.toString()});
    }

}


export const Login = async(req, res) => {
    try{
        let reqBody = req.body;
        let data = await Usermodel.findOne(reqBody)
        if(data ===null){
            return res.json({status: "fail", "Message": "User not found"});
        }
        else{
            let token = EncodeToken(data['email'],data['_id']);
            return res.json({status: "success", Token: token, "Message": "User login successful"});

        }


    }
    catch(err){
        return res.json({status: "fail", "Message": err.toString()});
    }
}


export const ProfileDetails = async(req, res) => {
    try{
        let user_id = req.headers['user_id'];
        let data = await Usermodel.findOne({"_id": user_id})
        return res.json({status: "success", "Message": "User profile successful", Data: data});

    }
    catch(err){
        return res.json({status: "fail", "Message": err.toString()});
    }
}


export const AllUserProfile = async (req, res) => {
    try {

        let data = await Usermodel.find({});

        return res.json({
            status: "success",
            message: "All user profiles retrieved successfully",
            data: data
        });
    } catch (err) {
        // Handle any errors and return a fail response
        return res.json({
            status: "fail",
            message: err.toString()
        });
    }
};



export const ProfileUpdate = async(req, res) => {
    try{
        let reqBody = req.body;
        let user_id = req.headers['user_id'];
        await Usermodel.updateOne({"_id": user_id},reqBody)
        return res.json({status: "success", "Message": "User profile update successful"});

    }
    catch(err){
        return res.json({status: "fail", "Message": err.toString()});
    }
}


export const DeleteUser = async (req, res) => {
    try{
        let id = req.params.id;

        await Usermodel.deleteOne({"_id": id})
        return res.json({status: "success", "Message": "User deleted successful"});
    }
    catch (err) {
        return res.json({status: "fail", "Message": err.toString()});
    }

}











