import {Request, Response} from "express";
import {BlogInputDto} from "../../dto/blog.input-dto";
import {HttpStatus} from "../../../core/types/http-statuses";
import {createErrorMessages} from "../../../core/utils/error.utils";
import {blogInputDtoValidation} from "../../validation/blogInputDtoValidation";
import {blogsRepository} from "../../repositories/blogs.repository";
import {isValidId} from "../../../posts/validation/postInputDtoValidation";

export async function updateBlogHandler(req: Request<{id: string}, {}, BlogInputDto>, res: Response) {
    try {
        const id = req.params.id;
        if(!id || !isValidId(id)){
            res.status(HttpStatus.BadRequest).send(createErrorMessages([{field: "id", message: "Invalid id"}]));
            return;
        }
        const errors = blogInputDtoValidation(req.body);
        if (errors.length > 0) {
            res.status(HttpStatus.BadRequest).send(createErrorMessages(errors));
            return;
        }
        const blog = await blogsRepository.findBlogById(id);
        if(!blog){
            res.status(HttpStatus.NotFound).send(createErrorMessages([{ field: 'id', message: 'Blog not found' }]));
            return;
        }
        await blogsRepository.updateBlog(id, req.body);
        res.sendStatus(HttpStatus.NoContent);
    } catch (e: unknown) {
        res.status(HttpStatus.InternalServerError);
    }
}