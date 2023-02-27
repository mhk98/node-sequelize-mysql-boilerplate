const nodemailer = require('nodemailer');
module.exports = {
    sendMail: async (mailAddress, mailerName, mailerMessage, mailerPhone, mailersubject) => {
        try {
            const transport = nodemailer.createTransport({
                host: "mail.arifmannan.com",
                port: 465,
                secure: true, // true for 465, false for other ports
                auth: {
                    user: "nubprojectmanagementsystem@arifmannan.com", // generated ethereal user
                    pass: "19971220arifN", // generated ethereal password
                },
            });
            const mailOptions = {
                from: 'NUB Support Team <mohsinkabirseo@gmail.com>',
                to: mailAddress,
                name: mailerName,
                phone: mailerPhone,
                subject: mailersubject,
                text: mailerMessage,
            };
            const result = await transport.sendMail(mailOptions);
            return result;
        } catch (error) {
            return error;
        }
    }
}












