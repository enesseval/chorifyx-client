export interface User {
   id: string; // UUID
   name: string;
   surname: string;
   email: string;
   username: string;
   isVerified: boolean;
   verificationAttempts: number;
   verificationCode: string | null;
   verificationCodeExpires: Date | null;
   loginAttempts: number; // Başarısız giriş denemeleri sayısı
   lockUntil: Date | null; // Hesap kilitlenme süresi
   refreshToken?: string; // Refresh token (isteğe bağlı)
}
