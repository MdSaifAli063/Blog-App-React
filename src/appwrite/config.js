import conf from "../conf/conf";
import { Client, Databases, Storage, Query, ID } from "appwrite";

export class Service {
    client = new Client();
    databases;
    bucket;

    constructor() {
        this.client
            .setEndpoint(conf.appwriteUrl)
            .setProject(conf.appwriteProjectId);
        this.databases = new Databases(this.client);
        this.bucket = new Storage(this.client);
    }

    validateUserId(userId) {
        const regex = /^[a-zA-Z0-9][a-zA-Z0-9._-]{0,35}$/;
        return regex.test(userId);
    }

    validateSlug(slug) {
        const regex = /^[a-zA-Z0-9][a-zA-Z0-9._-]{0,35}$/;
        return regex.test(slug);
    }

    async getPost(slug) {
        try {
            if (!this.validateSlug(slug)) throw new Error("Invalid slug format.");
            return await this.databases.getDocument(conf.appwriteDatabaseId, conf.appwriteCollectionId, slug);
        } catch (error) {
            console.log("Appwrite service :: getPost() ::", error.message);
            return false;
        }
    }

    async getPosts(queries = [Query.equal("status", "active")]) {
        try {
            return await this.databases.listDocuments(conf.appwriteDatabaseId, conf.appwriteCollectionId, queries);
        } catch (error) {
            console.log("Appwrite service :: getPosts() ::", error.message);
            return false;
        }
    }

    async createPost({ title, slug, content, featuredImage, status, userId }) {
        try {
            if (!this.validateUserId(userId)) throw new Error("Invalid userId format.");
            if (!this.validateSlug(slug)) throw new Error("Invalid slug format.");

            return await this.databases.createDocument(
                conf.appwriteDatabaseId,
                conf.appwriteCollectionId,
                slug,
                { title, content, featuredImage, status, userId }
            );
        } catch (error) {
            console.log("Appwrite service :: createPost() ::", error.message);
            return false;
        }
    }

    async updatePost(slug, { title, content, featuredImage, status }) {
        try {
            if (!this.validateSlug(slug)) throw new Error("Invalid slug format.");

            return await this.databases.updateDocument(
                conf.appwriteDatabaseId,
                conf.appwriteCollectionId,
                slug,
                { title, content, featuredImage, status }
            );
        } catch (error) {
            console.log("Appwrite service :: updateDocument() ::", error.message);
            return false;
        }
    }

    async deletePost(slug) {
        try {
            if (!this.validateSlug(slug)) throw new Error("Invalid slug format.");

            await this.databases.deleteDocument(conf.appwriteDatabaseId, conf.appwriteCollectionId, slug);
            return true;
        } catch (error) {
            console.log("Appwrite service :: deleteDocument() ::", error.message);
            return false;
        }
    }

    async uploadFile(file) {
        try {
            return await this.bucket.createFile(conf.appwriteBucketId, ID.unique(), file);
        } catch (error) {
            console.log("Appwrite service :: uploadFile() ::", error.message);
            return false;
        }
    }

    async deleteFile(fileId) {
        try {
            return await this.bucket.deleteFile(conf.appwriteBucketId, fileId);
        } catch (error) {
            console.log("Appwrite service :: deleteFile() ::", error.message);
            return false;
        }
    }

    getFilePreview(fileId) {
        return this.bucket.getFilePreview(conf.appwriteBucketId, fileId).href;
    }
}

const service = new Service();
export default service;