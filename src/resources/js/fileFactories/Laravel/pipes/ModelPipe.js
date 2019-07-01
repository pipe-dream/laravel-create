import Template from '@utilities/Template'
import BasePipe from '@pipes/BasePipe'
import F from '@utilities/Formatter'

export default class ModelPipe extends BasePipe {
    calculateFiles(omc = ObjectModelCollection) {
        return omc.modelsExceptUser().map(model => {
            return {
                path: "app/" + model.className() + ".php",
                content: Template.for('Model').replace({
                    ___CLASS_NAME___: this.className(model),
                    ___HIDDEN___: this.hiddenAttributes(model),
                    ___FILLABLE___: this.fillableAttributes(model),
                    ___CASTS_BLOCK___: this.casts(model) ? this.casts(model) : "//",
                    ___RELATIONSHIP_METHODS_BLOCK___: this.relationshipMethods(model),
                    ___SOFT_DELETES_BLOCK___ : this.softDeletes(model) ? "use \\Illuminate\\Database\\Eloquent\\SoftDeletes;" : ""
                })
            }
        })
    }

    softDeletes(model){
        return model.softdeletes
    }

    hiddenAttributes(model) {
        return this.horisontalStringList(
            model.attributes.filter(attribute => attribute.hidden)
                .map(attribute => attribute.name),
            "//" // default value
        )
    }

    fillableAttributes(model) {
        return this.horisontalStringList(
            model.attributes.filter(attribute => attribute.fillable)
                .map(attribute => attribute.name),
            "//" // default value
        )
    }

    casts(model) {

        const dataTypeCasts = {
            'int' : 'integer',
            'integer' : 'integer',
            'real' : 'real',
            'float' : 'float',
            'double' : 'double',

            'string' : 'string',

            'bit' : 'boolean',
            'boolean' : 'boolean',

            'date' : 'date',
            'datetime' : 'datetime',
            'timestamp' : 'timestamp',

            'array' : 'array',
            'json' : 'object',
            'collection' : 'collection'
        }

        model.attributes.forEach(attribute => {
            if(attribute.cast === null && dataTypeCasts[attribute.dataType])
                attribute.cast = dataTypeCasts[attribute.dataType]
        })

        return model.attributes.filter(attribute => attribute.cast)
            .map(attribute => "'" + attribute.name + "' => '" + attribute.cast + "'")
            .join(",\n")

    }

    className(model) {
        return model.name
    }

    relationshipMethods(model) {
        return [
            model.relationships.hasOne.map(target => {
                return Template.for('HasOneRelationship').replace({
                    ___TARGET_CLASS___: target.className(),
                    ___THIS_CLASS___: model.className(),
                    ___METHOD_NAME___: F.camelCase(
                        target.className()
                    ),

                })
            }).join(___DOUBLE_LINE_BREAK___),

            model.relationships.hasMany.map(target => {
                return Template.for('HasManyRelationship').replace({
                    ___TARGET_CLASS___: target.className(),
                    ___TARGET_CLASS_PLURAL___: F.pluralize(target.className()),
                    ___THIS_CLASS___: model.className(),
                    ___METHOD_NAME___: F.pluralize(
                        F.camelCase(
                            target.className()
                        )
                    ),

                })
            }).join(___DOUBLE_LINE_BREAK___),

            model.relationships.belongsTo.map(target => {
                return Template.for('BelongsToRelationship').replace({
                    ___TARGET_CLASS___: target.className(),
                    ___THIS_CLASS___: model.className(),
                    ___METHOD_NAME___: F.camelCase(target.className()),
                })
            }).join(___DOUBLE_LINE_BREAK___),

            model.relationships.belongsToMany.map(target => {
                return Template.for('BelongsToManyRelationship').replace({
                    ___TARGET_CLASS___: target.className(),
                    ___TARGET_CLASS_PLURAL___: F.pluralize(target.className()),
                    ___THIS_CLASS___: model.className(),
                    ___METHOD_NAME___: F.pluralize(
                        F.camelCase(
                            target.className()
                        )
                    ),

                })
            }).join(___SINGLE_LINE_BREAK___),

        ].filter(candidate => (candidate != "")).join(___DOUBLE_LINE_BREAK___)
    }
}
