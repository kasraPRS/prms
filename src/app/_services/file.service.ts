import { Injectable } from "@angular/core";

@Injectable({ providedIn: 'root' })
export class FileService {
    static fileToBase64(file: File): Promise<string> {
        return new Promise<string>(resolve => {
            const reader = new FileReader();
            reader.readAsDataURL(file);
            reader.onload = () => { resolve(
                <string>reader.result
            )};
        });
    }
}