import Template from '@utilities/Template'
import BasePipe from './BasePipe'
import F from '@utilities/Formatter.js'

export default class APIRoutesPipe extends BasePipe {
    calculateFiles() {        
        return this.omc.hasModels() ? [{
            path: "routes/api.php",
            content: Template.for('api').replace({
                ___API_ROUTES_BLOCK___: this.apiRoutes(),
            })
        }] : []
    }

    apiRoutes() {
        return this.omc.modelsIncludingUser().map(model => {
            return Template.for('APIRoute').replace({
                ___RESOURCE_NAME___: F.camelCase(F.pluralize(model.className())),
                ___MODEL_NAME___: model.className(),
            })
        }).join(___DOUBLE_LINE_BREAK___)
    }
}
