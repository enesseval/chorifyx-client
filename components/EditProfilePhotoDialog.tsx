import React, { ChangeEvent, useEffect, useRef, useState } from "react";
import { Dialog, DialogContent, DialogTitle } from "./ui/dialog";
import { Button } from "./ui/button";
import { cn } from "@/lib/utils";
import "react-image-crop/dist/ReactCrop.css";
import AvatarEditor from "react-avatar-editor";
import Image from "next/image";

function EditProfilePhotoDialog({ open, setOpen, profilePic }: { open: boolean; setOpen: React.Dispatch<React.SetStateAction<boolean>>; profilePic: React.Dispatch<React.SetStateAction<string>> }) {
   const fileInputRef = useRef<HTMLInputElement | null>(null);
   const [scale, setScale] = useState(1);
   const [imgSrc, setImgSrc] = useState<string | null>(null);
   const [imgPrev, setImgPrev] = useState<string | null>(null);
   const imgRef = useRef<HTMLImageElement | null>(null);
   const editor = useRef(null);
   const handleImageUpload = (e: ChangeEvent<HTMLInputElement>) => {
      const file = e.target.files?.[0];
      if (file) {
         const reader = new FileReader();
         reader.onload = () => {
            const img = new window.Image();
            img.onload = () => {
               setImgSrc(reader.result as string);

               imgRef.current = img;
            };
            img.src = reader.result as string;
         };
         reader.readAsDataURL(file);
      }
   };

   const getImageUrl = () => {
      const url = editor.current.getImage().toDataURL();
      setImgPrev(url);
   };

   return (
      <Dialog open={open} onOpenChange={setOpen}>
         <DialogContent className="w-11/12 md:w-[700px] max-w-[700px] min-h-[70vh] font-poppins" aria-describedby={undefined}>
            <DialogTitle className="sr-only">Profil fotoğrafını düzenle</DialogTitle>

            <div className="flex items-center space-x-3">
               <h1 className="tracking-wide">Fotoğrafı düzenle</h1>
            </div>
            <div className="flex">
               <div className="space-y-5 w-full flex flex-col items-center justify-center">
                  <div className="w-[300px] h-[300px] relative overflow-hidden rounded-full flex items-center justify-center">
                     {!imgSrc ? (
                        <label
                           htmlFor="image-upload"
                           className={cn(
                              "w-full h-full rounded-full border-slate-600 border-2 border-dashed flex items-center justify-center overflow-hidden",
                              imgSrc === null ? "cursor-pointer" : "pointer-events-none"
                           )}
                        >
                           <p className="text-xl font-semibold cursor-pointer">Bir resim yükleyin</p>
                        </label>
                     ) : (
                        <AvatarEditor ref={editor} image={imgSrc} width={300} height={300} borderRadius={300} scale={scale} onImageChange={getImageUrl} />
                     )}

                     <input ref={fileInputRef} type="file" accept="image/" id="image-upload" className={cn("hidden")} onChange={handleImageUpload} />
                  </div>
                  {imgSrc && (
                     <input
                        type="range"
                        value={scale}
                        max={2}
                        min={1}
                        step={0.1}
                        onChange={(e) => {
                           setScale(Number(e.target.value));
                        }}
                     />
                  )}
               </div>

               <div className="hidden sm:block p-5 mt-10">
                  <div className="flex items-center justify-center space-x-2">
                     <div className="w-24 h-24">
                        <div className="w-full h-full rounded-full bg-gray-200">
                           <Image src={imgPrev ? imgPrev : "/no-image.png"} alt="pic" width={96} height={96} className="rounded-full" />
                        </div>
                     </div>
                     <div className="w-16 h-16">
                        <div className="w-full h-full rounded-full bg-gray-200">
                           <Image src={imgPrev ? imgPrev : "/no-image.png"} alt="pic" width={64} height={64} className="rounded-full" />
                        </div>
                     </div>
                     <div className="w-12 h-12">
                        <div className="w-full h-full rounded-full bg-gray-200">
                           <Image src={imgPrev ? imgPrev : "/no-image.png"} alt="pic" width={48} height={48} className="rounded-full" />
                        </div>
                     </div>
                  </div>
               </div>
            </div>
            <div className="w-full flex justify-center sm:justify-end space-x-2">
               {imgSrc ? (
                  <Button variant="ghost">Farklı Resim Yükle</Button>
               ) : (
                  <Button variant="ghost" onClick={() => setOpen(false)}>
                     İptal et
                  </Button>
               )}
               <Button variant={"outline"} className="border-green-600">
                  Resmi uygula
               </Button>
            </div>
         </DialogContent>
      </Dialog>
   );
}

export default EditProfilePhotoDialog;
