import * as Errors from "./error-messages";

export enum FileSizeUnits {
    B = 'Byte',
    KB = 'KiloByte',
    MB = 'MegaByte',
    GB = 'GigaByte'
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
                if (source.length > 0) {
                    this.file = source.item(0);
                } else {
                    throw new Error(Errors.ERROR_EMPTY_FILES_LIST)
                }
                return;
            }

            if (source instanceof File) {
                this.file = source;
                return
            }
        } else {
            throw new Error(Errors.ERROR_NO_SOURCE);
        }

        this.defaultUnit = defaultUnit;
    }

    fileExists(): boolean {
        return !!this.file;
    }

    isLessThan(limit: number, unit: FileSizeUnits = this.defaultUnit): boolean {
        // TODO: Implement Units Conversion;

        switch (unit) {
            case FileSizeUnits.B:
                return this.size(false, FileSizeUnits.B) <= limit;

            case FileSizeUnits.KB:
                return this.size(false, FileSizeUnits.KB) <= limit;

            case FileSizeUnits.MB:
                return this.size(false, FileSizeUnits.MB) <= limit;

            case FileSizeUnits.GB:
                return this.size(false, FileSizeUnits.GB) <= limit;

            default:
                throw new Error(Errors.ERROR_NO_VALID_FILE_SIZE_UNIT)
        }
    }

    size(round: boolean = false, unit: FileSizeUnits = this.defaultUnit): number {
        switch (unit) {
            case FileSizeUnits.B:
                const BSize = this.file.size / 1000;
                return round ? Math.round(BSize) : BSize;

            case FileSizeUnits.KB:
                const KBSize = this.file.size / 1000;
                return round ? Math.round(KBSize) : KBSize;

            case FileSizeUnits.MB:
                const MBSize = this.file.size / 1000000;
                return round ? Math.round(MBSize) : MBSize;

            case FileSizeUnits.GB:
                const GBSize = this.file.size / 1000000000;
                return round ? Math.round(GBSize) : GBSize;

            default:
                throw new Error(Errors.ERROR_NO_VALID_FILE_SIZE_UNIT)
        }
    }

    getExtension(): string {
        const list = this.file.name.split('.');

        if (list.length > 1) {
            return list.pop();
        }

        return null;
    }

    isExtension(extension: string): boolean {
        return this.getExtension() === extension;
    }

    changeName(name: string, skipExt: boolean = false): void {
        const currentExt = this.getExtension();
        const ext = skipExt ? '' : currentExt ? `.${currentExt}` : '';

        this.file = new File([this.file.slice(0, this.file.size)], `${name}${ext}`);
    }

    getFile(): File {
        return this.file;
    }

    getBase64(): Promise<string> {
        return new Promise((resolve) => {
            const reader = new FileReader();
            reader.readAsDataURL(this.file);
            reader.onload = () => resolve(reader.result.toString());
        });
    }
}
