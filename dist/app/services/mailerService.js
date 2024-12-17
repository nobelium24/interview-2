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
Object.defineProperty(exports, "__esModule", { value: true });
exports.MailerService = void 0;
const nodemailer_1 = require("nodemailer");
const index_1 = require("../../core/constants/index");
const handlebars_1 = require("handlebars");
const path_1 = require("path");
const fs_1 = require("fs");
class MailerService {
    constructor() {
        this.sendConfirmationCode = (email, code, name) => __awaiter(this, void 0, void 0, function* () {
            try {
                const html = yield this.getTemplate("userVerification", { name, code });
                const test = yield this.transporter.sendMail({
                    from: index_1.EMAIL,
                    to: email,
                    subject: "Account Verification Email",
                    html
                });
                console.log(test);
                return { success: true, message: "Email sent successfully." };
            }
            catch (error) {
                console.error(error);
                throw error;
            }
        });
        this.transporter = (0, nodemailer_1.createTransport)({
            service: "gmail",
            auth: {
                user: index_1.EMAIL,
                pass: index_1.PASSWORD_EMAIL
            }
        });
    }
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    getTemplate(templateName, context) {
        return __awaiter(this, void 0, void 0, function* () {
            const templatePath = (0, path_1.join)(__dirname, "../../../templates", `${templateName}.hbs`);
            const templateExists = (0, fs_1.existsSync)(templatePath);
            if (!templateExists) {
                throw new Error(`Template ${templateName} not found at path ${templatePath}`);
            }
            const templateContent = (0, fs_1.readFileSync)(templatePath, "utf8");
            const template = (0, handlebars_1.compile)(templateContent);
            return template(context);
        });
    }
}
exports.MailerService = MailerService;
//# sourceMappingURL=mailerService.js.map