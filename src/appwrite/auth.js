import conf from "../conf/conf.js";
import { Client, Account, ID } from "appwrite";

export class AuthService {
    client;
    account;

    constructor() {
        this.client = new Client()
            .setEndpoint(conf.appwriteUrl)
            .setProject(conf.appwriteProjectId);

        this.account = new Account(this.client);
    }

    // Create new user account
    async createAccount({ email, password, name }) {
        try {
            const userAccount = await this.account.create(
                ID.unique(),
                email,
                password,
                name
            );

            // Only login automatically if account was successfully created
            if (userAccount) {
                return await this.login({ email, password });
            }
            return userAccount;
        } catch (error) {
            console.error("Appwrite service :: createAccount() ::", error.message);
            throw error;
        }
    }

    // Login user
    async login({ email, password }) {
        try {
            return await this.account.createEmailPasswordSession(email, password);
        } catch (error) {
            console.error("Appwrite service :: login() ::", error.message);
            throw error;
        }
    }

    // Get current logged-in user
    async getCurrentUser() {
        try {
            return await this.account.get();
        } catch (error) {
            console.error("Appwrite service :: getCurrentUser() ::", error.message);
            return null;
        }
    }

    // Logout user
    async logout() {
        try {
            await this.account.deleteSessions();
        } catch (error) {
            console.error("Appwrite service :: logout() ::", error.message);
        }
    }
}

const authService = new AuthService();
export default authService;
