import { createTransport } from "nodemailer";
import { Injectable } from "@nestjs/common";
import { IMail } from "./mail.interface";


@Injectable()
export class MailService {

  private transporter;
  constructor() {
    this.transporter = createTransport({
      host: "smtp-relay.sendinblue.com",
      port: 587,
      secure: false,
      auth: {
        user: 'mecloud.manage@gmail.com',
        pass: '92bvZyCzx3QdNWqO',
      }
    })
  }

  async sendMail({from, to, subject, text, html}: IMail) {
    return await this.transporter.sendMail({
      from, to, subject, text, html
    })
      .info
  }
}