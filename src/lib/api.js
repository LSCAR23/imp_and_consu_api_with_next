import axios from 'axios';

const API_URL = process.env.NEXT_PUBLIC_API_URL;

export const fetchPosts = async () => {
    const response = await axios.get(API_URL);
    return response.data;
};

export const createPost = async (post) => {
    const response = await axios.post(API_URL, {
        title: post.title,
        body: post.body,
        userId: 1
    }, {
        headers: {
            'Content-Type': 'application/json; charset=UTF-8',
        },
    });
    return response.data;
};

export const updatePost = async (post) => {
    const response = await axios.patch(`${API_URL}/${post.id}`, {
        title: post.title,
        body: post.body,
    }, {
        headers: {
            'Content-Type': 'application/json; charset=UTF-8',
        },
    });
    return response.data;
};

export const deletePost = async (postId) => {
    const response = await axios.delete(`${API_URL}/${postId}`);
    return response.data;
};
