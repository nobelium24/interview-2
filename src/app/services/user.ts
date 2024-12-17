import { AppDataSource } from '../../ormConfig';
import UserModel from '../model/user';
import { User } from '../../core/types/user';
import { Logger } from '../../core/utils/logger';

export default class UserService {
    private userRepo = AppDataSource.getRepository(UserModel);

    async createUser(userData: Partial<User>): Promise<UserModel> {
        const user = this.userRepo.create({
            ...userData,
            confirmationToken: this.generateConfirmationToken(),
            isConfirmed: false,
        });
        const newUser = await this.userRepo.save(user);
        Logger.info(`User signed up: ${newUser.email}`);
        return newUser;
    }

    async getUserByEmail(email: string): Promise<UserModel | null> {
        return await this.userRepo.findOne({ where: { email } });
    }   

    async confirmEmail(email: string): Promise<UserModel | null> {
        const user = await this.userRepo.findOne({ where: { email } });
        if (user) {
            user.isConfirmed = true;
            user.confirmationToken = null;
            return await this.userRepo.save(user);
        }
        return null;
    }

    private generateConfirmationToken(): string {
        return Math.random().toString(36).substr(2, 12);
    }

    async getUsers(): Promise<UserModel[]> {
        return await this.userRepo.find();
    }

    async deleteUser(userId: string): Promise<void> {
        await this.userRepo.delete(userId);
    }
}
