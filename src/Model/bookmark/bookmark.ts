export class Bookmark {
    id: number = -1;
    name: string = '';
    url: string = '';
    bookmarkPath: Array<string> = new Array<string>();

    constructor(id: number, name: string, url: string, bookmarkPath: Array<string>) {
        this.id = id;
        this.name = name;
        this.url = url;
        this.bookmarkPath = bookmarkPath;
    }
}