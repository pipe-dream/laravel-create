import F from '@utilities/Formatter'
import Attribute from './Attribute'
import ObjectModelEntityFactory from './ObjectModelEntityFactory'
import collect from 'collect.js'

export default class ObjectModelCollection {
    constructor() {
        //this.attachRelationships()
        //this.attachPivotAttributes()
    }

    static fromEntities(entities) {
        let omc = new this
        omc.entities = entities
        return omc
    }
    
    static fromSchema(schema) {
        let omc = new this
        omc.entities = ObjectModelEntityFactory.fromSchema(schema)
        return omc
    }    

    isManyToMany(candidate) {
        var models = this.modelsIncludingUser().map((item) => {
            return F.snakeCase(item.name).toLowerCase();
        }).join("|");
        var manyToManyRegExp = new RegExp("^(" + models + ")_(" + models + ")$");        
        var matches = manyToManyRegExp.exec(candidate.name);
        
        if(matches) {
            return [matches[1], matches[2]];
        }

        return !!matches
    }
    
    manyToManyAssociatedModels(manyToManyEntity) {
        var models = this.modelsIncludingUser().map((item) => {
            return F.snakeCase(item.name).toLowerCase();
        }).toArray().join("|");
        var manyToManyRegExp = new RegExp("^(" + models + ")_(" + models + ")$");        
        var matches = manyToManyRegExp.exec(manyToManyEntity.name);
        return [matches[1], matches[2]];
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
        return this.entities.filter(entitiy => entitiy.isUserEntity())
    }

    models() {
        return this.entities.filter(entitiy => entitiy.isModelEntity())
    }

    tablesOnly() {
        return this.entities.filter(entity => entity.name == entity.name.toLowerCase())
    }
    
    manyToManys() {
        return this.tablesOnly().filter(entitiy => this.isManyToMany(entitiy))
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

    inOptimalMigrationOrder() {
        let result =  collect(this.entities).sortBy((entity) => {
            if(this.isManyToMany(entity)) {
                // ensure many to many is placed last
                return 100 + entity.relationships.belongsTo.length
            }
            return entity.relationships.belongsTo.length
        }).toArray()

        return result
    }
   
    attachPivotAttributes() {
        this.manyToManys().each(entity => {
            this.manyToManyAssociatedModels(entity).forEach(modelName => {
                entity.attributes.push(
                    new Attribute(
                        {
                            name: F.snakeCase(modelName) + "_id",
                            parent: entity,
                            dataType: "unsignedBigInteger",
                            fillable: false,
                            hidden: false,
                            nullable: false,
                        }
                    )                
                )
            })
        })
    }

    serializeSchema() {
        //return this.entities.map(entity => entity.serialize())
        return this.entities.reduce((carry,entity) => {
            carry[entity.name] = entity.serialize()
            return carry
        }, {})
    }
}