export class pageElements {
    id: number = -1;
    url: string = '';
    category: string = '';
    name: string = '';
    description: string = '';
    elementOnDom: string = '';
    cssToApply : string = '';

    constructor(id: number, url: string, category: string, name: string, description: string, elementOnDom: string, cssToApply: string) {
        this.id = id; 
        this.url = url; 
        this.category = category;
        this.name = name;
        this.description = description;
        this.elementOnDom = elementOnDom;
        this.cssToApply = cssToApply;
    }
}