import argon2 from 'argon2';
import { AppDataSource } from '../ormConfig'; // Path to your data source
import AdminModel from '../app/model/admin'; // Adjust the path to your admin model

async function seedAdmin() {
    try {
        // Initialize the database connection
        await AppDataSource.initialize();

        // Hash the password before storing it
        const hashedPassword = await argon2.hash('password');

        // Create a new admin entity
        const admin = new AdminModel();
        admin.firstName = 'nobelium24';
        admin.lastName = 'admin';
        admin.email = 'ogunbaja24@gmail.com';
        admin.password = hashedPassword;
        admin.isSuperAdmin = true;

        // Save the admin entity to the database
        const adminRepository = AppDataSource.getRepository(AdminModel);
        await adminRepository.save(admin);

        console.log('Admin user seeded successfully.');
        process.exit(0);
    } catch (error) {
        console.error('Error seeding admin user:', error);
        process.exit(1);
    }
}

seedAdmin();
