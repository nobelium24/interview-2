import AdminModel from '../model/admin';
import { Admin } from '../../core/types/admin';
import { Logger } from '../../core/utils/logger';
import { AppDataSource } from '../../ormConfig';
import argon2 from "argon2"

export default class AdminService {
    private adminRepo = AppDataSource.getRepository(AdminModel);

    // Create Default Admin Seeder
    async createDefaultAdmin(): Promise<AdminModel> {
        const existingAdmin = await this.adminRepo.findOne({ where: { email: 'default@admin.com' } });
        const hashedPassword = await argon2.hash('password');
        if (!existingAdmin) {
            const admin = this.adminRepo.create({
                firstName: 'nobelium24',
                lastName: 'admin',
                email: 'default@admin.com',
                password: hashedPassword,
                isSuperAdmin: true,
            });
            await this.adminRepo.save(admin);
            Logger.info('Default admin created.');
            return admin;
        }
        Logger.info('Default admin already exists.');
        return existingAdmin;
    }

    // Add Admin by Another Admin
    async addAdmin(adminData: Partial<Admin>): Promise<AdminModel> {
        const admin = this.adminRepo.create(adminData);
        return await this.adminRepo.save(admin);
    }

    // Get All Admins
    async getAdmins(): Promise<AdminModel[]> {
        return await this.adminRepo.find();
    }

    // Get Admin by ID
    async getAdminById(adminId: string): Promise<AdminModel | null> {
        return await this.adminRepo.findOne({ where: { id: adminId } });
    }

    async getAdminByEmail(email: string): Promise<AdminModel | null> {
        return await this.adminRepo.findOne({ where: { email } });
    }

    // Delete Admin
    async deleteAdmin(adminId: string): Promise<void> {
        await this.adminRepo.delete(adminId);
    }
}
