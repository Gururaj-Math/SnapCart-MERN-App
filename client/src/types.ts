export interface User {
   _id: string;
   username: string;
   email: string;
   password: string;
   avatar?: string;
   coverImage?: string;
   refreshToken?: string;
   followers: string[];
   following: string[];
   savedPosts: string[];
   bio?: string;
   links?: string[];
   location?: string;
   likedPosts: string[];
   createdAt: Date;
   updatedAt: Date;
}

export interface Post {
   _id: string;
   title: string;
   description: string;
   image?: string;
   likes: number;
   tags: string[];
   userOwner: string;
   createdAt: Date;
   updatedAt: Date;
}

export interface Note {
   _id: string;
   description: string;
   userOwner: string;
   createdAt: Date;
   updatedAt: Date;
}
