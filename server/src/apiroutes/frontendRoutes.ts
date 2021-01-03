import {categoriesRoute} from './categoryApiRoutes';
import {productsRoute} from './productApiRoutes';
const frontendRoutes: any = (app: any) => {
    app.use(categoriesRoute);
    app.use(productsRoute);
}
module.exports = frontendRoutes;