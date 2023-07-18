import { Module } from "@nestjs/common";
import { TodoModule } from "./todo/todo.module";
import { UserModule } from "./user/user.module";
import { AuthModule } from "./auth/auth.module";
import { ConfigModule} from "@nestjs/config";
import { PostgresDbModule } from "./shared/postgres/postgres-db.module";
import { ServeStaticModule } from "@nestjs/serve-static";
import { CartModule } from './cart/cart.module';
import { OrdersModule } from './orders/orders.module';
import { ProductModule } from './product/product.module';
import { CategoriesModule } from './categories/categories.module';
import * as path from "path";
import { FileModule } from "./file/file.module";
import { ProfileModule } from "./profile/profile.module";

@Module({
  imports: [
    ConfigModule.forRoot({ isGlobal: true }),
    TodoModule,
    UserModule,
    ProfileModule,
    AuthModule,
    PostgresDbModule,
    ServeStaticModule.forRoot({
      rootPath: path.resolve(__dirname, '', 'public'),
    }),
    CartModule,
    OrdersModule,
    ProductModule,
    CategoriesModule,
    FileModule,
  ]
})
export class AppModule {}
