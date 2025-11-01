import conf from "../conf/conf.js";
import { Client, Account, ID } from "appwrite";

export class AuthService {
  client;
  account;

  constructor() {
    this.client = new Client()
      .setEndpoint(conf.appwriteUrl) // ✅ https://cloud.appwrite.io/v1 or your custom endpoint
      .setProject(conf.appwriteProjectId); // ✅ Project ID from Appwrite console

    this.account = new Account(this.client);
  }

  // ✅ Create new user account and auto-login
  async createAccount({ email, password, name }) {
    try {
      const userAccount = await this.account.create(
        ID.unique(),
        email,
        password,
        name
      );

      // Auto login after account creation
      if (userAccount) {
        return await this.login({ email, password });
      }

      return userAccount;
    } catch (error) {
      console.error("Appwrite service :: createAccount() ::", error.message);
      throw error;
    }
  }

  // ✅ Login with email/password (safe session handling)
  async login({ email, password }) {
    try {
      const current = await this.getCurrentUser();
      if (current) {
        await this.logout(); // clear old session if exists
      }

      const session = await this.account.createEmailPasswordSession(
        email,
        password
      );

      return session;
    } catch (error) {
      console.error("Appwrite service :: login() ::", error.message);
      throw error;
    }
  }

  // ✅ Get currently logged-in user
  async getCurrentUser() {
    try {
      return await this.account.get();
    } catch (error) {
      console.warn("Appwrite service :: getCurrentUser() ::", error.message);
      return null; // fallback for guests
    }
  }

  // ✅ Logout user
  async logout() {
    try {
      await this.account.deleteSessions();
    } catch (error) {
      console.error("Appwrite service :: logout() ::", error.message);
    }
  }

  // ✅ Check if user is logged in (helper)
  async isLoggedIn() {
    const user = await this.getCurrentUser();
    return !!user;
  }
}

// Export a single instance
const authService = new AuthService();
export default authService;
