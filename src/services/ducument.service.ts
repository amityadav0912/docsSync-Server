import { Op } from "sequelize";
import { DocumentUser } from "../db/models/documnet-user.model";
import { Document } from "../db/models/document.model";
class DocumentService{
    public findDocumentById = async(id: number, userId: number)=>{
        let document = await Document.findOne({
            where: {
                [Op.or]:[
                    {
                        id:id,
                        userId: userId
                    },{
                        id: id,
                        isPublic: true,
                    },
                ]
            }
        })

        if(!document){
            const sharedDocument = await DocumentUser.findOne({
                where: {
                    userId: userId,
                    documentId: id,
                },
                include: {
                    model: Document
                },
            })

            if(!sharedDocument) return null;

            document = sharedDocument.documnet;
        }
        return document;
    }
}

const documentService = new DocumentService();

export {documentService};