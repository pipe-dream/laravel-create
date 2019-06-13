import ObjectModelEntity from "../ObjectModelEntity"

export default class TableEntity extends ObjectModelEntity {
    className() {
        return this.name
    }
}