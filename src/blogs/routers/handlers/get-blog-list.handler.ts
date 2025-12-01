import {Request, Response} from "express";
import {HttpStatus} from "../../../core/types/http-statuses";
import {blogsRepository} from "../../repositories/blogs.repository";
import {mapToBlogViewModel} from "../mappers/map-to-blog-view-model.util";
import {WithId} from "mongodb";
import {Blog} from "../../types/blog";

export async function getBlogListHandler(req: Request, res: Response) {
    try {
        const blogs: WithId<Blog>[] = await blogsRepository.findAllBlogs();
        const blogViewModels = blogs.map(mapToBlogViewModel);
        res.status(HttpStatus.Ok).send(blogViewModels);
    } catch (error: unknown) {
        res.status(HttpStatus.InternalServerError);
    }
}