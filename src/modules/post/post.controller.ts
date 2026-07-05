import type {Request, Response} from "express";
import {postService} from "./post.service";
import {sendResponse} from "../../Utils/sendResponse";

const getPosts = async (req: Request, res: Response) => {

}

const getPostStats = async (req: Request, res: Response) => {

}

const myPost = async (req: Request, res: Response) => {

}

const getSinglePost = async (req: Request, res: Response) => {

}
const createPost = async (req: Request, res: Response) => {
    const id = req.user?.id as string;
    const payload=req.body;
    const result = await postService.createPost(payload,id);

    sendResponse(res,{
        success:true,
        statusCode:201,
        message:"Post created Successfully",
        data:result,
    })
}
const updatePost = async (req: Request, res: Response) => {

}
const deletePost = async (req: Request, res: Response) => {

}

export const postController = {
    getPosts,
    getPostStats,
    myPost,
    createPost,
    updatePost,
    deletePost,
    getSinglePost,
}