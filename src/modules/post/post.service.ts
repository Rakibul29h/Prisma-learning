import type {ICreatePostPayload} from "./post.interface";
import {prisma} from "../../lib/prisma";

// const getPosts = async (){
//
// }

const getSinglePost = async function(){

}

const createPost = async function(payload:ICreatePostPayload,userId:string){
    const result = await prisma.post.create({
        data:{
            ...payload,
            authorId:userId
        }
    });

    return result;
}

const deletePost = async function(){

}

const updatePost = async function(){

}

const getPostStat=async function(){

}
export const postService = {
    // getPosts,
    createPost,
    getSinglePost,
    deletePost,
    getPostStat,



}