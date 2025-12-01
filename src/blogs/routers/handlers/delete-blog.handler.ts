import {Request, Response} from "express";
import {HttpStatus} from "../../../core/types/http-statuses";
import {createErrorMessages} from "../../../core/utils/error.utils";
import {blogsRepository} from "../../repositories/blogs.repository";
import {isValidId} from "../../../posts/validation/postInputDtoValidation";
import {postsRepository} from "../../../posts/repositories/posts.repository";

export async function deleteBlogHandler(req: Request, res: Response): Promise<void> {
    const id = req.params.id;
    if(!id || !isValidId(id)){
        res.status(HttpStatus.NotFound).send(createErrorMessages([{field: "id", message: "Invalid id"}]));
        return;
    }
    const postsWithBlogId = await postsRepository.findPostsByBlogId(id);
    if(postsWithBlogId){

    }
    const blog = await blogsRepository.findBlogById(id);
    if(!blog){
        res.status(HttpStatus.NotFound).send(createErrorMessages([{field: "id", message: "Blog not found"}]));
        return;
    }
    blogsRepository.deleteBlog(id);
    res.sendStatus(HttpStatus.NoContent);
}