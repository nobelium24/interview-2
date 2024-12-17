"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const argon2_1 = __importDefault(require("argon2"));
const ormConfig_1 = require("../ormConfig"); // Path to your data source
const admin_1 = __importDefault(require("../app/model/admin")); // Adjust the path to your admin model
function seedAdmin() {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            // Initialize the database connection
            yield ormConfig_1.AppDataSource.initialize();
            // Hash the password before storing it
            const hashedPassword = yield argon2_1.default.hash('password');
            // Create a new admin entity
            const admin = new admin_1.default();
            admin.firstName = 'nobelium24';
            admin.lastName = 'admin';
            admin.email = 'ogunbaja24@gmail.com';
            admin.password = hashedPassword;
            admin.isSuperAdmin = true;
            // Save the admin entity to the database
            const adminRepository = ormConfig_1.AppDataSource.getRepository(admin_1.default);
            yield adminRepository.save(admin);
            console.log('Admin user seeded successfully.');
            process.exit(0);
        }
        catch (error) {
            console.error('Error seeding admin user:', error);
            process.exit(1);
        }
    });
}
seedAdmin();
//# sourceMappingURL=adminSeeder.js.map