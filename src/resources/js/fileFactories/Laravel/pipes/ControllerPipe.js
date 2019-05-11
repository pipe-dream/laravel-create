import Template from '../../../utilities/Template'
import ModelPipe from './ModelPipe';

export default class ControllerPipe extends ModelPipe {
    calculateFiles(omc = ObjectModelCollection) {
        return omc.modelsIncludingUser().map(model => {
            return {
                path: "app/Http/Controllers/" + model.className() + "Controller.php",
                content: Template.for('Controller').replace({
                    ___HIDDEN___: this.hiddenAttributes(model),
                    ___MODEL___: this.className(model),
                    ___FILLABLE___: this.fillableAttributes(model),
                    ___CASTS___: this.casts(model),
                    ___RELATIONSHIP_METHODS_BLOCK___: this.relationshipMethods(model),
                })
            }
        })
    }
}