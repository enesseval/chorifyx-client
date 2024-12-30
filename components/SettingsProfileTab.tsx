"use client";

import { useState, ChangeEvent, useRef } from "react";
import { Pencil, PencilIcon, Upload } from "lucide-react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "./ui/card";
import { Avatar, AvatarFallback, AvatarImage } from "./ui/avatar";
import EditProfilePhotoDialog from "./EditProfilePhotoDialog";
import Image from "next/image";

export default function SettingsProfileTab() {
   const [selectedImage, setSelectedImage] = useState<string | null>(null);
   const [imageName, setImageName] = useState<string | null>(null);
   const [open, setOpen] = useState(false);
   const [profilePic, setProfilePic] = useState("");

   const handleImageChange = (event: ChangeEvent<HTMLInputElement>) => {
      const file = event.target.files?.[0];
      if (file) {
         const imageUrl = URL.createObjectURL(file);
         setSelectedImage(imageUrl);
         setImageName(file.name);
      }
   };

   return (
      <Card className="border-border w-11/12 lg:w-5/12 mx-auto">
         <CardHeader>
            <CardTitle>Profil Bilgileri</CardTitle>
            <CardDescription>Profil bilgilerinizi buradan güncelleyebilirsiniz.</CardDescription>
         </CardHeader>
         <CardContent>
            <div className="flex items-center justify-center p-5 ">
               <div className="w-32 h-32 relative">
                  <Avatar className="h-32 w-32 border-2 border-border">
                     <AvatarImage alt="Profile pic" src={profilePic || "/no-image.png"} width="full" className="object-cover"></AvatarImage>
                     <AvatarFallback className="bg-secondary">PP</AvatarFallback>
                  </Avatar>
                  <div className="absolute z-10 bottom-1 right-1 border-2 border-border bg-bg1 rounded-full flex items-center justify-center">
                     <Pencil onClick={() => setOpen(!open)} className="w-8 h-8 p-2 cursor-pointer z-10" />
                  </div>
               </div>
            </div>
            {profilePic && <Image src={profilePic} alt="profile" width={150} height={150} className="rounded-full aspect-square object-cover" />}
         </CardContent>
         <EditProfilePhotoDialog open={open} setOpen={setOpen} profilePic={setProfilePic} />
      </Card>
      // <Card className="border-border w-11/12 mx-auto">
      //    <CardHeader>
      //       <CardTitle>Profil Bilgileri</CardTitle>
      //       <CardDescription>Profil bilgilerinizi buradan güncelleyebilirsiniz.</CardDescription>
      //    </CardHeader>
      //    <CardContent className="space-y-6 relative">
      //       <div className="flex flex-col items-center space-y-4">
      //          <Avatar className="h-24 w-24 border-2 border-border">
      //             <AvatarImage alt="Profile picture" />
      //             <AvatarFallback className="bg-secondary">PP</AvatarFallback>
      //             <Pencil className="absolute bottom-0 right-0 z-50 bg-bg1 rounded-full p-3 w-8 h-8 cursor-pointer" />
      //          </Avatar>
      //       </div>

      //       <div className="grid gap-4 md:grid-cols-2">
      //          <div className="space-y-2">
      //             <Label htmlFor="firstName">Ad</Label>
      //             <Input id="firstName" placeholder="Adınız" className="bg-background" />
      //          </div>
      //          <div className="space-y-2">
      //             <Label htmlFor="lastName">Soyad</Label>
      //             <Input id="lastName" placeholder="Soyadınız" className="bg-background" />
      //          </div>
      //       </div>

      //       <div className="space-y-2">
      //          <Label htmlFor="username">Kullanıcı Adı</Label>
      //          <Input id="username" placeholder="@kullaniciadi" className="bg-background" />
      //       </div>

      //       <div className="space-y-2">
      //          <Label htmlFor="email">Email</Label>
      //          <Input id="email" type="email" placeholder="ornek@mail.com" className="bg-background" />
      //       </div>

      //       <Button className="w-full">Değişiklikleri Kaydet</Button>
      //    </CardContent>
      // </Card>
   );
}
