

import sequelize from "../../config/db.config";
import { DocumentUser } from "./documnet-user.model";
import { RefreshToken } from "./refresh-token.model";
import { Role } from "./role.model";
import { UserRole } from "./user-role.model";
import { User } from "./user.model";
import { Document } from "./document.model";
import Sequelize  from "sequelize-typescript";


sequelize.addModels([
    User,
    RefreshToken,
    Role,
    UserRole,
    Document,
    DocumentUser
])

const db ={
    sequelize,
    Sequelize,
    User,
    RefreshToken,
    Role,
    UserRole,
    Document,
    DocumentUser
}

export default db;