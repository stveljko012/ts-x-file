export declare enum FileSizeUnits {
    b = "b",
    B = "B",
    KB = "KB",
    MB = "MB",
    GB = "GB"
}

export declare class XFile {
    private file;
    private readonly defaultUnit;
    readonly name: string;

    /**
     * @param {FileList | File} source
     * @param {?FileSizeUnits} defaultUnit
     */
    constructor(source: FileList | File, defaultUnit?: FileSizeUnits);

    /**
     * Returns if mapped file exists.
     *
     * @returns {boolean}
     */
    fileExists(): boolean;

    /**
     * Returns if mapped file has less size than passed limit paremeter.
     * Limit is used as KB value if second parameter is not passed.
     *
     * @param {number} limit
     * @param {FileSizeUnits} unit
     * @returns {boolean}
     */
    isLessThan(limit: number, unit?: FileSizeUnits): boolean;

    /**
     * Returns the size of mapped file in default unit (KB) if no passed second parameter
     * or changed in constructor.
     *
     *
     * @param {?boolean} round
     * @param {?FileSizeUnits} unit
     * @returns {boolean}
     */
    size(round?: boolean, unit?: FileSizeUnits): number;

    /**
     * Returns the extension of file.
     *
     * @returns {string}
     */
    getExtension(): string;

    /**
     * Returns if passed extension is same as file's extension.
     *
     * @param {string} extension
     * @returns {boolean}
     */
    isExtension(extension: string): boolean;

    /**
     * Changes the name of mapped File.
     *
     * @param {string} name
     * @param {?boolean} skipExt
     */
    changeName(name: string, skipExt?: boolean): void;

    /**
     * Returns the File instance.
     *
     * @returns {File}
     */
    getFile(): File;

    /**
     * Returns the base64 string
     *
     * @returns {string}
     */
    getBase64(): Promise<string>;
}
