import {FileSizeUnits, XFile} from "../src/ts-x-file";
import * as fs from 'fs';
import * as path from 'path';

const loadFile = (name: string): Buffer => {
    return fs.readFileSync(path.join(__dirname, 'data', name));
};

test('Should return true if file is mapped well.', () => {
    const file = new XFile(new File([], 'test.js'));
    expect(file.fileExists()).toBe(true);
});

test('Should rename file with ext', () => {
    const file = new XFile(new File([], 'test.js'));
    expect(file.name).toBe('test.js');

    file.changeName('tested');

    expect(file.name).toBe('tested.js');
});

test('Should rename file without ext', () => {
    const file = new XFile(new File([], 'test.js'));
    file.changeName('tested.ts', true);
    expect(file.name).toBe('tested.ts');
});

test('Should return true for extension check', () => {
    const file = new XFile(new File([], 'test.pdf'));
    expect(file.isExtension('pdf')).toBe(true);
});

test('Should return false for extension check', () => {
    const file = new XFile(new File([], 'test.pdf'));
    expect(file.isExtension('jpg')).toBe(false);
});

test('Should return size of the file', () => {
    const file = loadFile('212bytes.html');
    const instance = new File([file], '212bytes.html');
    const xFile = new XFile(instance);

    expect(xFile.size()).toBe(0.212);
});

test('Should return size of the file created from Buffer', () => {
    const file = loadFile('212bytes.html');
    const xFile = new XFile(file);

    expect(xFile.size()).toBe(0.212);
});

test('Should load file from Buffer', () => {
    const buffer = loadFile('212bytes.html');
    const xFile = new XFile(buffer);

    expect(xFile.fileExists()).toBe(true);
});

test('Should return size in Bytes for constructor passed default unit', () => {
    const buffer = loadFile('212bytes.html');
    const xFile = new XFile(buffer, FileSizeUnits.B);

    expect(xFile.size()).toBe(212);
});

test('Should return size in Kilobytes for constructor passed default unit', () => {
    const buffer = loadFile('212bytes.html');
    const xFile = new XFile(buffer, FileSizeUnits.KB);

    expect(xFile.size()).toBe(0.212);
});

test('Should return size in Megabytes for constructor passed default unit', () => {
    const buffer = loadFile('212bytes.html');
    const xFile = new XFile(buffer, FileSizeUnits.MB);

    expect(xFile.size()).toBe(0.000212);
});

test('Should return size in Gigabytes for constructor passed default unit', () => {
    const buffer = loadFile('212bytes.html');
    const xFile = new XFile(buffer, FileSizeUnits.GB);

    expect(xFile.size()).toBe(2.12 * Math.pow(10, -7));
});
