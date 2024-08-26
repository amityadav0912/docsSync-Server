import { BelongsTo, Column, DataType, ForeignKey, Model, Table , DefaultScope, Default , HasMany} from "sequelize-typescript";
import { User } from "./user.model";
import { DocumentUser } from "./documnet-user.model";

@DefaultScope(() => ({
    include: [
      {
        model: DocumentUser,
        include: [
          {
            model: User,
            attributes: ["email"],
          },
        ],
      },
    ],
  }))


@Table({tableName:'document', underscored: true})
class Document extends Model{
    @Column(DataType.STRING)
    title!:string;

    @Column(DataType.STRING)
    content!:string;


    @ForeignKey(()=>User)
    userId!:number;

    @BelongsTo(()=>User)
    user!:User;

    @HasMany(()=>DocumentUser,{
        onDelete:'CASCADE'
    })
    users!:Array<DocumentUser>
    
    @Default(false)
    @Column(DataType.BOOLEAN)
    isPublic!:boolean

}

export{Document};