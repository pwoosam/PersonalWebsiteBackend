import { Route, Post, Body, SuccessResponse, Controller, Example } from "tsoa";
import { Email } from "../models/email";
import { sendEmail } from "../utilities";

@Route('email')
export class EmailController extends Controller {
    @SuccessResponse('200', 'Success')
    @Post('send')
    public send(
        @Body()
        @Example<Email>({
            name: "John Smith",
            fromEmail: "test@testemailprovider.com",
            body: "Hi Patrick, nice to meet you!"
        })
        email: Email) {
        try {
            sendEmail(email);
        } catch (error) {
            this.setStatus(400);
            return error;
        }

        this.setStatus(200);
    }
}