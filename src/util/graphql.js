import {gql} from "@apollo/client";

export const CREATE_POST = gql`
    mutation CreatePost($body: String!){
        createPost(body: $body){
            username
            body
            createdAt
            likeCount
            commentCount
            id
            comments {
                username
            }
            likes {
                username
            }
        }
    }
`

export const GET_POSTS = gql`
    query getPosts {
        getPosts {
            username
            id
            body
            likeCount
            createdAt
            commentCount
            comments {
                id
                createdAt
                username
            }
            likes {
                username
                id
                createdAt
            }
        }
    }
`

export const DELETE_POST = gql`
    mutation DeletePost($postId: ID!){
        deletePost(postId: $postId){
            id
        }
    }
`

export const LIKE_POST = gql`
    mutation LikePost($postId: ID!){
        likePost(postId: $postId){
            username
            id
            body
            likeCount
            createdAt
            commentCount
            comments {
                id
                createdAt
                username
            }
            likes {
                username
                id
                createdAt
            }
        }
    }
`