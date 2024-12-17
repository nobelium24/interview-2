import { Transporter, createTransport } from "nodemailer";
import { PASSWORD_EMAIL, EMAIL } from "../../core/constants/index";
import { compile } from "handlebars";
import { join } from "path";
import { existsSync, readFileSync } from "fs";

export class MailerService {
    private transporter: Transporter;

    constructor() {
        this.transporter = createTransport({
            service: "gmail",
            auth: {
                user: EMAIL,
                pass: PASSWORD_EMAIL
            }
        });
    }

    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    private async getTemplate(templateName: string, context: any): Promise<string> {
        const templatePath = join(__dirname, "../../../templates", `${templateName}.hbs`);
        const templateExists = existsSync(templatePath);

        if (!templateExists) {
            throw new Error(`Template ${templateName} not found at path ${templatePath}`);
        }

        const templateContent = readFileSync(templatePath, "utf8");
        const template = compile(templateContent);
        return template(context);
    }



    sendConfirmationCode = async (email: string, code: string, name: string): Promise<{ success: boolean, message: string }> => {
        try {
            const html = await this.getTemplate("userVerification", { name, code });

            const test = await this.transporter.sendMail({
                from: EMAIL,
                to: email,
                subject: "Account Verification Email",
                html
            });
            console.log(test)
            return { success: true, message: "Email sent successfully." };
        } catch (error) {
            console.error(error);
            throw error;
        }
    }

}