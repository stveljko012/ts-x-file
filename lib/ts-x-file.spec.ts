import { XFile } from "./ts-x-file";

test('Should return false if no mapped file', () => {
    const file = new XFile(null);
    expect(file.fileExists()).toBe(false);
});

test('Should return true if file is mapped well.', () => {
    const file = new XFile(new File([], 'test.js'));
    expect(file.fileExists()).toBe(true);
});
