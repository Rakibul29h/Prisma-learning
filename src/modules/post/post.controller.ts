import type {Request, Response} from "express";
import {postService} from "./post.service";
import {sendResponse} from "../../Utils/sendResponse";
import {catchAsync} from "../../Utils/catchAsync";

const getPosts = catchAsync(async (req: Request, res: Response) => {
    const posts= await postService.getPosts();
    sendResponse(res,{
        success:true,
        statusCode:200,
        message:"Posts retried successfully",
        data:posts
    })
})

const getPostStats = async (req: Request, res: Response) => {

}

const myPost = async (req: Request, res: Response) => {

    const authorId=req.user?.id ;
    const posts= await postService.getMyPosts(authorId as string);

    sendResponse(res,{
        success:true,
        statusCode:200,
        message:" My Posts retried successfully",
        data:posts
    })
}

const getSinglePost = catchAsync(async (req: Request, res: Response) => {

    const postId=req.params.postId;

    if(!postId)
    {
        throw new Error("postId is required");
    }
    const post= await   postService.getSinglePost(postId as string);

    sendResponse(res,{
        success:true,
        statusCode:200,
        message:"Post retried successfully",
        data:post
    })
})
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