import nodemailer from "nodemailer";

const sendMAil = async (to, msg, htmls, subject) => {
  try {
    console.log("sending email");
    // let testAccount = await nodemailer.createTestAccount();
    const transporter = nodemailer.createTransport({
      host: "smtp.office365.com",
      port: 587,
      secure: false, // Use `true` for port 465, `false` for all other ports
      auth: {
        user: "info@tealclimate.com",
        pass: "lnvxlmktwmtjtpmh",
      },
    });

    const info = await transporter.sendMail({
      from: '"TEAL-Climate 👻" <info@tealclimate.com>', // sender address

      to: to, // list of receivers
      subject: subject, // Subject line
      text: msg, // plain text body
      html: htmls, // html body
    });
    console.log("Message sent: %s", info.messageId);

    // resp.json(info);
  } catch (error) {
    console.log("error send email==>", error);
    // resp.json({ msgs: "error send mail" });
  }
};

export { sendMAil };
