export interface ReqBody {
    username: string;
    email: string;
    password: string;
  }
  
  export interface MailPayload {
    email: string;
    emailType: "VERIFY" | "RESET";
    UserId: string;
  }
  
  export interface UserType {
    username: string;
    email: string;
    password: string;
  }
  