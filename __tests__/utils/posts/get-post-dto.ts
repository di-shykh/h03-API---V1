import {PostInputDto} from "../../../src/posts/dto/post.input-dto";

export function getPostDto(blogId: string): PostInputDto {
    return {
        title: "Post name",
        shortDescription: "Post description",
        content: "dfkdsghjdsfhglsdhgjsfdhlgks",
        blogId: blogId,
    }
}
