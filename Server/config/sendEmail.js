import { sendEmail } from "./emailService.js";

const sendEmailFun = async ({ sendTo, subject, text, html }) => {
    const result = await sendEmail(sendTo, subject, text, html);
    if (result.success) {
        return { success: true, messageId: result.messageId };
    } else {
        return { success: false, error: result.error || 'send_failed' };
    }
};

export default sendEmailFun;