import { XFile } from "./ts-x-file";

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
