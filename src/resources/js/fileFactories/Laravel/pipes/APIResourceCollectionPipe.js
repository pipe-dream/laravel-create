import Template from '../../../utilities/Template'
import ModelPipe from './ModelPipe'

import F from '../../../utilities/Formatter'
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
                path: "app/Http/Resources/" + model.className() + "Collection.php",
                content: Template.for('APIResourceCollection').replace({
                    ___MODEL___: this.className(model),
                })
            }
        })
    }
}
