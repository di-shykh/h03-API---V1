import {Request, Response} from "express";
import {BlogInputDto} from "../../dto/blog.input-dto";
import {HttpStatus} from "../../../core/types/http-statuses";
import {createErrorMessages} from "../../../core/utils/error.utils";
import {blogInputDtoValidation} from "../../validation/blogInputDtoValidation";
import {Blog} from "../../types/blog";
import {blogsRepository} from "../../repositories/blogs.repository";
import {mapToBlogViewModel} from "../mappers/map-to-blog-view-model.util";

export async function createBlogHandler(req: Request<{},{},BlogInputDto>, res: Response) {
    try{
        const errors = blogInputDtoValidation(req.body);
        if (errors.length > 0) {
            res.status(HttpStatus.BadRequest).send(createErrorMessages(errors));
            return;
        }
        const newBlog: Blog = {
            name: req.body.name,
            description: req.body.description,
            websiteUrl: req.body.websiteUrl,
            createdAt: new Date().toISOString(),
            isMembership: false,
        };
        const createdBlog = await blogsRepository.createBlog(newBlog);
        const blogViewModel = mapToBlogViewModel(createdBlog);
        res.status(HttpStatus.Created).send(blogViewModel);
    } catch(err: unknown){
        res.sendStatus(HttpStatus.InternalServerError);
    }
}
