# ts-x-file

###### ts-x-file is tool for managing file from `FileList`.
#

### Installation
Install the dependencies and devDependencies and start the server.

```sh
$ npm install -s ts-x-file
```
### Usage

##### Angular example:

```HTML code
<input type="file" (click)="onFileChange($event)"/>
```
##### In your controller method:

```javascript
onFileChange(event: any): void {
    // FileList initiation
    const xFile = new XFile(event.target.files);
    
    // Or you can pass File 
    const file: File = event.target.files.item(0);
    const xFile = new XFile(file);
}
```

You can pass a parameter to constructor to change default unit:
```javascript
import { XFile } from "ts-x-file";

onFileChange(event: any): void {
    const xFile = new XFile(event.target.files, FileSizeUnits.MB);
}
```
Then if you request a size of file it will be returned in this unit. By default, unit is ``KiloBytes``.
##### Check if file size is not grater than:
```typescript
isLessThan(limit: number, unit?: FileSizeUnits): boolean;
```
```javascript
import { XFile, FileSizeUnits } from "ts-x-file";

const xFile = new XFile(event.target.files);
xFile.isLessThan(5000);
```

By default limit parameter is calculated as Bytes (**if you did not change it through the constructor**), you can change it by passing FileSizeUnit:

```javascript
import { FileSizeUnits } from "ts-x-file";

const xFile = new XFile(event.target.files);

xFile.isLessThan(5, FileSizeUnits.B);
xFile.isLessThan(5, FileSizeUnits.KB);
xFile.isLessThan(5, FileSizeUnits.MB);
xFile.isLessThan(5, FileSizeUnits.GB);
```

This way it will ignore the default unit.

##### Get file size
```typescript
size(round?: boolean = false, unit?: FileSizeUnits): number;
```

```javascript
const fileSize = xFile.size();
```
By default this method won't round size number, you can do this by passing true on the first place parameter:
```typescript
const fileSize = xFile.size(true);
```
The unit of returned value could be ignored, as well, if you pass it as second parameter:
```javascript
import { FileSizeUnits } from "ts-x-file";

const fileSizeBytes = xFile.size(true, FileSizeUnits.B);
const fileSizeKiloBytes = xFile.size(true, FileSizeUnits.KB);
const fileSizeMegaBytes = xFile.size(true, FileSizeUnits.MB);
const fileSizeGigaBytes = xFile.size(true, FileSizeUnits.GB);
```

##### Get or check extension

```typescript
getExtension(): string;
```
```javascript
const extension = xFile.getExtension();
```

you are able to check file extension by using method:
```typescript
isExtension(extension: string): boolean;
```
```javascript
const isPdf = xFile.isExtension('pdf');
```

##### Get or change file name
Getting name of the file could be done by simply calling ``name`` getter:
```javascript
console.log(xFile.name);
```
To set name property of file you can follow:
```typescript
changeName(name: string, skipExt?: boolean): void;
```
```javascript
const xFile = new XFile(event.target.files) // ex: react.js
console.log(xFile.name) // out: react.js

xFile.changeName('angular.js');
console.log(xFile.name) // out: angular.js
```

If you want to change extension of file, you just need to pass it as name parameter and set ``skipExt`` parameter to ``true``:
```javascript
xFile.changeName('angular.ts', true);
console.log(xFile.name) // out: angular.ts

// If you skip to set `skipExt` parameter you should get something like this:
xFile.changeName('angular.ts');
console.log(xFile.name) // out: angular.ts.js
```

##### Get the ``File`` instace or ``Base64``

Somehow, on the end you will need an instance or Base64 string, so this is possible with following methods:
```typescript
getFile(): File;
getBase64(): Promise<string>;
```

``File`` instance example:
```javascript
const file: File = xFile.getFile();
```

``Base64`` string example:
```javascript
const urlString = xFile.getBase64().then((base64String: string) => console.log) // data:image/png;base64,...
```

##### Check if ``File`` instance exists:

```typescript
fileExists(): boolean;
```

This could be used to validate:

```javascript
if (xFile.fileExists()) {
...
}
```

### Testing

Run tests with following command:
```sh
$ jest
```

### Todos

 - Write MORE Tests

License
----

MIT

#### Feel free to contribute!


