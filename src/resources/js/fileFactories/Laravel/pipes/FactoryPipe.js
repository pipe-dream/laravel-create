import Template from '../../../utilities/Template'
import ModelPipe from './ModelPipe'

import F from '../../../utilities/Formatter'
import { random } from 'node-forge';

export default class FactoryPipe extends ModelPipe {
    calculateFiles(omc = ObjectModelCollection) {
        return [
            ... this.factoryFiles(),
        ]
    }

    factoryFiles() {
        return this.omc.modelsIncludingUser().map(model => {
            return {
                path: "database/factories/" + model.className() + "Factory.php",
                content: Template.for('Factory').replace({
                    ___MODEL___: model.className(),
                    ___COLUMNS_BLOCK___: this.columnsBlock(model),
                })
            }
        })
    }

    columnsBlock(model) {
        return model.attributes.filter(attribute => {
            return !['id', 'created_at', 'updated_at'].includes(attribute.name)
        }).map(attribute => {
            return F.singleQuotePad(attribute.name) + " => " + this.seedStatement(attribute)
        }).join(",\n")
    }

    seedStatement(attribute) {
        let typeMap = {
            string: {
                name: "$faker->name()",
                default: "$faker->sentence()"
            },
            timestamp: {
                default: "Carbon::now()->format('Y-m-d H:i:s')"
            }
        }

        if (!(attribute.dataType in typeMap)) return "UNKNOWN_DATATYPE";

        if (attribute.name in typeMap[attribute.dataType]) {
            return typeMap[attribute.dataType][attribute.name]
        }

        return typeMap[attribute.dataType].default

    }

}