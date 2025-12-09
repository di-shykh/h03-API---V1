import {ResourceType} from "../../../core/types/resource-type";

export type BlogDataOutput = {
    type: ResourceType.Blogs;
    id: string;
    attributes: {
        name: string;
        description: string;
        website: string;
        created_at: string;
        isMembership: boolean;
    }
}