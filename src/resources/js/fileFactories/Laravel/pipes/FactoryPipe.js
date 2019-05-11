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

    typeMap(dataType) {
        return {
            string: "$faker->sentence()",
            timestamp: "Carbon::now()->format('Y-m-d H:i:s')",
            unsignedInteger: "rand(1,10)"
        }[dataType]
    }

    seedStatement(attribute) {
        return this.typeMap(attribute.dataType)
    }

}