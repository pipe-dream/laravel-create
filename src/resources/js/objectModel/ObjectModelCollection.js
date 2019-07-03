import F from '@utilities/Formatter'
import Attribute from './Attribute'
import ObjectModelEntityFactory from './ObjectModelEntityFactory'
import collect from 'collect.js'
import _ from 'lodash'

export default class ObjectModelCollection {
    constructor(entities = []) {
        this.entities = entities;
        this.regexes = {
            manyToMany : () => new RegExp("^(" + this.modelsIncludingUser() + ")_(" + this.modelsIncludingUser() + ")$")
        }
    }

    static fromEntities(entities) {
        return new this(entities)
    }

    static fromSchema(schema) {
        return new this(ObjectModelEntityFactory.fromSchema(schema))
    }

    static getModelRegexString(models){
        return models.map(item => F.snakeCase(item.name).toLowerCase()).join("|")
    }

    isManyToMany(candidate) {
        return this.regexes.manyToMany().test(candidate.name);
    }

    getManyToMany(candidate){
        if(!this.isManyToMany(candidate))
            return []

        let models = this.regexes.manyToMany().exec(candidate.name);
        return [models[1], models[2]]
    }

    hasUserModel() {
        return this.userModels().length > 0
    }

    hasModels() {
        return this.modelsIncludingUser().length > 0
    }

    userModel() {
        return this.userModels().first()
    }

    userModels() {
        return this.entities.filter(entity => entity.isUserEntity())
    }

    models() {
        return this.entities.filter(entity => entity.isModelEntity())
    }

    tablesOnly() {
        return this.entities.filter(entity => entity.name === entity.name.toLowerCase())
    }

    manyToManys() {
        return this.tablesOnly().filter(entity => this.isManyToMany(entity))
    }

    modelsIncludingUser() {
        return this.models().concat(this.userModels())
    }

    modelsExceptUser() {
        return this.models().filter(model => !model.isUserEntity())
    }

    map(callback) {
        return this.entities.map(callback)
    }

    filter(callback) {
        return this.entities.filter(callback)
    }

    find(callback) {
        return this.entities.find(callback)
    }

    all() {
        return this.entities
    }

    static hasRelationships(entity) {
        return entity.relationships.belongsTo.length || entity.relationships.belongsToMany.length || entity.relationships.hasOne.length || entity.relationships.hasMany.length
    }

    static hasRelationshipBeenMigrated(entity, migratedList) {
        if (!entity)
            return
        let relationships = entity.relationships.belongsTo
        return _.every(relationships, relationship => _.some(migratedList, ml => ml.name === relationship.name))
    }

    inOptimalMigrationOrder() {
        let entitiesLeft = collect(this.entities).toArray()

        // remove all with basic relationships
        let sortedEntities = _.reject(entitiesLeft, entity => ObjectModelCollection.hasRelationships(entity) || this.isManyToMany(entity))

        // Put ManyToMany into a separate array, we'll take care of them later
        let manyToMany = _.filter(entitiesLeft, entity => this.isManyToMany(entity))

        entitiesLeft = _.difference(entitiesLeft, sortedEntities)

        // Iterate everything 100 times, to prevent overflows
        // If 2 different tables has a "belongTo" relationship with each other, they will never complete
        for (let i = 0; i < 100; i++) {
            _.forEachRight(entitiesLeft, entity => {
                if(this.isManyToMany(entity))
                    return
                if (ObjectModelCollection.hasRelationshipBeenMigrated(entity, sortedEntities)) {
                    sortedEntities.push(entity)
                    _.remove(entitiesLeft, el => el.name === entity.name)
                }
            })
            if (entitiesLeft.length < 1) {
                break
            }
        }

        return sortedEntities.concat(manyToMany)
    }

    serializeSchema() {
        //return this.entities.map(entity => entity.serialize())
        return this.entities.reduce((carry,entity) => {
            carry[entity.name] = entity.serialize()
            return carry
        }, {})
    }
}
