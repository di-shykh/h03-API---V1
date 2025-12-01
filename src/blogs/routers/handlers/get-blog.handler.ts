import {Request, Response} from "express";
import {HttpStatus} from "../../../core/types/http-statuses";
import {createErrorMessages} from "../../../core/utils/error.utils";
import {blogsRepository} from "../../repositories/blogs.repository";
import {isValidId} from "../../../posts/validation/postInputDtoValidation";
import {mapToBlogViewModel} from "../mappers/map-to-blog-view-model.util";
import {WithId} from "mongodb";
import {Blog} from "../../types/blog";

export async function getBlogHandler(req: Request, res: Response) {
    try {
        const id = req.params.id;
        if(!id || !isValidId(id)){
            res.status(HttpStatus.NotFound).send(createErrorMessages([{field: "id", message: "Invalid id"}]));
            return;
        }
        const blog: WithId<Blog> | null = await blogsRepository.findBlogById(id);
        if(!blog){
            res.status(HttpStatus.NotFound).send(createErrorMessages([{field: "id", message: "Blog not found"}]));
            return;
        }
        const blogViewModel = mapToBlogViewModel(blog);
        res.status(HttpStatus.Ok).send(blogViewModel);
    } catch (e: unknown) {
        res.status(HttpStatus.InternalServerError);
    }
}
