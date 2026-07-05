import type {ICreatePostPayload} from "./post.interface";
import {prisma} from "../../lib/prisma";

const getPosts = async ()=>{
    const posts= await prisma.post.findMany({
        include:{
            author:{
                omit:{
                    password:true
                }
            },
            commnets:true,
        }
    })
    return posts;
}

const getSinglePost = async function(postId:string){


    const post = await prisma.post.findUniqueOrThrow({
        where:{
            id:postId
        }
    })

    const updatedPost = await prisma.post.update({
        where:{
            id:postId,
        },
        data:{
            views:{
                increment:1
            }
        },
        include:{
            author:{
                omit:{
                    password:true
                }
            },
            commnets:true,
        }
    })
    return updatedPost;
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


const getMyPosts = async (authorId:string)=>{
    const posts = await prisma.post.findMany({
        where:{
            authorId:authorId,
        },
        orderBy:{
            createdAt:"desc"
        },
        include:{
            commnets:true,
            author:{
                omit:{
                    password:true
                }
            },
           _count:{
                select:{
                    commnets:true
                }
           }
        }
    })
    return posts;

}
const deletePost = async function(){

}

const updatePost = async function(){

}

const getPostStat=async function(){

}
export const postService = {
    getPosts,
    createPost,
    getSinglePost,
    deletePost,
    getPostStat,
    getMyPosts


}