import { Form } from "./form";

export abstract class Model {
    abstract toForm(): Form;
}