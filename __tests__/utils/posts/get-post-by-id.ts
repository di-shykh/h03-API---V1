import request from 'supertest';
import { Express } from 'express';
import { HttpStatus } from '../../../src/core/types/http-statuses';
import {POSTS_PATH} from '../../../src/core/paths/paths';
import { generateBasicAuthToken } from '../generate-admin-auth-token';
import { PostViewModel } from '../../../src/posts/types/post-view-model';

export async function getPostById(
    app: Express,
    postId: string,
): Promise<PostViewModel> {
    const postResponse = await request(app)
        .get(`${POSTS_PATH}/${postId}`)
        .set('Authorization', generateBasicAuthToken())
        .expect(HttpStatus.Ok);

    return postResponse.body;
}