import Template from '@utilities/Template'
import ModelPipe from './ModelPipe'

import F from '@utilities/Formatter'
import { random } from 'node-forge';

export default class APIResourcePipe extends ModelPipe {
    calculateFiles(omc = ObjectModelCollection) {
        return [
            ... this.APIResourceFiles(),
        ]
    }

    APIResourceFiles() {
        return this.omc.modelsIncludingUser().map(model => {
            return {
                path: "app/Http/Resources/" + model.className() + "Resource.php",
                content: Template.for('APIResource').replace({
                    ___COLUMNS_BLOCK___: this.columnsBlock(model),
                    ___MODEL___: this.className(model),
                })
            }
        })
    }

    columnsBlock(model) {
        return model.attributes.filter(attribute => {
            return !['password', 'remember_token'].includes(attribute.name)
        }).map(attribute => {
            return F.singleQuotePad(attribute.name) + " => $this->" + attribute.name
        }).concat(model.relationships.hasMany.concat(model.relationships.belongsToMany).map(target => {
            return F.singleQuotePad(F.snakeCase(F.pluralize(target.name))) + " => " + F.pascalCase(target.name) + "Resource::collection($this->whenLoaded(" + F.singleQuotePad(F.snakeCase(F.pluralize(target.name))) + "))"
        })).concat(model.relationships.belongsTo.map(target => {
            return F.singleQuotePad(F.snakeCase(target.name)) + " => new " + F.pascalCase(target.name) + "Resource($this->whenLoaded(" + F.singleQuotePad(F.snakeCase(target.name)) + "))"
        })).join(",\n")
    }
}
