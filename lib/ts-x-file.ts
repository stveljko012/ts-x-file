import { Observable, Subscriber } from "rxjs";

export enum FileSizeUnits {
    b = 'b',
    B = 'B',
    KB = 'KB',
    MB = 'MB',
    GB = 'GB'
}

export class XFile {

    private file: File;
    private readonly defaultUnit: FileSizeUnits;

    get name() {
        return this.file.name;
    }

    constructor(source: FileList | File, defaultUnit: FileSizeUnits = FileSizeUnits.KB) {
        if (source) {
            if (source instanceof FileList) {
                this.file = source.item(0);
                return;
            }

            if (source instanceof File) {
                this.file = source;
                return
            }
        }

        this.defaultUnit = defaultUnit;
    }

    fileExists(): boolean {
        return !!this.file;
    }

    isLessThan(limit: number, unit: FileSizeUnits = this.defaultUnit): boolean {
        // TODO: Implement Units Conversion;

        if (unit === FileSizeUnits.KB) {
            return (this.file.size / 1000) <= limit;
        }

        throw new Error('Not implemented another units. KB');
    }

    size(round: boolean = false, unit: FileSizeUnits = this.defaultUnit): number {
        // TODO: Implement Units Conversion;

        if (unit === FileSizeUnits.KB) {
            const size = this.file.size / 1000;
            return round ? Math.round(size) : size;
        }

        throw new Error('Not implemented another units. KB');
    }

    getExtension(): string {
        const list = this.file.name.split('.');

        if (list.length > 2) {
            return list.pop();
        }

        return null;
    }

    isExtension(extension: string): boolean {
        return this.getExtension() === extension;
    }

    changeName(name: string, skipExt: boolean = false): void {
        const ext = skipExt ? '' : `.${this.getExtension()}`;
        this.file = new File([this.file.slice(0, this.file.size)], `${name}${ext}`);
    }

    getFile(): File {
        return this.file;
    }

    getBase64(): Observable<string> {
        return new Observable((observer: Subscriber<string>) => {
            const reader = new FileReader();
            reader.readAsDataURL(this.file);
            reader.onload = () => observer.next(reader.result.toString());
            observer.complete();
        });
    }
}
