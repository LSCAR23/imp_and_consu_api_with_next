import axios from 'axios';

const API_URL = process.env.NEXT_PUBLIC_API_URL

export const fetchPosts = async () => {
    const response = await axios.get(API_URL);
    return response.data;
};

export const createPost = async (post) => {
    const response = await axios.post(API_URL, post);
    return response.data;
};

export const updatePost = async (post) => {
    const response = await axios.patch(`${API_URL}/${post.id}`, post);
    return response.data;
};

export const deletePost = async (postId) => {
    const response = await axios.delete(`${API_URL}/${postId}`);
    return response.data;
};
