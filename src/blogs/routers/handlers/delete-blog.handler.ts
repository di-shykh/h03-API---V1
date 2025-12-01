import {Request, Response} from "express";
import {HttpStatus} from "../../../core/types/http-statuses";
import {createErrorMessages} from "../../../core/utils/error.utils";
import {blogsRepository} from "../../repositories/blogs.repository";
import {isValidId} from "../../../posts/validation/postInputDtoValidation";
import {postsRepository} from "../../../posts/repositories/posts.repository";
import {WithId} from "mongodb";
import {Post} from "../../../posts/types/post";

export async function deleteBlogHandler(req: Request, res: Response): Promise<void> {
    try {
        const id = req.params.id;
        if(!id || !isValidId(id)){
            res.status(HttpStatus.NotFound).send(createErrorMessages([{field: "id", message: "Invalid id"}]));
            return;
        }
        const blog = await blogsRepository.findBlogById(id);
        if(!blog){
            res.status(HttpStatus.NotFound).send(createErrorMessages([{field: "id", message: "Blog not found"}]));
            return;
        }
        const postsWithBlogId: WithId<Post>[] | null = await postsRepository.findPostsByBlogId(id);
        if(postsWithBlogId && postsWithBlogId.length > 0){
            await Promise.all(postsWithBlogId.map( (post: WithId<Post>) => {
                postsRepository.deletePost(post._id.toString())
            }))
        }
        await blogsRepository.deleteBlog(id);
        res.sendStatus(HttpStatus.NoContent);
    } catch (e: unknown) {
        res.sendStatus(HttpStatus.InternalServerError);
    }
}