import conf from "../conf/conf"
import { Client, Databases, Storage, Query, ID, Account } from "appwrite"

export class Service {
  client = new Client()
  databases
  bucket

  constructor() {
    this.client.setEndpoint(conf.appwriteUrl).setProject(conf.appwriteProjectId)
    this.databases = new Databases(this.client)
    this.bucket = new Storage(this.client)
  }

  // Validation helpers
  validateUserId(userid) {
    const regex = /^[a-zA-Z0-9][a-zA-Z0-9._-]{0,35}$/
    return regex.test(userid)
  }

  validateSlug(slug) {
    const regex = /^[a-zA-Z0-9][a-zA-Z0-9._-]{0,35}$/
    return regex.test(slug)
  }

  // Get a single post by slug field
  async getPost(slug) {
    try {
      if (!this.validateSlug(slug)) throw new Error("Invalid slug format.")
      const result = await this.databases.listDocuments(
        conf.appwriteDatabaseId,
        conf.appwriteCollectionId,
        [Query.equal("slug", slug)]
      )
      return result.documents?.[0] || false
    } catch (error) {
      console.log("Appwrite service :: getPost() ::", error.message)
      return false
    }
  }

  // Get a single post by document ID
  async getPostById(postId) {
    try {
      if (!postId) throw new Error("Post ID is required.")
      return await this.databases.getDocument(
        conf.appwriteDatabaseId,
        conf.appwriteCollectionId,
        postId
      )
    } catch (error) {
      console.log("Appwrite service :: getPostById() ::", error.message)
      return false
    }
  }

  // Get all active posts
  async getPosts(queries = [Query.equal("status", "active")]) {
    try {
      return await this.databases.listDocuments(
        conf.appwriteDatabaseId,
        conf.appwriteCollectionId,
        queries
      )
    } catch (error) {
      console.log("Appwrite service :: getPosts() ::", error.message)
      return false
    }
  }

  async createPost({ title, content, featuredimage, status, userid, slug }) {
  try {
    if (!this.validateUserId(userid)) throw new Error("Invalid userid format.")

    const payload = {
      title,
      content,
      featuredimage,
      status,
      userid
    }

    // Only include slug if your schema has it
    if (slug) payload.slug = slug

    return await this.databases.createDocument(
      conf.appwriteDatabaseId,
      conf.appwriteCollectionId,
      ID.unique(),
      payload
    )
  } catch (error) {
    console.log("Appwrite service :: createPost() ::", error.message)
    return false
  }
}

  // Update post by document ID
  async updatePost(postId, { title, slug, content, featuredimage, status }) {
    try {
      return await this.databases.updateDocument(
        conf.appwriteDatabaseId,
        conf.appwriteCollectionId,
        postId,
        { title, slug, content, featuredimage, status }
      )
    } catch (error) {
      console.log("Appwrite service :: updatePost() ::", error.message)
      return false
    }
  }

  // Delete post by document ID
  async deletePost(postId) {
    try {
      await this.databases.deleteDocument(
        conf.appwriteDatabaseId,
        conf.appwriteCollectionId,
        postId
      )
      return true
    } catch (error) {
      console.log("Appwrite service :: deletePost() ::", error.message)
      return false
    }
  }

  // Upload image file
  async uploadFile(file) {
    try {
      return await this.bucket.createFile(conf.appwriteBucketId, ID.unique(), file)
    } catch (error) {
      console.log("Appwrite service :: uploadFile() ::", error.message)
      return false
    }
  }

  // Delete image file
  async deleteFile(fileId) {
    try {
      return await this.bucket.deleteFile(conf.appwriteBucketId, fileId)
    } catch (error) {
      console.log("Appwrite service :: deleteFile() ::", error.message)
      return false
    }
  }

  // Get image preview URL
  getFilePreview(fileId) {
    try {
      if (!fileId) {
        console.warn("getFilePreview: fileId is missing")
        return null
      }
      
      // Try getFilePreview first (for resized/preview images)
      let preview = this.bucket.getFilePreview(conf.appwriteBucketId, fileId)
      
      // If preview is null or undefined, try getFileView (for original file)
      if (!preview) {
        console.log("getFilePreview returned null, trying getFileView...")
        preview = this.bucket.getFileView(conf.appwriteBucketId, fileId)
      }
      
      // Appwrite methods return a URL object, access .href or .toString()
      if (preview) {
        const url = typeof preview === 'string' 
          ? preview 
          : (preview.href || preview.toString() || String(preview))
        console.log("Generated preview URL:", url, "for fileId:", fileId)
        return url
      }
      
      console.warn("No preview URL available for fileId:", fileId)
      return null
    } catch (error) {
      console.error("Appwrite service :: getFilePreview() ::", error.message, error)
      return null
    }
  }

  // Get current user (with error handling)
  async getCurrentUser() {
    try {
      const account = new Account(this.client)
      return await account.get()
    } catch (error) {
      console.log("Appwrite service :: getCurrentUser() ::", error.message)
      return false
    }
  }
}

const service = new Service()
export default service