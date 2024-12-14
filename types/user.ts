export interface User {
   name: string;
   surname: string;
   email: string;
   password: string;
   username: string;
   profileImage: string | null;
   authProvider: "local" | "google";
   createdAt: Date;
   updatedAt: Date;
   status: boolean;
   verificationCode?: string;
   verificationExpiry?: Date;
   verifyCodeLimit: number;
   refreshToken: string | null;
}
