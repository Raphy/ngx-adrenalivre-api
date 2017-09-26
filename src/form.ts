export abstract class Form<T> {
    static fromItem(item: T): this {
        let itemForm = new this();
        itemForm.populate(item);

        return itemForm;
    }

    abstract  populate(item: T);
}