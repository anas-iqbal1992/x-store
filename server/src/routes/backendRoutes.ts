
import {authRoutes} from "./authRoutes";
import {dashboardRoutes} from "./dashboardRoutes";
import {categoriesRoute} from "./categoryRoutes";
import {productRoute} from "./productRoutes";

const backendRoutes:any = (app:any) => {
    app.use(dashboardRoutes);
    app.use(authRoutes);
    app.use(categoriesRoute);
    app.use(productRoute);
}
module.exports = backendRoutes;