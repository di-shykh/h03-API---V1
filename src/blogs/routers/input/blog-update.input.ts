import {ResourceType} from "../../../core/types/resource-type";
import {BlogAttributes} from "../../application/dto/blog-attributes";

export type BlogUpdateInput = {
    data: {
        type: ResourceType.Blogs;
        id: string;
        attributes: BlogAttributes;
    }
}