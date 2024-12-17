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
const admin_1 = __importDefault(require("../model/admin"));
const logger_1 = require("../../core/utils/logger");
const ormConfig_1 = require("../../ormConfig");
const argon2_1 = __importDefault(require("argon2"));
class AdminService {
    constructor() {
        this.adminRepo = ormConfig_1.AppDataSource.getRepository(admin_1.default);
    }
    // Create Default Admin Seeder
    createDefaultAdmin() {
        return __awaiter(this, void 0, void 0, function* () {
            const existingAdmin = yield this.adminRepo.findOne({ where: { email: 'default@admin.com' } });
            const hashedPassword = yield argon2_1.default.hash('password');
            if (!existingAdmin) {
                const admin = this.adminRepo.create({
                    firstName: 'nobelium24',
                    lastName: 'admin',
                    email: 'default@admin.com',
                    password: hashedPassword,
                    isSuperAdmin: true,
                });
                yield this.adminRepo.save(admin);
                logger_1.Logger.info('Default admin created.');
                return admin;
            }
            logger_1.Logger.info('Default admin already exists.');
            return existingAdmin;
        });
    }
    // Add Admin by Another Admin
    addAdmin(adminData) {
        return __awaiter(this, void 0, void 0, function* () {
            const admin = this.adminRepo.create(adminData);
            return yield this.adminRepo.save(admin);
        });
    }
    // Get All Admins
    getAdmins() {
        return __awaiter(this, void 0, void 0, function* () {
            return yield this.adminRepo.find();
        });
    }
    // Get Admin by ID
    getAdminById(adminId) {
        return __awaiter(this, void 0, void 0, function* () {
            return yield this.adminRepo.findOne({ where: { id: adminId } });
        });
    }
    getAdminByEmail(email) {
        return __awaiter(this, void 0, void 0, function* () {
            return yield this.adminRepo.findOne({ where: { email } });
        });
    }
    // Delete Admin
    deleteAdmin(adminId) {
        return __awaiter(this, void 0, void 0, function* () {
            yield this.adminRepo.delete(adminId);
        });
    }
}
exports.default = AdminService;
//# sourceMappingURL=admin.js.map