import F from '@utilities/Formatter'
import Attribute from './Attribute.js';
import AttributeFactory from './AttributeFactory.js';
import Preference from '@utilities/Preference'

export default class ObjectModelEntity {
    constructor() {
        this.relationships = {}
        this.softdeletes = false
    }

    static fromSegment(segment, allSegments) {
        let entity = new this()
        entity.name = segment.name
        entity.softdeletes = segment.softdeletes
        entity.allSegments = allSegments
        // Sort and only keep unique attributes
        let attributeRows = [
            ... new Set([
                ... entity.optionalColumns(['id']),
                ... segment.attributes,
                ... entity.optionalColumns(['created_at', 'updated_at']),
            ])
        ]
        entity.attributes = attributeRows.map(name => AttributeFactory.make(name, entity, allSegments))
        return entity
    }

    static deserialize(data) {
        let entity = new this()
        entity.name = data.name
        entity.softdeletes = data.softdeletes
        entity.attributes = Object.keys(data.attributes).map(key => {
            return new Attribute({
                ...data.attributes[key],
                ...{ parent: entity }
            })
        })
        entity.relationships = data.relationships
        return entity
    }

    attributeNames() {
        return this.attributes.map(attribute => attribute.name)
    }

    optionalColumns(columns) {
        return columns.filter(column => {
            let path = ['objectModel', this.name, column]
            // Check if it is excluded in preferences
            return !(Preference.has(path) && (Preference.get(path) === false))
        })
    }

    injectAttributes(attributeNames) {

        this.attributes = this.attributes.concat(
            attributeNames.map(attributeName => {
                return AttributeFactory.make(attributeName, this, this.allSegments)
            })
        )
    }

    className() {
        return this.name
    }

    isUserEntity() {
        return this.constructor.name == "UserEntity"
    }

    isModelEntity() {
        return this.constructor.name == "ModelEntity"
    }

    isTableEntity() {
        return this.constructor.name == "TableEntity"
    }

    asForeignKey() {
        return F.snakeCase(this.name) + "_id";
    }

    serialize() {
        const serialize_results = {
            name: this.name,
            type: this.constructor.name,
            softdeletes: this.softdeletes,
            //attributes: this.attributes.map(attribute => attribute.serialize()),
            attributes: this.attributes.reduce((carry, attribute) => {
                carry[attribute.name] = attribute.serialize()
                return carry
            }, {}),
            relationships: {
                hasOne: [].map(target => target.name),
                hasMany: this.relationships.hasMany.map(target => target.name),
                belongsTo: this.relationships.belongsTo.map(target => target.name),
                belongsToMany: this.relationships.belongsToMany.map(target => target.name)
            }
        }

        return  serialize_results;
    }
}
